// ============================================================
// VARIANT B — GRADIENT GARDEN
// Soft pink-peach aurora, deep-ink type, curvy shapes.
// Cursor-follow spotlight on project cards.
// ============================================================

window.renderVariantB = function renderVariantB(root) {
  const d = SiteData;
  root.innerHTML = `
    <div class="vb-ambient" aria-hidden="true">
      <div class="vb-aurora vb-a1"></div>
      <div class="vb-aurora vb-a2"></div>
      <div class="vb-aurora vb-a3"></div>
    </div>

    <!-- HERO: interactive gradient reacts to cursor -->
    <section class="vb-hero" id="vb-hero">
      <div class="vb-hero-glow" id="vb-hero-glow"></div>
      <div class="container">
        <div class="vb-hero-top">
          <div class="row" style="gap:12px;flex-wrap:wrap">
            <span class="availability-dot"></span>
            <span class="availability-label">Open to senior / staff roles · Seattle</span>
          </div>
          <div id="now-strip-b" class="now-strip"></div>
        </div>
        <h1 class="vb-title reveal">
          <span>Software that</span>
          <span class="vb-title-grad">ships, scales,</span>
          <span>and stays <em>kind</em>.</span>
        </h1>
        <div class="vb-hero-bottom reveal">
          <p class="vb-lede">
            I'm <strong>Macallan Savett</strong>. Software Engineer II at Skilljar. I build modular Python / Django / React systems with AI glued into the parts that matter — and I care about the parts that don't feel like code.
          </p>
          <div class="vb-hero-actions">
            <a href="#projects" class="btn btn-primary">Browse work</a>
            <a href="#contact" class="btn btn-ghost">Say hi</a>
          </div>
        </div>
      </div>
    </section>

    <!-- AT A GLANCE STRIP -->
    <section class="vb-glance">
      <div class="container">
        <div class="vb-glance-grid">
          <div class="vb-glance-card reveal"><span class="vb-big">15+</span><span>mini-apps in personal hub</span></div>
          <div class="vb-glance-card reveal"><span class="vb-big">5</span><span>AI agents reviewing diffs</span></div>
          <div class="vb-glance-card reveal"><span class="vb-big">40%</span><span>faster deploys shipped at Skilljar</span></div>
          <div class="vb-glance-card reveal"><span class="vb-big">~5yr</span><span>full-stack · Python + React</span></div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about">
      <div class="container">
        <div class="vb-about reveal">
          <div class="vb-about-media">
            <img src="images/portrait.jpeg" alt="Macallan Savett" />
            <div class="vb-blob-decor"></div>
          </div>
          <div class="vb-about-body">
            <p class="eyebrow">About</p>
            <h2 class="vb-h2">Real estate taught me the game; engineering taught me the tools.</h2>
            <p class="vb-p">At Colliers SF I closed $100M+ deals, wrangled 70k-row Salesforce migrations, and learned that detail is leverage. When I moved into software, the reflexes came with me — now I ship production systems with the same care.</p>
            <p class="vb-p">I design modular platforms, integrate LLMs where they actually move the needle, and keep AWS bills honest. Real-time features on WebSocket, CI/CD that actually deploys, auth that survives audits.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="work">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">Experience</h2>
          <span class="section-kicker">[ where I've shipped ]</span>
        </div>
        ${d.experience.map((x) => `
          <article class="vb-exp reveal">
            <div class="vb-exp-l">
              <h3>${x.role}</h3>
              <p class="vb-exp-co">${x.company}</p>
              <p class="vb-exp-when">${x.period} · ${x.location}</p>
            </div>
            <ul class="vb-exp-list">
              ${x.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </article>
        `).join('')}
      </div>
    </section>

    <!-- AI -->
    <section id="ai">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">AI &amp; ML toolkit</h2>
          <span class="section-kicker">[ things I've actually shipped ]</span>
        </div>
        <div class="vb-ai-grid">
          ${d.ai.map((a, i) => `
            <div class="vb-ai reveal" style="--i:${i}">
              <div class="vb-ai-bubble"></div>
              <h3>${a.title}</h3>
              <p>${a.blurb}</p>
              <div class="vb-tags">${a.tags.map(t => `<span>${t}</span>`).join('')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FLAGSHIP -->
    <section id="flagship">
      <div class="container">
        <div class="vb-flagship reveal">
          <span class="vb-flag-tag">★ flagship project</span>
          <h2 class="vb-h2">${d.flagship.name}</h2>
          <p class="vb-flag-one">${d.flagship.one}</p>
          <p class="vb-p">Fifteen self-contained mini-apps — each with its own schema and routes — wired to one auth spine (MFA w/ TOTP + WebAuthn) and one AI layer. PWA, mobile-first, the app I actually use every day.</p>
          <div class="vb-flag-modules">
            ${d.flagship.modules.map(m => `<span>${m}</span>`).join('')}
          </div>
          <div class="vb-flag-stack">${d.flagship.stack.map(s => `<em>${s}</em>`).join('')}</div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">Other projects</h2>
          <span class="section-kicker">[ hover · click to expand ]</span>
        </div>
        <div class="vb-projects" id="vb-projects">
          ${d.projects.map((p) => `
            <article class="vb-proj reveal" data-pid="${p.id}">
              <div class="vb-proj-spot"></div>
              <button class="vb-proj-head" aria-expanded="false">
                <div>
                  <h3>${p.name}</h3>
                  <p>${p.one}</p>
                </div>
                <span class="vb-proj-toggle">+</span>
              </button>
              <div class="vb-proj-body">
                <p>${p.body}</p>
                <div class="vb-tags">${p.stack.map(t => `<span>${t}</span>`).join('')}</div>
                <a href="${p.link}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub ↗</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- BEYOND -->
    <section id="beyond">
      <div class="container">
        <div class="section-header reveal">
          <h2 class="section-title">Beyond code</h2>
          <span class="section-kicker">[ the other hours ]</span>
        </div>
        <div class="vb-beyond">
          ${d.beyond.map((b) => `
            <div class="vb-beyond-item reveal">
              <div class="vb-beyond-bubble"></div>
              <h4>${b.label}</h4>
              <p>${b.note}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact">
      <div class="container">
        <div class="vb-contact reveal">
          <h2 class="vb-h2">Let's make something.</h2>
          <p class="vb-p" style="max-width:52ch">Open to senior / staff roles and collaborations. I reply within a day.</p>
          <div class="vb-hero-actions" style="margin-top:18px">
            <a class="btn btn-primary" href="mailto:${d.profile.email}">Email</a>
            <a class="btn btn-ghost" href="${d.profile.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
            <a class="btn btn-ghost" href="${d.profile.github}" target="_blank" rel="noopener">GitHub</a>
            <a class="btn btn-ghost" href="${d.profile.resume}" target="_blank" rel="noopener">Résumé</a>
          </div>
        </div>
      </div>
    </section>
    <footer class="vb-footer"><div class="container mono"><span>© ${new Date().getFullYear()} Macallan Savett</span><span>Seattle · made with care</span></div></footer>
  `;

  mountNowStrip(root.querySelector('#now-strip-b'));

  // Hero glow follows cursor
  const hero = root.querySelector('#vb-hero');
  const glow = root.querySelector('#vb-hero-glow');
  if (hero && glow) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      glow.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      glow.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  // Spotlight on project cards
  root.querySelectorAll('.vb-proj').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
    const btn = card.querySelector('.vb-proj-head');
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.querySelector('.vb-proj-toggle').textContent = open ? '–' : '+';
    });
  });

  Utils.reveal();
};
