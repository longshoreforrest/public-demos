// data.js — Oikeusministeriön verkkouudistuksen haastattelija-sovelluksen datamalli
// Kaikki sisältö suomeksi, tarkoitettu ammattimaiseen demokäyttöön.

// ---------------------------------------------------------------------------
// 1. VIRASTOT
// ---------------------------------------------------------------------------
const VIRASTOT = [
  {
    id: 'tuomioistuinvirasto',
    nimi: 'Tuomioistuinvirasto',
    nimiEn: 'National Courts Administration',
    kuvaus: 'Tuomioistuinten toimintaedellytyksistä huolehtiva keskushallintoviranomainen',
    verkkosivu: 'https://www.tuomioistuinvirasto.fi',
    osastot: ['Hallinto-osasto', 'Kehittämis- ja koulutusyksikkö', 'Viestintä', 'Tietohallinto'],
    vpiColor: '#1a5276'
  },
  {
    id: 'syyttajalaitos',
    nimi: 'Syyttäjälaitos',
    nimiEn: 'National Prosecution Authority',
    kuvaus: 'Huolehtii rikosvastuun toteuttamisesta osana rikosoikeudellista järjestelmää',
    verkkosivu: 'https://www.syyttajalaitos.fi',
    osastot: ['Valtakunnansyyttäjän toimisto', 'Syyttäjäalueet', 'Hallinto ja kehittäminen', 'Viestintä', 'Tietohallinto'],
    vpiColor: '#922b21'
  },
  {
    id: 'rikosseuraamuslaitos',
    nimi: 'Rikosseuraamuslaitos',
    nimiEn: 'Criminal Sanctions Agency',
    kuvaus: 'Vastaa vankeusrangaistusten ja yhdyskuntaseuraamusten täytäntöönpanosta',
    verkkosivu: 'https://www.rikosseuraamuslaitos.fi',
    osastot: ['Keskushallintoyksikkö', 'Vankilat', 'Yhdyskuntaseuraamustoimistot', 'Arviointikeskus', 'Terveydenhuoltoyksikkö'],
    vpiColor: '#7d3c98'
  },
  {
    id: 'ulosottolaitos',
    nimi: 'Ulosottolaitos',
    nimiEn: 'National Enforcement Authority',
    kuvaus: 'Vastaa siviili- ja rikosoikeudellisten tuomioiden täytäntöönpanosta sekä perintätoimista',
    verkkosivu: 'https://www.ulosottolaitos.fi',
    osastot: ['Hallinto-osasto', 'Täytäntöönpano-osasto', 'Perintäpalvelut', 'Tietohallinto'],
    vpiColor: '#1e8449'
  },
  {
    id: 'oikeuspalveluvirasto',
    nimi: 'Oikeuspalveluvirasto',
    nimiEn: 'National Legal Services Authority',
    kuvaus: 'Huolehtii oikeusapu- ja edunvalvontapalvelujen järjestämisestä',
    verkkosivu: 'https://www.oikeuspalveluvirasto.fi',
    osastot: ['Oikeusapu', 'Edunvalvonta', 'Hallinto ja talous', 'Kehittäminen ja viestintä'],
    vpiColor: '#2874a6'
  },
  {
    id: 'oikeusrekisterikeskus',
    nimi: 'Oikeusrekisterikeskus',
    nimiEn: 'Legal Register Centre',
    kuvaus: 'Ylläpitää oikeushallinnon tietojärjestelmiä ja rekisterejä',
    verkkosivu: 'https://www.oikeusrekisterikeskus.fi',
    osastot: ['Rekisteripalvelut', 'Tietojärjestelmäkehitys', 'Tietopalvelut', 'Hallinto'],
    vpiColor: '#ca6f1e'
  },
  {
    id: 'erityisviranomaiset',
    nimi: 'Oikeushallinnon erityisviranomaiset',
    nimiEn: 'Agency for Special Authorities',
    kuvaus: 'Kattaa tietosuojavaltuutetun toimiston, yhdenvertaisuusvaltuutetun, tiedusteluvalvontavaltuutetun sekä muut erityisviranomaiset',
    verkkosivu: 'https://www.oikeus.fi/erityisviranomaiset',
    osastot: ['Tietosuojavaltuutetun toimisto', 'Yhdenvertaisuusvaltuutetun toimisto', 'Lapsiasiavaltuutetun toimisto', 'Tiedusteluvalvontavaltuutettu', 'Hallinto'],
    vpiColor: '#6c3483'
  },
  {
    id: 'oikeus_fi',
    nimi: 'Oikeus.fi-portaali',
    nimiEn: 'Central Justice Portal',
    kuvaus: 'Oikeushallinnon yhteinen verkkopalvelu, joka kokoaa kansalaisten ja yritysten tarvitsemat oikeudelliset palvelut',
    verkkosivu: 'https://www.oikeus.fi',
    osastot: ['Toimituskunta', 'Tekninen ylläpito', 'Sisältöpalvelut'],
    vpiColor: '#2c3e50'
  }
];

