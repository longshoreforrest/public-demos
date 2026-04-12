// ============================================================
// app.js - Main application logic
// Tampere Muistuttaja - "Rakkaudella muistuttaa sovituista asioista"
// ============================================================

let currentView = 'meeting';
let currentParsedData = null;
let currentTranscript = '';
let selectedPersonId = null;
let taskStatusFilter = 'all';
let taskPersonFilter = 'all';
let calendarDate = new Date();
let chartInstances = {};

// ---- Initialization ----

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  updateAllI18n();

  // Auto-load sample data on first visit
  if (Store.getMeetings().length === 0) {
    loadFullSampleData();
    switchView('dashboard');
    return;
  }

  checkOverdueTasks();
  renderCurrentView();
});

// ---- Navigation ----

function initNavigation() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view;
      switchView(view);
    });
  });
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${view}`).classList.add('active');
  renderCurrentView();
}

function renderCurrentView() {
  switch (currentView) {
    case 'meeting': break; // Static HTML, no re-render needed
    case 'tasks': renderTasksView(); break;
    case 'people': renderPeopleView(); break;
    case 'dashboard': renderDashboard(); break;
    case 'calendar': renderCalendar(); break;
  }
}

// ---- i18n update ----

function updateAllI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === getLang());
  });
}

function switchToLang(lang) {
  setLang(lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  updateAllI18n();
  renderCurrentView();
}

function handleLangSwitch() {
  toggleLang();
  updateAllI18n();
  renderCurrentView();
}

// ---- Toast notifications ----

function showToast(messageKey) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `💝 ${t(messageKey)}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---- Modal ----

