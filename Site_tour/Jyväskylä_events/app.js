/* ── Siili Jyväskylä – Tapahtumat & Kalenteri ── app.js ── */

/* ═══════ State ═══════ */
let lang = localStorage.getItem('siteTourLang') || 'fi';
let currentView = 'calendar';
let calMonth = 3;   // 0-indexed → April
let calYear = 2026;
let activeCategories = new Set();   // empty = all shown
let typeFilter = 'all';             // 'all' | 'site' | 'city'
let trafficFilter = 'all';         // 'all' | 'low' | 'medium' | 'high'
let searchQuery = '';
let allEvents = [];
let map = null;
let mapMarkers = [];
let charts = {};
let dayPopupEl = null;

/* ═══════ Helpers ═══════ */
const t = key => (i18n[lang] && i18n[lang][key]) || key;
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const escHtml = s => s ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '';
const truncate = (s, n) => s.length > n ? s.slice(0, n) + '…' : s;

function eventOnDate(ev, dateStr) {
  if (ev.endDate) return dateStr >= ev.date && dateStr <= ev.endDate;
  return dateStr === ev.date;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y,m,d] = dateStr.split('-');
  return `${parseInt(d)}.${parseInt(m)}.${y}`;
}

function formatDuration(min) {
  if (min >= 60) {
    const h = Math.floor(min/60);
    const m = min % 60;
    return m ? `${h} ${t('h')} ${m} ${t('min')}` : `${h} ${t('h')}`;
  }
  return `${min} ${t('min')}`;
}

function formatDateGroup(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const days = lang === 'fi'
    ? ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai']
    : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return `${days[d.getDay()]} ${formatDate(dateStr)}`;
}

/* ═══════ Filtering ═══════ */
function getFilteredEvents() {
  return allEvents.filter(ev => {
    if (typeFilter !== 'all' && ev.type !== typeFilter) return false;
    if (trafficFilter !== 'all' && ev.trafficImpact !== trafficFilter) return false;
    if (activeCategories.size > 0 && !activeCategories.has(ev.category)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = [ev.title.fi, ev.title.en, ev.description.fi, ev.description.en,
        CATEGORIES[ev.category]?.fi, CATEGORIES[ev.category]?.en,
        VENUES[ev.venue]?.name, VENUES[ev.venue]?.address].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/* ═══════ Init ═══════ */
function init() {
  allEvents = generateEvents();
  renderFilters();
  renderCalendar();
  applyLang();
  document.querySelectorAll('#main-nav .nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeDayPopup(); }
  });
}

/* ═══════ Language ═══════ */
function switchToLang(l) {
  lang = l;
  localStorage.setItem('siteTourLang', l);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  applyLang();
  renderFilters();
  update();
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) {
      if (el.placeholder !== undefined && el.tagName === 'INPUT') el.placeholder = i18n[lang][key];
      else el.textContent = i18n[lang][key];
    }
  });
}

/* ═══════ View Switching ═══════ */
function switchView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(view + '-view').classList.add('active');
  document.querySelectorAll('#main-nav .nav-tab').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  if (view === 'map') initMap();
  if (view === 'analytics') renderAnalytics();
  if (view === 'events') renderEventsList();
  if (view === 'calendar') renderCalendar();
}

/* ═══════ Update (after filter change) ═══════ */
function update() {
  if (currentView === 'calendar') renderCalendar();
  else if (currentView === 'map') updateMapMarkers();
  else if (currentView === 'events') renderEventsList();
  else if (currentView === 'analytics') renderAnalytics();
}