// ---------------------------------------------------------------------------
// 2. SIDOSRYHMÄT
// ---------------------------------------------------------------------------
const SIDOSRYHMAT = [
  {
    id: 'brandi',
    nimi: 'Brändi ja visuaalinen ilme',
    kuvaus: 'Vastaa organisaation brändistä ja visuaalisesta identiteetistä',
    icon: '🎨',
    vastuuhenkilot: ['Viestintäpäällikkö', 'Graafinen suunnittelija']
  },
  {
    id: 'sisalto',
    nimi: 'Sisältöstrategia',
    kuvaus: 'Suunnittelee ja ohjaa verkkopalvelun sisältöjen rakennetta, elinkaarta ja hallintamallia',
    icon: '📝',
    vastuuhenkilot: ['Sisältöpäällikkö', 'Verkkotoimittaja', 'Kielenhuoltaja']
  },
  {
    id: 'saavutettavuus',
    nimi: 'Saavutettavuus',
    kuvaus: 'Varmistaa verkkopalvelujen saavutettavuuden lainsäädännön ja standardien mukaisesti',
    icon: '♿',
    vastuuhenkilot: ['Saavutettavuusasiantuntija', 'UX-suunnittelija']
  },
  {
    id: 'tekninen',
    nimi: 'Tekninen arkkitehtuuri',
    kuvaus: 'Vastaa verkkopalvelun teknisestä toteutuksesta, integraatioista ja infrastruktuurista',
    icon: '⚙️',
    vastuuhenkilot: ['Pääarkkitehti', 'Kehityspäällikkö', 'DevOps-insinööri']
  },
  {
    id: 'kayttajakokemus',
    nimi: 'Käyttäjäkokemus',
    kuvaus: 'Suunnittelee ja kehittää palvelun käyttökokemusta tutkimukseen ja käyttäjäymmärrykseen perustuen',
    icon: '👤',
    vastuuhenkilot: ['UX-pääsuunnittelija', 'Palvelumuotoilija', 'Käyttäjätutkija']
  },
  {
    id: 'viestinta',
    nimi: 'Viestintä',
    kuvaus: 'Vastaa sisäisestä ja ulkoisesta viestinnästä sekä sidosryhmäyhteistyöstä',
    icon: '📢',
    vastuuhenkilot: ['Viestintäjohtaja', 'Tiedottaja']
  },
  {
    id: 'tietoturva',
    nimi: 'Tietoturva ja tietosuoja',
    kuvaus: 'Huolehtii tietoturvallisuudesta, tietosuojasta ja kyberturvallisuudesta',
    icon: '🔒',
    vastuuhenkilot: ['Tietoturvapäällikkö', 'Tietosuojavastaava']
  },
  {
    id: 'lakiasiat',
    nimi: 'Lakiasiat ja säädökset',
    kuvaus: 'Varmistaa verkkopalvelun juridisen vaatimustenmukaisuuden ja säädöspohjaisuuden',
    icon: '⚖️',
    vastuuhenkilot: ['Lakimies', 'Erityisasiantuntija']
  }
];