function showModal(title, message, onConfirm) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal()">${t('no')}</button>
      <button class="btn btn-primary" id="modalConfirmBtn">${t('yes')}</button>
    </div>
  `;
  overlay.classList.add('active');
  document.getElementById('modalConfirmBtn').addEventListener('click', () => {
    closeModal();
    onConfirm();
  });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// ============================================================
// VIEW 1: New Meeting
// ============================================================

function showDemoSelector() {
  const selector = document.getElementById('demoSelector');
  const demos = DEMO_TRANSCRIPTS[getLang()] || DEMO_TRANSCRIPTS.fi;

  if (selector.style.display === 'none' || !selector.innerHTML) {
    selector.style.display = 'flex';
    selector.innerHTML = demos.map((demo, i) =>
      `<button class="demo-btn" onclick="loadDemo(${i})">${demo.label}</button>`
    ).join('');
  } else {
    selector.style.display = 'none';
  }
}

function loadDemo(index) {
  const demos = DEMO_TRANSCRIPTS[getLang()] || DEMO_TRANSCRIPTS.fi;
  const demo = demos[index];
  document.getElementById('transcriptInput').value = demo.transcript;
  document.getElementById('demoSelector').style.display = 'none';
}

function analyzeTranscript() {
  const transcript = document.getElementById('transcriptInput').value.trim();
  if (!transcript) return;

  currentTranscript = transcript;

  // Show loading
  document.getElementById('meetingInputArea').style.display = 'none';
  const loading = document.getElementById('loadingOverlay');
  loading.classList.add('active');

  // Rotate loading messages
  const loadingText = document.getElementById('loadingText');
  loadingText.textContent = getRandomLoadingMessage();
  const msgInterval = setInterval(() => {
    loadingText.textContent = getRandomLoadingMessage();
  }, 1200);

  // Simulate analysis delay (1.5-3 seconds)
  const delay = 1500 + Math.random() * 1500;
  setTimeout(() => {
    clearInterval(msgInterval);
    loading.classList.remove('active');

    currentParsedData = simulateAnalysis(transcript);
    renderAnalysisResults(currentParsedData);
  }, delay);
}

function renderAnalysisResults(parsed) {
  const container = document.getElementById('resultsContainer');
  container.classList.add('active');

  // Summary
  document.getElementById('resultsSummary').innerHTML = `
    <h3>${parsed.title}</h3>
    <p>${parsed.summary}</p>
  `;

  // Participants & tasks
  const participantsHtml = parsed.participants.map((p, pIdx) => {
    const color = PERSON_COLORS[pIdx % PERSON_COLORS.length];
    const initials = p.name.split(' ').map(n => n[0]).join('').toUpperCase();

    const tasksHtml = p.tasks.map((task, tIdx) => `
      <div class="task-item">
        <div class="task-desc">
          <div>${task.description}</div>
          <div class="task-reminder-text">"${task.friendlyReminder}"</div>
        </div>
        <div class="task-deadline">${t('tasksDeadline')}: ${task.deadline}</div>
      </div>
    `).join('');

    return `
      <div class="participant-card" style="border-left-color: ${color}">
        <div class="participant-header">
          <div class="avatar" style="background: ${color}">${initials}</div>
          <div class="participant-name">${p.name}</div>
          <span class="text-small text-muted">${p.tasks.length} ${t('meetingTasks').toLowerCase()}</span>
        </div>
        ${tasksHtml}
      </div>
    `;
  }).join('');

  document.getElementById('resultsParticipants').innerHTML = participantsHtml;
}

function loadAllDemos() {
  showModal(
    '💝 ' + t('meetingLoadAll'),
    t('meetingLoadAllConfirm'),
    () => {
      loadFullSampleData();
      showToast('meetingLoadAllDone');
      switchView('dashboard');
    }
  );
}

function confirmMeeting() {
  if (!currentParsedData) return;

  const { meeting, tasks, people } = processParsedMeeting(currentParsedData, currentTranscript);

  // Save to store
  Store.saveMeeting(meeting);
  Store.saveTasks(tasks);
  people.forEach(p => Store.savePerson(p));

  showToast('toastMeetingSaved');
  resetMeetingView();
  switchView('tasks');
}

function resetMeetingView() {
  document.getElementById('meetingInputArea').style.display = 'block';
  document.getElementById('transcriptInput').value = '';
  document.getElementById('resultsContainer').classList.remove('active');
  document.getElementById('loadingOverlay').classList.remove('active');
  document.getElementById('demoSelector').style.display = 'none';
  currentParsedData = null;
  currentTranscript = '';
}

// ============================================================
// VIEW 2: Tasks
// ============================================================

function renderTasksView() {
  const tasks = Store.getTasks();
  const people = Store.getPeople();

  if (tasks.length === 0) {
    document.getElementById('taskFilters').innerHTML = '';
    document.getElementById('taskList').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">📋</div>
        <div class="empty-state-text">${t('emptyTasks')}</div>
      </div>
    `;
    return;
  }

  // Filters
  const statusCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => t.status === 'overdue').length,
  };

  const filterLabels = {
    all: t('tasksFilterAll'),
    pending: t('tasksFilterPending'),
    in_progress: t('tasksFilterInProgress'),
    done: t('tasksFilterDone'),
    overdue: t('tasksFilterOverdue'),
  };

  let filtersHtml = Object.entries(filterLabels).map(([key, label]) =>
    `<button class="filter-btn ${taskStatusFilter === key ? 'active' : ''}"
             onclick="setTaskFilter('${key}')">${label} (${statusCounts[key]})</button>`
  ).join('');

  // Person filter
  filtersHtml += `<select class="filter-select" onchange="setTaskPersonFilter(this.value)">
    <option value="all">${t('tasksFilterPerson')}: ${t('tasksFilterAll')}</option>
    ${people.map(p => `<option value="${p.id}" ${taskPersonFilter === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
  </select>`;

  document.getElementById('taskFilters').innerHTML = filtersHtml;

  // Filter tasks
  let filtered = tasks;
  if (taskStatusFilter !== 'all') {
    filtered = filtered.filter(t => t.status === taskStatusFilter);
  }
  if (taskPersonFilter !== 'all') {
    filtered = filtered.filter(t => t.personId === taskPersonFilter);
  }

  if (filtered.length === 0) {
    document.getElementById('taskList').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">🔍</div>
        <div class="empty-state-text">${t('tasksNoTasks')}</div>
      </div>
    `;
    return;
  }

  // Render task cards
  const meetings = Store.getMeetings();
  const taskCardsHtml = filtered.map(task => {
    const person = people.find(p => p.id === task.personId);
    const meeting = meetings.find(m => m.id === task.meetingId);
    const personName = person ? person.name : '?';
    const personColor = person ? person.color : '#999';
    const personInitials = person ? person.avatar : '?';

    const statusBadge = `<span class="task-card-status status-badge-${task.status}">${getStatusLabel(task.status)}</span>`;

    let actionsHtml = '';
    if (task.status === 'pending') {
      actionsHtml = `
        <button class="btn btn-small btn-warning" onclick="updateTaskStatus('${task.id}', 'in_progress')">${t('tasksMarkInProgress')}</button>
        <button class="btn btn-small btn-success" onclick="updateTaskStatus('${task.id}', 'done')">${t('tasksMarkDone')}</button>
      `;
    } else if (task.status === 'in_progress') {
      actionsHtml = `
        <button class="btn btn-small btn-success" onclick="updateTaskStatus('${task.id}', 'done')">${t('tasksMarkDone')}</button>
      `;
    } else if (task.status === 'overdue') {
      actionsHtml = `
        <button class="btn btn-small btn-warning" onclick="updateTaskStatus('${task.id}', 'in_progress')">${t('tasksMarkInProgress')}</button>
        <button class="btn btn-small btn-success" onclick="updateTaskStatus('${task.id}', 'done')">${t('tasksMarkDone')}</button>
      `;
    }

    if (task.status !== 'done') {
      actionsHtml += `<button class="btn btn-small btn-primary" onclick="sendReminder('${task.id}')">💝 ${t('tasksRemind')}</button>`;
    }

    actionsHtml += `<button class="btn btn-small btn-secondary" onclick="downloadTaskIcs('${task.id}')">📅 ${t('tasksDownloadIcs')}</button>`;

    return `
      <div class="task-card status-${task.status}">
        <div class="task-card-header">
          <div class="task-card-person">
            <div class="avatar" style="background: ${personColor}">${personInitials}</div>
            <span>${personName}</span>
          </div>
          ${statusBadge}
        </div>
        <div class="task-card-body">
          <h4>${task.description}</h4>
          <div class="task-card-meta">
            <span>📅 ${t('tasksDeadline')}: ${task.deadline}</span>
            ${task.reminderCount > 0 ? `<span>💌 ${task.reminderCount} ${t('tasksReminders')}</span>` : ''}
            ${meeting ? `<span>📝 ${t('tasksFromMeeting')}: ${meeting.title}</span>` : ''}
          </div>
        </div>
        <div class="task-card-reminder">"${task.friendlyReminder}"</div>
        <div class="task-card-actions">${actionsHtml}</div>
      </div>
    `;
  }).join('');

  document.getElementById('taskList').innerHTML = taskCardsHtml;
}

