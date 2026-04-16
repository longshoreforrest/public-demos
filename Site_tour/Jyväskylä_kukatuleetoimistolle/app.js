// ============================================================
// Siili Jyväskylä — Kuka tulee toimistolle? — App
// ============================================================

// State
let currentView = 'analytics';
let calendarWeeks = 2;
let analyticsPeriod = 'all';
let heatmapPastWeeks = 2;
let heatmapFutureWeeks = 2;
let selectedEmployees = new Set(EMPLOYEES.map(e => e.id));
let analyticsSelectedEmployees = new Set(EMPLOYEES.map(e => e.id));
let nameFilter = '';
let selectedReminderWeek = null;
let chartInstances = {};

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCalendarControls();
  initAnalyticsControls();
  initHeatmapSliders();
  renderCalendar();
  renderFilterChips();
  renderAnalyticsFilterChips();
  initFilterInput();
  renderAnalytics(); // Analytiikka on oletusnäkymä
  renderReminders();
});

// ==================== NAVIGATION ====================

function initNav() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.dataset.view;
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById(`view-${view}`).classList.add('active');
      currentView = view;
      if (view === 'analytics') renderAnalytics();
      if (view === 'reminders') renderReminders();
    });
  });
}

// Language switcher (placeholder for i18n)
function switchToLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
}

// ==================== KALENTERI ====================

function initCalendarControls() {
  document.querySelectorAll('#view-calendar .range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#view-calendar .range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calendarWeeks = parseInt(btn.dataset.weeks);
      renderCalendar();
    });
  });
}

function renderFilterChips() {
  const container = document.getElementById('filterChips');
  container.innerHTML = '';

  // "Kaikki" -chip
  const allChip = document.createElement('span');
  allChip.className = 'filter-chip active';
  allChip.textContent = 'Kaikki';
  allChip.style.borderColor = var_primary();
  allChip.style.background = var_primary();
  allChip.dataset.id = 'all';
  allChip.addEventListener('click', () => {
    if (selectedEmployees.size === EMPLOYEES.length) {
      selectedEmployees.clear();
    } else {
      selectedEmployees = new Set(EMPLOYEES.map(e => e.id));
    }
    renderFilterChips();
    renderCalendar();
  });
  container.appendChild(allChip);

  EMPLOYEES.forEach(emp => {
    const chip = document.createElement('span');
    chip.className = `filter-chip ${selectedEmployees.has(emp.id) ? 'active' : ''}`;
    chip.textContent = emp.name.split(' ')[0];
    chip.style.borderColor = emp.color;
    if (selectedEmployees.has(emp.id)) {
      chip.style.background = emp.color;
    }
    chip.addEventListener('click', () => {
      if (selectedEmployees.has(emp.id)) {
        selectedEmployees.delete(emp.id);
      } else {
        selectedEmployees.add(emp.id);
      }
      renderFilterChips();
      renderCalendar();
    });
    container.appendChild(chip);
  });

  // Päivitä "Kaikki" -chipin tila
  if (selectedEmployees.size < EMPLOYEES.length) {
    allChip.classList.remove('active');
    allChip.style.background = 'transparent';
  }
}

function var_primary() { return '#0891b2'; }

function initFilterInput() {
  const input = document.getElementById('filterName');
  input.addEventListener('input', (e) => {
    nameFilter = e.target.value.toLowerCase();
    renderCalendar();
  });
}

