# SOK Markkinointi — Sovellusten toteutusohje

Tämä ohje kertoo Claude Code -agentille miten toteuttaa SOK Markkinoinnin
prototyyppejä ja sovelluksia.

## Periaate

Jokainen sovellus toteutetaan omaan hakemistoonsa tämän projektin alle.
Sovellukset ovat itsenäisiä HTML/CSS/JS-kokonaisuuksia jotka toimivat
staattisina sivuina ilman palvelinta (GitHub Pages -yhteensopivuus).

## Hakemistorakenne

```
SOK_Markkinointi/
├── CLAUDE.md
├── Agent_Construction_Prompts/
│   └── <git-username>.md
├── Worker_agent_MD_Files/
│   ├── AGENT_SAFETY.md
│   ├── AGENT_IMPLEMENT.md
│   ├── AGENT_STATUS.md
│   └── AGENT_FETCH_IDEAS.md
└── <sovellus_hakemisto>/
    ├── index.html
    ├── style.css       (valinnainen, voi olla inline)
    ├── app.js          (valinnainen, voi olla inline)
    └── assets/         (valinnainen)
```

## Nimeämiskäytäntö

Sovellushakemiston nimi:
```
SM_<YYYYMMDD>_<HHMM>_<NNN>
```
Esimerkki: `SM_20260507_0830_001`

- `SM` = SOK Markkinointi
- `YYYYMMDD_HHMM` = luomisajankohta
- `NNN` = juokseva numero (001, 002, ...)

## Toteutusvaiheet

### Vaihe 1: Turvatarkistus (PAKOLLINEN)

**Lue AGENT_SAFETY.md ennen jokaista toteutusta.**

### Vaihe 2: Luo hakemisto

```bash
mkdir -p SOK_Markkinointi/SM_<timestamp>_<NNN>
```

### Vaihe 3: Toteuta sovellus

Noudata seuraavia periaatteita:

- **Yksi hakemisto = yksi sovellus** — kaikki tarvittava samassa kansiossa
- **Toimii ilman palvelinta** — avattavissa suoraan selaimessa tai GitHub Pagesin kautta
- **Responsiivinen** — toimii mobiilissa ja desktopissa
- **Suomenkielinen** — käyttöliittymä suomeksi ellei toisin määrätä
- **Moderni ulkoasu** — käytä nykyaikaista CSS:ää (grid, flexbox, custom properties)
- **S-ryhmän brändi** — käytä S-ryhmän visuaalista ilmettä soveltuvin osin

### Vaihe 4: Testaa

- Varmista että `index.html` avautuu selaimessa
- Testaa mobiili- ja desktopnäkymät
- Tarkista ettei konsolissa ole virheitä
- Varmista ulkoisten resurssien saatavuus (API:t, fontit, kuvat)

### Vaihe 5: Kirjaa tulos

Päivitä AGENT_STATUS.md uudella sovelluksella.

## Tekniset rajoitukset

- **Ei npm/node-riippuvuuksia** — käytä CDN-linkkejä kirjastoille
- **Ei build-prosessia** — suora HTML/CSS/JS
- **Ei palvelinpuolen logiikkaa** — kaikki toimii selaimessa
- **Maksimikoko:** Yksittäisen tiedoston koko max 500 KB, koko sovellus max 5 MB