function getStatusLabel(status) {
  const map = {
    pending: t('statusPending'),
    in_progress: t('statusInProgress'),
    done: t('statusDone'),
    overdue: t('statusOverdue'),
  };
  return map[status] || status;
}

function setTaskFilter(filter) {
  taskStatusFilter = filter;
  renderTasksView();
}

function setTaskPersonFilter(personId) {
  taskPersonFilter = personId;
  renderTasksView();
}

function updateTaskStatus(taskId, newStatus) {
  const updates = { status: newStatus };
  if (newStatus === 'done') {
    updates.completedAt = new Date().toISOString();
  }
  Store.updateTask(taskId, updates);
  showToast('toastTaskUpdated');
  renderTasksView();
}

function sendReminder(taskId) {
  const tasks = Store.getTasks();
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const people = Store.getPeople();
  const person = people.find(p => p.id === task.personId);
  if (!person) return;

  const newCount = (task.reminderCount || 0) + 1;
  const message = formatReminderMessage(newCount, person.name, task.description);

  // Save reminder
  Store.saveReminder({
    id: 'rem_' + Date.now(),
    taskId: task.id,
    personId: person.id,
    message: message,
    sentAt: new Date().toISOString(),
    type: newCount <= 2 ? 'gentle' : newCount <= 4 ? 'firmer' : 'urgent_but_still_loving'
  });

  // Update task
  Store.updateTask(taskId, {
    reminderCount: newCount,
    lastRemindedAt: new Date().toISOString(),
    friendlyReminder: message
  });

  showToast('toastReminderSent');
  renderTasksView();
}

function downloadTaskIcs(taskId) {
  const task = Store.getTasks().find(t => t.id === taskId);
  if (!task) return;
  const person = Store.getPeople().find(p => p.id === task.personId);
  CalendarGenerator.downloadTask(task, person ? person.name : 'Unknown');
  showToast('toastIcsDownloaded');
}

// ============================================================
// VIEW 3: People
// ============================================================

