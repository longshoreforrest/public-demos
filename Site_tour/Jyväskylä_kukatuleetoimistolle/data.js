// ============================================================
// Siili Jyväskylä — Kuka tulee toimistolle?
// Data: Keksityt työntekijät, kalenteridata & muistutusviestit
// ============================================================

const EMPLOYEES = [
  { id: 1,  name: 'Aino Korhonen',    role: 'Senior Developer',      avatar: '👩‍💻', color: '#e11d48' },
  { id: 2,  name: 'Mikko Virtanen',    role: 'Full Stack Developer',  avatar: '👨‍💻', color: '#2563eb' },
  { id: 3,  name: 'Emilia Mäkinen',    role: 'UX Designer',           avatar: '🎨',  color: '#7c3aed' },
  { id: 4,  name: 'Jussi Nieminen',    role: 'DevOps Engineer',       avatar: '🔧',  color: '#059669' },
  { id: 5,  name: 'Sanna Laine',       role: 'Project Manager',       avatar: '📋',  color: '#d97706' },
  { id: 6,  name: 'Tero Heikkinen',    role: 'Backend Developer',     avatar: '⚙️',  color: '#0891b2' },
  { id: 7,  name: 'Laura Hämäläinen',  role: 'Frontend Developer',    avatar: '🖥️',  color: '#c026d3' },
  { id: 8,  name: 'Pekka Koskinen',    role: 'Data Engineer',         avatar: '📊',  color: '#4f46e5' },
  { id: 9,  name: 'Riikka Järvinen',   role: 'QA Engineer',           avatar: '🔍',  color: '#be123c' },
  { id: 10, name: 'Antti Lehtonen',    role: 'Tech Lead',             avatar: '🚀',  color: '#15803d' },
  { id: 11, name: 'Henna Salonen',     role: 'Cloud Architect',       avatar: '☁️',  color: '#0369a1' },
  { id: 12, name: 'Ville Tuominen',    role: 'Mobile Developer',      avatar: '📱',  color: '#9333ea' },
  { id: 13, name: 'Katri Rantanen',    role: 'Scrum Master',          avatar: '🏃',  color: '#ea580c' },
  { id: 14, name: 'Olli Savolainen',   role: 'Security Engineer',     avatar: '🛡️',  color: '#374151' },
  { id: 15, name: 'Tiina Karjalainen', role: 'AI/ML Developer',       avatar: '🤖',  color: '#6d28d9' },
];

// Slack-muistutusviestit — rakkaudellisia ja hauskoja
const SLACK_REMINDERS = [
  (name) => `${name} kulta ☀️ uusi viikko, uudet seikkailut! Muistathan merkitä kalenteriin milloin siilistä löytyy toimistolta. Kahvit odottaa! ☕`,
  (name) => `Hyvää maanantaiaamua ${name}! 🌅 Toimiston kahvikone on huollettu ja jääkaappi täytetty — kerro kalenterissa milloin tulet nauttimaan!`,
  (name) => `${name} rakas 💕 tiedätkö mikä on parempi kuin etätyö? Etätyö jossa välillä näkee työkaverit livenä! Merkkaa toimistopäiväsi kalenteriin 📅`,
  (name) => `Moi ${name}! 🙋 Jyväskylän toimisto kaipaa sinua kuin kesä kaipaa aurinkoa. Laita kalenteriin koska ilahdut meitä läsnäolollasi!`,
  (name) => `${name} hei! 🎯 Pikainen muistutus: merkkaa kalenteriisi tämän viikon toimistopäivät niin tiedetään ketä nähdään. Lupaan etten vie sun lempparipaikkaa 😄`,
  (name) => `Huomenta ${name}! ☕ Maanantai-muikkari: merkkaatko kalenteriin tämän viikon toimistopäivät? Tiimi tykkää tietää milloin sua voi häiritä livenä 🤗`,
  (name) => `${name} kultapieni 🌟 viikon alku ja kalenteri kaipailee toimistopäiviä! Merkkaus vie 10 sekuntia mutta ilahduttaa koko tiimiä 💛`,
  (name) => `Terve ${name}! 🏢 Toimiston viherkasvit kyselivät sinun perääsi. Kerro kalenterissa milloin tulet — ne lupaavat kasvaa sinulle kunniaksi 🌱`,
  (name) => `${name} — tiesitkö että toimiston ergonominen tuoli tuntee olonsa hylätyksi? 🪑 Tule lohduttamaan sitä ja merkkaa päivät kalenteriin!`,
  (name) => `Hei ${name}! 🎪 Tämä on ystävällinen maanantaimuistutus: kalenteriin toimistopäivät niin nähdään porukalla. Voin jopa tarjota pullan! 🍩`,
  (name) => `${name} herätys! ⏰ Uusi viikko ja mahdollisuus nähdä työkavereita muutenkin kuin pikseleinä. Merkkaa kalenteriin koska olet toimistolla! 💻➡️🏢`,
  (name) => `Moro ${name}! 🤝 Jyväskylän paras toimisto odottaa. Käy merkkaamassa kalenteriin toimistopäivät — tieto auttaa kaikkia suunnittelemaan viikkoaan!`,
];

