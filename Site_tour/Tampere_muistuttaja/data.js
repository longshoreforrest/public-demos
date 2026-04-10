// ============================================================
// data.js - Demo data, simulated analysis, localStorage persistence
// Tampere Muistuttaja
// ============================================================

// ---- Person colors palette ----
const PERSON_COLORS = [
  '#e11d48', '#f59e0b', '#10b981', '#3b82f6',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
];

// ---- Demo transcripts (5 diverse examples per language) ----
const DEMO_TRANSCRIPTS = {
  fi: [
    // DEMO 1: Tuotejulkistuksen suunnittelu — monta henkilöä, eri prioriteetteja
    {
      label: 'Tuotejulkistuksen suunnittelu',
      transcript: `Tuotejulkistuksen suunnittelukokous 7.4.2026
Osallistujat: Matti Virtanen, Liisa Korhonen, Jukka Mäkelä, Anna Nieminen, Sanna Lahtinen

Matti: Julkistus on 25.4. Meidän pitää olla valmiina. Matti hoitaa lehdistötiedotteen kirjoittamisen, deadline ensi maanantai.

Liisa: Mä teen landing pagen designin ja koodauksen. Se on iso homma, tarvitsen aikaa perjantaihin 18.4. asti.

Jukka: Mun vastuulla on varmistaa että tuotantoympäristö skaalautuu julkistuspäivänä. Kuormitustestit pitää ajaa torstaihin mennessä.

Anna: Mä valmistelen demo-videon tuotteesta. Kuvaukset on jo tehty, mutta editointi ja tekstitykset puuttuvat. Valmis keskiviikkoon 16.4. mennessä.

Sanna: Mä hoidan some-kampanjan suunnittelun ja aikataulutuksen. Postaukset pitää olla valmiina viikkoa ennen julkistusta.

Matti: Sanna, voisitko myös kontaktoida viisi avainbloggaajaa ja lähettää heille ennakkomateriaalin?

Sanna: Joo, hoidan senkin. Laitan bloggaajaviestit loppuviikosta.

Liisa: Matti, sun pitäisi myös tarkistaa juridiikalta markkinointimateriaalien hyväksyntä.

Matti: Totta. Hoidan juridiikan hyväksynnän tiistaihin mennessä.`,
      parsed: {
        title: 'Tuotejulkistuksen suunnittelukokous',
        summary: 'Tiimi valmistautuu tuotejulkistukseen 25.4. Tehtävät kattavat viestinnän, teknisen valmistelun, markkinoinnin ja sisällöntuotannon. Aikataulu on tiukka — kaikki pitää olla valmiina viikkoa ennen julkistusta.',
        participants: [
          {
            name: 'Matti Virtanen',
            tasks: [
              {
                description: 'Lehdistötiedotteen kirjoittaminen',
                friendlyReminder: 'Matti kulta, lehdistö odottaa sinulta sanoja kuin kukat sadetta. Kirjoita se tiedote — sinä osaat!',
                deadline: '2026-04-13',
                priority: 'high'
              },
              {
                description: 'Juridiikan hyväksyntä markkinointimateriaaleihin',
                friendlyReminder: 'Mattisen herra, juristit eivät pure — yleensä. Laita ne materiaalit hyväksyttäväksi niin ei tule ylläreitä!',
                deadline: '2026-04-14',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Liisa Korhonen',
            tasks: [
              {
                description: 'Landing pagen design ja koodaus',
                friendlyReminder: 'Liisa rakas, se landing page on kuin tyhjä kangas — odottaa mestariteostasi. Pikselit luottavat sinuun!',
                deadline: '2026-04-18',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Jukka Mäkelä',
            tasks: [
              {
                description: 'Tuotantoympäristön skaalautuvuuden varmistaminen ja kuormitustestit',
                friendlyReminder: 'Jukka hyvä, serverit värisevät jännityksestä. Varmista ettei ne kaadu julkistuspäivänä — se olisi noloa kaikille!',
                deadline: '2026-04-16',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Anna Nieminen',
            tasks: [
              {
                description: 'Demo-videon editointi ja tekstitykset',
                friendlyReminder: 'Anna kultaseni, demo-video on kuin elokuva ilman loppukohtausta. Editoi se valmiiksi — yleisö odottaa!',
                deadline: '2026-04-16',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Sanna Lahtinen',
            tasks: [
              {
                description: 'Some-kampanjan suunnittelu ja aikataulutus',
                friendlyReminder: 'Sanna hyvä, sosiaalinen media ei odota ketään! Suunnittele se kampanja ennen kuin maailma unohtaa meidät.',
                deadline: '2026-04-18',
                priority: 'normal'
              },
              {
                description: 'Bloggaajayhteistyö: kontaktointi ja ennakkomateriaalin lähetys',
                friendlyReminder: 'Sanna rakas, bloggaajat ovat kuin kissoja — ne pitää houkutella sisällöllä. Lähetä ne materiaalit!',
                deadline: '2026-04-14',
                priority: 'normal'
              }
            ]
          }
        ]
      }
    },
    // DEMO 2: Sprintin retrospektiivi — ongelmien käsittely, parannusehdotukset
    {
      label: 'Sprintin retro & suunnittelu',
      transcript: `Sprintin retrospektiivi ja suunnittelu 8.4.2026
Osallistujat: Pekka Toivonen, Mikko Järvinen, Kaisa Mäkinen, Ville Hämäläinen

Pekka: Edellisessä sprintissä CI/CD-putki hajosi kolme kertaa. Mä refaktoroin pipeline-konfiguraation niin ettei tämä toistu. Hoidan sen tällä viikolla.

Mikko: Mä huomasin että tietokantakyselyt on hitaita uudessa raportointinäkymässä. Mä teen performance-analyysin ja optimoin pahimmat kyselyt. Deadline keskiviikko.

Kaisa: Koodikatselmoinnit ovat jääneet tekemättä ja PR:t kasaantuvat. Mä käyn läpi kaikki avoimet pull requestit ja teen reviewit torstaihin mennessä.

Ville: Mä kirjoitan integraatiotestit uudelle maksupalveluintegraatiolle. Siinä on ollut tuotannossa bugeja koska testkattavuus on heikko.

Pekka: Ville, voisitko myös dokumentoida maksupalvelun rajapintakuvauksen? Se puuttuu kokonaan.

Ville: Joo, teen senkin. Rajapintadokumentaatio perjantaihin mennessä.

Mikko: Mun pitäisi myös päivittää monitorointihälytykset — nykyiset raja-arvot antavat liikaa vääriä hälytyksiä.

Kaisa: Mä lupaan myös tehdä ehdotuksen uudesta koodikatselmointiprosessista, niin tämä ei toistu.`,
      parsed: {
        title: 'Sprintin retrospektiivi ja suunnittelu',
        summary: 'Tiimi tunnisti edellisen sprintin ongelmat: CI/CD-katkot, hitaat kyselyt, kasaantuneet koodikatselmoinnit ja heikko testikattavuus. Jokaiselle jaettiin korjaavat toimenpiteet.',
        participants: [
          {
            name: 'Pekka Toivonen',
            tasks: [
              {
                description: 'CI/CD-pipeline-konfiguraation refaktorointi',
                friendlyReminder: 'Pekka kulta, pipeline on kuin vanha auto — se tarvitsee huoltoa. Korjaa se ennen kuin se hajoaa taas!',
                deadline: '2026-04-17',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Mikko Järvinen',
            tasks: [
              {
                description: 'Raportointinäkymän tietokantakyselyjen optimointi',
                friendlyReminder: 'Mikko hyvä, ne kyselyt ovat hitaampia kuin etana saunaan. Anna niille vauhtia!',
                deadline: '2026-04-15',
                priority: 'high'
              },
              {
                description: 'Monitorointihälytysten raja-arvojen päivitys',
                friendlyReminder: 'Mikko rakas, väärät hälytykset ovat kuin susi joka huusi "apua" liian monta kertaa. Korjaa raja-arvot!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Kaisa Mäkinen',
            tasks: [
              {
                description: 'Avoimien pull requestien katselmointi',
                friendlyReminder: 'Kaisa kultaseni, PR-jono on pidempi kuin joulupukin toivelista. Auta niitä pääsemään eteenpäin!',
                deadline: '2026-04-16',
                priority: 'high'
              },
              {
                description: 'Ehdotus uudesta koodikatselmointiprosessista',
                friendlyReminder: 'Kaisa hyvä, uusi prosessi ei synny itsestään — mutta sinun kynästä se syntyy varmasti!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Ville Hämäläinen',
            tasks: [
              {
                description: 'Integraatiotestit maksupalveluintegraatiolle',
                friendlyReminder: 'Ville hyvä, maksupalvelu ilman testejä on kuin lompakko ilman vetoketjua. Suojaa se!',
                deadline: '2026-04-17',
                priority: 'high'
              },
              {
                description: 'Maksupalvelun rajapintadokumentaatio',
                friendlyReminder: 'Ville rakas, dokumentoimaton rajapinta on kuin kartta ilman paikannimiä. Merkitse reitit!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          }
        ]
      }
    },
    // DEMO 3: Myyntitiimin viikkopalaveri — CRM, tarjoukset, asiakkaat
    {
      label: 'Myyntitiimin viikkopalaveri',
      transcript: `Myyntitiimin viikkopalaveri 3.4.2026
Osallistujat: Tero Laine, Outi Salonen, Heikki Rantanen

Tero: Meillä on kolme isoa tarjousta auki. Mä viimeistelen Acme Oy:n tarjouksen tänään ja lähetän sen asiakkaalle.

Outi: TechStart-kauppa näyttää lupaavalta. Mä sovin tapaamisen heidän CTO:nsa kanssa ensi viikolle ja valmistelen esitysmateriaalin.

Heikki: Mä päivitän CRM:n pipeline-tiedot kaikista avoimista diileistä. Siellä on vanhentunutta dataa.

Tero: Heikki, voisitko myös tehdä kilpailija-analyysin Nordic Solutions -tarjousta varten? Tarvitaan ensi viikon tiistaiksi.

Heikki: Joo, hoidan sen. Outi, sulla oli myös se asiakastyytyväisyyskyselyn tulokset analysoitavana?

Outi: Joo totta! Mä teen yhteenvedon kyselyn tuloksista ja jaan sen tiimille. Deadline perjantai.

Tero: Hyvä. Mä teen myös Q1:n myyntiraportin johtoryhmälle. Se pitäisi olla valmis ensi viikon maanantaiksi.`,
      parsed: {
        title: 'Myyntitiimin viikkopalaveri',
        summary: 'Kolme isoa tarjousta auki. Tiimi keskittyi tarjousten viimeistelyyn, CRM-datan päivittämiseen, kilpailija-analyysiin ja asiakastyytyväisyyskyselyyn. Q1-raportti johtoryhmälle tulossa.',
        participants: [
          {
            name: 'Tero Laine',
            tasks: [
              {
                description: 'Acme Oy:n tarjouksen viimeistely ja lähetys',
                friendlyReminder: 'Tero kulta, Acme odottaa tarjoustasi kuin kukkaa keväällä. Lähetä se — myynnit eivät tee itseään!',
                deadline: '2026-04-03',
                priority: 'high'
              },
              {
                description: 'Q1 myyntiraportti johtoryhmälle',
                friendlyReminder: 'Tero rakas, johtoryhmä janottaa lukuja. Q1-raportti on sinun lahjasi heille — paketoitko sen valmiiksi?',
                deadline: '2026-04-13',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Outi Salonen',
            tasks: [
              {
                description: 'Tapaaminen TechStartin CTO:n kanssa ja esitysmateriaalin valmistelu',
                friendlyReminder: 'Outi hyvä, CTO odottaa tapaamista kuin ensitreffiä. Valmistaudu hyvin — ensivaikutelma ratkaisee!',
                deadline: '2026-04-14',
                priority: 'high'
              },
              {
                description: 'Asiakastyytyväisyyskyselyn tulosten yhteenveto',
                friendlyReminder: 'Outi kultaseni, asiakkaat ovat puhuneet sydämensä pohjalta. Kokoa heidän ajatuksensa yhteen — tiimi tarvitsee niitä!',
                deadline: '2026-04-10',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Heikki Rantanen',
            tasks: [
              {
                description: 'CRM:n pipeline-tietojen päivitys',
                friendlyReminder: 'Heikki hyvä, CRM on kuin puutarha — se tarvitsee hoitoa tai se villiintyy. Kitke vanhat tiedot pois!',
                deadline: '2026-04-08',
                priority: 'normal'
              },
              {
                description: 'Kilpailija-analyysi Nordic Solutions -tarjousta varten',
                friendlyReminder: 'Heikki rakas, kilpailijat eivät nuku — mutta sinun analyysisi pitää meidät hereillä. Tee se!',
                deadline: '2026-04-14',
                priority: 'high'
              }
            ]
          }
        ]
      }
    },
    // DEMO 4: Asiakasprojektin kickoff — monta deadlinea, pitkä aikajänne
    {
      label: 'Projektin kickoff',
      transcript: `Projekti Borealis - Kickoff-palaveri 9.4.2026
Osallistujat: Sanna Lahtinen, Anna Nieminen, Pekka Toivonen, Liisa Korhonen, Mikko Järvinen

Sanna: Tervetuloa projekti Borealikseen! Asiakas haluaa uuden asiakasportaalin käyttöön kesäkuun loppuun mennessä. Mä teen projektisuunnitelman ja aikataulun — valmis ensi viikon tiistaihin mennessä.

Anna: Mä aloitan käyttäjätutkimuksen. Haastattelut pitää tehdä ensi viikon aikana ja analysoida tulokset viikon 17 loppuun mennessä.

Pekka: Mä kartoitan nykyisen järjestelmän teknisen velan ja teen migraatiosuunnitelman. Tarvitsen siihen pari viikkoa, deadline 25.4.

Liisa: Mä teen wireframet portaalin päänäkymistä. Pohjan pitäisi olla valmis 18.4. mennessä, jotta Anna voi validoida ne käyttäjillä.

Mikko: Mun vastuulla on kehitysympäristön pystytys ja CI/CD-putken konfigurointi. Hoidan ne tällä viikolla.

Sanna: Hyvä. Mä sovin myös ohjausryhmän kokouksen asiakkaan kanssa viikon 16 alkuun. Kaikki, muistakaa kirjata tunnit projektin koodille alusta asti.

Mikko: Mä teen myös tietoturvaselvityksen portaalin vaatimuksista. Se pitää olla tehtynä ennen kuin aloitetaan varsinainen kehitys.`,
      parsed: {
        title: 'Projekti Borealis - Kickoff',
        summary: 'Uusi asiakasportaaliprojekti käynnistyi. Viiden hengen tiimi aloittaa tutkimuksella, suunnittelulla ja teknisillä valmisteluilla. Tavoite: portaali käyttöön kesäkuun loppuun mennessä.',
        participants: [
          {
            name: 'Sanna Lahtinen',
            tasks: [
              {
                description: 'Projektisuunnitelma ja aikataulu',
                friendlyReminder: 'Sanna kulta, projekti ilman suunnitelmaa on kuin purjehdus ilman kompassia. Piirrä reitti!',
                deadline: '2026-04-14',
                priority: 'high'
              },
              {
                description: 'Ohjausryhmän kokouksen sopiminen asiakkaan kanssa',
                friendlyReminder: 'Sanna hyvä, asiakas odottaa kutsua ohjausryhmään. Älä anna heidän odottaa liian kauan!',
                deadline: '2026-04-15',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Anna Nieminen',
            tasks: [
              {
                description: 'Käyttäjähaastattelut (viikko 16)',
                friendlyReminder: 'Anna rakas, käyttäjät odottavat että joku kysyy heidän mielipidettään. Sinä olet se henkilö!',
                deadline: '2026-04-17',
                priority: 'high'
              },
              {
                description: 'Käyttäjätutkimuksen tulosten analysointi',
                friendlyReminder: 'Anna kultaseni, haastatteludata ei analysoi itseään — mutta sinun käsissäsi siitä tulee kultaa!',
                deadline: '2026-04-24',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Pekka Toivonen',
            tasks: [
              {
                description: 'Nykyisen järjestelmän teknisen velan kartoitus ja migraatiosuunnitelma',
                friendlyReminder: 'Pekka hyvä, tekninen velka kasvaa korkoa korkoa. Kartoita se ennen kuin se nielee meidät!',
                deadline: '2026-04-25',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Liisa Korhonen',
            tasks: [
              {
                description: 'Wireframet portaalin päänäkymistä',
                friendlyReminder: 'Liisa kulta, wireframet ovat portaalin luut — ilman niitä se on vain möykky. Anna sille muoto!',
                deadline: '2026-04-18',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Mikko Järvinen',
            tasks: [
              {
                description: 'Kehitysympäristön pystytys ja CI/CD-putken konfigurointi',
                friendlyReminder: 'Mikko hyvä, kehitysympäristö on kuin talo — ensin pitää rakentaa perustukset. Muuraa!',
                deadline: '2026-04-11',
                priority: 'high'
              },
              {
                description: 'Tietoturvaselvitys portaalin vaatimuksista',
                friendlyReminder: 'Mikko rakas, tietoturva ilman selvitystä on kuin lukitsematon ovi. Tarkista lukot!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          }
        ]
      }
    },
    // DEMO 5: Johtoryhmän strategiapalaveri — korkean tason päätöksiä
    {
      label: 'Johtoryhmän strategiapalaveri',
      transcript: `Johtoryhmän strategiapalaveri Q2/2026 — 2.4.2026
Osallistujat: Kaisa Mäkinen, Tero Laine, Heikki Rantanen, Ville Hämäläinen

Kaisa: Q1 meni hyvin mutta Q2:lla pitää kasvaa 20%. Mä valmistelen päivitetyn kasvustrategian hallitukselle. Deadline kuukauden loppuun mennessä.

Tero: Myyntitiimi tarvitsee kaksi uutta myyjää. Mä teen rekrytointisuunnitelman ja budjetin HR:lle ensi viikoksi.

Heikki: Asiakaspoistuma kasvoi viime kvartaalilla. Mä teetän asiakaskokemusselvityksen ja teen toimenpidesuunnitelman. Selvitys valmis 18.4. mennessä.

Ville: Teknologiapuolella meidän pitää päättää pilvistrategiasta. Mä teen vertailun AWS vs Azure vs GCP ja esittelen sen johtoryhmälle 22.4.

Kaisa: Meidän pitää myös arvioida M&A-mahdollisuudet. Heikki, voisitko kartoittaa potentiaaliset yrityskauppakohteet pohjoismaisilla markkinoilla?

Heikki: Joo, teen kartoituksen. Se vaatii pari viikkoa, deadline 25.4.

Tero: Mä lupaan myös päivittää kumppanuusstrategian — nykyiset partnerisopimukset ovat osin vanhentuneita.

Ville: Mun pitäisi myös esittää tietoturvabudjetti Q2:lle. Se on ollut itseasiassa jo myöhässä.`,
      parsed: {
        title: 'Johtoryhmän strategiapalaveri Q2/2026',
        summary: 'Johtoryhmä linjasi Q2-tavoitteet: 20% kasvu, rekrytoinnit, asiakaspoistuman torjunta, pilvistrategian valinta ja yrityskauppakartoitus. Monta strategista päätöstä ja selvitystä työn alla.',
        participants: [
          {
            name: 'Kaisa Mäkinen',
            tasks: [
              {
                description: 'Päivitetty kasvustrategia hallitukselle',
                friendlyReminder: 'Kaisa kulta, hallitus odottaa strategiaa kuin oppilaat todistuksia. Näytä suunta!',
                deadline: '2026-04-30',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Tero Laine',
            tasks: [
              {
                description: 'Rekrytointisuunnitelma ja budjetti kahdelle uudelle myyjälle',
                friendlyReminder: 'Tero hyvä, myyntitiimi odottaa vahvistuksia kuin joukkue vaihtopelaajia. Rekrytoi apua!',
                deadline: '2026-04-14',
                priority: 'high'
              },
              {
                description: 'Kumppanuusstrategian päivitys',
                friendlyReminder: 'Tero rakas, vanhat partnerisopimukset ovat kuin vanhat kengät — ne pitää vaihtaa ennen kuin ne hajoavat kesken kävelyn.',
                deadline: '2026-04-21',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Heikki Rantanen',
            tasks: [
              {
                description: 'Asiakaskokemusselvitys ja toimenpidesuunnitelma',
                friendlyReminder: 'Heikki hyvä, asiakkaat lähtevät kuin muuttolinnut — selvitä miksi ja houkuttele heidät takaisin!',
                deadline: '2026-04-18',
                priority: 'high'
              },
              {
                description: 'Pohjoismaisten yrityskauppakohteiden kartoitus',
                friendlyReminder: 'Heikki rakas, M&A-mahdollisuudet eivät odota ikuisesti. Löydä ne helmet ennen kilpailijoita!',
                deadline: '2026-04-25',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Ville Hämäläinen',
            tasks: [
              {
                description: 'Pilvistrategian vertailu (AWS vs Azure vs GCP) ja esittely',
                friendlyReminder: 'Ville hyvä, pilvet eivät valitse itseään — sinun pitää päättää mihin meidän data leijailee!',
                deadline: '2026-04-22',
                priority: 'high'
              },
              {
                description: 'Tietoturvabudjetti Q2:lle',
                friendlyReminder: 'Ville rakas, tietoturvabudjetti on jo myöhässä! Se on kuin palosammutin — parempi olla valmis ennen kuin sitä tarvitsee.',
                deadline: '2026-04-08',
                priority: 'high'
              }
            ]
          }
        ]
      }
    }
  ],
  en: [
    // EN DEMO 1: Product launch
    {
      label: 'Product launch planning',
      transcript: `Product Launch Planning Meeting April 7, 2026
Participants: Matt Wilson, Lisa Chen, Jake Miller, Anna Brooks, Sarah Lane

Matt: Launch is on April 25th. We need to be ready. I'll handle writing the press release, deadline next Monday.

Lisa: I'll do the landing page design and coding. It's a big job, I need until Friday April 18th.

Jake: My responsibility is making sure the production environment scales on launch day. Load tests need to run by Thursday.

Anna: I'll prepare the product demo video. Filming is done, but editing and subtitles are missing. Ready by Wednesday April 16th.

Sarah: I'll handle the social media campaign planning and scheduling. Posts need to be ready a week before launch.

Matt: Sarah, could you also contact five key bloggers and send them advance materials?

Sarah: Sure, I'll handle that too. Blogger outreach by end of this week.

Lisa: Matt, you should also get legal approval on the marketing materials.

Matt: True. I'll get legal sign-off by Tuesday.`,
      parsed: {
        title: 'Product Launch Planning Meeting',
        summary: 'The team is preparing for a product launch on April 25th. Tasks cover communications, technical preparation, marketing, and content production. Tight timeline — everything needs to be ready a week before launch.',
        participants: [
          {
            name: 'Matt Wilson',
            tasks: [
              {
                description: 'Write press release',
                friendlyReminder: 'Matt dear, the press is waiting for your words like flowers wait for rain. Write that release — you\'ve got this!',
                deadline: '2026-04-13',
                priority: 'high'
              },
              {
                description: 'Get legal approval on marketing materials',
                friendlyReminder: 'Matt love, lawyers don\'t bite — usually. Send those materials for approval before any surprises pop up!',
                deadline: '2026-04-14',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Lisa Chen',
            tasks: [
              {
                description: 'Landing page design and development',
                friendlyReminder: 'Lisa darling, that landing page is like an empty canvas — waiting for your masterpiece. The pixels trust you!',
                deadline: '2026-04-18',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Jake Miller',
            tasks: [
              {
                description: 'Production environment scaling and load tests',
                friendlyReminder: 'Jake dear, the servers are trembling with anticipation. Make sure they don\'t crash on launch day — that would be awkward for everyone!',
                deadline: '2026-04-16',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Anna Brooks',
            tasks: [
              {
                description: 'Demo video editing and subtitles',
                friendlyReminder: 'Anna sweetie, the demo video is like a movie without its final scene. Edit it to perfection — the audience awaits!',
                deadline: '2026-04-16',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Sarah Lane',
            tasks: [
              {
                description: 'Social media campaign planning and scheduling',
                friendlyReminder: 'Sarah dear, social media waits for no one! Plan that campaign before the world forgets about us.',
                deadline: '2026-04-18',
                priority: 'normal'
              },
              {
                description: 'Blogger outreach and advance materials',
                friendlyReminder: 'Sarah love, bloggers are like cats — you need to lure them with great content. Send those materials!',
                deadline: '2026-04-14',
                priority: 'normal'
              }
            ]
          }
        ]
      }
    },
    // EN DEMO 2: Sprint retro
    {
      label: 'Sprint retro & planning',
      transcript: `Sprint Retrospective and Planning April 8, 2026
Participants: Peter Torres, Mike Jensen, Karen White, David Lee

Peter: The CI/CD pipeline broke three times last sprint. I'll refactor the pipeline configuration to prevent this. Handling it this week.

Mike: I noticed database queries are slow in the new reporting view. I'll do a performance analysis and optimize the worst queries. Deadline Wednesday.

Karen: Code reviews have been falling behind and PRs are piling up. I'll go through all open pull requests and do reviews by Thursday.

David: I'll write integration tests for the new payment service. There have been production bugs due to poor test coverage.

Peter: David, could you also document the payment service API? It's completely missing.

David: Sure, API documentation by Friday.

Mike: I also need to update monitoring alerts — current thresholds are giving too many false alarms.

Karen: I'll also draft a proposal for a new code review process so this doesn't happen again.`,
      parsed: {
        title: 'Sprint Retrospective and Planning',
        summary: 'The team identified key issues from the previous sprint: CI/CD failures, slow queries, piled-up code reviews, and poor test coverage. Corrective actions assigned to each team member.',
        participants: [
          {
            name: 'Peter Torres',
            tasks: [
              {
                description: 'Refactor CI/CD pipeline configuration',
                friendlyReminder: 'Peter dear, the pipeline is like an old car — it needs maintenance. Fix it before it breaks down again!',
                deadline: '2026-04-17',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Mike Jensen',
            tasks: [
              {
                description: 'Database query performance analysis and optimization',
                friendlyReminder: 'Mike love, those queries are slower than a snail heading to the sauna. Give them some speed!',
                deadline: '2026-04-15',
                priority: 'high'
              },
              {
                description: 'Update monitoring alert thresholds',
                friendlyReminder: 'Mike darling, false alarms are like the boy who cried wolf. Fix those thresholds!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Karen White',
            tasks: [
              {
                description: 'Review all open pull requests',
                friendlyReminder: 'Karen sweetie, the PR queue is longer than Santa\'s wish list. Help them move forward!',
                deadline: '2026-04-16',
                priority: 'high'
              },
              {
                description: 'Draft new code review process proposal',
                friendlyReminder: 'Karen dear, a new process won\'t write itself — but from your pen, it\'ll be brilliant!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'David Lee',
            tasks: [
              {
                description: 'Integration tests for payment service',
                friendlyReminder: 'David love, a payment service without tests is like a wallet without a zipper. Protect it!',
                deadline: '2026-04-17',
                priority: 'high'
              },
              {
                description: 'Payment service API documentation',
                friendlyReminder: 'David darling, an undocumented API is like a map without place names. Mark the routes!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          }
        ]
      }
    },
    // EN DEMO 3: Sales weekly
    {
      label: 'Sales team weekly',
      transcript: `Sales Team Weekly April 3, 2026
Participants: Tom Harris, Olivia Park, Henry Grant

Tom: We have three big proposals open. I'll finalize the Acme Corp proposal today and send it to the client.

Olivia: The TechStart deal looks promising. I'll set up a meeting with their CTO next week and prepare presentation materials.

Henry: I'll update the CRM pipeline data for all open deals. There's stale data in there.

Tom: Henry, could you also do a competitor analysis for the Nordic Solutions bid? We need it by next Tuesday.

Henry: Sure. Olivia, you also had the customer satisfaction survey results to analyze?

Olivia: Right! I'll compile a summary of the survey results and share with the team. Deadline Friday.

Tom: Good. I'll also prepare the Q1 sales report for the leadership team. Should be ready by next Monday.`,
      parsed: {
        title: 'Sales Team Weekly',
        summary: 'Three big proposals open. Team focused on proposal finalization, CRM data cleanup, competitor analysis, and customer satisfaction review. Q1 report for leadership coming up.',
        participants: [
          {
            name: 'Tom Harris',
            tasks: [
              {
                description: 'Finalize and send Acme Corp proposal',
                friendlyReminder: 'Tom dear, Acme is waiting for your proposal like spring waits for flowers. Send it — sales don\'t make themselves!',
                deadline: '2026-04-03',
                priority: 'high'
              },
              {
                description: 'Q1 sales report for leadership',
                friendlyReminder: 'Tom love, the leadership team is thirsty for numbers. The Q1 report is your gift to them — will you wrap it up?',
                deadline: '2026-04-13',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Olivia Park',
            tasks: [
              {
                description: 'Schedule meeting with TechStart CTO and prepare presentation',
                friendlyReminder: 'Olivia dear, the CTO is expecting a meeting like a first date. Prepare well — first impressions matter!',
                deadline: '2026-04-14',
                priority: 'high'
              },
              {
                description: 'Customer satisfaction survey results summary',
                friendlyReminder: 'Olivia sweetie, customers have spoken from the heart. Compile their thoughts — the team needs them!',
                deadline: '2026-04-10',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Henry Grant',
            tasks: [
              {
                description: 'Update CRM pipeline data',
                friendlyReminder: 'Henry dear, the CRM is like a garden — it needs tending or it goes wild. Weed out the stale data!',
                deadline: '2026-04-08',
                priority: 'normal'
              },
              {
                description: 'Competitor analysis for Nordic Solutions bid',
                friendlyReminder: 'Henry love, competitors never sleep — but your analysis will keep us awake and ready. Do it!',
                deadline: '2026-04-14',
                priority: 'high'
              }
            ]
          }
        ]
      }
    },
    // EN DEMO 4: Project kickoff
    {
      label: 'Project kickoff',
      transcript: `Project Borealis - Kickoff Meeting April 9, 2026
Participants: Sarah Lane, Anna Brooks, Peter Torres, Lisa Chen, Mike Jensen

Sarah: Welcome to Project Borealis! The client wants a new customer portal live by end of June. I'll create the project plan and timeline — ready by next Tuesday.

Anna: I'll start user research. Interviews need to happen next week and results analyzed by end of week 17.

Peter: I'll map the current system's technical debt and create a migration plan. I need a couple of weeks, deadline April 25th.

Lisa: I'll create wireframes for the portal's main views. The foundation should be ready by April 18th so Anna can validate them with users.

Mike: My responsibility is setting up the dev environment and configuring the CI/CD pipeline. I'll handle those this week.

Sarah: Good. I'll also schedule a steering committee meeting with the client for early week 16. Everyone, remember to log hours to the project code from the start.

Mike: I'll also do a security assessment of the portal requirements. That needs to be done before we start actual development.`,
      parsed: {
        title: 'Project Borealis - Kickoff',
        summary: 'New customer portal project launched. Five-person team starts with research, planning, and technical preparation. Goal: portal live by end of June.',
        participants: [
          {
            name: 'Sarah Lane',
            tasks: [
              {
                description: 'Project plan and timeline',
                friendlyReminder: 'Sarah dear, a project without a plan is like sailing without a compass. Chart the course!',
                deadline: '2026-04-14',
                priority: 'high'
              },
              {
                description: 'Schedule steering committee meeting with client',
                friendlyReminder: 'Sarah love, the client is waiting for their invitation. Don\'t keep them waiting too long!',
                deadline: '2026-04-15',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Anna Brooks',
            tasks: [
              {
                description: 'User interviews (week 16)',
                friendlyReminder: 'Anna darling, users are waiting for someone to ask their opinion. You are that someone!',
                deadline: '2026-04-17',
                priority: 'high'
              },
              {
                description: 'User research results analysis',
                friendlyReminder: 'Anna sweetie, interview data doesn\'t analyze itself — but in your hands it becomes gold!',
                deadline: '2026-04-24',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Peter Torres',
            tasks: [
              {
                description: 'Technical debt mapping and migration plan',
                friendlyReminder: 'Peter dear, technical debt accrues compound interest. Map it before it swallows us whole!',
                deadline: '2026-04-25',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Lisa Chen',
            tasks: [
              {
                description: 'Wireframes for portal main views',
                friendlyReminder: 'Lisa love, wireframes are the portal\'s skeleton — without them it\'s just a blob. Give it form!',
                deadline: '2026-04-18',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Mike Jensen',
            tasks: [
              {
                description: 'Dev environment setup and CI/CD pipeline configuration',
                friendlyReminder: 'Mike dear, the dev environment is like a house — first you need to build the foundation. Start building!',
                deadline: '2026-04-11',
                priority: 'high'
              },
              {
                description: 'Security assessment of portal requirements',
                friendlyReminder: 'Mike love, security without assessment is like an unlocked door. Check the locks!',
                deadline: '2026-04-18',
                priority: 'normal'
              }
            ]
          }
        ]
      }
    },
    // EN DEMO 5: Leadership strategy
    {
      label: 'Leadership strategy meeting',
      transcript: `Leadership Strategy Meeting Q2/2026 — April 2, 2026
Participants: Karen White, Tom Harris, Henry Grant, David Lee

Karen: Q1 went well but we need to grow 20% in Q2. I'll prepare an updated growth strategy for the board. Deadline end of month.

Tom: The sales team needs two new hires. I'll create a recruitment plan and budget for HR by next week.

Henry: Customer churn grew last quarter. I'll commission a customer experience study and create an action plan. Study ready by April 18th.

David: On the technology side, we need to decide on cloud strategy. I'll do a comparison of AWS vs Azure vs GCP and present to leadership on April 22nd.

Karen: We also need to evaluate M&A opportunities. Henry, could you map potential acquisition targets in the Nordic markets?

Henry: Yes, I'll do the mapping. It needs a couple of weeks, deadline April 25th.

Tom: I'll also update the partnership strategy — current partner agreements are partly outdated.

David: I also need to present the Q2 security budget. It's actually already overdue.`,
      parsed: {
        title: 'Leadership Strategy Meeting Q2/2026',
        summary: 'Leadership set Q2 objectives: 20% growth, new hires, churn reduction, cloud strategy decision, and M&A mapping. Multiple strategic decisions and studies in progress.',
        participants: [
          {
            name: 'Karen White',
            tasks: [
              {
                description: 'Updated growth strategy for the board',
                friendlyReminder: 'Karen dear, the board is waiting for the strategy like students wait for report cards. Show the way!',
                deadline: '2026-04-30',
                priority: 'high'
              }
            ]
          },
          {
            name: 'Tom Harris',
            tasks: [
              {
                description: 'Recruitment plan and budget for two new salespeople',
                friendlyReminder: 'Tom love, the sales team is waiting for reinforcements like a team waits for substitutes. Recruit help!',
                deadline: '2026-04-14',
                priority: 'high'
              },
              {
                description: 'Partnership strategy update',
                friendlyReminder: 'Tom darling, old partner agreements are like old shoes — they need replacing before they fall apart mid-walk.',
                deadline: '2026-04-21',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'Henry Grant',
            tasks: [
              {
                description: 'Customer experience study and action plan',
                friendlyReminder: 'Henry dear, customers are leaving like migrating birds — find out why and lure them back!',
                deadline: '2026-04-18',
                priority: 'high'
              },
              {
                description: 'Nordic M&A target mapping',
                friendlyReminder: 'Henry love, M&A opportunities don\'t wait forever. Find those gems before competitors do!',
                deadline: '2026-04-25',
                priority: 'normal'
              }
            ]
          },
          {
            name: 'David Lee',
            tasks: [
              {
                description: 'Cloud strategy comparison (AWS vs Azure vs GCP) and presentation',
                friendlyReminder: 'David dear, clouds don\'t pick themselves — you need to decide where our data floats!',
                deadline: '2026-04-22',
                priority: 'high'
              },
              {
                description: 'Q2 security budget',
                friendlyReminder: 'David love, the security budget is already overdue! It\'s like a fire extinguisher — better to have it ready before you need it.',
                deadline: '2026-04-08',
                priority: 'high'
              }
            ]
          }
        ]
      }
    }
  ]
};

// ---- Pre-loaded full sample data (all 5 demos with varied statuses) ----

function loadFullSampleData() {
  Store.clearAll();

  const lang = getLang();
  const demos = DEMO_TRANSCRIPTS[lang];
  const now = new Date();

  // Meeting dates spread over last 8 days
  const meetingDates = [
    new Date(now.getTime() - 8 * 86400000), // 8 days ago
    new Date(now.getTime() - 6 * 86400000), // 6 days ago
    new Date(now.getTime() - 4 * 86400000), // 4 days ago
    new Date(now.getTime() - 1 * 86400000), // yesterday
    new Date(now.getTime()),                 // today
  ];

  // Pre-set task statuses to showcase different states
  // Format: [demoIndex][participantIndex][taskIndex] = { status, reminderCount }
  const presetStatuses = [
    // Demo 0: Tuotejulkistus — mix of done, in progress, overdue
    [
      [{ status: 'done', reminders: 0 }, { status: 'done', reminders: 1 }],  // Matti
      [{ status: 'in_progress', reminders: 0 }],                              // Liisa
      [{ status: 'done', reminders: 0 }],                                     // Jukka
      [{ status: 'in_progress', reminders: 1 }],                              // Anna
      [{ status: 'pending', reminders: 0 }, { status: 'done', reminders: 0 }] // Sanna
    ],
    // Demo 1: Sprint retro — some overdue, some done
    [
      [{ status: 'done', reminders: 0 }],                                     // Pekka
      [{ status: 'overdue', reminders: 2 }, { status: 'pending', reminders: 0 }], // Mikko
      [{ status: 'done', reminders: 0 }, { status: 'in_progress', reminders: 0 }], // Kaisa
      [{ status: 'in_progress', reminders: 1 }, { status: 'pending', reminders: 0 }] // Ville
    ],
    // Demo 2: Myyntitiimi — overdue items (old meeting), reminders sent
    [
      [{ status: 'overdue', reminders: 3 }, { status: 'pending', reminders: 0 }], // Tero
      [{ status: 'done', reminders: 0 }, { status: 'overdue', reminders: 2 }],    // Outi
      [{ status: 'done', reminders: 1 }, { status: 'in_progress', reminders: 0 }] // Heikki
    ],
    // Demo 3: Projekti kickoff — mostly pending/in_progress (recent)
    [
      [{ status: 'in_progress', reminders: 0 }, { status: 'pending', reminders: 0 }], // Sanna
      [{ status: 'pending', reminders: 0 }, { status: 'pending', reminders: 0 }],     // Anna
      [{ status: 'pending', reminders: 0 }],                                           // Pekka
      [{ status: 'in_progress', reminders: 0 }],                                       // Liisa
      [{ status: 'done', reminders: 0 }, { status: 'pending', reminders: 0 }]          // Mikko
    ],
    // Demo 4: Johtoryhmä — mixed, some overdue budget
    [
      [{ status: 'pending', reminders: 0 }],                                           // Kaisa
      [{ status: 'done', reminders: 0 }, { status: 'pending', reminders: 0 }],         // Tero
      [{ status: 'in_progress', reminders: 0 }, { status: 'pending', reminders: 0 }],  // Heikki
      [{ status: 'in_progress', reminders: 0 }, { status: 'overdue', reminders: 3 }]   // Ville
    ]
  ];

  demos.forEach((demo, demoIdx) => {
    const meetingDate = meetingDates[demoIdx];
    const meetingId = 'meeting_sample_' + demoIdx;
    const meetingDateStr = meetingDate.toISOString().split('T')[0];

    // Save meeting
    Store.saveMeeting({
      id: meetingId,
      title: demo.parsed.title,
      date: meetingDateStr,
      transcript: demo.transcript,
      summary: demo.parsed.summary,
      participants: demo.parsed.participants.map(p => p.name),
      createdAt: meetingDate.toISOString()
    });

    // Save people & tasks
    demo.parsed.participants.forEach((participant, pIdx) => {
      const personId = participant.name.toLowerCase().replace(/\s+/g, '_')
        .replace(/[äå]/g, 'a').replace(/ö/g, 'o');

      // Save person (update if already exists from another meeting)
      Store.savePerson({
        id: personId,
        name: participant.name,
        avatar: participant.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        color: PERSON_COLORS[(demoIdx * 3 + pIdx) % PERSON_COLORS.length],
        taskCount: 0,
        completedCount: 0
      });

      participant.tasks.forEach((task, tIdx) => {
        const preset = presetStatuses[demoIdx]?.[pIdx]?.[tIdx] || { status: 'pending', reminders: 0 };
        const taskId = `task_sample_${demoIdx}_${pIdx}_${tIdx}`;

        const taskObj = {
          id: taskId,
          meetingId: meetingId,
          personId: personId,
          description: task.description,
          friendlyReminder: task.friendlyReminder,
          deadline: task.deadline,
          priority: task.priority || 'normal',
          status: preset.status,
          calendarCreated: false,
          reminderCount: preset.reminders,
          lastRemindedAt: preset.reminders > 0 ? new Date(now.getTime() - 86400000).toISOString() : null,
          completedAt: preset.status === 'done' ? new Date(now.getTime() - Math.random() * 3 * 86400000).toISOString() : null,
          createdAt: meetingDate.toISOString()
        };

        Store.saveTask(taskObj);

        // Generate reminder history for tasks that have been reminded
        for (let r = 1; r <= preset.reminders; r++) {
          const reminderDate = new Date(meetingDate.getTime() + r * 2 * 86400000);
          const reminderMsg = formatReminderMessage(r, participant.name, task.description);
          Store.saveReminder({
            id: `rem_sample_${demoIdx}_${pIdx}_${tIdx}_${r}`,
            taskId: taskId,
            personId: personId,
            message: reminderMsg,
            sentAt: reminderDate.toISOString(),
            type: r <= 2 ? 'gentle' : r <= 4 ? 'firmer' : 'urgent_but_still_loving'
          });
        }
      });
    });
  });

  // Rebuild people stats
  Store._rebuildPeople();
}

// ---- localStorage persistence layer ----

const Store = {
  _get(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch { return null; }
  },

  _set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // Meetings
  getMeetings() {
    return this._get('tm_meetings') || [];
  },
  saveMeeting(meeting) {
    const meetings = this.getMeetings();
    meetings.unshift(meeting);
    this._set('tm_meetings', meetings);
  },
  deleteMeeting(meetingId) {
    const meetings = this.getMeetings().filter(m => m.id !== meetingId);
    this._set('tm_meetings', meetings);
    // Also delete related tasks and reminders
    const tasks = this.getTasks().filter(t => t.meetingId !== meetingId);
    this._set('tm_tasks', tasks);
    const reminders = this.getReminders().filter(r => {
      const task = tasks.find(t => t.id === r.taskId);
      return !!task;
    });
    this._set('tm_reminders', reminders);
    this._rebuildPeople();
  },

  // Tasks
  getTasks() {
    return this._get('tm_tasks') || [];
  },
  saveTask(task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this._set('tm_tasks', tasks);
  },
  saveTasks(newTasks) {
    const tasks = this.getTasks();
    tasks.push(...newTasks);
    this._set('tm_tasks', tasks);
  },
  updateTask(taskId, updates) {
    const tasks = this.getTasks().map(t =>
      t.id === taskId ? { ...t, ...updates } : t
    );
    this._set('tm_tasks', tasks);
    this._rebuildPeople();
    return tasks.find(t => t.id === taskId);
  },
  getTasksForPerson(personId) {
    return this.getTasks().filter(t => t.personId === personId);
  },
  getTasksForMeeting(meetingId) {
    return this.getTasks().filter(t => t.meetingId === meetingId);
  },

  // People
  getPeople() {
    return this._get('tm_people') || [];
  },
  savePerson(person) {
    const people = this.getPeople();
    const existing = people.findIndex(p => p.id === person.id);
    if (existing >= 0) {
      people[existing] = { ...people[existing], ...person };
    } else {
      people.push(person);
    }
    this._set('tm_people', people);
  },
  _rebuildPeople() {
    const tasks = this.getTasks();
    const people = this.getPeople().map(p => {
      const personTasks = tasks.filter(t => t.personId === p.id);
      return {
        ...p,
        taskCount: personTasks.length,
        completedCount: personTasks.filter(t => t.status === 'done').length
      };
    });
    this._set('tm_people', people);
  },

  // Reminders
  getReminders() {
    return this._get('tm_reminders') || [];
  },
  saveReminder(reminder) {
    const reminders = this.getReminders();
    reminders.unshift(reminder);
    this._set('tm_reminders', reminders);
  },
  getRemindersForPerson(personId) {
    return this.getReminders().filter(r => r.personId === personId);
  },
  getRemindersForTask(taskId) {
    return this.getReminders().filter(r => r.taskId === taskId);
  },

  // Clear all
  clearAll() {
    localStorage.removeItem('tm_meetings');
    localStorage.removeItem('tm_tasks');
    localStorage.removeItem('tm_people');
    localStorage.removeItem('tm_reminders');
  }
};

// ---- Simulated transcript analysis ----

function simulateAnalysis(transcript) {
  // Check if it matches a demo transcript closely
  const demos = DEMO_TRANSCRIPTS[getLang()] || DEMO_TRANSCRIPTS.fi;
  for (const demo of demos) {
    if (transcript.trim() === demo.transcript.trim()) {
      return demo.parsed;
    }
  }

  // Simple pattern-based parsing for custom transcripts
  return simpleParseTranscript(transcript);
}

function simpleParseTranscript(transcript) {
  const lines = transcript.split('\n').filter(l => l.trim());
  const participants = new Map();

  // Try to detect names: look for patterns like "Name:" or "Name hoitaa/tekee/lupaa"
  const namePatterns = /^([A-ZÄÖÅ][a-zäöå]+(?:\s+[A-ZÄÖÅ][a-zäöå]+)?)\s*:/gm;
  const taskVerbs = /(?:hoitaa|tekee|lupaa|ottaa|kirjoittaa|päivittää|varmistaa|tarkistaa|handles|will|takes|writes|updates|verifies|checks|creates|finishes|prepares)/i;

  let match;
  while ((match = namePatterns.exec(transcript)) !== null) {
    const name = match[1];
    if (!participants.has(name)) {
      participants.set(name, []);
    }
  }

  // Try to extract tasks from lines
  for (const line of lines) {
    const colonMatch = line.match(/^([A-ZÄÖÅ][a-zäöå]+(?:\s+[A-ZÄÖÅ][a-zäöå]+)?)\s*:\s*(.+)/);
    if (colonMatch) {
      const speaker = colonMatch[1];
      const content = colonMatch[2];

      // Look for task assignments in content
      for (const [name] of participants) {
        const nameFirst = name.split(' ')[0];
        if (content.toLowerCase().includes(nameFirst.toLowerCase()) && taskVerbs.test(content)) {
          // Extract task description
          const taskDesc = content.replace(new RegExp(`${nameFirst}\\s+`, 'i'), '').trim();
          if (taskDesc.length > 10) {
            participants.get(name).push(taskDesc);
          }
        }
      }

      // Self-assigned tasks: "Mä teen...", "I'll handle..."
      if (/^(mä|mää|minä|mun|i'?ll|i will|i can)/i.test(content) && participants.has(speaker)) {
        const taskDesc = content.replace(/^(mä|mää|minä|mun pitäis?|i'?ll|i will|i can)\s*/i, '').trim();
        if (taskDesc.length > 10) {
          participants.get(speaker).push(taskDesc);
        }
      }
    }
  }

  // Build result
  const isFi = getLang() === 'fi';
  const today = new Date();
  const result = {
    title: lines[0] || (isFi ? 'Kokous' : 'Meeting'),
    summary: isFi
      ? `Kokouksessa käsiteltiin useita aiheita. Tunnistettiin ${participants.size} osallistujaa.`
      : `Multiple topics were discussed in the meeting. ${participants.size} participants identified.`,
    participants: []
  };

  let colorIdx = 0;
  for (const [name, tasks] of participants) {
    const personTasks = tasks.length > 0 ? tasks : [isFi ? 'Osallistui kokoukseen (ei tunnistettuja tehtäviä)' : 'Attended meeting (no identified tasks)'];

    result.participants.push({
      name,
      tasks: personTasks.map((desc, i) => {
        const deadline = new Date(today);
        deadline.setDate(deadline.getDate() + 3 + i * 2);
        const deadlineStr = deadline.toISOString().split('T')[0];

        return {
          description: desc,
          friendlyReminder: generateReminder(name, desc, isFi),
          deadline: deadlineStr,
          priority: 'normal'
        };
      })
    });
    colorIdx++;
  }

  return result;
}

function generateReminder(name, task, isFi) {
  const firstName = name.split(' ')[0];
  const templates = isFi ? [
    `${firstName} kulta, "${task}" odottaa vielä sinua. Se ei tee itseään — valitettavasti!`,
    `Hei ${firstName}, muistutetaan lempeästi: "${task}" kaipaa huomiotasi.`,
    `${firstName} hyvä, tuo "${task}" on vielä tekemättä. Uskomme sinuun!`,
    `Rakas ${firstName}, "${task}" lähetti sinulle terveisiä. Se toivoo tapaamista pian!`,
  ] : [
    `${firstName} dear, "${task}" is still waiting for you. It won't do itself — unfortunately!`,
    `Hey ${firstName}, just a gentle reminder: "${task}" needs your attention.`,
    `Dear ${firstName}, "${task}" is still on your plate. We believe in you!`,
    `Beloved ${firstName}, "${task}" sent you regards. It hopes to see you soon!`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

// ---- Helper to process parsed data into app models ----

function processParsedMeeting(parsed, transcript) {
  const now = new Date();
  const meetingId = 'meeting_' + now.getTime();

  const meeting = {
    id: meetingId,
    title: parsed.title,
    date: now.toISOString().split('T')[0],
    transcript: transcript,
    summary: parsed.summary,
    participants: parsed.participants.map(p => p.name),
    createdAt: now.toISOString()
  };

  const tasks = [];
  const people = [];

  parsed.participants.forEach((participant, pIdx) => {
    const personId = participant.name.toLowerCase().replace(/\s+/g, '_')
      .replace(/[äå]/g, 'a').replace(/ö/g, 'o');

    const existingPeople = Store.getPeople();
    const existingPerson = existingPeople.find(p => p.id === personId);

    if (!existingPerson) {
      people.push({
        id: personId,
        name: participant.name,
        avatar: participant.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        color: PERSON_COLORS[pIdx % PERSON_COLORS.length],
        taskCount: participant.tasks.length,
        completedCount: 0
      });
    }

    participant.tasks.forEach((task, tIdx) => {
      tasks.push({
        id: `task_${now.getTime()}_${pIdx}_${tIdx}`,
        meetingId: meetingId,
        personId: personId,
        description: task.description,
        friendlyReminder: task.friendlyReminder,
        deadline: task.deadline,
        priority: task.priority || 'normal',
        status: 'pending',
        calendarCreated: false,
        reminderCount: 0,
        lastRemindedAt: null,
        completedAt: null,
        createdAt: now.toISOString()
      });
    });
  });

  return { meeting, tasks, people };
}

// ---- Check for overdue tasks ----

function checkOverdueTasks() {
  const today = new Date().toISOString().split('T')[0];
  const tasks = Store.getTasks();
  let updated = false;

  tasks.forEach(task => {
    if (task.status !== 'done' && task.deadline < today && task.status !== 'overdue') {
      Store.updateTask(task.id, { status: 'overdue' });
      updated = true;
    }
  });

  return updated;
}