// ---------------------------------------------------------------------------
// 3. VAATIMUKSET (virastokohtaiset)
// ---------------------------------------------------------------------------
const VAATIMUKSET = {
  tuomioistuinvirasto: {
    pakolliset: [
      { id: 'tv-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus kaikissa näkymissä', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'tv-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi) kaikilla julkisilla sivuilla', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'tv-p3', kuvaus: 'Suomi.fi-tunnistautumisen integraatio', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'tv-p4', kuvaus: 'Responsiivinen käyttöliittymä mobiili-, tabletti- ja työpöytälaitteille', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'tv-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimusten mukainen tietosuojaseloste', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'tv-p6', kuvaus: 'Hakutoiminto julkaistuihin tuomioistuinratkaisuihin', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'tv-p7', kuvaus: 'Sisällönhallintajärjestelmä (CMS) toimituksellista julkaisua varten', kategoria: 'sisällönhallinta', prioriteetti: 'korkea' },
      { id: 'tv-p8', kuvaus: 'Analytiikkaratkaisu (Matomo tai vastaava) kävijäseurantaan', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'tv-p9', kuvaus: 'Asian käsittelyvaiheen seurantapalvelu kansalaisille', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'tv-p10', kuvaus: 'Istuntopaikkojen ja käsittelypäivien kalenterinäkymä', kategoria: 'toiminnallisuus', prioriteetti: 'normaali' }
    ],
    lisatyo: [
      { id: 'tv-l1', kuvaus: 'Chatbot-palvelu kansalaisille yleisiin oikeudellisiin kysymyksiin', kategoria: 'toiminnallisuus', arvioHinta: '25 000 €' },
      { id: 'tv-l2', kuvaus: 'Sähköinen ajanvaraus tuomioistuinpalveluihin', kategoria: 'toiminnallisuus', arvioHinta: '35 000 €' },
      { id: 'tv-l3', kuvaus: 'Videoyhteyspalvelu etäkuulemisia varten', kategoria: 'toiminnallisuus', arvioHinta: '50 000 €' },
      { id: 'tv-l4', kuvaus: 'Englanninkielinen sisältöversio keskeisistä palveluista', kategoria: 'kielituki', arvioHinta: '15 000 €' }
    ]
  },

  syyttajalaitos: {
    pakolliset: [
      { id: 'sy-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus kaikissa näkymissä', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'sy-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi)', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'sy-p3', kuvaus: 'Suomi.fi-tunnistautumisen integraatio', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'sy-p4', kuvaus: 'Responsiivinen käyttöliittymä', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'sy-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimusten mukainen tietosuojaseloste', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'sy-p6', kuvaus: 'Tiedote- ja uutisjulkaisujärjestelmä mediatiedotteille', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'sy-p7', kuvaus: 'Sisällönhallintajärjestelmä (CMS)', kategoria: 'sisällönhallinta', prioriteetti: 'korkea' },
      { id: 'sy-p8', kuvaus: 'Analytiikkaratkaisu kävijäseurantaan', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'sy-p9', kuvaus: 'Syyttäjäalueiden yhteystietojen hakupalvelu', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'sy-p10', kuvaus: 'Ratkaisuselostetietokanta ja hakutoiminto', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'sy-p11', kuvaus: 'Sähköinen rikosilmoituksen jatkolomake', kategoria: 'toiminnallisuus', prioriteetti: 'normaali' }
    ],
    lisatyo: [
      { id: 'sy-l1', kuvaus: 'Interaktiivinen opas rikosprosessin vaiheista kansalaisille', kategoria: 'toiminnallisuus', arvioHinta: '20 000 €' },
      { id: 'sy-l2', kuvaus: 'Sähköinen palautelomake asianomistajille', kategoria: 'toiminnallisuus', arvioHinta: '10 000 €' },
      { id: 'sy-l3', kuvaus: 'Tilastodashboard syyttäjälaitoksen tunnusluvuista', kategoria: 'toiminnallisuus', arvioHinta: '30 000 €' }
    ]
  },

  rikosseuraamuslaitos: {
    pakolliset: [
      { id: 'rs-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'rs-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi)', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'rs-p3', kuvaus: 'Suomi.fi-tunnistautumisen integraatio', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'rs-p4', kuvaus: 'Responsiivinen käyttöliittymä', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'rs-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimustenmukaisuus', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'rs-p6', kuvaus: 'Vankilan vierailuaikojen haku ja ajanvaraus', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'rs-p7', kuvaus: 'Sisällönhallintajärjestelmä (CMS)', kategoria: 'sisällönhallinta', prioriteetti: 'korkea' },
      { id: 'rs-p8', kuvaus: 'Analytiikkaratkaisu kävijäseurantaan', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'rs-p9', kuvaus: 'Vankiloiden ja toimipisteiden hakupalvelu kartalla', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'rs-p10', kuvaus: 'Tietosivut rangaistuksen suorittamisen vaiheista', kategoria: 'sisältö', prioriteetti: 'korkea' },
      { id: 'rs-p11', kuvaus: 'Lomakkeet sähköisenä (tapaamisluvat, valitukset)', kategoria: 'toiminnallisuus', prioriteetti: 'normaali' }
    ],
    lisatyo: [
      { id: 'rs-l1', kuvaus: 'Omaisen tietoportaali rangaistusajan suunnitelmasta', kategoria: 'toiminnallisuus', arvioHinta: '40 000 €' },
      { id: 'rs-l2', kuvaus: 'Sähköinen vierailulupahakemus', kategoria: 'toiminnallisuus', arvioHinta: '25 000 €' },
      { id: 'rs-l3', kuvaus: 'Monikielinen ohjemateriaali (englanti, venäjä, arabia)', kategoria: 'kielituki', arvioHinta: '20 000 €' },
      { id: 'rs-l4', kuvaus: 'Vapautuvan vangin palveluohjausportaali', kategoria: 'toiminnallisuus', arvioHinta: '45 000 €' }
    ]
  },

  ulosottolaitos: {
    pakolliset: [
      { id: 'ul-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'ul-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi)', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'ul-p3', kuvaus: 'Suomi.fi-tunnistautuminen ja Suomi.fi-viestit -integraatio', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'ul-p4', kuvaus: 'Responsiivinen käyttöliittymä', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'ul-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimustenmukaisuus', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'ul-p6', kuvaus: 'Ulosottoasian tilan seurantapalvelu velalliselle ja velkojalle', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'ul-p7', kuvaus: 'Sisällönhallintajärjestelmä (CMS)', kategoria: 'sisällönhallinta', prioriteetti: 'korkea' },
      { id: 'ul-p8', kuvaus: 'Analytiikkaratkaisu', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'ul-p9', kuvaus: 'Maksusuunnitelmalaskuri ja maksukykyarvio', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'ul-p10', kuvaus: 'Sähköinen ulosottohakemuslomake velkojille', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' }
    ],
    lisatyo: [
      { id: 'ul-l1', kuvaus: 'Chatbot velallisen neuvontaan', kategoria: 'toiminnallisuus', arvioHinta: '25 000 €' },
      { id: 'ul-l2', kuvaus: 'Sähköinen maksusopimuksen allekirjoituspalvelu', kategoria: 'toiminnallisuus', arvioHinta: '30 000 €' },
      { id: 'ul-l3', kuvaus: 'Velkojan itsepalveluportaali massaperinnälle', kategoria: 'toiminnallisuus', arvioHinta: '50 000 €' }
    ]
  },

  oikeuspalveluvirasto: {
    pakolliset: [
      { id: 'op-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'op-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi)', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'op-p3', kuvaus: 'Suomi.fi-tunnistautumisen integraatio', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'op-p4', kuvaus: 'Responsiivinen käyttöliittymä', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'op-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimustenmukaisuus', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'op-p6', kuvaus: 'Oikeusaputoimistojen haku ja yhteystiedot alueittain', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'op-p7', kuvaus: 'Sisällönhallintajärjestelmä (CMS)', kategoria: 'sisällönhallinta', prioriteetti: 'korkea' },
      { id: 'op-p8', kuvaus: 'Analytiikkaratkaisu', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'op-p9', kuvaus: 'Oikeusapulaskuri tulorajojen arviointiin', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'op-p10', kuvaus: 'Sähköinen oikeusapuhakemus', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'op-p11', kuvaus: 'Edunvalvonnan tietosivut ja hakemuslomakkeet', kategoria: 'toiminnallisuus', prioriteetti: 'normaali' }
    ],
    lisatyo: [
      { id: 'op-l1', kuvaus: 'Chatbot oikeusapuoikeutuksen arviointiin', kategoria: 'toiminnallisuus', arvioHinta: '25 000 €' },
      { id: 'op-l2', kuvaus: 'Sähköinen ajanvaraus oikeusaputoimistoon', kategoria: 'toiminnallisuus', arvioHinta: '20 000 €' },
      { id: 'op-l3', kuvaus: 'Asiakkaan oma näkymä edunvalvonnan tilaan', kategoria: 'toiminnallisuus', arvioHinta: '35 000 €' },
      { id: 'op-l4', kuvaus: 'Monikielinen ohjemateriaali (englanti, somali, arabia)', kategoria: 'kielituki', arvioHinta: '15 000 €' }
    ]
  },

  oikeusrekisterikeskus: {
    pakolliset: [
      { id: 'or-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'or-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi)', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'or-p3', kuvaus: 'Suomi.fi-tunnistautuminen ja Suomi.fi-valtuudet -integraatio', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'or-p4', kuvaus: 'Responsiivinen käyttöliittymä', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'or-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimustenmukaisuus', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'or-p6', kuvaus: 'Rikosrekisteriotteiden sähköinen tilaus Suomi.fi-tunnistautuneille', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'or-p7', kuvaus: 'Sisällönhallintajärjestelmä (CMS)', kategoria: 'sisällönhallinta', prioriteetti: 'korkea' },
      { id: 'or-p8', kuvaus: 'Analytiikkaratkaisu', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'or-p9', kuvaus: 'Rekisteripalvelujen hakutoiminnot ja rajapintadokumentaatio', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'or-p10', kuvaus: 'Sakkojen ja seuraamusmaksujen sähköinen maksaminen', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'or-p11', kuvaus: 'Rekisteritietojen oikaisupyyntölomake', kategoria: 'toiminnallisuus', prioriteetti: 'normaali' }
    ],
    lisatyo: [
      { id: 'or-l1', kuvaus: 'Avointen rajapintojen (API) kehittäjäportaali', kategoria: 'toiminnallisuus', arvioHinta: '40 000 €' },
      { id: 'or-l2', kuvaus: 'Automaattinen otteiden toimitus Suomi.fi-viesteihin', kategoria: 'integraatio', arvioHinta: '20 000 €' },
      { id: 'or-l3', kuvaus: 'Tilastodashboard rekisteripalvelujen käytöstä', kategoria: 'analytiikka', arvioHinta: '15 000 €' }
    ]
  },

  erityisviranomaiset: {
    pakolliset: [
      { id: 'ev-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'ev-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi)', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'ev-p3', kuvaus: 'Suomi.fi-tunnistautumisen integraatio', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'ev-p4', kuvaus: 'Responsiivinen käyttöliittymä', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'ev-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimustenmukaisuus', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'ev-p6', kuvaus: 'Kantelulomake ja sähköinen asiointipalvelu', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'ev-p7', kuvaus: 'Sisällönhallintajärjestelmä (CMS)', kategoria: 'sisällönhallinta', prioriteetti: 'korkea' },
      { id: 'ev-p8', kuvaus: 'Analytiikkaratkaisu', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'ev-p9', kuvaus: 'Ratkaisutietokanta ja päätöshaku erityisviranomaisten ratkaisuista', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'ev-p10', kuvaus: 'Erityisviranomaisten erilliset alasivustot yhtenäisellä ilmeellä', kategoria: 'rakenne', prioriteetti: 'korkea' },
      { id: 'ev-p11', kuvaus: 'Tietosuoja-asetuksen mukainen ilmoituslomake tietosuojaloukkauksista', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'ev-p12', kuvaus: 'Yhdenvertaisuusilmoitusten vastaanottolomake', kategoria: 'toiminnallisuus', prioriteetti: 'normaali' }
    ],
    lisatyo: [
      { id: 'ev-l1', kuvaus: 'Interaktiivinen opas tietosuojaoikeuksista kansalaisille', kategoria: 'toiminnallisuus', arvioHinta: '20 000 €' },
      { id: 'ev-l2', kuvaus: 'Sähköinen seurantatyökalu kantelun käsittelyvaiheelle', kategoria: 'toiminnallisuus', arvioHinta: '30 000 €' },
      { id: 'ev-l3', kuvaus: 'Avoimen datan rajapinta ratkaisuihin ja tilastoihin', kategoria: 'toiminnallisuus', arvioHinta: '25 000 €' },
      { id: 'ev-l4', kuvaus: 'Monikielinen versio keskeisistä ohjesivuista (englanti, saame)', kategoria: 'kielituki', arvioHinta: '15 000 €' }
    ]
  },

  oikeus_fi: {
    pakolliset: [
      { id: 'of-p1', kuvaus: 'WCAG 2.1 AA -tason saavutettavuus koko portaalissa', kategoria: 'saavutettavuus', prioriteetti: 'kriittinen' },
      { id: 'of-p2', kuvaus: 'Kaksikielinen sisältö (suomi/ruotsi) ja osittainen englanninkielinen versio', kategoria: 'kielituki', prioriteetti: 'kriittinen' },
      { id: 'of-p3', kuvaus: 'Suomi.fi-tunnistautuminen kertakirjautumisella (SSO) kaikkiin virastojen palveluihin', kategoria: 'integraatio', prioriteetti: 'kriittinen' },
      { id: 'of-p4', kuvaus: 'Responsiivinen käyttöliittymä', kategoria: 'käytettävyys', prioriteetti: 'kriittinen' },
      { id: 'of-p5', kuvaus: 'Evästekäytäntö ja GDPR-vaatimustenmukaisuus', kategoria: 'tietosuoja', prioriteetti: 'kriittinen' },
      { id: 'of-p6', kuvaus: 'Keskitetty hakutoiminto kaikkien virastojen sisältöihin', kategoria: 'toiminnallisuus', prioriteetti: 'kriittinen' },
      { id: 'of-p7', kuvaus: 'Yhteinen sisällönhallintajärjestelmä (CMS) virastojen toimituskunnille', kategoria: 'sisällönhallinta', prioriteetti: 'kriittinen' },
      { id: 'of-p8', kuvaus: 'Analytiikkaratkaisu portaalitasolla ja virastokohtaisesti', kategoria: 'analytiikka', prioriteetti: 'korkea' },
      { id: 'of-p9', kuvaus: 'Palveluhakemisto: kansalaisen elämäntilanteen mukainen navigointi oikeaan palveluun', kategoria: 'toiminnallisuus', prioriteetti: 'korkea' },
      { id: 'of-p10', kuvaus: 'Yhteinen visuaalinen ilme ja yhtenäinen komponenttikirjasto', kategoria: 'brändi', prioriteetti: 'korkea' },
      { id: 'of-p11', kuvaus: 'Sivukartta ja rakenteellinen metadata (schema.org)', kategoria: 'hakukoneoptimointi', prioriteetti: 'normaali' }
    ],
    lisatyo: [
      { id: 'of-l1', kuvaus: 'Keskitetty chatbot-palvelu oikeusjärjestelmän yleisneuvontaan', kategoria: 'toiminnallisuus', arvioHinta: '50 000 €' },
      { id: 'of-l2', kuvaus: 'Personoitu oma asiointi -näkymä kirjautuneelle käyttäjälle', kategoria: 'toiminnallisuus', arvioHinta: '60 000 €' },
      { id: 'of-l3', kuvaus: 'Selkokielinen versio keskeisistä palvelukuvauksista', kategoria: 'saavutettavuus', arvioHinta: '20 000 €' },
      { id: 'of-l4', kuvaus: 'Palautejärjestelmä ja käyttäjätyytyväisyysmittaus', kategoria: 'analytiikka', arvioHinta: '15 000 €' },
      { id: 'of-l5', kuvaus: 'Avoimen datan rajapinta tuomioistuin- ja säädöstietoon', kategoria: 'integraatio', arvioHinta: '35 000 €' }
    ]
  }
};

// ---------------------------------------------------------------------------
// 4. HAASTATTELUKYSYMYKSET (sidosryhmäkohtaiset)
// ---------------------------------------------------------------------------
const HAASTATTELUKYSYMYKSET = {
  brandi: [
    { id: 'bk1', kysymys: 'Miten nykyinen brändi-ilme palvelee viraston strategisia tavoitteita?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'bk2', kysymys: 'Onko olemassa yhtenäinen graafinen ohjeistus, ja kuinka hyvin sitä noudatetaan eri kanavissa?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'bk3', kysymys: 'Millainen mielikuva viraston verkkopalvelusta halutaan luoda kansalaisille ja ammattilaisille?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'bk4', kysymys: 'Miten brändi-ilme suhteutuu oikeusministeriön ja muiden hallinnonalan virastojen ilmeisiin?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'bk5', kysymys: 'Mitkä ovat suurimmat haasteet nykyisen visuaalisen ilmeen ylläpidossa?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'bk6', kysymys: 'Onko suunnitteilla brändiuudistusta, ja millaisia reunaehtoja se asettaa verkkouudistukselle?', tyyppi: 'kyllä/ei + avoin', prioriteetti: 3 },
    { id: 'bk7', kysymys: 'Miten yhtenäinen ilme varmistetaan eri virastojen alasivustojen välillä?', tyyppi: 'avoin', prioriteetti: 3 }
  ],

  sisalto: [
    { id: 'sk1', kysymys: 'Millainen on nykyinen sisältöjen hallintamalli, ja kuka vastaa julkaisuprosessista?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'sk2', kysymys: 'Kuinka paljon sisältöä nykyisellä sivustolla on, ja onko tehty sisältöinventaariota?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'sk3', kysymys: 'Mitkä sisältötyypit ovat kävijöille tärkeimpiä (ohjeet, lomakkeet, uutiset, päätökset)?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'sk4', kysymys: 'Miten sisällön ajantasaisuus varmistetaan, ja millainen on julkaisukalenteri?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'sk5', kysymys: 'Onko selkokieliselle tai monikieliselle sisällölle tarvetta nykyistä laajemmin?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'sk6', kysymys: 'Mitkä ovat suurimmat pullonkaulat sisällöntuotannossa ja julkaisussa?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'sk7', kysymys: 'Miten haluaisitte hyödyntää tekoälyä sisällöntuotannossa tai sisältöjen jäsentelyssä?', tyyppi: 'avoin', prioriteetti: 3 },
    { id: 'sk8', kysymys: 'Onko nykyisellä CMS-ratkaisulla teknisiä rajoitteita, jotka vaikuttavat sisältötyöhön?', tyyppi: 'avoin', prioriteetti: 3 }
  ],

  saavutettavuus: [
    { id: 'sak1', kysymys: 'Mikä on nykyisen verkkopalvelun saavutettavuuden tila, ja onko tehty saavutettavuusauditointeja?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'sak2', kysymys: 'Miten saavutettavuusvaatimukset (laki digitaalisten palvelujen tarjoamisesta) on huomioitu nykyisessä palvelussa?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'sak3', kysymys: 'Millaisia saavutettavuuspalautteita olette saaneet käyttäjiltä?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'sak4', kysymys: 'Miten saavutettavuus huomioidaan sisällöntuotannon prosesseissa?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'sak5', kysymys: 'Onko PDF-dokumenttien ja liitetiedostojen saavutettavuus varmistettu?', tyyppi: 'kyllä/ei + avoin', prioriteetti: 2 },
    { id: 'sak6', kysymys: 'Millainen on saavutettavuuden ylläpidon ja testauksen prosessi tuotantovaiheessa?', tyyppi: 'avoin', prioriteetti: 3 },
    { id: 'sak7', kysymys: 'Onko tunnistettu erityisiä käyttäjäryhmiä, joille palvelun saavutettavuus on erityisen tärkeää?', tyyppi: 'avoin', prioriteetti: 2 }
  ],

  tekninen: [
    { id: 'tk1', kysymys: 'Mikä on nykyinen tekninen arkkitehtuuri ja alustavalinnat (CMS, hosting, CDN)?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'tk2', kysymys: 'Millaisia integraatioita nykyisessä palvelussa on (Suomi.fi, asianhallinta, hakukoneet)?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'tk3', kysymys: 'Mitkä ovat suorituskykyvaatimukset (samanaikaiset käyttäjät, vasteajat, käytettävyys)?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'tk4', kysymys: 'Onko DevOps-käytäntöjä ja CI/CD-putkia käytössä nykyisessä kehityksessä?', tyyppi: 'kyllä/ei + avoin', prioriteetti: 2 },
    { id: 'tk5', kysymys: 'Millainen on nykyinen ylläpitomalli, ja kuka vastaa teknisestä operoinnista?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'tk6', kysymys: 'Millaisia vaatimuksia Valtorin tai muiden palveluntarjoajien sopimusmallit asettavat?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'tk7', kysymys: 'Onko käytössä tai suunnitteilla headless CMS-, mikropalvelu- tai API-pohjaista arkkitehtuuria?', tyyppi: 'avoin', prioriteetti: 3 },
    { id: 'tk8', kysymys: 'Miten varmuuskopiointi, katastrofipalautus ja palvelun jatkuvuus on järjestetty?', tyyppi: 'avoin', prioriteetti: 3 }
  ],

  kayttajakokemus: [
    { id: 'kk1', kysymys: 'Onko nykyisestä verkkopalvelusta tehty käyttäjätutkimusta, ja mitä keskeisiä löydöksiä siitä on saatu?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'kk2', kysymys: 'Ketkä ovat palvelun pääasialliset käyttäjäryhmät, ja miten heidän tarpeensa eroavat toisistaan?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'kk3', kysymys: 'Mitkä ovat kävijöiden yleisimmät käyttötapaukset ja tehtävät verkkopalvelussa?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'kk4', kysymys: 'Mistä yleisimmistä asioista käyttäjät ottavat yhteyttä puhelimitse tai sähköpostilla?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'kk5', kysymys: 'Miten käyttäjäpalautetta kerätään nykyisin, ja miten sitä hyödynnetään?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'kk6', kysymys: 'Millainen on nykyisen palvelun mobiilikokemus analytiikan perusteella?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'kk7', kysymys: 'Onko tunnistettu erityisiä kipupisteitä nykyisessä käyttöliittymässä?', tyyppi: 'avoin', prioriteetti: 3 }
  ],

  viestinta: [
    { id: 'vk1', kysymys: 'Millainen on viraston viestintästrategia, ja miten verkkopalvelu tukee sen tavoitteita?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'vk2', kysymys: 'Miten kriisiviestintä ja ajankohtaiset tiedotteet toteutetaan nykyisessä verkkopalvelussa?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'vk3', kysymys: 'Miten verkkopalvelu integroituu muihin viestintäkanaviin (sosiaalinen media, uutiskirjeet)?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'vk4', kysymys: 'Millaisia mediapalveluja (lehdistötiedotteet, kuvapankki) verkkopalvelun tulisi tarjota?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'vk5', kysymys: 'Miten sisäinen viestintä ja henkilöstölle suunnatut sisällöt on järjestetty?', tyyppi: 'avoin', prioriteetti: 3 },
    { id: 'vk6', kysymys: 'Millaista yhteistyötä viestintä tekee muiden oikeushallinnon virastojen kanssa verkkoviestinnässä?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'vk7', kysymys: 'Miten verkkopalvelun analytiikkatietoa hyödynnetään viestinnän kehittämisessä?', tyyppi: 'avoin', prioriteetti: 3 }
  ],

  tietoturva: [
    { id: 'ttk1', kysymys: 'Mikä on nykyisen verkkopalvelun tietoturvataso, ja onko tehty tietoturva-auditointeja?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'ttk2', kysymys: 'Miten henkilötietojen käsittely on dokumentoitu, ja onko tietosuojan vaikutustenarviointi (DPIA) tehty?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'ttk3', kysymys: 'Millaisia tietoturvavaatimuksia Kyberturvallisuuskeskus tai Traficom asettaa palvelulle?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'ttk4', kysymys: 'Miten käyttöoikeudet ja pääsynhallinta on toteutettu nykyisessä palvelussa?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'ttk5', kysymys: 'Miten tietoturvahäiriöiden hallinta ja poikkeamien raportointi on järjestetty?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'ttk6', kysymys: 'Millaisia tietoturvaluokiteltuja tietoja palvelussa käsitellään?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'ttk7', kysymys: 'Miten lokitiedot kerätään ja säilytetään valvontatarkoituksia varten?', tyyppi: 'avoin', prioriteetti: 3 },
    { id: 'ttk8', kysymys: 'Onko NIS2-direktiivin vaatimukset arvioitu viraston verkkopalvelun osalta?', tyyppi: 'kyllä/ei + avoin', prioriteetti: 1 }
  ],

  lakiasiat: [
    { id: 'lk1', kysymys: 'Mitkä säädökset ja normit ohjaavat viraston verkkopalvelun sisältöä ja toiminnallisuutta?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'lk2', kysymys: 'Miten laki digitaalisten palvelujen tarjoamisesta vaikuttaa verkkopalvelun vaatimuksiin?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'lk3', kysymys: 'Millaisia julkisuuslain mukaisia velvoitteita verkkopalvelun tietojen julkaisemiseen liittyy?', tyyppi: 'avoin', prioriteetti: 1 },
    { id: 'lk4', kysymys: 'Onko tunnistettu tietosuoja-asetuksen (GDPR) erityisvaatimuksia, jotka kohdistuvat verkkopalveluun?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'lk5', kysymys: 'Millaisia sopimusoikeudellisia reunaehtoja hankintaan ja toteutukseen liittyy?', tyyppi: 'avoin', prioriteetti: 2 },
    { id: 'lk6', kysymys: 'Miten EU:n tekoälysäädöksen (AI Act) vaatimukset huomioidaan, jos palveluun tulee tekoälypohjaisia toiminnallisuuksia?', tyyppi: 'avoin', prioriteetti: 3 },
    { id: 'lk7', kysymys: 'Miten varmistetaan, että verkkopalvelun kautta annettavat oikeudelliset tiedot ovat oikeellisia eivätkä muodosta oikeudellista neuvontaa?', tyyppi: 'avoin', prioriteetti: 2 }
  ]
};

// ---------------------------------------------------------------------------
// 5. SIMULAATIOVAIHEET
// ---------------------------------------------------------------------------
const SIMULAATIO_VAIHEET = [
  {
    id: 'vaihe1',
    nimi: 'Hankevalmistelu',
    kuvaus: 'Projektin tavoitteiden, laajuuden ja reunaehtojen määrittely',
    icon: '📋',
    kesto: '2-4 viikkoa',
    toimijat: ['Oikeusministeriö', 'Siili Solutions'],
    askeleet: [
      { id: 's1-1', teksti: 'Projektin tavoitteet ja hyödyt määritelty', kuvaus: 'Määritellään verkkouudistuksen strategiset tavoitteet ja odotetut vaikutukset kansalaispalveluihin.', toimija: 'tilaaja', kesto: '3 päivää' },
      { id: 's1-2', teksti: 'Sidosryhmäkartta laadittu', kuvaus: 'Tunnistetaan kaikki hankkeeseen liittyvät sidosryhmät ja heidän roolinsa.', toimija: 'tilaaja', kesto: '2 päivää' },
      { id: 's1-3', teksti: 'Alustava aikataulu ja budjettikehys sovittu', kuvaus: 'Laaditaan karkea aikatauluarvio ja varataan budjetti eri vaiheille.', toimija: 'tilaaja', kesto: '3 päivää' },
      { id: 's1-4', teksti: 'Ohjausryhmä nimetty ja käynnistyspalaveri pidetty', kuvaus: 'Perustetaan projektin ohjausryhmä ja pidetään ensimmäinen ohjauskokous.', toimija: 'tilaaja', kesto: '2 päivää' }
    ]
  },
  {
    id: 'vaihe2',
    nimi: 'Kilpailutus ja sopimus',
    kuvaus: 'Toimittajan valinta julkisen hankinnan menettelyllä ja sopimuksen solmiminen',
    icon: '📑',
    kesto: '4-8 viikkoa',
    toimijat: ['Oikeusministeriö', 'Hansel', 'Tarjoajat'],
    askeleet: [
      { id: 's2-1', teksti: 'Tarjouspyynnön laatiminen ja julkaisu', kuvaus: 'Laaditaan tarjouspyyntö vaatimusmäärittelyineen ja julkaistaan HILMA-palvelussa.', toimija: 'tilaaja', kesto: '2 viikkoa' },
      { id: 's2-2', teksti: 'Tarjousten vastaanotto ja vertailu', kuvaus: 'Vastaanotetaan tarjoukset, arvioidaan ne hankintakriteerien perusteella ja laaditaan vertailutaulukko.', toimija: 'tilaaja', kesto: '3 viikkoa' },
      { id: 's2-3', teksti: 'Hankintapäätös ja sopimusneuvottelut', kuvaus: 'Tehdään hankintapäätös, käydään sopimusneuvottelut ja allekirjoitetaan puitesopimus.', toimija: 'tilaaja', kesto: '2 viikkoa' },
      { id: 's2-4', teksti: 'Projektin käynnistys toimittajan kanssa', kuvaus: 'Pidetään kick-off-palaveri, sovitaan yhteisistä työtavoista ja perustetaan projektitilat.', toimija: 'toimittaja', kesto: '3 päivää' }
    ]
  },
  {
    id: 'vaihe3',
    nimi: 'Vaatimusmäärittely',
    kuvaus: 'Toiminnallisten ja teknisten vaatimusten kokoaminen ja priorisointi',
    icon: '📐',
    kesto: '3-5 viikkoa',
    toimijat: ['Siili Solutions', 'Oikeusministeriö', 'Virastot'],
    askeleet: [
      { id: 's3-1', teksti: 'Nykytilakartoitus ja analytiikka-analyysi', kuvaus: 'Analysoidaan nykyinen verkkopalvelu, kävijädata, sisältörakenne ja tekniset ratkaisut.', toimija: 'toimittaja', kesto: '1 viikko' },
      { id: 's3-2', teksti: 'Virastokohtaisten vaatimusten keräys', kuvaus: 'Kerätään jokaisen viraston erityisvaatimukset ja tarpeet työpajoissa.', toimija: 'toimittaja', kesto: '2 viikkoa' },
      { id: 's3-3', teksti: 'Vaatimusten priorisointi ja hyväksyntä', kuvaus: 'Priorisoidaan vaatimukset MoSCoW-menetelmällä ja hyväksytetään ohjausryhmällä.', toimija: 'tilaaja', kesto: '1 viikko' },
      { id: 's3-4', teksti: 'Vaatimusdokumentaation valmistuminen', kuvaus: 'Kootaan vaatimukset yhteen dokumenttiin ja viimeistellään hyväksyttäväksi.', toimija: 'toimittaja', kesto: '3 päivää' }
    ]
  },
  {
    id: 'vaihe4',
    nimi: 'Avoin kuuleminen',
    kuvaus: 'Kansalaisten ja sidosryhmien näkemysten kerääminen avoimella kuulemisella',
    icon: '🗣️',
    kesto: '3-4 viikkoa',
    toimijat: ['Siili Solutions', 'Oikeusministeriö', 'Kansalaiset', 'Järjestöt'],
    askeleet: [
      { id: 's4-1', teksti: 'Kuulemisen suunnittelu ja kyselyn laadinta', kuvaus: 'Suunnitellaan avoimen kuulemisen toteutus ja laaditaan kyselylomake Otakantaa.fi-palveluun.', toimija: 'toimittaja', kesto: '1 viikko' },
      { id: 's4-2', teksti: 'Kuulemisen toteutus ja viestintä', kuvaus: 'Avataan kuuleminen ja viestitään siitä laajasti sosiaalisen median, järjestöjen ja muiden kanavien kautta.', toimija: 'tilaaja', kesto: '2 viikkoa' },
      { id: 's4-3', teksti: 'Vastausten analysointi ja raportointi', kuvaus: 'Analysoidaan saadut vastaukset, luokitellaan ne teemoittain ja laaditaan yhteenvetoraportti.', toimija: 'toimittaja', kesto: '1 viikko' }
    ]
  },
  {
    id: 'vaihe5',
    nimi: 'Sidosryhmähaastattelut',
    kuvaus: 'Syventävät haastattelut virastojen avainhenkilöiden kanssa eri teema-alueilla',
    icon: '🎤',
    kesto: '4-6 viikkoa',
    toimijat: ['Siili Solutions', 'Virastojen edustajat'],
    askeleet: [
      { id: 's5-1', teksti: 'Haastattelusuunnitelman laatiminen', kuvaus: 'Valitaan haastateltavat, laaditaan teemakohtaiset kysymysrungot ja sovitaan aikataulut.', toimija: 'toimittaja', kesto: '1 viikko' },
      { id: 's5-2', teksti: 'Haastattelujen toteutus (virasto × sidosryhmä)', kuvaus: 'Toteutetaan haastattelut kaikille virastoille kunkin teema-alueen näkökulmasta.', toimija: 'toimittaja', kesto: '3 viikkoa' },
      { id: 's5-3', teksti: 'Haastattelumuistiinpanojen litterointi ja tarkistus', kuvaus: 'Kirjoitetaan haastattelut puhtaaksi, tarkistutetaan haastateltavilla ja tallennetaan projektin tietovarastoon.', toimija: 'toimittaja', kesto: '1 viikko' },
      { id: 's5-4', teksti: 'Teemoittelu ja poikkeamien tunnistaminen', kuvaus: 'Luokitellaan löydökset teemoihin ja tunnistetaan virastojen väliset erot ja yhtäläisyydet.', toimija: 'toimittaja', kesto: '3 päivää' }
    ]
  },
  {
    id: 'vaihe6',
    nimi: 'Analyysi ja synteesi',
    kuvaus: 'Kerätyn tiedon analysointi, johtopäätösten tekeminen ja suositusten muodostaminen',
    icon: '🔍',
    kesto: '2-3 viikkoa',
    toimijat: ['Siili Solutions', 'Oikeusministeriö'],
    askeleet: [
      { id: 's6-1', teksti: 'Tiedon kokoaminen ja ristikkäisanalyysi', kuvaus: 'Yhdistetään kuulemisen, haastattelujen ja analytiikan tulokset ja tehdään ristikkäisanalyysi.', toimija: 'toimittaja', kesto: '1 viikko' },
      { id: 's6-2', teksti: 'Keskeisten löydösten ja suositusten muodostaminen', kuvaus: 'Laaditaan prioriteettisuositukset ja konkreettiset kehitysehdotukset löydösten pohjalta.', toimija: 'toimittaja', kesto: '3 päivää' },
      { id: 's6-3', teksti: 'Loppuraportin laatiminen ja esittely ohjausryhmälle', kuvaus: 'Kootaan tulokset loppuraporttiin, esitellään ohjausryhmälle ja hyväksytetään suuntaviivat.', toimija: 'toimittaja', kesto: '3 päivää' }
    ]
  },
  {
    id: 'vaihe7',
    nimi: 'Suunnittelu ja toteutus',
    kuvaus: 'Verkkopalvelun konseptisuunnittelu, prototypointi ja varsinainen toteutustyö',
    icon: '🚀',
    kesto: '12-20 viikkoa',
    toimijat: ['Siili Solutions', 'Oikeusministeriö', 'Virastot'],
    askeleet: [
      { id: 's7-1', teksti: 'Konseptisuunnittelu ja wireframe-mallit', kuvaus: 'Suunnitellaan verkkopalvelun rakenne, navigaatio ja sivupohjat wireframe-tasolla.', toimija: 'toimittaja', kesto: '3 viikkoa' },
      { id: 's7-2', teksti: 'Visuaalinen suunnittelu ja komponenttikirjasto', kuvaus: 'Laaditaan visuaalinen ilme, design-system ja uudelleenkäytettävä komponenttikirjasto.', toimija: 'toimittaja', kesto: '3 viikkoa' },
      { id: 's7-3', teksti: 'Tekninen toteutus ja integraatiot', kuvaus: 'Toteutetaan palvelu agile-menetelmällä sprintissä, integroidaan ulkoisiin järjestelmiin.', toimija: 'toimittaja', kesto: '8-12 viikkoa' },
      { id: 's7-4', teksti: 'Testaus, saavutettavuusauditointi ja hyväksyntätestaus', kuvaus: 'Suoritetaan laaja testaus sisältäen toiminnallisen testauksen, saavutettavuusauditoinnin ja käyttäjätestauksen.', toimija: 'toimittaja', kesto: '2 viikkoa' },
      { id: 's7-5', teksti: 'Käyttöönotto ja siirtymäsuunnitelma', kuvaus: 'Julkaistaan uusi palvelu hallitusti, toteutetaan uudelleenohjaukset ja seurataan siirtymävaihetta.', toimija: 'toimittaja', kesto: '1 viikko' }
    ]
  }
];

// ---------------------------------------------------------------------------
// 6. HAASTATTELUKONFIGURAATIOT (virasto × sidosryhmä -matriisi)
// ---------------------------------------------------------------------------
const HAASTATTELUKONFIGURAATIOT = VIRASTOT.flatMap(virasto =>
  SIDOSRYHMAT.map(sr => ({
    id: `${virasto.id}_${sr.id}`,
    virastoId: virasto.id,
    sidosryhmaId: sr.id,
    tila: 'odottaa', // odottaa | käynnissä | valmis
    haastateltava: null,
    muistiinpanot: ''
  }))
);

// ---------------------------------------------------------------------------
// Vienti
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VIRASTOT,
    SIDOSRYHMAT,
    VAATIMUKSET,
    HAASTATTELUKYSYMYKSET,
    SIMULAATIO_VAIHEET,
    HAASTATTELUKONFIGURAATIOT
  };
}
