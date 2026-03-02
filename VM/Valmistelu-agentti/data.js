/* ============================================================
   data.js — Säädösvalmistelun AI-agentti: Simuloitu sisältöpohja
   EU AI Act -asetuksen kansallinen täytäntöönpano
   ============================================================ */

const DATA = {

  // ── Projektin perustiedot ──────────────────────────────────
  project: {
    title: "EU AI Act — Kansallinen täytäntöönpano",
    code: "VM/2025/142",
    phase: "Esivalmistelu",
    deadline: "31.12.2026",
    responsible: "Julkishallinnon ICT-osasto",
    description: "Euroopan parlamentin ja neuvoston asetuksen (EU) 2024/1689 (tekoälyasetus) edellyttämät kansalliset täytäntöönpanotoimet: markkinavalvonnan järjestäminen, kansallisen toimivaltaisen viranomaisen nimeäminen, seuraamusjärjestelmän luominen sekä AI-osaamisen varmistaminen julkishallinnossa."
  },

  // ── Hankevaihtoehdot ─────────────────────────────────────────
  projects: [
    {
      title: "EU AI Act — Kansallinen täytäntöönpano",
      code: "VM/2025/142",
      phase: "Esivalmistelu",
      deadline: "31.12.2026",
      headerTitle: "EU AI Act — Kansallinen täytäntöönpano",
      badges: [
        { text: "AI Act 2024/1689", class: "badge-indigo" },
        { text: "Esivalmistelu", class: "badge-amber" }
      ]
    },
    {
      title: "Digitaalinen euro — Kansallinen valmistelu",
      code: "VM/2025/088",
      phase: "Esivalmistelu",
      deadline: "30.6.2027",
      headerTitle: "Digitaalinen euro — Kansallinen valmistelu",
      badges: [
        { text: "EKP / Komissio", class: "badge-indigo" },
        { text: "Esivalmistelu", class: "badge-amber" }
      ]
    },
    {
      title: "Julkisten hankintojen AI-velvoitteet",
      code: "VM/2026/031",
      phase: "Virkamiesesitys",
      deadline: "31.3.2027",
      headerTitle: "Julkisten hankintojen AI-velvoitteet",
      badges: [
        { text: "Hankintalaki", class: "badge-indigo" },
        { text: "Virkamiesesitys", class: "badge-amber" }
      ]
    }
  ],

  // ── Agenttiprofiili ────────────────────────────────────────
  agents: {
    va: {
      id: "va",
      name: "Valmisteluagentti",
      abbr: "VA",
      color: "#ffe100",
      role: "Kerää lähteet, analysoi ristiriidat, luonnostelee pykälät",
      avatar: "VA"
    },
    vaa: {
      id: "vaa",
      name: "Vaikutusarvioagentti",
      abbr: "VaA",
      color: "#22c55e",
      role: "Fiskaalinen analyysi, sääntelytaakka, sidosryhmäarviot",
      avatar: "VaA"
    },
    vam: {
      id: "vam",
      name: "Vanhenemismonitoriagentti",
      abbr: "VaM",
      color: "#d97706",
      role: "Lähteiden tuoreus, muutosvaikutukset, hälytykset",
      avatar: "VaM"
    }
  },

  // ── Lähteet ────────────────────────────────────────────────
  sources: {
    eu: [
      {
        id: "eu-1",
        title: "Euroopan parlamentin ja neuvoston asetus (EU) 2024/1689",
        shortTitle: "EU AI Act",
        type: "Asetus",
        date: "13.6.2024",
        status: "Voimassa",
        relevance: 0.98,
        summary: "Tekoälyä koskeva yhdenmukainen sääntelykehys. Riskiperusteinen lähestymistapa: kielletyt käytännöt (art. 5), korkean riskin järjestelmät (art. 6–49), läpinäkyvyysvelvoitteet (art. 50), yleiskäyttöisen tekoälyn mallit (art. 51–56). Voimaantulo portaittain 2.2.2025–2.8.2027.",
        keyArticles: ["Art. 5 – Kielletyt käytännöt", "Art. 6–7 – Korkean riskin luokittelu", "Art. 26 – Käyttöönottajien velvoitteet", "Art. 64 – AI-toimisto", "Art. 70 – Kansallinen valvontaviranomainen", "Art. 99 – Seuraamukset"]
      },
      {
        id: "eu-2",
        title: "Euroopan AI-toimiston ohjeistus kielletyistä käytännöistä",
        shortTitle: "AI Office — Kielletyt käytännöt",
        type: "Ohjeistus",
        date: "4.2.2025",
        status: "Voimassa",
        relevance: 0.91,
        summary: "Ensimmäinen virallinen tulkintaohjeistus AI Act art. 5 mukaisista kielletyistä käytännöistä: sosiaalinen pisteytys, reaaliaikainen biometrinen etätunnistus, ennustavaan poliisitoimintaan perustuva profilointi. Selkeyttää jäsenvaltioiden täytäntöönpanovelvollisuuksia 2.2.2025 alkaen."
      },
      {
        id: "eu-3",
        title: "Harmonisoidut standardit korkean riskin AI-järjestelmille (luonnos)",
        shortTitle: "CEN/CENELEC JTC 21 -standardit",
        type: "Standardiluonnos",
        date: "15.9.2025",
        status: "Luonnos",
        relevance: 0.82,
        summary: "CEN/CENELEC JTC 21 -teknisen komitean valmistelussa olevat harmonisoidut eurooppalaiset standardit korkean riskin tekoälyjärjestelmille. Kattavat riskinhallintajärjestelmän (Art. 9), datan laadun (Art. 10), teknisen dokumentaation (Art. 11) ja ihmisen suorittaman valvonnan (Art. 14) vaatimukset."
      },
      {
        id: "eu-4",
        title: "AI Act — Vaatimustenmukaisuuden arviointimenettelyt",
        shortTitle: "Conformity Assessment",
        type: "Delegoitu asetus (luonnos)",
        date: "1.11.2025",
        status: "Luonnos",
        relevance: 0.78,
        summary: "Komission delegoitu asetus vaatimustenmukaisuuden arviointimenettelyistä AI Act art. 43 mukaisesti. Määrittelee ilmoitettujen laitosten roolin, sisäisen valvonnan menettelyt ja kolmannen osapuolen auditoinnin vaatimukset."
      }
    ],

    international: [
      {
        id: "int-1",
        title: "Viron digitaalihallinnon AI-kehys (Eesti AI raamistik)",
        shortTitle: "Viro — AI-kehys",
        country: "Viro",
        flag: "🇪🇪",
        date: "1.3.2025",
        relevance: 0.88,
        summary: "Viron lähestymistapa AI Act -täytäntöönpanoon: kevyt hallinnollinen malli, jossa RIA (Riigi Infosüsteemi Amet) toimii kansallisena valvontaviranomaisena. Erityisesti huomionarvoinen julkishallinnon AI-järjestelmien sääntely-sandbox (\"AI eksperimentaalkeskkond\"), joka mahdollistaa hallitun kokeilun ennen täyttä vaatimustenmukaisuutta.",
        lessons: "Sandbox-malli voisi soveltua Suomeen; kevyt organisointi vähentää hallinnollista taakkaa."
      },
      {
        id: "int-2",
        title: "Ruotsin AI-strategia ja EU AI Act -täytäntöönpanosuunnitelma",
        shortTitle: "Ruotsi — AI-strategia",
        country: "Ruotsi",
        flag: "🇸🇪",
        date: "15.6.2025",
        relevance: 0.85,
        summary: "Ruotsin malli keskittää AI-valvonnan IMY:n (Integritetsskyddsmyndigheten) alaisuuteen, hyödyntäen olemassa olevan tietosuojaviranomaisen osaamista ja resursseja. Sektorikohtainen yhteistoimintamalli Läkemedelsverket-, Transportstyrelsen- ja Finansinspektionen-viranomaisten kanssa.",
        lessons: "Tietosuojaviranomaisen roolin laajentaminen voi tuoda synergiaetuja; sektorikohtainen malli vaatii selkeät vastuujaot."
      },
      {
        id: "int-3",
        title: "UK AI Safety Institute — Turvallisuuskehys",
        shortTitle: "UK — AI Safety Institute",
        country: "Iso-Britannia",
        flag: "🇬🇧",
        date: "20.4.2025",
        relevance: 0.72,
        summary: "Iso-Britannian AI Safety Institute (AISI) -malli perustaa erillisen teknisen arviointielimen, joka tekee riippumattomia turvallisuusarviointeja frontier-malleille. Vaikka UK ei ole EU AI Act -piirissä, AISI-malli tarjoaa arvokkaan vertailukohdan tekniselle testauskapasiteetille.",
        lessons: "Erillinen tekninen arviointielin voisi tukea kansallista markkinavalvontaa; erityisesti yleiskäyttöisten AI-mallien testauskapasiteetti on kriittinen."
      }
    ],

    domestic: [
      {
        id: "dom-1",
        title: "Tietosuojalaki (1050/2018)",
        shortTitle: "Tietosuojalaki",
        type: "Laki",
        date: "5.12.2018",
        status: "Voimassa",
        relevance: 0.93,
        summary: "Täydentää ja täsmentää EU:n yleistä tietosuoja-asetusta (GDPR) kansallisella tasolla. Erityisen relevantti AI-kontekstissa: henkilötietojen käsittely automaattisessa päätöksenteossa (21 §), arkaluonteisten tietojen käsittely (6 §), valvontaviranomaisen (tietosuojavaltuutettu) toimivaltuudet (14–19 §).",
        conflicts: ["Automaattisen päätöksenteon rajat vs. AI Act art. 14 ihmisen valvonta", "Valvontatoimivaltuuksien päällekkäisyys AI-valvontaviranomaisen kanssa"]
      },
      {
        id: "dom-2",
        title: "Laki julkisen hallinnon tiedonhallinnasta (906/2019)",
        shortTitle: "Tiedonhallintalaki",
        type: "Laki",
        date: "9.8.2019",
        status: "Voimassa",
        relevance: 0.89,
        summary: "Säätelee julkishallinnon tietovarantojen hallintaa, tietojärjestelmien yhteentoimivuutta ja automaattista päätöksentekoa. 6 a § (automaattinen päätöksenteko) asettaa vaatimuksia, jotka koskevat myös AI-järjestelmien käyttöä viranomaisissa. Tiedonhallintalautakunta ohjaa ja arvioi tiedonhallinnan toteuttamista.",
        conflicts: ["Automaattisen päätöksenteon käsitemäärittelyt eroavat AI Actin luokittelusta", "Tiedonhallintalautakunnan ja AI-valvontaviranomaisen mahdollinen tehtäväpäällekkäisyys"]
      },
      {
        id: "dom-3",
        title: "VM:n julkaisu: AI tuottavuuden kasvattajana julkishallinnossa",
        shortTitle: "VM — AI & tuottavuus",
        type: "Julkaisu",
        date: "12.9.2025",
        status: "Voimassa",
        relevance: 0.86,
        summary: "Valtiovarainministeriön julkaisu linjaa tekoälyn hyödyntämisstrategian julkishallinnossa: keskitetty AI-alusta, osaamisen kehittämisohjelma, hankintojen AI-kriteerit ja mittaristo tuottavuusvaikutusten seurantaan. Tavoitteena 15 % tuottavuusparannus valtion virastoissa vuoteen 2030 mennessä.",
        conflicts: []
      },
      {
        id: "dom-4",
        title: "Hallintolaki (434/2003)",
        shortTitle: "Hallintolaki",
        type: "Laki",
        date: "6.6.2003",
        status: "Voimassa",
        relevance: 0.81,
        summary: "Hyvän hallinnon takeet: kuulemisvelvoite, päätöksen perusteleminen, oikaisuvaatimus. Automaattinen päätöksenteko edellyttää, ettei perusoikeuksia rajoiteta ilman lakiperustetta. Päätöksen perusteluvelvollisuus (45 §) asettaa vaatimuksia AI-järjestelmien selitettävyydelle.",
        conflicts: ["Perusteluvelvollisuus vs. AI-järjestelmien \"black box\" -luonne"]
      },
      {
        id: "dom-5",
        title: "Laki sähköisestä asioinnista viranomaistoiminnassa (13/2003)",
        shortTitle: "Sähköinen asiointi -laki",
        type: "Laki",
        date: "24.1.2003",
        status: "Voimassa",
        relevance: 0.68,
        summary: "Säätelee sähköistä asiointia viranomaistoiminnassa. AI-järjestelmien osalta relevantti erityisesti sähköisen asiakirjan määritelmä (4 §) ja automatisoitu päätöksenteko sähköisissä palveluissa."
      }
    ]
  },

  // ── Säädösluonnos (8 pykälää) ──────────────────────────────
  draftArticles: [
    {
      id: "§1",
      number: "1 §",
      title: "Lain tarkoitus",
      content: "Tällä lailla pannaan täytäntöön tekoälyasetuksessa (EU) 2024/1689 edellytetyt kansalliset toimenpiteet ja säädetään tekoälyjärjestelmien markkinavalvonnasta, kansallisesta valvontaviranomaisesta ja seuraamusjärjestelmästä.",
      changes: [],
      agentComment: "Peruspykälä — viittaa suoraan EU AI Act -asetukseen. Ei merkittäviä ristiriitoja kansallisen lainsäädännön kanssa.",
      status: "draft"
    },
    {
      id: "§2",
      number: "2 §",
      title: "Soveltamisala",
      content: "Tätä lakia sovelletaan tekoälyjärjestelmien tarjoajiin, käyttöönottajiin, maahantuojiin ja jakelijoihin, jotka toimivat Suomessa tai joiden tekoälyjärjestelmän tuotos on tarkoitettu käytettäväksi Suomessa.",
      changes: [
        { type: "addition", text: "Lakia sovelletaan myös julkishallinnon viranomaisiin, jotka käyttävät tekoälyjärjestelmiä hallintopäätösten valmistelussa tai tekemisessä." },
        { type: "addition", text: "Lain soveltamisalan ulkopuolelle jäävät puolustus- ja turvallisuusviranomaisten toiminta tekoälyasetuksen artiklan 2(3) mukaisesti." }
      ],
      agentComment: "Lisätty julkishallinnon soveltamisala, joka kattaa hallintolain piiriin kuuluvat automaattiset päätökset. Puolustuspoikkeus EU AI Actin mukaisesti.",
      status: "draft"
    },
    {
      id: "§3",
      number: "3 §",
      title: "Määritelmät",
      content: "Tässä laissa tarkoitetaan:",
      changes: [
        { type: "addition", text: "1) tekoälyjärjestelmällä tekoälyasetuksen 3 artiklan 1 kohdassa tarkoitettua järjestelmää;" },
        { type: "addition", text: "2) korkean riskin tekoälyjärjestelmällä tekoälyasetuksen 6 artiklan mukaista järjestelmää;" },
        { type: "addition", text: "3) yleiskäyttöisen tekoälyn mallilla tekoälyasetuksen 3 artiklan 63 kohdassa tarkoitettua mallia;" },
        { type: "addition", text: "4) käyttöönottajalla tekoälyasetuksen 3 artiklan 4 kohdassa tarkoitettua luonnollista tai oikeushenkilöä;" },
        { type: "addition", text: "5) AI-sääntelyhiekkalaatikolla valvotussa ympäristössä tapahtuvaa tekoälyjärjestelmän kehittämistä ja testausta ennen markkinoille saattamista." }
      ],
      agentComment: "Määritelmät viittaavat suoraan EU AI Actiin yhteensopivuuden varmistamiseksi. Sääntelyhiekkalaatikko (sandbox) lisätty Viron mallin mukaisesti.",
      status: "draft"
    },
    {
      id: "§4",
      number: "4 §",
      title: "Kansallinen valvontaviranomainen",
      content: "Tekoälyasetuksen 70 artiklassa tarkoitettuna kansallisena valvontaviranomaisena toimii Liikenne- ja viestintävirasto Traficom.",
      changes: [
        { type: "addition", text: "Traficom vastaa korkean riskin tekoälyjärjestelmien markkinavalvonnasta, toimii yhteyspisteenä Euroopan AI-toimistoon ja ylläpitää kansallista rekisteriä korkean riskin tekoälyjärjestelmistä." },
        { type: "addition", text: "Traficom tekee yhteistyötä tietosuojavaltuutetun toimiston kanssa siltä osin kuin valvonta koskee henkilötietojen käsittelyä tekoälyjärjestelmissä." },
        { type: "removal", text: "Vaihtoehtoisesti valvontaviranomainen voisi olla tietosuojavaltuutetun toimisto (vrt. Ruotsin malli) — edellyttäisi merkittävää resurssien lisäämistä." }
      ],
      agentComment: "HUOM: Valvontaviranomaisen valinta on keskeinen poliittinen päätös. Traficom-vaihtoehto perustuu olemassa olevaan digitaalisen infrastruktuurin valvontaosaamiseen. Ruotsin malli (tietosuojaviranomainen) on vaihtoehto. Sidosryhmäkuuleminen suositellaan.",
      status: "draft"
    },
    {
      id: "§5",
      number: "5 §",
      title: "AI-sääntelyhiekkalaatikko",
      content: "Kansallinen valvontaviranomainen voi perustaa tekoälyasetuksen 57 artiklan mukaisen AI-sääntelyhiekkalaatikon.",
      changes: [
        { type: "addition", text: "Hiekkalaatikkoon osallistuvat organisaatiot voivat kehittää ja testata tekoälyjärjestelmiä valvotussa ympäristössä enintään 24 kuukauden ajan." },
        { type: "addition", text: "Valvontaviranomainen asettaa kullekin hiekkalaatikkohankkeelle erilliset ehdot, mukaan lukien tietosuojavaatimukset, riskinhallintasuunnitelma ja säännöllinen raportointi." },
        { type: "addition", text: "Julkishallinnon viranomaisille varataan vuosittain vähintään 30 % hiekkalaatikkokapasiteetista." }
      ],
      agentComment: "Sandbox-malli Viron esimerkin mukaisesti. 30 % julkishallinnon kiintiö tukee VM:n AI-tuottavuustavoitteita. Aikaraja 24 kk tekoälyasetuksen mukaisesti.",
      status: "draft"
    },
    {
      id: "§6",
      number: "6 §",
      title: "Velvollisuudet julkishallinnossa",
      content: "Viranomaisen, joka ottaa käyttöön korkean riskin tekoälyjärjestelmän, on:",
      changes: [
        { type: "addition", text: "1) tehtävä vaikutusarviointi perusoikeuksiin tekoälyasetuksen 27 artiklan mukaisesti ennen järjestelmän käyttöönottoa;" },
        { type: "addition", text: "2) varmistettava, että tekoälyjärjestelmää käyttävällä virkamiehellä on riittävä AI-lukutaito tekoälyasetuksen 4 artiklan mukaisesti;" },
        { type: "addition", text: "3) järjestettävä ihmisen suorittama valvonta tekoälyasetuksen 14 artiklan mukaisesti;" },
        { type: "addition", text: "4) huolehdittava hallintolain 45 §:n mukaisen perusteluvelvollisuuden toteutumisesta silloinkin, kun päätös perustuu tekoälyjärjestelmän tuotokseen." }
      ],
      agentComment: "Yhdistää AI Act -vaatimukset ja kansallisen hallintolain perusteluvelvollisuuden. Kohta 4 on kriittinen: ratkaisee tunnistetun ristiriidan AI-järjestelmien selitettävyyden ja hallintolain vaatimusten välillä.",
      status: "draft"
    },
    {
      id: "§7",
      number: "7 §",
      title: "Seuraamukset",
      content: "Tekoälyasetuksen 99 artiklan mukaisia hallinnollisia seuraamuksia määrää kansallinen valvontaviranomainen.",
      changes: [
        { type: "addition", text: "Kiellettyjen käytäntöjen rikkomisesta voidaan määrätä hallinnollinen seuraamusmaksu, jonka enimmäismäärä on 35 000 000 euroa tai 7 % yrityksen edellisen tilikauden maailmanlaajuisesta vuotuisesta kokonaisliikevaihdosta sen mukaan, kumpi on suurempi." },
        { type: "addition", text: "Muiden velvoitteiden rikkomisesta voidaan määrätä hallinnollinen seuraamusmaksu, jonka enimmäismäärä on 15 000 000 euroa tai 3 % vuotuisesta kokonaisliikevaihdosta." },
        { type: "addition", text: "Viranomaisiin sovelletaan asetuksen mukaisesti lievempää seuraamusjärjestelmää: enimmäismaksu on 750 000 euroa." }
      ],
      agentComment: "Seuraamustasot suoraan AI Act art. 99 mukaisesti. Viranomaisten lievempi seuraamus poliittinen päätös — kannustaa julkishallinnon AI-innovaatioita.",
      status: "draft"
    },
    {
      id: "§8",
      number: "8 §",
      title: "Voimaantulo ja siirtymäsäännökset",
      content: "Tämä laki tulee voimaan päivänä kuuta 20 .",
      changes: [
        { type: "addition", text: "Lain 4 §:n mukainen valvontaviranomainen on nimettävä viimeistään 2.8.2025." },
        { type: "addition", text: "Korkean riskin tekoälyjärjestelmien käyttöönottajien on saatettava toimintansa lain mukaiseksi viimeistään 2.8.2027." },
        { type: "removal", text: "Mahdollinen siirtymäaika julkishallinnon järjestelmille: 2.8.2027 → 2.2.2028 (6 kk lisäaika) — edellyttää poliittista päätöstä." }
      ],
      agentComment: "Voimaantuloaikataulu noudattaa AI Actin portaittaista voimaantuloa. Julkishallinnon mahdollinen lisäsiirtymäaika tukee hallittua käyttöönottoa, mutta edellyttää linjapäätöstä.",
      status: "draft"
    }
  ],

  // ── Ristiriidat ────────────────────────────────────────────
  conflicts: [
    {
      id: "conflict-1",
      severity: "critical",
      title: "Tietosuojalaki vs. AI Act — Automaattinen päätöksenteko",
      source1: "Tietosuojalaki 21 § (GDPR art. 22)",
      source2: "AI Act art. 14 — Ihmisen suorittama valvonta",
      description: "Tietosuojalain/GDPR:n automaattisen päätöksenteon kielto (oikeus olla joutumatta pelkästään automaattisen päätöksenteon kohteeksi) on laajempi kuin AI Actin ihmisen valvonta -vaatimus. AI Act edellyttää ihmisen valvontaa, mutta ei kategorisesti kiellä automaattista päätöksentekoa.",
      recommendation: "Tarvitaan selkeä linjaus siitä, miten korkean riskin AI-järjestelmät voivat avustaa päätöksenteossa ilman, että rikotaan GDPR art. 22 kieltoa. Ehdotus: 6 §:n 3 kohdan \"ihmisen suorittama valvonta\" määritellään siten, että se täyttää myös GDPR:n vaatimukset.",
      relatedArticle: "§6"
    },
    {
      id: "conflict-2",
      severity: "critical",
      title: "Valvontaviranomaisten toimivaltapäällekkäisyys",
      source1: "Tietosuojavaltuutetun toimivaltuudet (TSL 14–19 §)",
      source2: "AI Act art. 70 — Kansallinen valvontaviranomainen",
      description: "AI-järjestelmien käsitellessä henkilötietoja syntyy väistämättä toimivaltapäällekkäisyys tietosuojavaltuutetun ja nimetyn AI-valvontaviranomaisen (Traficom) välille. Molemmat voivat vaatia tietoja, tehdä tarkastuksia ja määrätä seuraamuksia samoista järjestelmistä.",
      recommendation: "4 §:ään lisätty yhteistyövelvoite on välttämätön, mutta ei riittävä. Tarvitaan erillinen yhteistyösopimus (MoU) tai asetus viranomaisten välisestä tehtävänjaosta. Vrt. Ruotsin malli: selkeä vastuunjako sektoriviranomaisille.",
      relatedArticle: "§4"
    },
    {
      id: "conflict-3",
      severity: "significant",
      title: "Hallintolain perusteluvelvollisuus vs. AI-järjestelmien selitettävyys",
      source1: "Hallintolaki 45 § — Päätöksen perusteleminen",
      source2: "AI Act art. 13 — Läpinäkyvyys ja tietojen antaminen",
      description: "Hallintolaki edellyttää, että hallintopäätös perustellaan yksilöidysti ja riittävästi. Korkean riskin AI-järjestelmät, erityisesti syväoppimismallit, eivät välttämättä pysty tuottamaan hallintolain vaatimaa yksilöityä perustelua. AI Act art. 13 vaatii läpinäkyvyyttä, mutta ei edellytä täyttä selitettävyyttä yksittäisten päätösten tasolla.",
      recommendation: "6 §:n 4 kohdassa ratkaistaan viittaamalla hallintolain perusteluvelvollisuuteen. Lisäksi tarvittaneen VM:n ohjeistus siitä, millainen \"riittävä perustelu\" on AI-avusteisessa päätöksenteossa.",
      relatedArticle: "§6"
    },
    {
      id: "conflict-4",
      severity: "significant",
      title: "Tiedonhallintalaki vs. AI Act — Päällekkäiset automaation käsitteet",
      source1: "Tiedonhallintalaki 6 a § — Automaattinen päätöksenteko",
      source2: "AI Act art. 6–7 — Korkean riskin luokittelu",
      description: "Tiedonhallintalain automaattisen päätöksenteon käsite ei vastaa AI Actin korkean riskin luokittelua. Tiedonhallintalaki keskittyy prosessiin (automatisoitu ratkaisutoiminta), kun taas AI Act keskittyy teknologiaan ja sen riskeihin. Tämä voi johtaa tilanteeseen, jossa sama järjestelmä kuuluu eri sääntelykategoriaan eri lakien mukaan.",
      recommendation: "Määritelmien yhtenäistäminen 3 §:ssä tai erillinen soveltamisohje. Harkittava tiedonhallintalain 6 a §:n päivittämistä AI-terminologian mukaiseksi.",
      relatedArticle: "§3"
    },
    {
      id: "conflict-5",
      severity: "minor",
      title: "Sähköisen asioinnin laki — Vanhentunut automaation määritelmä",
      source1: "Laki sähköisestä asioinnista (13/2003) 4 §",
      source2: "AI Act art. 3 — Määritelmät",
      description: "Sähköisen asioinnin lain vuodelta 2003 oleva automaation käsitteistö ei tunne tekoälyjärjestelmiä, koneoppimismalleja tai generatiivista tekoälyä. Laki puhuu \"automaattisesta tietojenkäsittelystä\", mikä ei kata moderneja AI-järjestelmiä riittävällä tarkkuudella.",
      recommendation: "Pitkän aikavälin ratkaisu: sähköisen asioinnin lain kokonaisuudistus. Lyhyen aikavälin ratkaisu: tulkintaohje, joka rinnastaa AI-järjestelmät automaattiseen tietojenkäsittelyyn. Ei välitöntä lainsäädäntömuutostarvetta tässä vaiheessa.",
      relatedArticle: null
    }
  ],

  // ── Vaikutusarviodata ──────────────────────────────────────
  impact: {
    // Fiskaalinen vaikutus (milj. €)
    fiscal: {
      years: ["2026", "2027", "2028", "2029", "2030", "2031"],
      costs: [4.2, 8.5, 6.3, 5.1, 4.8, 4.5],
      savings: [0, 1.2, 3.8, 7.5, 12.1, 18.3],
      net: [-4.2, -7.3, -2.5, 2.4, 7.3, 13.8],
      costBreakdown: {
        "Valvontaviranomaisen perustaminen": [2.5, 3.2, 2.8, 2.6, 2.5, 2.5],
        "AI-osaamisohjelma": [1.0, 2.5, 1.5, 0.8, 0.5, 0.3],
        "IT-järjestelmät ja rekisterit": [0.5, 2.0, 1.2, 0.8, 0.6, 0.5],
        "Sääntelyhiekkalaatikko": [0.2, 0.8, 0.8, 0.9, 1.2, 1.2]
      }
    },

    // Sääntelytaakka sektoreittain (indeksi 0–100)
    regulatoryBurden: [
      { sector: "Rahoitus- ja vakuutusala", burden: 82, trend: "nouseva" },
      { sector: "Terveydenhuolto", burden: 78, trend: "nouseva" },
      { sector: "Julkishallinto", burden: 65, trend: "vakaa" },
      { sector: "Teollisuus ja valmistus", burden: 58, trend: "nouseva" },
      { sector: "Kauppa ja palvelut", burden: 42, trend: "vakaa" },
      { sector: "Koulutus ja tutkimus", burden: 35, trend: "laskeva" }
    ],

    // Sidosryhmäanalyysi (0–100 per akseli)
    stakeholders: {
      labels: [
        "Taloudellinen vaikutus",
        "Hallinnollinen taakka",
        "Innovaatiovaikutus",
        "Perusoikeudet",
        "Kilpailukyky",
        "Julkinen luottamus"
      ],
      groups: [
        {
          name: "Yritykset",
          values: [72, 68, 55, 40, 62, 50],
          color: "#ffe100"
        },
        {
          name: "Julkishallinto",
          values: [58, 75, 65, 70, 45, 72],
          color: "#22c55e"
        },
        {
          name: "Kansalaiset",
          values: [30, 15, 35, 85, 40, 80],
          color: "#f59e0b"
        }
      ]
    },

    // EU-yhteensopivuusaikajana
    timeline: [
      { date: "2.2.2025", event: "Kielletyt käytännöt voimaan", status: "done" },
      { date: "2.8.2025", event: "Kansallinen valvontaviranomainen nimettävä", status: "overdue" },
      { date: "2.2.2026", event: "GPAI-mallien velvoitteet voimaan", status: "current" },
      { date: "2.8.2026", event: "Kansallinen täytäntöönpanolaki voimaan", status: "upcoming" },
      { date: "2.8.2027", event: "Korkean riskin velvoitteet täysimääräisesti", status: "upcoming" }
    ]
  },

  // ── Vanhenemismonitori ──────────────────────────────────────
  freshness: [
    {
      id: "fresh-1",
      source: "EU AI Act (2024/1689)",
      lastChecked: "2026-02-20",
      lastUpdated: "2024-06-13",
      status: "green",
      note: "Asetus vakaa. Delegoidut asetukset vielä tulossa."
    },
    {
      id: "fresh-2",
      source: "AI Office — Kielletyt käytännöt -ohjeistus",
      lastChecked: "2026-02-20",
      lastUpdated: "2025-02-04",
      status: "green",
      note: "Ensimmäinen versio, ei päivityksiä."
    },
    {
      id: "fresh-3",
      source: "CEN/CENELEC harmonisoidut standardit",
      lastChecked: "2026-02-20",
      lastUpdated: "2025-12-01",
      status: "yellow",
      note: "Standardiluonnos päivitetty 1.12.2025. Viimeinen tarkistus koskee risk management -osiota.",
      alert: "Uusi luonnosversio julkaistu — tarkista vaikutukset pykäliin 3 § ja 6 §."
    },
    {
      id: "fresh-4",
      source: "Viron AI-kehys",
      lastChecked: "2026-02-20",
      lastUpdated: "2026-01-15",
      status: "yellow",
      note: "Viro päivittänyt sandbox-ehtoja tammikuussa 2026.",
      alert: "Päivitetty sandbox-malli — vertaa 5 §:n sääntelyhiekkalaatikkoon."
    },
    {
      id: "fresh-5",
      source: "Tietosuojalaki (1050/2018)",
      lastChecked: "2026-02-20",
      lastUpdated: "2018-12-05",
      status: "green",
      note: "Ei muutoksia."
    },
    {
      id: "fresh-6",
      source: "Tiedonhallintalaki (906/2019)",
      lastChecked: "2026-02-20",
      lastUpdated: "2025-08-01",
      status: "yellow",
      note: "6 a §:n päivitys automaattisesta päätöksenteosta tuli voimaan 1.8.2025.",
      alert: "Tiedonhallintalain 6 a § päivitetty — tarkista yhteensopivuus 3 § määritelmien kanssa."
    },
    {
      id: "fresh-7",
      source: "Conformity Assessment -delegoitu asetus",
      lastChecked: "2026-02-20",
      lastUpdated: "2026-02-10",
      status: "red",
      note: "Komission uusi luonnosversio 10.2.2026 sisältää merkittäviä muutoksia ilmoitettujen laitosten vaatimuksiin.",
      alert: "KRIITTINEN: Conformity Assessment -asetusluonnos muuttunut merkittävästi — vaikuttaa suoraan markkinavalvonnan järjestämiseen (4 §)."
    },
    {
      id: "fresh-8",
      source: "UK AI Safety Institute -kehys",
      lastChecked: "2026-02-20",
      lastUpdated: "2025-04-20",
      status: "green",
      note: "Ei oleellisia päivityksiä."
    }
  ],

  // ── Agenttien työnkulkuviestit ─────────────────────────────
  workflow: {
    sourcesPhase: [
      { agent: "va", type: "thinking", text: "Analysoin EU AI Act -asetuksen ja tunnistan relevanteimmat artiklat kansallista täytäntöönpanoa varten..." },
      { agent: "va", type: "message", text: "EU AI Act (2024/1689) tunnistettu pääasialliseksi lähteeksi. Relevanttius: 98 %. Analysoin artiklat 5, 6–7, 26, 64, 70 ja 99." },
      { agent: "va", type: "source", sourceId: "eu-1" },
      { agent: "va", type: "thinking", text: "Haen EU AI Office -ohjeistuksia ja standardiluonnoksia..." },
      { agent: "va", type: "message", text: "AI Office julkaissut ohjeistuksen kielletyistä käytännöistä (4.2.2025). CEN/CENELEC-standardit luonnosvaiheessa." },
      { agent: "va", type: "source", sourceId: "eu-2" },
      { agent: "va", type: "source", sourceId: "eu-3" },
      { agent: "va", type: "source", sourceId: "eu-4" },
      { agent: "va", type: "thinking", text: "Kartoitan kansainväliset vertailukohteet: Viro, Ruotsi, Iso-Britannia..." },
      { agent: "va", type: "message", text: "Kolme relevanttia vertailumaata tunnistettu. Viron sandbox-malli ja Ruotsin viranomaismalli erityisen hyödyllisiä." },
      { agent: "va", type: "source", sourceId: "int-1" },
      { agent: "va", type: "source", sourceId: "int-2" },
      { agent: "va", type: "source", sourceId: "int-3" },
      { agent: "va", type: "thinking", text: "Analysoin kotimaisen lainsäädäntöpohjan ja tunnistan mahdolliset ristiriidat..." },
      { agent: "va", type: "message", text: "Viisi kotimaista lähdettä tunnistettu. Tietosuojalaki ja tiedonhallintalaki ovat kriittisimmät yhteensovittamistarpeet." },
      { agent: "va", type: "source", sourceId: "dom-1" },
      { agent: "va", type: "source", sourceId: "dom-2" },
      { agent: "va", type: "source", sourceId: "dom-3" },
      { agent: "va", type: "source", sourceId: "dom-4" },
      { agent: "va", type: "source", sourceId: "dom-5" },
      { agent: "va", type: "message", text: "Lähdeanalyysi valmis. Yhteensä 12 lähdettä kerätty ja analysoitu. Siirryn ristiriita-analyysiin." }
    ],

    conflictsPhase: [
      { agent: "va", type: "thinking", text: "Suoritan ristiintarkistuksen kaikkien tunnistettujen lähteiden välillä..." },
      { agent: "va", type: "message", text: "Tunnistettu 5 ristiriitaa. Luokittelen vakavuuden mukaan: 2 kriittistä, 2 merkittävää, 1 lievä." },
      { agent: "va", type: "conflict", conflictId: "conflict-1" },
      { agent: "va", type: "conflict", conflictId: "conflict-2" },
      { agent: "va", type: "thinking", text: "Analysoin merkittävät ristiriidat..." },
      { agent: "va", type: "conflict", conflictId: "conflict-3" },
      { agent: "va", type: "conflict", conflictId: "conflict-4" },
      { agent: "va", type: "conflict", conflictId: "conflict-5" },
      { agent: "va", type: "message", text: "Ristiriita-analyysi valmis. Kriittisimmät ristiriidat koskevat automaattista päätöksentekoa ja valvontaviranomaisten toimivaltajakoa. Siirryn säädösluonnoksen valmisteluun." }
    ],

    draftPhase: [
      { agent: "va", type: "thinking", text: "Luonnostelen 8 pykälää huomioiden tunnistetut ristiriidat ja kansainväliset vertailut..." },
      { agent: "va", type: "message", text: "Säädösluonnos valmis. 8 pykälää muutosseurannalla. Erityishuomiot: valvontaviranomaisen valinta (4 §), sandbox-malli (5 §) ja perusteluvelvollisuus (6 §)." },
      { agent: "va", type: "articles", articleIds: ["§1", "§2", "§3", "§4", "§5", "§6", "§7", "§8"] },
      { agent: "va", type: "message", text: "Valmisteluagentin analyysi valmis. Siirrän työnkulun Vaikutusarvioagentille." }
    ],

    handoff: {
      from: "va",
      to: "vaa",
      message: "Valmisteluagentti → Vaikutusarvioagentti: Säädösluonnos ja lähdeanalyysi valmis. Pyydän fiskaalista vaikutusarviota, sääntelytaakka-analyysiä ja sidosryhmäarviointia."
    },

    impactPhase: [
      { agent: "vaa", type: "thinking", text: "Vastaanotan valmisteluagentin tuotokset. Aloitan fiskaalisen vaikutusarvioinnin..." },
      { agent: "vaa", type: "message", text: "Fiskaalinen arvio: Kokonaiskustannukset 2026–2031 yhteensä 33,4 milj. €. Arvioidut säästöt nousevat 18,3 milj. €:oon vuoteen 2031 mennessä. Nettovaikutus kääntyy positiiviseksi vuonna 2029." },
      { agent: "vaa", type: "chart", chartId: "fiscal" },
      { agent: "vaa", type: "thinking", text: "Arvioin sääntelytaakkaa sektoreittain..." },
      { agent: "vaa", type: "message", text: "Suurin sääntelytaakka kohdistuu rahoitus- ja vakuutusalaan (82/100) sekä terveydenhuoltoon (78/100). Julkishallinnon taakka maltillinen (65/100) olemassa olevien prosessien ansiosta." },
      { agent: "vaa", type: "chart", chartId: "burden" },
      { agent: "vaa", type: "thinking", text: "Suoritan sidosryhmäanalyysin kolmelle pääryhmälle..." },
      { agent: "vaa", type: "message", text: "Sidosryhmäanalyysi valmis. Kansalaisten osalta perusoikeusvaikutus on merkittävin (85/100). Yritysten suurin huoli on hallinnollinen taakka (68/100). Julkishallinnossa korostuu julkisen luottamuksen vahvistaminen (72/100)." },
      { agent: "vaa", type: "chart", chartId: "stakeholders" },
      { agent: "vaa", type: "thinking", text: "Tarkistan EU-yhteensopivuusaikataulun..." },
      { agent: "vaa", type: "message", text: "HUOMIO: Kansallisen valvontaviranomaisen nimeäminen myöhässä (deadline 2.8.2025). GPAI-velvoitteet tulevat voimaan 2.2.2026. Kansallisen lain tulee olla voimassa viimeistään 2.8.2026." },
      { agent: "vaa", type: "chart", chartId: "timeline" },
      { agent: "vaa", type: "message", text: "Vaikutusarviointi valmis. Kaikki analyysit käytettävissä välilehdillä." }
    ],

    handoff2: {
      from: "vaa",
      to: "vam",
      message: "Vaikutusarvioagentti → Vanhenemismonitoriagentti: Vaikutusarvio valmis. Pyydän lähteiden tuoreustarkistusta ja muutosvaikutusten arviointia."
    },

    freshnessPhase: [
      { agent: "vam", type: "thinking", text: "Vastaanotan analysoidut lähteet. Aloitan tuoreustarkistuksen..." },
      { agent: "vam", type: "message", text: "Tarkistan 8 lähteen tuoreustilan. Vertaan viimeisimpiä päivityksiä ja tunnistan muutokset." },
      { agent: "vam", type: "freshness", freshnessId: "fresh-1" },
      { agent: "vam", type: "freshness", freshnessId: "fresh-2" },
      { agent: "vam", type: "freshness", freshnessId: "fresh-3" },
      { agent: "vam", type: "freshness", freshnessId: "fresh-4" },
      { agent: "vam", type: "freshness", freshnessId: "fresh-5" },
      { agent: "vam", type: "freshness", freshnessId: "fresh-6" },
      { agent: "vam", type: "freshness", freshnessId: "fresh-7" },
      { agent: "vam", type: "freshness", freshnessId: "fresh-8" },
      { agent: "vam", type: "thinking", text: "Analysoin tunnistetut muutokset ja arvioin vaikutukset säädösluonnokseen..." },
      { agent: "vam", type: "message", text: "Tuoreustarkistus valmis. 1 kriittinen havainto, 3 huomioitavaa ja 4 ajantasaista lähdettä. Conformity Assessment -asetusluonnos vaatii välitöntä huomiota." }
    ]
  },

  // ── Puheselostuksen monikieliset viestit ──────────────────
  speech: {
    phases: {
      sources:  { fi: "Aloitan lähteiden analyysin.",           en: "Starting source analysis.",             sv: "Startar källanalys." },
      conflicts:{ fi: "Siirryn ristiriita-analyysiin.",         en: "Moving to conflict analysis.",           sv: "Går vidare till konfliktanalys." },
      draft:    { fi: "Aloitan säädösluonnoksen valmistelun.",  en: "Starting the legislative draft.",        sv: "Påbörjar lagförslaget." },
      impact:   { fi: "Aloitan vaikutusarvioinnin.",            en: "Starting impact assessment.",            sv: "Startar konsekvensbedömning." },
      complete: { fi: "Kaikki analyysit ovat valmiit.",         en: "All analyses are complete.",             sv: "Alla analyser är klara." },
      freshness:{ fi: "Aloitan lähteiden tuoreustarkistuksen.", en: "Starting source freshness check.",       sv: "Startar källornas aktualitetskontroll." }
    },

    handoff: {
      fi: "Siirrän työnkulun vaikutusarvioagentille.",
      en: "Handing off to the impact assessment agent.",
      sv: "Överlämnar till konsekvensbedömningsagenten."
    },

    // Avain = alkuperäinen suomenkielinen teksti workflow-stepistä → lyhyempi puhuttu versio per kieli
    messages: {
      // ── sourcesPhase — thinking ──
      "Analysoin EU AI Act -asetuksen ja tunnistan relevanteimmat artiklat kansallista täytäntöönpanoa varten...": {
        fi: "Analysoin EU AI Act -asetusta.",
        en: "Analyzing the EU AI Act.",
        sv: "Analyserar EU AI Act."
      },
      "Haen EU AI Office -ohjeistuksia ja standardiluonnoksia...": {
        fi: "Haen ohjeistuksia ja standardeja.",
        en: "Searching for guidelines and standards.",
        sv: "Söker riktlinjer och standarder."
      },
      "Kartoitan kansainväliset vertailukohteet: Viro, Ruotsi, Iso-Britannia...": {
        fi: "Kartoitan kansainväliset vertailut.",
        en: "Mapping international comparisons.",
        sv: "Kartlägger internationella jämförelser."
      },
      "Analysoin kotimaisen lainsäädäntöpohjan ja tunnistan mahdolliset ristiriidat...": {
        fi: "Analysoin kotimaista lainsäädäntöä.",
        en: "Analyzing domestic legislation.",
        sv: "Analyserar inhemsk lagstiftning."
      },
      // ── sourcesPhase — message ──
      "EU AI Act (2024/1689) tunnistettu pääasialliseksi lähteeksi. Relevanttius: 98 %. Analysoin artiklat 5, 6–7, 26, 64, 70 ja 99.": {
        fi: "EU AI Act tunnistettu pääasialliseksi lähteeksi.",
        en: "EU AI Act identified as the primary source.",
        sv: "EU AI Act identifierad som huvudkälla."
      },
      "AI Office julkaissut ohjeistuksen kielletyistä käytännöistä (4.2.2025). CEN/CENELEC-standardit luonnosvaiheessa.": {
        fi: "AI-toimiston ohjeistus ja standardiluonnokset löydetty.",
        en: "AI Office guidelines and draft standards found.",
        sv: "AI-kontorets riktlinjer och standardutkast hittade."
      },
      "Kolme relevanttia vertailumaata tunnistettu. Viron sandbox-malli ja Ruotsin viranomaismalli erityisen hyödyllisiä.": {
        fi: "Kolme vertailumaata tunnistettu.",
        en: "Three comparison countries identified.",
        sv: "Tre jämförelseländer identifierade."
      },
      "Viisi kotimaista lähdettä tunnistettu. Tietosuojalaki ja tiedonhallintalaki ovat kriittisimmät yhteensovittamistarpeet.": {
        fi: "Viisi kotimaista lähdettä tunnistettu.",
        en: "Five domestic sources identified.",
        sv: "Fem inhemska källor identifierade."
      },
      "Lähdeanalyysi valmis. Yhteensä 12 lähdettä kerätty ja analysoitu. Siirryn ristiriita-analyysiin.": {
        fi: "Lähdeanalyysi valmis, kaksitoista lähdettä analysoitu.",
        en: "Source analysis complete, twelve sources analyzed.",
        sv: "Källanalys klar, tolv källor analyserade."
      },
      // ── conflictsPhase — thinking ──
      "Suoritan ristiintarkistuksen kaikkien tunnistettujen lähteiden välillä...": {
        fi: "Tarkistan lähteiden ristiriidat.",
        en: "Checking sources for conflicts.",
        sv: "Kontrollerar konflikter mellan källor."
      },
      "Analysoin merkittävät ristiriidat...": {
        fi: "Analysoin merkittävät ristiriidat.",
        en: "Analyzing significant conflicts.",
        sv: "Analyserar betydande konflikter."
      },
      // ── conflictsPhase — message ──
      "Tunnistettu 5 ristiriitaa. Luokittelen vakavuuden mukaan: 2 kriittistä, 2 merkittävää, 1 lievä.": {
        fi: "Viisi ristiriitaa tunnistettu.",
        en: "Five conflicts identified.",
        sv: "Fem konflikter identifierade."
      },
      "Ristiriita-analyysi valmis. Kriittisimmät ristiriidat koskevat automaattista päätöksentekoa ja valvontaviranomaisten toimivaltajakoa. Siirryn säädösluonnoksen valmisteluun.": {
        fi: "Ristiriita-analyysi valmis.",
        en: "Conflict analysis complete.",
        sv: "Konfliktanalys klar."
      },
      // ── draftPhase — thinking ──
      "Luonnostelen 8 pykälää huomioiden tunnistetut ristiriidat ja kansainväliset vertailut...": {
        fi: "Luonnostelen säädöspykälät.",
        en: "Drafting legislative articles.",
        sv: "Utarbetar lagparagrafer."
      },
      // ── draftPhase — message ──
      "Säädösluonnos valmis. 8 pykälää muutosseurannalla. Erityishuomiot: valvontaviranomaisen valinta (4 §), sandbox-malli (5 §) ja perusteluvelvollisuus (6 §).": {
        fi: "Säädösluonnos valmis, kahdeksan pykälää.",
        en: "Legislative draft complete, eight articles.",
        sv: "Lagförslag klart, åtta paragrafer."
      },
      "Valmisteluagentin analyysi valmis. Siirrän työnkulun Vaikutusarvioagentille.": {
        fi: "Siirrän työn vaikutusarvioagentille.",
        en: "Handing off to impact assessment agent.",
        sv: "Överlämnar till konsekvensbedömningsagenten."
      },
      // ── impactPhase — thinking ──
      "Vastaanotan valmisteluagentin tuotokset. Aloitan fiskaalisen vaikutusarvioinnin...": {
        fi: "Aloitan fiskaalisen arvioinnin.",
        en: "Starting fiscal assessment.",
        sv: "Påbörjar fiskal bedömning."
      },
      "Arvioin sääntelytaakkaa sektoreittain...": {
        fi: "Arvioin sääntelytaakkaa.",
        en: "Assessing regulatory burden.",
        sv: "Bedömer regelbördan."
      },
      "Suoritan sidosryhmäanalyysin kolmelle pääryhmälle...": {
        fi: "Analysoin sidosryhmävaikutukset.",
        en: "Analyzing stakeholder impacts.",
        sv: "Analyserar intressentpåverkan."
      },
      "Tarkistan EU-yhteensopivuusaikataulun...": {
        fi: "Tarkistan EU-aikataulun.",
        en: "Checking EU compliance timeline.",
        sv: "Kontrollerar EU-tidslinjen."
      },
      // ── impactPhase — message ──
      "Fiskaalinen arvio: Kokonaiskustannukset 2026–2031 yhteensä 33,4 milj. €. Arvioidut säästöt nousevat 18,3 milj. €:oon vuoteen 2031 mennessä. Nettovaikutus kääntyy positiiviseksi vuonna 2029.": {
        fi: "Fiskaalinen arvio valmis. Nettovaikutus positiivinen vuodesta 2029.",
        en: "Fiscal assessment complete. Net impact positive from 2029.",
        sv: "Fiskal bedömning klar. Nettoeffekt positiv från 2029."
      },
      "Suurin sääntelytaakka kohdistuu rahoitus- ja vakuutusalaan (82/100) sekä terveydenhuoltoon (78/100). Julkishallinnon taakka maltillinen (65/100) olemassa olevien prosessien ansiosta.": {
        fi: "Suurin sääntelytaakka rahoitus- ja terveydenhuoltoalalla.",
        en: "Highest regulatory burden in finance and healthcare.",
        sv: "Störst regelbörda inom finans och hälsovård."
      },
      "Sidosryhmäanalyysi valmis. Kansalaisten osalta perusoikeusvaikutus on merkittävin (85/100). Yritysten suurin huoli on hallinnollinen taakka (68/100). Julkishallinnossa korostuu julkisen luottamuksen vahvistaminen (72/100).": {
        fi: "Sidosryhmäanalyysi valmis.",
        en: "Stakeholder analysis complete.",
        sv: "Intressentanalys klar."
      },
      "HUOMIO: Kansallisen valvontaviranomaisen nimeäminen myöhässä (deadline 2.8.2025). GPAI-velvoitteet tulevat voimaan 2.2.2026. Kansallisen lain tulee olla voimassa viimeistään 2.8.2026.": {
        fi: "Huomio: valvontaviranomaisen nimeäminen on myöhässä.",
        en: "Warning: supervisory authority designation is overdue.",
        sv: "Varning: tillsynsmyndighetens utnämning är försenad."
      },
      "Vaikutusarviointi valmis. Kaikki analyysit käytettävissä välilehdillä.": {
        fi: "Vaikutusarviointi valmis.",
        en: "Impact assessment complete.",
        sv: "Konsekvensbedömning klar."
      },
      // ── handoff messages ──
      "Valmisteluagentti → Vaikutusarvioagentti: Säädösluonnos ja lähdeanalyysi valmis. Pyydän fiskaalista vaikutusarviota, sääntelytaakka-analyysiä ja sidosryhmäarviointia.": {
        fi: "Siirrän työnkulun vaikutusarvioagentille.",
        en: "Handing off to the impact assessment agent.",
        sv: "Överlämnar till konsekvensbedömningsagenten."
      },
      "Vaikutusarvioagentti → Vanhenemismonitoriagentti: Vaikutusarvio valmis. Pyydän lähteiden tuoreustarkistusta ja muutosvaikutusten arviointia.": {
        fi: "Siirrän työnkulun vanhenemismonitorille.",
        en: "Handing off to the freshness monitor.",
        sv: "Överlämnar till aktualitetsmonitorn."
      },
      // ── freshnessPhase — thinking ──
      "Vastaanotan analysoidut lähteet. Aloitan tuoreustarkistuksen...": {
        fi: "Aloitan tuoreustarkistuksen.",
        en: "Starting freshness check.",
        sv: "Startar aktualitetskontroll."
      },
      "Analysoin tunnistetut muutokset ja arvioin vaikutukset säädösluonnokseen...": {
        fi: "Arvioin muutosten vaikutukset.",
        en: "Assessing impact of changes.",
        sv: "Bedömer förändringarnas påverkan."
      },
      // ── freshnessPhase — message ──
      "Tarkistan 8 lähteen tuoreustilan. Vertaan viimeisimpiä päivityksiä ja tunnistan muutokset.": {
        fi: "Tarkistan kahdeksan lähteen tuoreuden.",
        en: "Checking freshness of eight sources.",
        sv: "Kontrollerar åtta källors aktualitet."
      },
      "Tuoreustarkistus valmis. 1 kriittinen havainto, 3 huomioitavaa ja 4 ajantasaista lähdettä. Conformity Assessment -asetusluonnos vaatii välitöntä huomiota.": {
        fi: "Tuoreustarkistus valmis. Yksi kriittinen havainto.",
        en: "Freshness check complete. One critical finding.",
        sv: "Aktualitetskontroll klar. En kritisk observation."
      }
    },

    intro: {
      fi: "Tämä demo havainnollistaa, miten tekoälyagentit voivat tukea säädösvalmistelua. Valmisteluagentti kerää lähteet, tunnistaa ristiriidat ja tuottaa säädösluonnoksen. Vaikutusarvioagentti analysoi fiskaaliset vaikutukset ja sääntelytaakan. Vanhenemismonitoriagentti seuraa lähteiden tuoreutta. Paina aloita analyysi käynnistääksesi agentit.",
      en: "This demo shows how AI agents can support legislative preparation. The preparation agent collects sources, identifies conflicts, and produces a legislative draft. The impact assessment agent analyzes fiscal effects and regulatory burden. The freshness monitor tracks source currency. Press start analysis to launch the agents.",
      sv: "Denna demo visar hur AI-agenter kan stödja lagberedning. Beredningsagenten samlar källor, identifierar konflikter och producerar ett lagförslag. Konsekvensbedömningsagenten analyserar fiskala effekter och regelbörda. Aktualitetsmonitorn spårar källornas aktualitet. Tryck starta analys för att köra agenterna."
    },

    ui: {
      speechLabel:  { fi: "Puheselostus",    en: "Narration",       sv: "Berättarröst" },
      speechOn:     { fi: "Päällä",          en: "On",              sv: "På" },
      speechOff:    { fi: "Pois päältä",     en: "Off",             sv: "Av" },
      langLabel:    { fi: "Puheen kieli",    en: "Speech language", sv: "Röstens språk" },
      volumeLabel:  { fi: "Äänenvoimakkuus", en: "Volume",          sv: "Volym" },
      rateLabel:    { fi: "Puhenopeus",      en: "Speech rate",     sv: "Talhastighet" }
    }
  }
};
