# Säädösvalmistelun AI-agentti — Järjestelmädokumentaatio

## 1. Yleiskuvaus

**Säädösvalmistelun AI-agentti** on Valtiovarainministeriön (VM) demosovellus, joka havainnollistaa tekoälyagenttien hyödyntämistä säädösvalmistelussa. Sovellus simuloi kolmen erikoistuneen AI-agentin yhteistyötä EU AI Act -asetuksen kansallisen täytäntöönpanon valmisteluprosessissa.

Sovellus on toteutettu puhtaasti selainpohjaisena (vanilla HTML/CSS/JS) ilman build-työkaluja tai palvelinriippuvuuksia. Ainoa ulkoinen riippuvuus on Chart.js-kirjasto (CDN).

### Ominaisuudet

- Kolmen AI-agentin simuloitu yhteistyö kirjoitusanimaatiolla
- 5-vaiheinen työnkulku: lähteet → ristiriidat → luonnos → vaikutusarvio → vanhenemismonitori
- Puheselostus kolmella kielellä (fi/en/sv) Web Speech API:lla
- Chart.js-visualisoinnit: fiskaalinen vaikutus, sääntelytaakka, sidosryhmäanalyysi
- Interaktiivinen säädösluonnos muutosseurannalla ja hyväksy/hylkää-toiminnoilla
- Responsiivinen layout mobiilinäkymällä
- Glassmorphism-tyylinen vaalea teema VM:n brändiväreillä

---

## 2. Tiedostorakenne

```
Valmistelu-agentti/
├── index.html     — HTML-rakenne (sidebar, tabit, paneelit)
├── style.css      — Tyylitiedosto (CSS-muuttujat, glassmorphism, responsiivisuus)
├── data.js        — Kaikki sisältödata ja monikieliset viestit
├── agents.js      — AgentEngine: simulaatiomoottori ja tilakone
├── charts.js      — ChartManager: Chart.js-visualisoinnit
└── app.js         — Pääkontrolleri: SpeechManager, UI-logiikka, callback-kytkentä
```

### Latausjärjestys (index.html)

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script src="data.js"></script>
<script src="agents.js"></script>
<script src="charts.js"></script>
<script src="app.js"></script>
```

`data.js` ja `agents.js` eivät riipu toisistaan suoraan — data on globaali `DATA`-objekti ja engine on `AgentEngine`-luokka. `app.js` kytkee kaiken yhteen.

---

## 3. Arkkitehtuuri

### 3.1 Kerrosrakenne

```
┌─────────────────────────────────────────────────┐
│                   index.html                     │
│            HTML-rakenne ja DOM-elementit          │
├─────────────────────────────────────────────────┤
│                    app.js                        │
│  Pääkontrolleri: UI-logiikka, callback-kytkentä  │
│  SpeechManager, tabit, stepper, painikkeet        │
├────────────┬──────────────┬─────────────────────┤
│ agents.js  │  charts.js   │      style.css       │
│ AgentEngine│ ChartManager │  Visuaalinen ilme    │
│ Tilakone   │ 4 kaaviota   │  Glassmorphism       │
├────────────┴──────────────┴─────────────────────┤
│                   data.js                        │
│     DATA-objekti: kaikki sisältö ja viestit      │
└─────────────────────────────────────────────────┘
```

### 3.2 Callback-pohjainen arkkitehtuuri

`AgentEngine` (agents.js) ei manipuloi DOM:ia suoraan. Se tarjoaa callback-hookit, jotka `app.js` kytkee:

| Callback | Kuvaus |
|----------|--------|
| `onPhaseChange(phase)` | Vaiheen vaihto — päivittää stepper ja piilottaa empty state |
| `onTabSwitch(tabId)` | Vaihtaa aktiivisen välilehden |
| `onAgentState(agentId, state)` | Päivittää agentin tilan sidebarissa (idle/working/done) |
| `onLogEntry(agentId, text)` | Lisää merkinnän agenttilokiin |
| `onSpeak(text, agentId, eventType)` | Puheselostustapahtuma |
| `onSourceReveal(sourceId)` | Paljastaa lähdekortin progressiivisesti |
| `onConflictReveal(conflictId)` | Paljastaa ristiriitakortin |
| `onArticlesReveal(articleIds)` | Paljastaa säädösluonnoksen pykälät |
| `onChartReveal(chartId)` | Piirtää kaavion (fiscal/burden/stakeholders/timeline) |
| `onFreshnessReveal(freshnessId)` | Lisää rivin tuoreustaulukkoon |
| `onHandoff(handoffData)` | Näyttää handoff-animaation agenttien välillä |
| `onComplete()` | Työnkulku valmis — kaikki vaiheet merkitään valmiiksi |

---

## 4. Tiedostokohtainen dokumentaatio

### 4.1 data.js — Sisältöpohja

Globaali `DATA`-objekti sisältää kaiken sovelluksen sisällön. Rakenteelliset osat:

#### `DATA.project`
Aktiivisen hankkeen perustiedot.

```js
{
  title: "EU AI Act — Kansallinen täytäntöönpano",
  code: "VM/2025/142",
  phase: "Esivalmistelu",
  deadline: "31.12.2026",
  responsible: "Julkishallinnon ICT-osasto",
  description: "..."
}
```

#### `DATA.projects[]`
Kolme valittavissa olevaa hanketta:
1. EU AI Act — Kansallinen täytäntöönpano (`VM/2025/142`)
2. Digitaalinen euro — Kansallinen valmistelu (`VM/2025/088`)
3. Julkisten hankintojen AI-velvoitteet (`VM/2026/031`)

Hankevalitsin (`projectSelect`) vaihtaa header-tiedot ja triggeröi resetin.

#### `DATA.agents`
Kolmen agentin profiilit:

| ID | Nimi | Lyhenne | Väri | Rooli |
|----|------|---------|------|-------|
| `va` | Valmisteluagentti | VA | `#006475` (teal) | Lähteet, ristiriidat, luonnos |
| `vaa` | Vaikutusarvioagentti | VaA | `#10b981` (emerald) | Fiskaalinen, sääntelytaakka, sidosryhmät |
| `vam` | Vanhenemismonitoriagentti | VaM | `#d97706` (amber) | Tuoreus, muutokset, hälytykset |

