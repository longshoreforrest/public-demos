// app.js — Oikeusministeriön verkkouudistuksen haastattelija
// Vanilla JS, no frameworks

// ═══════════════════════════════════════════════════════════
// 0. INTERNATIONALIZATION (i18n)
// ═══════════════════════════════════════════════════════════
const translations = {
  fi: {
    // Header
    headerTitle: 'Oikeusministeriö — Verkkouudistuksen haastattelija',
    headerSubtitle: 'Siili Solutions | Hallinnonalan verkkosivustojen uudistaminen 2026',
    headerGuideLink: 'Käyttöohje \u2192',
    badgeAgencies: '8 virastoa',
    badgeFeedback: '300 palautetta',
    badgeInterviews: '64 haastattelua',
    // Tabs
    tabOverview: 'Yleiskatsaus',
    tabOrg: 'Organisaatio',
    tabInterviews: 'Haastattelut',
    tabSimulation: 'Simulaatio',
    tabFeedback: 'Palautteet',
    // Overview
    overviewAgenciesTitle: 'Hallinnonalan virastot',
    statAgencies: 'Virastoa',
    statFeedback: 'Palautetta kerätty',
    statRequirements: 'Pakollista vaatimusta',
    statAdditional: 'Lisätyöehdotusta',
    statStakeholders: 'Sidosryhmää',
    statConfigs: 'Haastattelukonfiguraatiota',
    feedbackLabel: 'palautetta',
    requirementsLabel: 'vaatimusta',
    additionalWorkLabel: 'lisätyötä',
    // Feedback
    feedbackBrowseTitle: 'Kansalaispalautteen selaaminen',
    feedbackSearchPlaceholder: 'Hae palautteista...',
    feedbackGiveTitle: 'Anna palautetta',
    loadMore: 'Lataa lisää',
    feedbackSummary: 'Näytetään {shown} / {filtered} palautetta (yhteensä {total})',
    allAgencies: 'Kaikki virastot',
    anonymous: 'Anonyymi',
    // Feedback categories
    catHaku: 'Haku',
    catNavigointi: 'Navigointi',
    catSaavutettavuus: 'Saavutettavuus',
    catSisalto: 'Sisältö',
    catUlkoasu: 'Ulkoasu',
    catMobiili: 'Mobiili',
    catLomakkeet: 'Lomakkeet',
    catKieliversiot: 'Kieliversiot',
    catLatausnopeus: 'Latausnopeus',
    catToiminnallisuus: 'Toiminnallisuus',
    catTietoturva: 'Tietoturva',
    catKaytettavyys: 'Käytettävyys',
    // Sentiment labels
    sentPositive: '\u{1F60A} Positiivinen',
    sentNeutral: '\u{1F610} Neutraali',
    sentNegative: '\u{1F61E} Negatiivinen',
    // Chat
    chatAssistantTitle: 'Palauteassistentti',
    chatAgencyLabel: 'Virasto:',
    chatPageLabel: 'Sivu:',
    chatInputPlaceholder: 'Kirjoita palautteesi...',
    chatSend: 'Lähetä',
    chatWelcome: 'Tervetuloa palauteassistenttiin! Voit antaa palautetta minkä tahansa oikeusministeriön alaisen viraston verkkosivustosta. Valitse virasto ja sivu alapuolelta ja kirjoita palautteesi.',
    chatThanks: 'Kiitos palautteestasi koskien {agency} — {page}-sivua! Palautteesi on tallennettu ja huomioidaan verkkouudistuksessa.',
    chatLisatyo: 'Huom: Tämä toive vaikuttaa menevän alkuperäisen vaatimusmäärittelyn ulkopuolelle ja voisi olla mahdollinen lisätyö. Kirjaamme sen erikseen.',
    chatFollowup: 'Haluatko antaa lisää palautetta tai tarkentaa toivettasi?',
    pageHome: 'Etusivu',
    pageServices: 'Asiointi',
    pageContact: 'Yhteystiedot',
    pageNews: 'Tiedotteet',
    pageOther: 'Muu',
    // Interviews
    interviewsTitle: 'Sidosryhmähaastattelut',
    allStakeholders: 'Kaikki sidosryhmät',
    interviewConfigs: 'Haastattelukonfiguraatiot',
    interviewConfigsClickHint: 'Klikkaa konfiguraatiota asettaaksesi tilan ja lisätäksesi muistiinpanoja',
    statusWaiting: 'Odottaa',
    statusOngoing: 'Käynnissä',
    statusDone: 'Valmis',
    interviewQuestions: 'Haastattelukysymykset',
    interviewTypeLabel: 'Tyyppi',
    interviewPriorityLabel: 'Prioriteetti',
    agencyInterviews: 'Virastokohtaiset haastattelut',
    responsiblePersons: 'Vastuuhenkilöt:',
    // Org chart
    orgTitle: 'Organisaatiokaavio',
    orgDescription: 'Klikkaa virastoa tai osastoa nähdäksesi lisätiedot ja haastattelukonfiguraation',
    orgRootTitle: 'Oikeusministeriö',
    orgRootSubtitle: 'Hallinnonala',
    orgDepartments: 'osastoa',
    orgDetailFeedback: 'Palautetta',
    orgDetailRequirements: 'Vaatimusta',
    orgDetailInterviews: 'Haastattelua',
    orgDetailConfigsTitle: 'Haastattelukonfiguraatiot',
    orgShowRequirements: 'Näytä vaatimukset',
    // Modal
    modalMandatoryReqs: 'Pakolliset vaatimukset',
    modalAdditionalWork: 'Mahdolliset lisätyöt',
    // Simulation
    simTitle: 'Hankkeen interaktiivinen simulaatio',
    simDescription: 'Koko verkkouudistusprojektin läpikäynti automaattisesti vaihe vaiheelta',
    simActorsTitle: 'Toimijat',
    simDataTitle: 'Kerätty data',
    simKnowledgeTitle: 'Tiedon kertyminen',
    simPhaseSummaryTitle: 'Vaiheen yhteenveto',
    simPhaseSummaryIdle: 'Paina "Aloita simulaatio" käynnistääksesi hankkeen läpikäynnin.',
    simPhaseSummaryDone: 'Kaikki vaiheet läpikäyty. Projekti etenee toteutukseen kerätyn aineiston ohjaamana.',
    simActiveActors: 'Aktiiviset toimijat',
    simDataCollected: 'Kerätty data',
    simFeedbackUnit: 'palautetta',
    simRequirementsUnit: 'vaatimusta',
    simInterviewsUnit: 'haastattelua',
    simDone: 'Simulaatio valmis!',
    simSummaryLabel: 'Yhteenveto',
    simPhaseLabel: 'Vaihe',
    simDocumentsPopup: 'Dokumentit kerätään projektin edetessä.',
    // KG
    kgAgencies: 'Virastot',
    kgStakeholders: 'Sidosryhmät',
    kgStakeholderInterviews: 'Sidosryhmähaastattelut',
    kgAgencyInterviews: 'Virastohaastattelut',
    kgShowAll: 'Näytä kaikki \u2192',
    // Step links (simulation)
    linkStakeholders: 'Sidosryhmät',
    linkSteeringGroup: 'Ohjausryhmä',
    linkRequirements: 'Vaatimukset',
    linkAgencies: 'Virastot',
    linkAgencyReqs: 'Virastokohtaiset vaatimukset',
    linkOrganization: 'Organisaatio',
    linkReqsMoSCoW: 'Vaatimukset (MoSCoW)',
    linkAllReqs: 'Kaikki vaatimukset',
    linkFeedbackForm: 'Palautelomake',
    link300Feedback: '300 palautetta',
    linkFeedback: 'Palautteet',
    linkAnalytics: 'Analytiikka',
    linkInterviewConfigs: 'Haastattelukonfiguraatiot',
    link64Interviews: '64 haastattelua',
    linkInterviewNotes: 'Haastattelumuistiinpanot',
    linkInterviews: 'Haastattelut',
    linkBrandStakeholders: 'Brändi & sidosryhmät',
    linkAccessibilityReqs: 'Saavutettavuusvaatimukset'
  },
  en: {
    // Header
    headerTitle: 'Ministry of Justice — Website Renewal Interviewer',
    headerSubtitle: 'Siili Solutions | Government website renewal 2026',
    headerGuideLink: 'User guide \u2192',
    badgeAgencies: '8 agencies',
    badgeFeedback: '300 feedback entries',
    badgeInterviews: '64 interviews',
    // Tabs
    tabOverview: 'Overview',
    tabOrg: 'Organisation',
    tabInterviews: 'Interviews',
    tabSimulation: 'Simulation',
    tabFeedback: 'Feedback',
    // Overview
    overviewAgenciesTitle: 'Administrative branch agencies',
    statAgencies: 'Agencies',
    statFeedback: 'Feedback collected',
    statRequirements: 'Mandatory requirements',
    statAdditional: 'Additional work proposals',
    statStakeholders: 'Stakeholder groups',
    statConfigs: 'Interview configurations',
    feedbackLabel: 'feedback',
    requirementsLabel: 'requirements',
    additionalWorkLabel: 'additional work',
    // Feedback
    feedbackBrowseTitle: 'Browse citizen feedback',
    feedbackSearchPlaceholder: 'Search feedback...',
    feedbackGiveTitle: 'Give feedback',
    loadMore: 'Load more',
    feedbackSummary: 'Showing {shown} / {filtered} feedback entries (total {total})',
    allAgencies: 'All agencies',
    anonymous: 'Anonymous',
    // Feedback categories
    catHaku: 'Search',
    catNavigointi: 'Navigation',
    catSaavutettavuus: 'Accessibility',
    catSisalto: 'Content',
    catUlkoasu: 'Appearance',
    catMobiili: 'Mobile',
    catLomakkeet: 'Forms',
    catKieliversiot: 'Language versions',
    catLatausnopeus: 'Load speed',
    catToiminnallisuus: 'Functionality',
    catTietoturva: 'Security',
    catKaytettavyys: 'Usability',
    // Sentiment labels
    sentPositive: '\u{1F60A} Positive',
    sentNeutral: '\u{1F610} Neutral',
    sentNegative: '\u{1F61E} Negative',
    // Chat
    chatAssistantTitle: 'Feedback assistant',
    chatAgencyLabel: 'Agency:',
    chatPageLabel: 'Page:',
    chatInputPlaceholder: 'Write your feedback...',
    chatSend: 'Send',
    chatWelcome: 'Welcome to the feedback assistant! You can give feedback on the website of any agency under the Ministry of Justice. Select an agency and page below and write your feedback.',
    chatThanks: 'Thank you for your feedback regarding {agency} — {page} page! Your feedback has been recorded and will be considered in the website renewal.',
    chatLisatyo: 'Note: This request appears to go beyond the original requirements specification and could be potential additional work. We will record it separately.',
    chatFollowup: 'Would you like to give more feedback or clarify your request?',
    pageHome: 'Front page',
    pageServices: 'Services',
    pageContact: 'Contact',
    pageNews: 'News',
    pageOther: 'Other',
    // Interviews
    interviewsTitle: 'Stakeholder interviews',
    allStakeholders: 'All stakeholder groups',
    interviewConfigs: 'Interview configurations',
    interviewConfigsClickHint: 'Click a configuration to set its status and add notes',
    statusWaiting: 'Waiting',
    statusOngoing: 'In progress',
    statusDone: 'Completed',
    interviewQuestions: 'Interview questions',
    interviewTypeLabel: 'Type',
    interviewPriorityLabel: 'Priority',
    agencyInterviews: 'Agency-specific interviews',
    responsiblePersons: 'Responsible persons:',
    // Org chart
    orgTitle: 'Organisation chart',
    orgDescription: 'Click on an agency or department to view details and interview configuration',
    orgRootTitle: 'Ministry of Justice',
    orgRootSubtitle: 'Administrative branch',
    orgDepartments: 'departments',
    orgDetailFeedback: 'Feedback',
    orgDetailRequirements: 'Requirements',
    orgDetailInterviews: 'Interviews',
    orgDetailConfigsTitle: 'Interview configurations',
    orgShowRequirements: 'Show requirements',
    // Modal
    modalMandatoryReqs: 'Mandatory requirements',
    modalAdditionalWork: 'Potential additional work',
    // Simulation
    simTitle: 'Interactive project simulation',
    simDescription: 'Automated walkthrough of the entire website renewal project phase by phase',
    simActorsTitle: 'Actors',
    simDataTitle: 'Collected data',
    simKnowledgeTitle: 'Knowledge accumulation',
    simPhaseSummaryTitle: 'Phase summary',
    simPhaseSummaryIdle: 'Press "Start simulation" to begin the project walkthrough.',
    simPhaseSummaryDone: 'All phases complete. The project proceeds to implementation with all collected data guiding decisions.',
    simActiveActors: 'Active actors',
    simDataCollected: 'Data collected',
    simFeedbackUnit: 'feedback',
    simRequirementsUnit: 'requirements',
    simInterviewsUnit: 'interviews',
    simDone: 'Simulation complete!',
    simSummaryLabel: 'Summary',
    simPhaseLabel: 'Phase',
    simDocumentsPopup: 'Documents are collected as the project progresses.',
    // KG
    kgAgencies: 'Agencies',
    kgStakeholders: 'Stakeholders',
    kgStakeholderInterviews: 'Stakeholder interviews',
    kgAgencyInterviews: 'Agency interviews',
    kgShowAll: 'Show all \u2192',
    // Step links (simulation)
    linkStakeholders: 'Stakeholders',
    linkSteeringGroup: 'Steering Group',
    linkRequirements: 'Requirements',
    linkAgencies: 'Agencies',
    linkAgencyReqs: 'Agency requirements',
    linkOrganization: 'Organisation',
    linkReqsMoSCoW: 'Requirements (MoSCoW)',
    linkAllReqs: 'All requirements',
    linkFeedbackForm: 'Feedback form',
    link300Feedback: '300 feedback entries',
    linkFeedback: 'Feedback',
    linkAnalytics: 'Analytics',
    linkInterviewConfigs: 'Interview configurations',
    link64Interviews: '64 interviews',
    linkInterviewNotes: 'Interview notes',
    linkInterviews: 'Interviews',
    linkBrandStakeholders: 'Brand & stakeholders',
    linkAccessibilityReqs: 'Accessibility requirements'
  }
};

