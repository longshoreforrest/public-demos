/* ============================================================
   agents.js — Agenttien simulaatiomoottori
   Kirjoitusanimaatiot, tilakone, handoff-logiikka
   ============================================================ */

class AgentEngine {
  constructor() {
    this.running = false;
    this.aborted = false;
    this.currentPhase = null;
    this.charDelay = 25;       // ms per character
    this.thinkDelay = 1200;    // ms "thinking" pause
    this.sourceDelay = 200;    // ms stagger between source cards
    this.onPhaseChange = null; // callback(phaseName)
    this.onTabSwitch = null;   // callback(tabId)
    this.onLogEntry = null;    // callback(agent, text)
    this.onAgentState = null;  // callback(agentId, state)
    this.onComplete = null;    // callback()
    this.onSpeak = null;       // callback(text, agentId, eventType)
    this.onFreshnessReveal = null; // callback(freshnessId)
  }

  abort() {
    this.aborted = true;
    this.running = false;
  }

  reset() {
    this.abort();
    this.aborted = false;
    this.currentPhase = null;
  }

  // ── Utility: sleep with abort check ────────────────────────
  _sleep(ms) {
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, ms);
      const check = setInterval(() => {
        if (this.aborted) { clearTimeout(timer); clearInterval(check); resolve(); }
      }, 50);
    });
  }

  // ── Typing animation ──────────────────────────────────────
  async typeText(element, text, agentId) {
    if (this.aborted) return;

    const cursorClass = agentId === 'vaa' ? 'emerald' : (agentId === 'vam' ? 'amber' : '');
    const cursor = document.createElement('span');
    cursor.className = `typing-cursor ${cursorClass}`;
    element.appendChild(cursor);

    for (let i = 0; i < text.length; i++) {
      if (this.aborted) { cursor.remove(); return; }
      element.insertBefore(document.createTextNode(text[i]), cursor);
      await this._sleep(this.charDelay);
    }

    cursor.remove();
  }

  // ── Create feed message bubble ─────────────────────────────
  _createFeedMessage(agentId, type) {
    const msg = document.createElement('div');
    msg.className = 'feed-message';

    const avatar = document.createElement('div');
    avatar.className = `feed-avatar ${agentId}`;
    avatar.textContent = DATA.agents[agentId].abbr;

    const bubble = document.createElement('div');
    bubble.className = `feed-bubble${type === 'thinking' ? ' thinking' : ''}`;

    msg.appendChild(avatar);
    msg.appendChild(bubble);

    return { container: msg, bubble };
  }

  // ── Process a single workflow step ─────────────────────────
  async _processStep(step, feedEl) {
    if (this.aborted) return;

    const agentId = step.agent;

    if (step.type === 'thinking') {
      if (this.onSpeak) this.onSpeak(step.text, agentId, 'thinking');
      const { container, bubble } = this._createFeedMessage(agentId, 'thinking');
      feedEl.appendChild(container);
      feedEl.scrollTop = feedEl.scrollHeight;
      await this.typeText(bubble, step.text, agentId);
      await this._sleep(this.thinkDelay);
    }

    else if (step.type === 'message') {
      if (this.onSpeak) this.onSpeak(step.text, agentId, 'message');
      const { container, bubble } = this._createFeedMessage(agentId, 'message');
      feedEl.appendChild(container);
      feedEl.scrollTop = feedEl.scrollHeight;
      await this.typeText(bubble, step.text, agentId);
      if (this.onLogEntry) this.onLogEntry(agentId, step.text.substring(0, 80) + (step.text.length > 80 ? '...' : ''));
      await this._sleep(400);
    }

    else if (step.type === 'source') {
      // Handled by app.js callback
      if (this.onSourceReveal) {
        await this.onSourceReveal(step.sourceId);
        await this._sleep(this.sourceDelay);
      }
    }

    else if (step.type === 'conflict') {
      if (this.onConflictReveal) {
        await this.onConflictReveal(step.conflictId);
        await this._sleep(this.sourceDelay);
      }
    }

    else if (step.type === 'articles') {
      if (this.onArticlesReveal) {
        await this.onArticlesReveal(step.articleIds);
      }
    }

    else if (step.type === 'freshness') {
      if (this.onFreshnessReveal) {
        await this.onFreshnessReveal(step.freshnessId);
        await this._sleep(this.sourceDelay);
      }
    }

    else if (step.type === 'chart') {
      if (this.onChartReveal) {
        await this.onChartReveal(step.chartId);
        await this._sleep(300);
      }
    }
  }

  // ── Run full workflow ──────────────────────────────────────
  async runWorkflow() {
    if (this.running) return;
    this.running = true;
    this.aborted = false;

    const workflow = DATA.workflow;

    // Phase 1: Sources
    this.currentPhase = 'sources';
    if (this.onPhaseChange) this.onPhaseChange('sources');
    if (this.onSpeak) this.onSpeak('sources', 'va', 'phase');
    if (this.onTabSwitch) this.onTabSwitch('sources');
    if (this.onAgentState) this.onAgentState('va', 'working');

    const feedSources = document.getElementById('feedSources');
    for (const step of workflow.sourcesPhase) {
      if (this.aborted) break;
      await this._processStep(step, feedSources);
    }

    if (this.aborted) { this.running = false; return; }

    // Phase 2: Conflicts
    this.currentPhase = 'conflicts';
    if (this.onPhaseChange) this.onPhaseChange('conflicts');
    if (this.onSpeak) this.onSpeak('conflicts', 'va', 'phase');
    if (this.onTabSwitch) this.onTabSwitch('conflicts');

    await this._sleep(600);

    const feedConflicts = document.getElementById('feedConflicts');
    for (const step of workflow.conflictsPhase) {
      if (this.aborted) break;
      await this._processStep(step, feedConflicts);
    }

    if (this.aborted) { this.running = false; return; }

    // Phase 3: Draft
    this.currentPhase = 'draft';
    if (this.onPhaseChange) this.onPhaseChange('draft');
    if (this.onSpeak) this.onSpeak('draft', 'va', 'phase');
    if (this.onTabSwitch) this.onTabSwitch('draft');

    await this._sleep(600);

    const feedDraft = document.getElementById('feedDraft');
    for (const step of workflow.draftPhase) {
      if (this.aborted) break;
      await this._processStep(step, feedDraft);
    }

    if (this.aborted) { this.running = false; return; }

    // Handoff animation
    if (this.onAgentState) this.onAgentState('va', 'done');
    if (this.onHandoff) await this.onHandoff(workflow.handoff);
    if (this.onSpeak) this.onSpeak(workflow.handoff.message, 'va', 'handoff');

    await this._sleep(800);

    // Phase 4: Impact
    this.currentPhase = 'impact';
    if (this.onPhaseChange) this.onPhaseChange('impact');
    if (this.onSpeak) this.onSpeak('impact', 'vaa', 'phase');
    if (this.onTabSwitch) this.onTabSwitch('impact');
    if (this.onAgentState) this.onAgentState('vaa', 'working');

    const feedImpact = document.getElementById('feedImpact');
    for (const step of workflow.impactPhase) {
      if (this.aborted) break;
      await this._processStep(step, feedImpact);
    }

    if (this.aborted) { this.running = false; return; }

    // Handoff 2: VaA → VaM
    if (this.onAgentState) this.onAgentState('vaa', 'done');
    if (this.onHandoff) await this.onHandoff(workflow.handoff2);
    if (this.onSpeak) this.onSpeak(workflow.handoff2.message, 'vaa', 'handoff');

    await this._sleep(800);

    // Phase 5: Freshness
    this.currentPhase = 'freshness';
    if (this.onPhaseChange) this.onPhaseChange('freshness');
    if (this.onSpeak) this.onSpeak('freshness', 'vam', 'phase');
    if (this.onTabSwitch) this.onTabSwitch('freshness');
    if (this.onAgentState) this.onAgentState('vam', 'working');

    const feedFreshness = document.getElementById('feedFreshness');
    for (const step of workflow.freshnessPhase) {
      if (this.aborted) break;
      await this._processStep(step, feedFreshness);
    }

    if (this.aborted) { this.running = false; return; }

    // Done
    if (this.onAgentState) this.onAgentState('vam', 'done');
    if (this.onSpeak) this.onSpeak('complete', 'vam', 'phase');
    this.running = false;
    this.currentPhase = 'complete';
    if (this.onComplete) this.onComplete();
  }
}
