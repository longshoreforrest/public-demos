// === Sovelluksen tila ===
const BUDDY_COLORS = ['#2E7D32','#1565C0','#E65100','#6A1B9A','#00838F','#D32F2F','#F9A825','#558B2F','#AD1457','#0277BD','#4E342E','#37474F','#00695C','#283593','#BF360C','#1B5E20','#4527A0','#E65100','#01579B','#33691E'];

// Luo esimerkkipäivämäärät suhteessa tähän päivään
function _exDays(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return formatDate(d);
}

const GROUP_ICONS = ['🍻','💼','👨‍👩‍👧','🏌️','☀️','🏆','🎯','⛳','🤝','🌟','🔥','💚'];

const EXAMPLE_BUDDY_GROUPS = [
  {
    name: 'Keskiviikkoklubi',
    icon: '🍻',
    buddies: [
      { name: 'Minä', color: BUDDY_COLORS[0] },
      { name: 'Matti V.', color: BUDDY_COLORS[1] },
      { name: 'Liisa K.', color: BUDDY_COLORS[2] },
      { name: 'Jukka P.', color: BUDDY_COLORS[3] },
    ],
    pollSlots: [
      { date: _exDays(3), time: '16:00', courseId: 'tammer' },
      { date: _exDays(5), time: '09:00', courseId: 'pirkkala' },
      { date: _exDays(10), time: '16:30', courseId: 'tammer' },
    ],
    pollVotes: {
      '0-0': true, '0-1': true, '0-2': false, '0-3': true,
      '1-0': true, '1-1': false, '1-2': true, '1-3': false,
      '2-0': true, '2-1': true, '2-2': true, '2-3': true,  // kaikki!
    },
  },
  {
    name: 'Firmaporukka',
    icon: '💼',
    buddies: [
      { name: 'Minä', color: BUDDY_COLORS[0] },
      { name: 'Tero H.', color: BUDDY_COLORS[4] },
      { name: 'Sanna M.', color: BUDDY_COLORS[5] },
      { name: 'Antti R.', color: BUDDY_COLORS[6] },
      { name: 'Katja L.', color: BUDDY_COLORS[7] },
      { name: 'Pekka S.', color: BUDDY_COLORS[8] },
    ],
    pollSlots: [
      { date: _exDays(6), time: '08:30', courseId: 'pirkkala' },
      { date: _exDays(13), time: '09:00', courseId: 'lakeside' },
    ],
    pollVotes: {
      '0-0': true, '0-1': true, '0-2': true, '0-3': true, '0-4': true, '0-5': false,   // 5/6
      '1-0': true, '1-1': true, '1-2': true, '1-3': true, '1-4': true, '1-5': true,    // kaikki!
    },
  },
  {
    name: 'Perhegolfarit',
    icon: '👨‍👩‍👧',
    buddies: [
      { name: 'Minä', color: BUDDY_COLORS[0] },
      { name: 'Maija', color: BUDDY_COLORS[9] },
      { name: 'Eemil', color: BUDDY_COLORS[10] },
    ],
    pollSlots: [
      { date: _exDays(2), time: '10:00', courseId: 'hiisi' },
      { date: _exDays(4), time: '14:00', courseId: 'pirkanmaan-golf' },
      { date: _exDays(9), time: '11:00', courseId: 'hiisi' },
    ],
    pollVotes: {
      '0-0': true, '0-1': true, '0-2': false,
      '1-0': true, '1-1': true, '1-2': true,   // kaikki!
      '2-0': false, '2-1': true, '2-2': true,
    },
  },
];

const state = {
  currentDate: new Date(),
  calendarMode: 'week', // 'week' tai 'month'
  playerCount: 4,
  selectedCourses: new Set(GOLF_COURSES.map(c => c.id)),
  availabilityData: null,
  map: null,
  mapMarkers: [],
  // Kaveriäänestys — ryhmät
  buddyGroups: EXAMPLE_BUDDY_GROUPS.map(g => ({
    name: g.name,
    icon: g.icon,
    buddies: g.buddies,
    pollSlots: g.pollSlots,
    pollVotes: { ...g.pollVotes },
  })),
  activeGroupIndex: 0,
  // Aktiivinen data (ladataan ryhmästä)
  buddies: EXAMPLE_BUDDY_GROUPS[0].buddies,
  pollSlots: EXAMPLE_BUDDY_GROUPS[0].pollSlots,
  pollVotes: { ...EXAMPLE_BUDDY_GROUPS[0].pollVotes },
  // Kenttäfiltterit äänestyksessä
  pollCourseFilters: new Set(), // tyhjä = kaikki näkyvissä
  // Valittu aikaslot detaljinäkymää varten
  pollSelectedSlot: null, // index tai null
};

// Generoi 60 päivän saatavuusdata
const dataStart = new Date();
dataStart.setDate(dataStart.getDate() - 7);
state.availabilityData = generateAvailability(dataStart, 60);

// === Alustus ===
document.addEventListener('DOMContentLoaded', () => {
  initNavTabs();
  initPlayerSlider();
  initCourseList();
  initCalendarControls();
  renderCalendar();
  initPopup();
  initPoll();
});

// === Navigaatiotabit ===
function initNavTabs() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      const viewId = tab.dataset.view + '-view';
      document.getElementById(viewId).classList.add('active');

      if (tab.dataset.view === 'map' && !state.map) {
        setTimeout(initMap, 100);
      }
    });
  });
}

// === Pelaajamäärä-slider ===
function initPlayerSlider() {
  const slider = document.getElementById('player-count');
  const display = document.getElementById('player-count-display');

  slider.addEventListener('input', () => {
    state.playerCount = parseInt(slider.value);
    display.textContent = state.playerCount;
    renderCalendar();
  });
}