function renderCalendar() {
  const container = document.getElementById('calendarContainer');
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayStr = formatDate(today);

  // Haetaan tämän viikon maanantai
  const startDate = new Date(today);
  const dow = startDate.getDay();
  startDate.setDate(startDate.getDate() - (dow === 0 ? 6 : dow - 1));

  const weeks = getWeekDates(startDate, calendarWeeks);
  const allDates = weeks.flat();

  // Filtteröidyt henkilöt
  const filteredEmployees = EMPLOYEES.filter(emp => {
    if (!selectedEmployees.has(emp.id)) return false;
    if (nameFilter) {
      const searchStr = `${emp.name} ${emp.role}`.toLowerCase();
      return searchStr.includes(nameFilter);
    }
    return true;
  });

  // Rakennetaan office-lookup: { "2024-01-15": Set([1, 3, 5]) }
  const officeLookup = {};
  CALENDAR_DATA.entries.forEach(e => {
    if (!officeLookup[e.date]) officeLookup[e.date] = new Set();
    officeLookup[e.date].add(e.employeeId);
  });

  // Taulukko
  let html = '<table class="calendar-table"><thead><tr>';
  html += '<th class="col-name">Henkilö</th>';

  allDates.forEach((date, i) => {
    const isToday = date === todayStr;
    const isWeekStart = i > 0 && parseDate(date).getDay() === 1;
    const d = parseDate(date);
    const weekNum = getWeekNumber(d);
    html += `<th class="${isToday ? 'today' : ''} ${isWeekStart ? 'week-start' : ''}">`;
    if (d.getDay() === 1) {
      html += `<span class="th-week">Vko ${weekNum}</span>`;
    }
    html += `<span class="th-day">${getDayName(date)}</span>`;
    html += `<span class="th-date">${d.getDate()}.${d.getMonth()+1}</span>`;
    html += '</th>';
  });
  html += '</tr></thead><tbody>';

  filteredEmployees.forEach(emp => {
    html += '<tr>';
    html += `<td class="col-name"><div class="person-cell">`;
    html += `<span class="person-avatar">${emp.avatar}</span>`;
    html += `<div class="person-info"><div class="person-name">${emp.name}</div>`;
    html += `<div class="person-role">${emp.role}</div></div></div></td>`;

    allDates.forEach((date, i) => {
      const isOffice = officeLookup[date] && officeLookup[date].has(emp.id);
      const isToday = date === todayStr;
      const isWeekStart = i > 0 && parseDate(date).getDay() === 1;
      html += `<td class="${isWeekStart ? 'week-start' : ''}">`;
      html += `<span class="day-cell ${isOffice ? 'office' : 'empty'} ${isToday ? 'today-col' : ''}" `;
      html += `data-date="${date}" data-emp="${emp.id}" onclick="showDayDetail('${date}')">`;
      html += isOffice ? '&#10003;' : '&middot;';
      html += '</span></td>';
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;

  // Stats
  const statsEl = document.getElementById('filterStats');
  const todayCount = officeLookup[todayStr] ? officeLookup[todayStr].size : 0;
  statsEl.textContent = `Tänään toimistolla: ${todayCount} / ${EMPLOYEES.length}`;
}

function showDayDetail(dateStr) {
  const modal = document.getElementById('dayModal');
  const header = document.getElementById('dayModalHeader');
  const body = document.getElementById('dayModalBody');

  const officeLookup = {};
  CALENDAR_DATA.entries.forEach(e => {
    if (!officeLookup[e.date]) officeLookup[e.date] = new Set();
    officeLookup[e.date].add(e.employeeId);
  });

  const people = officeLookup[dateStr] ? [...officeLookup[dateStr]] : [];
  const employees = people.map(id => EMPLOYEES.find(e => e.id === id)).filter(Boolean);

  header.innerHTML = `<h3>${getDayNameLong(dateStr)} ${formatDateFi(dateStr)}</h3>
    <div class="modal-date">${employees.length} henkilöä toimistolla</div>`;

  if (employees.length === 0) {
    body.innerHTML = '<div class="modal-empty">Kukaan ei ole merkinnyt olevansa toimistolla</div>';
  } else {
    body.innerHTML = '<ul class="modal-person-list">' + employees.map(emp =>
      `<li class="modal-person-item">
        <span class="person-avatar" style="background:${emp.color}20">${emp.avatar}</span>
        <div><div class="person-name">${emp.name}</div>
        <div class="person-role">${emp.role}</div></div>
      </li>`
    ).join('') + '</ul>';
  }

  modal.classList.add('open');
  document.getElementById('dayModalClose').onclick = () => modal.classList.remove('open');
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
}

// ==================== ANALYTIIKKA ====================

function initAnalyticsControls() {
  document.querySelectorAll('#view-analytics .range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#view-analytics .range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      analyticsPeriod = btn.dataset.period;
      renderAnalytics();
    });
  });
}

function renderAnalyticsFilterChips() {
  const container = document.getElementById('analyticsFilterChips');
  container.innerHTML = '';

  const allChip = document.createElement('span');
  allChip.className = `filter-chip ${analyticsSelectedEmployees.size === EMPLOYEES.length ? 'active' : ''}`;
  allChip.textContent = 'Kaikki';
  allChip.style.borderColor = var_primary();
  if (analyticsSelectedEmployees.size === EMPLOYEES.length) allChip.style.background = var_primary();
  allChip.addEventListener('click', () => {
    if (analyticsSelectedEmployees.size === EMPLOYEES.length) {
      analyticsSelectedEmployees.clear();
    } else {
      analyticsSelectedEmployees = new Set(EMPLOYEES.map(e => e.id));
    }
    renderAnalyticsFilterChips();
    renderAnalytics();
  });
  container.appendChild(allChip);

  EMPLOYEES.forEach(emp => {
    const chip = document.createElement('span');
    const isActive = analyticsSelectedEmployees.has(emp.id);
    chip.className = `filter-chip ${isActive ? 'active' : ''}`;
    chip.textContent = emp.name.split(' ')[0];
    chip.style.borderColor = emp.color;
    if (isActive) chip.style.background = emp.color;
    chip.addEventListener('click', () => {
      if (analyticsSelectedEmployees.has(emp.id)) {
        analyticsSelectedEmployees.delete(emp.id);
      } else {
        analyticsSelectedEmployees.add(emp.id);
      }
      renderAnalyticsFilterChips();
      renderAnalytics();
    });
    container.appendChild(chip);
  });
}

function getFilteredEntries() {
  const today = new Date();
  today.setHours(0,0,0,0);
  return CALENDAR_DATA.entries.filter(e => {
    if (!analyticsSelectedEmployees.has(e.employeeId)) return false;
    const d = parseDate(e.date);
    if (analyticsPeriod === 'past') return d < today;
    if (analyticsPeriod === 'future') return d >= today;
    return true;
  });
}

function initHeatmapSliders() {
  const pastSlider = document.getElementById('heatmapPastWeeks');
  const futureSlider = document.getElementById('heatmapFutureWeeks');
  const pastLabel = document.getElementById('heatmapPastLabel');
  const futureLabel = document.getElementById('heatmapFutureLabel');

  pastSlider.addEventListener('input', () => {
    heatmapPastWeeks = parseInt(pastSlider.value);
    pastLabel.textContent = `${heatmapPastWeeks} vko`;
    renderHeatmap();
  });

  futureSlider.addEventListener('input', () => {
    heatmapFutureWeeks = parseInt(futureSlider.value);
    futureLabel.textContent = `${heatmapFutureWeeks} vko`;
    renderHeatmap();
  });
}

function renderAnalytics() {
  const entries = getFilteredEntries();
  renderThisWeekChart();
  renderStatsGrid(entries);
  renderHeatmap();
  renderDayChart(entries);
  renderPersonChart(entries);
  renderTrendChart(entries);
}

function renderStatsGrid(entries) {
  const grid = document.getElementById('statsGrid');
  const uniqueDays = new Set(entries.map(e => e.date));
  const totalVisits = entries.length;
  const avgPerDay = uniqueDays.size > 0 ? (totalVisits / uniqueDays.size).toFixed(1) : 0;
  const uniquePeople = new Set(entries.map(e => e.employeeId)).size;

  // Suosituin päivä
  const dayCounts = {};
  entries.forEach(e => {
    const day = getDayName(e.date);
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });
  const topDay = Object.entries(dayCounts).sort((a,b) => b[1] - a[1])[0];

  grid.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${totalVisits}</div>
      <div class="stat-label">Toimistokäyntiä yhteensä</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${avgPerDay}</div>
      <div class="stat-label">Keskimäärin / päivä</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${uniquePeople}</div>
      <div class="stat-label">Eri henkilöä käynyt</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${topDay ? topDay[0] : '-'}</div>
      <div class="stat-label">Suosituin viikonpäivä</div>
    </div>
  `;
}

function renderThisWeekChart() {
  const ctx = document.getElementById('thisWeekChart');
  if (chartInstances.thisWeekChart) chartInstances.thisWeekChart.destroy();

  const today = new Date();
  today.setHours(0,0,0,0);
  const todayStr = formatDate(today);

  // Tämän viikon ma-pe
  const monday = new Date(today);
  const dow = monday.getDay();
  monday.setDate(monday.getDate() - (dow === 0 ? 6 : dow - 1));

  const weekDates = [];
  const dayLabels = [];
  const dayCounts = [];
  const bgColors = [];

  for (let d = 0; d < 5; d++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + d);
    const dateStr = formatDate(date);
    weekDates.push(dateStr);
    const dayName = getDayNameLong(dateStr);
    dayLabels.push(`${dayName} ${date.getDate()}.${date.getMonth()+1}`);

    const count = CALENDAR_DATA.entries.filter(e => e.date === dateStr && analyticsSelectedEmployees.has(e.employeeId)).length;
    dayCounts.push(count);

    // Tänään korostettu
    if (dateStr === todayStr) {
      bgColors.push('#0e7490');
    } else if (isPast(dateStr)) {
      bgColors.push('#94a3b8');
    } else {
      bgColors.push('#0891b2');
    }
  }

  chartInstances.thisWeekChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dayLabels,
      datasets: [{
        label: 'Henkilöä toimistolla',
        data: dayCounts,
        backgroundColor: bgColors,
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y} henkilöä toimistolla`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(analyticsSelectedEmployees.size, Math.max(...dayCounts) + 1),
          grid: { color: '#f1f5f9' },
          ticks: { stepSize: 3 }
        },
        x: { grid: { display: false } }
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const idx = elements[0].index;
          showHeatmapDetail(weekDates[idx]);
        }
      }
    }
  });
}

