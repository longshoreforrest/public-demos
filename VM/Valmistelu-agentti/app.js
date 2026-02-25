/* ============================================================
   app.js — Pääkontrolleri
   Välilehdet, sidebar, työnkulun ohjaus, UI-logiikka
   ============================================================ */

(function () {
  'use strict';

  // ── References ─────────────────────────────────────────────
  const engine = new AgentEngine();
  const charts = new ChartManager();

  // ── SpeechManager ───────────────────────────────────────────
  class SpeechManager {
    constructor() {
      this.enabled = true;
      this.language = 'fi';
      this.volume = 0.8;
      this.rate = 1.0;
      this.supported = 'speechSynthesis' in window;
      this.voices = [];
      this.selectedVoice = null;
      this._pendingText = null;

      if (this.supported) {
        this._loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => this._loadVoices();
        }
      }
    }

    _loadVoices() {
      this.voices = speechSynthesis.getVoices();
      this._selectVoice();
    }

    _selectVoice() {
      // Preferred voices by quality (highest first)
      const preferred = {
        fi: ['Satu', 'Onni', 'Noora', 'Harri'],
        en: ['Samantha', 'Daniel', 'Karen', 'Moira'],
        sv: ['Klara', 'Alva', 'Oskar']
      };
      const langPrefix = { fi: 'fi', en: 'en', sv: 'sv' }[this.language] || 'fi';
      const prefs = preferred[this.language] || [];

      // Try preferred voices first
      for (const name of prefs) {
        const v = this.voices.find(v => v.name === name && v.lang.startsWith(langPrefix));
        if (v) { this.selectedVoice = v; return; }
      }
      // Try any voice with "enhanced" or "premium" in name
      let voice = this.voices.find(v => v.lang.startsWith(langPrefix) && /enhanced|premium/i.test(v.name));
      // Fallback: any local voice for the language
      if (!voice) voice = this.voices.find(v => v.lang.startsWith(langPrefix) && v.localService);
      // Fallback: any voice for the language
      if (!voice) voice = this.voices.find(v => v.lang.startsWith(langPrefix));
      // Last resort: English
      if (!voice) voice = this.voices.find(v => v.lang.startsWith('en'));
      this.selectedVoice = voice || null;
    }

    setLanguage(lang) {
      this.language = lang;
      this._selectVoice();
      this.stop();
    }

    setEnabled(bool) {
      this.enabled = bool;
      if (!bool) this.stop();
    }

    speak(text) {
      if (!this.supported || !this.enabled || !text) return;
      if (speechSynthesis.speaking) {
        this._pendingText = text;
        return;
      }
      this._doSpeak(text);
    }

    _doSpeak(text) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.selectedVoice) utterance.voice = this.selectedVoice;
      utterance.volume = this.volume;
      utterance.rate = this.rate;
      utterance.lang = { fi: 'fi-FI', en: 'en-US', sv: 'sv-SE' }[this.language] || 'fi-FI';
      utterance.onend = () => {
        if (this._pendingText) {
          const next = this._pendingText;
          this._pendingText = null;
          this._doSpeak(next);
        }
      };
      utterance.onerror = () => {
        this._pendingText = null;
      };
      speechSynthesis.speak(utterance);
    }

    stop() {
      if (this.supported) {
        this._pendingText = null;
        speechSynthesis.cancel();
      }
    }
  }

  const speechManager = new SpeechManager();

  let phasesCompleted = 0;
  const totalPhases = 5;

  // DOM refs
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const btnStart = document.getElementById('btnStart');
  const btnFreshness = document.getElementById('btnFreshness');
  const btnReset = document.getElementById('btnReset');
  const agentLog = document.getElementById('agentLog');
  const badgeStatus = document.getElementById('badgeStatus');

  // Source lookup helper
  function findSource(sourceId) {
    const all = [...DATA.sources.eu, ...DATA.sources.international, ...DATA.sources.domestic];
    return all.find(s => s.id === sourceId);
  }

  function findConflict(conflictId) {
    return DATA.conflicts.find(c => c.id === conflictId);
  }

  function getSourceCategory(sourceId) {
    if (DATA.sources.eu.find(s => s.id === sourceId)) return 'eu';
    if (DATA.sources.international.find(s => s.id === sourceId)) return 'international';
    return 'domestic';
  }

  // ── Tab Navigation ─────────────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(tabId) {
    tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    tabPanels.forEach(panel => panel.classList.toggle('active', panel.id === `panel-${tabId}`));
    // Sync stepper active highlight
    document.querySelectorAll('.process-step').forEach(step => {
      if (!step.classList.contains('done')) {
        step.classList.toggle('active', step.dataset.phase === tabId);
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // ── Process Stepper ──────────────────────────────────────────
  const processPhases = ['sources', 'conflicts', 'draft', 'impact', 'freshness'];
  const completedPhases = new Set();

  function updateStepper(activePhase) {
    const steps = document.querySelectorAll('.process-step');
    const connectors = document.querySelectorAll('.step-connector');
    steps.forEach((step) => {
      const phase = step.dataset.phase;
      step.classList.remove('active', 'done');
      if (completedPhases.has(phase)) {
        step.classList.add('done');
      } else if (phase === activePhase) {
        step.classList.add('active');
      }
    });
    connectors.forEach((conn, i) => {
      conn.classList.toggle('done', completedPhases.has(processPhases[i]));
    });
  }

  document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('click', () => {
      switchTab(step.dataset.phase);
      updateStepper(step.dataset.phase);
    });
  });

  // ── Project Selector ──────────────────────────────────────
  const projectSelect = document.getElementById('projectSelect');
  if (projectSelect) {
    projectSelect.addEventListener('change', () => {
      const idx = parseInt(projectSelect.value, 10);
      const proj = DATA.projects[idx];
      if (!proj) return;

      document.getElementById('projectTitle').textContent = proj.title;
      document.getElementById('projectCode').textContent = proj.code;
      document.getElementById('projectPhase').textContent = proj.phase;
      document.getElementById('projectDeadline').textContent = proj.deadline;

      // Update header
      document.querySelector('.header-title').textContent = proj.headerTitle;
      const badgeContainer = document.querySelector('.header-badges');
      badgeContainer.innerHTML = proj.badges
        .map(b => `<span class="badge ${b.class}">${b.text}</span>`)
        .join('')
        + `<span class="badge badge-emerald" id="badgeStatus">${phasesCompleted} / ${totalPhases} valmis</span>`;

      // Trigger reset
      btnReset.click();
    });
  }

  // ── Sidebar Toggle (mobile) ────────────────────────────────
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('visible');
  });

  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
  });

  // ── Agent State UI ─────────────────────────────────────────
  function setAgentState(agentId, state) {
    const statusMap = { va: 'agentStatusVA', vaa: 'agentStatusVaA', vam: 'agentStatusVaM' };
    const stateMap = { va: 'agentStateVA', vaa: 'agentStateVaA', vam: 'agentStateVaM' };
    const statusEl = document.getElementById(statusMap[agentId]);
    const stateEl = document.getElementById(stateMap[agentId]);
    if (!statusEl || !stateEl) return;

    statusEl.classList.remove('active', 'active-emerald', 'active-amber');
    stateEl.classList.remove('idle', 'working', 'working-emerald', 'working-amber', 'done');

    if (state === 'working') {
      if (agentId === 'vaa') {
        statusEl.classList.add('active-emerald');
        stateEl.classList.add('working-emerald');
      } else if (agentId === 'vam') {
        statusEl.classList.add('active-amber');
        stateEl.classList.add('working-amber');
      } else {
        statusEl.classList.add('active');
        stateEl.classList.add('working');
      }
      stateEl.textContent = 'Työskentelee';
    } else if (state === 'done') {
      stateEl.classList.add('done');
      stateEl.textContent = 'Valmis';
    } else {
      stateEl.classList.add('idle');
      stateEl.textContent = 'Odottaa';
    }
  }

  // ── Log Entry ──────────────────────────────────────────────
  function addLogEntry(agentId, text) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="log-agent ${agentId}">${DATA.agents[agentId].abbr}</span><span class="log-text">${text}</span>`;
    agentLog.appendChild(entry);
    agentLog.scrollTop = agentLog.scrollHeight;
  }

  // ── Update badge ───────────────────────────────────────────
  function updateProgress() {
    const el = document.getElementById('badgeStatus');
    if (el) el.textContent = `${phasesCompleted} / ${totalPhases} valmis`;
  }

  // ── Source Card Builder ────────────────────────────────────
  function buildSourceCard(source, category) {
    const card = document.createElement('div');
    card.className = 'source-card';

    const typeLabel = category === 'eu' ? 'EU' : (category === 'international' ? 'Kansainvälinen' : 'Kotimainen');
    const metaParts = [];
    if (source.type) metaParts.push(source.type);
    if (source.date) metaParts.push(source.date);
    if (source.status) metaParts.push(source.status);
    if (source.country) metaParts.push(`${source.flag} ${source.country}`);

    card.innerHTML = `
      <div class="source-card-header">
        <span class="source-type-badge ${category}">${typeLabel}</span>
        <span class="source-card-title">${source.shortTitle || source.title}</span>
      </div>
      <div class="source-card-meta">${metaParts.map(p => `<span>${p}</span>`).join('')}</div>
      <div class="source-card-summary">${source.summary}</div>
      ${source.relevance ? `
        <div class="source-relevance">
          <span>Relevanttius</span>
          <div class="relevance-bar"><div class="relevance-fill" style="width:${source.relevance * 100}%"></div></div>
          <span>${Math.round(source.relevance * 100)} %</span>
        </div>
      ` : ''}
    `;

    return card;
  }

  // ── Conflict Card Builder ──────────────────────────────────
  function buildConflictCard(conflict) {
    const card = document.createElement('div');
    card.className = 'conflict-card';

    card.innerHTML = `
      <div class="conflict-header">
        <span class="conflict-severity ${conflict.severity}">${
          conflict.severity === 'critical' ? 'Kriittinen' :
          conflict.severity === 'significant' ? 'Merkittävä' : 'Lievä'
        }</span>
        <span class="conflict-title">${conflict.title}</span>
      </div>
      <div class="conflict-sources">
        <span class="conflict-source-tag">${conflict.source1}</span>
        <span class="conflict-source-tag">${conflict.source2}</span>
      </div>
      <div class="conflict-description">${conflict.description}</div>
      <div class="conflict-recommendation">${conflict.recommendation}</div>
    `;

    return card;
  }

  // ── Article Card Builder ───────────────────────────────────
  function buildArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.id = `article-${article.id}`;

    let changesHTML = '';
    article.changes.forEach(ch => {
      changesHTML += `<div class="change-line ${ch.type}">${ch.type === 'addition' ? '+ ' : '− '}${ch.text}</div>`;
    });

    card.innerHTML = `
      <div class="article-header">
        <span class="article-number">${article.number}</span>
        <span class="article-title">${article.title}</span>
        <span class="article-status ${article.status}">${
          article.status === 'draft' ? 'Luonnos' :
          article.status === 'accepted' ? 'Hyväksytty' : 'Hylätty'
        }</span>
      </div>
      <div class="article-content">
        <div>${article.content}</div>
        ${changesHTML}
      </div>
      ${article.agentComment ? `<div class="article-comment">${article.agentComment}</div>` : ''}
      <div class="article-actions">
        <button class="btn-sm btn-accept" data-article="${article.id}" data-action="accept">Hyväksy</button>
        <button class="btn-sm btn-reject" data-article="${article.id}" data-action="reject">Hylkää</button>
        <button class="btn-sm btn-info" data-article="${article.id}" data-action="info">Pyydä lisätietoa</button>
      </div>
    `;

    return card;
  }

  // ── Article Actions ────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-article]');
    if (!btn) return;

    const articleId = btn.dataset.article;
    const action = btn.dataset.action;
    const card = document.getElementById(`article-${articleId}`);
    if (!card) return;

    const statusEl = card.querySelector('.article-status');
    const article = DATA.draftArticles.find(a => a.id === articleId);

    if (action === 'accept') {
      if (article) article.status = 'accepted';
      statusEl.className = 'article-status accepted';
      statusEl.textContent = 'Hyväksytty';
      addLogEntry('va', `${article.number} hyväksytty.`);
    } else if (action === 'reject') {
      if (article) article.status = 'rejected';
      statusEl.className = 'article-status rejected';
      statusEl.textContent = 'Hylätty';
      addLogEntry('va', `${article.number} hylätty.`);
    } else if (action === 'info') {
      addLogEntry('va', `Lisätietopyyntö: ${article.number} — ${article.title}`);
    }
  });

  // ── Build Freshness Table ──────────────────────────────────
  function buildFreshnessTable() {
    const tbody = document.getElementById('freshnessBody');
    tbody.innerHTML = '';

    DATA.freshness.forEach(item => {
      const tr = document.createElement('tr');
      const alertHTML = item.alert
        ? `<div class="freshness-alert${item.status === 'red' ? ' critical-alert' : ''}">${item.alert}</div>`
        : '';

      tr.innerHTML = `
        <td><span class="freshness-dot ${item.status}"></span></td>
        <td><strong>${item.source}</strong></td>
        <td>${item.lastUpdated}</td>
        <td>${item.lastChecked}</td>
        <td>${item.note}${alertHTML}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ── Build EU Timeline ──────────────────────────────────────
  function buildTimeline() {
    const container = document.getElementById('euTimeline');
    container.innerHTML = '';

    DATA.impact.timeline.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-item';

      let statusText = '';
      if (item.status === 'done') statusText = 'Toteutunut';
      else if (item.status === 'overdue') statusText = '<span class="timeline-status overdue-text">Myöhässä</span>';
      else if (item.status === 'current') statusText = '<span class="timeline-status current-text">Käynnissä</span>';
      else statusText = '<span class="timeline-status">Tulossa</span>';

      div.innerHTML = `
        <div class="timeline-dot ${item.status}"></div>
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-event">${item.event}</div>
        ${statusText}
      `;

      container.appendChild(div);
    });
  }

  // ── Engine Callbacks ───────────────────────────────────────
  engine.onTabSwitch = (tabId) => {
    switchTab(tabId);
    updateStepper(tabId);
  };
  engine.onAgentState = (agentId, state) => setAgentState(agentId, state);
  engine.onLogEntry = (agentId, text) => addLogEntry(agentId, text);

  engine.onSpeak = (text, agentId, eventType) => {
    if (!speechManager.enabled) return;
    if (eventType === 'thinking') return;
    const lang = speechManager.language;
    let spokenText;

    if (eventType === 'phase') {
      const phaseData = DATA.speech.phases[text];
      spokenText = phaseData ? phaseData[lang] : null;
    } else {
      const entry = DATA.speech.messages[text];
      spokenText = entry ? entry[lang] : null;
    }

    if (spokenText) speechManager.speak(spokenText);
  };

  engine.onPhaseChange = (phase) => {
    // Mark previous phases as done in stepper
    const idx = processPhases.indexOf(phase);
    for (let i = 0; i < idx; i++) {
      completedPhases.add(processPhases[i]);
    }
    updateStepper(phase);

    // Hide empty states for the active phase
    const emptyMap = {
      sources: 'emptyStateSources',
      conflicts: 'emptyStateConflicts',
      draft: 'emptyStateDraft',
      impact: 'emptyStateImpact',
      freshness: 'emptyStateFreshness'
    };
    if (emptyMap[phase]) {
      document.getElementById(emptyMap[phase]).style.display = 'none';
    }
    if (phase === 'freshness') {
      document.getElementById('freshnessTable').style.display = '';
    }
  };

  engine.onSourceReveal = async (sourceId) => {
    const source = findSource(sourceId);
    if (!source) return;

    const category = getSourceCategory(sourceId);
    const containerMap = { eu: 'sourceCardsEU', international: 'sourceCardsInt', domestic: 'sourceCardsDom' };
    const container = document.getElementById(containerMap[category]);

    const card = buildSourceCard(source, category);
    container.appendChild(card);
  };

  engine.onConflictReveal = async (conflictId) => {
    const conflict = findConflict(conflictId);
    if (!conflict) return;

    const container = document.getElementById('conflictCards');
    const card = buildConflictCard(conflict);
    container.appendChild(card);
  };

  engine.onArticlesReveal = async (articleIds) => {
    const container = document.getElementById('draftArticles');
    for (const id of articleIds) {
      const article = DATA.draftArticles.find(a => a.id === id);
      if (article) {
        const card = buildArticleCard(article);
        container.appendChild(card);
        await engine._sleep(150);
      }
    }
  };

  engine.onFreshnessReveal = async (freshnessId) => {
    const item = DATA.freshness.find(f => f.id === freshnessId);
    if (!item) return;

    const tbody = document.getElementById('freshnessBody');
    const tr = document.createElement('tr');
    tr.style.animation = 'fadeIn 0.3s ease';
    const alertHTML = item.alert
      ? `<div class="freshness-alert${item.status === 'red' ? ' critical-alert' : ''}">${item.alert}</div>`
      : '';

    tr.innerHTML = `
      <td><span class="freshness-dot ${item.status}"></span></td>
      <td><strong>${item.source}</strong></td>
      <td>${item.lastUpdated}</td>
      <td>${item.lastChecked}</td>
      <td>${item.note}${alertHTML}</td>
    `;
    tbody.appendChild(tr);
  };

  engine.onChartReveal = async (chartId) => {
    if (chartId === 'fiscal') {
      document.getElementById('impactGrid').style.display = 'grid';
      charts.renderFiscalChart();
    } else if (chartId === 'burden') {
      charts.renderBurdenChart();
    } else if (chartId === 'stakeholders') {
      charts.renderStakeholderChart();
    } else if (chartId === 'timeline') {
      buildTimeline();
    }
  };

  engine.onHandoff = async (handoff) => {
    const fromAgent = DATA.agents[handoff.from];
    const toAgent = DATA.agents[handoff.to];
    const feedMap = { 'va-vaa': 'feedDraft', 'vaa-vam': 'feedImpact' };
    const feedId = feedMap[`${handoff.from}-${handoff.to}`] || 'feedDraft';
    const feedEl = document.getElementById(feedId);

    const card = document.createElement('div');
    card.className = 'handoff-card';
    card.innerHTML = `
      <div class="feed-avatar ${handoff.from}" style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;background:${fromAgent.color};flex-shrink:0;">${fromAgent.abbr}</div>
      <div class="handoff-arrow">&#10132;</div>
      <div class="feed-avatar ${handoff.to}" style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;background:${toAgent.color};flex-shrink:0;">${toAgent.abbr}</div>
      <div class="handoff-text">${handoff.message}</div>
    `;
    feedEl.appendChild(card);
    addLogEntry(handoff.from, `Handoff → ${toAgent.name}`);
  };

  engine.onComplete = () => {
    ['sources', 'conflicts', 'draft', 'impact', 'freshness'].forEach(p => completedPhases.add(p));
    updateStepper('complete');
    phasesCompleted = totalPhases;
    updateProgress();
    btnStart.disabled = false;
    btnStart.innerHTML = '<span>&#10003;</span> Analyysi valmis';
    addLogEntry('vam', 'Kaikki analyysit valmiit.');

    // Show source stats + chart
    const allSources = [...DATA.sources.eu, ...DATA.sources.international, ...DATA.sources.domestic];
    document.getElementById('sourceStats').style.display = 'grid';
    document.getElementById('statSourceCount').textContent = allSources.length;
    const avgRel = allSources.reduce((sum, s) => sum + (s.relevance || 0), 0) / allSources.length;
    document.getElementById('statAvgRelevance').textContent = Math.round(avgRel * 100) + ' %';
    document.getElementById('sourceChartContainer').style.display = 'block';
    charts.renderSourceDistribution();
  };

  // ── Start Button ───────────────────────────────────────────
  btnStart.addEventListener('click', () => {
    if (engine.running) return;
    if (engine.currentPhase === 'complete') return;

    btnStart.disabled = true;
    btnStart.innerHTML = '<span style="display:inline-block;animation:pulse-state 1s infinite;">&#9654;</span> Analyysi käynnissä...';

    phasesCompleted = 0;
    updateProgress();

    engine.runWorkflow();
  });

  // ── Freshness Button ───────────────────────────────────────
  btnFreshness.addEventListener('click', () => {
    switchTab('freshness');
    document.getElementById('freshnessTable').style.display = '';
    document.getElementById('emptyStateFreshness').style.display = 'none';
    buildFreshnessTable();

    // Flash badge
    const badge = document.getElementById('badgeFreshness');
    const alerts = DATA.freshness.filter(f => f.status === 'red' || f.status === 'yellow');
    if (alerts.length > 0) {
      badge.classList.add('visible');
    }

    addLogEntry('vam', `Vanhenemistarkistus: ${alerts.length} huomioitavaa.`);
  });

  // ── Reset Button ───────────────────────────────────────────
  btnReset.addEventListener('click', () => {
    engine.reset();
    speechManager.stop();
    charts.destroyAll();

    // Reset agent states
    setAgentState('va', 'idle');
    setAgentState('vaa', 'idle');
    setAgentState('vam', 'idle');

    // Clear feeds
    ['feedSources', 'feedConflicts', 'feedDraft', 'feedImpact', 'feedFreshness'].forEach(id => {
      document.getElementById(id).innerHTML = '';
    });

    // Clear content containers
    ['sourceCardsEU', 'sourceCardsInt', 'sourceCardsDom', 'conflictCards', 'draftArticles'].forEach(id => {
      document.getElementById(id).innerHTML = '';
    });

    // Reset article statuses
    DATA.draftArticles.forEach(a => a.status = 'draft');

    // Hide dynamic elements
    document.getElementById('sourceStats').style.display = 'none';
    document.getElementById('sourceChartContainer').style.display = 'none';
    document.getElementById('impactGrid').style.display = 'none';

    // Hide and clear freshness table
    document.getElementById('freshnessTable').style.display = 'none';
    document.getElementById('freshnessBody').innerHTML = '';

    // Show empty states
    ['emptyStateSources', 'emptyStateConflicts', 'emptyStateDraft', 'emptyStateImpact', 'emptyStateFreshness'].forEach(id => {
      document.getElementById(id).style.display = '';
    });

    // Clear timeline
    document.getElementById('euTimeline').innerHTML = '';

    // Reset badges
    ['badgeSources', 'badgeDraft', 'badgeImpact', 'badgeConflicts', 'badgeFreshness'].forEach(id => {
      document.getElementById(id).classList.remove('visible');
    });

    // Reset log
    agentLog.innerHTML = `
      <div class="log-entry"><span class="log-agent va">VA</span><span class="log-text">Valmis aloittamaan.</span></div>
      <div class="log-entry"><span class="log-agent vaa">VaA</span><span class="log-text">Valmis aloittamaan.</span></div>
      <div class="log-entry"><span class="log-agent vam">VaM</span><span class="log-text">Valmis aloittamaan.</span></div>
    `;

    // Reset button
    btnStart.disabled = false;
    btnStart.innerHTML = '<span>&#9654;</span> Aloita analyysi';

    phasesCompleted = 0;
    updateProgress();

    completedPhases.clear();
    updateStepper('sources');
    switchTab('sources');
  });

  // ── Speech UI ────────────────────────────────────────────────
  const speechSection = document.getElementById('speechSection');
  const speechToggle = document.getElementById('speechToggle');
  const speechControls = document.getElementById('speechControls');
  const speechToggleLabel = document.getElementById('speechToggleLabel');
  const speechLang = document.getElementById('speechLang');
  const speechVolume = document.getElementById('speechVolume');
  const speechRate = document.getElementById('speechRate');

  if (!speechManager.supported && speechSection) {
    speechSection.style.display = 'none';
  }

  if (speechToggle) {
    speechToggle.addEventListener('change', () => {
      const on = speechToggle.checked;
      speechManager.setEnabled(on);
      speechControls.classList.toggle('visible', on);
      const lang = speechManager.language;
      speechToggleLabel.textContent = on
        ? (DATA.speech.ui.speechOn[lang] || 'On')
        : (DATA.speech.ui.speechOff[lang] || 'Off');
    });
  }

  if (speechLang) {
    speechLang.addEventListener('change', () => {
      speechManager.setLanguage(speechLang.value);
      const lang = speechLang.value;
      const on = speechManager.enabled;
      speechToggleLabel.textContent = on
        ? (DATA.speech.ui.speechOn[lang] || 'On')
        : (DATA.speech.ui.speechOff[lang] || 'Off');
    });
  }

  if (speechVolume) {
    speechVolume.addEventListener('input', () => {
      speechManager.volume = parseFloat(speechVolume.value);
    });
  }

  if (speechRate) {
    speechRate.addEventListener('input', () => {
      speechManager.rate = parseFloat(speechRate.value);
    });
  }

  // ── "Puhu ääneen" Button ─────────────────────────────────────
  const btnSpeakIntro = document.getElementById('btnSpeakIntro');
  if (btnSpeakIntro) {
    btnSpeakIntro.addEventListener('click', () => {
      const lang = speechManager.language;
      const text = DATA.speech.intro[lang] || DATA.speech.intro.fi;
      speechManager.setEnabled(true);
      speechToggle.checked = true;
      speechControls.classList.add('visible');
      speechToggleLabel.textContent = DATA.speech.ui.speechOn[lang] || 'On';
      speechManager.speak(text);
    });
  }

  // ── Guide Modal ───────────────────────────────────────────────
  const guideOverlay = document.getElementById('guideOverlay');
  const btnGuide = document.getElementById('btnGuide');
  const guideClose = document.getElementById('guideClose');

  if (btnGuide && guideOverlay) {
    btnGuide.addEventListener('click', () => {
      guideOverlay.classList.add('visible');
    });

    guideClose.addEventListener('click', () => {
      guideOverlay.classList.remove('visible');
    });

    guideOverlay.addEventListener('click', (e) => {
      if (e.target === guideOverlay) {
        guideOverlay.classList.remove('visible');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && guideOverlay.classList.contains('visible')) {
        guideOverlay.classList.remove('visible');
      }
    });

    // Accordion toggles
    document.querySelectorAll('.guide-section-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const sectionId = btn.dataset.section;
        const section = document.getElementById('guideSection' + sectionId);
        if (!section) return;

        const isOpen = section.classList.contains('open');

        // Close all sections
        document.querySelectorAll('.guide-section').forEach(s => {
          s.classList.remove('open');
          const icon = s.querySelector('.guide-section-icon');
          if (icon) icon.innerHTML = '&#9656;';
        });

        // Open clicked if it was closed
        if (!isOpen) {
          section.classList.add('open');
          const icon = section.querySelector('.guide-section-icon');
          if (icon) icon.innerHTML = '&#9662;';
        }
      });
    });
  }

})();