let currentLang = localStorage.getItem('siteTourLang') || 'fi';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || (translations['fi'] && translations['fi'][key]) || key;
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('siteTourLang', lang);
  document.documentElement.lang = lang;
  document.title = lang === 'en'
    ? 'Ministry of Justice — Website Renewal Interviewer'
    : 'Oikeusministeriö — Verkkouudistuksen haastattelija';
  // Update lang-btn active states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  // Update dynamic badge
  document.getElementById('feedback-count-badge').textContent =
    lang === 'en' ? PALAUTTEET.length + ' feedback entries' : PALAUTTEET.length + ' palautetta';
  // Re-render all dynamic content
  renderOverview();
  renderFeedbackFilters();
  renderFeedback();
  renderInterviews();
  renderOrgChart();
  renderSimTimeline();
  renderSimActors(null);
  renderSimAnalytics();
  renderKnowledgeGraph();
  updateSimButtons();
  updatePhaseSummary(null);
  // Update chat agency select
  const chatSel = document.getElementById('chat-agency-select');
  if (chatSel) {
    const prevVal = chatSel.value;
    chatSel.innerHTML = VIRASTOT.map(v => `<option value="${v.id}">${lang === 'en' ? v.nimiEn : v.nimi}</option>`).join('');
    if (prevVal) chatSel.value = prevVal;
  }
  // Sync simulation language toggle
  sim.lang = lang;
  document.querySelectorAll('.sim-lang-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  const nb = document.getElementById('sim-narrate');
  nb.innerHTML = sim.narrationOn
    ? '&#128266; ' + (lang === 'en' ? 'Speaking' : 'Puhe päällä')
    : '&#128264; ' + (lang === 'en' ? 'Speak' : 'Puhu');
}

// Bind language switcher buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

// ═══════════════════════════════════════════════════════════
// 1. TABS
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('#tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.view).classList.add('active');
  });
});