function renderHeatmap() {
  const container = document.getElementById('heatmapContainer');
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayStr = formatDate(today);

  // Slider-ohjattu: heatmapPastWeeks taakse, heatmapFutureWeeks eteen (+ nykyinen viikko)
  const thisMonday = new Date(today);
  const dow = thisMonday.getDay();
  thisMonday.setDate(thisMonday.getDate() - (dow === 0 ? 6 : dow - 1));

  const startDate = new Date(thisMonday);
  startDate.setDate(startDate.getDate() - heatmapPastWeeks * 7);

  const totalWeeks = heatmapPastWeeks + 1 + heatmapFutureWeeks;
  const weeks = getWeekDates(startDate, totalWeeks);

  // Office lookup (filtteröity)
  const officeLookup = {};
  CALENDAR_DATA.entries.forEach(e => {
    if (!analyticsSelectedEmployees.has(e.employeeId)) return;
    if (!officeLookup[e.date]) officeLookup[e.date] = 0;
    officeLookup[e.date]++;
  });

  let html = '<table class="heatmap-table"><thead><tr><th></th>';
  html += '<th>Ma</th><th>Ti</th><th>Ke</th><th>To</th><th>Pe</th>';
  html += '</tr></thead><tbody>';

  // Nykyisen viikon numero
  const currentWeekNum = getWeekNumber(today);
  const currentYear = today.getFullYear();

  weeks.forEach(week => {
    const weekDate = parseDate(week[0]);
    const weekNum = getWeekNumber(weekDate);
    const weekYear = weekDate.getFullYear();
    const monthName = getMonthName(weekDate.getMonth());
    const isCurrentWeek = weekNum === currentWeekNum && weekYear === currentYear;
    const rowClass = isCurrentWeek ? 'hm-current-week' : '';
    const weekLabel = isCurrentWeek ? `${monthName} vko ${weekNum} &#9664;` : `${monthName} vko ${weekNum}`;
    html += `<tr class="${rowClass}"><th class="hm-week">${weekLabel}</th>`;
    week.forEach(date => {
      const count = officeLookup[date] || 0;
      const hmClass = `hm-${Math.min(count, 15)}`;
      const isTodayCell = date === todayStr;
      html += `<td><div class="heatmap-cell ${hmClass} ${isTodayCell ? 'today-cell' : ''}" `;
      html += `onclick="showHeatmapDetail('${date}')" title="${formatDateFi(date)}: ${count} hlö">`;
      html += count > 0 ? count : '';
      html += '</div></td>';
    });
    html += '</tr>';
  });

  html += '</tbody></table>';

  // Legend
  html += '<div class="heatmap-legend">';
  html += '<span>Vähemmän</span><div class="heatmap-legend-scale">';
  [0, 2, 4, 6, 8, 10, 12, 15].forEach(n => {
    html += `<div class="heatmap-legend-cell hm-${n}"></div>`;
  });
  html += '</div><span>Enemmän</span></div>';

  container.innerHTML = html;
}

