// ============================================================
// SHARED DATA
// ============================================================
window.SiteData = {
  profile: {
    name: "Macallan Savett",
    role: "Software Engineer",
    city: "Seattle",
    email: "jsavett@gmail.com",
    linkedin: "https://bit.ly/3izBUZc",
    github: "https://github.com/micjoey",
    resume: "https://drive.google.com/file/d/1olpkyksuJFzQpki623Pi-KtPLUGIBf8V/view?usp=sharing",
  },
  now: [
    { kind: "Building", text: "Personal Modular App Hub (Next.js 15, 15+ modules)", icon: "hammer" },
    { kind: "Shipping", text: "Multi-agent code review system w/ FastAPI", icon: "ship" },
    { kind: "Reading", text: "Designing Data-Intensive Applications — Kleppmann", icon: "book" },
    { kind: "Listening", text: "Bonobo · Dancing Astronaut mixes", icon: "music" },
    { kind: "Training", text: "Summer half-marathon block — week 6/16", icon: "run" },
    { kind: "Dancing", text: "West Coast Swing, Tuesdays at Century", icon: "sparkle" },
  ],
  experience: [
    {
      role: "Software Engineer II",
      company: "Skilljar (Gainsight)",
      location: "Seattle, WA",
      period: "Aug 2022 — Present",
      current: true,
      highlights: [
        "Led scalable frontend architecture → 40% faster feature releases",
        "Implemented Cypress QA coverage → 30% fewer prod incidents",
        "Optimized AWS (S3 / CloudFront / Lambda) → 30% lower latency",
        "CI/CD on Docker + AWS + Node → 40% faster deploys, multi-region",
        "Custom SAML / OAuth → 15% faster auth, tighter security",
        "Mentored 5 engineers on system design (one got promoted)",
      ],
    },
    {
      role: "Software Engineer I",
      company: "Skilljar (Gainsight)",
      location: "Seattle, WA",
      period: "Jan 2021 — Aug 2022",
      highlights: [
        "Built scalable JS / Vue frontends → 15% better page loads",
        "Led AWS migration → 30% lower latency, 20% lower cost",
        "PyTest + Django CI → 40% higher test coverage",
        "Automated PII compliance tooling → 50% less manual work",
      ],
    },
  ],
  priorCareer: {
    title: "Before engineering",
    blurb: "I spent ~4 years in commercial real estate and hospitality — Colliers SF (research / brokerage / escrow on $100M+ deals), Aspen Skiing Co., Ritz-Carlton. Fast-paced, detail-obsessed work. The instinct for shipping carefully-ordered operations stuck around.",
    stints: [
      { role: "Research Analyst · Junior Broker · Jr. Escrow Manager", org: "Colliers International · SF", when: "2018 — 2019" },
      { role: "Product Sales & Services", org: "Aspen Skiing Company", when: "2016 — 2017" },
      { role: "Barback", org: "Ritz-Carlton · Santa Barbara", when: "2016" },
    ],
  },
  ai: [
    { title: "LLM Integration & API Development", blurb: "Production OpenAI + Anthropic Claude APIs. Structured outputs, prompt patterns, retries, rate limits.", tags: ["OpenAI", "Claude", "Structured outputs", "Rate limiting"] },
    { title: "Multi-Agent Code Review", blurb: "Five specialized agents reviewing correctness, architecture, readability, performance, pedagogy — FastAPI, async, JSON schema.", tags: ["Multi-agent", "FastAPI", "Async", "JSON schema"] },
    { title: "Speech → Text → Insights", blurb: "Audio ingest → transcription → NLP → summary. Django batch pipeline storing structured recaps.", tags: ["Speech-to-text", "NLP", "Summarization", "Batch"] },
    { title: "Content & Document Gen", blurb: "Templated, context-injected generation at scale. Parsing + extraction + personalization.", tags: ["Templating", "Parsing", "Context", "Batch gen"] },
    { title: "Data Pipelines on Lambda", blurb: "Serverless churn analysis + aggregation. Automated reporting — 20% faster processing.", tags: ["AWS Lambda", "Pipelines", "Aggregation", "Reporting"] },
    { title: "API Security & Config", blurb: "AWS Secrets Manager for LLM keys, retry / circuit-breaker patterns, environment isolation.", tags: ["Secrets Manager", "Retries", "Error handling", "Config"] },
  ],
  flagship: {
    name: "Personal Modular App Hub",
    one: "Fifteen self-contained mini-apps, one shared auth + AI spine.",
    stack: ["Next.js 15", "TypeScript", "MongoDB", "MFA / WebAuthn", "OpenAI + Claude", "PWA"],
    modules: ["Recipes & meal planning", "Calendar", "Executive Assistant", "Gift tracker", "Habit & goals", "Knowledge mgmt", "Daily voice log", "Soccer availability", "Social sync", "& 6 more"],
    note: "Private repo · my daily-driver productivity platform",
  },
  projects: [
    {
      id: "dailyvoice",
      name: "DailyVoice-Log",
      one: "Audio-first productivity journal — prompt → record → transcribe → summarize.",
      body: "Automates daily prompt emails, ingests voice notes, runs them through a speech-to-text + NLP pipeline, and ships weekly summaries. Django REST backend handles mail, batch processing, storage; React frontend for reviewing trends over time.",
      stack: ["React", "Django", "AI/ML", "Email automation"],
      link: "https://github.com/micjoey/DailyVoiceLog",
      year: "2024",
      image: "images/dailyvoice.gif",
    },
    {
      id: "tavern",
      name: "TavernMaster",
      one: "Real-time campaign manager for tabletop RPGs, DM + player modes.",
      body: "Full-stack platform with WebSocket chat, JWT auth, invitation system, and role-based dashboards. Throttled WS server, modular SASS UI, CRUD for campaigns & characters.",
      stack: ["React", "Django REST", "WebSocket", "JWT"],
      link: "https://github.com/micjoey/TavernMaster",
      year: "2023",
      image: "images/dnd.png",
    },
    {
      id: "ai-review",
      name: "AI Review",
      one: "Engineering-reasoning trainer — design options, justify, diff review by 5 agents.",
      body: "Asks you for 3 design options and a justification before you ever push code. On diff, 5 specialized agents (correctness, architecture, readability, performance, teaching) weigh in. FastAPI + Next.js. Doesn't store code — only feedback.",
      stack: ["FastAPI", "Next.js", "LLMs", "AWS Secrets"],
      link: "https://github.com/micjoey/AI_Review",
      year: "2024",
    },
    {
      id: "workout",
      name: "Adaptive Workout App",
      one: "Tracks workouts, adapts plans based on what you actually did.",
      body: "Handles numeric reps and time-based values (\"1:00\", \"30s\"), generates next-session plans from performance history. WCAG-AA UI with semantic HTML, focus states, contrast. Feature-based module structure.",
      stack: ["Next.js", "FastAPI", "SQLModel", "Tailwind"],
      link: "https://github.com/micjoey/workout-app",
      year: "2024",
    },
    {
      id: "coverletter",
      name: "Unique Cover Letter Helper",
      one: "Tailored cover letters from a job description + your profile.",
      body: "Parses job descriptions, matches against profile, and generates role-aware letters. Django backend + React frontend. Supports versioning across applications.",
      stack: ["React", "Django", "AI", "Heroku"],
      link: "https://github.com/micjoey/Unique-Cover-Letter-Helper",
      year: "2022",
      image: "images/coverletter.gif",
    },
    {
      id: "soccer",
      name: "Soccer Team Manager",
      one: "Availability, schedules, rosters — Google-auth'd team portal.",
      body: "Players mark availability, admins schedule games, rosters stay in sync. React + TS frontend, Node backend, Google OAuth.",
      stack: ["React", "TypeScript", "Node", "Google OAuth"],
      link: "https://github.com/micjoey/soccer-website",
      year: "2023",
    },
  ],
  beyond: [
    { label: "Half-marathons in summer", note: "Consistency + long-horizon planning" },
    { label: "Soccer — player + referee", note: "Sharp decisions under pressure" },
    { label: "West Coast Swing dancing", note: "Precision, adaptability, always learning" },
    { label: "Skiing + snowboarding in winter", note: "Grew up in the mountains" },
    { label: "Golf, year-round", note: "The slow kind of focus" },
  ],
};