#### `DATA.sources`
12 lähdettä kolmessa kategoriassa:

| Kategoria | Lukumäärä | Esimerkkejä |
|-----------|-----------|-------------|
| `eu` | 4 | EU AI Act, AI Office -ohjeistus, CEN/CENELEC-standardit, Conformity Assessment |
| `international` | 3 | Viron AI-kehys, Ruotsin AI-strategia, UK AI Safety Institute |
| `domestic` | 5 | Tietosuojalaki, Tiedonhallintalaki, Hallintolaki, VM AI-julkaisu, Sähköinen asiointi |

Jokainen lähde sisältää: `id`, `title`, `shortTitle`, `type`, `date`, `status`, `relevance` (0–1), `summary`, sekä mahdolliset `keyArticles`, `conflicts`, `lessons`, `country`, `flag`.

#### `DATA.draftArticles[]`
8 säädösluonnoksen pykälää (1 §–8 §). Jokainen sisältää:
- `id`, `number`, `title`, `content` — perustieto
- `changes[]` — muutosseuranta (`{type: "addition"|"removal", text}`)
- `agentComment` — agentin kommentti/huomio
- `status` — `"draft"` | `"accepted"` | `"rejected"` (muuttuu UI-interaktiolla)

#### `DATA.conflicts[]`
5 tunnistettua ristiriitaa, kullakin:
- `severity`: `"critical"` | `"significant"` | `"minor"`
- `source1`, `source2` — ristiriidan osapuolet
- `description`, `recommendation`
- `relatedArticle` — viittaus säädösluonnoksen pykälään

#### `DATA.impact`
Vaikutusarviodata neljässä osassa:

1. **`fiscal`** — Fiskaaliset vaikutukset 2026–2031: `years[]`, `costs[]`, `savings[]`, `net[]`, `costBreakdown{}`
2. **`regulatoryBurden[]`** — 6 sektoria: `{sector, burden (0–100), trend}`
3. **`stakeholders`** — Radar-kaavio: `labels[]`, `groups[]` (Yritykset, Julkishallinto, Kansalaiset)
4. **`timeline[]`** — EU-yhteensopivuusaikajana: `{date, event, status}`

#### `DATA.freshness[]`
8 tuoreusseurantakohdetta:
- `status`: `"green"` | `"yellow"` | `"red"` — tuoreustila
- `alert` — varoitusteksti (valinnainen)
- `lastChecked`, `lastUpdated` — päivämäärät

