# SOK Markkinointi — Toteutusten statuskirjanpito

Tämä ohje kertoo Claude Code -agentille miten kirjata toteutettujen
sovellusten tila ja edistyminen.

## Statustiedosto

Jokainen toteutettu sovellus kirjataan tiedostoon:

```
SOK_Markkinointi/status.md
```

## Tallennusmuoto

```markdown
## SM_<timestamp>_<NNN> — <Sovelluksen nimi>

| Kenttä | Arvo |
|---|---|
| **Status** | `new` / `in-progress` / `done` / `blocked` |
| **Luotu** | YYYY-MM-DD HH:MM |
| **Päivitetty** | YYYY-MM-DD HH:MM |
| **Kuvaus** | Lyhyt kuvaus sovelluksesta |
| **Tekijä** | git-käyttäjänimi |

### Loki

- `YYYY-MM-DD HH:MM` — Mitä tehtiin
- `YYYY-MM-DD HH:MM` — Seuraava päivitys

---
```

## Statusarvot

| Status | Merkitys | Milloin |
|---|---|---|
| `new` | Luotu, ei vielä aloitettu | Hakemisto luotu |
| `in-progress` | Työn alla | Toteutus käynnissä |
| `done` | Valmis ja testattu | Toteutus valmis |
| `blocked` | Estetty turva- tai muusta syystä | Turvatarkistus epäonnistui |

## Säännöt

1. **Kirjaa jokainen sovellus** — myös keskeytetyt tai estetyt
2. **Päivitä status reaaliajassa** — merkitse `in-progress` heti kun aloitat
3. **Kirjaa lopputulos** — merkitse `done` kun toteutus on valmis ja testattu
4. **Loki aikajärjestyksessä** — uusin merkintä viimeisenä
5. **Älä poista merkintöjä** — myös estetyt pysyvät kirjanpidossa
