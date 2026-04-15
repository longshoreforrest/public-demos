// app.js — Joensuu Site Tapahtumat

// ==================== I18N ====================
const i18n = {
  fi: {
    appTitle: 'Joensuu Site Tapahtumat',
    appSubtitle: 'Kaikki Joensuun toimiston tapahtumat yhdessä paikassa',
    navEvents: 'Tapahtumat',
    navCalendar: 'Kalenteri',
    navSlack: 'Slack',
    navExport: 'Vienti',
    navGuide: '?',
    eventsTitle: 'Tapahtumat',
    eventsSubtitle: 'Selaa ja suodata Joensuun toimiston tapahtumia',
    filterCategory: 'Kategoria',
    filterDateFrom: 'Alkaen',
    filterDateTo: 'Saakka',
    filterSearch: 'Haku',
    filterSearchPlaceholder: 'Hae tapahtumia...',
    filterAll: 'Kaikki',
    statsShowing: 'tapahtumaa',
    statsCategories: 'kategoriaa',
    calendarTitle: 'Kalenteri',
    calendarSubtitle: 'Kuukausinäkymä tapahtumista',
    slackTitle: 'Slack-integraatio',
    slackSubtitle: 'Simuloitu näkymä Slack-kanavien tapahtumaviesteistä',
    slackPlaceholder: 'Kirjoita viesti...',
    slackSend: 'Lähetä',
    slackSettingsTitle: 'Ilmoitusasetukset',
    slackNotifyNew: 'Ilmoita uusista tapahtumista',
    slackNotifyReminder: 'Muistutus päivää ennen',
    slackNotifyWeekly: 'Viikkoyhteenveto maanantaisin',
    slackDemoBtn: 'Simuloi ilmoitus',
    exportTitle: 'Vienti',
    exportSubtitle: 'Lataa tapahtumat Exceliin tai kalenteritiedostona',
    exportExcelTitle: 'Excel-vienti',
    exportExcelDesc: 'Lataa kaikki tapahtumat Excel-muodossa (.csv). Sisältää päivämäärän, ajan, kategorian, sijainnin ja kuvauksen.',
    exportIcsTitle: 'Kalenterivienti',
    exportIcsDesc: 'Lataa tapahtumat .ics-tiedostona, jonka voit tuoda Google Calendariin, Outlookiin tai Apple Calendariin.',
    exportOnlyFiltered: 'Vie vain suodatetut tapahtumat',
    exportExcelBtn: 'Lataa Excel (.csv)',
    exportIcsBtn: 'Lataa .ics-tiedosto',
    exportPreviewTitle: 'Esikatselu',
    addToCalendar: 'Lisää kalenteriin',
    details: 'Tiedot',
    location: 'Paikka',
    time: 'Aika',
    duration: 'Kesto',
    recurring: 'Toistuu',
    description: 'Kuvaus',
    category: 'Kategoria',
    min: 'min',
    date: 'Päivämäärä',
    noEvents: 'Ei tapahtumia valituilla suodattimilla',
    toastCalendar: 'Kalenteritiedosto ladattu!',
    toastExcel: 'Excel-tiedosto ladattu!',
    toastSlack: 'Viesti lähetetty!',
    toastCopied: 'Kopioitu leikepöydälle!',
    thDate: 'Päivämäärä',
    thTime: 'Aika',
    thEvent: 'Tapahtuma',
    thCategory: 'Kategoria',
    thLocation: 'Paikka',
    thDuration: 'Kesto',
    mon: 'Ma', tue: 'Ti', wed: 'Ke', thu: 'To', fri: 'Pe', sat: 'La', sun: 'Su',
    months: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu',
             'Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
    slackNotificationTitle: 'Slack-ilmoitus',
    slackNotificationBody: 'Muistutus: Huomenna on tapahtuma! Tarkista tapahtumakalenteri.',
    navAnalytics: 'Analytiikka',
    analyticsTitle: 'Analytiikka',
    analyticsSubtitle: 'Tapahtumien tilastot ja jakaumat — klikkaa kaavioita porautuaksesi',
    analyticsCategoryDonut: 'Kategoriajakauma',
    analyticsCategoryBar: 'Tapahtumat kategorioittain',
    analyticsMonthly: 'Kuukausijakauma',
    analyticsMonthlyHint: 'Klikkaa kuukautta siirtyäksesi kalenterinäkymään',
    analyticsLocation: 'Tapahtumat sijainneittain',
    analyticsTimeline: 'Tapahtuma-aikajana',
    analyticsClickHint: 'Klikkaa kaavioelementtiä porautuaksesi',
    analyticsTotalEvents: 'Tapahtumaa',
    analyticsCategories: 'Kategoriaa',
    analyticsLocations: 'Sijaintia',
    analyticsMonthsCovered: 'Kuukautta',
    analyticsEventsCount: 'tapahtumaa',
    analyticsDrilldownClose: 'Sulje',
    analyticsDrilldownCalendar: 'Näytä kalenterissa',
    analyticsWeek: 'Viikko',
  },
  en: {
    appTitle: 'Joensuu Site Events',
    appSubtitle: 'All Joensuu office events in one place',
    navEvents: 'Events',
    navCalendar: 'Calendar',
    navSlack: 'Slack',
    navExport: 'Export',
    navGuide: '?',
    eventsTitle: 'Events',
    eventsSubtitle: 'Browse and filter Joensuu office events',
    filterCategory: 'Category',
    filterDateFrom: 'From',
    filterDateTo: 'To',
    filterSearch: 'Search',
    filterSearchPlaceholder: 'Search events...',
    filterAll: 'All',
    statsShowing: 'events',
    statsCategories: 'categories',
    calendarTitle: 'Calendar',
    calendarSubtitle: 'Monthly view of events',
    slackTitle: 'Slack Integration',
    slackSubtitle: 'Simulated view of Slack channel event messages',
    slackPlaceholder: 'Type a message...',
    slackSend: 'Send',
    slackSettingsTitle: 'Notification Settings',
    slackNotifyNew: 'Notify about new events',
    slackNotifyReminder: 'Reminder one day before',
    slackNotifyWeekly: 'Weekly summary on Mondays',
    slackDemoBtn: 'Simulate notification',
    exportTitle: 'Export',
    exportSubtitle: 'Download events as Excel or calendar file',
    exportExcelTitle: 'Excel Export',
    exportExcelDesc: 'Download all events in Excel format (.csv). Includes date, time, category, location and description.',
    exportIcsTitle: 'Calendar Export',
    exportIcsDesc: 'Download events as .ics file that can be imported to Google Calendar, Outlook or Apple Calendar.',
    exportOnlyFiltered: 'Export only filtered events',
    exportExcelBtn: 'Download Excel (.csv)',
    exportIcsBtn: 'Download .ics file',
    exportPreviewTitle: 'Preview',
    addToCalendar: 'Add to calendar',
    details: 'Details',
    location: 'Location',
    time: 'Time',
    duration: 'Duration',
    recurring: 'Recurring',
    description: 'Description',
    category: 'Category',
    min: 'min',
    date: 'Date',
    noEvents: 'No events match selected filters',
    toastCalendar: 'Calendar file downloaded!',
    toastExcel: 'Excel file downloaded!',
    toastSlack: 'Message sent!',
    toastCopied: 'Copied to clipboard!',
    thDate: 'Date',
    thTime: 'Time',
    thEvent: 'Event',
    thCategory: 'Category',
    thLocation: 'Location',
    thDuration: 'Duration',
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
    months: ['January','February','March','April','May','June',
             'July','August','September','October','November','December'],
    slackNotificationTitle: 'Slack Notification',
    slackNotificationBody: 'Reminder: There\'s an event tomorrow! Check the event calendar.',
    navAnalytics: 'Analytics',
    analyticsTitle: 'Analytics',
    analyticsSubtitle: 'Event statistics and distributions — click charts to drill down',
    analyticsCategoryDonut: 'Category Distribution',
    analyticsCategoryBar: 'Events by Category',
    analyticsMonthly: 'Monthly Distribution',
    analyticsMonthlyHint: 'Click a month to jump to calendar view',
    analyticsLocation: 'Events by Location',
    analyticsTimeline: 'Event Timeline',
    analyticsClickHint: 'Click a chart element to drill down',
    analyticsTotalEvents: 'Events',
    analyticsCategories: 'Categories',
    analyticsLocations: 'Locations',
    analyticsMonthsCovered: 'Months',
    analyticsEventsCount: 'events',
    analyticsDrilldownClose: 'Close',
    analyticsDrilldownCalendar: 'Show in Calendar',
    analyticsWeek: 'Week',
  }
};

