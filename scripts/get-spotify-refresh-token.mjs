// One-time helper: walks you through Spotify OAuth and prints a refresh token
// to save as the SPOTIFY_REFRESH_TOKEN GitHub secret.
//
// Usage: node scripts/get-spotify-refresh-token.mjs
// Requirements: in your Spotify app dashboard, add http://localhost:8888/callback
// to the list of Redirect URIs.

import http from 'node:http';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const REDIRECT = 'http://localhost:8888/callback';
const SCOPES = 'user-read-recently-played user-read-currently-playing';
const PORT = 8888;

const rl = createInterface({ input, output });
const clientId = (await rl.question('Spotify Client ID: ')).trim();
const clientSecret = (await rl.question('Spotify Client Secret: ')).trim();
rl.close();

if (!clientId || !clientSecret) {
  console.error('Both Client ID and Client Secret are required.');
  process.exit(1);
}

const state = Math.random().toString(36).slice(2);
const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT);
authUrl.searchParams.set('scope', SCOPES);
authUrl.searchParams.set('state', state);

console.log('\n1. Open this URL in your browser to authorize:\n');
console.log(authUrl.toString(), '\n');
console.log(`2. After approving, Spotify will redirect to ${REDIRECT}.\n   Listening for the callback...\n`);

const code = await new Promise((resolve, reject) => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if (url.pathname !== '/callback') {
      res.writeHead(404).end();
      return;
    }
    const returnedState = url.searchParams.get('state');
    const c = url.searchParams.get('code');
    const err = url.searchParams.get('error');
    if (err) {
      res.writeHead(400, { 'Content-Type': 'text/plain' }).end(`Spotify error: ${err}`);
      server.close();
      reject(new Error(err));
      return;
    }
    if (returnedState !== state || !c) {
      res.writeHead(400, { 'Content-Type': 'text/plain' }).end('Bad state or missing code.');
      server.close();
      reject(new Error('Bad state or missing code'));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' }).end('<h1>Got it. You can close this tab.</h1>');
    server.close();
    resolve(c);
  });
  server.listen(PORT);
});

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${auth}`,
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT,
  }),
});

const json = await tokenRes.json();
if (!tokenRes.ok) {
  console.error('Token exchange failed:', json);
  process.exit(1);
}

console.log('\n✓ Refresh token (save as the SPOTIFY_REFRESH_TOKEN GitHub Actions secret):\n');
console.log(json.refresh_token, '\n');