#### `DATA.workflow`
Työnkulun vaiheet viidessä faasissa + kaksi handoffia:

| Faasi | Agentti | Vaihemäärä | Sisältö |
|-------|---------|------------|---------|
| `sourcesPhase` | VA | 19 | thinking, message, source (×12) |
| `conflictsPhase` | VA | 8 | thinking, message, conflict (×5) |
| `draftPhase` | VA | 4 | thinking, message, articles |
| `handoff` | VA→VaA | 1 | handoff-animaatio |
| `impactPhase` | VaA | 12 | thinking, message, chart (×4) |
| `handoff2` | VaA→VaM | 1 | handoff-animaatio |
| `freshnessPhase` | VaM | 12 | thinking, message, freshness (×8) |

Jokaisella vaiheella on tyyppi: `"thinking"` | `"message"` | `"source"` | `"conflict"` | `"articles"` | `"chart"` | `"freshness"`.

#### `DATA.speech`
Monikielinen puheselostusdata:

- **`phases`** — Faasien aloitusviestit (fi/en/sv)
- **`messages`** — Avaimena alkuperäinen suomenkielinen teksti → `{fi, en, sv}` käännökset
- **`intro`** — Esittelypuhe "Puhu ääneen" -painikkeelle
- **`ui`** — UI-tekstit (speechOn, speechOff, jne.)

---

### 4.2 agents.js — AgentEngine

`AgentEngine`-luokka hallitsee työnkulun simulaatiota.

#### Tilakone

```
[idle] → runWorkflow() → [running]
  ↓                        ↓
 reset()              5 faasia + 2 handoffia
  ↓                        ↓
[idle] ← abort() ← [complete]
```

#### Ajoitusparametrit

| Parametri | Arvo | Kuvaus |
|-----------|------|--------|
| `charDelay` | 25 ms | Viive per merkki kirjoitusanimaatiossa |
| `thinkDelay` | 1200 ms | Tauko "ajattelu"-vaiheen jälkeen |
| `sourceDelay` | 200 ms | Viive lähdekorttien/rivien välillä |

#### Keskeiset metodit

**`typeText(element, text, agentId)`**
Kirjoittaa tekstin merkki kerrallaan DOM-elementtiin. Lisää vilkkuvan kursorin, jonka väri riippuu agentista:
- VA: teal (oletus)
- VaA: emerald
- VaM: amber

**`_processStep(step, feedEl)`**
Käsittelee yhden workflow-vaiheen. Tyypin mukaan:
- `thinking` — luo "ajattelu"-kuplan (italic, piste-animaatio) ja kirjoittaa tekstin
- `message` — luo viestikuplan, kirjoittaa tekstin, kirjaa lokiin
- `source`/`conflict`/`articles`/`freshness`/`chart` — delegoi `app.js`:n callbackille

**`runWorkflow()`**
Ajaa koko 5-faasisen työnkulun peräkkäin:
1. Sources (VA) → 2. Conflicts (VA) → 3. Draft (VA) → Handoff → 4. Impact (VaA) → Handoff → 5. Freshness (VaM)

Jokaisen faasin välillä tarkistetaan `this.aborted` ja voidaan keskeyttää.

**`_sleep(ms)`**
Abort-tietoinen sleep: tarkistaa `this.aborted`-tilaa 50 ms välein ja resolves välittömästi jos keskeytetty.

---

### 4.3 charts.js — ChartManager

Neljä Chart.js-visualisointia:

| Metodi | Kaaviotyyppi | Data |
|--------|-------------|------|
| `renderSourceDistribution()` | Doughnut | Lähdejakauma: EU / Kansainvälinen / Kotimainen |
| `renderFiscalChart()` | Stacked Bar + Line | Kustannukset, säästöt, nettovaikutus 2026–2031 |
| `renderBurdenChart()` | Horizontal Bar | Sääntelytaakka 6 sektorille (0–100) |
| `renderStakeholderChart()` | Radar | 3 sidosryhmää × 6 akselia |

Kaikki kaaviot:
- Käyttävät VM:n brändivärejä
- Ovat responsiivisia (`responsive: true, maintainAspectRatio: false`)
- Tuhotaan `destroyAll()`:lla resetin yhteydessä

---

### 4.4 app.js — Pääkontrolleri