// === Kenttälista sivupaneelissa ===
function initCourseList() {
  const list = document.getElementById('course-list');
  const selectAll = document.getElementById('select-all-courses');

  GOLF_COURSES.forEach(course => {
    const li = document.createElement('li');
    li.className = 'course-item';
    li.innerHTML = `
      <input type="checkbox" checked data-course="${course.id}">
      <span class="course-color-dot" style="background:${course.color}"></span>
      <div class="course-item-info">
        <div class="course-item-name">${course.name}</div>
        <div class="course-item-city">${course.city} &middot; ${course.holes} reikää</div>
      </div>
      <a href="${course.website}" target="_blank" class="course-item-link" title="Avaa kentän sivut">&#8599;</a>
    `;
    list.appendChild(li);

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        state.selectedCourses.add(course.id);
      } else {
        state.selectedCourses.delete(course.id);
      }
      renderCalendar();
      updateSelectAll();
    });
  });

  selectAll.addEventListener('change', () => {
    const checked = selectAll.checked;
    document.querySelectorAll('#course-list input[type="checkbox"]').forEach(cb => {
      cb.checked = checked;
      const id = cb.dataset.course;
      if (checked) {
        state.selectedCourses.add(id);
      } else {
        state.selectedCourses.delete(id);
      }
    });
    renderCalendar();
  });
}

function updateSelectAll() {
  const all = document.querySelectorAll('#course-list input[type="checkbox"]');
  const checked = document.querySelectorAll('#course-list input[type="checkbox"]:checked');
  document.getElementById('select-all-courses').checked = all.length === checked.length;
}

// === Kalenterin kontrollit ===
function initCalendarControls() {
  document.getElementById('prev-period').addEventListener('click', () => {
    if (state.calendarMode === 'week') {
      state.currentDate.setDate(state.currentDate.getDate() - 7);
    } else {
      state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    }
    renderCalendar();
  });

  document.getElementById('next-period').addEventListener('click', () => {
    if (state.calendarMode === 'week') {
      state.currentDate.setDate(state.currentDate.getDate() + 7);
    } else {
      state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    }
    renderCalendar();
  });

  document.getElementById('today-btn').addEventListener('click', () => {
    state.currentDate = new Date();
    renderCalendar();
  });

  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-view').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.calendarMode = btn.dataset.calendar;
      renderCalendar();
    });
  });
}

// === Kalenterin renderöinti ===
function renderCalendar() {
  if (state.calendarMode === 'week') {
    renderWeekView();
  } else {
    renderMonthView();
  }
}

// Laske montako valittua kenttää mahtuu tiettyyn aikaan
function countAvailableCourses(dateStr, timeStr) {
  const pc = state.playerCount;
  return GOLF_COURSES.filter(c =>
    state.selectedCourses.has(c.id) &&
    (state.availabilityData[c.id]?.[dateStr]?.[timeStr] ?? 0) >= pc
  ).length;
}

// Valitse väri vapaiden kenttien määrän perusteella
function availColor(count, total) {
  if (count === 0) return 'var(--avail-none)';
  const ratio = count / Math.max(total, 1);
  if (ratio > 0.5) return 'var(--avail-high)';
  if (ratio > 0.2) return 'var(--avail-medium)';
  return 'var(--avail-low)';
}

function availClass(count, total) {
  if (count === 0) return 'none';
  const ratio = count / Math.max(total, 1);
  if (ratio > 0.5) return 'high';
  if (ratio > 0.2) return 'medium';
  return 'low';
}

// --- Viikkonäkymä (yksinkertaistettu) ---
function renderWeekView() {
  const container = document.getElementById('calendar-container');
  const today = new Date();
  const todayStr = formatDate(today);

  const monday = getMonday(state.currentDate);
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    weekDates.push(d);
  }

  const startStr = `${weekDates[0].getDate()}.${weekDates[0].getMonth() + 1}`;
  const endStr = `${weekDates[6].getDate()}.${weekDates[6].getMonth() + 1}.${weekDates[6].getFullYear()}`;
  document.getElementById('calendar-title').textContent = `${startStr} - ${endStr}`;

  const timeSlots = [];
  for (let h = 7; h < 19; h++) {
    for (let m = 0; m < 60; m += 30) {
      timeSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  const totalCourses = GOLF_COURSES.filter(c => state.selectedCourses.has(c.id)).length;

  let html = '<div class="week-grid">';

  // Header
  html += '<div class="week-header">';
  html += '<div class="week-header-cell corner">Aika</div>';
  weekDates.forEach(d => {
    const dateStr = formatDate(d);
    const isToday = dateStr === todayStr;
    html += `<div class="week-header-cell${isToday ? ' today' : ''}">
      ${WEEKDAYS_FI[d.getDay()]}
      <span class="week-header-date">${d.getDate()}.${d.getMonth() + 1}</span>
    </div>`;
  });
  html += '</div>';

  // Aikariviit - yksi selkeä värikoodi per solu
  timeSlots.forEach(time => {
    html += `<div class="week-time-label">${time}</div>`;
    weekDates.forEach(d => {
      const dateStr = formatDate(d);
      const count = countAvailableCourses(dateStr, time);
      const cls = availClass(count, totalCourses);
      const bg = availColor(count, totalCourses);

      html += `<div class="week-cell week-cell-${cls}" data-date="${dateStr}" data-time="${time}" style="background:${bg}" title="${count}/${totalCourses} kenttää vapaana">`;
      if (count > 0) {
        html += `<span class="cell-count">${count}</span>`;
      }
      html += `</div>`;
    });
  });

  html += '</div>';
  container.innerHTML = html;

  container.querySelectorAll('.week-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      showSlotPopup(cell.dataset.date, cell.dataset.time);
    });
  });
}

