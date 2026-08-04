// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.setAttribute('aria-hidden', String(isOpen));
    menu.classList.toggle('nav-mobile-menu--open', !isOpen);
    toggle.classList.toggle('nav-mobile-toggle--open', !isOpen);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      menu.classList.remove('nav-mobile-menu--open');
      toggle.classList.remove('nav-mobile-toggle--open');
    }
  });

  // Scroll-aware nav
  const nav = document.getElementById('site-nav');
  let lastY = 0;
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (y > 80) {
      nav.classList.add('site-nav--scrolled');
    } else {
      nav.classList.remove('site-nav--scrolled');
    }
    lastY = y;
  }, { passive: true });
})();

// V2 interactions: Build Lab filters and case logic panel
(function () {
  const filterRoot = document.querySelector('[data-build-filters]');
  const buildCards = Array.from(document.querySelectorAll('[data-build-card]'));
  if (filterRoot && buildCards.length) {
    filterRoot.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterRoot.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('is-active', item === button));
        buildCards.forEach(card => {
          const tags = (card.dataset.tags || '').split(' ');
          const show = filter === 'all' || tags.includes(filter);
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  const cases = {
    calibration: {
      title: 'Calibration Engine',
      context: 'Calibration brings together manager judgment, performance evidence, promotion recommendations and fairness checks under time pressure.',
      path: 'Manager prep → People Partner triage → live calibration → divisional review → executive sign-off.',
      logic: 'The prototype makes the status, guardrails and decision record visible before and after the meeting.',
      human: 'Managers, People Partners and executives still own the judgment; the tool reduces the mess around the judgment.',
      ai: 'AI could summarise review evidence or flag inconsistencies later, but it should not decide ratings or promotions.'
    },
    rem: {
      title: 'Rem Review Planning Studio',
      context: 'Rem review requires leaders to balance budget, fairness, performance context, salary bands and exceptions at the same time.',
      path: 'Budget envelope → eligibility checks → cohort modelling → scenario comparison → Finance/CPO review → execution.',
      logic: 'The prototype puts the planning rules where the planning work actually happens, before outcomes move downstream.',
      human: 'Total Rewards, Finance and the CPO still own final allocation and exceptions.',
      ai: 'AI could explain scenario movements or summarise exceptions later, but budget authority stays with humans.'
    },
    role: {
      title: 'Role Architecture Studio',
      context: 'Role changes affect pay, fairness, hiring, internal moves and career growth — not just title wording.',
      path: 'Role intake → level assessment → hiring range guidance → internal change review → exception routing → decision record.',
      logic: 'The current demo uses rule-based evidence and architecture thresholds so the reasoning is visible.',
      human: 'People and Total Rewards review boundary cases, senior-level moves, overrides and pay exceptions.',
      ai: 'AI could extract evidence from approved JDs and prior decisions later; rules and approvals stay outside the model.'
    },
    workforce: {
      title: 'Workforce Decision Intelligence',
      context: 'Leaders often have data, but not always a clear signal of where action is needed now.',
      path: 'Movement → performance context → engagement signal → pay position → risk interpretation → next action prompt.',
      logic: 'The prototype joins signals that usually sit apart so leaders can ask better questions faster.',
      human: 'Leaders and People Partners decide the intervention; the tool does not automate the action.',
      ai: 'AI could generate briefings or investigate drivers later, but action ownership remains governed.'
    },
    eor: {
      title: 'EOR Entity Readiness Matrix',
      context: 'EOR-to-entity decisions cut across People, Finance, Legal and Business, so each team needs a shared view of the risk.',
      path: 'Market inputs → trigger assessment → hard override check → RAG status → cross-functional escalation.',
      logic: 'Each function owns its input while People operates the shared framework and decision record.',
      human: 'Domain experts own their inputs and leaders own the entity decision.',
      ai: 'AI could summarise market risk notes later, but it should not override Finance or Legal ownership.'
    }
  };
  const casePanel = document.querySelector('[data-case-panel]');
  if (casePanel) {
    document.querySelectorAll('[data-case-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const data = cases[button.dataset.caseToggle];
        if (!data) return;
        casePanel.innerHTML = `
          <div class="case-panel-content">
            <span class="section-eyebrow">Prototype anatomy</span>
            <h2>${data.title}</h2>
            <div class="case-anatomy-grid">
              <div><strong>The real-world problem</strong><p>${data.context}</p></div>
              <div><strong>The path that needs clarity</strong><p>${data.path}</p></div>
              <div><strong>What sits underneath</strong><p>${data.logic}</p></div>
              <div><strong>Where humans stay involved</strong><p>${data.human}</p></div>
              <div><strong>The guardrail</strong><p>Human-in-the-loop by design. Exceptions route to accountable owners, not automated final judgment.</p></div>
              <div><strong>Where AI could help later</strong><p>${data.ai}</p></div>
            </div>
          </div>`;
        casePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
})();
