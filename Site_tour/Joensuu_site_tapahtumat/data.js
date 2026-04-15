// data.js — Joensuu Site Tapahtumat
// Event data and category definitions

const EVENT_CATEGORIES = [
  { id: 'site-monthly',    emoji: '🏢', color: '#0891b2', fi: 'Site Monthly',         en: 'Site Monthly' },
  { id: 'ai-club',         emoji: '🤖', color: '#7c3aed', fi: 'AI-klubi',             en: 'AI Club' },
  { id: 'board-games',     emoji: '🎲', color: '#059669', fi: 'Lautapelikerho',       en: 'Board Game Club' },
  { id: 'sports',          emoji: '⚽', color: '#dc2626', fi: 'Liikuntakerho',        en: 'Sports Club' },
  { id: 'book-club',       emoji: '📚', color: '#b45309', fi: 'Lukupiiri',            en: 'Book Club' },
  { id: 'coding-dojo',     emoji: '💻', color: '#4f46e5', fi: 'Coding Dojo',          en: 'Coding Dojo' },
  { id: 'friday-social',   emoji: '🍻', color: '#d97706', fi: 'Perjantaibisset',      en: 'Friday Social' },
  { id: 'visiting-speaker',emoji: '🎤', color: '#be185d', fi: 'Vieraileva puhuja',    en: 'Visiting Speaker' },
  { id: 'tech-talk',       emoji: '🔧', color: '#0d9488', fi: 'Tech Talk',            en: 'Tech Talk' },
  { id: 'wellbeing',       emoji: '🧘', color: '#16a34a', fi: 'Hyvinvointipäivä',     en: 'Wellbeing Day' },
  { id: 'hackathon',       emoji: '🚀', color: '#ea580c', fi: 'Hackathon',            en: 'Hackathon' },
  { id: 'movie-night',     emoji: '🎬', color: '#9333ea', fi: 'Leffailta',            en: 'Movie Night' },
  { id: 'strategy',        emoji: '📊', color: '#0369a1', fi: 'Strategiakatsaus',     en: 'Strategy Update' },
  { id: 'onboarding',      emoji: '👋', color: '#ca8a04', fi: 'Onboarding-päivä',     en: 'Onboarding Day' },
  { id: 'lunch-learn',     emoji: '🥗', color: '#65a30d', fi: 'Lunch & Learn',        en: 'Lunch & Learn' },
  { id: 'retro',           emoji: '🔄', color: '#6366f1', fi: 'Site Retro',           en: 'Site Retro' },
];