function showHeatmapDetail(dateStr) {
  showAnalyticsModal(
    `${getDayNameLong(dateStr)} ${formatDateFi(dateStr)}`,
    'Toimistolla tänä päivänä:',
    getEmployeesForDate(dateStr)
  );
}

function getEmployeesForDate(dateStr, filterSet) {
  const filter = filterSet || analyticsSelectedEmployees;
  const ids = CALENDAR_DATA.entries
    .filter(e => e.date === dateStr && filter.has(e.employeeId))
    .map(e => e.employeeId);
  return ids.map(id => EMPLOYEES.find(e => e.id === id)).filter(Boolean);
}

function showAnalyticsModal(title, subtitle, employees) {
  const modal = document.getElementById('analyticsModal');
  const header = document.getElementById('analyticsModalHeader');
  const body = document.getElementById('analyticsModalBody');

  header.innerHTML = `<h3>${title}</h3><div class="modal-date">${subtitle}</div>`;

  if (!employees || employees.length === 0) {
    body.innerHTML = '<div class="modal-empty">Ei dataa</div>';
  } else {
    body.innerHTML = '<ul class="modal-person-list">' + employees.map(emp =>
      `<li class="modal-person-item">
        <span class="person-avatar" style="background:${emp.color}20">${emp.avatar}</span>
        <div><div class="person-name">${emp.name}</div>
        <div class="person-role">${emp.role}</div></div>
      </li>`
    ).join('') + '</ul>';
  }

  modal.classList.add('open');
  document.getElementById('analyticsModalClose').onclick = () => modal.classList.remove('open');
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
}