// ═══════════════════════════════════════════════════════════
// 2. OVERVIEW
// ═══════════════════════════════════════════════════════════
function renderOverview() {
  const statsEl = document.getElementById('overview-stats');
  const gridEl  = document.getElementById('agency-grid');

  // Count feedback per agency
  const fbPerAgency = {};
  PALAUTTEET.forEach(p => { fbPerAgency[p.virpiId] = (fbPerAgency[p.virpiId] || 0) + 1; });

  // Count requirements
  let totalReq = 0, totalLisatyo = 0;
  Object.values(VAATIMUKSET).forEach(v => {
    totalReq += v.pakolliset.length;
    totalLisatyo += v.lisatyo.length;
  });

  // Sentiment counts
  const sentiments = { positiivinen: 0, neutraali: 0, negatiivinen: 0 };
  PALAUTTEET.forEach(p => { sentiments[p.tunne]++; });

  statsEl.innerHTML = `
    <div class="stat-box"><div class="num">${VIRASTOT.length}</div><div class="label">${t('statAgencies')}</div></div>
    <div class="stat-box"><div class="num">${PALAUTTEET.length}</div><div class="label">${t('statFeedback')}</div></div>
    <div class="stat-box"><div class="num">${totalReq}</div><div class="label">${t('statRequirements')}</div></div>
    <div class="stat-box"><div class="num">${totalLisatyo}</div><div class="label">${t('statAdditional')}</div></div>
    <div class="stat-box"><div class="num">${SIDOSRYHMAT.length}</div><div class="label">${t('statStakeholders')}</div></div>
    <div class="stat-box"><div class="num">${HAASTATTELUKONFIGURAATIOT.length}</div><div class="label">${t('statConfigs')}</div></div>
  `;

  gridEl.innerHTML = VIRASTOT.map(v => {
    const fb = fbPerAgency[v.id] || 0;
    const req = VAATIMUKSET[v.id];
    const agencyName = currentLang === 'en' ? v.nimiEn : v.nimi;
    const agencyDesc = currentLang === 'en' ? (v.kuvausEn || v.kuvaus) : v.kuvaus;
    return `
    <div class="card agency-card" style="border-left-color:${v.vpiColor}" onclick="showAgencyModal('${v.id}')">
      <div class="agency-header">
        <h3>${agencyName}</h3>
        <span style="font-size:.72rem;color:#888;">${currentLang === 'en' ? v.nimi : v.nimiEn}</span>
      </div>
      <p>${agencyDesc}</p>
      <div class="dept-tags">${v.osastot.map(d => `<span class="dept-tag">${d}</span>`).join('')}</div>
      <div style="display:flex;gap:12px;margin-top:10px;font-size:.78rem;color:#666;">
        <span>\u{1F4E9} ${fb} ${t('feedbackLabel')}</span>
        <span>\u{1F4CB} ${req ? req.pakolliset.length : 0} ${t('requirementsLabel')}</span>
        <span>\u2795 ${req ? req.lisatyo.length : 0} ${t('additionalWorkLabel')}</span>
      </div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
// 3. AGENCY MODAL (requirements)
// ═══════════════════════════════════════════════════════════
function showAgencyModal(agencyId) {
  const v = VIRASTOT.find(a => a.id === agencyId);
  const req = VAATIMUKSET[agencyId];
  if (!v || !req) return;

  const modal = document.getElementById('modal-content');
  const agencyName = currentLang === 'en' ? v.nimiEn : v.nimi;
  const agencyDesc = currentLang === 'en' ? (v.kuvausEn || v.kuvaus) : v.kuvaus;
  modal.innerHTML = `
    <button class="close-btn" onclick="closeModal()">&times;</button>
    <h2 style="color:${v.vpiColor}">${agencyName}</h2>
    <p style="font-size:.85rem;color:#555;margin-bottom:16px;">${agencyDesc}</p>
    <p style="font-size:.82rem;color:#888;margin-bottom:4px;">
      <a href="${v.verkkosivu}" target="_blank" style="color:#2c3e80;">${v.verkkosivu}</a>
    </p>
    <h3 style="font-size:.95rem;margin:16px 0 8px;">${t('modalMandatoryReqs')} (${req.pakolliset.length})</h3>
    ${req.pakolliset.map(r => `
      <div class="req-item">
        <span class="req-cat">${r.kategoria}</span>
        <span class="req-pri ${r.prioriteetti}">${r.prioriteetti}</span>
        <div style="margin-top:4px;">${r.kuvaus}</div>
      </div>
    `).join('')}
    <h3 style="font-size:.95rem;margin:16px 0 8px;">${t('modalAdditionalWork')} (${req.lisatyo.length})</h3>
    ${req.lisatyo.map(r => `
      <div class="req-item">
        <span class="req-cat">${r.kategoria}</span>
        <span class="lisatyo-hinta">${r.arvioHinta}</span>
        <div style="margin-top:4px;">${r.kuvaus}</div>
      </div>
    `).join('')}
  `;
  document.getElementById('modal-overlay').classList.add('visible');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('visible');
}
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ═══════════════════════════════════════════════════════════
// 4. FEEDBACK BROWSING
// ═══════════════════════════════════════════════════════════
let feedbackPage = 0;
const FB_PAGE_SIZE = 30;
let activeAgencyFilter = new Set();
let activeCatFilter = new Set();
let activeSentFilter = new Set();
let feedbackSearch = '';

function getFilteredFeedback() {
  return PALAUTTEET.filter(p => {
    if (activeAgencyFilter.size && !activeAgencyFilter.has(p.virpiId)) return false;
    if (activeCatFilter.size && !activeCatFilter.has(p.kategoria)) return false;
    if (activeSentFilter.size && !activeSentFilter.has(p.tunne)) return false;
    if (feedbackSearch) {
      const s = feedbackSearch.toLowerCase();
      return p.palaute.toLowerCase().includes(s) ||
             p.nimi.toLowerCase().includes(s) ||
             p.sivu.toLowerCase().includes(s);
    }
    return true;
  });
}

function renderFeedbackFilters() {
  // Agency filters
  const agF = document.getElementById('feedback-agency-filters');
  agF.innerHTML = `<button class="filter-btn ${activeAgencyFilter.size === 0 ? 'active' : ''}" data-agency="all">${t('allAgencies')}</button>` +
    VIRASTOT.map(v => `<button class="filter-btn ${activeAgencyFilter.has(v.id) ? 'active' : ''}" data-agency="${v.id}">${currentLang === 'en' ? v.nimiEn : v.nimi}</button>`).join('');

  agF.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.agency;
      if (val === 'all') { activeAgencyFilter.clear(); }
      else {
        if (activeAgencyFilter.has(val)) activeAgencyFilter.delete(val);
        else activeAgencyFilter.add(val);
      }
      feedbackPage = 0;
      renderFeedbackFilters();
      renderFeedback();
    });
  });

  // Category filters
  const cats = [...new Set(PALAUTTEET.map(p => p.kategoria))].sort();
  const catNames = {
    hakutoiminto: t('catHaku'), navigointi: t('catNavigointi'), saavutettavuus: t('catSaavutettavuus'),
    sisalto: t('catSisalto'), ulkoasu: t('catUlkoasu'), mobiili: t('catMobiili'), lomakkeet: t('catLomakkeet'),
    kieliversiot: t('catKieliversiot'), latausnopeus: t('catLatausnopeus'), toiminnallisuus: t('catToiminnallisuus'),
    tietoturva: t('catTietoturva'), kaytettavyys: t('catKaytettavyys')
  };
  const catF = document.getElementById('feedback-cat-filters');
  catF.innerHTML = cats.map(c =>
    `<button class="filter-btn ${activeCatFilter.has(c) ? 'active' : ''}" data-cat="${c}">${catNames[c] || c}</button>`
  ).join('');
  catF.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.cat;
      if (activeCatFilter.has(val)) activeCatFilter.delete(val);
      else activeCatFilter.add(val);
      feedbackPage = 0;
      renderFeedbackFilters();
      renderFeedback();
    });
  });

  // Sentiment filters
  const sentF = document.getElementById('feedback-sentiment-filters');
  const sentLabels = { positiivinen: t('sentPositive'), neutraali: t('sentNeutral'), negatiivinen: t('sentNegative') };
  sentF.innerHTML = Object.entries(sentLabels).map(([k, label]) =>
    `<button class="filter-btn ${activeSentFilter.has(k) ? 'active' : ''}" data-sent="${k}">${label}</button>`
  ).join('');
  sentF.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.sent;
      if (activeSentFilter.has(val)) activeSentFilter.delete(val);
      else activeSentFilter.add(val);
      feedbackPage = 0;
      renderFeedbackFilters();
      renderFeedback();
    });
  });
}

function renderFeedback() {
  const filtered = getFilteredFeedback();
  const shown = filtered.slice(0, (feedbackPage + 1) * FB_PAGE_SIZE);

  document.getElementById('feedback-summary').textContent =
    t('feedbackSummary').replace('{shown}', shown.length).replace('{filtered}', filtered.length).replace('{total}', PALAUTTEET.length);

  const agencyNames = {};
  VIRASTOT.forEach(v => { agencyNames[v.id] = currentLang === 'en' ? v.nimiEn : v.nimi; });

  const listEl = document.getElementById('feedback-list');
  listEl.innerHTML = shown.map(p => `
    <div class="feedback-item ${p.tunne}">
      <div class="feedback-meta">
        <span class="tag">${agencyNames[p.virpiId] || p.virpiId}</span>
        <span class="tag">${p.sivu}</span>
        <span class="tag">${p.kategoria}</span>
        <span>${formatDate(p.aikaleima)}</span>
        ${p.nimi ? `<span>— ${p.nimi}</span>` : `<span style="font-style:italic;">${t('anonymous')}</span>`}
      </div>
      <div class="feedback-text">${p.palaute}</div>
    </div>
  `).join('');

  const loadBtn = document.getElementById('load-more-btn');
  loadBtn.style.display = shown.length < filtered.length ? 'block' : 'none';
}

function formatDate(iso) {
  const d = new Date(iso);
  const locale = currentLang === 'en' ? 'en-GB' : 'fi-FI';
  return d.toLocaleDateString(locale) + ' ' + d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

document.getElementById('load-more-btn').addEventListener('click', () => {
  feedbackPage++;
  renderFeedback();
});

document.getElementById('feedback-search').addEventListener('input', e => {
  feedbackSearch = e.target.value.trim();
  feedbackPage = 0;
  renderFeedback();
});

// ═══════════════════════════════════════════════════════════
// 5. CHAT INTERFACE
// ═══════════════════════════════════════════════════════════
function initChat() {
  const sel = document.getElementById('chat-agency-select');
  sel.innerHTML = VIRASTOT.map(v => `<option value="${v.id}">${currentLang === 'en' ? v.nimiEn : v.nimi}</option>`).join('');

  addBotMessage(t('chatWelcome'));
}

function addBotMessage(text) {
  const el = document.createElement('div');
  el.className = 'chat-msg bot';
  el.style.whiteSpace = 'pre-line';
  el.textContent = text;
  document.getElementById('chat-messages').appendChild(el);
  scrollChat();
}

function addUserMessage(text) {
  const el = document.createElement('div');
  el.className = 'chat-msg user';
  el.textContent = text;
  document.getElementById('chat-messages').appendChild(el);
  scrollChat();
}

function scrollChat() {
  const c = document.getElementById('chat-messages');
  c.scrollTop = c.scrollHeight;
}

document.getElementById('chat-send').addEventListener('click', sendChatMessage);
document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChatMessage();
});

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const agencyId = document.getElementById('chat-agency-select').value;
  const page = document.getElementById('chat-page-select').value;
  const agency = VIRASTOT.find(v => v.id === agencyId);

  addUserMessage(text);
  input.value = '';

  // Create a new feedback item
  const newFeedback = {
    id: PALAUTTEET.length + 1,
    aikaleima: new Date().toISOString(),
    virpiId: agencyId,
    sivu: page,
    nimi: '',
    sahkoposti: '',
    palaute: text,
    kategoria: classifyFeedback(text),
    tunne: classifySentiment(text)
  };
  PALAUTTEET.unshift(newFeedback);

  // Update badge
  document.getElementById('feedback-count-badge').textContent =
    currentLang === 'en' ? `${PALAUTTEET.length} feedback entries` : `${PALAUTTEET.length} palautetta`;

  // Bot response
  setTimeout(() => {
    const req = VAATIMUKSET[agencyId];
    const isLisatyo = checkIfLisatyo(text, req);
    const agencyName = currentLang === 'en' ? agency.nimiEn : agency.nimi;

    let response = t('chatThanks').replace('{agency}', agencyName).replace('{page}', page);

    if (isLisatyo) {
      response += '\n\n' + t('chatLisatyo');
    }

    response += '\n\n' + t('chatFollowup');
    addBotMessage(response);

    // Refresh feedback list if visible
    renderFeedback();
  }, 600);
}

function classifyFeedback(text) {
  const t = text.toLowerCase();
  if (t.includes('haku') || t.includes('etsi') || t.includes('löydä')) return 'hakutoiminto';
  if (t.includes('navigoi') || t.includes('valikko') || t.includes('menu')) return 'navigointi';
  if (t.includes('saavutettav') || t.includes('kontrasti') || t.includes('ruudunluk')) return 'saavutettavuus';
  if (t.includes('sisält') || t.includes('teksti') || t.includes('tieto')) return 'sisalto';
  if (t.includes('ulkoasu') || t.includes('design') || t.includes('väri') || t.includes('fontti')) return 'ulkoasu';
  if (t.includes('mobiili') || t.includes('puhelin') || t.includes('tabletti')) return 'mobiili';
  if (t.includes('lomak') || t.includes('form')) return 'lomakkeet';
  if (t.includes('ruotsi') || t.includes('englanti') || t.includes('kieli') || t.includes('swedish')) return 'kieliversiot';
  if (t.includes('hidas') || t.includes('latau') || t.includes('nopeu')) return 'latausnopeus';
  if (t.includes('tietoturva') || t.includes('salasana') || t.includes('ssl')) return 'tietoturva';
  if (t.includes('käytettäv') || t.includes('helppo') || t.includes('vaikea')) return 'kaytettavyys';
  return 'toiminnallisuus';
}

function classifySentiment(text) {
  const t = text.toLowerCase();
  const pos = ['hienoa', 'kiitos', 'loistava', 'hyvä', 'toimii', 'mahtava', 'erinomainen', 'kätevä'];
  const neg = ['huono', 'hidas', 'rikki', 'ei toimi', 'puuttuu', 'vaikea', 'ärsyttä', 'toimimaton', 'ongelma'];
  if (pos.some(w => t.includes(w))) return 'positiivinen';
  if (neg.some(w => t.includes(w))) return 'negatiivinen';
  return 'neutraali';
}

function checkIfLisatyo(text, req) {
  const t = text.toLowerCase();
  const lisatyoKeywords = ['chat', 'chatbot', 'tekoäly', 'kartta', 'mobiilisovellus', 'app', 'sovellus',
    'automaattinen ilmoitus', 'push-ilmoitus', 'integraatio', 'api', 'videopalvelu', 'ajanvaraus',
    'sähköinen allekirjoitus', 'tunnistautuminen'];
  return lisatyoKeywords.some(kw => t.includes(kw));
}

// ═══════════════════════════════════════════════════════════
// 6. INTERVIEWS
// ═══════════════════════════════════════════════════════════
let selectedSR = null;

function renderInterviews() {
  const sidebar = document.getElementById('sr-sidebar');

  // Add "All" option + each stakeholder group
  sidebar.innerHTML = `
    <div class="sr-item ${!selectedSR ? 'active' : ''}" data-sr="all">
      <span>\u{1F4CA}</span> <span>${t('allStakeholders')}</span>
    </div>
  ` + SIDOSRYHMAT.map(sr => `
    <div class="sr-item ${selectedSR === sr.id ? 'active' : ''}" data-sr="${sr.id}">
      <span>${sr.icon}</span> <span>${sr.nimi}</span>
    </div>
  `).join('');

  sidebar.querySelectorAll('.sr-item').forEach(item => {
    item.addEventListener('click', () => {
      selectedSR = item.dataset.sr === 'all' ? null : item.dataset.sr;
      renderInterviews();
    });
  });

  renderInterviewContent();
}

function translateStatus(tila) {
  if (tila === 'odottaa') return t('statusWaiting');
  if (tila === 'käynnissä') return t('statusOngoing');
  if (tila === 'valmis') return t('statusDone');
  return tila;
}

function renderInterviewContent() {
  const content = document.getElementById('interview-content');

  if (!selectedSR) {
    // Show config grid for all
    const configs = HAASTATTELUKONFIGURAATIOT;
    const agencyNames = {};
    VIRASTOT.forEach(v => { agencyNames[v.id] = currentLang === 'en' ? v.nimiEn : v.nimi; });
    const srNames = {};
    SIDOSRYHMAT.forEach(s => { srNames[s.id] = s.nimi; });

    content.innerHTML = `
      <h3 style="font-size:.95rem;margin-bottom:12px;">${t('interviewConfigs')} (${configs.length})</h3>
      <p style="font-size:.82rem;color:#888;margin-bottom:16px;">${t('interviewConfigsClickHint')}</p>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <span style="font-size:.78rem;display:flex;align-items:center;gap:4px;"><span class="status-dot odottaa"></span> ${t('statusWaiting')}: ${configs.filter(c=>c.tila==='odottaa').length}</span>
        <span style="font-size:.78rem;display:flex;align-items:center;gap:4px;"><span class="status-dot kaynnissa"></span> ${t('statusOngoing')}: ${configs.filter(c=>c.tila==='käynnissä').length}</span>
        <span style="font-size:.78rem;display:flex;align-items:center;gap:4px;"><span class="status-dot valmis"></span> ${t('statusDone')}: ${configs.filter(c=>c.tila==='valmis').length}</span>
      </div>
      <div class="config-grid">
        ${configs.map(c => `
          <div class="config-card" onclick="toggleConfigStatus('${c.id}')">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="status-dot ${c.tila === 'käynnissä' ? 'kaynnissa' : c.tila}"></span>
              <span style="font-size:.7rem;color:#888;">${translateStatus(c.tila)}</span>
            </div>
            <div style="font-weight:600;margin-top:4px;">${agencyNames[c.virastoId] || c.virastoId}</div>
            <div style="color:#666;margin-top:2px;">${srNames[c.sidosryhmaId] || c.sidosryhmaId}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    // Show specific stakeholder group details + questions
    const sr = SIDOSRYHMAT.find(s => s.id === selectedSR);
    const questions = HAASTATTELUKYSYMYKSET[selectedSR] || [];
    const configs = HAASTATTELUKONFIGURAATIOT.filter(c => c.sidosryhmaId === selectedSR);
    const agencyNames = {};
    VIRASTOT.forEach(v => { agencyNames[v.id] = currentLang === 'en' ? v.nimiEn : v.nimi; });

    content.innerHTML = `
      <div class="card" style="margin-bottom:16px;">
        <h3>${sr.icon} ${sr.nimi}</h3>
        <p>${sr.kuvaus}</p>
        <div style="margin-top:8px;font-size:.82rem;color:#666;">
          <strong>${t('responsiblePersons')}</strong> ${sr.vastuuhenkilot.join(', ')}
        </div>
      </div>

      <h3 style="font-size:.95rem;margin-bottom:8px;">${t('interviewQuestions')} (${questions.length})</h3>
      <div class="question-list">
        ${questions.map((q, i) => `
          <div class="question-item">
            <div class="q-text">${i + 1}. ${q.kysymys}</div>
            <div class="q-meta">${t('interviewTypeLabel')}: ${q.tyyppi} | ${t('interviewPriorityLabel')}: ${'★'.repeat(q.prioriteetti)}${'☆'.repeat(5 - q.prioriteetti)}</div>
          </div>
        `).join('')}
      </div>

      <h3 style="font-size:.95rem;margin:20px 0 8px;">${t('agencyInterviews')} (${configs.length})</h3>
      <div class="config-grid">
        ${configs.map(c => `
          <div class="config-card" onclick="toggleConfigStatus('${c.id}')">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="status-dot ${c.tila === 'käynnissä' ? 'kaynnissa' : c.tila}"></span>
              <span style="font-size:.7rem;color:#888;">${translateStatus(c.tila)}</span>
            </div>
            <div style="font-weight:600;margin-top:4px;">${agencyNames[c.virastoId]}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function toggleConfigStatus(configId) {
  const config = HAASTATTELUKONFIGURAATIOT.find(c => c.id === configId);
  if (!config) return;
  const states = ['odottaa', 'käynnissä', 'valmis'];
  const idx = states.indexOf(config.tila);
  config.tila = states[(idx + 1) % states.length];
  renderInterviews();
}

// ═══════════════════════════════════════════════════════════
// 7. ORG CHART
// ═══════════════════════════════════════════════════════════
let selectedOrgNode = null;
let selectedOrgDeptName = null;

function renderOrgChart() {
  const container = document.getElementById('org-chart');

  // Legend
  const legend = document.getElementById('org-legend');
  legend.innerHTML = VIRASTOT.map(v =>
    `<div class="leg-item"><div class="leg-swatch" style="background:${v.vpiColor}"></div>${currentLang === 'en' ? v.nimiEn : v.nimi}</div>`
  ).join('');

  // Build tree with proper connectors
  let html = `<div class="org-tree">
    <div class="org-root">${t('orgRootTitle')}<br><span style="font-size:.75rem;opacity:.8;">${t('orgRootSubtitle')}</span></div>
    <div class="org-vline root-stem"></div>
    <div class="org-branches-wrap">
    <div class="org-hbar"></div>
    <div class="org-branches">`;

  VIRASTOT.forEach(v => {
    const isSelected = selectedOrgNode === v.id;
    const fbCount = PALAUTTEET.filter(p => p.virpiId === v.id).length;
    const agencyName = currentLang === 'en' ? v.nimiEn : v.nimi;
    html += `
      <div class="org-branch">
        <div class="branch-stem"></div>
        <div class="org-node ${isSelected ? 'selected' : ''}" style="border-color:${v.vpiColor}" onclick="selectOrgNode('${v.id}')">
          <div class="node-name" style="color:${v.vpiColor}">${agencyName}</div>
          <div class="node-dept">${v.osastot.length} ${t('orgDepartments')} · ${fbCount} ${t('feedbackLabel')}</div>
          <div class="expand-hint">${isSelected ? '−' : '+'}</div>
        </div>
        <div class="org-subs ${isSelected ? 'open' : ''}" id="org-subs-${v.id}">
          <div class="org-subs-inner">
            ${v.osastot.map(d => {
              const isSel = isSelected && selectedOrgDeptName === d;
              return `
                <div class="org-sub-stem"></div>
                <div class="org-sub-node ${isSel ? 'sub-selected' : ''}"
                     onclick="event.stopPropagation();selectOrgDept('${v.id}','${d.replace(/'/g, "\\'")}')">${d}</div>`;
            }).join('')}
          </div>
        </div>
      </div>`;
  });

  html += `</div></div></div>`;
  container.innerHTML = html;

  // Detail panel
  renderOrgDetail();
}

function selectOrgNode(agencyId) {
  if (selectedOrgNode === agencyId) {
    selectedOrgNode = null;
    selectedOrgDeptName = null;
  } else {
    selectedOrgNode = agencyId;
    selectedOrgDeptName = null;
  }
  renderOrgChart();
}

function selectOrgDept(agencyId, deptName) {
  selectedOrgNode = agencyId;
  selectedOrgDeptName = deptName;
  // Re-render sub-nodes to highlight selected
  renderOrgChart();
  showOrgDetail(agencyId, deptName);
}

function renderOrgDetail() {
  if (!selectedOrgNode) {
    document.getElementById('org-detail').classList.remove('visible');
    return;
  }
  showOrgDetail(selectedOrgNode, selectedOrgDeptName);
}

function showOrgDetail(agencyId, dept) {
  const panel = document.getElementById('org-detail');
  const v = VIRASTOT.find(a => a.id === agencyId);
  if (!v) return;

  const configs = HAASTATTELUKONFIGURAATIOT.filter(c => c.virastoId === agencyId);
  const fbCount = PALAUTTEET.filter(p => p.virpiId === agencyId).length;
  const req = VAATIMUKSET[agencyId];
  const srNames = {};
  SIDOSRYHMAT.forEach(s => { srNames[s.id] = `${s.icon} ${s.nimi}`; });

  const agencyName = currentLang === 'en' ? v.nimiEn : v.nimi;
  const agencyDesc = currentLang === 'en' ? (v.kuvausEn || v.kuvaus) : v.kuvaus;
  panel.innerHTML = `
    <h3 style="color:${v.vpiColor}">${agencyName}${dept ? ` — ${dept}` : ''}</h3>
    <p style="font-size:.85rem;color:#555;margin-bottom:12px;">${agencyDesc}</p>
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px;">
      <div class="stat-box" style="padding:10px 16px;"><div class="num" style="font-size:1.3rem;">${fbCount}</div><div class="label">${t('orgDetailFeedback')}</div></div>
      <div class="stat-box" style="padding:10px 16px;"><div class="num" style="font-size:1.3rem;">${req ? req.pakolliset.length : 0}</div><div class="label">${t('orgDetailRequirements')}</div></div>
      <div class="stat-box" style="padding:10px 16px;"><div class="num" style="font-size:1.3rem;">${configs.length}</div><div class="label">${t('orgDetailInterviews')}</div></div>
    </div>
    <h4 style="font-size:.88rem;margin-bottom:8px;">${t('orgDetailConfigsTitle')}</h4>
    <div class="config-grid">
      ${configs.map(c => `
        <div class="config-card" onclick="toggleConfigStatus('${c.id}');renderOrgChart();">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="status-dot ${c.tila === 'käynnissä' ? 'kaynnissa' : c.tila}"></span>
            <span style="font-size:.7rem;color:#888;">${translateStatus(c.tila)}</span>
          </div>
          <div style="font-weight:500;margin-top:4px;">${srNames[c.sidosryhmaId]}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:16px;">
      <button class="sim-btn primary" style="font-size:.82rem;padding:8px 16px;" onclick="showAgencyModal('${agencyId}')">
        ${t('orgShowRequirements')}
      </button>
    </div>
  `;
  panel.classList.add('visible');
}

// ═══════════════════════════════════════════════════════════
// 8. SIMULATION — Auto-advancing with speech synthesis
// ═══════════════════════════════════════════════════════════

// ── 8a. Narration data (FI + EN per step) ──
const NARRATION = {
  fi: {
    intro: 'Tervetuloa oikeusministeriön verkkouudistushankkeen simulaatioon. Käymme läpi koko projektin seitsemän vaihetta hankevalmistelusta toteutukseen.',
    outro: 'Simulaatio on valmis! Kaikki seitsemän vaihetta on käyty läpi. Verkkouudistusprojekti etenee nyt toteutusvaiheeseen.',
    steps: {
      's1-1': 'Projektin tavoitteet määritellään yhteistyössä oikeusministeriön kanssa. Tavoitteena on luoda yhtenäinen digitaalinen palvelukokemus kaikkien kahdeksan viraston verkkosivuille.',
      's1-2': 'Sidosryhmäkartta laaditaan, jotta tunnistetaan kaikki hankkeeseen liittyvät osapuolet. Mukana on kahdeksan sidosryhmää brändistä lakiasioihin.',
      's1-3': 'Sovitaan alustava aikataulu ja budjettikehys. Hanke jaetaan selkeisiin vaiheisiin joiden välillä on tarkistuspisteitä.',
      's1-4': 'Ohjausryhmä nimetään ja käynnistyspalaveri pidetään. Projektinhallintarakenne on nyt paikallaan.',
      's2-1': 'Tarjouspyyntö laaditaan ja julkaistaan HILMA-järjestelmässä. Vaatimukset kattavat kaikkien virastojen tarpeet.',
      's2-2': 'Tarjoukset vastaanotetaan ja arvioidaan huolellisesti. Vertailutaulukko laaditaan hankintakriteerien perusteella.',
      's2-3': 'Hankintapäätös tehdään ja Siili Solutions valitaan toteuttajaksi. Sopimus allekirjoitetaan.',
      's2-4': 'Projekti käynnistyy toimittajan kanssa. Kick-off-palaverissa sovitaan yhteisistä työtavoista ja työkaluista.',
      's3-1': 'Nykytilakartoitus aloitetaan analysoimalla jokaisen viraston verkkopalvelu, kävijädata ja sisältörakenne.',
      's3-2': 'Virastokohtaiset vaatimukset kerätään työpajoissa. Jokaisella virastolla on omat erityistarpeensa.',
      's3-3': 'Vaatimukset priorisoidaan MoSCoW-menetelmällä ja hyväksytetään ohjausryhmällä.',
      's3-4': 'Vaatimusdokumentaatio valmistuu. Yhteensä on kirjattu kymmeniä pakollisia vaatimuksia ja useita lisätyöehdotuksia.',
      's4-1': 'Avoimen kuulemisen suunnittelu alkaa. Kyselylomake laaditaan ja viestintäsuunnitelma tehdään.',
      's4-2': 'Kuuleminen avataan ja viestitään laajasti. Kansalaiset ja henkilökunta voivat antaa palautetta verkkosivuista.',
      's4-3': 'Saadut vastaukset analysoidaan ja luokitellaan teemoittain. Yhteenvetoraportti laaditaan.',
      's5-1': 'Haastattelusuunnitelma laaditaan. Valitaan haastateltavat kaikista kahdeksasta virastosta ja kahdeksasta sidosryhmästä.',
      's5-2': 'Haastattelut toteutetaan systemaattisesti. Yhteensä kuusikymmentäneljä haastattelukonfiguraatiota käydään läpi.',
      's5-3': 'Haastattelumuistiinpanot kirjoitetaan puhtaaksi ja tarkistutetaan haastateltavilla.',
      's5-4': 'Löydökset luokitellaan teemoihin. Tunnistetaan virastojen väliset erot ja yhteiset tarpeet.',
      's6-1': 'Kaikki kerätty tieto yhdistetään: palautteet, haastattelut, analytiikka ja vaatimukset ristiinanalysoidaan.',
      's6-2': 'Keskeiset löydökset ja suositukset muodostetaan konkreettisiksi kehitysehdotuksiksi.',
      's6-3': 'Loppuraportti esitellään ohjausryhmälle ja suuntaviivat hyväksytään.',
      's7-1': 'Konseptisuunnittelu alkaa. Wireframe-mallit laaditaan verkkopalvelun rakenteesta ja navigaatiosta.',
      's7-2': 'Visuaalinen suunnittelu ja komponenttikirjasto toteutetaan yhtenäisellä ilmeellä kaikille virastoille.',
      's7-3': 'Tekninen toteutus etenee sprinteissä. Integraatiot ulkoisiin järjestelmiin rakennetaan.',
      's7-4': 'Laaja testaus suoritetaan sisältäen saavutettavuusauditoinnin ja käyttäjätestauksen.',
      's7-5': 'Uusi palvelu julkaistaan hallitusti. Siirtymävaihetta seurataan ja uudelleenohjaukset toteutetaan.'
    }
  },
  en: {
    intro: 'Welcome to the Ministry of Justice website renewal project simulation. We will walk through all seven phases from project preparation to implementation.',
    outro: 'The simulation is complete! All seven phases have been covered. The website renewal project now proceeds to the implementation phase.',
    steps: {
      's1-1': 'Project objectives are defined in collaboration with the Ministry of Justice. The goal is to create a unified digital service experience across all eight agency websites.',
      's1-2': 'A stakeholder map is created to identify all parties involved. Eight stakeholder groups are included, from branding to legal affairs.',
      's1-3': 'A preliminary schedule and budget framework are agreed upon. The project is divided into clear phases with checkpoints.',
      's1-4': 'The steering group is appointed and the kick-off meeting is held. The project governance structure is now in place.',
      's2-1': 'The request for proposals is prepared and published in the HILMA system. Requirements cover the needs of all agencies.',
      's2-2': 'Proposals are received and carefully evaluated. A comparison matrix is created based on procurement criteria.',
      's2-3': 'The procurement decision is made and Siili Solutions is selected as the provider. The contract is signed.',
      's2-4': 'The project launches with the provider. Common working methods and tools are agreed upon in the kick-off meeting.',
      's3-1': 'Current state analysis begins by examining each agency\'s web service, visitor data, and content structure.',
      's3-2': 'Agency-specific requirements are gathered in workshops. Each agency has its own special needs.',
      's3-3': 'Requirements are prioritized using the MoSCoW method and approved by the steering group.',
      's3-4': 'Requirements documentation is completed. Dozens of mandatory requirements and several additional work proposals are recorded.',
      's4-1': 'Open consultation planning begins. A survey form is prepared and a communication plan is created.',
      's4-2': 'The consultation opens and is widely communicated. Citizens and staff can provide feedback on the websites.',
      's4-3': 'Responses are analyzed and classified by theme. A summary report is prepared.',
      's5-1': 'An interview plan is prepared. Interviewees are selected from all eight agencies and eight stakeholder groups.',
      's5-2': 'Interviews are conducted systematically. A total of sixty-four interview configurations are covered.',
      's5-3': 'Interview notes are transcribed and verified with the interviewees.',
      's5-4': 'Findings are classified into themes. Differences and common needs between agencies are identified.',
      's6-1': 'All collected data is combined: feedback, interviews, analytics, and requirements are cross-analyzed.',
      's6-2': 'Key findings and recommendations are formed into concrete development proposals.',
      's6-3': 'The final report is presented to the steering group and guidelines are approved.',
      's7-1': 'Concept design begins. Wireframe models are created for the web service structure and navigation.',
      's7-2': 'Visual design and a component library are created with a unified look for all agencies.',
      's7-3': 'Technical implementation progresses in sprints. Integrations with external systems are built.',
      's7-4': 'Comprehensive testing is performed including an accessibility audit and user testing.',
      's7-5': 'The new service is launched in a controlled manner. The transition period is monitored and redirects are implemented.'
    }
  }
};

// ── 8b. Actors for the side panel ──
const SIM_ACTORS = [
  { id: 'om', label: 'Oikeusministeriö', labelEn: 'Ministry of Justice', icon: '🏛️', color: '#1a1a2e' },
  { id: 'siili', label: 'Siili Solutions', labelEn: 'Siili Solutions', icon: '💻', color: '#2c3e80' },
  { id: 'virastot', label: 'Virastot', labelEn: 'Agencies', icon: '🏢', color: '#1e8449' },
  { id: 'kansalaiset', label: 'Kansalaiset', labelEn: 'Citizens', icon: '👥', color: '#ca6f1e' },
  { id: 'sidosryhmat', label: 'Sidosryhmät', labelEn: 'Stakeholders', icon: '🎯', color: '#7d3c98' },
  { id: 'ohjausryhma', label: 'Ohjausryhmä', labelEn: 'Steering Group', icon: '📊', color: '#922b21' }
];

// Which actors are active per step
const STEP_ACTORS = {
  's1-1': ['om', 'siili'], 's1-2': ['om', 'siili', 'sidosryhmat'],
  's1-3': ['om', 'siili'], 's1-4': ['om', 'ohjausryhma'],
  's2-1': ['om'], 's2-2': ['om'], 's2-3': ['om', 'siili'], 's2-4': ['siili', 'om'],
  's3-1': ['siili', 'virastot'], 's3-2': ['siili', 'virastot'],
  's3-3': ['om', 'ohjausryhma', 'siili'], 's3-4': ['siili'],
  's4-1': ['siili', 'om'], 's4-2': ['kansalaiset', 'virastot', 'om'],
  's4-3': ['siili'],
  's5-1': ['siili'], 's5-2': ['siili', 'sidosryhmat', 'virastot'],
  's5-3': ['siili', 'sidosryhmat'], 's5-4': ['siili'],
  's6-1': ['siili'], 's6-2': ['siili', 'om'],
  's6-3': ['siili', 'om', 'ohjausryhma'],
  's7-1': ['siili'], 's7-2': ['siili', 'sidosryhmat'],
  's7-3': ['siili', 'virastot'], 's7-4': ['siili', 'kansalaiset', 'virastot'],
  's7-5': ['siili', 'om', 'virastot']
};

// Analytics accumulation targets per phase (cumulative)
const ANALYTICS_TARGETS = [
  { palautteet: 0, vaatimukset: 0, haastattelut: 0, dokumentit: 1, sidosryhmat: 0 },  // vaihe1
  { palautteet: 0, vaatimukset: 0, haastattelut: 0, dokumentit: 4, sidosryhmat: 0 },  // vaihe2
  { palautteet: 0, vaatimukset: 87, haastattelut: 0, dokumentit: 8, sidosryhmat: 8 },  // vaihe3
  { palautteet: 300, vaatimukset: 87, haastattelut: 0, dokumentit: 10, sidosryhmat: 8 }, // vaihe4
  { palautteet: 300, vaatimukset: 87, haastattelut: 64, dokumentit: 14, sidosryhmat: 8 }, // vaihe5
  { palautteet: 300, vaatimukset: 87, haastattelut: 64, dokumentit: 18, sidosryhmat: 8 }, // vaihe6
  { palautteet: 300, vaatimukset: 87, haastattelut: 64, dokumentit: 22, sidosryhmat: 8 }  // vaihe7
];

const ANALYTICS_MAX = { palautteet: 300, vaatimukset: 87, haastattelut: 64, dokumentit: 22, sidosryhmat: 8 };

const ANALYTICS_META = {
  palautteet: { icon: '📩', label: 'Palautteet', labelEn: 'Feedback', color: '#e74c3c' },
  vaatimukset: { icon: '📋', label: 'Vaatimukset', labelEn: 'Requirements', color: '#2c3e80' },
  haastattelut: { icon: '🎤', label: 'Haastattelut', labelEn: 'Interviews', color: '#7d3c98' },
  dokumentit: { icon: '📄', label: 'Dokumentit', labelEn: 'Documents', color: '#1e8449' },
  sidosryhmat: { icon: '🎯', label: 'Sidosryhmät', labelEn: 'Stakeholders', color: '#ca6f1e' }
};

// ── 8c. Simulation state ──
let sim = {
  state: 'idle', // idle, running, paused, done
  phaseIdx: 0,
  stepIdx: 0,
  stepProgress: 0, // 0-100 within current step
  narrationOn: false,
  lang: 'fi',
  cancelled: false,
  rafId: null,
  isSpeaking: false,
  analyticsValues: { palautteet: 0, vaatimukset: 0, haastattelut: 0, dokumentit: 0, sidosryhmat: 0 }
};

// ── 8d. Duration mapping ──
const TOTAL_ANIM_SECONDS = 60; // total animation length (longer for narration)
const MIN_STEP_SECONDS = 2.0;

function buildStepList() {
  const steps = [];
  SIMULAATIO_VAIHEET.forEach((phase, pi) => {
    phase.askeleet.forEach((step, si) => {
      steps.push({ ...step, phaseIdx: pi, stepIdx: si, phaseId: phase.id });
    });
  });
  return steps;
}

function buildTimeline(steps) {
  // Assign proportional durations (all steps get equal weight since kesto is text)
  const totalWeight = steps.length;
  const rawDurations = steps.map(() => TOTAL_ANIM_SECONDS / totalWeight);
  const durations = rawDurations.map(d => Math.max(d, MIN_STEP_SECONDS));
  const totalDur = durations.reduce((s, d) => s + d, 0);

  let cumulative = 0;
  return steps.map((step, i) => {
    const start = cumulative;
    cumulative += durations[i];
    return { ...step, animStart: start, animDuration: durations[i], animEnd: start + durations[i], globalIdx: i };
  });
}

const allSteps = buildStepList();
const timeline = buildTimeline(allSteps);
const totalAnimDuration = timeline.length > 0 ? timeline[timeline.length - 1].animEnd : 1;

// ── 8e. Speech synthesis ──
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = sim.lang === 'fi' ? 'fi-FI' : 'en-US';
  utt.rate = 0.95;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(vo => vo.lang.startsWith(sim.lang === 'fi' ? 'fi' : 'en'));
  if (v) utt.voice = v;
  utt.onend = () => { sim.isSpeaking = false; };
  utt.onerror = () => { sim.isSpeaking = false; };
  sim.isSpeaking = true;
  window.speechSynthesis.speak(utt);
}

function speakAndWait(text) {
  return new Promise(resolve => {
    if (!('speechSynthesis' in window) || sim.cancelled || !text) { resolve(); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = sim.lang === 'fi' ? 'fi-FI' : 'en-US';
    utt.rate = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(vo => vo.lang.startsWith(sim.lang === 'fi' ? 'fi' : 'en'));
    if (v) utt.voice = v;
    utt.onend = () => { sim.isSpeaking = false; resolve(); };
    utt.onerror = () => { sim.isSpeaking = false; resolve(); };
    sim.isSpeaking = true;
    window.speechSynthesis.speak(utt);
  });
}

function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  sim.isSpeaking = false;
}

// ── 8f. Animate step progress (returns promise) ──
function animateStepProgress(globalIdx, durationMs) {
  return new Promise(resolve => {
    const startTime = performance.now();
    function tick(now) {
      if (sim.cancelled) { resolve(); return; }
      const elapsed = now - startTime;
      const progress = Math.min((elapsed / durationMs) * 100, 100);
      sim.stepProgress = progress;
      updateStepProgressBar(globalIdx, progress);
      if (progress < 100) {
        sim.rafId = requestAnimationFrame(tick);
      } else {
        resolve();
      }
    }
    sim.rafId = requestAnimationFrame(tick);
  });
}

// ── 8g. Rendering functions ──
function getGlobalStepIdx() {
  let idx = 0;
  for (let i = 0; i < sim.phaseIdx; i++) idx += SIMULAATIO_VAIHEET[i].askeleet.length;
  idx += sim.stepIdx;
  return idx;
}

// Step-to-data links — maps step IDs to related data actions
const STEP_LINKS = {
  's1-2': [{ labelKey: 'linkStakeholders', action: 'showTab:interviews', cls: 'purple' }],
  's1-4': [{ labelKey: 'linkSteeringGroup', action: 'showTab:orgchart', cls: '' }],
  's2-1': [{ labelKey: 'linkRequirements', action: 'showAllReqs', cls: '' }],
  's3-1': [{ labelKey: 'linkAgencies', action: 'showTab:overview', cls: 'green' }],
  's3-2': [
    { labelKey: 'linkAgencyReqs', action: 'showAllReqs', cls: '' },
    { labelKey: 'linkOrganization', action: 'showTab:orgchart', cls: 'green' }
  ],
  's3-3': [{ labelKey: 'linkReqsMoSCoW', action: 'showAllReqs', cls: '' }],
  's3-4': [{ labelKey: 'linkAllReqs', action: 'showAllReqs', cls: '' }],
  's4-1': [{ labelKey: 'linkFeedbackForm', action: 'showTab:feedback', cls: 'orange' }],
  's4-2': [{ labelKey: 'link300Feedback', action: 'showTab:feedback', cls: 'orange' }],
  's4-3': [
    { labelKey: 'linkFeedback', action: 'showTab:feedback', cls: 'orange' },
    { labelKey: 'linkAnalytics', action: 'showAnalytics:palautteet', cls: '' }
  ],
  's5-1': [
    { labelKey: 'linkInterviewConfigs', action: 'showTab:interviews', cls: 'purple' },
    { labelKey: 'linkOrganization', action: 'showTab:orgchart', cls: 'green' }
  ],
  's5-2': [{ labelKey: 'link64Interviews', action: 'showTab:interviews', cls: 'purple' }],
  's5-3': [{ labelKey: 'linkInterviewNotes', action: 'showTab:interviews', cls: 'purple' }],
  's5-4': [{ labelKey: 'linkAnalytics', action: 'showAnalytics:haastattelut', cls: '' }],
  's6-1': [
    { labelKey: 'linkFeedback', action: 'showTab:feedback', cls: 'orange' },
    { labelKey: 'linkInterviews', action: 'showTab:interviews', cls: 'purple' }
  ],
  's6-3': [{ labelKey: 'linkOrganization', action: 'showTab:orgchart', cls: 'green' }],
  's7-2': [{ labelKey: 'linkBrandStakeholders', action: 'showTab:interviews', cls: 'purple' }],
  's7-4': [{ labelKey: 'linkAccessibilityReqs', action: 'showAllReqs', cls: '' }]
};

function handleStepLink(action) {
  if (action.startsWith('showTab:')) {
    const tab = action.split(':')[1];
    document.querySelectorAll('#tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const btn = document.querySelector(`#tabs button[data-view="${tab}"]`);
    if (btn) btn.classList.add('active');
    document.getElementById(tab).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (action === 'showAllReqs') {
    // Show first agency's requirements modal as overview
    showAgencyModal(VIRASTOT[0].id);
  } else if (action.startsWith('showAnalytics:')) {
    const key = action.split(':')[1];
    // Find the analytics sector and simulate click
    const sector = document.querySelector(`.analytics-sector[onclick*="${key}"]`);
    if (sector) sector.click();
  }
}

function renderSimTimeline() {
  const el = document.getElementById('sim-timeline');
  el.innerHTML = SIMULAATIO_VAIHEET.map((phase, pi) => {
    let pc = '';
    if (pi < sim.phaseIdx || sim.state === 'done') pc = 'done';
    else if (pi === sim.phaseIdx && (sim.state === 'running' || sim.state === 'paused')) pc = 'active';

    return `
      <div class="sim-phase ${pc}">
        <div class="sim-phase-dot"></div>
        <div class="sim-phase-content">
          <h4>${phase.icon} ${phase.nimi}</h4>
          <div class="phase-meta">${phase.kesto} — ${phase.toimijat.join(', ')}</div>
          <div class="sim-steps">
            ${phase.askeleet.map((step, si) => {
              let sc = '';
              if (pi < sim.phaseIdx || sim.state === 'done') sc = 'done';
              else if (pi === sim.phaseIdx && si < sim.stepIdx) sc = 'done';
              else if (pi === sim.phaseIdx && si === sim.stepIdx && (sim.state === 'running' || sim.state === 'paused')) sc = 'active';

              const gIdx = timeline.findIndex(tl => tl.phaseIdx === pi && tl.stepIdx === si);
              const links = STEP_LINKS[step.id] || [];
              const hasLinks = links.length > 0;
              const linksHtml = (sc === 'done' || sc === 'active') && hasLinks
                ? `<div class="step-links">${links.map(l => `<span class="step-link ${l.cls}" onclick="event.stopPropagation();handleStepLink('${l.action}')">${t(l.labelKey)}</span>`).join('')}</div>`
                : '';

              return `
                <div class="sim-step ${sc} ${hasLinks ? 'clickable' : ''}" id="sim-step-${gIdx}">
                  <span class="step-icon">${sc === 'done' ? '✅' : (sc === 'active' ? '▶️' : '⬜')}</span>
                  <div class="step-info">
                    <div class="step-label">${step.teksti}</div>
                    <div class="step-detail">${step.kuvaus}</div>
                    ${linksHtml}
                  </div>
                  ${sc === 'active' ? `<div class="step-progress"><div class="sp-fill" id="sp-fill-${gIdx}" style="width:${sim.stepProgress}%"></div></div>` : `<span class="step-dur">${step.kesto}</span>`}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateStepProgressBar(globalIdx, pct) {
  const el = document.getElementById('sp-fill-' + globalIdx);
  if (el) el.style.width = pct + '%';
}

function updateGlobalProgress() {
  const gIdx = getGlobalStepIdx();
  const stepFraction = sim.stepProgress / 100;
  const pct = ((gIdx + stepFraction) / allSteps.length) * 100;
  document.getElementById('sim-progress-fill').style.width = Math.min(pct, 100) + '%';
}

function updateSimStatus() {
  const el = document.getElementById('sim-status');
  if (sim.state === 'running' || sim.state === 'paused') {
    const phase = SIMULAATIO_VAIHEET[sim.phaseIdx];
    const icon = sim.state === 'paused' ? '\u23F8' : '';
    el.innerHTML = `<span class="pulse"></span> ${t('simPhaseLabel')} ${sim.phaseIdx + 1}/${SIMULAATIO_VAIHEET.length}: ${phase.nimi} ${icon}`;
  } else if (sim.state === 'done') {
    el.innerHTML = `<span style="color:#27ae60;font-weight:600;">\u2713 ${t('simDone')}</span>`;
  } else {
    el.innerHTML = '';
  }
}

function renderSimNarrative(stepId) {
  const box = document.getElementById('sim-narrative-box');
  if (!stepId) { box.innerHTML = ''; return; }
  const narr = NARRATION[sim.lang];
  const text = narr.steps[stepId] || '';
  const phase = SIMULAATIO_VAIHEET[sim.phaseIdx];
  const step = phase ? phase.askeleet[sim.stepIdx] : null;
  box.innerHTML = `
    <div class="sim-narrative">
      <div class="narrator-label">${phase ? phase.icon + ' ' + phase.nimi : ''} ${step ? '— ' + step.teksti : ''}</div>
      ${text}
    </div>
  `;
}

// ── 8h. Actors panel ──
function renderSimActors(activeStepId) {
  const container = document.getElementById('sim-actors');
  const activeIds = activeStepId ? (STEP_ACTORS[activeStepId] || []) : [];
  const isPlaying = sim.state === 'running' || sim.state === 'paused';

  container.innerHTML = SIM_ACTORS.map(actor => {
    const isActive = activeIds.includes(actor.id);
    const dimmed = isPlaying && !isActive;
    const label = currentLang === 'en' ? actor.labelEn : actor.label;
    return `
      <div class="actor-node ${dimmed ? 'dimmed' : ''} ${isActive ? 'active' : ''}">
        <div class="actor-icon ${isActive ? 'glowing' : ''}" style="background:${actor.color}20;border-color:${isActive ? actor.color : 'transparent'}">
          ${actor.icon}
        </div>
        <div class="actor-name">${label}</div>
      </div>
    `;
  }).join('');

  // Connections
  const connEl = document.getElementById('sim-connections');
  if (activeIds.length >= 2) {
    const pairs = [];
    for (let i = 0; i < activeIds.length - 1; i++) {
      for (let j = i + 1; j < activeIds.length; j++) {
        pairs.push([activeIds[i], activeIds[j]]);
      }
    }
    connEl.innerHTML = pairs.map(([a, b]) => {
      const actA = SIM_ACTORS.find(x => x.id === a);
      const actB = SIM_ACTORS.find(x => x.id === b);
      return `<div class="actor-conn active-conn" title="${actA.label} ↔ ${actB.label}"></div>`;
    }).join('');
  } else {
    connEl.innerHTML = '';
  }
}

// ── 8i. Analytics panel ──
function renderSimAnalytics() {
  const container = document.getElementById('sim-analytics-sectors');
  container.innerHTML = Object.entries(ANALYTICS_META).map(([key, meta]) => {
    const val = Math.round(sim.analyticsValues[key]);
    const max = ANALYTICS_MAX[key];
    const pct = max > 0 ? (val / max) * 100 : 0;
    const label = currentLang === 'en' ? meta.labelEn : meta.label;
    return `
      <div class="analytics-sector" onclick="showAnalyticsPopup('${key}', event)">
        <span class="sector-icon">${meta.icon}</span>
        <div class="sector-info">
          <div class="sector-label">${label}</div>
          <div class="sector-bar-bg"><div class="sector-bar" style="width:${pct}%;background:${meta.color}"></div></div>
        </div>
        <span class="sector-value" id="av-${key}">${val}</span>
      </div>
    `;
  }).join('');
}

function animateAnalyticsTo(phaseIdx) {
  const target = ANALYTICS_TARGETS[Math.min(phaseIdx, ANALYTICS_TARGETS.length - 1)];
  const start = { ...sim.analyticsValues };
  const startTime = performance.now();
  const duration = 1000;

  function tick(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out
    Object.keys(target).forEach(key => {
      sim.analyticsValues[key] = start[key] + (target[key] - start[key]) * ease;
      const el = document.getElementById('av-' + key);
      if (el) el.textContent = Math.round(sim.analyticsValues[key]);
      // Update bar
      const bar = document.querySelector(`.analytics-sector[onclick*="${key}"] .sector-bar`);
      if (bar) bar.style.width = (ANALYTICS_MAX[key] > 0 ? (sim.analyticsValues[key] / ANALYTICS_MAX[key]) * 100 : 0) + '%';
    });
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── 8j. Analytics popup ──
function showAnalyticsPopup(key, event) {
  const popup = document.getElementById('analytics-popup');
  const meta = ANALYTICS_META[key];
  const label = currentLang === 'en' ? meta.labelEn : meta.label;
  let rows = '';

  if (key === 'palautteet') {
    const byAgency = {};
    VIRASTOT.forEach(v => { byAgency[v.id] = { name: currentLang === 'en' ? v.nimiEn : v.nimi, count: 0, color: v.vpiColor }; });
    PALAUTTEET.forEach(p => { if (byAgency[p.virpiId]) byAgency[p.virpiId].count++; });
    const maxVal = Math.max(...Object.values(byAgency).map(v => v.count), 1);
    rows = Object.values(byAgency).map(v => `
      <div class="ap-row">
        <span style="min-width:140px;">${v.name}</span>
        <div class="ap-bar-bg"><div class="ap-bar" style="width:${(v.count / maxVal) * 100}%;background:${v.color}"></div></div>
        <span style="min-width:36px;text-align:right;font-weight:600;">${v.count}</span>
      </div>
    `).join('');
  } else if (key === 'vaatimukset') {
    const byAgency = {};
    VIRASTOT.forEach(v => {
      const req = VAATIMUKSET[v.id];
      byAgency[v.id] = { name: currentLang === 'en' ? v.nimiEn : v.nimi, pakolliset: req ? req.pakolliset.length : 0, lisatyo: req ? req.lisatyo.length : 0, color: v.vpiColor };
    });
    const maxVal = Math.max(...Object.values(byAgency).map(v => v.pakolliset + v.lisatyo), 1);
    rows = Object.values(byAgency).map(v => `
      <div class="ap-row">
        <span style="min-width:140px;">${v.name}</span>
        <div class="ap-bar-bg"><div class="ap-bar" style="width:${((v.pakolliset + v.lisatyo) / maxVal) * 100}%;background:${v.color}"></div></div>
        <span style="min-width:50px;text-align:right;font-size:.75rem;">${v.pakolliset} + ${v.lisatyo}</span>
      </div>
    `).join('');
  } else if (key === 'haastattelut') {
    const bySR = {};
    SIDOSRYHMAT.forEach(sr => { bySR[sr.id] = { name: sr.icon + ' ' + sr.nimi, count: 0 }; });
    HAASTATTELUKONFIGURAATIOT.forEach(c => {
      if (c.tila === 'valmis' || c.tila === 'käynnissä') bySR[c.sidosryhmaId].count++;
    });
    rows = Object.values(bySR).map(v => `
      <div class="ap-row">
        <span style="min-width:160px;">${v.name}</span>
        <div class="ap-bar-bg"><div class="ap-bar" style="width:${(v.count / 8) * 100}%;background:#7d3c98"></div></div>
        <span style="min-width:30px;text-align:right;font-weight:600;">${v.count}/8</span>
      </div>
    `).join('');
  } else if (key === 'sidosryhmat') {
    rows = SIDOSRYHMAT.map(sr => `
      <div class="ap-row">
        <span>${sr.icon} ${sr.nimi}</span>
        <span style="font-size:.75rem;color:#888;">${sr.vastuuhenkilot.join(', ')}</span>
      </div>
    `).join('');
  } else {
    rows = `<div class="ap-row"><span>${t('simDocumentsPopup')}</span></div>`;
  }

  popup.innerHTML = `
    <button class="ap-close" onclick="closeAnalyticsPopup()">&times;</button>
    <h3>${meta.icon} ${label}</h3>
    ${rows}
  `;
  popup.style.display = 'block';
  // Position near click
  const rect = event.currentTarget.getBoundingClientRect();
  popup.style.top = Math.max(10, rect.top - 20) + 'px';
  popup.style.left = Math.max(10, rect.left - 440) + 'px';
}

function closeAnalyticsPopup() {
  document.getElementById('analytics-popup').style.display = 'none';
}
document.addEventListener('click', e => {
  const popup = document.getElementById('analytics-popup');
  if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.closest('.analytics-sector')) {
    closeAnalyticsPopup();
  }
});

// ── 8k. Phase summary ──
function updatePhaseSummary(stepId) {
  const el = document.getElementById('sim-phase-summary');
  if (sim.state === 'idle') {
    el.innerHTML = t('simPhaseSummaryIdle');
    return;
  }
  if (sim.state === 'done') {
    el.innerHTML = t('simPhaseSummaryDone');
    return;
  }
  const phase = SIMULAATIO_VAIHEET[sim.phaseIdx];
  if (!phase) return;
  const activeActors = STEP_ACTORS[stepId] || [];
  const actorLabels = activeActors.map(id => {
    const a = SIM_ACTORS.find(x => x.id === id);
    return a ? (currentLang === 'en' ? a.labelEn : a.label) : id;
  });
  const vals = sim.analyticsValues;
  el.innerHTML = `
    <div style="margin-bottom:6px;"><strong>${phase.icon} ${phase.nimi}</strong></div>
    <div style="font-size:.78rem;color:#888;margin-bottom:4px;">${t('simActiveActors')}: ${actorLabels.join(', ')}</div>
    <div style="font-size:.78rem;color:#888;">${t('simDataCollected')}: ${Math.round(vals.palautteet)} ${t('simFeedbackUnit')}, ${Math.round(vals.vaatimukset)} ${t('simRequirementsUnit')}, ${Math.round(vals.haastattelut)} ${t('simInterviewsUnit')}</div>
  `;
}

// ── 8l. Main simulation loop (narration-synced) ──
async function runSimulation() {
  sim.state = 'running';
  sim.cancelled = false;
  sim.phaseIdx = 0;
  sim.stepIdx = 0;
  sim.stepProgress = 0;
  sim.analyticsValues = { palautteet: 0, vaatimukset: 0, haastattelut: 0, dokumentit: 0, sidosryhmat: 0 };

  updateSimButtons();
  renderSimTimeline();
  renderSimActors(null);
  renderSimAnalytics();
  updateSimStatus();

  const narr = NARRATION[sim.lang];

  // Speak intro
  if (sim.narrationOn) {
    await speakAndWait(narr.intro);
    if (sim.cancelled) return;
  } else {
    await sleep(800);
  }

  let prevPhase = -1;

  // Walk through each step
  for (let g = 0; g < timeline.length; g++) {
    if (sim.cancelled) break;

    // Wait if paused
    while (sim.state === 'paused' && !sim.cancelled) {
      await sleep(100);
    }
    if (sim.cancelled) break;

    const step = timeline[g];
    sim.phaseIdx = step.phaseIdx;
    sim.stepIdx = step.stepIdx;
    sim.stepProgress = 0;

    // Phase changed? Update analytics + knowledge graph
    if (step.phaseIdx !== prevPhase) {
      prevPhase = step.phaseIdx;
      animateAnalyticsTo(step.phaseIdx);
    }
    updateKGForPhase(step.phaseIdx);
    renderKnowledgeGraph();

    renderSimTimeline();
    renderSimNarrative(step.id);
    renderSimActors(step.id);
    updateSimStatus();
    updatePhaseSummary(step.id);
    updateGlobalProgress();

    // Scroll active step into view
    const stepEl = document.getElementById('sim-step-' + g);
    if (stepEl) stepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Run speech + progress animation in parallel, wait for both
    const animDurationMs = (sim.narrationOn ? Math.max(step.animDuration * 1000, 2000) : step.animDuration * 1000);
    const narrationText = narr.steps[step.id] || '';

    if (sim.narrationOn && narrationText) {
      await Promise.all([
        speakAndWait(narrationText),
        animateStepProgress(g, animDurationMs)
      ]);
    } else {
      await animateStepProgress(g, animDurationMs);
    }

    if (sim.cancelled) break;
  }

  if (!sim.cancelled) {
    sim.state = 'done';
    sim.stepProgress = 100;
    document.getElementById('sim-progress-fill').style.width = '100%';
    animateAnalyticsTo(SIMULAATIO_VAIHEET.length - 1);
    kgEdges.forEach(e => { e.weight = 1; });
    renderKnowledgeGraph();
    renderSimTimeline();
    updateSimStatus();
    updatePhaseSummary(null);

    const narr2 = NARRATION[sim.lang];
    const box = document.getElementById('sim-narrative-box');
    box.innerHTML = `
      <div class="sim-narrative">
        <div class="narrator-label">${t('simSummaryLabel')}</div>
        ${narr2.outro}
      </div>
    `;

    if (sim.narrationOn) {
      await speakAndWait(narr2.outro);
    }

    updateSimButtons();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── 8m. Button handlers ──
function updateSimButtons() {
  const playBtn = document.getElementById('sim-play');
  const pauseBtn = document.getElementById('sim-pause');
  const resetBtn = document.getElementById('sim-reset');

  if (sim.state === 'idle') {
    playBtn.style.display = 'inline-block';
    playBtn.innerHTML = '&#9654; ' + (currentLang === 'en' ? 'Start simulation' : 'Aloita simulaatio');
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'none';
  } else if (sim.state === 'running') {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    pauseBtn.innerHTML = '&#10074;&#10074; ' + (currentLang === 'en' ? 'Pause' : 'Tauko');
    resetBtn.style.display = 'inline-block';
    resetBtn.innerHTML = '&#8635; ' + (currentLang === 'en' ? 'Reset' : 'Alusta');
  } else if (sim.state === 'paused') {
    playBtn.style.display = 'inline-block';
    playBtn.innerHTML = '&#9654; ' + (currentLang === 'en' ? 'Continue' : 'Jatka');
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    resetBtn.innerHTML = '&#8635; ' + (currentLang === 'en' ? 'Reset' : 'Alusta');
  } else if (sim.state === 'done') {
    playBtn.style.display = 'inline-block';
    playBtn.innerHTML = '&#9654; ' + (currentLang === 'en' ? 'Restart' : 'Aloita uudelleen');
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    resetBtn.innerHTML = '&#8635; ' + (currentLang === 'en' ? 'Reset' : 'Alusta');
  }
}

document.getElementById('sim-play').addEventListener('click', () => {
  if (sim.state === 'idle' || sim.state === 'done') {
    runSimulation();
  } else if (sim.state === 'paused') {
    sim.state = 'running';
    updateSimButtons();
    updateSimStatus();
  }
});

document.getElementById('sim-pause').addEventListener('click', () => {
  if (sim.state === 'running') {
    sim.state = 'paused';
    stopSpeech();
    updateSimButtons();
    updateSimStatus();
  }
});

document.getElementById('sim-reset').addEventListener('click', () => {
  sim.cancelled = true;
  sim.state = 'idle';
  sim.phaseIdx = 0;
  sim.stepIdx = 0;
  sim.stepProgress = 0;
  sim.analyticsValues = { palautteet: 0, vaatimukset: 0, haastattelut: 0, dokumentit: 0, sidosryhmat: 0 };
  stopSpeech();
  if (sim.rafId) cancelAnimationFrame(sim.rafId);
  updateSimButtons();
  renderSimTimeline();
  renderSimActors(null);
  renderSimAnalytics();
  updateSimStatus();
  updatePhaseSummary(null);
  document.getElementById('sim-progress-fill').style.width = '0%';
  document.getElementById('sim-narrative-box').innerHTML = '';
  kgEdges.forEach(e => { e.weight = 0; });
  kgActiveNode = null;
  closeKGPopup();
  renderKnowledgeGraph();
});

// Narration toggle
document.getElementById('sim-narrate').addEventListener('click', () => {
  sim.narrationOn = !sim.narrationOn;
  const btn = document.getElementById('sim-narrate');
  btn.classList.toggle('speaking', sim.narrationOn);
  btn.innerHTML = sim.narrationOn
    ? '&#128266; ' + (currentLang === 'en' ? 'Speaking' : 'Puhe päällä')
    : '&#128264; ' + (currentLang === 'en' ? 'Speak' : 'Puhu');
  if (!sim.narrationOn) stopSpeech();
});

// Language toggle (simulation-specific, also triggers full app language change)
document.querySelectorAll('.sim-lang-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLanguage(btn.dataset.lang);
  });
});

// ═══════════════════════════════════════════════════════════
// 8n. KNOWLEDGE GRAPH — interview data accumulation
// ═══════════════════════════════════════════════════════════
const KG_W = 380, KG_H = 240;
const KG_CX = KG_W / 2, KG_CY = KG_H / 2;

// Build graph nodes: 8 agencies (outer ring) + 8 stakeholder groups (inner ring)
function buildKGNodes() {
  const nodes = [];
  // Agencies in outer ring
  VIRASTOT.forEach((v, i) => {
    const angle = (i / VIRASTOT.length) * Math.PI * 2 - Math.PI / 2;
    nodes.push({
      id: v.id, type: 'agency', label: v.nimi.split(' ')[0], fullLabel: v.nimi,
      x: KG_CX + Math.cos(angle) * 100, y: KG_CY + Math.sin(angle) * 80,
      color: v.vpiColor, r: 10
    });
  });
  // Stakeholders in inner ring
  SIDOSRYHMAT.forEach((sr, i) => {
    const angle = (i / SIDOSRYHMAT.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8;
    nodes.push({
      id: sr.id, type: 'stakeholder', label: sr.icon, fullLabel: sr.nimi,
      x: KG_CX + Math.cos(angle) * 44, y: KG_CY + Math.sin(angle) * 36,
      color: '#7d3c98', r: 8
    });
  });
  return nodes;
}

// Build edges: one per interview config (agency × stakeholder)
function buildKGEdges(nodes) {
  return HAASTATTELUKONFIGURAATIOT.map(c => ({
    id: c.id,
    source: nodes.find(n => n.id === c.virastoId),
    target: nodes.find(n => n.id === c.sidosryhmaId),
    weight: 0 // 0 = not started, 1 = done
  }));
}

const kgNodes = buildKGNodes();
const kgEdges = buildKGEdges(kgNodes);
let kgActiveNode = null;

function renderKnowledgeGraph() {
  const svg = document.getElementById('kg-canvas');
  svg.setAttribute('viewBox', `0 0 ${KG_W} ${KG_H}`);

  // Edges
  let edgesSVG = kgEdges.map(e => {
    const active = e.weight > 0;
    const highlighted = kgActiveNode && (e.source.id === kgActiveNode || e.target.id === kgActiveNode);
    const opacity = kgActiveNode ? (highlighted ? 0.6 : 0.04) : (active ? 0.35 : 0.06);
    const sw = active ? (highlighted ? 2 : 1.2) : 0.5;
    const color = active ? '#7d3c98' : '#ccc';
    return `<line class="kg-edge ${active ? 'active' : 'inactive'}"
      x1="${e.source.x}" y1="${e.source.y}" x2="${e.target.x}" y2="${e.target.y}"
      stroke="${color}" stroke-width="${sw}" stroke-opacity="${opacity}" />`;
  }).join('');

  // Nodes
  let nodesSVG = kgNodes.map(n => {
    const dimmed = kgActiveNode && kgActiveNode !== n.id;
    const selected = kgActiveNode === n.id;
    const connectedEdges = kgEdges.filter(e => (e.source.id === n.id || e.target.id === n.id) && e.weight > 0);
    const completion = n.type === 'agency'
      ? connectedEdges.length / SIDOSRYHMAT.length
      : connectedEdges.length / VIRASTOT.length;
    const scaledR = n.r + completion * 6;
    const op = dimmed ? 0.3 : 1;

    return `<g class="kg-node" onclick="kgClickNode('${n.id}')" style="opacity:${op}">
      <circle cx="${n.x}" cy="${n.y}" r="${scaledR}" fill="${n.color}" fill-opacity="${selected ? 1 : 0.8}"
        stroke="${selected ? '#fff' : 'none'}" stroke-width="${selected ? 2 : 0}" />
      <text x="${n.x}" y="${n.y}" text-anchor="middle" dominant-baseline="central"
        fill="#fff" font-size="${n.type === 'stakeholder' ? 9 : 6}" font-weight="600">${n.label}</text>
    </g>`;
  }).join('');

  svg.innerHTML = edgesSVG + nodesSVG;

  // Legend
  const legend = document.getElementById('kg-legend');
  const doneCount = kgEdges.filter(e => e.weight > 0).length;
  legend.innerHTML = `
    <span><span class="dot" style="background:#2c3e80"></span> ${t('kgAgencies')}</span>
    <span><span class="dot" style="background:#7d3c98"></span> ${t('kgStakeholders')}</span>
    <span style="margin-left:auto;font-weight:600;color:#2c3e80;">${doneCount}/${kgEdges.length}</span>
  `;
}

function kgClickNode(nodeId) {
  kgActiveNode = kgActiveNode === nodeId ? null : nodeId;
  renderKnowledgeGraph();
  if (kgActiveNode) showKGPopup(kgActiveNode);
  else closeKGPopup();
}

function showKGPopup(nodeId) {
  const container = document.getElementById('kg-popup-container');
  const node = kgNodes.find(n => n.id === nodeId);
  if (!node) return;

  const isAgency = node.type === 'agency';
  const edges = kgEdges.filter(e => e.source.id === nodeId || e.target.id === nodeId);
  const partners = edges.map(e => {
    const partner = e.source.id === nodeId ? e.target : e.source;
    const partnerNode = kgNodes.find(n => n.id === partner.id);
    return { ...partner, fullLabel: partnerNode ? partnerNode.fullLabel : partner.id, done: e.weight > 0 };
  });

  const totalDone = partners.filter(p => p.done).length;
  const total = partners.length;

  let rowsHtml = partners.map(p => `
    <div class="kgp-bar-row">
      <span class="kgp-label">${p.fullLabel}</span>
      <div class="kgp-bar-bg"><div class="kgp-bar" style="width:${p.done ? 100 : 0}%;background:${p.done ? '#27ae60' : '#eee'}"></div></div>
      <span class="kgp-val" style="color:${p.done ? '#27ae60' : '#ccc'}">${p.done ? '✓' : '—'}</span>
    </div>
  `).join('');

  // If agency: also show feedback count and requirements
  let extraHtml = '';
  if (isAgency) {
    const fbCount = PALAUTTEET.filter(p => p.virpiId === nodeId).length;
    const req = VAATIMUKSET[nodeId];
    const reqCount = req ? req.pakolliset.length : 0;
    extraHtml = `
      <div style="display:flex;gap:12px;margin-top:8px;padding-top:8px;border-top:1px solid #f0f0f0;font-size:.75rem;color:#666;">
        <span>\u{1F4E9} ${fbCount} ${t('feedbackLabel')}</span>
        <span>\u{1F4CB} ${reqCount} ${t('requirementsLabel')}</span>
        <span style="cursor:pointer;color:#2c3e80;text-decoration:underline;" onclick="showAgencyModal('${nodeId}')">${t('kgShowAll')}</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="kg-popup">
      <button class="kgp-close" onclick="closeKGPopup()">&times;</button>
      <h4 style="color:${node.color}">${node.fullLabel}</h4>
      <div style="font-size:.75rem;color:#888;margin-bottom:8px;">${isAgency ? t('kgStakeholderInterviews') : t('kgAgencyInterviews')}: ${totalDone}/${total}</div>
      <div style="width:100%;height:4px;background:#eee;border-radius:2px;margin-bottom:8px;overflow:hidden;">
        <div style="height:100%;width:${total > 0 ? (totalDone / total) * 100 : 0}%;background:linear-gradient(90deg,#2c3e80,#27ae60);border-radius:2px;transition:width .6s;"></div>
      </div>
      ${rowsHtml}
      ${extraHtml}
    </div>
  `;
}

function closeKGPopup() {
  document.getElementById('kg-popup-container').innerHTML = '';
  kgActiveNode = null;
  renderKnowledgeGraph();
}

// Update knowledge graph edges based on simulation phase
function updateKGForPhase(phaseIdx) {
  // Reset all
  kgEdges.forEach(e => { e.weight = 0; });

  if (phaseIdx < 4) return; // No interviews before phase 5

  // Phase 5 (idx 4): interviews are in progress
  // Gradually reveal edges based on sub-step progress within phase 5
  const interviewPhaseIdx = 4;
  if (phaseIdx === interviewPhaseIdx) {
    const stepCount = SIMULAATIO_VAIHEET[interviewPhaseIdx].askeleet.length;
    const progress = sim.stepIdx / Math.max(stepCount - 1, 1);
    const edgesToReveal = Math.round(progress * kgEdges.length);
    for (let i = 0; i < edgesToReveal; i++) kgEdges[i].weight = 1;
  } else if (phaseIdx > interviewPhaseIdx) {
    // All interviews done
    kgEdges.forEach(e => { e.weight = 1; });
  }
}

// ═══════════════════════════════════════════════════════════
// 9. INIT
// ═══════════════════════════════════════════════════════════
// Sort feedback by timestamp (newest first)
PALAUTTEET.sort((a, b) => new Date(b.aikaleima) - new Date(a.aikaleima));

// Apply saved language (this also renders everything)
applyLanguage(currentLang);
initChat();
// Preload voices
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