let currentLang = localStorage.getItem('siteTourLang') || 'fi';
let activeFilters = new Set();
let calFilters = new Set();
let calMonth = 3; // April = index 3
let calYear = 2026;

// ==================== LANGUAGE ====================
function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || key;
}

function switchToLang(lang) {
  currentLang = lang;
  localStorage.setItem('siteTourLang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (i18n[lang][key]) el.placeholder = i18n[lang][key];
  });

  renderCategoryFilters();
  renderEvents();
  renderCalendar();
  renderSlack();
  renderExportPreview();
  if (document.getElementById('view-analytics').classList.contains('active')) {
    renderAnalytics();
  }
}

// ==================== VIEW SWITCHING ====================
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const view = tab.dataset.view;

    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');

    if (view === 'calendar') renderCalendar();
    if (view === 'slack') renderSlack();
    if (view === 'export') renderExportPreview();
    if (view === 'analytics') renderAnalytics();
  });
});

// ==================== FILTER LOGIC ====================
function getFilteredEvents() {
  const fromVal = document.getElementById('filterDateFrom').value;
  const toVal = document.getElementById('filterDateTo').value;
  const searchVal = (document.getElementById('filterSearch').value || '').toLowerCase();

  return EVENTS.filter(ev => {
    // Category filter
    if (activeFilters.size > 0 && !activeFilters.has(ev.category)) return false;

    // Date range
    if (fromVal && ev.date < fromVal) return false;
    if (toVal && ev.date > toVal) return false;

    // Text search
    if (searchVal) {
      const title = (ev.title[currentLang] || ev.title.fi).toLowerCase();
      const desc = (ev.description[currentLang] || ev.description.fi).toLowerCase();
      const loc = ev.location.toLowerCase();
      if (!title.includes(searchVal) && !desc.includes(searchVal) && !loc.includes(searchVal)) return false;
    }

    return true;
  });
}

