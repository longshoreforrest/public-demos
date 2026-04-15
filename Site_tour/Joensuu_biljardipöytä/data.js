// Siili Joensuu - Biljardipöydän hallinta - Data
// ================================================

const PLAYERS = [
  { id: 1, name: 'Matti Virtanen', nick: 'Mansen Matti', emoji: '🎱', skill: 4, wins: 12, losses: 5, streak: 3, motto: 'Biljardi on shakkia, mutta parempaa.' },
  { id: 2, name: 'Liisa Korhonen', nick: 'Liisa The Cue', emoji: '🔥', skill: 5, wins: 18, losses: 3, streak: 7, motto: 'Ei hätää, kaikki pallot löytävät tiensä taskuun.' },
  { id: 3, name: 'Juha Nieminen', nick: 'Juhis', emoji: '🍺', skill: 3, wins: 8, losses: 10, streak: -2, motto: 'Pelataan rennosti, tulokset on sivuseikka.' },
  { id: 4, name: 'Anna Mäkelä', nick: 'Trick Shot Anna', emoji: '✨', skill: 5, wins: 15, losses: 4, streak: 5, motto: 'Jos se ei mene suoraan, se menee kulmien kautta.' },
  { id: 5, name: 'Pekka Laine', nick: 'Peten Pool', emoji: '🎯', skill: 2, wins: 3, losses: 14, streak: -4, motto: 'Joku päivä voitan Liisan. Joku päivä.' },
  { id: 6, name: 'Sanna Heikkinen', nick: 'Sanna Snooker', emoji: '💎', skill: 4, wins: 11, losses: 7, streak: 1, motto: 'Keskittyminen on kaikki kaikessa.' },
  { id: 7, name: 'Timo Repo', nick: 'Tipi Timo', emoji: '🎸', skill: 3, wins: 7, losses: 9, streak: 0, motto: 'Biljardi ja kahvi - perjantain parhaat.' },
  { id: 8, name: 'Katja Salminen', nick: 'K-Salama', emoji: '⚡', skill: 4, wins: 13, losses: 6, streak: 2, motto: 'Nopeus ei ole valttia, mutta se on hauskaa.' },
  { id: 9, name: 'Mikko Turunen', nick: 'Mikko "Miss" Turunen', emoji: '😅', skill: 1, wins: 1, losses: 18, streak: -8, motto: 'Osallistuminen on tärkeintä. Ainakin niin sanotaan.' },
  { id: 10, name: 'Henna Lahtinen', nick: 'Henkka', emoji: '🏆', skill: 5, wins: 20, losses: 2, streak: 10, motto: 'Hallitsen pöytää, hallitsen elämää.' },
  { id: 11, name: 'Ville Koskinen', nick: 'Villa', emoji: '🦊', skill: 3, wins: 9, losses: 8, streak: 1, motto: 'Voittaminen on kivaa, häviäminen opettavaista.' },
  { id: 12, name: 'Outi Järvinen', nick: 'Outi Break', emoji: '💥', skill: 4, wins: 14, losses: 5, streak: 4, motto: 'Ensimmäinen lyönti ratkaisee kaiken.' },
];

// Generate reservations for current week
function generateWeekReservations() {
  const reservations = [];
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

  const reasons = [
    'Lounasbilsa', 'Iltapäivän rentoutus', 'Aamu-warm-up', 'Kahvitauon kepitys',
    'Strateginen palaveri pöydän ääressä', 'Retro-peli', 'Sprintin jälkeinen dekomppressio',
    'Perjantai-fiilis', 'Haastajan haaste', 'Vapaa peli'
  ];

  let id = 1;
  for (let d = 0; d < 5; d++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + d);
    const dateStr = day.toISOString().split('T')[0];

    // 3-6 reservations per day
    const count = 3 + Math.floor(Math.random() * 4);
    const usedSlots = new Set();

    for (let r = 0; r < count; r++) {
      let slotIdx;
      do {
        slotIdx = Math.floor(Math.random() * timeSlots.length);
      } while (usedSlots.has(slotIdx));
      usedSlots.add(slotIdx);

      const p1 = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
      let p2;
      do {
        p2 = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
      } while (p2.id === p1.id);

      reservations.push({
        id: id++,
        date: dateStr,
        time: timeSlots[slotIdx],
        duration: 30,
        player1: p1.id,
        player2: p2.id,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        status: d < ((now.getDay() + 6) % 7) ? 'played' : 'upcoming'
      });
    }
  }

  return reservations.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });
}

const RESERVATIONS = generateWeekReservations();