// Generate events spanning Apr–Sep 2026
function generateEvents() {
  const events = [];
  let id = 1;

  function ev(cat, titleFi, titleEn, date, time, duration, descFi, descEn, location, recurring) {
    events.push({
      id: id++,
      category: cat,
      title: { fi: titleFi, en: titleEn },
      date: date,
      time: time,
      duration: duration,
      description: { fi: descFi, en: descEn },
      location: location || 'Joensuu-toimisto',
      recurring: recurring || null,
    });
  }

  // === Visiting Speaker — today ===
  ev('visiting-speaker', 'AI ja agenttisen kehityksen tulevaisuus: Tapio ja Tomi',
    'Future of AI and Agentic Development: Tapio & Tomi',
    '2026-04-15', '15:00', 60,
    'Tapio ja Tomi keskustelevat AI-agenttien tulevaisuudesta ja siitä, miten agenttinen kehitys muuttaa ohjelmistotyötä.',
    'Tapio and Tomi discuss the future of AI agents and how agentic development is transforming software work.',
    'Neuvotteluhuone Koli + Teams', null);

  // === Site Monthly — last Thursday of each month ===
  ev('site-monthly', 'Site Monthly: Huhtikuu', 'Site Monthly: April',
    '2026-04-30', '16:00', 90,
    'Kuukauden kuulumiset, uudet projektit ja vapaa keskustelu. Tarjolla pizzaa!',
    'Monthly news, new projects and open discussion. Pizza provided!',
    'Neuvotteluhuone Koli + Teams', 'Kuukauden viimeinen torstai');
  ev('site-monthly', 'Site Monthly: Toukokuu', 'Site Monthly: May',
    '2026-05-28', '16:00', 90,
    'Kesäkauden aloitus, kesäjuhlien suunnittelu.',
    'Summer season kick-off, planning the summer party.',
    'Neuvotteluhuone Koli + Teams', 'Kuukauden viimeinen torstai');
  ev('site-monthly', 'Site Monthly: Kesäkuu', 'Site Monthly: June',
    '2026-06-25', '16:00', 90,
    'Puolivuotiskatsaus ja kesälomien toivotukset.',
    'Half-year review and summer holiday wishes.',
    'Neuvotteluhuone Koli + Teams', 'Kuukauden viimeinen torstai');
  ev('site-monthly', 'Site Monthly: Elokuu', 'Site Monthly: August',
    '2026-08-27', '16:00', 90,
    'Kesätauon jälkeinen kuulumiskierros ja syyskauden suunnitelmat.',
    'Post-summer catch-up and autumn plans.',
    'Neuvotteluhuone Koli + Teams', 'Kuukauden viimeinen torstai');
  ev('site-monthly', 'Site Monthly: Syyskuu', 'Site Monthly: September',
    '2026-09-24', '16:00', 90,
    'Syyskauden uutiset ja tulevat tapahtumat.',
    'Autumn news and upcoming events.',
    'Neuvotteluhuone Koli + Teams', 'Kuukauden viimeinen torstai');

  // === AI Club — every other Wednesday ===
  const aiDates = ['2026-04-22','2026-05-06','2026-05-20','2026-06-03','2026-06-17',
                   '2026-08-12','2026-08-26','2026-09-09','2026-09-23'];
  const aiTopics = [
    { fi: 'Claude 4.6 uudet ominaisuudet', en: 'Claude 4.6 new features' },
    { fi: 'RAG-pipelinejen vertailu', en: 'Comparing RAG pipelines' },
    { fi: 'AI-agentit käytännössä', en: 'AI agents in practice' },
    { fi: 'Multimodaalimallit', en: 'Multimodal models' },
    { fi: 'Fine-tuning workshop', en: 'Fine-tuning workshop' },
    { fi: 'LLM-evaluointi', en: 'LLM evaluation' },
    { fi: 'AI & tietoturva', en: 'AI & security' },
    { fi: 'Prompt engineering syventävä', en: 'Advanced prompt engineering' },
    { fi: 'AI-projektien retrospektiivi', en: 'AI project retrospective' },
  ];
  aiDates.forEach((d, i) => {
    const topic = aiTopics[i];
    ev('ai-club', `AI-klubi: ${topic.fi}`, `AI Club: ${topic.en}`,
      d, '17:00', 60,
      `Tämän kerran aihe: ${topic.fi}. Kaikki kiinnostuneet tervetulleita!`,
      `This session's topic: ${topic.en}. All welcome!`,
      'Neuvotteluhuone Pielinen', 'Joka toinen keskiviikko');
  });

  // === Board Game Club — 1st Monday of month ===
  const bgDates = ['2026-04-20','2026-05-04','2026-06-01','2026-08-03','2026-09-07'];
  const bgGames = [
    { fi: 'Wingspan-turnaus', en: 'Wingspan tournament' },
    { fi: 'Catan-ilta', en: 'Catan night' },
    { fi: 'Azul & Ticket to Ride', en: 'Azul & Ticket to Ride' },
    { fi: 'Terraforming Mars', en: 'Terraforming Mars' },
    { fi: 'Patchwork & 7 Wonders', en: '7 Wonders & Patchwork' },
  ];
  bgDates.forEach((d, i) => {
    const g = bgGames[i];
    ev('board-games', `Lautapelikerho: ${g.fi}`, `Board Game Club: ${g.en}`,
      d, '17:30', 120,
      `Illan pelit: ${g.fi}. Ota omat lempinakit mukaan!`,
      `Tonight's games: ${g.en}. Bring your favorite snacks!`,
      'Taukotila', 'Kuukauden 1. maanantai');
  });

  // === Sports Club ===
  ev('sports', 'Sählyvuoro', 'Floorball',
    '2026-04-23', '18:00', 60,
    'Viikoittainen sählyvuoro Joensuun palloiluhallissa. Mailat löytyy!',
    'Weekly floorball at Joensuu sports hall. Sticks provided!',
    'Joensuun palloiluhalli', 'Joka torstai');
  ev('sports', 'Kevätgolf: Aloittelijan kurssi', 'Spring golf: Beginner course',
    '2026-05-15', '17:00', 120,
    'Siili golfarit järjestää aloittelijan kurssin. Välineet lainaan!',
    'Siili golfers organize a beginners course. Equipment provided!',
    'Joensuun golfkenttä', null);
  ev('sports', 'Kesäolympialaiset', 'Summer Olympics',
    '2026-06-12', '14:00', 240,
    'Siili Joensuun legendaariset kesäolympialaiset! Joukkueet arvotaan.',
    'Siili Joensuu legendary summer olympics! Teams drawn randomly.',
    'Linnunlahden puisto', null);
  ev('sports', 'Pyöräilyretki Koli', 'Cycling trip to Koli',
    '2026-08-15', '09:00', 480,
    'Yhteinen pyöräretki Kolille. Matka n. 70 km, sopii kaikille kuntotasoille.',
    'Group cycling trip to Koli. ~70km ride, suitable for all fitness levels.',
    'Lähtö toimistolta', null);

  // === Book Club — every 6 weeks ===
  ev('book-club', 'Lukupiiri: "Thinking, Fast and Slow"', 'Book Club: "Thinking, Fast and Slow"',
    '2026-04-28', '17:00', 60,
    'Daniel Kahnemanin klassikko. Keskustellaan erityisesti System 1/System 2 -ajattelusta.',
    'Daniel Kahneman\'s classic. Focus on System 1/System 2 thinking.',
    'Taukotila', '6 viikon välein');
  ev('book-club', 'Lukupiiri: "Staff Engineer"', 'Book Club: "Staff Engineer"',
    '2026-06-09', '17:00', 60,
    'Will Larsonin kirja urapolusta seniorikehittäjästä eteenpäin.',
    'Will Larson\'s book on career paths beyond senior developer.',
    'Taukotila', '6 viikon välein');
  ev('book-club', 'Lukupiiri: "The Phoenix Project"', 'Book Club: "The Phoenix Project"',
    '2026-08-18', '17:00', 60,
    'DevOps-klassikko. Kirja jonka jokaisen IT-ammattilaisen pitäisi lukea.',
    'A DevOps classic. The book every IT professional should read.',
    'Taukotila', '6 viikon välein');

  // === Coding Dojo — 2nd Tuesday ===
  const dojoDates = ['2026-04-21','2026-05-12','2026-06-09','2026-08-11','2026-09-08'];
  const dojoTopics = [
    { fi: 'Rust-perusteet', en: 'Rust basics' },
    { fi: 'TDD kata: Roman Numerals', en: 'TDD kata: Roman Numerals' },
    { fi: 'Funktionaalinen ohjelmointi TS:llä', en: 'Functional programming in TS' },
    { fi: 'Go concurrency patterns', en: 'Go concurrency patterns' },
    { fi: 'WebAssembly hands-on', en: 'WebAssembly hands-on' },
  ];
  dojoDates.forEach((d, i) => {
    const t = dojoTopics[i];
    ev('coding-dojo', `Coding Dojo: ${t.fi}`, `Coding Dojo: ${t.en}`,
      d, '16:30', 90,
      `Pair programming -sessio: ${t.fi}. Ota oma läppäri mukaan.`,
      `Pair programming session: ${t.en}. Bring your laptop.`,
      'Neuvotteluhuone Pielinen', 'Kuukauden 2. tiistai');
  });

  // === Friday Social ===
  const friDates = ['2026-04-24','2026-05-29','2026-06-26','2026-08-28','2026-09-25'];
  friDates.forEach((d, i) => {
    ev('friday-social', 'Perjantaibisset', 'Friday Social',
      d, '16:00', 120,
      'Rentoa yhdessäoloa viikon päätteeksi. Juomat firmasta!',
      'Relaxed end-of-week hangout. Drinks on the company!',
      'Taukotila', 'Kuukauden viimeinen perjantai');
  });

  // === Visiting Speaker (from Helsinki HQ) ===
  ev('visiting-speaker', 'Vierailija: CEO Leskinen — Siili 2030 visio',
    'Visitor: CEO Leskinen — Siili 2030 Vision',
    '2026-05-07', '14:00', 90,
    'Sami Leskinen vierailee Joensuussa ja esittelee Siilin 2030-strategian.',
    'Sami Leskinen visits Joensuu to present Siili\'s 2030 strategy.',
    'Neuvotteluhuone Koli + Teams', null);
  ev('visiting-speaker', 'AI Guild: Agentic AI tuotannossa',
    'AI Guild: Agentic AI in Production',
    '2026-05-21', '15:00', 60,
    'Helsingin AI-tiimi esittelee kuinka agenttipohjainen AI toimii asiakasprojekteissa.',
    'Helsinki AI team presents how agentic AI works in client projects.',
    'Neuvotteluhuone Koli + Teams', null);
  ev('visiting-speaker', 'Vierailija: CTO — Tech Radar 2026',
    'Visitor: CTO — Tech Radar 2026',
    '2026-06-04', '14:00', 60,
    'CTO käy läpi Siilin Tech Radar 2026 -päivitykset.',
    'CTO walks through Siili\'s Tech Radar 2026 updates.',
    'Neuvotteluhuone Koli + Teams', null);
  ev('visiting-speaker', 'AI Guild: LLM Ops & Monitoring',
    'AI Guild: LLM Ops & Monitoring',
    '2026-09-17', '15:00', 60,
    'Kuinka monitoroida ja ylläpitää LLM-pohjaisia sovelluksia tuotannossa.',
    'How to monitor and maintain LLM-based applications in production.',
    'Neuvotteluhuone Koli + Teams', null);

  // === Tech Talk ===
  ev('tech-talk', 'Tech Talk: Kubernetes best practices',
    'Tech Talk: Kubernetes best practices',
    '2026-04-29', '16:00', 45,
    'Joensuun oma Matti esittelee K8s-vinkkejä projekteista.',
    'Our own Matti presents K8s tips from projects.',
    'Neuvotteluhuone Pielinen + Teams', null);
  ev('tech-talk', 'Tech Talk: Suorituskyvyn optimointi Reactissa',
    'Tech Talk: React Performance Optimization',
    '2026-05-27', '16:00', 45,
    'React-suorituskyky: profiling, memoization ja uudet concurrent features.',
    'React performance: profiling, memoization and new concurrent features.',
    'Neuvotteluhuone Pielinen + Teams', null);
  ev('tech-talk', 'Tech Talk: Platform Engineering',
    'Tech Talk: Platform Engineering',
    '2026-09-02', '16:00', 45,
    'Mitä on platform engineering ja miksi se on tärkeää?',
    'What is platform engineering and why does it matter?',
    'Neuvotteluhuone Pielinen + Teams', null);

  // === Wellbeing Day ===
  ev('wellbeing', 'Hyvinvointipäivä: Ergonomia-workshop',
    'Wellbeing: Ergonomics Workshop',
    '2026-04-17', '13:00', 60,
    'Fysioterapeutti opastaa oikeisiin työasentoihin ja taukoliikuntaan.',
    'Physiotherapist guides proper work posture and break exercises.',
    'Taukotila', null);
  ev('wellbeing', 'Hyvinvointipäivä: Mindfulness',
    'Wellbeing: Mindfulness Session',
    '2026-06-19', '12:00', 45,
    'Ohjattu mindfulness-sessio. Sopii aloittelijoillekin.',
    'Guided mindfulness session. Suitable for beginners too.',
    'Neuvotteluhuone Koli', null);
  ev('wellbeing', 'Hyvinvointipäivä: Uni & palautuminen',
    'Wellbeing: Sleep & Recovery',
    '2026-09-11', '13:00', 60,
    'Asiantuntijaluento unesta ja palautumisesta tietotyössä.',
    'Expert lecture on sleep and recovery in knowledge work.',
    'Neuvotteluhuone Koli + Teams', null);

  // === Hackathon ===
  ev('hackathon', 'Kevät-hackathon: Internal Tools',
    'Spring Hackathon: Internal Tools',
    '2026-05-08', '09:00', 480,
    'Koko päivän hackathon! Teema: sisäiset työkalut. Palkinnot parhaalle tiimille.',
    'Full-day hackathon! Theme: internal tools. Prizes for best team.',
    'Joensuu-toimisto (kaikki tilat)', null);
  ev('hackathon', 'Mini-hackathon: AI-prototyyppi',
    'Mini Hackathon: AI Prototype',
    '2026-09-18', '13:00', 240,
    'Puolipäiväinen hackathon: rakenna AI-prototyyppi 4 tunnissa.',
    'Half-day hackathon: build an AI prototype in 4 hours.',
    'Joensuu-toimisto', null);

  // === Movie Night ===
  ev('movie-night', 'Leffailta: The Social Network',
    'Movie Night: The Social Network',
    '2026-05-01', '18:00', 150,
    'Klassinen tech-elokuva! Popcornit ja juomat tarjolla.',
    'Classic tech movie! Popcorn and drinks provided.',
    'Taukotila (projektorilla)', null);
  ev('movie-night', 'Leffailta: Ex Machina',
    'Movie Night: Ex Machina',
    '2026-08-07', '18:00', 120,
    'AI-teemainen leffailta. Keskustelu elokuvan jälkeen.',
    'AI-themed movie night. Discussion after the film.',
    'Taukotila (projektorilla)', null);

  // === Strategy Update ===
  ev('strategy', 'Q2 Strategiakatsaus', 'Q2 Strategy Update',
    '2026-04-16', '14:00', 60,
    'Johdon Q2-katsaus: liiketoiminnan tilanne ja tulevaisuuden näkymät.',
    'Management Q2 review: business status and future outlook.',
    'Neuvotteluhuone Koli + Teams', 'Kvartaaleittain');
  ev('strategy', 'Q3 Strategiakatsaus', 'Q3 Strategy Update',
    '2026-08-20', '14:00', 60,
    'Johdon Q3-katsaus ja loppuvuoden suunnitelmat.',
    'Management Q3 review and year-end plans.',
    'Neuvotteluhuone Koli + Teams', 'Kvartaaleittain');

  // === Onboarding Day ===
  ev('onboarding', 'Onboarding: Uudet siilit', 'Onboarding: New Siilis',
    '2026-04-22', '09:00', 240,
    'Tervetuloa uudet kollegat! Tutustumista, käytännön asioita ja lounas yhdessä.',
    'Welcome new colleagues! Introductions, practicalities and lunch together.',
    'Neuvotteluhuone Koli', null);
  ev('onboarding', 'Onboarding: Kesätyöntekijät', 'Onboarding: Summer Interns',
    '2026-06-01', '09:00', 240,
    'Kesätyöntekijöiden perehdytyspäivä. Mentorit esittäytyvät.',
    'Summer intern orientation day. Mentors introduce themselves.',
    'Neuvotteluhuone Koli', null);

  // === Lunch & Learn ===
  ev('lunch-learn', 'Lunch & Learn: GraphQL vs REST', 'Lunch & Learn: GraphQL vs REST',
    '2026-04-25', '11:30', 45,
    'Lounaalla oppimista: milloin valita GraphQL, milloin REST?',
    'Learning at lunch: when to choose GraphQL, when REST?',
    'Taukotila', null);
  ev('lunch-learn', 'Lunch & Learn: Cyber Security 101', 'Lunch & Learn: Cyber Security 101',
    '2026-05-23', '11:30', 45,
    'Tietoturvakoulutus arkisilla vinkeillä. Pakollinen, mutta hauska!',
    'Security training with everyday tips. Mandatory, but fun!',
    'Taukotila + Teams', null);
  ev('lunch-learn', 'Lunch & Learn: Accessibility', 'Lunch & Learn: Accessibility',
    '2026-08-22', '11:30', 45,
    'Saavutettavuus web-kehityksessä: WCAG 2.2 käytännössä.',
    'Accessibility in web development: WCAG 2.2 in practice.',
    'Taukotila + Teams', null);

  // === Site Retro ===
  ev('retro', 'Site Retro: Q1', 'Site Retro: Q1',
    '2026-04-18', '15:00', 60,
    'Mitä opimme Q1:ssä? Mikä meni hyvin, mitä kehitetään?',
    'What did we learn in Q1? What went well, what to improve?',
    'Neuvotteluhuone Koli', 'Kvartaaleittain');
  ev('retro', 'Site Retro: Q2', 'Site Retro: Q2',
    '2026-06-27', '15:00', 60,
    'Kesäkauden retro ennen lomia.',
    'Summer retro before holidays.',
    'Neuvotteluhuone Koli', 'Kvartaaleittain');
  ev('retro', 'Site Retro: Q3', 'Site Retro: Q3',
    '2026-09-26', '15:00', 60,
    'Q3-retro: syyskauden opitut asiat.',
    'Q3 retro: autumn lessons learned.',
    'Neuvotteluhuone Koli', 'Kvartaaleittain');

  return events.sort((a, b) => {
    const da = new Date(a.date + 'T' + a.time);
    const db = new Date(b.date + 'T' + b.time);
    return da - db;
  });
}