// ==================== CATEGORY FILTERS ====================
function buildCategoryChipsHTML(filterSetName) {
  const filters = filterSetName === 'cal' ? calFilters : activeFilters;
  let html = `<button class="filter-chip ${filters.size === 0 ? 'active' : ''}" onclick="clearFilters('${filterSetName}')">
    ${t('filterAll')}
  </button>`;

  EVENT_CATEGORIES.forEach(cat => {
    const label = currentLang === 'en' ? cat.en : cat.fi;
    const isActive = filters.has(cat.id);
    html += `<button class="filter-chip ${isActive ? 'active' : ''}"
              onclick="toggleFilter('${cat.id}', '${filterSetName}')"
              style="${isActive ? `background:${cat.color};border-color:${cat.color};color:#fff` : ''}">
      <span class="chip-emoji">${cat.emoji}</span> ${label}
    </button>`;
  });
  return html;
}

function renderCategoryFilters() {
  document.getElementById('categoryFilters').innerHTML = buildCategoryChipsHTML('events');
  document.getElementById('calCategoryFilters').innerHTML = buildCategoryChipsHTML('cal');
}

function toggleFilter(catId, filterSet) {
  const filters = filterSet === 'cal' ? calFilters : activeFilters;
  if (filters.has(catId)) {
    filters.delete(catId);
  } else {
    filters.add(catId);
  }
  renderCategoryFilters();
  if (filterSet === 'cal') {
    renderCalendar();
  } else {
    renderEvents();
  }
}

function clearFilters(filterSet) {
  if (filterSet === 'cal') {
    calFilters.clear();
    renderCategoryFilters();
    renderCalendar();
  } else {
    activeFilters.clear();
    renderCategoryFilters();
    renderEvents();
  }
}

// ==================== EVENT LIST ====================
function renderEvents() {
  const events = getFilteredEvents();
  const container = document.getElementById('eventList');
  const stats = document.getElementById('eventStats');

  // Stats
  const catCount = new Set(events.map(e => e.category)).size;
  stats.innerHTML = `
    <span class="stat-badge">${events.length} ${t('statsShowing')}</span>
    <span class="stat-badge muted">${catCount} ${t('statsCategories')}</span>
  `;

  if (events.length === 0) {
    container.innerHTML = `<div class="no-events">${t('noEvents')}</div>`;
    return;
  }

  // Group by date
  let html = '';
  let currentDate = '';

  events.forEach(ev => {
    const cat = EVENT_CATEGORIES.find(c => c.id === ev.category);
    const title = ev.title[currentLang] || ev.title.fi;
    const desc = ev.description[currentLang] || ev.description.fi;
    const catLabel = currentLang === 'en' ? cat.en : cat.fi;

    // Date group header
    const dateLabel = formatDateGroup(ev.date);
    if (ev.date !== currentDate) {
      currentDate = ev.date;
      html += `<div class="event-date-group">${dateLabel}</div>`;
    }

    html += `
    <div class="event-card" onclick="showEventDetail(${ev.id})">
      <div class="event-card-stripe" style="background:${cat.color}"></div>
      <div class="event-card-body">
        <div class="event-card-top">
          <span class="event-card-title">${cat.emoji} ${title}</span>
          <span class="event-card-cat" style="background:${cat.color}15;color:${cat.color}">${catLabel}</span>
        </div>
        <div class="event-card-meta">
          <span>&#128197; ${formatDate(ev.date)}</span>
          <span>&#128336; ${ev.time} (${ev.duration} ${t('min')})</span>
          <span>&#128205; ${ev.location}</span>
        </div>
        <div class="event-card-desc">${desc}</div>
        <div class="event-card-actions">
          <button class="btn btn-ghost" onclick="event.stopPropagation(); downloadSingleICS(${ev.id})">
            &#128197; ${t('addToCalendar')}
          </button>
        </div>
      </div>
    </div>`;
  });

  container.innerHTML = html;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const days = currentLang === 'fi'
    ? ['su','ma','ti','ke','to','pe','la']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return `${days[d.getDay()]} ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
}

function formatDateGroup(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const days = currentLang === 'fi'
    ? ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai']
    : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return `${days[d.getDay()]} ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
}

// ==================== EVENT DETAIL MODAL ====================
function showEventDetail(eventId) {
  const ev = EVENTS.find(e => e.id === eventId);
  if (!ev) return;

  const cat = EVENT_CATEGORIES.find(c => c.id === ev.category);
  const title = ev.title[currentLang] || ev.title.fi;
  const desc = ev.description[currentLang] || ev.description.fi;
  const catLabel = currentLang === 'en' ? cat.en : cat.fi;

  const modal = document.getElementById('modalBody');
  modal.innerHTML = `
    <h2>${cat.emoji} ${title}</h2>
    <div class="modal-detail">
      <span class="modal-detail-icon">&#128197;</span>
      <span class="modal-detail-label">${t('date')}:</span>
      <span class="modal-detail-value">${formatDate(ev.date)}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-detail-icon">&#128336;</span>
      <span class="modal-detail-label">${t('time')}:</span>
      <span class="modal-detail-value">${ev.time} (${ev.duration} ${t('min')})</span>
    </div>
    <div class="modal-detail">
      <span class="modal-detail-icon">&#128205;</span>
      <span class="modal-detail-label">${t('location')}:</span>
      <span class="modal-detail-value">${ev.location}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-detail-icon">&#127991;</span>
      <span class="modal-detail-label">${t('category')}:</span>
      <span class="modal-detail-value">
        <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 10px;border-radius:100px;background:${cat.color}15;color:${cat.color};font-weight:600;font-size:0.82rem">${cat.emoji} ${catLabel}</span>
      </span>
    </div>
    ${ev.recurring ? `
    <div class="modal-detail">
      <span class="modal-detail-icon">&#128260;</span>
      <span class="modal-detail-label">${t('recurring')}:</span>
      <span class="modal-detail-value">${ev.recurring}</span>
    </div>` : ''}
    <div class="modal-desc">${desc}</div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="downloadSingleICS(${ev.id})">&#128197; ${t('addToCalendar')}</button>
      <button class="btn btn-secondary" onclick="closeModal()">${currentLang === 'fi' ? 'Sulje' : 'Close'}</button>
    </div>
  `;

  document.getElementById('eventModal').classList.add('open');
}

function closeModal() {
  document.getElementById('eventModal').classList.remove('open');
}

// Close modal on overlay click
document.getElementById('eventModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ==================== CALENDAR VIEW ====================
function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const label = document.getElementById('calMonthLabel');

  label.textContent = `${t('months')[calMonth]} ${calYear}`;

  const dayNames = [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')];

  let html = dayNames.map(d => `<div class="cal-header">${d}</div>`).join('');

  // First day of month
  const firstDay = new Date(calYear, calMonth, 1);
  let startDay = firstDay.getDay(); // 0=Sun
  startDay = startDay === 0 ? 6 : startDay - 1; // Convert to Mon=0

  // Days in month
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  // Previous month fill
  const prevMonthDays = new Date(calYear, calMonth, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month"><div class="cal-day-num">${prevMonthDays - i}</div></div>`;
  }

  // Current month
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const isToday = dateStr === todayStr;
    const dayEvents = EVENTS.filter(e => e.date === dateStr && (calFilters.size === 0 || calFilters.has(e.category)));

    html += `<div class="cal-day ${isToday ? 'today' : ''}">
      <div class="cal-day-num">${day}</div>`;

    const maxShow = 3;
    dayEvents.slice(0, maxShow).forEach(ev => {
      const cat = EVENT_CATEGORIES.find(c => c.id === ev.category);
      const title = ev.title[currentLang] || ev.title.fi;
      html += `<div class="cal-event" style="background:${cat.color}"
                onclick="showEventDetail(${ev.id})" title="${title}">
        ${cat.emoji} ${title}
      </div>`;
    });

    if (dayEvents.length > maxShow) {
      html += `<div class="cal-more">+${dayEvents.length - maxShow}</div>`;
    }

    html += `</div>`;
  }

  // Next month fill
  const totalCells = startDay + daysInMonth;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="cal-day other-month"><div class="cal-day-num">${i}</div></div>`;
  }

  grid.innerHTML = html;
}

document.getElementById('calPrev').addEventListener('click', () => {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
});

document.getElementById('calNext').addEventListener('click', () => {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
});

// ==================== SLACK VIEW ====================
function renderSlack() {
  // Channels
  const channels = ['#joensuu-tapahtumat', '#joensuu-ai-club', '#joensuu-sports', '#joensuu-lautapelit'];
  const channelContainer = document.getElementById('slackChannels');
  channelContainer.innerHTML = channels.map((ch, i) =>
    `<div class="slack-channel ${i === 0 ? 'active' : ''}" onclick="selectChannel(this, '${ch}')">${ch}</div>`
  ).join('');

  renderSlackMessages('#joensuu-tapahtumat');
}

function selectChannel(el, channel) {
  document.querySelectorAll('.slack-channel').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('slackHeader').innerHTML = `<span class="slack-channel-name">${channel}</span>`;
  renderSlackMessages(channel);
}

function renderSlackMessages(channel) {
  const msgs = SLACK_MESSAGES.filter(m => m.channel === channel);
  const container = document.getElementById('slackMessages');

  if (msgs.length === 0) {
    container.innerHTML = `<div class="no-events" style="padding:40px">${currentLang === 'fi' ? 'Ei viestejä tällä kanavalla' : 'No messages in this channel'}</div>`;
    return;
  }

  container.innerHTML = msgs.map(m => {
    const text = m[currentLang] || m.fi;
    const isBot = m.user.includes('Bot');
    return `
    <div class="slack-msg">
      <div class="slack-msg-avatar">${m.avatar}</div>
      <div class="slack-msg-body">
        <div class="slack-msg-header">
          <span class="slack-msg-user">${m.user}</span>
          <span class="slack-msg-time">${m.time}</span>
        </div>
        <div class="slack-msg-text ${isBot ? 'bot-msg' : ''}">${text}</div>
      </div>
    </div>`;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

function sendSlackMessage() {
  const input = document.getElementById('slackInput');
  const text = input.value.trim();
  if (!text) return;

  const container = document.getElementById('slackMessages');
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  container.innerHTML += `
  <div class="slack-msg">
    <div class="slack-msg-avatar">&#128100;</div>
    <div class="slack-msg-body">
      <div class="slack-msg-header">
        <span class="slack-msg-user">${currentLang === 'fi' ? 'Sinä' : 'You'}</span>
        <span class="slack-msg-time">${timeStr}</span>
      </div>
      <div class="slack-msg-text">${escapeHtml(text)}</div>
    </div>
  </div>`;

  input.value = '';
  container.scrollTop = container.scrollHeight;
  showToast(t('toastSlack'));

  // Simulate bot reply
  setTimeout(() => {
    container.innerHTML += `
    <div class="slack-msg">
      <div class="slack-msg-avatar">&#129302;</div>
      <div class="slack-msg-body">
        <div class="slack-msg-header">
          <span class="slack-msg-user">EventBot</span>
          <span class="slack-msg-time">${timeStr}</span>
        </div>
        <div class="slack-msg-text bot-msg">${currentLang === 'fi'
          ? 'Kiitos viestistäsi! Tapahtumatiimi on noteerannut sen. &#128077;'
          : 'Thanks for your message! The events team has noted it. &#128077;'}</div>
      </div>
    </div>`;
    container.scrollTop = container.scrollHeight;
  }, 1200);
}

function showSlackDemo() {
  // Remove existing notification if any
  const existing = document.querySelector('.slack-notification');
  if (existing) existing.remove();

  // Pick a random upcoming event
  const upcoming = EVENTS.filter(e => e.date >= '2026-04-16');
  const ev = upcoming[Math.floor(Math.random() * Math.min(5, upcoming.length))];
  const cat = EVENT_CATEGORIES.find(c => c.id === ev.category);
  const title = ev.title[currentLang] || ev.title.fi;

  const notif = document.createElement('div');
  notif.className = 'slack-notification';
  notif.innerHTML = `
    <button class="slack-notification-close" onclick="this.parentElement.remove()">&times;</button>
    <div class="slack-notification-header">
      &#128276; ${t('slackNotificationTitle')}
    </div>
    <div class="slack-notification-body">
      <strong>#joensuu-tapahtumat</strong><br>
      <strong>EventBot:</strong> ${currentLang === 'fi' ? 'Muistutus' : 'Reminder'}: ${cat.emoji} <strong>${title}</strong> — ${formatDate(ev.date)} ${t('time').toLowerCase()} ${ev.time}<br>
      &#128205; ${ev.location}
    </div>
  `;
  document.body.appendChild(notif);

  setTimeout(() => {
    if (notif.parentElement) notif.remove();
  }, 6000);
}

// ==================== EXPORT ====================
function renderExportPreview() {
  const events = getFilteredEvents().slice(0, 15);
  const thead = document.getElementById('exportTableHead');
  const tbody = document.getElementById('exportTableBody');

  thead.innerHTML = `<tr>
    <th>${t('thDate')}</th>
    <th>${t('thTime')}</th>
    <th>${t('thEvent')}</th>
    <th>${t('thCategory')}</th>
    <th>${t('thLocation')}</th>
    <th>${t('thDuration')}</th>
  </tr>`;

  tbody.innerHTML = events.map(ev => {
    const cat = EVENT_CATEGORIES.find(c => c.id === ev.category);
    const title = ev.title[currentLang] || ev.title.fi;
    const catLabel = currentLang === 'en' ? cat.en : cat.fi;
    return `<tr>
      <td>${formatDate(ev.date)}</td>
      <td>${ev.time}</td>
      <td>${title}</td>
      <td>${cat.emoji} ${catLabel}</td>
      <td>${ev.location}</td>
      <td>${ev.duration} ${t('min')}</td>
    </tr>`;
  }).join('');
}

function exportExcel() {
  const useFiltered = document.getElementById('exportFiltered').checked;
  const events = useFiltered ? getFilteredEvents() : EVENTS;

  const headers = [t('thDate'), t('thTime'), t('thEvent'), t('thCategory'), t('thLocation'), t('thDuration'), t('description')];
  const rows = events.map(ev => {
    const cat = EVENT_CATEGORIES.find(c => c.id === ev.category);
    const title = ev.title[currentLang] || ev.title.fi;
    const desc = ev.description[currentLang] || ev.description.fi;
    const catLabel = currentLang === 'en' ? cat.en : cat.fi;
    return [ev.date, ev.time, title, catLabel, ev.location, `${ev.duration} min`, desc];
  });

  // BOM for Excel UTF-8 compatibility
  let csv = '\ufeff' + headers.map(h => `"${h}"`).join(';') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';') + '\n';
  });

  downloadFile(csv, 'joensuu_tapahtumat.csv', 'text/csv;charset=utf-8');
  showToast(t('toastExcel'));
}

function exportICS() {
  const useFiltered = document.getElementById('exportIcsFiltered').checked;
  const events = useFiltered ? getFilteredEvents() : EVENTS;

  let ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Siili//Joensuu Site Events//FI\r\nCALSCALE:GREGORIAN\r\nX-WR-CALNAME:Joensuu Site Events\r\n`;

  events.forEach(ev => {
    const title = ev.title[currentLang] || ev.title.fi;
    const desc = ev.description[currentLang] || ev.description.fi;
    const dtStart = ev.date.replace(/-/g, '') + 'T' + ev.time.replace(':', '') + '00';

    const endDate = new Date(ev.date + 'T' + ev.time + ':00');
    endDate.setMinutes(endDate.getMinutes() + ev.duration);
    const dtEnd = endDate.getFullYear() +
      String(endDate.getMonth()+1).padStart(2,'0') +
      String(endDate.getDate()).padStart(2,'0') + 'T' +
      String(endDate.getHours()).padStart(2,'0') +
      String(endDate.getMinutes()).padStart(2,'0') + '00';

    ics += `BEGIN:VEVENT\r\nDTSTART:${dtStart}\r\nDTEND:${dtEnd}\r\nSUMMARY:${escapeICS(title)}\r\nDESCRIPTION:${escapeICS(desc)}\r\nLOCATION:${escapeICS(ev.location)}\r\nUID:joensuu-event-${ev.id}@siili.com\r\nEND:VEVENT\r\n`;
  });

  ics += 'END:VCALENDAR\r\n';

  downloadFile(ics, 'joensuu_tapahtumat.ics', 'text/calendar;charset=utf-8');
  showToast(t('toastCalendar'));
}