function renderPeopleView() {
  const people = Store.getPeople();

  if (people.length === 0) {
    document.getElementById('peopleGrid').innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-emoji">👥</div>
        <div class="empty-state-text">${t('emptyPeople')}</div>
      </div>
    `;
    document.getElementById('personDetail').classList.remove('active');
    return;
  }

  // Rebuild stats
  const tasks = Store.getTasks();

  const gridHtml = people.map(person => {
    const personTasks = tasks.filter(t => t.personId === person.id);
    const done = personTasks.filter(t => t.status === 'done').length;
    const total = personTasks.length;

    return `
      <div class="person-card ${selectedPersonId === person.id ? 'active' : ''}"
           onclick="selectPerson('${person.id}')">
        <div class="avatar avatar-large" style="background: ${person.color}">${person.avatar}</div>
        <div class="person-card-name">${person.name}</div>
        <div class="person-card-stats">${done}/${total} ${t('peopleTasksDone')}</div>
      </div>
    `;
  }).join('');

  document.getElementById('peopleGrid').innerHTML = gridHtml;

  // Show detail if selected
  if (selectedPersonId) {
    renderPersonDetail(selectedPersonId);
  }
}

function selectPerson(personId) {
  selectedPersonId = personId;
  renderPeopleView();
}

function renderPersonDetail(personId) {
  const person = Store.getPeople().find(p => p.id === personId);
  if (!person) return;

  const tasks = Store.getTasksForPerson(personId);
  const reminders = Store.getRemindersForPerson(personId);
  const done = tasks.filter(t => t.status === 'done').length;
  const total = tasks.length;
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

  const detail = document.getElementById('personDetail');
  detail.classList.add('active');

  detail.innerHTML = `
    <div class="card">
      <div class="person-profile">
        <div class="avatar avatar-large" style="background: ${person.color}">${person.avatar}</div>
        <div>
          <h3>${person.name}</h3>
          <p class="text-muted">${done}/${total} ${t('peopleTasksDone')}</p>
        </div>
        <button class="btn btn-small btn-secondary" style="margin-left:auto;" onclick="downloadPersonIcs('${personId}')">
          📅 ${t('peopleDownloadAll')}
        </button>
      </div>

      <div class="person-stats">
        <div class="stat-card">
          <div class="stat-value">${total}</div>
          <div class="stat-label">${t('peopleTasksTotal')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${done}</div>
          <div class="stat-label">${t('peopleTasksDone')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${completionRate}%</div>
          <div class="stat-label">${t('peopleCompletionRate')}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${completionRate}%"></div>
          </div>
        </div>
      </div>

      <h4 class="mb-12">${t('peopleAllTasks')}</h4>
      ${tasks.map(task => `
        <div class="task-card status-${task.status}" style="margin-bottom: 8px;">
          <div class="task-card-header">
            <h4 style="font-size: 14px;">${task.description}</h4>
            <span class="task-card-status status-badge-${task.status}">${getStatusLabel(task.status)}</span>
          </div>
          <div class="task-card-meta">
            <span>📅 ${task.deadline}</span>
            ${task.reminderCount > 0 ? `<span>💌 ${task.reminderCount} ${t('tasksReminders')}</span>` : ''}
          </div>
          <div class="task-card-actions mt-12">
            ${task.status !== 'done' ? `
              <button class="btn btn-small btn-success" onclick="updateTaskStatusFromPeople('${task.id}', 'done')">${t('tasksMarkDone')}</button>
              <button class="btn btn-small btn-primary" onclick="sendReminderFromPeople('${task.id}')">💝 ${t('tasksRemind')}</button>
            ` : ''}
            <button class="btn btn-small btn-secondary" onclick="downloadTaskIcs('${task.id}')">📅 ${t('tasksDownloadIcs')}</button>
          </div>
        </div>
      `).join('')}

      <h4 class="mt-20 mb-12">${t('peopleReminderHistory')}</h4>
      ${reminders.length === 0 ? `<p class="text-muted text-small">${t('peopleNoReminders')}</p>` :
        reminders.map(rem => `
          <div class="reminder-item">
            <div class="reminder-time">${new Date(rem.sentAt).toLocaleDateString(getLang() === 'fi' ? 'fi-FI' : 'en-US')} ${new Date(rem.sentAt).toLocaleTimeString(getLang() === 'fi' ? 'fi-FI' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="reminder-msg">"${rem.message}"</div>
          </div>
        `).join('')
      }
    </div>
  `;
}

function updateTaskStatusFromPeople(taskId, status) {
  updateTaskStatus(taskId, status);
  renderPeopleView();
}

function sendReminderFromPeople(taskId) {
  sendReminder(taskId);
  renderPeopleView();
}

function downloadPersonIcs(personId) {
  const person = Store.getPeople().find(p => p.id === personId);
  if (!person) return;
  const tasks = Store.getTasksForPerson(personId);
  CalendarGenerator.downloadPersonTasks(tasks, person.name);
  showToast('toastIcsDownloaded');
}

// ============================================================
// VIEW 4: Dashboard
// ============================================================

function renderDashboard() {
  const meetings = Store.getMeetings();
  const tasks = Store.getTasks();
  const people = Store.getPeople();

  if (tasks.length === 0) {
    document.getElementById('dashboardContent').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">📊</div>
        <div class="empty-state-text">${t('dashNoData')}</div>
      </div>
    `;
    return;
  }

  const done = tasks.filter(t => t.status === 'done').length;
  const overdue = tasks.filter(t => t.status === 'overdue').length;
  const completionRate = Math.round((done / tasks.length) * 100);

  const moodEmoji = getMoodEmoji(completionRate, tasks.length > 0);
  const moodText = getMoodText(completionRate, tasks.length > 0);

  document.getElementById('dashboardContent').innerHTML = `
    <!-- Mood -->
    <div class="mood-card">
      <div class="mood-emoji">${moodEmoji}</div>
      <div class="mood-text">${moodText}</div>
      <p class="text-small text-muted mt-12">${t('dashMood')}</p>
    </div>

    <!-- Stats -->
    <div class="dash-stats">
      <div class="dash-stat-card">
        <div class="dash-stat-value primary">${meetings.length}</div>
        <div class="dash-stat-label">${t('dashMeetings')}</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-value warning">${tasks.length}</div>
        <div class="dash-stat-label">${t('dashTasks')}</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-value success">${completionRate}%</div>
        <div class="dash-stat-label">${t('dashCompletion')}</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-value danger">${overdue}</div>
        <div class="dash-stat-label">${t('dashOverdue')}</div>
      </div>
    </div>

    <!-- Charts -->
    <div class="dash-grid">
      <div class="dash-chart-card">
        <h3>${t('dashTasksByStatus')}</h3>
        <canvas id="statusChart" height="200"></canvas>
      </div>
      <div class="dash-chart-card">
        <h3>${t('dashByPerson')}</h3>
        <canvas id="personChart" height="200"></canvas>
      </div>
    </div>

    <!-- Recent meetings -->
    <div class="card">
      <h3 class="mb-12">${t('dashRecentMeetings')}</h3>
      ${meetings.length === 0 ? `<p class="text-muted">${t('emptyMeetings')}</p>` :
        meetings.slice(0, 5).map(m => `
          <div class="meeting-list-item">
            <div>
              <div class="meeting-list-title">${m.title}</div>
              <div class="meeting-list-meta">${m.date} · ${m.participants.join(', ')}</div>
            </div>
            <button class="btn-icon" title="${t('delete')}" onclick="deleteMeeting('${m.id}')">🗑️</button>
          </div>
        `).join('')
      }
    </div>

    <!-- Clear data -->
    <div class="text-center mt-20">
      <button class="btn btn-secondary btn-small" onclick="clearAllData()">
        🗑️ ${t('clearData')}
      </button>
    </div>
  `;

  renderCharts(tasks, people);
}

function renderCharts(tasks, people) {
  // Destroy existing charts
  Object.values(chartInstances).forEach(c => c.destroy());
  chartInstances = {};

  // Status doughnut chart
  const statusCtx = document.getElementById('statusChart');
  if (statusCtx) {
    const statusData = {
      pending: tasks.filter(t => t.status === 'pending').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      done: tasks.filter(t => t.status === 'done').length,
      overdue: tasks.filter(t => t.status === 'overdue').length,
    };

    chartInstances.status = new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: [t('statusPending'), t('statusInProgress'), t('statusDone'), t('statusOverdue')],
        datasets: [{
          data: [statusData.pending, statusData.in_progress, statusData.done, statusData.overdue],
          backgroundColor: ['#f59e0b', '#8b5cf6', '#10b981', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16 } }
        }
      }
    });
  }

  // Person bar chart
  const personCtx = document.getElementById('personChart');
  if (personCtx && people.length > 0) {
    const personLabels = people.map(p => p.name.split(' ')[0]);
    const personDone = people.map(p => tasks.filter(t => t.personId === p.id && t.status === 'done').length);
    const personRemaining = people.map(p => tasks.filter(t => t.personId === p.id && t.status !== 'done').length);

    chartInstances.person = new Chart(personCtx, {
      type: 'bar',
      data: {
        labels: personLabels,
        datasets: [
          {
            label: t('statusDone'),
            data: personDone,
            backgroundColor: '#10b981',
            borderRadius: 4
          },
          {
            label: t('statusPending'),
            data: personRemaining,
            backgroundColor: '#fde68a',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1 } }
        },
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16 } }
        }
      }
    });
  }
}

