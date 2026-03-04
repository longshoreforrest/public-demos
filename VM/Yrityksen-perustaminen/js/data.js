// ============================================
// DATA - Finnish content & process data
// ============================================

export const PROCESS_DATA = {
  oldWorld: {
    phases: [
      {
        id: 1,
        title: 'PRH-rekisteröinti',
        duration: '2–3 viikkoa',
        hours: 30,
        documents: [
          'Perustamisilmoitus Y1',
          'Yhtiöjärjestys',
          'Osakassopimus',
          'Perustamiskokouksen pöytäkirja',
          'Hallituksen kokouksen pöytäkirja',
          'Osakkeiden merkintälista'
        ],
        painPoints: [
          'Lomakkeiden täyttäminen vaatii erityisosaamista',
          'Ohjeistukset hajallaan eri lähteissä',
          'Käsittelyaika vaihtelee'
        ],
        stamp: 'TÄYDENNETTÄVÄ'
      },
      {
        id: 2,
        title: 'Verorekisterit',
        duration: '1–2 viikkoa',
        hours: 25,
        registers: [
          'ALV-rekisteri',
          'Ennakkoperintärekisteri',
          'Työnantajarekisteri'
        ],
        painPoints: [
          'Kolme erillistä rekisteriä, omat vaatimuksensa',
          'Tietojen yhdenmukaistaminen vaatii tarkkuutta',
          'Käsittelyajat vaihtelevat rekistereittäin'
        ]
      },
      {
        id: 3,
        title: 'Pankkitili & KYC',
        duration: '1–4 viikkoa',
        hours: 35,
        requirements: [
          'Vahva tunnistautuminen',
          'Omistajaselvitys (UBO)',
          'Liiketoimintasuunnitelma',
          'Rahojen alkuperäselvitys',
          'Toimialakohtaiset lisäselvitykset'
        ],
        painPoints: [
          'Lisäselvityksiä voidaan pyytää useaan kertaan',
          'Dokumenttien toimittaminen usein manuaalista',
          'Käsittelyaika voi venyä viikkoihin'
        ],
        stamp: 'LISÄSELVITYS'
      },
      {
        id: 4,
        title: 'YEL-vakuutus',
        duration: '1–2 viikkoa',
        hours: 20,
        painPoints: [
          'Työtulo pitää arvioida ennen kuin tulot ovat tiedossa',
          'Laskentakaava vaatii perehtymistä',
          'Aliarviointi voi johtaa pienempään eläkkeeseen',
          'Yliarviointi voi johtaa tarpeettoman suuriin maksuihin'
        ],
        catch22: {
          left: 'Tarvitset työtulon →',
          right: '← Et tiedä tulojasi'
        }
      },
      {
        id: 5,
        title: 'Lopputulos',
        duration: 'Yhteensä: 6 viikkoa',
        totalHours: 137,
        totalWeeks: 6,
        nationalMultiplier: 35000,
        nationalHours: 3500000
      }
    ]
  },

  newWorld: {
    agents: [
      {
        id: 'foundation',
        name: 'Perustamisagentti',
        color: 'blue',
        description: 'PRH, yhtiöjärjestys, osakkeet',
        tasks: [
          'Yhtiöjärjestyksen generointi',
          'Y1-lomakkeen täyttö',
          'Osakassopimusten luonti',
          'PRH-ilmoituksen lähetys',
          'Y-tunnuksen vastaanotto'
        ]
      },
      {
        id: 'authority',
        name: 'Viranomaisagentti',
        color: 'green',
        description: 'Vero, ALV, ennakkoperintä',
        tasks: [
          'ALV-rekisteröinti',
          'Ennakkoperintärekisteri',
          'Työnantajarekisteri',
          'Verokortin generointi',
          'Vahvistuksen vastaanotto'
        ]
      },
      {
        id: 'finance',
        name: 'Rahoitusagentti',
        color: 'purple',
        description: 'Pankki, YEL, KYC',
        tasks: [
          'KYC-dokumenttien kokoaminen',
          'Pankkitilin avaaminen',
          'YEL-työtulon laskenta',
          'Vakuutuksen aktivointi',
          'Maksuvälineiden tilaus'
        ]
      }
    ],
    chatMessages: [
      {
        type: 'user',
        text: 'Haluan perustaa teknologia-konsultointiyrityksen. Olen ainoa osakas.'
      },
      {
        type: 'agent',
        text: 'Ymmärretty! Perustan Oy:n yhdelle osakkaalle, konsultointi-toimialalla. Käynnistän kolme agenttia rinnakkain...'
      },
      {
        type: 'agent',
        text: '🔵 Perustamisagentti: Generoin yhtiöjärjestyksen ja täytän Y1-lomakkeen...'
      },
      {
        type: 'agent',
        text: '🟢 Viranomaisagentti: Rekisteröin ALV:iin ja ennakkoperintään...'
      },
      {
        type: 'agent',
        text: '🟣 Rahoitusagentti: Avaan yritystilin ja lasken YEL-työtulon...'
      },
      {
        type: 'agent',
        text: '✅ Kaikki valmis! Y-tunnus: 1234567-8, pankkitili: FI12 3456 7890 0001 23, YEL aktiivinen.'
      }
    ],
    result: {
      items: [
        { label: 'Y-tunnus', detail: '1234567-8' },
        { label: 'Verorekisterit', detail: 'ALV, EP, TA' },
        { label: 'Pankkitili', detail: 'FI12 3456 7890' },
        { label: 'YEL-vakuutus', detail: 'Aktiivinen' }
      ],
      timeMinutes: 4
    },
    impact: {
      hoursSaved: 3000000,
      personYears: 1750,
      euroValue: '87,5 M€'
    }
  },

  businessCase: {
    numbers: [
      { target: 35000, suffix: '', label: 'uutta yritystä / vuosi' },
      { target: 100, suffix: ' h', label: 'hallinnollista työtä / perustaja' },
      { target: 3500000, suffix: ' h', label: 'hallinnollista työtä / vuosi' },
      { target: 6, suffix: ' vk', label: 'keskimääräinen kesto' }
    ],
    comparison: [
      { label: 'Kesto', old: '6 viikkoa', new: '4 minuuttia', oldWidth: 95, newWidth: 5 },
      { label: 'Lomakkeet', old: '15+ käsin', new: '0 käsin', oldWidth: 80, newWidth: 8 },
      { label: 'Virheet', old: '~40%', new: '~0%', oldWidth: 60, newWidth: 3 },
      { label: 'Kustannus', old: '2 000–5 000€', new: '~50€', oldWidth: 70, newWidth: 10 }
    ]
  }
};

export const YEL_CALC = {
  minIncome: 8575.45,
  maxIncome: 194750,
  rate: 0.2432, // 24.32% vuonna 2024
  reducedRate: 0.1783, // alennettu maksu
  reducedYears: 4
};