function downloadSingleICS(eventId) {
  const ev = EVENTS.find(e => e.id === eventId);
  if (!ev) return;

  const title = ev.title[currentLang] || ev.title.fi;
  const desc = ev.description[currentLang] || ev.description.fi;
  const dtStart = ev.date.replace(/-/g, '') + 'T' + ev.time.replace(':', '') + '00';

  const endDate = new Date(ev.date + 'T' + ev.time + ':00');
  endDate.setMinutes(endDate.getMinutes() + ev.duration);
  const dtEnd = endDate.getFullYear() +
    String(endDate.getMonth()+1).padStart(2,'0') +
    String(endDate.getDate()).padStart(2,'0') + 'T' +
    String(endDate.getHours()).padStart(2,'0') +
    String(endDate.getMinutes()).padStart(2,'0') + '00';

  let ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Siili//Joensuu Site Events//FI\r\nBEGIN:VEVENT\r\nDTSTART:${dtStart}\r\nDTEND:${dtEnd}\r\nSUMMARY:${escapeICS(title)}\r\nDESCRIPTION:${escapeICS(desc)}\r\nLOCATION:${escapeICS(ev.location)}\r\nUID:joensuu-event-${ev.id}@siili.com\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;

  downloadFile(ics, `${title.replace(/[^a-zA-Z0-9äöåÄÖÅ ]/g, '').replace(/ /g, '_')}.ics`, 'text/calendar;charset=utf-8');
  showToast(t('toastCalendar'));
}