IIFE-kääre (`(function() { 'use strict'; ... })()`) estää globaalin nimiavaruuden saastumisen.

#### SpeechManager-luokka

Web Speech API (SpeechSynthesis) -pohjainen puheselostus.

**Äänivalinta-prioriteetti:**
1. Kielen mukaiset nimetyt äänet (esim. Satu, Onni Suomelle)
2. Enhanced/Premium-äänet
3. Mikä tahansa paikallinen ääni kyseiselle kielelle
4. Mikä tahansa ääni kielelle
5. Fallback: englanti

**Jonomekansimi:**
- `speak(text)` — jos puhe on käynnissä, tallentaa `_pendingText`:iin
- `_doSpeak(text)` — luo `SpeechSynthesisUtterance`, asettaa `onend`-callbackin joka purkaa jonon
- Estää puheen katkeamisen kun seuraava viesti tulee nopeasti

**Kielituki:** fi-FI, en-US, sv-SE

#### UI-komponentit

**Välilehdet (`switchTab`):**
5 välilehteä: Lähteiden analyysi, Ristiriita-analyysi, Säädösluonnos, Vaikutusarviointi, Vanhenemismonitori

**Process Stepper (`updateStepper`):**
5-vaiheinen numerosarja, joka näyttää: pending → active → done

**Agentin tilaindikaattori (`setAgentState`):**
Kolme tilaa per agentti: idle (harmaa), working (vilkkuva, agenttivärinen), done (emerald)

**Agenttiloki (`addLogEntry`):**
Sidebar-osioon kirjataan agenttien toiminta värikoodatuilla tunnisteilla.

#### Callback-kytkennät

`app.js` kytkee `AgentEngine`-callbackit DOM-operaatioihin:

- **`onSourceReveal`** — Luo lähdekortin (`buildSourceCard`) ja lisää oikeaan kategoriaan
- **`onConflictReveal`** — Luo ristiriitakortin (`buildConflictCard`)
- **`onArticlesReveal`** — Luo pykäläkortit (`buildArticleCard`) 150 ms viiveellä
- **`onChartReveal`** — Piirtää kaavion ChartManagerilla
- **`onFreshnessReveal`** — Lisää rivin tuoreustaulukkoon fadeIn-animaatiolla
- **`onHandoff`** — Renderöi handoff-kortin oikeaan feediin (VA→VaA: feedDraft, VaA→VaM: feedImpact)
- **`onSpeak`** — Hakee käännetyn viestin `DATA.speech`:stä ja puhuu sen SpeechManagerilla. Ohittaa `thinking`-tapahtumat.

#### Pykälien interaktio

Käyttäjä voi hyväksyä/hylätä säädösluonnoksen yksittäisiä pykäliä:
- `btn-accept` → asettaa status `"accepted"` (vihreä)
- `btn-reject` → asettaa status `"rejected"` (punainen)
- `btn-info` → kirjaa lisätietopyynnön lokiin

#### Reset-toiminto

"Aloita alusta" -painike:
1. Pysäyttää engine (`engine.reset()`) ja puheen (`speechManager.stop()`)
2. Tuhoaa kaaviot (`charts.destroyAll()`)
3. Nollaa kaikkien agenttien tilat idle-tilaan
4. Tyhjentää feedit, kortit, taulukot
5. Palauttaa pykälien statukset draftiksi
6. Näyttää empty state -viestit
7. Nollaa stepper ja välilehdet

---

### 4.5 index.html — Rakenne

```
<body>
  <div class="app-layout">
    <aside class="sidebar">          ← Vasemman reunan sivupalkki
      ├── .sidebar-header             ← Logo, hankevalitsin, projektitiedot
      ├── .sidebar-content
      │   ├── Agentit                 ← 3 agenttikorttia tilatietoineen
      │   ├── Ohjausparametrit        ← Painopistealue, lähteiden laajuus
      │   ├── Puheselostus            ← Toggle, kieli, voimakkuus, nopeus
      │   └── Agenttiloki             ← Reaaliaikainen tapahtumaloki
      └── .sidebar-actions            ← Aloita / Tarkista / Aloita alusta
    </aside>

    <main class="main-content">
      ├── .header                     ← Otsikko, badge-indikaattorit
      ├── .process-stepper            ← 5-vaiheinen etenemispalkki
      ├── .tab-bar                    ← 5 välilehteä
      └── .tab-content
          ├── panel-sources           ← Lähdeanalyysi + intro-card
          ├── panel-conflicts         ← Ristiriita-analyysi
          ├── panel-draft             ← Säädösluonnos
          ├── panel-impact            ← Vaikutusarviointi + kaaviot + aikajana
          └── panel-freshness         ← Vanhenemismonitori + taulu
    </main>
  </div>
</body>
```