// ============================================================
// SHARED UTILITIES
// ============================================================
window.Utils = (() => {
  const icon = (name, size = 18) => {
    const paths = {
      hammer: '<path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91"/>',
      ship: '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0022 13.5l-9.5-3.4a1 1 0 00-1 0L2 13.5a11.6 11.6 0 002.62 6.5"/><path d="M19 8V5a1 1 0 00-1-1H6a1 1 0 00-1 1v3"/><path d="M12 10v10"/>',
      book: '<path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20"/>',
      music: '<circle cx="8" cy="18" r="3"/><circle cx="19" cy="16" r="3"/><path d="M22 16V4L11 6v12"/>',
      run: '<circle cx="13" cy="4" r="2"/><path d="M4 22l5-4 3-6 4 4v6"/><path d="M9 12l4-2"/><path d="M19 12l-3 1 2 3"/>',
      sparkle: '<path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8M5.6 18.4l2.8-2.8m7.2-7.2 2.8-2.8"/>',
      github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>',
      linkedin: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
      mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/>',
      arrow: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
      download: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      minus: '<path d="M5 12h14"/>',
    };
    return `<svg class="now-icon" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ''}</svg>`;
  };

  const reveal = () => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  };

  return { icon, reveal };
})();

// ============================================================
// NOW STRIP — rotates every 3.4s
// ============================================================
window.mountNowStrip = function mountNowStrip(el) {
  if (!el) return;
  const items = SiteData.now;
  let i = 0;
  const render = () => {
    const it = items[i];
    el.innerHTML = `
      <span class="now-pulse" aria-hidden="true"></span>
      <span class="now-label">NOW</span>
      <span class="now-content">
        ${Utils.icon(it.icon)}
        <span class="now-rot"><strong>${it.kind}:</strong>&nbsp;${it.text}</span>
      </span>
    `;
  };
  render();
  setInterval(() => { i = (i + 1) % items.length; render(); }, 3400);
};

// ============================================================
// SCROLL REVEAL
// ============================================================
document.addEventListener('DOMContentLoaded', () => Utils.reveal());
