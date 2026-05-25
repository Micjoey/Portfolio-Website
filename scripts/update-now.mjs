import { writeFile } from 'node:fs/promises';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
  console.error('Missing Spotify env vars (SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN)');
  process.exit(1);
}

async function getAccessToken() {
  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.access_token;
}

function shape(item, source) {
  return {
    track: item.name,
    artist: item.artists.map((a) => a.name).join(', '),
    album: item.album?.name ?? null,
    url: item.external_urls?.spotify ?? null,
    source,
  };
}

async function getLatest(token) {
  const headers = { Authorization: `Bearer ${token}` };

  const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', { headers });
  if (nowRes.status === 200) {
    const data = await nowRes.json();
    if (data?.item && data.is_playing) {
      return { ...shape(data.item, 'currently-playing'), playedAt: new Date().toISOString() };
    }
  }

  const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers });
  if (!recentRes.ok) throw new Error(`Recently-played failed: ${recentRes.status} ${await recentRes.text()}`);
  const data = await recentRes.json();
  const item = data.items?.[0];
  if (!item) return null;
  return { ...shape(item.track, 'recently-played'), playedAt: item.played_at };
}

const token = await getAccessToken();
const listening = await getLatest(token);

const out = {
  updatedAt: new Date().toISOString(),
  listening,
};

await writeFile('now.json', JSON.stringify(out, null, 2) + '\n');
console.log('Wrote now.json:', listening ? `${listening.artist} · ${listening.track} (${listening.source})` : 'no track');