// Tournaments
const TOURNAMENTS = [
  {
    id: 1,
    name: 'Siili Joensuu Kevätmestaruus 2026',
    status: 'active',
    type: 'single-elimination',
    startDate: '2026-04-14',
    endDate: '2026-04-25',
    description: 'Joensuun toimiston kevään suurin biljardispektaakkeli! Voittaja saa kultaisen kepinpidikkeen ja ikuisen kunnian.',
    prize: '🏆 Kultainen Kepinpidike + lounaslahjakortti 50€',
    participants: [1, 2, 4, 6, 8, 10, 11, 12],
    bracket: [
      // Round 1 (quarter-finals)
      { round: 1, match: 1, player1: 1, player2: 12, winner: 12, score: '2-3' },
      { round: 1, match: 2, player1: 2, player2: 11, winner: 2, score: '3-1' },
      { round: 1, match: 3, player1: 4, player2: 8, winner: null, score: null },
      { round: 1, match: 4, player1: 6, player2: 10, winner: null, score: null },
      // Round 2 (semi-finals)
      { round: 2, match: 5, player1: 12, player2: 2, winner: null, score: null },
      { round: 2, match: 6, player1: null, player2: null, winner: null, score: null },
      // Finals
      { round: 3, match: 7, player1: null, player2: null, winner: null, score: null },
    ]
  },
  {
    id: 2,
    name: 'Perjantai Fun Cup #14',
    status: 'upcoming',
    type: 'round-robin',
    startDate: '2026-04-17',
    endDate: '2026-04-17',
    description: 'Rento perjantain turnaus - kaikki pelaa kaikkia vastaan! Häviäjä ostaa kahvit.',
    prize: '☕ Häviäjä ostaa kahvit kaikille',
    participants: [1, 3, 5, 7, 9],
    bracket: []
  },
  {
    id: 3,
    name: 'Siili Joensuu Talviklassikko 2026',
    status: 'completed',
    type: 'single-elimination',
    startDate: '2026-01-15',
    endDate: '2026-01-30',
    description: 'Talven legendaarinen turnaus. Voittaja: Henna "Henkka" Lahtinen.',
    prize: '🏆 Hopeinen Biljardipallo',
    participants: [1, 2, 3, 4, 5, 6, 10, 12],
    bracket: [
      { round: 1, match: 1, player1: 1, player2: 5, winner: 1, score: '3-0' },
      { round: 1, match: 2, player1: 2, player2: 6, winner: 2, score: '3-2' },
      { round: 1, match: 3, player1: 3, player2: 10, winner: 10, score: '1-3' },
      { round: 1, match: 4, player1: 4, player2: 12, winner: 12, score: '2-3' },
      { round: 2, match: 5, player1: 1, player2: 2, winner: 2, score: '1-3' },
      { round: 2, match: 6, player1: 10, player2: 12, winner: 10, score: '3-2' },
      { round: 3, match: 7, player1: 2, player2: 10, winner: 10, score: '2-3' },
    ]
  }
];

// Humorous Slack messages for auto-pairing
const SLACK_GREETINGS = [
  '🎱 HUOMIO HUOMIO! Biljardipöytä kaipaa rakkautta!',
  '🚨 HÄLYTYS: Biljardipöytä on ollut tyhjillään jo 47 minuuttia. Tämä on hätätilanne.',
  '📢 Biljardipöydän päivittäinen kuulutus:',
  '🎱 Terveisiä biljardipöydältä! Minulla on ikävä teitä.',
  '⚡ BREAKING NEWS: Joensuu Office Pool Table Update',
  '🎯 Biljardipöytä ilmoittaa:',
];

const SLACK_PAIR_MESSAGES = [
  '{p1} ja {p2}, teidät on valittu tämän päivän kunniatehtävään: biljardimatsiin klo {time}! Kieltäytyminen johtaa kahvikoneen käyttökieltoon.',
  'Hei {p1}! 🎱 Haastaja lähestyy... {p2} on valmis ottamaan sinut vastaan klo {time}. Peruuttaminen ei ole vaihtoehto.',
  'AUTOMAATTINEN PARITUS: {p1} 🆚 {p2} klo {time}. Tilastollinen analyysi ennustaa jännittävää matsia. Yleisö on jo innostunut.',
  '{p1}, kuulin että kehuskelit taidoillasi. {p2} haluaa todistaa oletko oikeassa. Klo {time}, pöytä odottaa. 🎱',
  'Algoritmi on puhunut! {p1} ja {p2} - teidän taitotasonne on optimaalinen jännittävälle pelille. Aika: {time}. Keppi käteen!',
  '🎱 {p1}: sinulla on {time} aikaa saapua pöydälle. {p2} odottaa jo. Tai no, ei oikeasti, mutta varaa silti aika!',
  'Tänään taistelevat: {p1} (voittoputki: käynnissä vai ei?) vs. {p2} (motivaatio: maksimaalinen). Klo {time}. Popcornit mukaan!',
];