---

### 4.6 style.css — Visuaalinen ilme

#### CSS-muuttujat

| Muuttuja | Arvo | Käyttö |
|----------|------|--------|
| `--accent-indigo` | `#006475` | VA (teal), pääväri, painikkeet |
| `--accent-emerald` | `#059669` | VaA (vihreä), valmis-tilat |
| `--accent-amber` | `#d97706` | VaM (keltaoranssi) |
| `--accent-rose` | `#e11d48` | Kriittiset hälytykset, hylätty |
| `--accent-sky` | `#0284c7` | Kansainväliset lähteet, info |
| `--bg-primary` | `#f1f5f9` | Taustaväri |
| `--bg-card` | `rgba(255,255,255,0.75)` | Glassmorphism-kortit |
| `--blur-glass` | `20px` | Backdrop blur |

#### Animaatiot

| Animaatio | Käyttö |
|-----------|--------|
| `fadeIn` | Välilehtien ja korttien ilmestyminen |
| `slideIn` | Feed-viestien liukuminen vasemmalta |
| `slideInRight` | Lähdekorttien liukuminen oikealta |
| `pulse-state` | Working-tilan vilkutus |
| `pulse-dot` | Thinking-kuplan piste |
| `blink-cursor` | Kirjoituskursori |
| `handoffPulse` | Handoff-kortin ilmestyminen |

#### Responsiivisuus

| Breakpoint | Muutokset |
|------------|-----------|
| ≤ 1200px | Source-kortit yksi per rivi, impact-grid yksi sarake |
| ≤ 900px | Sidebar piiloon (mobiili-drawer), hamburger-valikko näkyviin, step-labelit piiloon |
| ≤ 600px | Pienempi tab-content padding, article-actions wrap |

---

## 5. Työnkulun sekvenssikaavio

```
Käyttäjä          app.js           AgentEngine         DOM
  │                 │                   │                │
  │ "Aloita"        │                   │                │
  ├────────────────►│  runWorkflow()    │                │
  │                 ├──────────────────►│                │
  │                 │                   │                │
  │                 │ onPhaseChange     │                │
  │                 │◄─────────────────┤ Phase 1: Sources
  │                 │  updateStepper    │                │
  │                 ├──────────────────────────────────►│
  │                 │                   │                │
  │                 │ onSpeak('sources')│                │
  │                 │◄─────────────────┤                │
  │                 │  SpeechManager    │                │
  │           ♪ "Aloitan lähteiden analyysin"           │
  │                 │                   │                │
  │                 │                   │ typeText()     │
  │                 │                   ├───────────────►│ Kirjoitusanimaatio
  │                 │                   │                │
  │                 │ onSourceReveal    │                │
  │                 │◄─────────────────┤                │
  │                 │  buildSourceCard  │                │
  │                 ├──────────────────────────────────►│ Lähdekortti ilmestyy
  │                 │                   │                │
  │                 │   ... (19 vaihetta) ...            │
  │                 │                   │                │
  │                 │ onHandoff(VA→VaA) │                │
  │                 │◄─────────────────┤                │
  │                 ├──────────────────────────────────►│ Handoff-animaatio
  │                 │                   │                │
  │                 │   ... Phase 4: Impact ...          │
  │                 │                   │                │
  │                 │ onHandoff(VaA→VaM)│                │
  │                 │◄─────────────────┤                │
  │                 ├──────────────────────────────────►│ Handoff-animaatio
  │                 │                   │                │
  │                 │   ... Phase 5: Freshness ...       │
  │                 │                   │                │
  │                 │ onComplete()      │                │
  │                 │◄─────────────────┤                │
  │                 │  "5/5 valmis"    │                │
  │                 ├──────────────────────────────────►│
```

---

## 6. Puheselostusjärjestelmä

### 6.1 Arkkitehtuuri