// ==================== UTILITIES ====================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeICS(str) {
  return str.replace(/[\\;,]/g, c => '\\' + c).replace(/\n/g, '\\n');
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==================== ANALYTICS ====================
const analyticsCharts = {};
let drilldownContext = null; // { type: 'category'|'location'|'month'|'week', key: ... }

function destroyChart(id) {
  if (analyticsCharts[id]) {
    analyticsCharts[id].destroy();
    delete analyticsCharts[id];
  }
}

function getAnalyticsData() {
  const data = {
    byCategory: {},
    byLocation: {},
    byMonth: {},
    byWeek: {},
  };

  EVENTS.forEach(ev => {
    data.byCategory[ev.category] = (data.byCategory[ev.category] || 0) + 1;
    data.byLocation[ev.location] = (data.byLocation[ev.location] || 0) + 1;
    const monthKey = ev.date.substring(0, 7);
    data.byMonth[monthKey] = (data.byMonth[monthKey] || 0) + 1;
    const d = new Date(ev.date + 'T00:00:00');
    const weekKey = getISOWeekKey(d);
    data.byWeek[weekKey] = (data.byWeek[weekKey] || 0) + 1;
  });

  return data;
}

function getISOWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function renderAnalytics() {
  if (typeof Chart === 'undefined') return;
  const data = getAnalyticsData();

  // Summary stats
  const statsEl = document.getElementById('analyticsStats');
  const locCount = Object.keys(data.byLocation).length;
  const monthCount = Object.keys(data.byMonth).length;
  const catCount = Object.keys(data.byCategory).length;

  statsEl.innerHTML = `
    <div class="analytics-summary-card">
      <div class="summary-value">${EVENTS.length}</div>
      <div class="summary-label">${t('analyticsTotalEvents')}</div>
    </div>
    <div class="analytics-summary-card">
      <div class="summary-value">${catCount}</div>
      <div class="summary-label">${t('analyticsCategories')}</div>
    </div>
    <div class="analytics-summary-card">
      <div class="summary-value">${locCount}</div>
      <div class="summary-label">${t('analyticsLocations')}</div>
    </div>
    <div class="analytics-summary-card">
      <div class="summary-value">${monthCount}</div>
      <div class="summary-label">${t('analyticsMonthsCovered')}</div>
    </div>
  `;

  renderCategoryDonutChart(data);
  renderCategoryBarChart(data);
  renderMonthlyChart(data);
  renderLocationChart(data);
  renderTimelineChart(data);
  closeAnalyticsDrilldown();
}