const SLACK_RANDOM_MESSAGES = [
  { type: 'tip', text: '💡 Päivän vinkki: Älä lyö valkoista palloa suoraan taskuun. Se ei tuota pisteitä. Tiedän, yllätys.' },
  { type: 'stat', text: '📊 Tämän viikon tilasto: {count} peliä pelattu, {hours} tuntia biljardiviihdettä. Tuottavuus on laskenut 12%, mutta viihtyvyys noussut 340%.' },
  { type: 'quote', text: '🗣️ "Biljardi on kuin ohjelmointi - näyttää helpolta, kunnes yrittää itse." - Tuntematon Siililäinen' },
  { type: 'quote', text: '🗣️ "git push --force on kuin liian kova lyönti biljardissa - joskus toimii, yleensä katastrofi." - Joensuun viisaus' },
  { type: 'achievement', text: '🏅 SAAVUTUS AVATTU: {player} on pelannut {games} peliä! Tittelinä nyt: "{title}"' },
  { type: 'reminder', text: '⏰ Muistutus: Biljardipöytä on käytettävissä klo 8-17. Sen jälkeen pöytä nukkuu. Älkää herättäkö.' },
  { type: 'fun', text: '🎱 Tiesitkö? Biljardipallo numero 8 on mustempi kuin maanantaiaamun kahvi.' },
  { type: 'challenge', text: '🏆 VIIKON HAASTE: Kuka pystyy tekemään pisimmän putkivoiton? Nykyinen ennätys: {record} peliä ({holder}).' },
  { type: 'fun', text: '🤖 Olen biljardipöytä ja hyväksyn tämän viestin. Pelaajat, tulkaa luokseni.' },
  { type: 'weather', text: '☀️ Ulkona on {weather}, mutta sisällä on AINA biljardisää. Keppi käteen ja tänne!' },
];

// Match history - detailed game records for analytics drill-down
function generateMatchHistory() {
  const history = [];
  const now = new Date();
  let id = 1;

  // Generate ~80 matches over the past 3 months
  for (let daysAgo = 90; daysAgo >= 0; daysAgo--) {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends

    // 0-3 matches per day
    const matchCount = Math.floor(Math.random() * 3.5);
    for (let m = 0; m < matchCount; m++) {
      const p1 = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
      let p2;
      do { p2 = PLAYERS[Math.floor(Math.random() * PLAYERS.length)]; } while (p2.id === p1.id);

      // Weighted winner based on skill
      const p1Chance = p1.skill / (p1.skill + p2.skill);
      const winner = Math.random() < p1Chance ? p1.id : p2.id;
      const loser = winner === p1.id ? p2.id : p1.id;

      const winScore = 3;
      const loseScore = Math.floor(Math.random() * 3);

      const hours = 9 + Math.floor(Math.random() * 8);
      const mins = Math.random() > 0.5 ? '30' : '00';

      history.push({
        id: id++,
        date: date.toISOString().split('T')[0],
        time: `${String(hours).padStart(2, '0')}:${mins}`,
        player1: p1.id,
        player2: p2.id,
        winner: winner,
        loser: loser,
        score: `${winner === p1.id ? winScore : loseScore}-${winner === p2.id ? winScore : loseScore}`,
        duration: 15 + Math.floor(Math.random() * 25),
      });
    }
  }
  return history;
}

const MATCH_HISTORY = generateMatchHistory();

const ACHIEVEMENT_TITLES = [
  { games: 1, title: 'Aloittelija' },
  { games: 5, title: 'Innokas kepittäjä' },
  { games: 10, title: 'Vakiopelaaja' },
  { games: 15, title: 'Biljardimestari' },
  { games: 20, title: 'Pöydän herra/rouva' },
  { games: 30, title: 'Legenda' },
  { games: 50, title: 'Biljardijumala' },
];

const WEATHER_OPTIONS = ['aurinkoista', 'pilvistä', 'sateista', 'lumista', '-15°C', '+22°C ja kesäistä', 'tyypillistä Joensuuta'];