function showAnalyticsModalDates(title, subtitle, dates) {
  const modal = document.getElementById('analyticsModal');
  const header = document.getElementById('analyticsModalHeader');
  const body = document.getElementById('analyticsModalBody');

  header.innerHTML = `<h3>${title}</h3><div class="modal-date">${subtitle}</div>`;

  if (!dates || dates.length === 0) {
    body.innerHTML = '<div class="modal-empty">Ei dataa</div>';
  } else {
    body.innerHTML = '<ul class="modal-person-list">' + dates.map(dateStr => {
      const count = CALENDAR_DATA.entries.filter(e => e.date === dateStr && analyticsSelectedEmployees.has(e.employeeId)).length;
      return `<li class="modal-person-item" style="cursor:pointer" onclick="showHeatmapDetail('${dateStr}')">
        <span class="person-avatar">📅</span>
        <div><div class="person-name">${getDayNameLong(dateStr)} ${formatDateFi(dateStr)}</div>
        <div class="person-role">${count} henkilöä toimistolla</div></div>
      </li>`;
    }).join('') + '</ul>';
  }

  modal.classList.add('open');
  document.getElementById('analyticsModalClose').onclick = () => modal.classList.remove('open');
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
}

// ==================== CHART.JS GRAAFIT ====================

function renderDayChart(entries) {
  const ctx = document.getElementById('dayChart');
  if (chartInstances.dayChart) chartInstances.dayChart.destroy();

  const dayNames = ['Ma', 'Ti', 'Ke', 'To', 'Pe'];
  const dayCounts = [0, 0, 0, 0, 0];
  const dayEntries = [[], [], [], [], []]; // päivämäärät per viikonpäivä

  entries.forEach(e => {
    const dow = parseDate(e.date).getDay(); // 1-5
    if (dow >= 1 && dow <= 5) {
      dayCounts[dow - 1]++;
      if (!dayEntries[dow - 1].includes(e.date)) {
        dayEntries[dow - 1].push(e.date);
      }
    }
  });

  chartInstances.dayChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dayNames,
      datasets: [{
        label: 'Käyntejä',
        data: dayCounts,
        backgroundColor: ['#0891b2', '#0e7490', '#06b6d4', '#14b8a6', '#10b981'],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } }
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const idx = elements[0].index;
          const dayName = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai'][idx];
          // Näytä ketkä ovat käyneet tällä viikonpäivällä
          const empIds = new Set();
          entries.forEach(e => {
            if (parseDate(e.date).getDay() === idx + 1) empIds.add(e.employeeId);
          });
          const emps = [...empIds].map(id => EMPLOYEES.find(e => e.id === id)).filter(Boolean);
          showAnalyticsModal(
            `${dayName} — kävijät`,
            `${dayCounts[idx]} käyntiä yhteensä, ${emps.length} eri henkilöä`,
            emps
          );
        }
      }
    }
  });
}

