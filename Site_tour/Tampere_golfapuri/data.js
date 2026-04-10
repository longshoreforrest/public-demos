// Tampereen seudun golf-kenttien tiedot
// Lähde: Visit Tampere (visittampere.fi)
const GOLF_COURSES = [
  {
    id: 'tammer',
    name: 'Tammer-Golf',
    city: 'Tampere',
    address: 'Tenniskatu 25, 33710 Tampere',
    holes: 18,
    par: 72,
    website: 'https://tammer-golf.fi/',
    phone: '03 364 1300',
    lat: 61.4975,
    lng: 23.8080,
    color: '#2E7D32',
    description: 'Yksi Suomen vanhimmista golfkentistä, perustettu 1965. Perinteinen puistokenttä Ruotulassa keskustan tuntumassa.'
  },
  {
    id: 'pirkanmaan-golf',
    name: 'Pirkanmaan Golf',
    city: 'Tampere',
    address: 'Kivikirkontie 23, 33700 Tampere',
    holes: 9,
    par: 34,
    website: 'https://www.golfkeskusmessukyla.fi/',
    phone: '03 316 1211',
    lat: 61.4870,
    lng: 23.8220,
    color: '#1565C0',
    description: 'Messukylän idyllinen kenttä 5 min keskustasta. 9-reikäinen tasoituskelpoinen kenttä + pay & play Vanhan kirkon kenttä (par 27). Yli 1300 aktiivista golffaria.'
  },
  {
    id: 'pirkkala',
    name: 'Golf Pirkkala',
    city: 'Pirkkala',
    address: 'Vaittintie 95, 33960 Pirkkala',
    holes: 18,
    par: 72,
    website: 'https://golfpirkkala.fi/',
    phone: '010 292 6900',
    lat: 61.4440,
    lng: 23.6200,
    color: '#E65100',
    description: 'Moderni championship-kenttä lähellä Pirkkalan lentoasemaa. Laadukas opetus EazyGolf-akatemian kautta.'
  },
  {
    id: 'nokia-river',
    name: 'Nokia River Golf',
    city: 'Nokia',
    address: 'Alastalontie 33, 37120 Nokia',
    holes: 36,
    par: 72,
    website: 'https://nokiarivergolf.fi/',
    phone: '03 340 0234',
    lat: 61.4640,
    lng: 23.4200,
    color: '#6A1B9A',
    description: 'Pirkanmaan suurin golfkeskus: kaksi 18-reikäistä kenttää (River ja Rock). Sijaitsee 7 km Nokian keskustasta.'
  },
  {
    id: 'hiisi',
    name: 'Hiisi-Golf',
    city: 'Lempäälä',
    address: 'Vaihmalantie 120, 37500 Lempäälä',
    holes: 9,
    par: 34,
    website: 'https://www.hiisi-golf.fi/',
    phone: '040 734 2510',
    lat: 61.3350,
    lng: 23.7850,
    color: '#00838F',
    description: 'Koko perheen harrastuspaikka Hiidenvuolteen rannalla. 9-reikäinen Farmi-kenttä ja kaikille avoin par-3 Hiisi-kenttä.'
  },
  {
    id: 'lakeside',
    name: 'Lakeside Golf',
    city: 'Sastamala',
    address: 'Sastamalantie 1901, 38100 Sastamala',
    holes: 36,
    par: 72,
    website: 'https://lakesidegolf.fi/',
    phone: '03 511 4300',
    lat: 61.2830,
    lng: 23.2000,
    color: '#F9A825',
    description: '36-reikäinen golfkeskus: Järvenranta (1992) ja Pirunpelto (2005). Monipuoliset harjoittelualueet.'
  },
  {
    id: 'poltinkoski',
    name: 'Poltinkoski Golf',
    city: 'Riitiala',
    address: 'Yliskyläntie 1411, 34260 Riitiala',
    holes: 9,
    par: 36,
    website: 'https://poltinkoskigolf.fi/',
    phone: '03 476 3030',
    lat: 61.5600,
    lng: 23.5100,
    color: '#D32F2F',
    description: 'Viihtyisä maalaiskenttä rauhallisessa ympäristössä Pirkanmaan pohjoisosassa.'
  }
];

// Generoi simuloitua saatavuusdataa
// Slots = vapaiden pelaajapaikkojen määrä (0-20).
// Golfissa 1 tee-time = max 4 pelaajaa. Kenttä voi tarjota useita
// peräkkäisiä tee-timeja samalla aikavälillä, joten paikat voivat olla 0-20.
function generateAvailability(startDate, days) {
  const availability = {};

  GOLF_COURSES.forEach(course => {
    availability[course.id] = {};

    for (let d = 0; d < days; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + d);
      const dateStr = formatDate(date);

      availability[course.id][dateStr] = {};

      for (let hour = 7; hour < 19; hour++) {
        for (let min = 0; min < 60; min += 30) {
          const timeStr = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
          const rand = Math.random();
          let slots;
          if (rand < 0.15) {
            slots = 0; // täysin varattu
          } else if (rand < 0.30) {
            slots = Math.floor(Math.random() * 3) + 1; // 1-3 paikkaa
          } else if (rand < 0.55) {
            slots = Math.floor(Math.random() * 4) + 4; // 4-7 paikkaa (1-2 ryhmää)
          } else if (rand < 0.80) {
            slots = Math.floor(Math.random() * 5) + 8; // 8-12 paikkaa (2-3 ryhmää)
          } else {
            slots = Math.floor(Math.random() * 8) + 13; // 13-20 paikkaa (3-5 ryhmää)
          }
          availability[course.id][dateStr][timeStr] = slots;
        }
      }
    }
  });

  return availability;
}

// Laske päivän saatavuusyhteenveto pelaajamäärän mukaan
// playerCount: montako pelaajaa tarvitsee paikan
function getDayAvailabilitySummary(courseId, dateStr, availabilityData, playerCount) {
  const dayData = availabilityData[courseId]?.[dateStr];
  if (!dayData) return { percent: 0, freeSlots: 0, totalSlots: 0 };

  const times = Object.values(dayData);
  const totalSlots = times.length;
  const freeSlots = times.filter(s => s >= (playerCount || 1)).length;
  const percent = Math.round((freeSlots / totalSlots) * 100);

  return { percent, freeSlots, totalSlots };
}

// Hae tietyn ajankohdan vapaat kentät (pelaajamäärä huomioiden)
function getAvailableCourses(dateStr, timeStr, availabilityData, playerCount) {
  const minSlots = playerCount || 1;
  return GOLF_COURSES.filter(course => {
    const slots = availabilityData[course.id]?.[dateStr]?.[timeStr];
    return slots && slots >= minSlots;
  }).map(course => ({
    ...course,
    slots: availabilityData[course.id][dateStr][timeStr]
  }));
}

// Apufunktiot
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const WEEKDAYS_FI = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];
const WEEKDAYS_FULL_FI = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
const MONTHS_FI = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];