// Translations
const TRANSLATIONS = {
  fi: {
    appTitle: 'Siili Pool',
    appSubtitle: 'Joensuun toimiston biljardipöydän hallinta',
    tabCalendar: 'Varaukset',
    tabPlayers: 'Pelaajat',
    tabTournaments: 'Turnaukset',
    tabSlack: 'Slack',
    guide: 'Käyttöohje →',
    weekLabel: 'Viikko',
    today: 'Tänään',
    bookSlot: '+ Varaa aika',
    noReservations: 'Ei varauksia tälle päivälle',
    players: 'Pelaajat',
    skill: 'Taitotaso',
    wins: 'Voitot',
    losses: 'Häviöt',
    streak: 'Putki',
    motto: 'Motto',
    rank: 'Sija',
    leaderboard: 'Tulostaulukko',
    allPlayers: 'Kaikki pelaajat',
    activeTournaments: 'Aktiiviset turnaukset',
    upcomingTournaments: 'Tulevat turnaukset',
    completedTournaments: 'Päättyneet turnaukset',
    quarterfinals: 'Puolivälierät',
    semifinals: 'Välierät',
    finals: 'Finaali',
    winner: 'Voittaja',
    tbd: 'TBD',
    vs: 'vs',
    slackChannel: '#joensuu-biljardi',
    autoPair: '🎲 Automaattinen paritus',
    sendMessage: 'Lähetä',
    typeMessage: 'Kirjoita viesti...',
    generatePairing: 'Arvo uusi pari',
    pairAndBook: 'Parita & Varaa',
    newReservation: 'Uusi varaus',
    player1: 'Pelaaja 1',
    player2: 'Pelaaja 2',
    time: 'Aika',
    reason: 'Syy',
    cancel: 'Peruuta',
    save: 'Tallenna',
    played: 'Pelattu',
    upcoming: 'Tulossa',
    reserved: 'Varattu',
    free: 'Vapaa',
    mon: 'Ma', tue: 'Ti', wed: 'Ke', thu: 'To', fri: 'Pe',
    monday: 'Maanantai', tuesday: 'Tiistai', wednesday: 'Keskiviikko', thursday: 'Torstai', friday: 'Perjantai',
    round: 'Kierros',
    match: 'Ottelu',
    prize: 'Palkinto',
    participants: 'Osallistujat',
    status: 'Tila',
    active: 'Käynnissä',
    completed: 'Päättynyt',
    pairingHistory: 'Paritushistoria',
    slackBot: 'Biljardibotti',
    tabAnalytics: 'Analytiikka',
    anSelectPlayer: 'Valitse pelaaja:',
  },
  en: {
    appTitle: 'Siili Pool',
    appSubtitle: 'Joensuu office pool table management',
    tabCalendar: 'Reservations',
    tabPlayers: 'Players',
    tabTournaments: 'Tournaments',
    tabSlack: 'Slack',
    guide: 'User guide →',
    weekLabel: 'Week',
    today: 'Today',
    bookSlot: '+ Book slot',
    noReservations: 'No reservations for this day',
    players: 'Players',
    skill: 'Skill',
    wins: 'Wins',
    losses: 'Losses',
    streak: 'Streak',
    motto: 'Motto',
    rank: 'Rank',
    leaderboard: 'Leaderboard',
    allPlayers: 'All players',
    activeTournaments: 'Active tournaments',
    upcomingTournaments: 'Upcoming tournaments',
    completedTournaments: 'Completed tournaments',
    quarterfinals: 'Quarter-finals',
    semifinals: 'Semi-finals',
    finals: 'Final',
    winner: 'Winner',
    tbd: 'TBD',
    vs: 'vs',
    slackChannel: '#joensuu-billiards',
    autoPair: '🎲 Auto-pair',
    sendMessage: 'Send',
    typeMessage: 'Type a message...',
    generatePairing: 'Generate new pair',
    pairAndBook: 'Pair & Book',
    newReservation: 'New reservation',
    player1: 'Player 1',
    player2: 'Player 2',
    time: 'Time',
    reason: 'Reason',
    cancel: 'Cancel',
    save: 'Save',
    played: 'Played',
    upcoming: 'Upcoming',
    reserved: 'Reserved',
    free: 'Free',
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri',
    monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday',
    round: 'Round',
    match: 'Match',
    prize: 'Prize',
    participants: 'Participants',
    status: 'Status',
    active: 'Active',
    completed: 'Completed',
    pairingHistory: 'Pairing history',
    slackBot: 'Pool Bot',
    tabAnalytics: 'Analytics',
    anSelectPlayer: 'Select player:',
  }
};