// --- Kuukausinäkymä (yksinkertaistettu) ---
function renderMonthView() {
  const container = document.getElementById('calendar-container');
  const today = new Date();
  const todayStr = formatDate(today);

  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  document.getElementById('calendar-title').textContent = `${MONTHS_FI[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const dow = firstDay.getDay();
  const offset = dow === 0 ? 6 : dow - 1;
  const startDay = new Date(firstDay);
  startDay.setDate(startDay.getDate() - offset);

  const activeCourses = GOLF_COURSES.filter(c => state.selectedCourses.has(c.id));
  const totalCourses = activeCourses.length;

  let html = '<div class="month-grid">';

  ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'].forEach(day => {
    html += `<div class="month-header-cell">${day}</div>`;
  });

  const currentDay = new Date(startDay);
  for (let i = 0; i < 42; i++) {
    const dateStr = formatDate(currentDay);
    const isOther = currentDay.getMonth() !== month;
    const isToday = dateStr === todayStr;

    // Laske päivän yhteenveto: montako aikaa löytyy missä mahtuu
    let availableTimeCount = 0;
    let totalTimeCount = 0;
    for (let h = 7; h < 19; h++) {
      for (let m = 0; m < 60; m += 30) {
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        totalTimeCount++;
        const count = countAvailableCourses(dateStr, timeStr);
        if (count > 0) availableTimeCount++;
      }
    }
    const dayPercent = totalTimeCount > 0 ? Math.round((availableTimeCount / totalTimeCount) * 100) : 0;
    const dayCls = availClass(dayPercent, 100);

    let classes = 'month-cell';
    if (isOther) classes += ' other-month';
    if (isToday) classes += ' today';

    // Väri taustaksi kevyesti
    const bgOpacity = dayPercent === 0 ? '' : `background: ${availColor(dayPercent, 100)}22;`;

    html += `<div class="${classes}" data-date="${dateStr}" style="${bgOpacity}">
      <div class="month-day-number">${currentDay.getDate()}</div>
      <div class="month-day-summary">`;

    if (dayPercent > 0) {
      // Näytä selkeä ympyrä prosentilla
      html += `<div class="month-avail-badge ${dayCls}">${dayPercent}%</div>`;
      html += `<div class="month-avail-text">${availableTimeCount}/${totalTimeCount} aikaa</div>`;
    } else {
      html += `<div class="month-avail-text empty">Täynnä</div>`;
    }

    html += `</div></div>`;

    currentDay.setDate(currentDay.getDate() + 1);
  }

  html += '</div>';
  container.innerHTML = html;

  container.querySelectorAll('.month-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      showDayPopup(cell.dataset.date);
    });
  });
}

// === Popup: tietyn ajan vapaat kentät ===
function showSlotPopup(dateStr, timeStr) {
  const popup = document.getElementById('slot-popup');
  const title = document.getElementById('popup-title');
  const body = document.getElementById('popup-body');

  const date = parseDate(dateStr);
  const dayName = WEEKDAYS_FULL_FI[date.getDay()];
  title.textContent = `${dayName} ${date.getDate()}.${date.getMonth() + 1}. klo ${timeStr} \u2014 ${state.playerCount} pelaajaa`;

  const available = getAvailableCourses(dateStr, timeStr, state.availabilityData, state.playerCount)
    .filter(c => state.selectedCourses.has(c.id));

  if (available.length === 0) {
    body.innerHTML = `<div class="popup-no-courses">Ei kenttää jossa mahtuu ${state.playerCount} pelaajaa tällä ajankohdalla.</div>`;
  } else {
    body.innerHTML = available.map(course => {
      const groups = Math.floor(course.slots / 4);
      const extra = course.slots % 4;
      let slotClass;
      if (course.slots >= 12) slotClass = 'high';
      else if (course.slots >= 6) slotClass = 'medium';
      else slotClass = 'low';

      return `<div class="popup-course-item">
        <span class="popup-course-dot" style="background:${course.color}"></span>
        <div class="popup-course-info">
          <div class="popup-course-name">${course.name}</div>
          <div class="popup-course-city">${course.city} &middot; ${course.holes} reikää &middot; Par ${course.par}</div>
          <a href="${course.website}" target="_blank" class="popup-course-link">Avaa kentän sivut &#8599;</a>
        </div>
        <div class="popup-slots-detail">
          <span class="popup-slots ${slotClass}">${course.slots} paikkaa</span>
          <span class="popup-groups">${groups} ryhm${groups === 1 ? 'ä' : 'ää'}${extra ? ' + ' + extra : ''}</span>
        </div>
        <button class="btn btn-add-poll" onclick="addToPollFromPopup('${dateStr}','${timeStr}','${course.id}')">+ Ehdota</button>
      </div>`;
    }).join('');
  }

  popup.classList.remove('hidden');
}

// === Popup: koko päivän yhteenveto ===
function showDayPopup(dateStr) {
  const popup = document.getElementById('slot-popup');
  const title = document.getElementById('popup-title');
  const body = document.getElementById('popup-body');

  const date = parseDate(dateStr);
  const dayName = WEEKDAYS_FULL_FI[date.getDay()];
  title.textContent = `${dayName} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} \u2014 ${state.playerCount} pelaajaa`;

  const activeCourses = GOLF_COURSES.filter(c => state.selectedCourses.has(c.id));

  // Kenttäkohtainen yhteenveto
  let html = '<div style="margin-bottom:16px">';
  activeCourses.forEach(course => {
    const summary = getDayAvailabilitySummary(course.id, dateStr, state.availabilityData, state.playerCount);
    let slotClass;
    if (summary.percent > 60) slotClass = 'high';
    else if (summary.percent > 30) slotClass = 'medium';
    else slotClass = 'low';

    html += `<div class="popup-course-item">
      <span class="popup-course-dot" style="background:${course.color}"></span>
      <div class="popup-course-info">
        <div class="popup-course-name">${course.name}</div>
        <div class="popup-course-city">${course.city} &middot; ${course.holes} reikää</div>
        <a href="${course.website}" target="_blank" class="popup-course-link">Avaa kentän sivut &#8599;</a>
      </div>
      <span class="popup-slots ${slotClass}">${summary.freeSlots}/${summary.totalSlots} aikaa</span>
    </div>`;
  });
  html += '</div>';

  // Aikataulu - vain ajat joissa mahtuu
  html += `<h4 style="font-size:14px;color:var(--green-dark);margin-bottom:8px;">Ajat joihin mahtuu ${state.playerCount} pelaajaa</h4>`;
  html += '<div class="popup-time-grid">';

  for (let h = 7; h < 19; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const available = activeCourses.filter(course => {
        const slots = state.availabilityData[course.id]?.[dateStr]?.[time];
        return slots && slots >= state.playerCount;
      });

      if (available.length > 0) {
        html += `<div class="popup-time-label">${time}</div>`;
        html += '<div class="popup-time-courses">';
        available.forEach(course => {
          const slots = state.availabilityData[course.id][dateStr][time];
          html += `<span class="popup-time-chip" style="background:${course.color}22;color:${course.color};border:1px solid ${course.color}44">${course.name.split(' ')[0]} (${slots})</span>`;
        });
        html += '</div>';
      }
    }
  }

  html += '</div>';
  body.innerHTML = html;
  popup.classList.remove('hidden');
}

// === Popup: sulkeminen ===
function initPopup() {
  const popup = document.getElementById('slot-popup');
  popup.querySelector('.slot-popup-overlay').addEventListener('click', () => {
    popup.classList.add('hidden');
  });
  popup.querySelector('.slot-popup-close').addEventListener('click', () => {
    popup.classList.add('hidden');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.classList.add('hidden');
    }
  });
}

// === Karttanäkymä ===
function initMap() {
  state.map = L.map('map').setView([61.4700, 23.7500], 10);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(state.map);

  GOLF_COURSES.forEach(course => {
    const todayStr = formatDate(new Date());
    const summary = getDayAvailabilitySummary(course.id, todayStr, state.availabilityData, state.playerCount);

    const icon = L.divIcon({
      className: 'golf-marker',
      html: `<div style="
        background: ${course.color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
      ">&#9971;</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20]
    });

    const marker = L.marker([course.lat, course.lng], { icon }).addTo(state.map);

    const popupContent = `
      <div class="golf-popup">
        <div class="golf-popup-title">${course.name}</div>
        <div class="golf-popup-city">${course.city}</div>
        <div class="golf-popup-details">
          <strong>Osoite:</strong> ${course.address}<br>
          <strong>Reikiä:</strong> ${course.holes} &middot; Par ${course.par}<br>
          <strong>Puhelin:</strong> ${course.phone}<br>
          <strong>Tänään vapaata (${state.playerCount} pel.):</strong> ${summary.freeSlots}/${summary.totalSlots} aikaa (${summary.percent}%)
        </div>
        <div class="golf-popup-desc">${course.description}</div>
        <a href="${course.website}" target="_blank" class="golf-popup-link">Avaa kentän sivut &#8599;</a>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'golf-popup'
    });

    state.mapMarkers.push(marker);
  });

  const bounds = L.latLngBounds(GOLF_COURSES.map(c => [c.lat, c.lng]));
  state.map.fitBounds(bounds, { padding: [40, 40] });
}

// Lisää aika kalenterista suoraan äänestykseen
function addToPollFromPopup(date, time, courseId) {
  state.pollSlots.push({ date, time, courseId });
  renderPoll();
  // Näytä pieni vahvistus
  const btn = event.target;
  btn.textContent = 'Lisätty!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '+ Ehdota';
    btn.disabled = false;
  }, 1500);
}

// === Kaveriäänestys ===
function saveActiveGroupState() {
  const g = state.buddyGroups[state.activeGroupIndex];
  g.buddies = state.buddies;
  g.pollSlots = state.pollSlots;
  g.pollVotes = { ...state.pollVotes };
}

function loadGroup(index) {
  // Tallenna nykyinen ryhmä ensin
  if (state.buddyGroups[state.activeGroupIndex]) {
    saveActiveGroupState();
  }
  state.activeGroupIndex = index;
  const g = state.buddyGroups[index];
  state.buddies = g.buddies;
  state.pollSlots = g.pollSlots;
  state.pollVotes = { ...g.pollVotes };
  state.playerCount = g.buddies.length;
  state.pollCourseFilters.clear();
  state.pollSelectedSlot = null;

  const slider = document.getElementById('player-count');
  if (slider) {
    slider.value = state.playerCount;
    const display = document.getElementById('player-count-display');
    if (display) display.textContent = state.playerCount;
  }

  renderGroupSelector();
  renderBuddyList();
  renderPoll();
}

function renderGroupSelector() {
  const container = document.getElementById('buddy-group-selector');
  if (!container) return;

  container.innerHTML = state.buddyGroups.map((g, i) => {
    const isActive = i === state.activeGroupIndex;
    const memberCount = g.buddies.length;
    const voteCount = g.pollSlots.length;
    // Laske paras äänestystulos
    let bestVotes = 0;
    g.pollSlots.forEach((_, si) => {
      let count = 0;
      g.buddies.forEach((_, bi) => { if (g.pollVotes[`${si}-${bi}`]) count++; });
      if (count > bestVotes) bestVotes = count;
    });
    const allIn = bestVotes === memberCount && voteCount > 0;

    return `<button class="buddy-group-btn ${isActive ? 'active' : ''}" onclick="loadGroup(${i})">
      <span class="buddy-group-icon">${g.icon}</span>
      <span class="buddy-group-info">
        <span class="buddy-group-name">${g.name}</span>
        <span class="buddy-group-meta">${memberCount} kaveria · ${voteCount} ehdotusta${allIn ? ' · ✅ Kaikki pääsee!' : ''}</span>
      </span>
    </button>`;
  }).join('');

  renderGroupEditBar();
}

// === Ryhmien hallinta ===
function renderGroupEditBar() {
  const bar = document.getElementById('group-edit-bar');
  if (!bar || state.buddyGroups.length === 0) { if (bar) bar.innerHTML = ''; return; }

  const g = state.buddyGroups[state.activeGroupIndex];
  bar.innerHTML = `<div class="group-edit-actions">
    <button class="btn-group-action" onclick="startRenameGroup()" title="Muokkaa nimeä">&#9998; Nimeä</button>
    <button class="btn-group-action" onclick="startChangeIcon()" title="Vaihda ikoni">&#127912; Ikoni</button>
    <button class="btn-group-action danger" onclick="deleteGroup()" title="Poista ryhmä">&#128465; Poista</button>
  </div>`;
}

let _selectedNewIcon = GROUP_ICONS[0];

function showNewGroupForm() {
  const form = document.getElementById('new-group-form');
  form.classList.remove('hidden');
  document.getElementById('new-group-name').value = '';
  document.getElementById('new-group-name').focus();
  _selectedNewIcon = GROUP_ICONS[3]; // default 🏌️
  renderIconPicker('icon-picker', _selectedNewIcon, (icon) => { _selectedNewIcon = icon; });
}

function hideNewGroupForm() {
  document.getElementById('new-group-form').classList.add('hidden');
}

function renderIconPicker(containerId, selectedIcon, onSelect) {
  const el = document.getElementById(containerId);
  el.innerHTML = GROUP_ICONS.map(icon =>
    `<button class="icon-picker-btn ${icon === selectedIcon ? 'selected' : ''}" type="button">${icon}</button>`
  ).join('');
  el.querySelectorAll('.icon-picker-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      onSelect(GROUP_ICONS[i]);
      el.querySelectorAll('.icon-picker-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
}

function createNewGroup() {
  const nameInput = document.getElementById('new-group-name');
  const name = nameInput.value.trim();
  if (!name) { nameInput.focus(); return; }

  saveActiveGroupState();

  const newGroup = {
    name,
    icon: _selectedNewIcon,
    buddies: [{ name: 'Minä', color: BUDDY_COLORS[0] }],
    pollSlots: [],
    pollVotes: {},
  };

  state.buddyGroups.push(newGroup);
  hideNewGroupForm();
  loadGroup(state.buddyGroups.length - 1);
}

function startRenameGroup() {
  const g = state.buddyGroups[state.activeGroupIndex];
  const bar = document.getElementById('group-edit-bar');
  bar.innerHTML = `<div class="group-rename-row">
    <input type="text" id="rename-input" class="buddy-input" value="${g.name}">
    <button class="btn btn-today" onclick="confirmRename()">OK</button>
    <button class="btn btn-nav" onclick="renderGroupEditBar()">&#10005;</button>
  </div>`;
  const input = document.getElementById('rename-input');
  input.focus();
  input.select();
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirmRename();
    if (e.key === 'Escape') renderGroupEditBar();
  });
}

function confirmRename() {
  const input = document.getElementById('rename-input');
  const name = input.value.trim();
  if (!name) return;
  state.buddyGroups[state.activeGroupIndex].name = name;
  renderGroupSelector();
}

function startChangeIcon() {
  const g = state.buddyGroups[state.activeGroupIndex];
  const bar = document.getElementById('group-edit-bar');
  bar.innerHTML = `<div style="margin-bottom:6px">
    <div id="edit-icon-picker" class="icon-picker"></div>
    <div class="new-group-actions" style="margin-top:6px">
      <button class="btn btn-today" onclick="renderGroupSelector()">Valmis</button>
    </div>
  </div>`;
  renderIconPicker('edit-icon-picker', g.icon, (icon) => {
    state.buddyGroups[state.activeGroupIndex].icon = icon;
    renderGroupSelector();
  });
}

function deleteGroup() {
  if (state.buddyGroups.length <= 1) return;
  const g = state.buddyGroups[state.activeGroupIndex];
  if (!confirm(`Poistetaanko ryhmä "${g.name}"?`)) return;

  state.buddyGroups.splice(state.activeGroupIndex, 1);
  const newIndex = Math.min(state.activeGroupIndex, state.buddyGroups.length - 1);
  state.activeGroupIndex = newIndex;
  const ng = state.buddyGroups[newIndex];
  state.buddies = ng.buddies;
  state.pollSlots = ng.pollSlots;
  state.pollVotes = { ...ng.pollVotes };
  state.playerCount = ng.buddies.length;
  state.pollCourseFilters.clear();
  state.pollSelectedSlot = null;

  renderGroupSelector();
  renderBuddyList();
  renderPoll();
  renderPollDayDetail();
}

// === Äänestyksen kalenteri-alinäkymä ===
function switchPollSubView(view) {
  document.querySelectorAll('.poll-view-toggle .btn-view').forEach(b => {
    b.classList.toggle('active', b.dataset.pollView === view);
  });
  document.querySelectorAll('.poll-sub-view').forEach(v => v.classList.remove('active'));
  const target = view === 'calendar' ? 'poll-calendar-view' : 'poll-matrix-view';
  document.getElementById(target).classList.add('active');
  if (view === 'calendar') renderPollMiniCalendar();
}

function renderPollMiniCalendar() {
  const container = document.getElementById('poll-mini-calendar');
  if (!container) return;

  // Selvitä kuukausi jossa on eniten ehdotuksia
  const monthCounts = {};
  state.pollSlots.forEach(slot => {
    const key = slot.date.substring(0, 7); // YYYY-MM
    monthCounts[key] = (monthCounts[key] || 0) + 1;
  });
  let bestMonth = formatDate(new Date()).substring(0, 7);
  let bestCount = 0;
  Object.entries(monthCounts).forEach(([m, c]) => { if (c > bestCount) { bestMonth = m; bestCount = c; } });

  const [year, month] = bestMonth.split('-').map(Number);
  const todayStr = formatDate(new Date());

  const firstDay = new Date(year, month - 1, 1);
  const dow = firstDay.getDay();
  const offset = dow === 0 ? 6 : dow - 1;
  const startDay = new Date(firstDay);
  startDay.setDate(startDay.getDate() - offset);

  // Ryhmittele ehdotukset päivän mukaan
  const slotsByDate = {};
  state.pollSlots.forEach((slot, si) => {
    if (!slotsByDate[slot.date]) slotsByDate[slot.date] = [];
    // Laske äänet
    let votes = 0;
    state.buddies.forEach((_, bi) => { if (state.pollVotes[`${si}-${bi}`]) votes++; });
    slotsByDate[slot.date].push({ ...slot, si, votes });
  });

  let html = `<div class="poll-mini-cal-header">
    <span class="poll-mini-cal-title">${MONTHS_FI[month - 1]} ${year}</span>
    <span style="font-size:12px;color:var(--text-light)">${state.pollSlots.length} ehdotusta</span>
  </div>`;
  html += '<div class="poll-mini-cal-grid">';

  ['Ma','Ti','Ke','To','Pe','La','Su'].forEach(d => {
    html += `<div class="poll-mini-cal-dow">${d}</div>`;
  });

  const cur = new Date(startDay);
  for (let i = 0; i < 42; i++) {
    const dateStr = formatDate(cur);
    const isOther = cur.getMonth() !== month - 1;
    const isToday = dateStr === todayStr;
    const daySlots = slotsByDate[dateStr] || [];

    let classes = 'poll-mini-cal-day';
    if (isOther) classes += ' other';
    if (isToday) classes += ' today';
    if (daySlots.length > 0) classes += ' has-slots';

    html += `<div class="${classes}">
      <span class="poll-mini-cal-day-num">${cur.getDate()}</span>`;

    if (daySlots.length > 0) {
      html += '<div class="poll-mini-cal-slots">';
      daySlots.forEach(s => {
        const course = GOLF_COURSES.find(c => c.id === s.courseId);
        const bg = course ? course.color + '22' : '#eee';
        const fg = course ? course.color : '#666';
        const label = s.time + (course ? ' ' + course.name.split(' ')[0].substring(0, 6) : '');
        html += `<div class="poll-mini-cal-slot" style="background:${bg};color:${fg}" onclick="switchPollSubView('matrix');selectPollSlot(${s.si})" title="${s.time} - ${course ? course.name : 'Mikä tahansa'}: ${s.votes}/${state.buddies.length} pääsee">
          <span class="poll-mini-cal-votes">${s.votes}/${state.buddies.length}</span> ${label}
        </div>`;
      });
      html += '</div>';
    }

    html += '</div>';
    cur.setDate(cur.getDate() + 1);
  }

  html += '</div>';
  container.innerHTML = html;
}

function initPoll() {
  renderGroupSelector();
  initBuddyList();
  initPollControls();
  renderPoll();
}

function initBuddyList() {
  renderBuddyList();

  document.getElementById('buddy-add-btn').addEventListener('click', addBuddy);
  document.getElementById('buddy-name-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBuddy();
  });
}

function addBuddy() {
  const input = document.getElementById('buddy-name-input');
  const name = input.value.trim();
  if (!name) return;
  const colorIdx = state.buddies.length % BUDDY_COLORS.length;
  state.buddies.push({ name, color: BUDDY_COLORS[colorIdx] });
  input.value = '';
  // Päivitä slider max ja arvo
  updatePlayerCountFromBuddies();
  saveActiveGroupState();
  renderGroupSelector();
  renderBuddyList();
  renderPoll();
}

function removeBuddy(index) {
  state.buddies.splice(index, 1);
  // Siivoa vanhat äänet
  const newVotes = {};
  Object.entries(state.pollVotes).forEach(([key, val]) => {
    const [si, bi] = key.split('-').map(Number);
    if (bi < state.buddies.length) {
      newVotes[key] = val;
    }
  });
  state.pollVotes = newVotes;
  updatePlayerCountFromBuddies();
  saveActiveGroupState();
  renderGroupSelector();
  renderBuddyList();
  renderPoll();
}

function updatePlayerCountFromBuddies() {
  const count = state.buddies.length;
  state.playerCount = count;
  const slider = document.getElementById('player-count');
  slider.value = count;
  document.getElementById('player-count-display').textContent = count;
  renderCalendar();
}

function renderBuddyList() {
  const list = document.getElementById('buddy-list');
  list.innerHTML = state.buddies.map((buddy, i) => `
    <li class="buddy-item">
      <span class="buddy-avatar" style="background:${buddy.color}">${buddy.name[0].toUpperCase()}</span>
      <span class="buddy-name">${buddy.name}</span>
      ${i === 0 ? '' : `<button class="buddy-remove" onclick="removeBuddy(${i})" title="Poista">&times;</button>`}
    </li>
  `).join('');
}

function initPollControls() {
  // Täytä aikavalinta
  const timeSelect = document.getElementById('poll-time');
  for (let h = 7; h < 19; h++) {
    for (let m = 0; m < 60; m += 30) {
      const t = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      timeSelect.innerHTML += `<option value="${t}">${t}</option>`;
    }
  }
  // Aseta oletusaika 09:00
  timeSelect.value = '09:00';

  // Täytä kenttävalinta
  const courseSelect = document.getElementById('poll-course');
  courseSelect.innerHTML = '<option value="">Mikä tahansa</option>';
  GOLF_COURSES.forEach(c => {
    courseSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });

  // Aseta oletusdäivä huomiseksi
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('poll-date').value = formatDate(tomorrow);

  document.getElementById('poll-add-btn').addEventListener('click', addPollSlot);
}

function addPollSlot() {
  const date = document.getElementById('poll-date').value;
  const time = document.getElementById('poll-time').value;
  const courseId = document.getElementById('poll-course').value;
  if (!date || !time) return;

  state.pollSlots.push({ date, time, courseId });
  saveActiveGroupState();
  renderGroupSelector();
  renderPoll();
}

function removePollSlot(index) {
  state.pollSlots.splice(index, 1);
  // Siivoa äänet
  const newVotes = {};
  Object.entries(state.pollVotes).forEach(([key, val]) => {
    const [si] = key.split('-').map(Number);
    if (si < state.pollSlots.length) {
      newVotes[key] = val;
    }
  });
  state.pollVotes = newVotes;
  state.pollSelectedSlot = null;
  saveActiveGroupState();
  renderGroupSelector();
  renderPoll();
  renderPollDayDetail();
}

function toggleVote(slotIdx, buddyIdx) {
  const key = `${slotIdx}-${buddyIdx}`;
  state.pollVotes[key] = !state.pollVotes[key];
  saveActiveGroupState();
  renderGroupSelector();
  renderPoll();
}

// === Kenttäfiltterit ===
function renderPollFilters() {
  const container = document.getElementById('poll-course-filters');
  if (!container) return;

  // Kerää mitkä kentät esiintyvät ehdotuksissa
  const usedCourseIds = new Set();
  state.pollSlots.forEach(slot => {
    if (slot.courseId) usedCourseIds.add(slot.courseId);
  });
  // Lisää myös kentät joilla ei ole courseId:ta (mikä tahansa)
  const hasAnyCourse = state.pollSlots.some(s => !s.courseId);

  const allActive = state.pollCourseFilters.size === 0;

  let html = `<button class="poll-filter-chip poll-filter-chip-all ${allActive ? 'active' : ''}" onclick="togglePollFilter('all')">
    <span class="chip-label">Kaikki</span>
  </button>`;

  GOLF_COURSES.forEach(course => {
    // Laske montako ehdotusta tällä kentällä on
    const count = state.pollSlots.filter(s => s.courseId === course.id).length;
    if (count === 0) return; // Näytä vain kentät joilla on ehdotuksia

    const isActive = state.pollCourseFilters.has(course.id);
    const style = isActive
      ? `color: white; background: ${course.color}; border-color: ${course.color};`
      : `color: ${course.color}; border-color: ${course.color}44;`;

    html += `<button class="poll-filter-chip ${isActive ? 'active' : ''}" style="${style}" onclick="togglePollFilter('${course.id}')">
      <span class="chip-dot" style="background:${course.color}"></span>
      <span class="chip-label">${course.name}</span>
      <span class="chip-count">(${count})</span>
    </button>`;
  });

  // "Mikä tahansa" -suodatin
  if (hasAnyCourse) {
    const count = state.pollSlots.filter(s => !s.courseId).length;
    const isActive = state.pollCourseFilters.has('');
    html += `<button class="poll-filter-chip ${isActive ? 'active' : ''}" style="${isActive ? 'background:var(--gray-600);border-color:var(--gray-600);color:white;' : ''}" onclick="togglePollFilter('')">
      <span class="chip-label">Mikä tahansa</span>
      <span class="chip-count">(${count})</span>
    </button>`;
  }

  container.innerHTML = html;
}

function togglePollFilter(courseId) {
  if (courseId === 'all') {
    state.pollCourseFilters.clear();
  } else {
    if (state.pollCourseFilters.has(courseId)) {
      state.pollCourseFilters.delete(courseId);
    } else {
      state.pollCourseFilters.add(courseId);
    }
    // Jos kaikki yksittäiset on poissa, palaa "kaikki" -tilaan
    if (state.pollCourseFilters.size === 0) {
      // jo tyhjä = kaikki
    }
  }
  state.pollSelectedSlot = null;
  renderPollFilters();
  renderPoll();
  renderPollDayDetail();
}

function isSlotVisible(slot) {
  if (state.pollCourseFilters.size === 0) return true;
  return state.pollCourseFilters.has(slot.courseId);
}

// === Päivädetaljinäkymä ===
function selectPollSlot(slotIndex) {
  if (state.pollSelectedSlot === slotIndex) {
    state.pollSelectedSlot = null;
  } else {
    state.pollSelectedSlot = slotIndex;
  }
  renderPoll();
  renderPollDayDetail();
}

function closePollDayDetail() {
  state.pollSelectedSlot = null;
  renderPoll();
  renderPollDayDetail();
}

function renderPollDayDetail() {
  const container = document.getElementById('poll-day-detail');
  if (!container) return;

  if (state.pollSelectedSlot === null || state.pollSelectedSlot >= state.pollSlots.length) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  const si = state.pollSelectedSlot;
  const slot = state.pollSlots[si];
  const d = parseDate(slot.date);
  const dayName = WEEKDAYS_FULL_FI[d.getDay()];
  const buddyCount = state.buddies.length;

  // Laske äänet
  let yesCount = 0;
  const buddyVotes = state.buddies.map((buddy, bi) => {
    const voted = !!state.pollVotes[`${si}-${bi}`];
    if (voted) yesCount++;
    return { buddy, voted };
  });

  const votePercent = buddyCount > 0 ? Math.round((yesCount / buddyCount) * 100) : 0;
  const voteColor = yesCount === buddyCount ? 'var(--avail-high)' : yesCount > buddyCount / 2 ? 'var(--avail-medium)' : 'var(--avail-low)';

  // Hae vapaat kentät tälle ajalle
  const availableCourses = GOLF_COURSES.filter(course => {
    const slots = state.availabilityData[course.id]?.[slot.date]?.[slot.time] ?? 0;
    return slots >= buddyCount;
  }).map(course => ({
    ...course,
    slots: state.availabilityData[course.id][slot.date][slot.time]
  }));

  const selectedCourse = GOLF_COURSES.find(c => c.id === slot.courseId);
  const courseLabel = selectedCourse ? selectedCourse.name : 'Mikä tahansa kenttä';

  let html = `
    <div class="poll-detail-header">
      <div>
        <div class="poll-detail-title">${dayName} ${d.getDate()}.${d.getMonth() + 1}. klo ${slot.time}</div>
        <div class="poll-detail-subtitle">${courseLabel} &middot; ${yesCount}/${buddyCount} pääsee</div>
      </div>
      <button class="poll-detail-close" onclick="closePollDayDetail()">&times;</button>
    </div>
    <div class="poll-detail-body">
      <div class="poll-detail-section">
        <h4>Ketkä pääsevät (${yesCount}/${buddyCount})</h4>
        <div class="poll-detail-vote-bar">
          <div class="poll-detail-vote-fill">
            <div class="poll-detail-vote-fill-inner" style="width:${votePercent}%;background:${voteColor}"></div>
          </div>
          <span class="poll-detail-vote-count">${votePercent}%</span>
        </div>
        <div class="poll-detail-buddies">`;

  // Näytä ensin "kyllä", sitten "ei"
  buddyVotes.sort((a, b) => (b.voted ? 1 : 0) - (a.voted ? 1 : 0));
  buddyVotes.forEach(({ buddy, voted }) => {
    html += `<div class="poll-detail-buddy ${voted ? 'yes' : 'no'}">
      <span class="poll-detail-buddy-icon">${voted ? '&#10004;' : '&#10008;'}</span>
      <span class="buddy-avatar" style="background:${buddy.color};width:22px;height:22px;font-size:11px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;color:white;font-weight:700">${buddy.name[0].toUpperCase()}</span>
      ${buddy.name}
    </div>`;
  });

  html += `</div>
      </div>
      <div class="poll-detail-section">
        <h4>Vapaat kentät (${availableCourses.length}/${GOLF_COURSES.length})</h4>
        <div class="poll-detail-courses">`;

  if (availableCourses.length === 0) {
    html += `<div class="poll-detail-no-courses">Ei kenttää jossa mahtuu ${buddyCount} pelaajaa tällä ajankohdalla.</div>`;
  } else {
    availableCourses.forEach(course => {
      let slotClass;
      if (course.slots >= 12) slotClass = 'high';
      else if (course.slots >= 6) slotClass = 'medium';
      else slotClass = 'low';

      const isSelected = slot.courseId === course.id;
      const highlight = isSelected ? 'border-color:var(--green-main);background:var(--green-pale);' : '';

      html += `<div class="poll-detail-course" style="${highlight}">
        <span class="poll-detail-course-dot" style="background:${course.color}"></span>
        <div class="poll-detail-course-info">
          <div class="poll-detail-course-name">${course.name}${isSelected ? ' &#10004;' : ''}</div>
          <div class="poll-detail-course-city">${course.city} &middot; ${course.holes} reikää</div>
        </div>
        <span class="poll-detail-course-slots ${slotClass}">${course.slots} paikkaa</span>
      </div>`;
    });
  }

  html += `</div>
      </div>
    </div>`;

  container.innerHTML = html;
  container.classList.remove('hidden');
}

function renderPoll() {
  const matrix = document.getElementById('poll-matrix');
  const summary = document.getElementById('poll-summary');

  renderPollFilters();

  if (state.pollSlots.length === 0) {
    matrix.innerHTML = `<div class="poll-empty">
      <div class="poll-empty-icon">&#128197;</div>
      <p>Ei vielä aikaehdotuksia.</p>
      <p>Lisää ehdotuksia yllä olevalla lomakkeella tai klikkaa aikoja kalenterinäkymästä.</p>
    </div>`;
    summary.innerHTML = '';
    return;
  }

  const buddyCount = state.buddies.length;

  // Taulukko
  let html = '<table class="poll-table"><thead><tr>';
  html += '<th>Kaveri</th>';

  state.pollSlots.forEach((slot, si) => {
    const d = parseDate(slot.date);
    const dayName = WEEKDAYS_FI[d.getDay()];
    const course = GOLF_COURSES.find(c => c.id === slot.courseId);
    const courseName = course ? course.name : 'Mikä tahansa';
    const visible = isSlotVisible(slot);
    const selected = state.pollSelectedSlot === si;
    const filteredCls = visible ? '' : ' filtered-out';

    // Tarkista saatavuus
    let availHtml = '';
    if (course) {
      const slots = state.availabilityData[course.id]?.[slot.date]?.[slot.time] ?? 0;
      if (slots >= buddyCount) {
        availHtml = `<div class="poll-slot-avail ok">${slots} paikkaa</div>`;
      } else if (slots > 0) {
        availHtml = `<div class="poll-slot-avail warn">${slots} paikkaa</div>`;
      } else {
        availHtml = `<div class="poll-slot-avail full">Varattu</div>`;
      }
    } else {
      // Etsi kenttiä joissa mahtuu
      const availCount = GOLF_COURSES.filter(c => {
        const s = state.availabilityData[c.id]?.[slot.date]?.[slot.time] ?? 0;
        return s >= buddyCount;
      }).length;
      if (availCount > 0) {
        availHtml = `<div class="poll-slot-avail ok">${availCount} kenttää</div>`;
      } else {
        availHtml = `<div class="poll-slot-avail full">Ei mahdu</div>`;
      }
    }

    html += `<th class="${filteredCls}">
      <div class="poll-slot-header poll-slot-header-clickable ${selected ? 'selected' : ''}" onclick="selectPollSlot(${si})" title="Klikkaa nähdäksesi lisätiedot">
        <span class="poll-slot-date">${dayName} ${d.getDate()}.${d.getMonth() + 1}</span>
        <span class="poll-slot-time">${slot.time}</span>
        <span class="poll-slot-course" style="background:${course ? course.color + '22' : '#eee'};color:${course ? course.color : '#666'}">${courseName}</span>
        ${availHtml}
        <span class="poll-slot-click-hint">Klikkaa &darr;</span>
      </div>
      <button class="poll-remove-slot" onclick="event.stopPropagation();removePollSlot(${si})" title="Poista">&times;</button>
    </th>`;
  });
  html += '</tr></thead><tbody>';

  // Kaveririvi
  state.buddies.forEach((buddy, bi) => {
    html += `<tr>`;
    html += `<td><span style="display:inline-flex;align-items:center;gap:6px">
      <span class="buddy-avatar" style="background:${buddy.color};width:22px;height:22px;font-size:11px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;color:white;font-weight:700">${buddy.name[0].toUpperCase()}</span>
      ${buddy.name}
    </span></td>`;
    state.pollSlots.forEach((slot, si) => {
      const key = `${si}-${bi}`;
      const checked = state.pollVotes[key] ? 'checked' : '';
      const visible = isSlotVisible(slot);
      const filteredCls = visible ? '' : ' filtered-out';
      html += `<td class="poll-check-cell${filteredCls}" onclick="toggleVote(${si},${bi})">
        <input type="checkbox" class="poll-checkbox" ${checked} onclick="event.stopPropagation();toggleVote(${si},${bi})">
      </td>`;
    });
    html += '</tr>';
  });

  // Yhteenveto-rivi
  html += '<tr class="poll-totals"><td>Yhteensä</td>';
  const slotCounts = state.pollSlots.map((_, si) => {
    let count = 0;
    state.buddies.forEach((_, bi) => {
      if (state.pollVotes[`${si}-${bi}`]) count++;
    });
    return count;
  });

  slotCounts.forEach((count, si) => {
    const cls = count === buddyCount ? 'poll-count-yes' : 'poll-count-no';
    const visible = isSlotVisible(state.pollSlots[si]);
    const filteredCls = visible ? '' : ' filtered-out';
    html += `<td class="${cls}${filteredCls}">${count}/${buddyCount}</td>`;
  });
  html += '</tr>';

  html += '</tbody></table>';
  matrix.innerHTML = html;

  // Yhteenveto: paras ehdotus
  const ranked = state.pollSlots.map((slot, si) => ({
    slot,
    index: si,
    votes: slotCounts[si]
  })).sort((a, b) => b.votes - a.votes);

  let summaryHtml = '<h3>Paras ehdotus</h3>';

  ranked.forEach((item, rank) => {
    const d = parseDate(item.slot.date);
    const dayName = WEEKDAYS_FULL_FI[d.getDay()];
    const course = GOLF_COURSES.find(c => c.id === item.slot.courseId);
    const courseName = course ? course.name : 'Mikä tahansa kenttä';

    const isBest = rank === 0 && item.votes > 0;
    const cls = isBest ? 'poll-best-option' : 'poll-best-option';
    const style = isBest ? '' : 'border-color:var(--gray-300);background:var(--white);';

    // Ketkä pääsevät
    const yesNames = state.buddies
      .filter((_, bi) => state.pollVotes[`${item.index}-${bi}`])
      .map(b => b.name);

    summaryHtml += `<div class="${cls}" style="${style}">
      <span class="poll-best-rank" style="${isBest ? '' : 'color:var(--gray-400)'}">#${rank + 1}</span>
      <div class="poll-best-info">
        <div class="poll-best-date">${dayName} ${d.getDate()}.${d.getMonth() + 1}. klo ${item.slot.time}</div>
        <div class="poll-best-detail">${courseName}${yesNames.length > 0 ? ' &middot; ' + yesNames.join(', ') : ''}</div>
      </div>
      <span class="poll-best-count" style="${isBest ? '' : 'color:var(--gray-400)'}">${item.votes}/${buddyCount}</span>
    </div>`;
  });

  summary.innerHTML = summaryHtml;
}

// === Apufunktiot ===
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}