function chartFont() {
  return { family: "'Inter', sans-serif" };
}

function chartCursorPointer(event, elements) {
  event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
}

// Get categories sorted by event count (descending)
function getSortedCategories(data) {
  return EVENT_CATEGORIES
    .filter(cat => data.byCategory[cat.id])
    .sort((a, b) => (data.byCategory[b.id] || 0) - (data.byCategory[a.id] || 0));
}

// --- Category Donut ---
function renderCategoryDonutChart(data) {
  destroyChart('chartCategoryDonut');
  const cats = getSortedCategories(data);
  const labels = cats.map(c => currentLang === 'en' ? c.en : c.fi);
  const values = cats.map(c => data.byCategory[c.id]);
  const colors = cats.map(c => c.color);

  analyticsCharts['chartCategoryDonut'] = new Chart(
    document.getElementById('chartCategoryDonut'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: window.innerWidth < 768 ? 'bottom' : 'right',
            labels: { font: chartFont(), padding: 10, usePointStyle: true, pointStyleWidth: 10 }
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.parsed} ${t('analyticsEventsCount')}`
            }
          }
        },
        onHover: chartCursorPointer,
        onClick: (event, elements) => {
          if (!elements.length) return;
          const catId = cats[elements[0].index].id;
          drilldownByCategory(catId);
        }
      }
    }
  );
}

// --- Category Bar (horizontal) ---
function renderCategoryBarChart(data) {
  destroyChart('chartCategoryBar');
  const cats = getSortedCategories(data);
  const labels = cats.map(c => `${c.emoji} ${currentLang === 'en' ? c.en : c.fi}`);
  const values = cats.map(c => data.byCategory[c.id]);
  const colors = cats.map(c => c.color);

  analyticsCharts['chartCategoryBar'] = new Chart(
    document.getElementById('chartCategoryBar'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors.map(c => c + '30'),
          borderColor: colors,
          borderWidth: 2,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.x} ${t('analyticsEventsCount')}`
            }
          }
        },
        scales: {
          x: { ticks: { font: chartFont(), stepSize: 1 }, grid: { display: false } },
          y: { ticks: { font: { ...chartFont(), size: 11 } }, grid: { display: false } }
        },
        onHover: chartCursorPointer,
        onClick: (event, elements) => {
          if (!elements.length) return;
          const catId = cats[elements[0].index].id;
          drilldownByCategory(catId);
        }
      }
    }
  );
}

