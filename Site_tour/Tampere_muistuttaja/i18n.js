// ============================================================
// i18n.js - Kaksikielisyys / Bilingual support (FI/EN)
// Tampere Muistuttaja - "Rakkaudella muistuttaa sovituista asioista"
// ============================================================

const I18N = {
  fi: {
    // App
    appTitle: 'Lempeä Muistuttaja',
    appSubtitle: 'Rakkaudella muistuttaa sovituista asioista',
    langSwitch: 'EN',

    // Navigation
    navNewMeeting: 'Uusi kokous',
    navTasks: 'Tehtävät',
    navPeople: 'Henkilöt',
    navDashboard: 'Yleiskatsaus',
    navCalendar: 'Kalenteri',

    // New meeting view
    meetingTitle: 'Uusi kokous',
    meetingSubtitle: 'Liitä kokouksen muistiinpanot tai transkripti alle',
    meetingPlaceholder: 'Liitä kokouksen transkripti tähän...\n\nEsimerkki:\n"Matti hoitaa API-dokumentaation perjantaihin mennessä.\nLiisa tekee käyttöliittymän mockupin keskiviikkoon mennessä."',
    meetingAnalyze: 'Analysoi',
    meetingTryDemo: 'Kokeile demolla',
    meetingConfirm: 'Vahvista ja luo muistutukset',
    meetingEdit: 'Muokkaa',
    meetingSave: 'Tallenna',
    meetingCancel: 'Peruuta',
    meetingSummary: 'Yhteenveto',
    meetingParticipants: 'Osallistujat',
    meetingTasks: 'Tehtävät',
    meetingSelectDemo: 'Valitse esimerkkikokous',
    meetingLoadAll: 'Lataa kaikki esimerkit',
    meetingLoadAllConfirm: 'Ladataan 5 esimerkkikokousta kaikkine tehtävineen ja muistutuksineen. Nykyinen data korvataan. Jatketaanko?',
    meetingLoadAllDone: 'Esimerkkidata ladattu! 5 kokousta, useita tehtäviä eri statuksilla ja muistutuksia.',

    // Tasks view
    tasksTitle: 'Tehtävät',
    tasksSubtitle: 'Kaikki sovitut tehtävät yhdessä paikassa',
    tasksFilterAll: 'Kaikki',
    tasksFilterPending: 'Odottaa',
    tasksFilterInProgress: 'Työn alla',
    tasksFilterDone: 'Hoidettu',
    tasksFilterOverdue: 'Myöhässä',
    tasksFilterPerson: 'Henkilö',
    tasksRemind: 'Muistuta lempeästi',
    tasksMarkDone: 'Merkitse tehdyksi',
    tasksMarkInProgress: 'Aloita työ',
    tasksDeadline: 'Deadline',
    tasksReminders: 'muistutusta lähetetty',
    tasksNoTasks: 'Ei tehtäviä tässä kategoriassa.',
    tasksDownloadIcs: 'Lataa kalenteriin',
    tasksFromMeeting: 'Kokouksesta',

    // Status labels
    statusPending: 'Odottaa rakkautta',
    statusInProgress: 'Työn alla',
    statusDone: 'Hoidettu!',
    statusOverdue: 'Myöhässä (ei hätä)',

    // People view
    peopleTitle: 'Henkilöt',
    peopleSubtitle: 'Kuka tekee mitäkin ja miten menee',
    peopleTasksDone: 'tehtävää tehty',
    peopleTasksTotal: 'tehtävää yhteensä',
    peopleCompletionRate: 'Valmistumisaste',
    peopleReminderHistory: 'Muistutushistoria',
    peopleNoReminders: 'Ei muistutuksia vielä - kaikki hoituu!',
    peopleAllTasks: 'Kaikki tehtävät',
    peopleNoPeople: 'Ei henkilöitä vielä. Lisää kokous ensin!',
    peopleDownloadAll: 'Lataa kaikki kalenteriin',

    // Dashboard
    dashTitle: 'Yleiskatsaus',
    dashSubtitle: 'Miten hommat edistyvät',
    dashMeetings: 'Kokouksia',
    dashTasks: 'Tehtäviä',
    dashCompletion: 'Valmis',
    dashOverdue: 'Myöhässä',
    dashTasksByStatus: 'Tehtävät statusittain',
    dashByPerson: 'Henkilöittäin',
    dashRecentMeetings: 'Viimeisimmät kokoukset',
    dashMood: 'Muistuttajan mielitila',
    dashNoData: 'Ei dataa vielä. Lisää ensimmäinen kokous!',

    // Calendar view
    calTitle: 'Kalenteri',
    calSubtitle: 'Tehtävät aikajanalla',
    calToday: 'Tänään',
    calWeek: 'Viikko',
    calMonth: 'Kuukausi',
    calDownloadAll: 'Lataa kaikki (.ics)',
    calNoTasks: 'Ei tehtäviä tälle ajanjaksolle.',
    calMon: 'Ma', calTue: 'Ti', calWed: 'Ke', calThu: 'To',
    calFri: 'Pe', calSat: 'La', calSun: 'Su',
    calMonths: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
                'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],

    // Mood indicators
    mood100: 'Onnesta soikea! Kaikki on tehty!',
    mood75: 'Melkein maalissa! Vähän vielä.',
    mood50: 'Puolivälissä — kahvia ja sisua.',
    mood25: 'Hmm, olisiko aika muistuttaa...',
    mood0: 'Muistuttaja itkee sisäisesti mutta rakastaa silti.',
    moodEmpty: 'Muistuttaja odottaa ensimmäistä kokousta...',

    // Loading messages (rotating)
    loadingMessages: [
      'Luetaan rivien välistä...',
      'Etsitään piilotettuja lupauksia...',
      'Kahvitauko on ohi, palataan todellisuuteen...',
      'Tunnistetaan kuka lupasi mitäkin...',
      'Muotoillaan lempeitä muistutuksia...',
      'Lasketaan tehtäviä rakkaudella...',
    ],

    // Empty states
    emptyMeetings: 'Täällä on hiljaista kuin Lapin erämaa marraskuussa. Lisää kokous!',
    emptyTasks: 'Ei tehtäviä — nautitaan hetkestä!',
    emptyPeople: 'Ketään ei ole vielä näkynyt. Pidä kokous ensin!',

    // Reminder escalation templates
    reminderLevel1: 'Hei {name}, muistutetaan vain lempeästi — {task} odottaa vielä sinua.',
    reminderLevel2: 'Rakas {name}, tuo "{task}" vielä odottaa hellää kosketustasi. Ei kiirettä, mutta kuitenkin.',
    reminderLevel3: 'Kultaseni {name}, tiedän että olet kiireinen, mutta "{task}" kaipaa huomiotasi. Se tuntee itsensä unohdetuksi.',
    reminderLevel4: '{name}, rakkain ystäväni! "{task}" on kirjoittanut sinulle rakkauskirjeen ja odottaa vastausta. Älä riko sen sydäntä!',
    reminderLevel5: 'HÄLYTYS: {name}, "{task}" on pakannut laukkunsa ja uhkaa muuttaa pois. Vain sinä voit pelastaa tilanteen!',

    // Toasts
    toastTaskCreated: 'Tehtävät luotu onnistuneesti!',
    toastTaskUpdated: 'Tehtävä päivitetty!',
    toastReminderSent: 'Lempeä muistutus lähetetty!',
    toastIcsDownloaded: 'Kalenteritiedosto ladattu!',
    toastMeetingSaved: 'Kokous tallennettu!',
    toastDataCleared: 'Tiedot tyhjennetty!',

    // Misc
    clearData: 'Tyhjennä kaikki tiedot',
    clearDataConfirm: 'Haluatko varmasti tyhjentää kaikki tiedot? Tätä ei voi perua.',
    yes: 'Kyllä',
    no: 'Ei',
    close: 'Sulje',
    delete: 'Poista',
    noMeeting: 'Ei kokousta',
  },

  en: {
    // App
    appTitle: 'Gentle Reminder',
    appSubtitle: 'Lovingly reminding about agreed things',
    langSwitch: 'FI',

    // Navigation
    navNewMeeting: 'New meeting',
    navTasks: 'Tasks',
    navPeople: 'People',
    navDashboard: 'Dashboard',
    navCalendar: 'Calendar',

    // New meeting view
    meetingTitle: 'New meeting',
    meetingSubtitle: 'Paste meeting notes or transcript below',
    meetingPlaceholder: 'Paste meeting transcript here...\n\nExample:\n"Matt will handle the API documentation by Friday.\nLisa will create the UI mockup by Wednesday."',
    meetingAnalyze: 'Analyze',
    meetingTryDemo: 'Try with demo',
    meetingConfirm: 'Confirm and create reminders',
    meetingEdit: 'Edit',
    meetingSave: 'Save',
    meetingCancel: 'Cancel',
    meetingSummary: 'Summary',
    meetingParticipants: 'Participants',
    meetingTasks: 'Tasks',
    meetingSelectDemo: 'Select example meeting',
    meetingLoadAll: 'Load all examples',
    meetingLoadAllConfirm: 'Loading 5 example meetings with tasks and reminders. Current data will be replaced. Continue?',
    meetingLoadAllDone: 'Sample data loaded! 5 meetings, multiple tasks in various statuses, and reminders.',

    // Tasks view
    tasksTitle: 'Tasks',
    tasksSubtitle: 'All agreed tasks in one place',
    tasksFilterAll: 'All',
    tasksFilterPending: 'Pending',
    tasksFilterInProgress: 'In progress',
    tasksFilterDone: 'Done',
    tasksFilterOverdue: 'Overdue',
    tasksFilterPerson: 'Person',
    tasksRemind: 'Send gentle reminder',
    tasksMarkDone: 'Mark as done',
    tasksMarkInProgress: 'Start work',
    tasksDeadline: 'Deadline',
    tasksReminders: 'reminders sent',
    tasksNoTasks: 'No tasks in this category.',
    tasksDownloadIcs: 'Add to calendar',
    tasksFromMeeting: 'From meeting',

    // Status labels
    statusPending: 'Awaiting love',
    statusInProgress: 'In progress',
    statusDone: 'Done!',
    statusOverdue: 'Overdue (no worries)',

    // People view
    peopleTitle: 'People',
    peopleSubtitle: 'Who is doing what and how it\'s going',
    peopleTasksDone: 'tasks done',
    peopleTasksTotal: 'tasks total',
    peopleCompletionRate: 'Completion rate',
    peopleReminderHistory: 'Reminder history',
    peopleNoReminders: 'No reminders yet — everything is on track!',
    peopleAllTasks: 'All tasks',
    peopleNoPeople: 'No people yet. Add a meeting first!',
    peopleDownloadAll: 'Download all to calendar',

    // Dashboard
    dashTitle: 'Dashboard',
    dashSubtitle: 'How things are progressing',
    dashMeetings: 'Meetings',
    dashTasks: 'Tasks',
    dashCompletion: 'Complete',
    dashOverdue: 'Overdue',
    dashTasksByStatus: 'Tasks by status',
    dashByPerson: 'By person',
    dashRecentMeetings: 'Recent meetings',
    dashMood: 'Reminder agent mood',
    dashNoData: 'No data yet. Add your first meeting!',

    // Calendar view
    calTitle: 'Calendar',
    calSubtitle: 'Tasks on the timeline',
    calToday: 'Today',
    calWeek: 'Week',
    calMonth: 'Month',
    calDownloadAll: 'Download all (.ics)',
    calNoTasks: 'No tasks for this period.',
    calMon: 'Mon', calTue: 'Tue', calWed: 'Wed', calThu: 'Thu',
    calFri: 'Fri', calSat: 'Sat', calSun: 'Sun',
    calMonths: ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'],

    // Mood indicators
    mood100: 'Over the moon! Everything is done!',
    mood75: 'Almost there! Just a little more.',
    mood50: 'Halfway — coffee and determination.',
    mood25: 'Hmm, perhaps time for a reminder...',
    mood0: 'The reminder agent is crying inside but still loves you.',
    moodEmpty: 'Waiting for the first meeting...',

    // Loading messages
    loadingMessages: [
      'Reading between the lines...',
      'Searching for hidden promises...',
      'Coffee break is over, back to reality...',
      'Figuring out who promised what...',
      'Crafting gentle reminders...',
      'Counting tasks with love...',
    ],

    // Empty states
    emptyMeetings: 'It\'s as quiet as a Finnish forest in November. Add a meeting!',
    emptyTasks: 'No tasks — let\'s enjoy the moment!',
    emptyPeople: 'Nobody here yet. Hold a meeting first!',

    // Reminder escalation templates
    reminderLevel1: 'Hey {name}, just a gentle reminder — "{task}" is still waiting for you.',
    reminderLevel2: 'Dear {name}, "{task}" is still awaiting your tender touch. No rush, but still.',
    reminderLevel3: 'Dearest {name}, I know you\'re busy, but "{task}" needs your attention. It\'s feeling forgotten.',
    reminderLevel4: '{name}, my beloved friend! "{task}" has written you a love letter and awaits your reply. Don\'t break its heart!',
    reminderLevel5: 'ALERT: {name}, "{task}" has packed its bags and threatens to leave. Only you can save the situation!',

    // Toasts
    toastTaskCreated: 'Tasks created successfully!',
    toastTaskUpdated: 'Task updated!',
    toastReminderSent: 'Gentle reminder sent!',
    toastIcsDownloaded: 'Calendar file downloaded!',
    toastMeetingSaved: 'Meeting saved!',
    toastDataCleared: 'All data cleared!',

    // Misc
    clearData: 'Clear all data',
    clearDataConfirm: 'Are you sure you want to clear all data? This cannot be undone.',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    delete: 'Delete',
    noMeeting: 'No meeting',
  }
};