/* ═══════ Filters UI ═══════ */
function renderFilters() {
  const bar = document.getElementById('filter-bar');
  let html = '';

  // Type filter
  html += '<div class="filter-group">';
  ['all','site','city'].forEach(tp => {
    const label = tp === 'all' ? t('filterAll') : tp === 'site' ? t('filterSite') : t('filterCity');
    html += `<button class="filter-chip${typeFilter===tp?' active':''}" onclick="setTypeFilter('${tp}')">${label}</button>`;
  });
  html += '</div>';

  html += '<div class="filter-sep"></div>';

  // Traffic filter
  html += `<div class="filter-group"><span class="filter-group-label">${t('trafficLabel')}</span>`;
  html += `<button class="filter-chip traffic-chip${trafficFilter==='all'?' active':''}" data-traffic="all" onclick="setTrafficFilter('all')">${t('trafficAll')}</button>`;
  ['low','medium','high'].forEach(lv => {
    const info = TRAFFIC_LEVELS[lv];
    html += `<button class="filter-chip traffic-chip${trafficFilter===lv?' active':''}" data-traffic="${lv}" onclick="setTrafficFilter('${lv}')">${info.emoji} ${info[lang]}</button>`;
  });
  html += '</div>';

  html += '<div class="filter-sep"></div>';

  // Search
  html += `<input class="search-input" type="text" data-i18n="searchPlaceholder" placeholder="${t('searchPlaceholder')}" value="${escHtml(searchQuery)}" oninput="setSearch(this.value)">`;

  html += '<div class="filter-sep"></div>';

  // Category chips
  html += '<div class="filter-group" id="cat-chips">';
  const relevantCats = Object.entries(CATEGORIES).filter(([,c]) => typeFilter === 'all' || c.type === typeFilter);
  relevantCats.forEach(([id, cat]) => {
    const active = activeCategories.has(id);
    html += `<button class="filter-chip${active?' active':''}" onclick="toggleCategory('${id}')"><span class="chip-dot" style="background:${cat.color}"></span>${cat.emoji} ${cat[lang]}</button>`;
  });
  html += '</div>';

  // Reset button (visible only when filters are active)
  if (typeFilter !== 'all' || trafficFilter !== 'all' || searchQuery || activeCategories.size > 0) {
    html += '<div class="filter-sep"></div>';
    html += `<button class="filter-reset" onclick="resetFilters()" title="${t('resetFilters')}">&#10005; ${t('resetFilters')}</button>`;
  }

  bar.innerHTML = html;
}

function setTypeFilter(tp) {
  typeFilter = tp;
  activeCategories.clear();
  renderFilters();
  update();
}
function setTrafficFilter(lv) {
  trafficFilter = lv;
  renderFilters();
  update();
}
function setSearch(q) {
  searchQuery = q;
  update();
}
function toggleCategory(cat) {
  if (activeCategories.has(cat)) activeCategories.delete(cat);
  else activeCategories.add(cat);
  renderFilters();
  update();
}
function resetFilters() {
  typeFilter = 'all';
  trafficFilter = 'all';
  searchQuery = '';
  activeCategories.clear();
  renderFilters();
  update();
}

