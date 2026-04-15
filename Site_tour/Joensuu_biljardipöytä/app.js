// Siili Joensuu - Biljardipöydän hallinta - App Logic
// ====================================================

let currentWeekOffset = 0;
let currentPlayerView = 'leaderboard';
let currentView = 'calendar-view';
let slackMessageHistory = [];
let calFilterPlayer = 0; // 0 = all
let calFilterStatus = 'all'; // all, upcoming, played
let calMode = 'week'; // 'week' or 'month'
let currentMonthOffset = 0;

// ============ HELPERS ============
function t(key) {
  const dict = TRANSLATIONS[window._lang] || TRANSLATIONS.fi;
  return dict[key] || key;
}

function getPlayer(id) {
  return PLAYERS.find(p => p.id === id);
}

function getMonday(offset) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7) + (offset * 7));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function formatDateShort(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.`;
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function getDayNames() {
  const lang = window._lang;
  if (lang === 'en') return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai'];
}

function getDayNamesShort() {
  const lang = window._lang;
  if (lang === 'en') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return ['Ma', 'Ti', 'Ke', 'To', 'Pe'];
}

// ============ VIEW SWITCHING ============
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    const viewId = tab.dataset.view;
    document.getElementById(viewId).classList.add('active');
    currentView = viewId;
    renderCurrentView();
  });
});

function renderCurrentView() {
  switch (currentView) {
    case 'calendar-view': renderCalendar(); break;
    case 'players-view': renderPlayers(); break;
    case 'tournaments-view': renderTournaments(); break;
    case 'analytics-view': renderAnalytics(); break;
    case 'slack-view': renderSlack(); break;
  }
}

// ============ CALENDAR VIEW ============
function setCalMode(mode) {
  calMode = mode;
  document.querySelectorAll('.cal-mode-btn').forEach(b => b.classList.toggle('active', b.dataset.calmode === mode));
  renderCalendar();
}

function navWeek(dir) {
  if (calMode === 'month') {
    currentMonthOffset += dir;
  } else {
    currentWeekOffset += dir;
  }
  renderCalendar();
}

function goCurrentWeek() {
  currentWeekOffset = 0;
  currentMonthOffset = 0;
  renderCalendar();
}

function renderCalendarFilters() {
  const filtersEl = document.getElementById('calFilters');
  const lang = window._lang;
  const playerLabel = lang === 'en' ? 'Player:' : 'Pelaaja:';
  const statusLabel = lang === 'en' ? 'Status:' : 'Tila:';
  const allLabel = lang === 'en' ? 'All' : 'Kaikki';
  const clearLabel = lang === 'en' ? 'Clear filters' : 'Tyhjennä';

  let html = '';

  // Player filter
  html += `<div class="cal-filter-group">`;
  html += `<span class="cal-filter-label">${playerLabel}</span>`;
  html += `<select class="filter-select" onchange="calFilterPlayer=parseInt(this.value);renderCalendar()">`;
  html += `<option value="0">${allLabel}</option>`;
  PLAYERS.forEach(p => {
    html += `<option value="${p.id}" ${calFilterPlayer === p.id ? 'selected' : ''}>${p.emoji} ${p.nick}</option>`;
  });
  html += `</select>`;
  html += `</div>`;

  // Status filter
  html += `<div class="cal-filter-group">`;
  html += `<span class="cal-filter-label">${statusLabel}</span>`;
  ['all', 'upcoming', 'played'].forEach(s => {
    const label = s === 'all' ? allLabel : t(s);
    html += `<button class="filter-pill${calFilterStatus === s ? ' active' : ''}" onclick="calFilterStatus='${s}';renderCalendar()">${label}</button>`;
  });
  html += `</div>`;

  // Clear button
  if (calFilterPlayer !== 0 || calFilterStatus !== 'all') {
    html += `<button class="filter-clear" onclick="calFilterPlayer=0;calFilterStatus='all';renderCalendar()">${clearLabel}</button>`;
  }

  filtersEl.innerHTML = html;
}

function renderCalendar() {
  renderCalendarFilters();

  // Update mode toggle labels
  const weekBtnLabel = window._lang === 'en' ? 'Week' : 'Viikko';
  const monthBtnLabel = window._lang === 'en' ? 'Month' : 'Kuukausi';
  document.querySelectorAll('.cal-mode-btn').forEach(b => {
    if (b.dataset.calmode === 'week') b.textContent = weekBtnLabel;
    if (b.dataset.calmode === 'month') b.textContent = monthBtnLabel;
    b.classList.toggle('active', b.dataset.calmode === calMode);
  });

  if (calMode === 'month') {
    renderCalendarMonth();
    return;
  }

  const monday = getMonday(currentWeekOffset);
  const weekNum = getWeekNumber(monday);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const weekLabel = document.getElementById('weekLabel');
  const weekRange = document.getElementById('weekRange');
  weekLabel.textContent = `${t('weekLabel')} ${weekNum}`;
  weekLabel.className = 'cal-week-label' + (currentWeekOffset === 0 ? ' current' : '');
  weekRange.textContent = `${formatDateShort(monday)} - ${formatDateShort(friday)} ${monday.getFullYear()}`;

  const grid = document.getElementById('calGrid');
  const dayNames = getDayNames();
  const today = formatDate(new Date());

  let html = '';
  for (let d = 0; d < 5; d++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + d);
    const dateStr = formatDate(day);
    const isToday = dateStr === today;

    let dayReservations = RESERVATIONS.filter(r => r.date === dateStr);

    // Apply filters
    if (calFilterPlayer !== 0) {
      dayReservations = dayReservations.filter(r => r.player1 === calFilterPlayer || r.player2 === calFilterPlayer);
    }
    if (calFilterStatus !== 'all') {
      dayReservations = dayReservations.filter(r => r.status === calFilterStatus);
    }

    html += `<div class="cal-day${isToday ? ' today' : ''}">`;
    html += `<div class="cal-day-header">`;
    html += `<span>${dayNames[d]}</span>`;
    html += `<span class="cal-day-date">${formatDateShort(day)}${dayReservations.length > 0 ? ' (' + dayReservations.length + ')' : ''}</span>`;
    html += `</div>`;
    html += `<div class="cal-slots">`;

    if (dayReservations.length === 0) {
      html += `<div class="cal-empty">${t('noReservations')}</div>`;
    } else {
      dayReservations.forEach(res => {
        const p1 = getPlayer(res.player1);
        const p2 = getPlayer(res.player2);
        html += `<div class="cal-slot ${res.status}" onclick="openEventPopup(${res.id})">`;
        html += `<div class="cal-slot-time">${res.time}</div>`;
        html += `<div class="cal-slot-players">${p1.emoji} ${p1.nick} vs ${p2.emoji} ${p2.nick}</div>`;
        html += `<div class="cal-slot-reason">${res.reason}</div>`;
        html += `<span class="cal-slot-status ${res.status}">${t(res.status)}</span>`;
        html += `</div>`;
      });
    }

    html += `<button class="cal-add-btn" onclick="openBookingModal('${dateStr}')">+ ${t('bookSlot')}</button>`;
    html += `</div></div>`;
  }

  grid.innerHTML = html;
}

function renderCalendarMonth() {
  const now = new Date();
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + currentMonthOffset, 1);
  const year = targetMonth.getFullYear();
  const month = targetMonth.getMonth();

  const monthNames = window._lang === 'en'
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];

  const weekLabel = document.getElementById('weekLabel');
  const weekRange = document.getElementById('weekRange');
  weekLabel.textContent = `${monthNames[month]} ${year}`;
  weekLabel.className = 'cal-week-label' + (currentMonthOffset === 0 ? ' current' : '');
  weekRange.textContent = '';

  const grid = document.getElementById('calGrid');
  const today = formatDate(new Date());

  // Day names header (Mon-Sun)
  const dayNamesShort = window._lang === 'en'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];

  let html = '<div class="cal-month-header">';
  dayNamesShort.forEach(d => { html += `<div class="cal-month-day-name">${d}</div>`; });
  html += '</div>';

  // Calculate first day of month (Monday=0 based)
  const firstDay = new Date(year, month, 1);
  const startDow = (firstDay.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Previous month padding
  const prevMonthDays = new Date(year, month, 0).getDate();

  html += '<div class="cal-month-grid">';

  // Leading days from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const date = new Date(year, month - 1, d);
    const dateStr = formatDate(date);
    html += renderMonthCell(dateStr, d, true, false, today);
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = formatDate(date);
    const dow = (date.getDay() + 6) % 7;
    const isWeekend = dow >= 5;
    html += renderMonthCell(dateStr, d, false, isWeekend, today);
  }

  // Trailing days to fill last row
  const totalCells = startDow + daysInMonth;
  const trailing = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let d = 1; d <= trailing; d++) {
    const date = new Date(year, month + 1, d);
    const dateStr = formatDate(date);
    html += renderMonthCell(dateStr, d, true, false, today);
  }

  html += '</div>';
  grid.innerHTML = html;
}

function renderMonthCell(dateStr, dayNum, isOtherMonth, isWeekend, today) {
  const isToday = dateStr === today;
  let cls = 'cal-month-cell';
  if (isToday) cls += ' today';
  if (isOtherMonth) cls += ' other-month';
  if (isWeekend) cls += ' weekend';

  let reservations = RESERVATIONS.filter(r => r.date === dateStr);
  if (calFilterPlayer !== 0) {
    reservations = reservations.filter(r => r.player1 === calFilterPlayer || r.player2 === calFilterPlayer);
  }
  if (calFilterStatus !== 'all') {
    reservations = reservations.filter(r => r.status === calFilterStatus);
  }

  let html = `<div class="${cls}" onclick="jumpToWeekFromMonth('${dateStr}')">`;
  html += `<div class="cal-month-cell-day">${dayNum}</div>`;

  const maxShow = 2;
  reservations.slice(0, maxShow).forEach(res => {
    const p1 = getPlayer(res.player1);
    const p2 = getPlayer(res.player2);
    html += `<div class="cal-month-event ${res.status}" onclick="event.stopPropagation();openEventPopup(${res.id})">${res.time} ${p1.emoji}${p2.emoji}</div>`;
  });

  if (reservations.length > maxShow) {
    html += `<div class="cal-month-more">+${reservations.length - maxShow}</div>`;
  }

  html += '</div>';
  return html;
}

function jumpToWeekFromMonth(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  const todayMonday = getMonday(0);
  const diffDays = Math.floor((target - todayMonday) / 86400000);
  currentWeekOffset = Math.floor(diffDays / 7);
  calMode = 'week';
  renderCalendar();
}

// ============ EVENT DETAIL POPUP ============
let openEventId = null;

function openEventPopup(resId) {
  const res = RESERVATIONS.find(r => r.id === resId);
  if (!res) return;
  openEventId = resId;

  const p1 = getPlayer(res.player1);
  const p2 = getPlayer(res.player2);
  const dayNames = getDayNames();
  const d = new Date(res.date);
  const dayIdx = (d.getDay() + 6) % 7;
  const dayName = dayIdx < 5 ? dayNames[dayIdx] : '';

  const stars = (skill) => Array.from({ length: 5 }, (_, j) => j < skill ? '★' : '☆').join('');

  document.getElementById('epHeader').innerHTML = `
    <div class="ep-time">🎱 ${res.time}</div>
    <div class="ep-date">${dayName} ${formatDateShort(d)} ${d.getFullYear()}</div>
    <span class="ep-reason-badge">${res.reason}</span>
  `;

  document.getElementById('epBody').innerHTML = `
    <div class="ep-vs">
      <div class="ep-player-card">
        <div class="ep-player-emoji">${p1.emoji}</div>
        <div class="ep-player-name">${p1.name}</div>
        <div class="ep-player-nick">${p1.nick}</div>
        <div class="ep-skill-stars">${stars(p1.skill)}</div>
        <div class="ep-player-record"><span class="w">${p1.wins}W</span> / <span class="l">${p1.losses}L</span></div>
      </div>
      <div class="ep-vs-badge">VS</div>
      <div class="ep-player-card">
        <div class="ep-player-emoji">${p2.emoji}</div>
        <div class="ep-player-name">${p2.name}</div>
        <div class="ep-player-nick">${p2.nick}</div>
        <div class="ep-skill-stars">${stars(p2.skill)}</div>
        <div class="ep-player-record"><span class="w">${p2.wins}W</span> / <span class="l">${p2.losses}L</span></div>
      </div>
    </div>
    <div class="ep-details">
      <div class="ep-detail-row">
        <span class="ep-detail-label">${t('status')}</span>
        <span class="ep-status-badge ${res.status}">${t(res.status)}</span>
      </div>
      <div class="ep-detail-row">
        <span class="ep-detail-label">${t('time')}</span>
        <span class="ep-detail-value">${res.time} (${res.duration} min)</span>
      </div>
      <div class="ep-detail-row">
        <span class="ep-detail-label">${t('reason')}</span>
        <span class="ep-detail-value">${res.reason}</span>
      </div>
      <div class="ep-detail-row">
        <span class="ep-detail-label">${t('motto')} (${p1.nick})</span>
        <span class="ep-detail-value" style="font-style:italic;max-width:200px;text-align:right">"${p1.motto}"</span>
      </div>
      <div class="ep-detail-row">
        <span class="ep-detail-label">${t('motto')} (${p2.nick})</span>
        <span class="ep-detail-value" style="font-style:italic;max-width:200px;text-align:right">"${p2.motto}"</span>
      </div>
    </div>
  `;

  document.getElementById('eventPopup').classList.add('show');
}

function closeEventPopup() {
  document.getElementById('eventPopup').classList.remove('show');
  openEventId = null;
}

function deleteReservation() {
  if (openEventId === null) return;
  const idx = RESERVATIONS.findIndex(r => r.id === openEventId);
  if (idx !== -1) {
    RESERVATIONS.splice(idx, 1);
    closeEventPopup();
    renderCalendar();
    showToast('Varaus poistettu!');
  }
}

// ============ BOOKING MODAL ============
let bookingDate = null;

function openBookingModal(date) {
  bookingDate = date || formatDate(new Date());
  const modal = document.getElementById('bookingModal');
  modal.classList.add('show');

  // Populate player selects
  const p1 = document.getElementById('bookP1');
  const p2 = document.getElementById('bookP2');
  p1.innerHTML = PLAYERS.map(p => `<option value="${p.id}">${p.emoji} ${p.name} (${p.nick})</option>`).join('');
  p2.innerHTML = PLAYERS.map(p => `<option value="${p.id}">${p.emoji} ${p.name} (${p.nick})</option>`).join('');
  p2.selectedIndex = 1;

  // Populate time slots
  const timeSelect = document.getElementById('bookTime');
  const slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  const existingTimes = RESERVATIONS.filter(r => r.date === bookingDate).map(r => r.time);
  timeSelect.innerHTML = slots.map(s => {
    const taken = existingTimes.includes(s);
    return `<option value="${s}" ${taken ? 'disabled' : ''}>${s}${taken ? ' (' + t('reserved') + ')' : ''}</option>`;
  }).join('');
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('show');
}

function saveBooking() {
  const p1 = parseInt(document.getElementById('bookP1').value);
  const p2 = parseInt(document.getElementById('bookP2').value);
  const time = document.getElementById('bookTime').value;
  const reason = document.getElementById('bookReason').value || 'Vapaa peli';

  if (p1 === p2) {
    showToast('Valitse kaksi eri pelaajaa!');
    return;
  }

  RESERVATIONS.push({
    id: RESERVATIONS.length + 1,
    date: bookingDate,
    time: time,
    duration: 30,
    player1: p1,
    player2: p2,
    reason: reason,
    status: 'upcoming'
  });

  RESERVATIONS.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });

  closeBookingModal();
  renderCalendar();
  showToast('Varaus tallennettu!');
}

// Close modal on backdrop click
document.getElementById('bookingModal').addEventListener('click', function(e) {
  if (e.target === this) closeBookingModal();
});

// ============ PLAYERS VIEW ============
document.querySelectorAll('.players-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.players-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentPlayerView = tab.dataset.pt;
    renderPlayers();
  });
});

function renderPlayers() {
  const container = document.getElementById('playersContent');

  if (currentPlayerView === 'leaderboard') {
    renderLeaderboard(container);
  } else {
    renderPlayersGrid(container);
  }
}

function renderLeaderboard(container) {
  const sorted = [...PLAYERS].sort((a, b) => {
    const aWr = a.wins / (a.wins + a.losses || 1);
    const bWr = b.wins / (b.wins + b.losses || 1);
    if (bWr !== aWr) return bWr - aWr;
    return b.wins - a.wins;
  });

  let html = '<div class="leaderboard">';
  html += `<div class="lb-header">
    <div>${t('rank')}</div>
    <div>${t('players')}</div>
    <div>${t('skill')}</div>
    <div>${t('wins')}</div>
    <div>${t('losses')}</div>
    <div>${t('streak')}</div>
  </div>`;

  sorted.forEach((p, i) => {
    const rank = i + 1;
    let rankClass = '';
    let rankDisplay = rank;
    if (rank === 1) { rankClass = 'gold'; rankDisplay = '🥇'; }
    else if (rank === 2) { rankClass = 'silver'; rankDisplay = '🥈'; }
    else if (rank === 3) { rankClass = 'bronze'; rankDisplay = '🥉'; }

    const stars = Array.from({ length: 5 }, (_, j) =>
      `<span class="lb-star${j < p.skill ? '' : ' empty'}">${j < p.skill ? '★' : '☆'}</span>`
    ).join('');

    const streakClass = p.streak > 0 ? 'positive' : p.streak < 0 ? 'negative' : '';
    const streakDisplay = p.streak > 0 ? `+${p.streak}` : p.streak;

    html += `<div class="lb-row">
      <div class="lb-rank ${rankClass}">${rankDisplay}</div>
      <div class="lb-player">
        <span class="lb-emoji">${p.emoji}</span>
        <div>
          <div class="lb-name">${p.name}</div>
          <div class="lb-nick">${p.nick}</div>
        </div>
      </div>
      <div class="lb-skill">${stars}</div>
      <div class="lb-wins">${p.wins}</div>
      <div class="lb-losses">${p.losses}</div>
      <div class="lb-streak ${streakClass}">${streakDisplay}</div>
    </div>`;
  });

  html += '</div>';
  container.innerHTML = html;
}

function renderPlayersGrid(container) {
  let html = '<div class="players-grid">';

  PLAYERS.forEach(p => {
    const stars = Array.from({ length: 5 }, (_, j) =>
      `<span class="lb-star${j < p.skill ? '' : ' empty'}">${j < p.skill ? '★' : '☆'}</span>`
    ).join('');

    const streakDisplay = p.streak > 0 ? `+${p.streak}` : p.streak;

    html += `<div class="player-card">
      <div class="pc-header">
        <span class="pc-emoji">${p.emoji}</span>
        <div>
          <div class="pc-name">${p.name}</div>
          <div class="pc-nick">${p.nick}</div>
        </div>
      </div>
      <div class="pc-stats">
        <div class="pc-stat">
          <div class="pc-stat-val wins">${p.wins}</div>
          <div class="pc-stat-label">${t('wins')}</div>
        </div>
        <div class="pc-stat">
          <div class="pc-stat-val losses">${p.losses}</div>
          <div class="pc-stat-label">${t('losses')}</div>
        </div>
        <div class="pc-stat">
          <div class="pc-stat-val" style="color:${p.streak > 0 ? 'var(--ok)' : p.streak < 0 ? 'var(--err)' : 'var(--dim)'}">${streakDisplay}</div>
          <div class="pc-stat-label">${t('streak')}</div>
        </div>
      </div>
      <div class="pc-skill">${stars}</div>
      <div class="pc-motto">"${p.motto}"</div>
    </div>`;
  });

  html += '</div>';
  container.innerHTML = html;
}

// ============ TOURNAMENTS VIEW ============
function renderTournaments() {
  const container = document.getElementById('tournamentsContent');
  let html = '';

  // Active tournaments
  const active = TOURNAMENTS.filter(t => t.status === 'active');
  if (active.length) {
    html += `<div class="tournament-section">
      <div class="tournament-section-title"><span class="dot active"></span> ${t('activeTournaments')}</div>`;
    active.forEach(tour => { html += renderTournamentCard(tour); });
    html += '</div>';
  }

  // Upcoming tournaments
  const upcoming = TOURNAMENTS.filter(t => t.status === 'upcoming');
  if (upcoming.length) {
    html += `<div class="tournament-section">
      <div class="tournament-section-title"><span class="dot upcoming"></span> ${t('upcomingTournaments')}</div>`;
    upcoming.forEach(tour => { html += renderTournamentCard(tour); });
    html += '</div>';
  }

  // Completed tournaments
  const completed = TOURNAMENTS.filter(t => t.status === 'completed');
  if (completed.length) {
    html += `<div class="tournament-section">
      <div class="tournament-section-title"><span class="dot completed"></span> ${t('completedTournaments')}</div>`;
    completed.forEach(tour => { html += renderTournamentCard(tour); });
    html += '</div>';
  }

  container.innerHTML = html;
}

function renderTournamentCard(tour) {
  let html = `<div class="tournament-card">`;
  html += `<div class="tc-header">
    <div>
      <div class="tc-title">${tour.name}</div>
      <div class="tc-dates">${tour.startDate} — ${tour.endDate}</div>
    </div>
    <span class="tc-badge ${tour.status}">${t(tour.status)}</span>
  </div>`;

  html += `<div class="tc-body">`;
  html += `<div class="tc-desc">${tour.description}</div>`;
  html += `<div class="tc-prize">${tour.prize}</div>`;

  // Participants
  html += `<div class="tc-participants">`;
  tour.participants.forEach(pid => {
    const p = getPlayer(pid);
    // Check if player was eliminated
    const isEliminated = tour.bracket.some(m => {
      return m.winner && ((m.player1 === pid || m.player2 === pid) && m.winner !== pid);
    });
    // Check if winner (finals)
    const finalMatch = tour.bracket.find(m => m.round === 3);
    const isWinner = finalMatch && finalMatch.winner === pid;

    let cls = 'tc-participant';
    if (isWinner) cls += ' winner';
    else if (isEliminated) cls += ' eliminated';

    html += `<span class="${cls}">${p.emoji} ${p.nick}</span>`;
  });
  html += `</div>`;

  // Bracket
  if (tour.bracket.length > 0 && tour.type === 'single-elimination') {
    html += renderBracket(tour);
  }

  html += `</div></div>`;
  return html;
}

function renderBracket(tour) {
  const rounds = {};
  tour.bracket.forEach(m => {
    if (!rounds[m.round]) rounds[m.round] = [];
    rounds[m.round].push(m);
  });

  const roundNames = {
    1: t('quarterfinals'),
    2: t('semifinals'),
    3: t('finals')
  };

  let html = '<div class="bracket">';

  Object.keys(rounds).sort().forEach(round => {
    html += `<div class="bracket-round">`;
    html += `<div class="bracket-round-title">${roundNames[round] || t('round') + ' ' + round}</div>`;

    rounds[round].forEach(match => {
      html += `<div class="bracket-match">`;

      // Player 1
      const p1 = match.player1 ? getPlayer(match.player1) : null;
      const p1Winner = match.winner === match.player1 && match.winner;
      const p1Score = match.score ? match.score.split('-')[0] : '';
      html += `<div class="bracket-player${p1Winner ? ' winner' : ''}${!p1 ? ' tbd' : ''}">
        <span>${p1 ? p1.emoji + ' ' + p1.nick : t('tbd')}</span>
        ${p1Score ? `<span class="bracket-score">${p1Score}</span>` : ''}
      </div>`;

      // Player 2
      const p2 = match.player2 ? getPlayer(match.player2) : null;
      const p2Winner = match.winner === match.player2 && match.winner;
      const p2Score = match.score ? match.score.split('-')[1] : '';
      html += `<div class="bracket-player${p2Winner ? ' winner' : ''}${!p2 ? ' tbd' : ''}">
        <span>${p2 ? p2.emoji + ' ' + p2.nick : t('tbd')}</span>
        ${p2Score ? `<span class="bracket-score">${p2Score}</span>` : ''}
      </div>`;

      html += `</div>`;
    });

    html += `</div>`;
  });

  html += '</div>';
  return html;
}

// ============ SLACK VIEW ============
function renderSlack() {
  if (slackMessageHistory.length === 0) {
    generateInitialSlackMessages();
  }
  renderSlackMessages();
}

function generateInitialSlackMessages() {
  const now = new Date();
  const messages = [];

  // Welcome message
  messages.push({
    type: 'bot',
    avatar: '🎱',
    name: t('slackBot'),
    time: formatSlackTime(new Date(now.getTime() - 3600000 * 3)),
    text: '🎱 <strong>Tervetuloa #joensuu-biljardi -kanavalle!</strong>\n\nTäällä biljardipöytä pitää teidät ajan tasalla peleistä, parituksista ja turnaustuloksista. Pöytä on vapaa - tulkaa pelaamaan!',
    reactions: [{ emoji: '🎱', count: 8 }, { emoji: '🔥', count: 3 }]
  });

  // A random stat
  const totalGames = PLAYERS.reduce((sum, p) => sum + p.wins + p.losses, 0) / 2;
  messages.push({
    type: 'bot',
    avatar: '📊',
    name: t('slackBot'),
    time: formatSlackTime(new Date(now.getTime() - 3600000 * 2)),
    text: `📊 <strong>Aamustatistiikat:</strong>\n🎱 ${Math.round(totalGames)} peliä pelattu yhteensä\n🏆 Kuukauden paras: <span class="mention">@${PLAYERS[9].nick}</span> (${PLAYERS[9].wins} voittoa)\n📈 Pisin voittoputki: ${PLAYERS[9].streak} peliä\n😅 Eniten kehitettävää: <span class="mention">@${PLAYERS[8].nick}</span> (mutta hän yrittää kovasti!)`,
    reactions: [{ emoji: '📊', count: 5 }, { emoji: '💪', count: 2 }]
  });

  // An auto-pairing from earlier
  const pair = getRandomPair();
  messages.push({
    type: 'bot',
    avatar: '🎲',
    name: t('slackBot'),
    time: formatSlackTime(new Date(now.getTime() - 3600000)),
    text: generatePairingMessage(pair.p1, pair.p2, '14:00'),
    reactions: [{ emoji: '👀', count: 4 }, { emoji: '🍿', count: 6 }]
  });

  // A player message
  messages.push({
    type: 'user',
    avatar: pair.p1.emoji,
    name: pair.p1.name,
    time: formatSlackTime(new Date(now.getTime() - 2700000)),
    text: 'Haaste vastaanotettu! Olen valmis 💪',
    reactions: [{ emoji: '🔥', count: 3 }]
  });

  // Another player response
  messages.push({
    type: 'user',
    avatar: pair.p2.emoji,
    name: pair.p2.name,
    time: formatSlackTime(new Date(now.getTime() - 2400000)),
    text: 'Tänään on se päivä kun voitan. Tunnen sen luissani. 🦴🎱',
    reactions: [{ emoji: '😂', count: 7 }]
  });

  // Random tip
  messages.push({
    type: 'bot',
    avatar: '💡',
    name: t('slackBot'),
    time: formatSlackTime(new Date(now.getTime() - 1800000)),
    text: '💡 <strong>Päivän vinkki:</strong> Älä lyö valkoista palloa suoraan taskuun. Se ei tuota pisteitä. Tiedän, yllätys.',
    reactions: [{ emoji: '😂', count: 4 }, { emoji: '💡', count: 2 }]
  });

  slackMessageHistory = messages;
}

function formatSlackTime(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function getRandomPair() {
  const p1 = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  let p2;
  do {
    p2 = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  } while (p2.id === p1.id);
  return { p1, p2 };
}

function generatePairingMessage(p1, p2, time) {
  const greeting = SLACK_GREETINGS[Math.floor(Math.random() * SLACK_GREETINGS.length)];
  const template = SLACK_PAIR_MESSAGES[Math.floor(Math.random() * SLACK_PAIR_MESSAGES.length)];
  const msg = template
    .replace(/\{p1\}/g, `<span class="mention">@${p1.nick}</span>`)
    .replace(/\{p2\}/g, `<span class="mention">@${p2.nick}</span>`)
    .replace(/\{time\}/g, `<strong>${time}</strong>`);

  return `${greeting}\n\n${msg}\n\n<div class="pairing-card">🆚 <strong>${p1.emoji} ${p1.nick}</strong> vs <strong>${p2.emoji} ${p2.nick}</strong>\n⏰ Aika: ${time}\n📍 Paikka: Joensuun toimisto, biljardipöytä\n🏆 Panokset: Kunnia ja kahvit</div>`;
}

function renderSlackMessages() {
  const container = document.getElementById('slackMessages');
  let html = '';

  slackMessageHistory.forEach(msg => {
    html += `<div class="slack-msg">`;
    html += `<div class="slack-avatar">${msg.avatar}</div>`;
    html += `<div class="slack-msg-content">`;
    html += `<div class="slack-msg-header">`;
    html += `<span class="slack-msg-name${msg.type === 'bot' ? ' bot' : ''}">${msg.name}</span>`;
    html += `<span class="slack-msg-time">${msg.time}</span>`;
    html += `</div>`;
    html += `<div class="slack-msg-text">${msg.text.replace(/\n/g, '<br>')}</div>`;

    if (msg.reactions && msg.reactions.length) {
      html += `<div class="slack-reactions">`;
      msg.reactions.forEach(r => {
        html += `<span class="slack-reaction">${r.emoji} <span class="slack-reaction-count">${r.count}</span></span>`;
      });
      html += `</div>`;
    }

    html += `</div></div>`;
  });

  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

function generateAutoPairing() {
  const pair = getRandomPair();
  const hours = 9 + Math.floor(Math.random() * 8);
  const mins = Math.random() > 0.5 ? '30' : '00';
  const time = `${String(hours).padStart(2, '0')}:${mins}`;

  const msg = {
    type: 'bot',
    avatar: '🎲',
    name: t('slackBot'),
    time: formatSlackTime(new Date()),
    text: generatePairingMessage(pair.p1, pair.p2, time),
    reactions: [{ emoji: '🎱', count: 1 }]
  };

  slackMessageHistory.push(msg);
  renderSlackMessages();

  // Also create a reservation
  const today = formatDate(new Date());
  const dayOfWeek = new Date().getDay();
  const bookDate = (dayOfWeek === 0 || dayOfWeek === 6)
    ? formatDate(getMonday(0))
    : today;

  RESERVATIONS.push({
    id: RESERVATIONS.length + 1,
    date: bookDate,
    time: time,
    duration: 30,
    player1: pair.p1.id,
    player2: pair.p2.id,
    reason: 'Automaattinen paritus',
    status: 'upcoming'
  });

  RESERVATIONS.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });

  showToast(`${pair.p1.nick} vs ${pair.p2.nick} - varaus luotu!`);
}

function sendRandomMessage() {
  const template = SLACK_RANDOM_MESSAGES[Math.floor(Math.random() * SLACK_RANDOM_MESSAGES.length)];
  let text = template.text;

  // Replace placeholders
  const totalGames = PLAYERS.reduce((sum, p) => sum + p.wins, 0);
  const hours = Math.round(totalGames * 0.4);
  text = text.replace('{count}', totalGames);
  text = text.replace('{hours}', hours);

  const randomPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  text = text.replace('{player}', `<span class="mention">@${randomPlayer.nick}</span>`);
  text = text.replace('{games}', randomPlayer.wins + randomPlayer.losses);

  const titleObj = ACHIEVEMENT_TITLES.filter(a => a.games <= (randomPlayer.wins + randomPlayer.losses)).pop();
  text = text.replace('{title}', titleObj ? titleObj.title : 'Aloittelija');

  text = text.replace('{record}', PLAYERS[9].streak);
  text = text.replace('{holder}', `<span class="mention">@${PLAYERS[9].nick}</span>`);

  const weather = WEATHER_OPTIONS[Math.floor(Math.random() * WEATHER_OPTIONS.length)];
  text = text.replace('{weather}', weather);

  const msg = {
    type: 'bot',
    avatar: template.type === 'tip' ? '💡' : template.type === 'stat' ? '📊' : template.type === 'achievement' ? '🏅' : template.type === 'challenge' ? '🏆' : template.type === 'weather' ? '☀️' : '🎱',
    name: t('slackBot'),
    time: formatSlackTime(new Date()),
    text: text,
    reactions: [{ emoji: ['😂', '🔥', '💪', '👀', '🎱'][Math.floor(Math.random() * 5)], count: Math.ceil(Math.random() * 8) }]
  };

  slackMessageHistory.push(msg);
  renderSlackMessages();
}

function sendLeaderboardUpdate() {
  const sorted = [...PLAYERS].sort((a, b) => {
    const aWr = a.wins / (a.wins + a.losses || 1);
    const bWr = b.wins / (b.wins + b.losses || 1);
    if (bWr !== aWr) return bWr - aWr;
    return b.wins - a.wins;
  });

  let text = '📊 <strong>Tulostaulukko - Top 5:</strong>\n\n';
  sorted.slice(0, 5).forEach((p, i) => {
    const medals = ['🥇', '🥈', '🥉', '4.', '5.'];
    const wr = ((p.wins / (p.wins + p.losses)) * 100).toFixed(0);
    text += `${medals[i]} <strong>${p.nick}</strong> — ${p.wins}W/${p.losses}L (${wr}%)\n`;
  });

  text += `\n🔥 Kuumin putki: <span class="mention">@${sorted[0].nick}</span> (${sorted[0].streak > 0 ? '+' : ''}${sorted[0].streak})`;
  text += `\n💪 Eniten pelejä: <span class="mention">@${PLAYERS.reduce((a, b) => (a.wins + a.losses) > (b.wins + b.losses) ? a : b).nick}</span>`;

  const msg = {
    type: 'bot',
    avatar: '📊',
    name: t('slackBot'),
    time: formatSlackTime(new Date()),
    text: text,
    reactions: [{ emoji: '📊', count: 5 }, { emoji: '🏆', count: 3 }]
  };

  slackMessageHistory.push(msg);
  renderSlackMessages();
}

function sendUserMessage() {
  const input = document.getElementById('slackInput');
  const text = input.value.trim();
  if (!text) return;

  const randomPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];

  const msg = {
    type: 'user',
    avatar: randomPlayer.emoji,
    name: randomPlayer.name,
    time: formatSlackTime(new Date()),
    text: text,
    reactions: []
  };

  slackMessageHistory.push(msg);
  input.value = '';
  renderSlackMessages();

  // Bot sometimes responds
  if (Math.random() > 0.4) {
    setTimeout(() => {
      const responses = [
        '🎱 Hienoa kuulla! Biljardipöytä on vapaa ja odottaa.',
        '🤖 Rekisteröity. Algoritmit suosittelevat: pelaa enemmän biljardia.',
        `💬 Kiitos viestistä! Pöytä on tällä hetkellä ${Math.random() > 0.5 ? 'vapaa' : 'varattu'}. ${Math.random() > 0.5 ? 'Tule pelaamaan!' : 'Kokeile myöhemmin!'}`,
        `🎯 Roger that! Muuten, <span class="mention">@${PLAYERS[Math.floor(Math.random() * PLAYERS.length)].nick}</span> etsi juuri peliseuraa...`,
        '😎 Biljardipöytä kiittää ja kuittaa!',
      ];
      const botMsg = {
        type: 'bot',
        avatar: '🎱',
        name: t('slackBot'),
        time: formatSlackTime(new Date()),
        text: responses[Math.floor(Math.random() * responses.length)],
        reactions: [{ emoji: '👍', count: 1 }]
      };
      slackMessageHistory.push(botMsg);
      renderSlackMessages();
    }, 800 + Math.random() * 1200);
  }
}

// ============ ANALYTICS VIEW ============
let anDrilldown = null; // { type: 'opponent'|'month'|'wins'|'losses', id, playerId }

function renderAnalytics() {
  const select = document.getElementById('anPlayerSelect');
  const currentVal = parseInt(select.value) || 0;

  // Populate player select (only once or on lang change)
  if (select.options.length <= 1) {
    select.innerHTML = `<option value="0">-- ${window._lang === 'en' ? 'All players' : 'Kaikki pelaajat'} --</option>`;
    PLAYERS.forEach(p => {
      select.innerHTML += `<option value="${p.id}" ${currentVal === p.id ? 'selected' : ''}>${p.emoji} ${p.nick}</option>`;
    });
  }

  const playerId = parseInt(select.value) || 0;

  if (playerId === 0) {
    renderAnalyticsAll();
  } else {
    renderAnalyticsPlayer(playerId);
  }
}

function renderAnalyticsAll() {
  // Summary cards
  const totalMatches = MATCH_HISTORY.length;
  const totalDuration = MATCH_HISTORY.reduce((s, m) => s + m.duration, 0);
  const avgDuration = totalMatches > 0 ? Math.round(totalDuration / totalMatches) : 0;

  // Most active player
  const playCounts = {};
  MATCH_HISTORY.forEach(m => {
    playCounts[m.player1] = (playCounts[m.player1] || 0) + 1;
    playCounts[m.player2] = (playCounts[m.player2] || 0) + 1;
  });
  const mostActiveId = Object.entries(playCounts).sort((a, b) => b[1] - a[1])[0];
  const mostActive = mostActiveId ? getPlayer(parseInt(mostActiveId[0])) : null;

  // Highest win rate (min 5 games)
  const winCounts = {};
  const gameCounts = {};
  MATCH_HISTORY.forEach(m => {
    gameCounts[m.player1] = (gameCounts[m.player1] || 0) + 1;
    gameCounts[m.player2] = (gameCounts[m.player2] || 0) + 1;
    winCounts[m.winner] = (winCounts[m.winner] || 0) + 1;
  });
  let bestWR = null;
  let bestWRval = 0;
  Object.keys(gameCounts).forEach(pid => {
    if (gameCounts[pid] >= 5) {
      const wr = (winCounts[pid] || 0) / gameCounts[pid];
      if (wr > bestWRval) { bestWRval = wr; bestWR = parseInt(pid); }
    }
  });
  const bestPlayer = bestWR ? getPlayer(bestWR) : null;

  const labels = window._lang === 'en'
    ? { total: 'Total matches', avg: 'Avg duration (min)', active: 'Most active', bestWr: 'Best win rate' }
    : { total: 'Pelejä yhteensä', avg: 'Keskim. kesto (min)', active: 'Aktiivisin', bestWr: 'Paras voitto-%' };

  document.getElementById('anSummary').innerHTML = `
    <div class="an-stat-card"><div class="an-stat-val blue">${totalMatches}</div><div class="an-stat-label">${labels.total}</div></div>
    <div class="an-stat-card"><div class="an-stat-val">${avgDuration}</div><div class="an-stat-label">${labels.avg}</div></div>
    <div class="an-stat-card"><div class="an-stat-val">${mostActive ? mostActive.emoji : '-'}</div><div class="an-stat-label">${labels.active}${mostActive ? ': ' + mostActive.nick : ''}</div></div>
    <div class="an-stat-card"><div class="an-stat-val gold">${bestWRval ? Math.round(bestWRval * 100) + '%' : '-'}</div><div class="an-stat-label">${labels.bestWr}${bestPlayer ? ': ' + bestPlayer.nick : ''}</div></div>
  `;

  // Win rate chart per player
  const playerStats = PLAYERS.map(p => {
    const wins = MATCH_HISTORY.filter(m => m.winner === p.id).length;
    const losses = MATCH_HISTORY.filter(m => m.loser === p.id).length;
    const total = wins + losses;
    return { ...p, matchWins: wins, matchLosses: losses, total, wr: total > 0 ? wins / total : 0 };
  }).sort((a, b) => b.wr - a.wr);

  const maxTotal = Math.max(...playerStats.map(p => p.total), 1);

  let wlHtml = `<div class="an-chart-title">${window._lang === 'en' ? 'Win/Loss per player' : 'Voitot/Häviöt per pelaaja'}</div>`;
  wlHtml += '<div class="an-bar-chart">';
  playerStats.forEach(p => {
    const wPct = (p.matchWins / maxTotal) * 100;
    const lPct = (p.matchLosses / maxTotal) * 100;
    wlHtml += `<div class="an-bar-row" onclick="document.getElementById('anPlayerSelect').value='${p.id}';renderAnalytics()">
      <div class="an-bar-label">${p.emoji} ${p.nick}</div>
      <div class="an-bar-track">
        <div class="an-bar-fill win" style="width:${wPct}%">${p.matchWins}</div>
        <div class="an-bar-fill loss" style="width:${lPct}%">${p.matchLosses}</div>
      </div>
      <div class="an-bar-value">${Math.round(p.wr * 100)}%</div>
    </div>`;
  });
  wlHtml += '</div>';
  document.getElementById('anWinLossChart').innerHTML = wlHtml;

  // Games per month
  renderTimelineChart(0);
  document.getElementById('anOpponentsChart').innerHTML = `<div class="an-chart-title">${window._lang === 'en' ? 'Click a player to see details' : 'Klikkaa pelaajaa nähdäksesi tiedot'}</div><div style="text-align:center;padding:40px 0;color:var(--dim);font-size:13px">👆 ${window._lang === 'en' ? 'Select a player from the dropdown or click a bar' : 'Valitse pelaaja ylävalikosta tai klikkaa palkkia'}</div>`;
  document.getElementById('anDrilldown').innerHTML = '';
}

function renderAnalyticsPlayer(playerId) {
  const p = getPlayer(playerId);
  if (!p) return;

  const matches = MATCH_HISTORY.filter(m => m.player1 === playerId || m.player2 === playerId);
  const wins = matches.filter(m => m.winner === playerId);
  const losses = matches.filter(m => m.loser === playerId);
  const wr = matches.length > 0 ? Math.round((wins.length / matches.length) * 100) : 0;
  const avgDur = matches.length > 0 ? Math.round(matches.reduce((s, m) => s + m.duration, 0) / matches.length) : 0;

  // Current streak from match history
  let streak = 0;
  const sorted = [...matches].sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
  for (const m of sorted) {
    if (m.winner === playerId) {
      if (streak < 0) break;
      streak++;
    } else {
      if (streak > 0) break;
      streak--;
    }
  }

  const labels = window._lang === 'en'
    ? { games: 'Games', won: 'Wins', lost: 'Losses', winRate: 'Win rate', avgDur: 'Avg duration', curStreak: 'Streak' }
    : { games: 'Pelejä', won: 'Voitot', lost: 'Häviöt', winRate: 'Voitto-%', avgDur: 'Keskim. kesto', curStreak: 'Putki' };

  document.getElementById('anSummary').innerHTML = `
    <div class="an-stat-card"><div class="an-stat-val blue">${matches.length}</div><div class="an-stat-label">${labels.games}</div></div>
    <div class="an-stat-card"><div class="an-stat-val green">${wins.length}</div><div class="an-stat-label">${labels.won}</div></div>
    <div class="an-stat-card"><div class="an-stat-val red">${losses.length}</div><div class="an-stat-label">${labels.lost}</div></div>
    <div class="an-stat-card"><div class="an-stat-val gold">${wr}%</div><div class="an-stat-label">${labels.winRate}</div></div>
    <div class="an-stat-card"><div class="an-stat-val">${avgDur} min</div><div class="an-stat-label">${labels.avgDur}</div></div>
    <div class="an-stat-card"><div class="an-stat-val" style="color:${streak > 0 ? 'var(--ok)' : streak < 0 ? 'var(--err)' : 'var(--dim)'}">${streak > 0 ? '+' : ''}${streak}</div><div class="an-stat-label">${labels.curStreak}</div></div>
  `;

  // Win/Loss donut
  const wPct = matches.length > 0 ? Math.round((wins.length / matches.length) * 100) : 0;
  const deg = (wPct / 100) * 360;
  let donutHtml = `<div class="an-chart-title">${window._lang === 'en' ? 'Win / Loss ratio' : 'Voitto / Häviö -suhde'}</div>`;
  donutHtml += `<div class="an-donut-wrap">
    <div class="an-donut" style="background: conic-gradient(var(--ok) 0deg ${deg}deg, var(--err) ${deg}deg 360deg);">
      <div class="an-donut-center" style="width:90px;height:90px;background:var(--card);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <div class="an-donut-pct">${wPct}%</div>
        <div class="an-donut-sub">${window._lang === 'en' ? 'win rate' : 'voitto-%'}</div>
      </div>
    </div>
    <div class="an-donut-legend">
      <div class="an-legend-item" onclick="showDrilldown('wins', ${playerId})">
        <div class="an-legend-dot" style="background:var(--ok)"></div>
        <span>${labels.won}</span>
        <span class="an-legend-val" style="color:var(--ok)">${wins.length}</span>
      </div>
      <div class="an-legend-item" onclick="showDrilldown('losses', ${playerId})">
        <div class="an-legend-dot" style="background:var(--err)"></div>
        <span>${labels.lost}</span>
        <span class="an-legend-val" style="color:var(--err)">${losses.length}</span>
      </div>
    </div>
  </div>`;
  document.getElementById('anWinLossChart').innerHTML = donutHtml;

  // Opponents breakdown
  const opponentMap = {};
  matches.forEach(m => {
    const oppId = m.player1 === playerId ? m.player2 : m.player1;
    if (!opponentMap[oppId]) opponentMap[oppId] = { wins: 0, losses: 0 };
    if (m.winner === playerId) opponentMap[oppId].wins++;
    else opponentMap[oppId].losses++;
  });

  const opponents = Object.entries(opponentMap).map(([id, stats]) => {
    const opp = getPlayer(parseInt(id));
    return { ...opp, oppWins: stats.wins, oppLosses: stats.losses, oppTotal: stats.wins + stats.losses };
  }).sort((a, b) => b.oppTotal - a.oppTotal);

  const maxOpp = Math.max(...opponents.map(o => o.oppTotal), 1);

  let oppHtml = `<div class="an-chart-title">${window._lang === 'en' ? 'Record vs opponents' : 'Tilasto vastustajia vastaan'}</div>`;
  oppHtml += '<div class="an-bar-chart">';
  opponents.forEach(o => {
    const wPct = (o.oppWins / maxOpp) * 100;
    const lPct = (o.oppLosses / maxOpp) * 100;
    const isActive = anDrilldown && anDrilldown.type === 'opponent' && anDrilldown.id === o.id;
    oppHtml += `<div class="an-bar-row${isActive ? ' active' : ''}" onclick="showDrilldown('opponent', ${playerId}, ${o.id})">
      <div class="an-bar-label">${o.emoji} ${o.nick}</div>
      <div class="an-bar-track">
        <div class="an-bar-fill win" style="width:${wPct}%">${o.oppWins}</div>
        <div class="an-bar-fill loss" style="width:${lPct}%">${o.oppLosses}</div>
      </div>
      <div class="an-bar-value">${o.oppWins}-${o.oppLosses}</div>
    </div>`;
  });
  oppHtml += '</div>';
  document.getElementById('anOpponentsChart').innerHTML = oppHtml;

  // Timeline
  renderTimelineChart(playerId);

  // If drilldown is active, re-render it
  if (anDrilldown && anDrilldown.playerId === playerId) {
    showDrilldown(anDrilldown.type, anDrilldown.playerId, anDrilldown.id, true);
  } else {
    document.getElementById('anDrilldown').innerHTML = '';
  }
}

function renderTimelineChart(playerId) {
  const matches = playerId === 0 ? MATCH_HISTORY : MATCH_HISTORY.filter(m => m.player1 === playerId || m.player2 === playerId);

  // Group by month
  const monthMap = {};
  matches.forEach(m => {
    const month = m.date.substring(0, 7); // YYYY-MM
    if (!monthMap[month]) monthMap[month] = { wins: 0, losses: 0 };
    if (playerId === 0) {
      monthMap[month].wins++;
    } else {
      if (m.winner === playerId) monthMap[month].wins++;
      else monthMap[month].losses++;
    }
  });

  const months = Object.keys(monthMap).sort();
  const maxMonth = Math.max(...months.map(m => monthMap[m].wins + monthMap[m].losses), 1);

  const monthNames = window._lang === 'en'
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'];

  const title = playerId === 0
    ? (window._lang === 'en' ? 'Games per month' : 'Pelejä kuukausittain')
    : (window._lang === 'en' ? 'Monthly performance' : 'Kuukausittainen suoritus');

  let html = `<div class="an-chart-title">${title}</div>`;
  html += '<div class="an-timeline">';
  months.forEach(m => {
    const data = monthMap[m];
    const total = data.wins + data.losses;
    const wPct = (data.wins / maxMonth) * 100;
    const lPct = (data.losses / maxMonth) * 100;
    const monthIdx = parseInt(m.split('-')[1]) - 1;
    const label = monthNames[monthIdx] + ' ' + m.split('-')[0].substring(2);
    const isActive = anDrilldown && anDrilldown.type === 'month' && anDrilldown.id === m;

    html += `<div class="an-tl-row${isActive ? ' active' : ''}" onclick="showDrilldown('month', ${playerId}, '${m}')">
      <div class="an-tl-label">${label}</div>
      <div class="an-tl-bar">
        <div class="an-tl-seg win" style="width:${wPct}%"></div>
        ${playerId > 0 ? `<div class="an-tl-seg loss" style="width:${lPct}%"></div>` : ''}
      </div>
      <div class="an-tl-count">${total} ${window._lang === 'en' ? 'games' : 'peliä'}</div>
    </div>`;
  });
  html += '</div>';
  document.getElementById('anTimelineChart').innerHTML = html;
}

function showDrilldown(type, playerId, id, skipRerender) {
  anDrilldown = { type, playerId, id };

  let matches = [];
  let title = '';

  const p = playerId > 0 ? getPlayer(playerId) : null;
  const pLabel = p ? p.nick : '';

  if (type === 'opponent' && playerId > 0) {
    const opp = getPlayer(id);
    matches = MATCH_HISTORY.filter(m =>
      (m.player1 === playerId || m.player2 === playerId) &&
      (m.player1 === id || m.player2 === id)
    );
    title = `${pLabel} vs ${opp.nick} — ${window._lang === 'en' ? 'all matches' : 'kaikki ottelut'}`;
  } else if (type === 'month') {
    const allMatches = playerId > 0
      ? MATCH_HISTORY.filter(m => m.player1 === playerId || m.player2 === playerId)
      : MATCH_HISTORY;
    matches = allMatches.filter(m => m.date.startsWith(id));
    title = `${pLabel ? pLabel + ' — ' : ''}${id} ${window._lang === 'en' ? 'matches' : 'ottelut'}`;
  } else if (type === 'wins' && playerId > 0) {
    matches = MATCH_HISTORY.filter(m => m.winner === playerId);
    title = `${pLabel} — ${window._lang === 'en' ? 'all wins' : 'kaikki voitot'}`;
  } else if (type === 'losses' && playerId > 0) {
    matches = MATCH_HISTORY.filter(m => m.loser === playerId);
    title = `${pLabel} — ${window._lang === 'en' ? 'all losses' : 'kaikki häviöt'}`;
  }

  matches.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

  let html = `<div class="an-dd-card">`;
  html += `<div class="an-dd-header">
    <div class="an-dd-title">${title} (${matches.length})</div>
    <button class="an-dd-close" onclick="closeDrilldown()">&times;</button>
  </div>`;
  html += '<div class="an-dd-matches">';

  if (matches.length === 0) {
    html += `<div style="text-align:center;padding:16px;color:var(--dim)">${window._lang === 'en' ? 'No matches found' : 'Ei otteluita'}</div>`;
  } else {
    matches.forEach(m => {
      const mp1 = getPlayer(m.player1);
      const mp2 = getPlayer(m.player2);
      const isWin = playerId > 0 && m.winner === playerId;
      const isLoss = playerId > 0 && m.loser === playerId;
      const cls = isWin ? ' won' : isLoss ? ' lost' : '';
      const scoreCls = isWin ? ' won' : isLoss ? ' lost' : '';

      html += `<div class="an-dd-match${cls}">
        <div class="an-dd-match-date">${m.date.substring(5)}</div>
        <div class="an-dd-match-players">${mp1.emoji} ${mp1.nick} vs ${mp2.emoji} ${mp2.nick}</div>
        <div class="an-dd-match-score${scoreCls}">${m.score}</div>
        <div class="an-dd-match-dur">${m.duration} min</div>
      </div>`;
    });
  }

  html += '</div></div>';
  document.getElementById('anDrilldown').innerHTML = html;

  // Scroll to drilldown
  if (!skipRerender) {
    document.getElementById('anDrilldown').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function closeDrilldown() {
  anDrilldown = null;
  document.getElementById('anDrilldown').innerHTML = '';
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  window._applyLang(window._lang);
  renderCalendar();

  // Update online count randomly
  const onlineEl = document.getElementById('onlineCount');
  if (onlineEl) {
    setInterval(() => {
      const count = 5 + Math.floor(Math.random() * 6);
      onlineEl.textContent = `${count} online`;
    }, 10000);
  }
});