```
AgentEngine._processStep()
    │
    ├── onSpeak(text, agentId, eventType)     ← agents.js kutsuu
    │       │
    │       ├── eventType === 'thinking' → ohitetaan
    │       ├── eventType === 'phase'    → DATA.speech.phases[text][lang]
    │       ├── eventType === 'message'  → DATA.speech.messages[text][lang]
    │       └── eventType === 'handoff'  → DATA.speech.messages[text][lang]
    │                │
    │                ▼
    │       SpeechManager.speak(spokenText)
    │           │
    │           ├── Jos puhe käynnissä → _pendingText = text
    │           └── Muuten → _doSpeak(text)
    │                   │
    │                   ├── SpeechSynthesisUtterance luonti
    │                   ├── Äänen, kielen, nopeuden, voimakkuuden asetus
    │                   └── onend → pura _pendingText-jono
    │
    ▼
```

### 6.2 Viestien mappaus

Puheviestit ovat lyhyempiä kuin näytöllä kirjoitetut. Avaimena käytetään workflow-stepin alkuperäistä suomenkielistä tekstiä, joka mappataan lyhyempään puhuttuun versioon:

**Esimerkki:**
```
Näytöllä: "EU AI Act (2024/1689) tunnistettu pääasialliseksi lähteeksi.
           Relevanttius: 98 %. Analysoin artiklat 5, 6–7, 26, 64, 70 ja 99."

Puhuttu (fi): "EU AI Act tunnistettu pääasialliseksi lähteeksi."
Puhuttu (en): "EU AI Act identified as the primary source."
Puhuttu (sv): "EU AI Act identifierad som huvudkälla."
```

### 6.3 UI-kontrollit

Sidebar-osio "Puheselostus":
- **Toggle** — Päällä/pois (CSS-only switch)
- **Kielivalinta** — Suomi / English / Svenska
- **Äänenvoimakkuus** — Range-liukusäädin (0–1)
- **Puhenopeus** — Range-liukusäädin (0.5–2.0)

Intro-painike "Puhu ääneen" aktivoi puheen ja lukee esittelytekstin.

---

## 7. Agenttivärit ja visuaalinen identiteetti

| Agentti | Pääväri | CSS-luokat | Kursorivyöhyke |
|---------|---------|------------|-----------------|
| VA (Valmisteluagentti) | Teal `#006475` | `.va`, `.active`, `.working` | Oletus (teal) |
| VaA (Vaikutusarvioagentti) | Emerald `#059669` | `.vaa`, `.active-emerald`, `.working-emerald` | `.emerald` |
| VaM (Vanhenemismonitoriagentti) | Amber `#d97706` | `.vam`, `.active-amber`, `.working-amber` | `.amber` |

Värit käytetään johdonmukaisesti:
- Sidebar-agenttikortti (avatar + working-reunus)
- Feed-kuplien avatar
- Kirjoituskursori
- Agenttiloki-tunniste
- Handoff-animaatio

---

## 8. Datan rakenne per sisältötyyppi

### 8.1 Lähdekortti (source)

```js
{
  id: "eu-1",
  title: "Euroopan parlamentin ja neuvoston asetus (EU) 2024/1689",
  shortTitle: "EU AI Act",
  type: "Asetus",                  // Asetus | Ohjeistus | Standardiluonnos | Laki | Julkaisu
  date: "13.6.2024",
  status: "Voimassa",              // Voimassa | Luonnos
  relevance: 0.98,                 // 0–1
  summary: "...",
  keyArticles: ["Art. 5", ...]     // Valinnainen
}
```

### 8.2 Ristiriitakortti (conflict)

```js
{
  id: "conflict-1",
  severity: "critical",            // critical | significant | minor
  title: "Tietosuojalaki vs. AI Act",
  source1: "Tietosuojalaki 21 §",
  source2: "AI Act art. 14",
  description: "...",
  recommendation: "...",
  relatedArticle: "§6"            // Viittaus pykälään tai null
}
```

### 8.3 Säädöspykälä (article)

```js
{
  id: "§4",
  number: "4 §",
  title: "Kansallinen valvontaviranomainen",
  content: "...",
  changes: [
    { type: "addition", text: "Traficom vastaa..." },
    { type: "removal", text: "Vaihtoehtoisesti..." }
  ],
  agentComment: "HUOM: Valvontaviranomaisen valinta...",
  status: "draft"                  // draft | accepted | rejected
}
```