// --- Monthly Distribution ---
function renderMonthlyChart(data) {
  destroyChart('chartMonthly');
  const monthKeys = Object.keys(data.byMonth).sort();
  const labels = monthKeys.map(k => {
    const [y, m] = k.split('-');
    return t('months')[parseInt(m) - 1] + ' ' + y;
  });
  const values = monthKeys.map(k => data.byMonth[k]);

  analyticsCharts['chartMonthly'] = new Chart(
    document.getElementById('chartMonthly'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: '#0891b230',
          borderColor: '#0891b2',
          borderWidth: 2,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.y} ${t('analyticsEventsCount')}`
            }
          }
        },
        scales: {
          x: { ticks: { font: chartFont() }, grid: { display: false } },
          y: { ticks: { font: chartFont(), stepSize: 1 }, beginAtZero: true }
        },
        onHover: chartCursorPointer,
        onClick: (event, elements) => {
          if (!elements.length) return;
          const monthKey = monthKeys[elements[0].index];
          const [y, m] = monthKey.split('-');
          drilldownToCalendar(parseInt(m) - 1, parseInt(y));
        }
      }
    }
  );
}

// --- Location Chart ---
function renderLocationChart(data) {
  destroyChart('chartLocation');
  const sorted = Object.entries(data.byLocation).sort((a, b) => b[1] - a[1]);
  const labels = sorted.map(s => s[0]);
  const values = sorted.map(s => s[1]);

  // Color gradient from primary to lighter
  const colors = sorted.map((_, i) => {
    const ratio = i / Math.max(sorted.length - 1, 1);
    return `hsl(${189 - ratio * 20}, ${85 - ratio * 20}%, ${35 + ratio * 25}%)`;
  });

  analyticsCharts['chartLocation'] = new Chart(
    document.getElementById('chartLocation'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors.map(c => c.replace(')', ', 0.3)').replace('hsl', 'hsla')),
          borderColor: colors,
          borderWidth: 2,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.x} ${t('analyticsEventsCount')}`
            }
          }
        },
        scales: {
          x: { ticks: { font: chartFont(), stepSize: 1 }, grid: { display: false } },
          y: { ticks: { font: { ...chartFont(), size: 11 } }, grid: { display: false } }
        },
        onHover: chartCursorPointer,
        onClick: (event, elements) => {
          if (!elements.length) return;
          const location = labels[elements[0].index];
          drilldownByLocation(location);
        }
      }
    }
  );
}

