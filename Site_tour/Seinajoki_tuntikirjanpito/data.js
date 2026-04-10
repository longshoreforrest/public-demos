// ============================================================
// Mock-data: Projektit, Git, Jira, Kalenteri
// ============================================================

const PROJECTS = [
  { id: 'kanta',    name: 'Kanta-palvelut',  color: '#2563eb', description: 'Reseptikeskus-uudistus' },
  { id: 'suomifi',  name: 'Suomi.fi',        color: '#7c3aed', description: 'Viestit-palvelun kehitys' },
  { id: 'dvv',      name: 'DVV / VTJ',       color: '#059669', description: 'Vaestotietojarjestelma-modernisointi' },
  { id: 'omavero',  name: 'OmaVero',         color: '#d97706', description: 'Veroilmoitus-uudistus 2026' },
  { id: 'kela',     name: 'Kela-etuudet',    color: '#dc2626', description: 'Etuuskaasittelyn automatisointi' },
  { id: 'sisainen', name: 'Sisainen kehitys',color: '#6b7280', description: 'CI/CD, tyokalut, infra' },
];

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0,0,0,0);
  return d;
}
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function formatDate(date) { return date.toISOString().split('T')[0]; }
function weekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function seededRand(seed) {
  let h = seed;
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// ---- GIT ----
function generateGitCommits(mondayDate) {
  const monday = new Date(mondayDate);
  const seed = monday.getFullYear()*10000 + (monday.getMonth()+1)*100 + monday.getDate();
  const rand = seededRand(seed);

  const templates = [
    { project:'kanta', branch:'feature/KANTA-1423-resepti-validointi', messages:[
      'feat(resepti): lisaa FHIR R4 -validointi reseptisanomille',
      'fix(resepti): korjaa laakemaarayksen annoskentän tarkistus',
      'test(resepti): yksikkotestit validointilogiikalle',
      'refactor(resepti): eriytetaan validointipalvelu omaksi moduuliksi',
    ]},
    { project:'kanta', branch:'fix/KANTA-1401-potilastiedon-haku', messages:[
      'fix(potilas): korjaa OID-tunnisteen kasittely haussa',
      'fix(potilas): lisaa null-tarkistus hoitojaksotietoihin',
    ]},
    { project:'suomifi', branch:'feature/SUOMIFI-892-viestit-arkistointi', messages:[
      'feat(viestit): viestien automaattinen arkistointi 12kk jalkeen',
      'feat(viestit): arkistoidun viestin palautustoiminto',
      'test(viestit): integraatiotestit arkistointipalvelulle',
    ]},
    { project:'suomifi', branch:'feature/SUOMIFI-905-saavutettavuus', messages:[
      'feat(a11y): WCAG 2.1 AA -korjaukset viestinakeille',
      'fix(a11y): ruudunlukijan tuki viesti-ilmoituksille',
    ]},
    { project:'dvv', branch:'feature/DVV-2301-osoitepalvelu-api', messages:[
      'feat(osoite): REST-rajapinta osoitemuutosilmoituksille',
      'feat(osoite): validointi postinumeroille ja katuosoitteille',
      'test(osoite): API-integraatiotestit osoitepalvelulle',
    ]},
    { project:'omavero', branch:'feature/VERO-4501-esitaytetty-veroilmoitus', messages:[
      'feat(veroilmoitus): esitaytetyt tiedot Tulorekisterista',
      'feat(veroilmoitus): vahennysten laskentalogiikka',
      'fix(veroilmoitus): pyoristysvirhe paaomatuloissa',
      'test(veroilmoitus): E2E-testit lahetykselle',
    ]},
    { project:'omavero', branch:'fix/VERO-4489-kirjautuminen', messages:[
      'fix(auth): Suomi.fi-tunnistautumisen session hallinta',
    ]},
    { project:'kela', branch:'feature/KELA-3310-paatosautomaatio', messages:[
      'feat(paatos): automaattinen paatoksenteko peruspaivarahalle',
      'feat(paatos): saantotarkistukset tulorajoille',
      'test(paatos): yksikkotestit paatossaannoille',
    ]},
    { project:'sisainen', branch:'chore/infra-pipeline-update', messages:[
      'chore(ci): GitHub Actions Node 20',
      'chore(ci): SonarQube-laaduntarkistus pipelineen',
      'fix(ci): Docker-buildin cache-ongelma',
    ]},
  ];

  const commits = [];
  templates.forEach(t => {
    t.messages.forEach(msg => {
      const dayOffset = Math.floor(rand()*5);
      const hour = 8 + Math.floor(rand()*9);
      const minute = Math.floor(rand()*60);
      const dt = addDays(monday, dayOffset);
      dt.setHours(hour, minute);
      commits.push({
        project: t.project, branch: t.branch, message: msg,
        date: new Date(dt), dayIndex: dayOffset,
        hash: seed.toString(16).substr(0,3) + rand().toString(16).substr(2,4),
        filesChanged: Math.floor(rand()*8)+1,
        additions: Math.floor(rand()*150)+5,
        deletions: Math.floor(rand()*60),
      });
    });
  });
  commits.sort((a,b) => a.date - b.date);
  return commits;
}

// ---- JIRA ----
function generateJiraTickets(mondayDate) {
  const monday = new Date(mondayDate);
  return [
    { key:'KANTA-1423', project:'kanta', summary:'FHIR R4 -validoinnin toteutus reseptisanomille',
      status:'In Progress', type:'Story', priority:'High',
      events:[
        { dayIndex:0, type:'transition', text:'To Do \u2192 In Progress', detail:'Aloitettu kehitys' },
        { dayIndex:1, type:'comment', text:'Validointisaannot maaritelty arkkitehdin kanssa' },
        { dayIndex:3, type:'transition', text:'In Progress \u2192 Code Review', detail:'PR avattu' },
        { dayIndex:3, type:'comment', text:'Koodikatselmointi pyydetty @matti.virtanen' },
      ]},
    { key:'KANTA-1401', project:'kanta', summary:'OID-tunnisteen kasittely potilastiedon haussa',
      status:'Done', type:'Bug', priority:'Critical',
      events:[
        { dayIndex:0, type:'transition', text:'To Do \u2192 In Progress', detail:'Aloitettu korjaus' },
        { dayIndex:0, type:'comment', text:'Tuotannossa havaittu virhe, priorisoidaan' },
        { dayIndex:1, type:'transition', text:'In Progress \u2192 Done', detail:'Korjattu ja testattu' },
      ]},
    { key:'KANTA-1430', project:'kanta', summary:'Laakemaaraysten arkistoinnin suunnittelu',
      status:'To Do', type:'Task', priority:'Medium',
      events:[
        { dayIndex:2, type:'comment', text:'Maarittelydokumentti luonnosteltu' },
      ]},
    { key:'SUOMIFI-892', project:'suomifi', summary:'Viestien automaattinen arkistointi',
      status:'In Progress', type:'Story', priority:'High',
      events:[
        { dayIndex:2, type:'comment', text:'Arkistointipalvelun rajapinta valmis' },
        { dayIndex:4, type:'transition', text:'In Progress \u2192 Code Review', detail:'PR avattu' },
      ]},
    { key:'SUOMIFI-905', project:'suomifi', summary:'WCAG 2.1 AA -saavutettavuuskorjaukset',
      status:'In Progress', type:'Task', priority:'High',
      events:[
        { dayIndex:2, type:'transition', text:'To Do \u2192 In Progress', detail:'Aloitettu' },
        { dayIndex:2, type:'comment', text:'Saavutettavuusauditoinnin tulokset analysoitu' },
      ]},
    { key:'DVV-2301', project:'dvv', summary:'Osoitepalvelun REST-rajapinta',
      status:'In Progress', type:'Story', priority:'High',
      events:[
        { dayIndex:0, type:'transition', text:'To Do \u2192 In Progress', detail:'Kehitys aloitettu' },
        { dayIndex:1, type:'comment', text:'OpenAPI-spesifikaatio katselmointiin' },
        { dayIndex:3, type:'comment', text:'Rajapinta toteutettu, testit kaynnissa' },
      ]},
    { key:'VERO-4501', project:'omavero', summary:'Esitaytetyn veroilmoituksen kehitys',
      status:'In Progress', type:'Epic', priority:'Critical',
      events:[
        { dayIndex:1, type:'comment', text:'Tulorekisteri-integraatio toimii kehitysymparistossa' },
        { dayIndex:3, type:'comment', text:'Vahennyslaskenta valmis, aloitetaan E2E-testit' },
      ]},
    { key:'VERO-4489', project:'omavero', summary:'Suomi.fi-tunnistautumisen session hallinta',
      status:'Done', type:'Bug', priority:'Critical',
      events:[
        { dayIndex:0, type:'transition', text:'To Do \u2192 Done', detail:'Hotfix julkaistu' },
      ]},
    { key:'KELA-3310', project:'kela', summary:'Automaattinen paatoksenteko peruspaivarahalle',
      status:'In Progress', type:'Story', priority:'High',
      events:[
        { dayIndex:1, type:'transition', text:'To Do \u2192 In Progress', detail:'Kehitys aloitettu' },
        { dayIndex:1, type:'comment', text:'Saantotarkistukset maaritelty liiketoiminnan kanssa' },
        { dayIndex:4, type:'comment', text:'Testit menevat lapi, odottaa katselmointia' },
      ]},
  ];
}

// ---- CALENDAR ----
function generateCalendarEvents(mondayDate) {
  return [
    // Kanta dailyt
    { project:'kanta', title:'Kanta Daily Standup', day:0, time:'09:15', duration:15, recurring:true },
    { project:'kanta', title:'Kanta Daily Standup', day:1, time:'09:15', duration:15, recurring:true },
    { project:'kanta', title:'Kanta Daily Standup', day:2, time:'09:15', duration:15, recurring:true },
    { project:'kanta', title:'Kanta Daily Standup', day:3, time:'09:15', duration:15, recurring:true },
    { project:'kanta', title:'Kanta Daily Standup', day:4, time:'09:15', duration:15, recurring:true },
    { project:'kanta', title:'Kanta Sprint Review', day:4, time:'14:00', duration:60, recurring:true },
    { project:'kanta', title:'Kanta Backlog Refinement', day:2, time:'13:00', duration:60, recurring:true },
    // Suomi.fi
    { project:'suomifi', title:'Suomi.fi Viestit -standup', day:0, time:'09:45', duration:15, recurring:true },
    { project:'suomifi', title:'Suomi.fi Viestit -standup', day:1, time:'09:45', duration:15, recurring:true },
    { project:'suomifi', title:'Suomi.fi Viestit -standup', day:2, time:'09:45', duration:15, recurring:true },
    { project:'suomifi', title:'Suomi.fi Viestit -standup', day:3, time:'09:45', duration:15, recurring:true },
    { project:'suomifi', title:'Suomi.fi Viestit -standup', day:4, time:'09:45', duration:15, recurring:true },
    { project:'suomifi', title:'Suomi.fi Sprint Planning', day:0, time:'10:00', duration:90, recurring:true },
    { project:'suomifi', title:'Saavutettavuuskatselmointi', day:3, time:'13:00', duration:60, recurring:false },
    // DVV
    { project:'dvv', title:'DVV Osoitepalvelu -standup', day:0, time:'10:00', duration:15, recurring:true },
    { project:'dvv', title:'DVV Osoitepalvelu -standup', day:1, time:'10:00', duration:15, recurring:true },
    { project:'dvv', title:'DVV Osoitepalvelu -standup', day:2, time:'10:00', duration:15, recurring:true },
    { project:'dvv', title:'DVV Osoitepalvelu -standup', day:3, time:'10:00', duration:15, recurring:true },
    { project:'dvv', title:'DVV Osoitepalvelu -standup', day:4, time:'10:00', duration:15, recurring:true },
    { project:'dvv', title:'DVV Arkkitehtuurikatselmointi', day:1, time:'14:00', duration:60, recurring:true },
    // OmaVero
    { project:'omavero', title:'OmaVero Daily', day:0, time:'09:00', duration:15, recurring:true },
    { project:'omavero', title:'OmaVero Daily', day:1, time:'09:00', duration:15, recurring:true },
    { project:'omavero', title:'OmaVero Daily', day:2, time:'09:00', duration:15, recurring:true },
    { project:'omavero', title:'OmaVero Daily', day:3, time:'09:00', duration:15, recurring:true },
    { project:'omavero', title:'OmaVero Daily', day:4, time:'09:00', duration:15, recurring:true },
    { project:'omavero', title:'Veroilmoitus-demo sidosryhmille', day:4, time:'10:00', duration:60, recurring:false },
    // Kela
    { project:'kela', title:'Kela Etuusautomaatio -standup', day:1, time:'09:30', duration:15, recurring:true },
    { project:'kela', title:'Kela Etuusautomaatio -standup', day:3, time:'09:30', duration:15, recurring:true },
    { project:'kela', title:'Kela Retrospektiivi', day:4, time:'15:00', duration:60, recurring:true },
    // Sisainen
    { project:'sisainen', title:'Kehittajien viikkokokous', day:0, time:'08:30', duration:30, recurring:true },
    { project:'sisainen', title:'Tech Talk: Observability', day:3, time:'15:00', duration:45, recurring:false },
  ];
}

function generatePreviousWeekHours() {
  return {
    'kanta':[3,4,2.5,3,2,0,0], 'suomifi':[2,1.5,2,1,1.5,0,0],
    'dvv':[1,1.5,2,2,1,0,0], 'omavero':[1,0.5,1,1.5,2,0,0],
    'kela':[0,0,0,0.5,1,0,0], 'sisainen':[0.5,0,0,0,0,0,0],
  };
}