function renderPersonChart(entries) {
  const ctx = document.getElementById('personChart');
  if (chartInstances.personChart) chartInstances.personChart.destroy();

  const personCounts = {};
  entries.forEach(e => {
    personCounts[e.employeeId] = (personCounts[e.employeeId] || 0) + 1;
  });

  const sorted = Object.entries(personCounts)
    .map(([id, count]) => ({ emp: EMPLOYEES.find(e => e.id === parseInt(id)), count }))
    .filter(x => x.emp)
    .sort((a, b) => b.count - a.count);

  chartInstances.personChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(x => x.emp.name.split(' ')[0]),
      datasets: [{
        label: 'Toimistopäiviä',
        data: sorted.map(x => x.count),
        backgroundColor: sorted.map(x => x.emp.color),
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        y: { grid: { display: false } }
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const idx = elements[0].index;
          const emp = sorted[idx].emp;
          // Näytä henkilön toimistopäivät
          const dates = entries
            .filter(e => e.employeeId === emp.id)
            .map(e => e.date)
            .sort();
          showAnalyticsModalDates(
            `${emp.avatar} ${emp.name}`,
            `${dates.length} toimistopäivää — ${emp.role}`,
            dates
          );
        }
      }
    }
  });
}

function renderTrendChart(entries) {
  const ctx = document.getElementById('trendChart');
  if (chartInstances.trendChart) chartInstances.trendChart.destroy();

  // Viikkokohtainen data
  const weekData = {};
  entries.forEach(e => {
    const wk = getWeekNumber(parseDate(e.date));
    const yr = parseDate(e.date).getFullYear();
    const key = `${yr}-W${String(wk).padStart(2, '0')}`;
    if (!weekData[key]) weekData[key] = { count: 0, uniquePeople: new Set(), dates: [] };
    weekData[key].count++;
    weekData[key].uniquePeople.add(e.employeeId);
    if (!weekData[key].dates.includes(e.date)) weekData[key].dates.push(e.date);
  });

  const sortedWeeks = Object.keys(weekData).sort();
  const labels = sortedWeeks.map(k => `Vko ${k.split('-W')[1]}`);

  chartInstances.trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Käyntikerrat',
          data: sortedWeeks.map(k => weekData[k].count),
          borderColor: '#0891b2',
          backgroundColor: 'rgba(8, 145, 178, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          label: 'Eri henkilöitä',
          data: sortedWeeks.map(k => weekData[k].uniquePeople.size),
          borderColor: '#0e7490',
          backgroundColor: 'rgba(14, 116, 144, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointHoverRadius: 8,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } }
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const idx = elements[0].index;
          const weekKey = sortedWeeks[idx];
          const wk = weekData[weekKey];
          const empIds = [...wk.uniquePeople];
          const emps = empIds.map(id => EMPLOYEES.find(e => e.id === id)).filter(Boolean);
          showAnalyticsModal(
            `Viikko ${weekKey.split('-W')[1]}`,
            `${wk.count} käyntiä, ${emps.length} eri henkilöä`,
            emps
          );
        }
      }
    }
  });
}