// Current language state
let currentLang = localStorage.getItem('tm_lang') || 'fi';

function t(key) {
  return I18N[currentLang][key] || I18N['fi'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('tm_lang', lang);
}

function getLang() {
  return currentLang;
}

function toggleLang() {
  const newLang = currentLang === 'fi' ? 'en' : 'fi';
  setLang(newLang);
  return newLang;
}

function formatReminderMessage(level, name, task) {
  const key = `reminderLevel${Math.min(level, 5)}`;
  return t(key).replace('{name}', name).replace('{task}', task);
}

function getRandomLoadingMessage() {
  const messages = t('loadingMessages');
  return messages[Math.floor(Math.random() * messages.length)];
}

function getMoodText(completionPercent, hasTasks) {
  if (!hasTasks) return t('moodEmpty');
  if (completionPercent === 100) return t('mood100');
  if (completionPercent >= 75) return t('mood75');
  if (completionPercent >= 50) return t('mood50');
  if (completionPercent >= 25) return t('mood25');
  return t('mood0');
}

function getMoodEmoji(completionPercent, hasTasks) {
  if (!hasTasks) return '💤';
  if (completionPercent === 100) return '🥰';
  if (completionPercent >= 75) return '😊';
  if (completionPercent >= 50) return '🤔';
  if (completionPercent >= 25) return '😟';
  return '😭';
}
