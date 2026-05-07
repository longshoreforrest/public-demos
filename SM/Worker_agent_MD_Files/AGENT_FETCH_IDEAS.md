# SOK Markkinointi — Ideakanava

Tämä ohje kertoo Claude Code -agentille mistä lähteistä ideoita
SOK Markkinoinnin sovelluksiin voi tulla ja miten niitä käsitellään.

## Idealähteet

### 1. Suora prompti (ensisijainen)

Käyttäjä antaa toteutusidean suoraan Claude Code -istunnossa.
Tämä on yleisin tapa ja kaikki promptit kirjataan automaattisesti
`Agent_Construction_Prompts/<git-username>.md`-tiedostoon.

### 2. Ideakansio (tuleva)

Tulevaisuudessa ideoita voidaan hakea ulkoisesta lähteestä
(Firestore, tiedosto, API). Kun tämä otetaan käyttöön, tätä
tiedostoa päivitetään vastaavilla komennoilla.

## Idean käsittelyprosessi

```
1. Vastaanota idea (prompt tai ulkoinen lähde)
2. Kirjaa prompt lokiin (CLAUDE.md:n ohjeen mukaan)
3. Suorita turvatarkistus (AGENT_SAFETY.md)
4. Jos turvallinen → toteuta (AGENT_IMPLEMENT.md)
5. Kirjaa status (AGENT_STATUS.md)
6. Raportoi käyttäjälle
```

## S-ryhmän konteksti

Ideoita arvioidessa huomioi että sovellukset liittyvät SOK:n
markkinointiin. Tyypillisiä sovellustyyppejä:

| Tyyppi | Esimerkki |
|---|---|
| Kampanjasivu | Sesonkituotteiden esittely |
| Interaktiivinen työkalu | Reseptihaku, kauppahaku |
| Datavisualisointi | Myyntidatan esitys, trendikatsaus |
| Peli / kilpailu | Markkinointiin liittyvä minipeli |
| Informatiivinen | Tuotevertailu, vastuullisuusmittari |
| Asiakaskokemus | Palautelomake, NPS-mittaus |

## Priorisointikriteerit

Kun useita ideoita on jonossa, priorisoi seuraavasti:

1. **Kiireellisyys** — Onko kampanjalla deadline?
2. **Vaikuttavuus** — Kuinka montaa asiakasta koskee?
3. **Toteutettavuus** — Onko realistinen staattisena HTML-sovelluksena?
4. **Uutuusarvo** — Demonstroiko uutta tekniikkaa tai lähestymistapaa?