### 8.4 Tuoreusseuranta (freshness)

```js
{
  id: "fresh-7",
  source: "Conformity Assessment -delegoitu asetus",
  lastChecked: "2026-02-20",
  lastUpdated: "2026-02-10",
  status: "red",                   // green | yellow | red
  note: "...",
  alert: "KRIITTINEN: ..."         // Valinnainen
}
```

### 8.5 Workflow-step

```js
// Thinking (ajattelu)
{ agent: "va", type: "thinking", text: "Analysoin EU AI Act..." }

// Message (viesti)
{ agent: "va", type: "message", text: "12 lähdettä analysoitu." }

// Sisältöpaljastus
{ agent: "va", type: "source", sourceId: "eu-1" }
{ agent: "va", type: "conflict", conflictId: "conflict-1" }
{ agent: "va", type: "articles", articleIds: ["§1", "§2", ...] }
{ agent: "vaa", type: "chart", chartId: "fiscal" }
{ agent: "vam", type: "freshness", freshnessId: "fresh-1" }
```

---

## 9. Laajentaminen

### 9.1 Uuden agentin lisääminen

1. **data.js:** Lisää agentti `DATA.agents`-objektiin, uusi workflow-faasi `DATA.workflow`-objektiin ja handoff
2. **agents.js:** Lisää uusi faasi `runWorkflow()`-metodiin, kursorin väri `typeText()`-metodiin
3. **app.js:** Lisää agentin tilan hallinta (`setAgentState`), callback uudelle step-tyypille, reset-logiikka
4. **style.css:** Väriluokat (`.agent-avatar.xxx`, `.working-xxx`, `.active-xxx`, `.log-agent.xxx`, `.feed-avatar.xxx`, `.typing-cursor.xxx`)
5. **index.html:** Agenttikortti sidebariin, välilehti, paneeli, empty state

### 9.2 Uuden kaaviotypin lisääminen

1. **data.js:** Lisää data `DATA.impact`-objektiin
2. **charts.js:** Uusi `renderXxx()`-metodi
3. **app.js:** Lisää `chartId`-haara `onChartReveal`-callbackiin
4. **index.html:** Canvas-elementti impact-gridiin

### 9.3 Uuden kielen lisääminen

1. **data.js:** Lisää kielikoodi kaikkiin `DATA.speech`-objektin käännöksiin
2. **app.js:** Lisää `lang`-mapping `_doSpeak`-metodiin ja `_selectVoice`-preferred-listaan
3. **index.html:** Lisää `<option>` kielivalitsimeen

---

## 10. Selaintuki

| Ominaisuus | Chrome | Safari | Firefox | Edge |
|------------|--------|--------|---------|------|
| Perussovelluslogiikka | Kyllä | Kyllä | Kyllä | Kyllä |
| Web Speech API | Kyllä | Kyllä | Rajoitettu* | Kyllä |
| Chart.js | Kyllä | Kyllä | Kyllä | Kyllä |
| Backdrop-filter (blur) | Kyllä | Kyllä | Kyllä | Kyllä |

*Firefox: Web Speech API -tuki vaihtelee. Jos puhesynteesiä ei tueta, puheselostus-osio piilottuu automaattisesti.

---

## 11. Esimerkkitapaus: EU AI Act

Demo käyttää esimerkkitapauksena **EU:n tekoälyasetuksen (AI Act, 2024/1689) kansallista täytäntöönpanoa Suomessa**. Simuloidut agentit:

1. **Valmisteluagentti** kerää 12 relevanttia lähdettä (EU-sääntely, kansainväliset vertailut, kotimainen lainsäädäntö), tunnistaa 5 ristiriitaa ja luonnostelee 8 pykälän säädösluonnoksen
2. **Vaikutusarvioagentti** arvioi 33,4 M€ kokonaiskustannukset, analysoi sääntelytaakan 6 sektorille ja tuottaa sidosryhmäanalyysin
3. **Vanhenemismonitoriagentti** tarkistaa 8 lähteen tuoreuden ja tunnistaa yhden kriittisen muutoksen (Conformity Assessment -asetusluonnos)

Lopputuloksena syntyy kokonaisvaltainen näkymä säädösvalmistelun tilasta — lähteineen, ristiriitoineen, luonnospykälineen, vaikutusarvioineen ja tuoreusseurantoineen.