function deleteMeeting(meetingId) {
  showModal(
    t('delete'),
    t('clearDataConfirm'),
    () => {
      Store.deleteMeeting(meetingId);
      renderDashboard();
    }
  );
}

function clearAllData() {
  showModal(
    t('clearData'),
    t('clearDataConfirm'),
    () => {
      Store.clearAll();
      showToast('toastDataCleared');
      selectedPersonId = null;
      renderCurrentView();
    }
  );
}

// ============================================================
// VIEW 5: Calendar
// ============================================================

function renderCalendar() {
  const tasks = Store.getTasks();
  const people = Store.getPeople();

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const monthName = t('calMonths')[month];
  const dayHeaders = [t('calMon'), t('calTue'), t('calWed'), t('calThu'), t('calFri'), t('calSat'), t('calSun')];

  // First day of month (Monday = 0)
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Build calendar cells using Date objects for correct month/year boundaries
  const cells = [];

  // Previous month trailing days
  for (let i = startDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const d = new Date(year, month - 1, day);
    const dateStr = d.toISOString().split('T')[0];
    cells.push({ day, dateStr, otherMonth: true });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    const dateStr = d.toISOString().split('T')[0];
    cells.push({ day: i, dateStr, otherMonth: false, today: dateStr === todayStr });
  }

  // Next month leading days
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    const dateStr = d.toISOString().split('T')[0];
    cells.push({ day: i, dateStr, otherMonth: true });
  }

  // Map tasks by date
  const tasksByDate = {};
  tasks.forEach(task => {
    if (!tasksByDate[task.deadline]) tasksByDate[task.deadline] = [];
    tasksByDate[task.deadline].push(task);
  });

  const calHtml = `
    <div class="cal-header">
      <div class="cal-nav">
        <button class="cal-nav-btn" onclick="calPrev()">&lt;</button>
        <div class="cal-current">${monthName} ${year}</div>
        <button class="cal-nav-btn" onclick="calNext()">&gt;</button>
        <button class="btn btn-small btn-secondary" onclick="calToday()">${t('calToday')}</button>
      </div>
      <button class="btn btn-small btn-primary" onclick="downloadAllIcs()">📅 ${t('calDownloadAll')}</button>
    </div>

    <div class="cal-grid">
      ${dayHeaders.map(d => `<div class="cal-day-header">${d}</div>`).join('')}
      ${cells.map(cell => {
        const dayTasks = tasksByDate[cell.dateStr] || [];
        const taskDots = dayTasks.slice(0, 3).map(task => {
          const person = people.find(p => p.id === task.personId);
          const color = person ? person.color : '#999';
          return `<div class="cal-task-dot" style="background:${color}" title="${task.description}" onclick="showCalTaskDetail('${task.id}')">${task.description.substring(0, 15)}...</div>`;
        }).join('');
        const more = dayTasks.length > 3 ? `<div class="text-small text-muted">+${dayTasks.length - 3}</div>` : '';

        return `
          <div class="cal-day ${cell.otherMonth ? 'other-month' : ''} ${cell.today ? 'today' : ''}">
            <div class="cal-day-number">${cell.day}</div>
            ${taskDots}
            ${more}
          </div>
        `;
      }).join('')}
    </div>
  `;

  document.getElementById('calendarContent').innerHTML = calHtml;
}

function calPrev() {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar();
}

function calNext() {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar();
}

function calToday() {
  calendarDate = new Date();
  renderCalendar();
}

function showCalTaskDetail(taskId) {
  const task = Store.getTasks().find(t => t.id === taskId);
  if (!task) return;
  const person = Store.getPeople().find(p => p.id === task.personId);

  showModal(
    task.description,
    `
      <strong>${person ? person.name : '?'}</strong><br>
      📅 ${t('tasksDeadline')}: ${task.deadline}<br>
      <em>"${task.friendlyReminder}"</em><br>
      <span class="task-card-status status-badge-${task.status}">${getStatusLabel(task.status)}</span>
    `,
    () => {
      switchView('tasks');
    }
  );
}

function downloadAllIcs() {
  const tasks = Store.getTasks();
  const people = Store.getPeople();
  CalendarGenerator.downloadAllTasks(tasks, people);
  showToast('toastIcsDownloaded');
}