// ==================== MUISTUTUKSET ====================

function renderReminders() {
  // Haetaan uniikit viikot (maanantai-päivämäärät)
  const allDates = [...new Set(CALENDAR_DATA.mondayReminders.map(r => r.date))].sort();
  // Ryhmitellään viikon maanantain mukaan
  const weekMondays = [];
  const seen = new Set();
  allDates.forEach(date => {
    const d = parseDate(date);
    const dow = d.getDay();
    const mon = new Date(d);
    mon.setDate(mon.getDate() - (dow === 0 ? 6 : dow - 1));
    const monStr = formatDate(mon);
    if (!seen.has(monStr)) {
      seen.add(monStr);
      weekMondays.push(monStr);
    }
  });
  weekMondays.sort();

  // Valitaan nykyistä lähinnä oleva maanantai
  const today = formatDate(new Date());
  if (!selectedReminderWeek) {
    selectedReminderWeek = weekMondays.find(d => d >= today) || weekMondays[weekMondays.length - 1];
  }

  // Viikko-selector
  const selector = document.getElementById('reminderWeekSelector');
  selector.innerHTML = weekMondays.map(date => {
    const d = parseDate(date);
    const weekNum = getWeekNumber(d);
    const isActive = date === selectedReminderWeek;
    const isFuture = date >= today;
    return `<button class="reminder-week-btn ${isActive ? 'active' : ''}"
      onclick="selectReminderWeek('${date}')"
      style="${isFuture ? 'font-weight:600' : ''}">
      Vko ${weekNum} (${d.getDate()}.${d.getMonth()+1})
    </button>`;
  }).join('');

  // Haetaan valitun viikon kaikki muistutukset (ma + mahdollinen to)
  const weekStart = parseDate(selectedReminderWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekStartStr = formatDate(weekStart);
  const weekEndStr = formatDate(weekEnd);

  const weekReminders = CALENDAR_DATA.mondayReminders.filter(r => r.date >= weekStartStr && r.date <= weekEndStr);

  const preview = document.getElementById('slackPreview');
  let html = '<div class="slack-channel"><span class="slack-channel-hash">#</span> jkl-toimisto</div>';
  html += '<div class="slack-messages">';

  if (weekReminders.length === 0) {
    html += '<div class="slack-message"><div class="slack-msg-content" style="padding:1rem;color:var(--text-muted);text-align:center;">Ei muistutuksia tälle viikolle</div></div>';
  } else {
    weekReminders.forEach(r => {
      const d = parseDate(r.date);
      const dayLabel = getDayNameLong(r.date);
      html += `<div class="slack-message">
        <div class="slack-bot-avatar">🏢</div>
        <div class="slack-msg-content">
          <div class="slack-msg-header">
            <span class="slack-msg-bot-name">Toimistobotti</span>
            <span class="slack-msg-badge">APP</span>
            <span class="slack-msg-time">${dayLabel} ${r.time}</span>
          </div>
          <div class="slack-msg-text">${r.message}</div>
        </div>
      </div>`;
    });
  }

  html += '</div>';
  preview.innerHTML = html;

  // Kalenteri-muistutus esimerkki
  const calCard = document.getElementById('calReminderCard');
  const d = parseDate(selectedReminderWeek);
  calCard.innerHTML = `
    <div class="cal-reminder-title">Muista merkitä toimistopäivät!</div>
    <div class="cal-reminder-time">Maanantai ${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} klo 9:00 (10 min muistutus klo 8:50)</div>
    <div class="cal-reminder-body">${CALENDAR_REMINDER_TEXT('Tiimiläinen')}</div>
  `;
}

function selectReminderWeek(date) {
  selectedReminderWeek = date;
  renderReminders();
}

// ==================== TOAST ====================

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
