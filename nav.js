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

// V2 interactions: Decision Path Explorer, Build Lab filters, and case logic panel
(function () {
  const decisions = {
    promote: {
      surfaceTitle: 'A promotion form and a performance rating.',
      surfaceCopy: 'The visible artefact is the form. The actual decision depends on role scope, level evidence, calibration context, budget, timing and approval rights.',
      infraTitle: 'Eligibility, evidence, approval paths and exception handling.',
      infraCopy: 'A promotion decision needs structured evidence, level criteria, manager input, People review, compensation impact checks, decision state and audit trail.',
      href: 'calibration-onyx-demo.html'
    },
    role: {
      surfaceTitle: 'A rewritten job description or new title.',
      surfaceCopy: 'Most teams focus on wording, title and hiring urgency. The risk is that the level and salary decision becomes hidden inside a document edit.',
      infraTitle: 'Role architecture, scope evidence, pay range and review routing.',
      infraCopy: 'Role change needs level criteria, scope comparison, band impact, internal equity checks, manager rationale and approval thresholds.',
      href: 'onyx-role-architecture-studio.html'
    },
    rem: {
      surfaceTitle: 'A compensation spreadsheet.',
      surfaceCopy: 'The spreadsheet shows numbers, but the real decision is how budget lands across cohorts, eligibility rules, risk cases and approval boundaries.',
      infraTitle: 'Budget envelopes, cohort logic, eligibility and governance-ready outputs.',
      infraCopy: 'Rem review needs modelling rules, exception handling, Finance review, People leadership visibility and a clean handoff to execution systems.',
      href: 'rem-review-demo.html'
    },
    calibration: {
      surfaceTitle: 'A calibration meeting.',
      surfaceCopy: 'The live session is only the visible moment. Most inconsistency happens before the meeting when evidence, distributions and recommendations are not governed.',
      infraTitle: 'Async triage, distribution guardrails and persistent decision state.',
      infraCopy: 'Calibration needs pre-work, role-based visibility, promotion checks, divisional roll-up and an audit trail that survives the meeting.',
      href: 'calibration-onyx-demo.html'
    },
    risk: {
      surfaceTitle: 'A workforce dashboard.',
      surfaceCopy: 'Dashboards report what changed. Leaders still need to know what matters, where the risk is concentrated and what decision is required now.',
      infraTitle: 'Cross-source signals and decision prompts.',
      infraCopy: 'Workforce risk needs movement, performance, pay position, engagement and retention signals joined into a prioritised decision surface.',
      href: 'onyx-workforce-intelligence.html'
    },
    eor: {
      surfaceTitle: 'A country headcount threshold.',
      surfaceCopy: 'Headcount alone cannot decide whether to establish an entity. Finance, Legal, Business and People each own part of the risk picture.',
      infraTitle: 'Weighted triggers, hard overrides and stakeholder-owned inputs.',
      infraCopy: 'EOR conversion needs a shared framework, domain-owned ratings, audit trail and escalation when existential risk cannot be averaged away.',
      href: 'eor-matrix.html'
    },
    help: {
      surfaceTitle: 'A wiki search or chatbot answer.',
      surfaceCopy: 'The user asks a question, finds a policy page, then still has to work out what to do next and which team or workflow owns the action.',
      infraTitle: 'Trusted knowledge, role-aware guidance and workflow routing.',
      infraCopy: 'The future front door should help Zipsters, managers and leaders move from intent to trusted answer to the right workflow or human team.',
      href: 'thinking.html'
    }
  };

  const explorer = document.querySelector('[data-decision-explorer]');
  if (explorer) {
    const surfaceTitle = document.getElementById('decision-surface-title');
    const surfaceCopy = document.getElementById('decision-surface-copy');
    const infraTitle = document.getElementById('decision-infra-title');
    const infraCopy = document.getElementById('decision-infra-copy');
    const link = document.getElementById('decision-link');
    explorer.querySelectorAll('[data-decision]').forEach(button => {
      button.addEventListener('click', () => {
        const data = decisions[button.dataset.decision];
        if (!data) return;
        explorer.querySelectorAll('[data-decision]').forEach(item => item.classList.toggle('is-active', item === button));
        surfaceTitle.textContent = data.surfaceTitle;
        surfaceCopy.textContent = data.surfaceCopy;
        infraTitle.textContent = data.infraTitle;
        infraCopy.textContent = data.infraCopy;
        link.href = data.href;
      });
    });
  }

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
      context: 'A recurring performance cycle where ratings, promotion recommendations and executive review need a single governed decision state.',
      path: 'Manager prep → async triage → People Partner review → live calibration → divisional roll-up → executive sign-off.',
      logic: 'Distribution guardrails, promotion eligibility, role-based visibility and audit trail are embedded in the workflow.',
      human: 'Managers, People Partners and executives own the judgment; the tool structures the evidence and routes exceptions.',
      ai: 'Future AI could summarise review evidence or flag inconsistencies, but it should not decide ratings or promotions.'
    },
    rem: {
      title: 'Rem Review Planning Studio',
      context: 'Annual compensation planning where budget choices, eligibility logic and cohort impact need to be tested before execution.',
      path: 'Budget envelope → cohort modelling → eligibility checks → scenario comparison → Finance/CPO review → ChartHop execution.',
      logic: 'Planning rules and modelling assumptions sit upstream of the system of record so the decision is governed before rollout.',
      human: 'Total Rewards, Finance and the CPO own the final allocation and exceptions.',
      ai: 'Future AI could explain scenario movements or summarise exceptions, but budget authority stays with humans.'
    },
    role: {
      title: 'Role Architecture Studio',
      context: 'Role level and hiring range decisions where a job description alone is not enough to justify title, level or compensation movement.',
      path: 'Role intake → architecture assessment → range guidance → internal change review → exception routing → decision certificate.',
      logic: 'The current demo is deterministic: structured evidence plus architecture thresholds plus review routing.',
      human: 'People and Total Rewards review boundary cases, L5/L6 movements, overrides and compensation exceptions.',
      ai: 'Future AI could extract evidence from approved JD libraries and prior decisions; rules and approvals stay outside the model.'
    },
    workforce: {
      title: 'Workforce Decision Intelligence',
      context: 'Workforce leaders need a joined-up signal of where action is required, not a disconnected collection of charts.',
      path: 'Workforce movement → performance context → engagement signal → pay position → risk interpretation → next action prompt.',
      logic: 'The prototype combines signals into a decision-ready surface, with division-aware views and priority prompts.',
      human: 'Leaders and People Partners decide what intervention is appropriate; the tool does not automate action.',
      ai: 'Future AI could generate briefings or investigate drivers, but the signal thresholds and action ownership remain governed.'
    },
    eor: {
      title: 'EOR Entity Readiness Matrix',
      context: 'EOR-to-entity decisions require Finance, Legal, Business and People to contribute domain-specific input to a shared recommendation.',
      path: 'Market inputs → weighted trigger assessment → hard override check → RAG status → cross-functional escalation.',
      logic: 'Finance owns Tax PE and break-even inputs; Legal owns compliance exposure; Business owns strategic commitment; People operates the framework.',
      human: 'Domain experts own their inputs and leaders own the entity decision.',
      ai: 'Future AI could summarise market risk notes, but it should not override Finance or Legal ownership.'
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
              <div><strong>Context</strong><p>${data.context}</p></div>
              <div><strong>Decision path</strong><p>${data.path}</p></div>
              <div><strong>Workflow logic</strong><p>${data.logic}</p></div>
              <div><strong>Human review point</strong><p>${data.human}</p></div>
              <div><strong>Governance guardrail</strong><p>Human-in-the-loop by design. Exceptions route to accountable owners, not automated final judgment.</p></div>
              <div><strong>AI opportunity</strong><p>${data.ai}</p></div>
            </div>
          </div>`;
        casePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
})();