// Kalenteri-muistutuksen (10min Monday AM) teksti
const CALENDAR_REMINDER_TEXT = (name) =>
  `Hei ${name}! Muista merkitä tämän viikon toimistopäivät kalenteriisi. Tiimi kiittää! 🙏`;

// ============================================================
// Generoi kalenteridata: menneisyys + tulevaisuus
// ============================================================

function generateCalendarData() {
  const today = new Date();
  today.setHours(0,0,0,0);

  // Haetaan maanantai 8 viikkoa sitten
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)); // tämän viikon ma
  startDate.setDate(startDate.getDate() - 8 * 7); // 8 viikkoa taaksepäin

  // 4 viikkoa eteenpäin tämän viikon maanantaista
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - (endDate.getDay() === 0 ? 6 : endDate.getDay() - 1));
  endDate.setDate(endDate.getDate() + 5 * 7 - 1); // ~5 viikkoa (sisältäen tämän viikon)

  const entries = [];
  const mondayReminders = [];

  // Jokaiselle työntekijälle omat "tyypilliset toimistopäivät"
  // Pe = etäpäivä (kukaan ei tule), Ma = hiljainen (vain Sanna PM + Antti Tech Lead)
  const employeePatterns = {
    1:  { prefDays: [2, 3],    freq: 0.85, name: 'Aino Korhonen' },     // Ti, Ke
    2:  { prefDays: [2, 4],    freq: 0.70, name: 'Mikko Virtanen' },    // Ti, To
    3:  { prefDays: [2, 4],    freq: 0.75, name: 'Emilia Mäkinen' },    // Ti, To
    4:  { prefDays: [3, 4],    freq: 0.60, name: 'Jussi Nieminen' },    // Ke, To — DevOps
    5:  { prefDays: [1, 2, 3, 4], freq: 0.90, name: 'Sanna Laine' },   // PM, myös ma:t
    6:  { prefDays: [2, 3],    freq: 0.65, name: 'Tero Heikkinen' },    // Ti, Ke
    7:  { prefDays: [3, 4],    freq: 0.80, name: 'Laura Hämäläinen' },  // Ke, To
    8:  { prefDays: [3],       freq: 0.70, name: 'Pekka Koskinen' },    // vain Ke
    9:  { prefDays: [2, 3],    freq: 0.75, name: 'Riikka Järvinen' },   // Ti, Ke
    10: { prefDays: [1, 2, 3, 4], freq: 0.85, name: 'Antti Lehtonen' }, // Tech Lead, myös ma:t
    11: { prefDays: [2, 4],    freq: 0.55, name: 'Henna Salonen' },     // Ti, To — etäpainotteinen
    12: { prefDays: [3, 4],    freq: 0.60, name: 'Ville Tuominen' },    // Ke, To
    13: { prefDays: [2, 3, 4], freq: 0.90, name: 'Katri Rantanen' },    // Ti-To, SM
    14: { prefDays: [3, 4],    freq: 0.50, name: 'Olli Savolainen' },   // Ke, To — etäpainotteinen
    15: { prefDays: [2, 3],    freq: 0.70, name: 'Tiina Karjalainen' }, // Ti, Ke
  };

  // Seed-pohjainen pseudo-random jotta data on stabiilia
  function seededRandom(seed) {
    let s = seed;
    return function() {
      s = (s * 16807 + 0) % 2147483647;
      return s / 2147483647;
    };
  }

  const rng = seededRandom(42);

  // Käydään läpi jokainen päivä
  const current = new Date(startDate);
  while (current <= endDate) {
    const dayOfWeek = current.getDay(); // 0=su, 1=ma ... 5=pe
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // arkipäivät
      const dateStr = formatDate(current);

      for (const emp of EMPLOYEES) {
        const pattern = employeePatterns[emp.id];
        const isPrefDay = pattern.prefDays.includes(dayOfWeek);
        const roll = rng();

        // Perjantai = etäpäivä, kukaan ei tule
        if (dayOfWeek === 5) { rng(); continue; }

        // Maanantai: vain ne joilla se on prefDay (Sanna + Antti), muut eivät tule
        let threshold;
        if (dayOfWeek === 1 && !isPrefDay) {
          threshold = 0; // maanantaina vain prefDay-henkilöt
        } else {
          threshold = isPrefDay ? pattern.freq : pattern.freq * 0.12;
        }

        // Lomapäivät: satunnainen viikko per henkilö
        const weekNum = getWeekNumber(current);
        const vacationWeek = (emp.id * 7 + 13) % 20 + 10; // viikko 10-29
        const isVacation = weekNum === vacationWeek;

        if (!isVacation && roll < threshold) {
          entries.push({
            employeeId: emp.id,
            date: dateStr,
            status: 'office', // 'office' | 'remote' | 'vacation'
          });
        }
      }

      // Maanantaisin ja torstaisin: kanavaviesti (1-2 kpl per viikko, ei per henkilö)
      if (dayOfWeek === 1) {
        // Maanantai: yksi yhteinen kanavaviesti
        const reminderIdx = Math.floor(rng() * SLACK_REMINDERS.length);
        mondayReminders.push({
          employeeId: null, // kanavaviesti, ei yksilölle
          date: dateStr,
          message: SLACK_REMINDERS[reminderIdx]('tiimiläiset'),
          time: '08:50',
          channel: '#jkl-toimisto',
          type: 'channel',
        });
        // Torstaina: satunnainen lempeä muistutus ~50% viikoista
        if (rng() > 0.5) {
          const thuDate = new Date(current);
          thuDate.setDate(thuDate.getDate() + 3); // ma -> to
          if (thuDate <= endDate) {
            const thuStr = formatDate(thuDate);
            const thuIdx = Math.floor(rng() * SLACK_REMINDERS.length);
            mondayReminders.push({
              employeeId: null,
              date: thuStr,
              message: SLACK_REMINDERS[thuIdx]('porukka'),
              time: '09:15',
              channel: '#jkl-toimisto',
              type: 'channel',
            });
          }
        }
      }
    }
    current.setDate(current.getDate() + 1);
  }

  // Tänään (to 16.4.2026) huippupäivä: pakotetaan 12 henkilöä toimistolle
  const todayStr = formatDate(new Date());
  const todayIds = new Set(entries.filter(e => e.date === todayStr).map(e => e.employeeId));
  const target = 12;
  const shuffled = EMPLOYEES.map(e => e.id).filter(id => !todayIds.has(id));
  // Sekoitetaan deterministisesti
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const needed = target - todayIds.size;
  for (let i = 0; i < needed && i < shuffled.length; i++) {
    entries.push({ employeeId: shuffled[i], date: todayStr, status: 'office' });
  }

  return { entries, mondayReminders };
}

// ============================================================
// Apufunktiot
// ============================================================

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

function getDayName(dateStr) {
  const days = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];
  return days[parseDate(dateStr).getDay()];
}

function getDayNameLong(dateStr) {
  const days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
  return days[parseDate(dateStr).getDay()];
}

function getMonthName(monthIdx) {
  const months = ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'];
  return months[monthIdx];
}

function formatDateFi(dateStr) {
  const d = parseDate(dateStr);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

function isToday(dateStr) {
  return dateStr === formatDate(new Date());
}

function isPast(dateStr) {
  const today = new Date();
  today.setHours(0,0,0,0);
  return parseDate(dateStr) < today;
}

function getWeekDates(startDate, weeks) {
  const dates = [];
  const current = new Date(startDate);
  // Siirry maanantaihin
  const day = current.getDay();
  current.setDate(current.getDate() - (day === 0 ? 6 : day - 1));
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < 5; d++) { // ma-pe
      week.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }
    dates.push(week);
    current.setDate(current.getDate() + 2); // hyppää viikonlopun yli
  }
  return dates;
}

// Generoi data heti
const CALENDAR_DATA = generateCalendarData();