const EVENTS = generateEvents();

// Simulated Slack messages
const SLACK_MESSAGES = [
  { channel: '#joensuu-tapahtumat', user: 'Matti K.', avatar: '👨‍💻', time: '2026-04-15 09:12',
    fi: 'Muistakaa ilmoittautua huomisen ergonomia-workshoppiin! 🧘',
    en: 'Remember to sign up for tomorrow\'s ergonomics workshop! 🧘' },
  { channel: '#joensuu-tapahtumat', user: 'Liisa M.', avatar: '👩‍🔬', time: '2026-04-15 09:30',
    fi: 'Q2 strategiakatsaus huomenna klo 14. Teams-linkki tulee kalenterikutsussa.',
    en: 'Q2 strategy update tomorrow at 14. Teams link in calendar invite.' },
  { channel: '#joensuu-ai-club', user: 'Jari T.', avatar: '🤖', time: '2026-04-15 10:05',
    fi: 'Ensi viikon AI-klubissa puhutaan Claude 4.6:n uusista ominaisuuksista. Onko toiveita sisällöstä?',
    en: 'Next week\'s AI Club is about Claude 4.6 new features. Any content requests?' },
  { channel: '#joensuu-tapahtumat', user: 'Anna S.', avatar: '👩‍💼', time: '2026-04-15 11:22',
    fi: 'Site retro perjantaina! Lisätkää mielellään aiheita etukäteen Miroon 🔄',
    en: 'Site retro on Friday! Please add topics to Miro beforehand 🔄' },
  { channel: '#joensuu-sports', user: 'Pekka R.', avatar: '⚽', time: '2026-04-15 12:00',
    fi: 'Sählyyn mahtuu vielä 3 pelaajaa! Ilmottaudu #joensuu-sports kanavalla.',
    en: 'Still room for 3 players in floorball! Sign up in #joensuu-sports.' },
  { channel: '#joensuu-tapahtumat', user: 'Bot 🤖', avatar: '📢', time: '2026-04-15 08:00',
    fi: '📅 Tällä viikolla: Ergonomia-workshop (to), Q2 Strategiakatsaus (to), Site Retro (pe), Sähly (to), Perjantaibisset (pe)',
    en: '📅 This week: Ergonomics Workshop (Thu), Q2 Strategy Update (Thu), Site Retro (Fri), Floorball (Thu), Friday Social (Fri)' },
  { channel: '#joensuu-ai-club', user: 'Matti K.', avatar: '👨‍💻', time: '2026-04-14 16:45',
    fi: 'Tein demon Claude Code:n kanssa — pystyy generoimaan kokonaisen appin specs-tiedostosta. Esittelen AI-klubissa!',
    en: 'Made a demo with Claude Code — can generate a full app from a specs file. Will present at AI Club!' },
  { channel: '#joensuu-tapahtumat', user: 'HR-tiimi', avatar: '👋', time: '2026-04-14 14:00',
    fi: 'Uudet siilit aloittavat 22.4! Tervetuloa toivottamaan kahvikupin äärellä ☕',
    en: 'New Siilis starting April 22! Come welcome them over coffee ☕' },
  { channel: '#joensuu-lautapelit', user: 'Tuomas H.', avatar: '🎲', time: '2026-04-13 17:30',
    fi: 'Maanantain lautapeli-illassa pelataan Wingspan-turnausta! Kuka on mukana?',
    en: 'Monday\'s board game night is a Wingspan tournament! Who\'s in?' },
  { channel: '#joensuu-tapahtumat', user: 'Liisa M.', avatar: '👩‍🔬', time: '2026-04-13 10:15',
    fi: 'Lunch & Learn perjantaina 25.4: GraphQL vs REST. Ilmoittautumiset Slackissa!',
    en: 'Lunch & Learn on Friday Apr 25: GraphQL vs REST. Sign up in Slack!' },
];