/* ═══════ Calendar ═══════ */
function changeMonth(delta) {
  calMonth += delta;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function renderCalendar() {
  const months = t('monthNames');
  document.getElementById('cal-title').textContent = `${months[calMonth]} ${calYear}`;

  // Day headers
  const days = t('dayNames');
  document.getElementById('cal-header-row').innerHTML = days.map(d => `<div class="cal-day-name">${d}</div>`).join('');

  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay = new Date(calYear, calMonth + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Monday=0
  const daysInMonth = lastDay.getDate();

  const events = getFilteredEvents();
  const today = todayStr();
  let html = '';

  // Previous month fill
  const prevLast = new Date(calYear, calMonth, 0);
  for (let i = 0; i < startDow; i++) {
    const d = prevLast.getDate() - startDow + i + 1;
    html += `<div class="cal-cell other-month"><span class="cal-date">${d}</span></div>`;
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = dateStr === today;
    const dayEvts = events.filter(e => eventOnDate(e, dateStr));
    const hasHigh = dayEvts.some(e => e.trafficImpact === 'high');
    const maxShow = 3;

    html += `<div class="cal-cell${isToday ? ' today' : ''}">`;
    html += `<span class="cal-date">${d}${isToday ? `<span class="cal-today-badge">${t('today')}</span>` : ''}</span>`;
    if (hasHigh) html += `<span class="cal-traffic-alert" title="${t('trafficWarning')}">🔴</span>`;

    dayEvts.slice(0, maxShow).forEach(e => {
      const cat = CATEGORIES[e.category];
      html += `<div class="cal-event ${e.type}-event" style="background:${cat.color}" onclick="event.stopPropagation();showEventDetail(${e.id})" title="${escHtml(e.title[lang])}">${cat.emoji} ${truncate(e.title[lang], 20)}</div>`;
    });

    if (dayEvts.length > maxShow) {
      html += `<div class="cal-more" onclick="event.stopPropagation();showDayPopup('${dateStr}',this)">+${dayEvts.length - maxShow} ${t('more')}</div>`;
    }
    html += '</div>';
  }

  // Next month fill
  const totalCells = startDow + daysInMonth;
  const remaining = (7 - totalCells % 7) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="cal-cell other-month"><span class="cal-date">${i}</span></div>`;
  }

  document.getElementById('cal-grid').innerHTML = html;
}

/* ── Day popup ("+N more") ── */
function showDayPopup(dateStr, anchorEl) {
  closeDayPopup();
  const events = getFilteredEvents().filter(e => eventOnDate(e, dateStr));
  if (!events.length) return;

  const popup = document.createElement('div');
  popup.className = 'day-popup';
  popup.innerHTML = `<div class="day-popup-title">${formatDateGroup(dateStr)}</div>` +
    events.map(e => {
      const cat = CATEGORIES[e.category];
      return `<div class="cal-event ${e.type}-event" style="background:${cat.color}" onclick="showEventDetail(${e.id})">${cat.emoji} ${e.title[lang]}</div>`;
    }).join('');

  document.body.appendChild(popup);
  dayPopupEl = popup;

  // Position near anchor
  const rect = anchorEl.getBoundingClientRect();
  popup.style.top = Math.min(rect.bottom + 4, window.innerHeight - popup.offsetHeight - 10) + 'px';
  popup.style.left = Math.min(rect.left, window.innerWidth - popup.offsetWidth - 10) + 'px';

  setTimeout(() => document.addEventListener('click', closeDayPopupOutside), 10);
}
function closeDayPopup() {
  if (dayPopupEl) { dayPopupEl.remove(); dayPopupEl = null; }
  document.removeEventListener('click', closeDayPopupOutside);
}
function closeDayPopupOutside(e) {
  if (dayPopupEl && !dayPopupEl.contains(e.target)) closeDayPopup();
}

/* ═══════ Map ═══════ */
function initMap() {
  if (map) { map.invalidateSize(); updateMapMarkers(); return; }
  map = L.map('map-container').setView([OFFICE.lat, OFFICE.lng], 14);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map);

  // Office marker (special)
  const officeIcon = L.divIcon({
    className: '',
    html: `<div style="background:#0891b2;color:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);">🏢</div>`,
    iconSize: [36, 36], iconAnchor: [18, 18], popupAnchor: [0, -20]
  });
  L.marker([OFFICE.lat, OFFICE.lng], { icon: officeIcon, zIndexOffset: 1000 })
    .addTo(map)
    .bindPopup(`<strong>${t('officeMarker')}</strong><br>${OFFICE.address}`)
    .openPopup();

  updateMapMarkers();
  renderMapLegend();
}

function updateMapMarkers() {
  if (!map) return;
  mapMarkers.forEach(m => map.removeLayer(m));
  mapMarkers = [];

  const events = getFilteredEvents();
  // Group events by venue
  const byVenue = {};
  events.forEach(e => {
    if (!byVenue[e.venue]) byVenue[e.venue] = [];
    byVenue[e.venue].push(e);
  });

  Object.entries(byVenue).forEach(([venueId, venueEvents]) => {
    if (venueId === 'siili') return; // office has its own marker
    const venue = VENUES[venueId];
    if (!venue) return;

    // Determine worst traffic level for this venue
    const levels = ['none','low','medium','high'];
    let worstIdx = 0;
    venueEvents.forEach(e => {
      const idx = levels.indexOf(e.trafficImpact);
      if (idx > worstIdx) worstIdx = idx;
    });
    const worstLevel = levels[worstIdx];
    const color = TRAFFIC_LEVELS[worstLevel].color;
    const count = venueEvents.length;

    const icon = L.divIcon({
      className: '',
      html: `<div style="background:${color};color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25);">${count}</div>`,
      iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -16]
    });

    const popupHtml = `<strong>${escHtml(venue.name)}</strong><br><span style="font-size:0.8em;color:#666">${escHtml(venue.address)}</span><hr style="margin:4px 0;border-color:#eee">` +
      venueEvents.slice(0, 8).map(e => {
        const cat = CATEGORIES[e.category];
        return `<div style="font-size:0.8em;margin:2px 0;cursor:pointer" onclick="showEventDetail(${e.id})">${cat.emoji} <strong>${escHtml(e.title[lang])}</strong> – ${formatDate(e.date)}${e.endDate && e.endDate !== e.date ? ' → ' + formatDate(e.endDate) : ''}</div>`;
      }).join('') +
      (venueEvents.length > 8 ? `<div style="font-size:0.75em;color:#888;margin-top:4px">+${venueEvents.length - 8} ${t('more')}…</div>` : '');

    const marker = L.marker([venue.lat, venue.lng], { icon }).addTo(map).bindPopup(popupHtml, { maxWidth: 300 });
    mapMarkers.push(marker);
  });
}

function renderMapLegend() {
  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<span class="legend-title">${t('mapLegend')}</span>` +
    `<div class="legend-item"><span class="legend-dot" style="background:#0891b2"></span> ${t('officeMarker')}</div>` +
    Object.entries(TRAFFIC_LEVELS).map(([,lv]) =>
      `<div class="legend-item"><span class="legend-dot" style="background:${lv.color}"></span> ${lv[lang]}</div>`
    ).join('');
}

/* ═══════ Events List ═══════ */
function renderEventsList() {
  const events = getFilteredEvents();
  const countEl = document.getElementById('events-count');
  countEl.textContent = `${events.length} ${t('totalEvents').toLowerCase()}`;

  if (!events.length) {
    document.getElementById('events-list').innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:3rem">${t('noEvents')}</p>`;
    return;
  }

  // Group by date
  const groups = {};
  events.forEach(e => {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push(e);
  });

  let html = '';
  Object.keys(groups).sort().forEach(date => {
    html += `<div class="date-group-header">${formatDateGroup(date)}</div>`;
    groups[date].forEach(e => {
      const cat = CATEGORIES[e.category];
      const trafficClass = e.trafficImpact === 'high' ? 'high-traffic' : e.trafficImpact === 'medium' ? 'medium-traffic' : '';
      const venue = VENUES[e.venue];
      html += `<div class="event-card ${trafficClass}" onclick="showEventDetail(${e.id})">
        <div class="event-card-cat" style="background:${cat.color}20">${cat.emoji}</div>
        <div class="event-card-body">
          <div class="event-card-title">${escHtml(e.title[lang])}</div>
          <div class="event-card-meta">
            <span>🕐 ${e.time}${e.duration ? ' · ' + formatDuration(e.duration) : ''}</span>
            <span>📍 ${escHtml(venue ? venue.name : '')}</span>
            ${e.endDate && e.endDate !== e.date ? `<span>📅 ${formatDate(e.date)} → ${formatDate(e.endDate)}</span>` : ''}
            ${e.trafficImpact && e.trafficImpact !== 'none' ? `<span class="traffic-badge traffic-${e.trafficImpact}">${TRAFFIC_LEVELS[e.trafficImpact].emoji} ${TRAFFIC_LEVELS[e.trafficImpact][lang]}</span>` : ''}
          </div>
          <div class="event-card-desc">${escHtml(truncate(e.description[lang], 150))}</div>
        </div>
      </div>`;
    });
  });

  document.getElementById('events-list').innerHTML = html;
}

/* ═══════ Analytics ═══════ */
function renderAnalytics() {
  const events = getFilteredEvents();
  const siteCount = events.filter(e => e.type === 'site').length;
  const cityCount = events.filter(e => e.type === 'city').length;
  const highCount = events.filter(e => e.trafficImpact === 'high').length;

  document.getElementById('analytics-stats').innerHTML = [
    { value: events.length, label: t('totalEvents') },
    { value: siteCount, label: t('siteEvents') },
    { value: cityCount, label: t('cityEvents') },
    { value: highCount, label: t('highTraffic') },
  ].map(s => `<div class="stat-card"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('');

  renderCategoryChart(events);
  renderMonthChart(events);
  renderTrafficChart(events);
  renderVenueChart(events);
}

function destroyChart(name) {
  if (charts[name]) { charts[name].destroy(); charts[name] = null; }
}

function renderCategoryChart(events) {
  destroyChart('category');
  const counts = {};
  events.forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
  charts.category = new Chart(document.getElementById('chart-category'), {
    type: 'doughnut',
    data: {
      labels: sorted.map(([c]) => (CATEGORIES[c]?.emoji || '') + ' ' + (CATEGORIES[c]?.[lang] || c)),
      datasets: [{ data: sorted.map(([,n]) => n), backgroundColor: sorted.map(([c]) => CATEGORIES[c]?.color || '#999') }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } } }
  });
}

function renderMonthChart(events) {
  destroyChart('month');
  const months = t('monthNames');
  const counts = new Array(12).fill(0);
  events.forEach(e => { const m = parseInt(e.date.split('-')[1]) - 1; counts[m]++; });
  const activeMonths = counts.map((c, i) => ({ count: c, label: months[i], idx: i })).filter(m => m.count > 0);
  charts.month = new Chart(document.getElementById('chart-month'), {
    type: 'bar',
    data: {
      labels: activeMonths.map(m => m.label),
      datasets: [{ label: t('totalEvents'), data: activeMonths.map(m => m.count), backgroundColor: '#0891b2', borderRadius: 6 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
}

function renderTrafficChart(events) {
  destroyChart('traffic');
  const counts = {};
  events.filter(e => e.type === 'city').forEach(e => { counts[e.trafficImpact] = (counts[e.trafficImpact] || 0) + 1; });
  const levels = ['high','medium','low','none'].filter(l => counts[l]);
  charts.traffic = new Chart(document.getElementById('chart-traffic'), {
    type: 'bar',
    data: {
      labels: levels.map(l => TRAFFIC_LEVELS[l].emoji + ' ' + TRAFFIC_LEVELS[l][lang]),
      datasets: [{ data: levels.map(l => counts[l]), backgroundColor: levels.map(l => TRAFFIC_LEVELS[l].color), borderRadius: 6 }]
    },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
}

function renderVenueChart(events) {
  destroyChart('venue');
  const counts = {};
  events.forEach(e => {
    const name = VENUES[e.venue]?.name || e.venue;
    counts[name] = (counts[name] || 0) + 1;
  });
  const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 10);
  charts.venue = new Chart(document.getElementById('chart-venue'), {
    type: 'bar',
    data: {
      labels: sorted.map(([n]) => n),
      datasets: [{ data: sorted.map(([,c]) => c), backgroundColor: '#7c3aed', borderRadius: 6 }]
    },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
}

/* ═══════ Modal ═══════ */
function showEventDetail(id) {
  closeDayPopup();
  const ev = allEvents.find(e => e.id === id);
  if (!ev) return;
  const cat = CATEGORIES[ev.category];
  const venue = VENUES[ev.venue];
  const tl = TRAFFIC_LEVELS[ev.trafficImpact];

  document.getElementById('modal-title').textContent = ev.title[lang];

  let html = '';
  // Category badge
  html += `<div class="modal-row"><span class="modal-label">${t('category')}</span><span class="modal-cat-badge" style="background:${cat.color}">${cat.emoji} ${cat[lang]}</span></div>`;
  // Date
  html += `<div class="modal-row"><span class="modal-label">📅 ${lang === 'fi' ? 'Päivämäärä' : 'Date'}</span><span class="modal-value">${formatDate(ev.date)}${ev.endDate && ev.endDate !== ev.date ? ' → ' + formatDate(ev.endDate) : ''}</span></div>`;
  // Time
  html += `<div class="modal-row"><span class="modal-label">${t('time')}</span><span class="modal-value">${ev.time}</span></div>`;
  // Duration
  if (ev.duration) html += `<div class="modal-row"><span class="modal-label">${t('duration')}</span><span class="modal-value">${formatDuration(ev.duration)}</span></div>`;
  // Location
  html += `<div class="modal-row"><span class="modal-label">${t('location')}</span><span class="modal-value">${escHtml(venue ? venue.name + ' – ' + venue.address : '')}</span></div>`;
  // Traffic impact
  if (ev.trafficImpact && ev.trafficImpact !== 'none') {
    html += `<div class="modal-row"><span class="modal-label">${t('trafficImpact')}</span><span class="traffic-badge traffic-${ev.trafficImpact}">${tl.emoji} ${tl[lang]}</span></div>`;
  }
  // Description
  html += `<div class="modal-desc">${escHtml(ev.description[lang])}</div>`;
  // Traffic warning
  if (ev.trafficImpact === 'high') {
    html += `<div class="modal-traffic-warning">${t('trafficWarning')}</div>`;
  }
  // Actions
  html += '<div class="modal-actions">';
  html += `<button class="modal-btn primary" onclick="downloadSingleICS(${ev.id})">${t('addToCalendar')}</button>`;
  if (ev.url) html += `<a href="${escHtml(ev.url)}" target="_blank" class="modal-btn">${t('openLink')} ↗</a>`;
  html += `<button class="modal-btn" onclick="closeModal()">${t('close')}</button>`;
  html += '</div>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').classList.add('visible');
}

function closeModal() {
  document.getElementById('modal').classList.remove('visible');
}

/* ═══════ Export ═══════ */
function escICS(s) { return s ? s.replace(/[\\;,]/g, c => '\\' + c).replace(/\n/g, '\\n') : ''; }

function makeICSEvent(ev) {
  const venue = VENUES[ev.venue];
  const start = ev.date.replace(/-/g, '') + 'T' + ev.time.replace(':', '') + '00';
  let endDate = ev.endDate || ev.date;
  let endTime = ev.time;
  if (ev.duration) {
    const d = new Date(`${ev.date}T${ev.time}:00`);
    d.setMinutes(d.getMinutes() + ev.duration);
    endDate = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    endTime = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
  const end = endDate.replace(/-/g, '') + 'T' + endTime.replace(':', '') + '00';
  return `BEGIN:VEVENT\r\nDTSTART:${start}\r\nDTEND:${end}\r\nSUMMARY:${escICS(ev.title.fi)}\r\nDESCRIPTION:${escICS(ev.description.fi)}\r\nLOCATION:${escICS(venue ? venue.name + ', ' + venue.address : '')}\r\nUID:siili-jkl-${ev.id}@siili.com\r\nEND:VEVENT\r\n`;
}

function exportICS() {
  const events = getFilteredEvents();
  const cal = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Siili JKL//Events//FI\r\nCALSCALE:GREGORIAN\r\n' +
    events.map(makeICSEvent).join('') + 'END:VCALENDAR\r\n';
  downloadFile(cal, 'siili_jyvaskyla_tapahtumat.ics', 'text/calendar');
  showToast(t('downloadICS') + ' ✓');
}

function downloadSingleICS(id) {
  const ev = allEvents.find(e => e.id === id);
  if (!ev) return;
  const cal = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Siili JKL//Events//FI\r\nCALSCALE:GREGORIAN\r\n' +
    makeICSEvent(ev) + 'END:VCALENDAR\r\n';
  const fname = ev.title.fi.replace(/[^a-zA-Z0-9äöåÄÖÅ ]/g, '').replace(/ +/g, '_').toLowerCase();
  downloadFile(cal, fname + '.ics', 'text/calendar');
  showToast(t('addToCalendar') + ' ✓');
}

function exportCSV() {
  const events = getFilteredEvents();
  const BOM = '\uFEFF';
  const header = [lang === 'fi' ? 'Päivämäärä' : 'Date', lang === 'fi' ? 'Päättymispäivä' : 'End Date',
    t('time'), lang === 'fi' ? 'Tapahtuma' : 'Event', t('category'), t('location'),
    t('duration'), t('trafficImpact'), t('description')].join(';');
  const rows = events.map(e => {
    const cat = CATEGORIES[e.category];
    const venue = VENUES[e.venue];
    const tl = TRAFFIC_LEVELS[e.trafficImpact];
    return [formatDate(e.date), e.endDate ? formatDate(e.endDate) : '', e.time,
      `"${e.title[lang]}"`, cat[lang], venue ? venue.name : '',
      e.duration ? formatDuration(e.duration) : '', tl[lang],
      `"${e.description[lang].replace(/"/g, '""')}"`].join(';');
  });
  downloadFile(BOM + header + '\n' + rows.join('\n'), 'siili_jyvaskyla_tapahtumat.csv', 'text/csv');
  showToast(t('downloadCSV') + ' ✓');
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type: type + ';charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ═══════ Toast ═══════ */
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2500);
}

/* ═══════ Boot ═══════ */
document.addEventListener('DOMContentLoaded', init);