// --- Timeline Chart ---
function renderTimelineChart(data) {
  destroyChart('chartTimeline');
  const weekKeys = Object.keys(data.byWeek).sort();
  const labels = weekKeys.map(k => {
    const parts = k.split('-W');
    return `${t('analyticsWeek')} ${parseInt(parts[1])}`;
  });
  const values = weekKeys.map(k => data.byWeek[k]);

  analyticsCharts['chartTimeline'] = new Chart(
    document.getElementById('chartTimeline'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: values,
          borderColor: '#0891b2',
          backgroundColor: '#0891b21a',
          fill: true,
          tension: 0.35,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#0891b2',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.y} ${t('analyticsEventsCount')}`
            }
          }
        },
        scales: {
          x: { ticks: { font: { ...chartFont(), size: 10 }, maxRotation: 45 }, grid: { display: false } },
          y: { ticks: { font: chartFont(), stepSize: 1 }, beginAtZero: true }
        },
        onHover: chartCursorPointer,
        onClick: (event, elements) => {
          if (!elements.length) return;
          const weekKey = weekKeys[elements[0].index];
          drilldownByWeek(weekKey);
        }
      }
    }
  );
}

// ==================== DRILLDOWN ====================
function showAnalyticsDrilldown(title, events, context) {
  drilldownContext = context;
  const container = document.getElementById('analyticsDrilldown');
  const titleEl = document.getElementById('drilldownTitle');
  const listEl = document.getElementById('drilldownEvents');
  const calBtn = document.getElementById('drilldownCalBtn');

  titleEl.textContent = title;
  calBtn.style.display = (context.type === 'category' || context.type === 'month') ? '' : 'none';

  listEl.innerHTML = events.map(ev => {
    const cat = EVENT_CATEGORIES.find(c => c.id === ev.category);
    const evTitle = ev.title[currentLang] || ev.title.fi;
    return `<div class="event-card" onclick="showEventDetail(${ev.id})" style="cursor:pointer">
      <div class="event-card-stripe" style="background:${cat.color}"></div>
      <div class="event-card-body">
        <div class="event-card-top">
          <span class="event-card-title">${cat.emoji} ${evTitle}</span>
          <span class="event-card-cat" style="background:${cat.color}15;color:${cat.color}">${currentLang === 'en' ? cat.en : cat.fi}</span>
        </div>
        <div class="event-card-meta">
          <span>&#128197; ${formatDate(ev.date)}</span>
          <span>&#128336; ${ev.time} (${ev.duration} ${t('min')})</span>
          <span>&#128205; ${ev.location}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  container.classList.add('open');
  setTimeout(() => container.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function closeAnalyticsDrilldown() {
  document.getElementById('analyticsDrilldown').classList.remove('open');
  drilldownContext = null;
}

function drilldownByCategory(categoryId) {
  const cat = EVENT_CATEGORIES.find(c => c.id === categoryId);
  const catLabel = currentLang === 'en' ? cat.en : cat.fi;
  const events = EVENTS.filter(e => e.category === categoryId);
  showAnalyticsDrilldown(
    `${cat.emoji} ${catLabel} — ${events.length} ${t('analyticsEventsCount')}`,
    events,
    { type: 'category', key: categoryId }
  );
}

function drilldownByLocation(location) {
  const events = EVENTS.filter(ev => ev.location === location);
  showAnalyticsDrilldown(
    `📍 ${location} — ${events.length} ${t('analyticsEventsCount')}`,
    events,
    { type: 'location', key: location }
  );
}

function drilldownByWeek(weekKey) {
  const events = EVENTS.filter(ev => {
    const d = new Date(ev.date + 'T00:00:00');
    return getISOWeekKey(d) === weekKey;
  });
  const parts = weekKey.split('-W');
  const label = `${t('analyticsWeek')} ${parseInt(parts[1])} — ${events.length} ${t('analyticsEventsCount')}`;
  showAnalyticsDrilldown(label, events, { type: 'week', key: weekKey });
}

function drilldownToCalendar(month, year) {
  calMonth = month;
  calYear = year;
  calFilters.clear();

  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.nav-tab[data-view="calendar"]').classList.add('active');
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-calendar').classList.add('active');

  renderCategoryFilters();
  renderCalendar();
}

function drilldownGoCalendar() {
  if (!drilldownContext) return;

  if (drilldownContext.type === 'category') {
    calFilters.clear();
    calFilters.add(drilldownContext.key);

    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.nav-tab[data-view="calendar"]').classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-calendar').classList.add('active');

    renderCategoryFilters();
    renderCalendar();
  } else if (drilldownContext.type === 'month') {
    const [y, m] = drilldownContext.key.split('-');
    drilldownToCalendar(parseInt(m) - 1, parseInt(y));
  }
}

// ==================== INIT ====================
// Filter event listeners
document.getElementById('filterDateFrom').addEventListener('change', () => { renderEvents(); renderExportPreview(); });
document.getElementById('filterDateTo').addEventListener('change', () => { renderEvents(); renderExportPreview(); });
document.getElementById('filterSearch').addEventListener('input', () => { renderEvents(); renderExportPreview(); });

// Initialize
function init() {
  switchToLang(currentLang);
  renderCategoryFilters();
  renderEvents();
  renderCalendar();
}

init();
