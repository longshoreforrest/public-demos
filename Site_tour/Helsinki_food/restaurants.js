const SIILI_LOCATION = { lat: 60.1645462, lng: 24.9238060 };

const DAYS = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai'];
const DAYS_SHORT = ['ma', 'ti', 'ke', 'to', 'pe'];

// Viikon 15/2026 ruokalistat (7.4.-11.4.2026) - haettu ravintoloiden verkkosivuilta
const restaurants = [
    {
        id: 1,
        name: "HALO Food & Events",
        address: "Ruoholahdenkatu 21, 00180 Helsinki",
        lat: 60.1645462,
        lng: 24.9238060,
        hours: "ma-pe 11:00-13:30",
        price: "12.90-14.70 \u20ac",
        website: "https://halorestaurant.fi/lounas/",
        description: "Moderni lounas- ja tapahtumaravintola Siilin kanssa samassa rakennuksessa. Neljä lounasvaihtoehtoa: PICK IT (buffet 14\u20ac), CHOOSE IT (kasvis 14\u20ac), LOVE IT (lautasannos 14.70\u20ac), SOUP IT (keitto 12.90\u20ac). Kaikki sisältävät salaattipöydän, keiton, jälkiruoan ja kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Pick it 14\u20ac (buffet): Pannupaistetut lihapullat kermaisessa sipulikastikkeessa ja valkosipuliperunoita", "Choose it 14\u20ac (kasvis): Tuorejuustotäytteiset pinaatti-kasvispihvit", "Love it 14.70\u20ac: Paahdettuja possunribsejä ja juureksia", "Soup it 12.90\u20ac: Kasvis-orzokeitto", "Jälkiruoka: Biscoff-keksimurua ja kermavaahtoa"],
            keskiviikko: ["Pick it 14\u20ac (buffet): Intialainen voikana purjolla ja kikherneillä", "Choose it 14\u20ac (kasvis): Paahdettua halloumia ja bataattia", "Love it 14.70\u20ac: Voissa kypsennettyä kirjolohta ja tillikermaa", "Soup it 12.90\u20ac: Kermaista kurpitsakeittoa", "Jälkiruoka: Tuore marjasmoothie"],
            torstai: ["Pick it 14\u20ac (buffet): Possun tonkatsu, aasialainen BBQ-kastike ja coleslaw", "Choose it 14\u20ac (kasvis): Pinaatti-ricottalasagne", "Love it 14.70\u20ac: Voissa kypsennettyä kirjolohta ja tillikermaa", "Soup it 12.90\u20ac: Perinteistä hernekeittoa ja sinappia", "Jälkiruoka: Halon pannukakut mansikkahillolla"],
            perjantai: ["Pick it 14\u20ac (buffet): Taco Friday \u2013 vehnätortillat, kanafajita tai maustettu soijarouhe", "Choose it 14\u20ac (kasvis): Tacot soijarouheella", "Love it 14.70\u20ac: Voissa kypsennettyä kirjolohta ja tillikermaa", "Soup it 12.90\u20ac: Mustapapukeitto", "Jälkiruoka: Churrot kaneli-sokerilla ja suklaakastikkeella"]
        }
    },
    {
        id: 2,
        name: "Ravintola Aangan",
        address: "Hietalahdenkatu 8, 00180 Helsinki",
        lat: 60.1631435,
        lng: 24.9276874,
        hours: "ma-pe 11:00-15:00",
        price: "13.50-19.90 \u20ac",
        website: "https://aangan.fi/helsinki/lounaslista/",
        description: "Aito nepalilainen ravintola. Lounas sisältää basmatiriisin, naan-leivän, raitan, salaatin, kahvin tai nepalilaisen teen.",
        menu: {
            maanantai: ["Malai Kofta (G) 13.50\u20ac", "Gobi Sag (L,G,V) 13.50\u20ac", "Butter Chicken (L,G) 14.00\u20ac", "Achari Lamb (L,G) 13.90\u20ac", "Chili Fish (L,G) 13.50\u20ac", "Mix Thali 14.90\u20ac", "Tandoor King Prawn (G) 19.90\u20ac", "Mix Sizzler (L,G) 18.90\u20ac"],
            tiistai: ["Shahi Paneer (G) 13.50\u20ac", "Sag Chana (L,G,V) 13.50\u20ac", "Chicken Tikka Masala (L,G) 13.50\u20ac", "Lamb Kofta (L,G) 13.90\u20ac", "Shrimp Chili (L,G) 13.50\u20ac", "Mix Thali 14.90\u20ac", "Butter Chicken (L,G) 16.90\u20ac", "Lamb Sizzler (L,G) 16.90\u20ac"],
            keskiviikko: ["Paneer Butter Masala (G) 13.50\u20ac", "Alu Gobi (L,G,V) 13.50\u20ac", "Chicken Siraz (L,G) 13.50\u20ac", "Handi Lamb (L,G) 13.90\u20ac", "Shrimp Sag (L,G) 13.50\u20ac", "Mix Thali 14.90\u20ac", "Lamb Tikka Masala (G) 19.90\u20ac", "Butter King Prawn (L,G) 19.90\u20ac"],
            torstai: ["Sag Paneer (G) 13.50\u20ac", "Mushroom Tofu Masala (L,G,V) 13.50\u20ac", "Chicken Tikka Masala (L,G) 13.50\u20ac", "Achari Kabab (L,G) 13.90\u20ac", "Nariwal Fish (L,G) 13.50\u20ac", "Mix Thali 14.50\u20ac", "Butter Chicken (L,G) 16.90\u20ac", "Lamb Sizzler (L,G) 16.90\u20ac"],
            perjantai: ["Karahi Paneer (G) 13.50\u20ac", "Tofu Chana Masala (L,G,V) 13.50\u20ac", "Butter Chicken (L,G) 14.00\u20ac", "Pudina Lamb (L,G) 13.90\u20ac", "Sag Fish (L,G) 13.50\u20ac", "Mix Thali 14.90\u20ac", "Mango Chicken (L,G) 15.90\u20ac", "King Prawn Sizzler (L,G) 19.90\u20ac"]
        }
    },
    {
        id: 3,
        name: "Factory Ruoholahti",
        address: "Porkkalankatu 24, 00180 Helsinki",
        lat: 60.1639345,
        lng: 24.9070976,
        hours: "ma-pe 10:30-14:00",
        price: "13.70 \u20ac",
        website: "https://ravintolafactory.com/lounasravintolat/ravintolat/factory-ruoholahti/",
        description: "Laadukas ja runsas buffetlounas, jossa panostetaan tuoreuteen ja käsityöhön. Salaattipöytä, keitto, kolme lämmintä vaihtoehtoa, leipä ja jälkiruoka kahvilla.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Bataattikeitto tuoreella chilillä", "Tuliset unkarilaiset lihapullat paprikakastikkeella ja riisillä", "Kievin kana yrttivoilla, peruna-vuohenjuustogratinilla", "Tonnikala-pizza marinoidulla punasipulilla ja jalapenoilla", "Thaimaalainen kasviscurry kookoksella ja tofulla, riisi", "Jäätelöbaari"],
            keskiviikko: ["Vegaaninen misokeitto tofulla", "Seesami-paneroitu kananrinta chilikastikkeella ja sticky soijariisillä", "Uunimakkarat dijon-sinapilla ja juustolla, heitetyt perunat", "Talon pinaattipannukakut puolukkasoseella", "Kikherne-masala Gold & Green -suikaleilla", "Banoffee-vaahto"],
            torstai: ["Hernekeitto savukinkulla", "Factory-jauhelihapihvit kermakastikkeella, perunamuusi", "Lasagne Pollo Limonello", "Bataatti-tofu-chili korianterilla, basmatiiriisi", "Factory-pannukakut mansikkahillolla ja vaniljavaahdolla"],
            perjantai: ["Savuporokeitto juustokrutongeilla", "Kultainen rapea paneroitu kampela sitruuna-tillikastikkeella ja voiperunoilla", "Tee itse -tacot: kana- tai kasvis-mustapapuäyte", "Paistettu kimchiriisi kasviksilla", "Ranskalainen paahtoleipä vadelmahillolla ja kermavaahdolla"]
        }
    },
    {
        id: 4,
        name: "Hima & Sali",
        address: "Tallberginkatu 1 C, Kaapelitehdas, 00180 Helsinki",
        lat: 60.1618537,
        lng: 24.9057582,
        hours: "ma-pe 11:00-14:30",
        price: "10.00-13.00 \u20ac",
        website: "https://www.himasali.com/lounaslista/",
        description: "Kaapelitehtaan lounasravintola meren rannalla. Paras Lounas 2025 -palkittu. Kotiruokaa, kasvis- ja vegaanivaihtoehtoja, runsas salaattipöytä ja oma leipomo.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Marokkolaiset lammaslihapullat perunastuvilla ja sitruunajogurtilla 13.00\u20ac", "Kikherneecurry ja basmatiiriisi 13.00\u20ac", "Kookos-kasviskeitto 10.00\u20ac", "Uuniperunaa ja sriracha-katkarapuja 12.20\u20ac", "Pulled pork -leipä ja waldorfsalaatti 12.20\u20ac", "Savulohisalaatti ja dijon-perunasalaatti 12.20\u20ac"],
            keskiviikko: ["Massaman-kanacurry ja basmatiiriisi 13.00\u20ac", "Feta-jauhelihalasagne ja parmesan 13.00\u20ac", "Maa-artisokkakeitto ja paahdettu tattari 10.00\u20ac", "Uuniperunaa ja curry-kikhernetiä 12.20\u20ac", "Paahdettu tofu ja nuudelisalaatti 12.20\u20ac"],
            torstai: ["Paneroitu ahven, remouladekastike ja perunastuvit 13.00\u20ac", "Punajuuri-fetavuoka ja pinaattilettu 13.00\u20ac", "Hernekeitto ja pannukakku 10.00\u20ac", "Uuniperunaa ja sriracha-katkarapuja 12.20\u20ac", "Rapea kana ja gyoza-salaatti 12.20\u20ac"],
            perjantai: ["Paneroitu katsu-kana, keltainen curry ja riisi 13.00\u20ac", "Marokkolainen kikhernemuhennos, hummus ja couscous 13.00\u20ac", "Lohikeitto 11.50\u20ac", "Feta-pinaattipiirakka, paahdettu punajuurisalaatti 12.20\u20ac"]
        }
    },
    {
        id: 5,
        name: "Food & Co Ruoholahti",
        address: "Itämerenkatu 11-13, 00180 Helsinki",
        lat: 60.1635680,
        lng: 24.9157044,
        hours: "ma-pe 10:45-14:00",
        price: "13.80 \u20ac",
        website: "https://www.compass-group.fi/en/ravintolat-ja-ruokalistat/food--co/kaupungit/helsinki/ruoholahti/",
        description: "Pohjoismainen buffetlounas monipuolisella valikoimalla. Sisältää salaattipöydän, keiton, pääruoat, pizzan, jälkiruoan ja kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Linssisosekeitto (G,L,V)", "Porkkanaletuut ja rahka-yrtit (L)", "Chicken Tikka Masala (G,L)", "Riisi ja kotimaista kauraa (G,L,V)", "Lihapullat sinappikastikkeessa (G,L)", "Keitetyt perunat ja persilja (G,L,V)", "Marjarahka (G,L)", "Päivän pizza ja kasvis-pizza"],
            keskiviikko: ["Butternut-kurpitsasosekeitto (G,L,V)", "Kukkakaali-emmental-pähkinäpihvit (L,V)", "Tonnikala-pinaattilasagnette (L)", "Rapea kana Gochujang (L)", "Parmesaanimajoneesi (L)", "Paahdetut perunat (G,L,V)", "Suklaapuding, karamelli ja pähkinät (G,L)", "Päivän pizza ja kasvis-pizza"],
            torstai: ["Ahvenkeitto (G,L)", "Korealainen tofu Hot Dog (L,V)", "Paahdettua kanaa (G,L)", "Avokado-limejoghurtti (G,L)", "Rapea seijafilee ja ruohosipulijoghurtti (L)", "Perunamuusi (G,L)", "Crêpes, mansikkahillo ja kermavaahto", "Päivän pizza ja kasvis-pizza"],
            perjantai: ["Kukkakaalisosekeitto (G,L)", "Tofua, kasviksia ja pähkinöitä (G,L,V)", "Teriyaki-kana (G,L)", "Riisi (G,L,V)", "Grillattua possunpihviä ja pippurikastiketta (G,L)", "Kermaperunat (G,L)", "Food & Co jäätelöbuffet (G,L)", "Päivän pizza ja kasvis-pizza"]
        }
    },
    {
        id: 6,
        name: "Ravintola Kasi",
        address: "Itämerenkatu 25, 00180 Helsinki",
        lat: 60.1633222,
        lng: 24.9058595,
        hours: "ma-pe 10:30-14:00",
        price: "n. 12-13 \u20ac",
        website: "https://ravintolapalvelut.iss.fi/restaurant-kasi/",
        description: "ISS:n lounasravintola. Kaksi lautasannosta, buffet, keitto ja salaattipöytä kahvin ja jälkiruoan kera.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Korealaista buldak-kanaa munanuudeleilla (M,G)", "Tofua harissakastikkeessa ja confit-miniporkkanoita (V,G)", "Keitto: Kermainen latva-artisokkakeitto (L,G)", "Jälkiruoka: Porkkanakakkua (L,G)"],
            keskiviikko: ["Kalkkuna Cordon Bleu ja pinaatti-perunamuusi", "Satay-quornia, sweet chili -kurkkua ja jasmiiniriisi (M,G)", "Keitto: Välimeren kikhernekeitto (V,G)", "Jälkiruoka: Vadelma-mousse (L,G)"],
            torstai: ["Kana- ja katkarapupaella ja sitrussiirappi (M,G)", "Sinihomejuusto-gnoccheja, päärynää ja saksanpähkinöitä (L)", "Keitto: Perinteinen hernekeitto (V,G)", "Jälkiruoka: Pannukakkua, hilloa ja kermavaahtoa"],
            perjantai: ["Nyhtöpossuburgeri ja bataattiranskalaiset (M)", "Papu-linssipata ja sitrus-gremolata (V,G)", "Keitto: Punajuuri-vuohenjuustokeitto (L,G)", "Jälkiruoka: Jälkiruokasekoitelma"]
        }
    },
    {
        id: 7,
        name: "The Pantry Ruoholahti",
        address: "Itämerenkatu 3, 00180 Helsinki",
        lat: 60.1637101,
        lng: 24.9202490,
        hours: "ma-pe 11:00-13:30",
        price: "alk. 14.00 \u20ac",
        website: "https://thepantry.fi/en/ruoholahti",
        description: "Perinteistä ruokaa urbaanilla twistillä. Lounas tarjoillaan lautasannoksena \u2013 valitse kolmesta: kasvis, kala tai liha. Sisältää tuoreen salaatin.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Päivän liha-, kala- ja kasvisannos (katso thepantry.fi)"],
            keskiviikko: ["Päivän liha-, kala- ja kasvisannos (katso thepantry.fi)"],
            torstai: ["Päivän liha-, kala- ja kasvisannos (katso thepantry.fi)"],
            perjantai: ["Päivän liha-, kala- ja kasvisannos (katso thepantry.fi)"]
        }
    },
    {
        id: 8,
        name: "Konttiravintola Morton",
        address: "Ruoholahdenranta 8, 00180 Helsinki",
        lat: 60.1628699,
        lng: 24.9224480,
        hours: "ma-pe 11:00-14:00",
        price: "8.90-15.50 \u20ac",
        website: "https://morton.fi/lounas/",
        description: "Ainutlaatuinen konttiravintola merellisessä ympäristössä. Lounastarjous: päivän burgeri tai salaatti, sisältää kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Delaware Burger 14.50\u20ac", "Elisabeth's Salad 14.50\u20ac", "Lasten lounasburgeri 8.90\u20ac"],
            keskiviikko: ["Darby Burger 14.50\u20ac", "Lydia's Salad 14.50\u20ac", "Lasten lounasburgeri 8.90\u20ac"],
            torstai: ["Little John Burger 14.50\u20ac", "Sara's Salad 14.50\u20ac", "Lasten lounasburgeri 8.90\u20ac"],
            perjantai: ["Delaware Burger 14.50\u20ac", "Elisabeth's Salad 14.50\u20ac", "Lasten lounasburgeri 8.90\u20ac"]
        }
    },
    {
        id: 9,
        name: "Faro Ravintola",
        address: "Kellosaarenranta 2, 00180 Helsinki",
        lat: 60.1616478,
        lng: 24.9126921,
        hours: "ma-pe 11:00-14:00",
        price: "15.50-23.00 \u20ac",
        website: "https://faroravintola.fi/lounas/",
        description: "Merenrantabistro Ruoholahden kanavan varrella. Klassista bistroruokaa moderniilla otteella, sesongin parhaista raaka-aineista.",
        menu: {
            maanantai: ["Surf & turf: grillattua kanaa ja saffraaanimarinoidut jättikatkaravut, punaviinikastike, teriyaki-kaali, paahdetut perunat, aioli 15.50\u20ac", "Pinaattirisotto, buffalo mozzarella, yrttiöljy, paahdetut pähkinät 15.50\u20ac", "Chicken Caesar -salaatti 15.50\u20ac", "Grillattu entrecôte, punaviinikastike, kasvikset, lohkoperunat, aioli 23\u20ac", "Naudanlihapurgeri, ranskalaiset, dippi 18.50\u20ac", "Fish'n' chips, tartarkastike, keitetyt herneet 19.50\u20ac"],
            tiistai: ["Grillattu jauhelihapihvi, sienikastike, paahdetut perunat 15.50\u20ac", "Linguine, tomaattikastike, burrata, pesto 15.50\u20ac", "Rapusalaatti 15.50\u20ac", "Grillattu entrecôte, punaviinikastike, kasvikset, lohkoperunat, aioli 23\u20ac", "Naudanlihapurgeri, ranskalaiset, dippi 18.50\u20ac", "Fish'n' chips, tartarkastike, keitetyt herneet 19.50\u20ac"],
            keskiviikko: ["Marinoitua kanaa, tsatsiki, riisi, tilli-kurkku-sipulisalaatti 15.50\u20ac", "Linguine, tomaattikastike, burrata, pesto 15.50\u20ac", "Rapusalaatti 15.50\u20ac", "Grillattu entrecôte, punaviinikastike, kasvikset, lohkoperunat, aioli 23\u20ac", "Naudanlihapurgeri, ranskalaiset, dippi 18.50\u20ac", "Fish'n' chips, tartarkastike, keitetyt herneet 19.50\u20ac"],
            torstai: ["Sweet & chili -seitifile, perunamuusi, parsakaali 15.50\u20ac", "Veriappelsiinirisotto, paahdettu vuohenjuusto, pistaasit 15.50\u20ac", "Rapusalaatti 15.50\u20ac", "Grillattu entrecôte, punaviinikastike, kasvikset, lohkoperunat, aioli 23\u20ac", "Naudanlihapurgeri, ranskalaiset, dippi 18.50\u20ac", "Fish'n' chips, tartarkastike, keitetyt herneet 19.50\u20ac"],
            perjantai: ["Sous vide -naudan brisket, timjamikastike, punakaali, lohkoperunat, dijon-kerma 15.50\u20ac", "Veriappelsiinirisotto, paahdettu vuohenjuusto, pistaasit 15.50\u20ac", "Rapusalaatti 15.50\u20ac", "Grillattu entrecôte, punaviinikastike, kasvikset, lohkoperunat, aioli 23\u20ac", "Naudanlihapurgeri, ranskalaiset, dippi 18.50\u20ac", "Fish'n' chips, tartarkastike, keitetyt herneet 19.50\u20ac"]
        }
    },
    {
        id: 10,
        name: "Roihu",
        address: "Porkkalankatu 3, 00180 Helsinki",
        lat: 60.1648141,
        lng: 24.9106479,
        hours: "ma-pe 10:30-13:30",
        price: "13.80 \u20ac (keitto 9.90 \u20ac)",
        website: "https://www.compass-group.fi/ravintolat-ja-ruokalistat/muut-avoimet-ravintolat/kaupungit/helsinki/roihu/",
        description: "Suosittu lounaspaikka monipuolisella buffetilla. Salaattipöytä, jälkiruoka ja kahvi/tee kuuluvat hintaan. Seniorit -2\u20ac.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Luomutofu-kasviscurrya (G,L,V)", "Välimeren halloumipiirakkaa (L)", "Smetana-sinappiporsaspataa (L)", "Sitruunaista turskaa ja kesäkurpitsa-parsakaalipaistosta (G,L)", "Riisiä ja kotimaista kauraa (G,L,V)", "Keitetyt perunat (G,L,V)", "Vaniljakruunuviineri", "Keitto: Linssisosekeittoa (G,L,V)"],
            keskiviikko: ["Seitanlastuja (L,V)", "Rapeaa kanaa Gochujang (L)", "Paprikalla maustettuja lammasmurekepihvejä (L)", "Limellä maustettua jogurttia (G,L)", "Paahdetut yrttiperunat (G,L,V)", "Riisiä (G,L,V)", "Mokkapala (L)", "Keitto: Myskikurpitsasosekeittoa (G,L,V)"],
            torstai: ["Puttanescakastiketta (L,V)", "Bolognesekastiketta (G,L)", "Spagettia (L,V)", "Paahdettua kirjolohta (G,L)", "Ruohosipuli-kermaviilikastiketta (G,L)", "Bataatti-perunasosetta (G,L,V)", "Ohukaisia, mansikkahilloa ja kermavaahtoa", "Keitto: Pinaattikeittoa ja keitetty kananmuna (G,L,V)"],
            perjantai: ["Maustettua nyhtökauraa ja kevätsipulia (G,L,V)", "Broileri-kasvistäytettä ja tortillaa (G,L)", "Tuoretomaattisalsa, guacamole ja jogurtti", "Riisiä (G,L,V)", "Possun grillipihvi ja pippurinen tuorejuustokastike (G,L)", "Churrot ja suklaakastike (L)", "Keitto: Lanttusosekeittoa (G,L)"]
        }
    },
    {
        id: 11,
        name: "Antell Explorer",
        address: "Tammasaarenkatu 1-5, 00180 Helsinki",
        lat: 60.1610350,
        lng: 24.9037586,
        hours: "ma-pe 11:00-13:30",
        price: "13.20 \u20ac",
        website: "https://antell.fi/en/lunch/helsinki/explorer/",
        description: "Antellin lounasravintola runsaalla buffetilla. Sisältää pääruoat, monipuolinen salaatti, leipä, jälkiruoka ja kahvi/tee. Joka päivä burgeri ja keitto.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Kreikkalaiset uuniperunat", "Curry-kukkakaalkeitto", "Nakit", "Kookoskana maapähkinäkastikkeessa", "Lisäke: uuniperunat, paahdettuja kasviksia, BBQ-majoneesi", "Jälkiruoka: Mustikka-kardemummarahka"],
            keskiviikko: ["Riistapaistosta", "Vindaloo \u2013 Intialainen kalkkunacurry", "Palak paneer \u2013 pinaatti-juustopata", "Mustasakerakeitto", "Lisäke: perunamuusi, jasmiiniriisi, paahdettu punajuuri, puolukkasose", "Jälkiruoka: Kaura-omenapaistos ja vaniljakastike"],
            torstai: ["Kotitehdyt jauhelihapihvit", "Kana caesarkastikkeessa", "Punajuuri-vuohenjuustovuoka", "Kasvis-hernekeitto", "Lisäke: paistinperunat, pitkäjyväinen riisi, curry-paahdettu kukkakaali, herkkusienikastike", "Jälkiruoka: Kotitehdyt ohukkaat, marjahillo ja kermavaahto"],
            perjantai: ["Kotitehdyt manteliset kalaleikkeet", "Kievin kana", "Kotitehdyt kasvispihvit", "Pinaattikeitto ja keitetty muna", "Lisäke: keitetyt perunat, paksuiksi leikatut ranskalaiset, seesamiparsakaali, mango- ja tsatsikimajoneesi", "Jälkiruoka: Jäätelö ja mansikkahillo"]
        }
    },
    {
        id: 12,
        name: "The Local Kitchen Poijut",
        address: "Porkkalankatu 20 A, 00180 Helsinki",
        lat: 60.1640507,
        lng: 24.9114255,
        hours: "ma-to 11:00-13:30, pe 11:00-13:00",
        price: "13.10 \u20ac",
        website: "https://www.compass-group.fi/en/ravintolat-ja-ruokalistat/food--co/kaupungit/helsinki/the-local-kitchen-poijut/",
        description: "Rento kasvispainotteinen lounasravintola. Buffet sisältää salaattipöydän, lämpimän lounaan, jälkiruoan ja kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Parsakaalisosekeitto", "Talon tofu-parsakaalipihvit, wasabi-hernekaura", "Rapea kana, avokado-smetana", "Lihapullat tomaattikastikkeessa", "Paahdetut perunat, chilimajoneesi ja korianteri", "Jälkiruoka: Talon porkkanakakku"],
            keskiviikko: ["Yrtti-porkkanasosekeitto", "Kasvis-chili ja riisiä", "Jerk-kana jamaikalaistapaan, mangochutney ja chili", "Talon kirjolohimureke, piparjuuri-hollandaise", "Keitetyt perunat ja tilliä", "Jälkiruoka: Banoffee-juustokakkuvaahto"],
            torstai: ["Palsternakkasosekeitto", "Talon pinaattiletut ja puolukkahillo", "Keitetyt perunat ja persilja", "Talon lasagne", "Korealainen kana, paahdettu butternut-squash ja gochujang-majoneesi", "Riisiä ja kotimaista kauraa", "Jälkiruoka: Talon pannukakku, mansikkahillo ja kermavaahto"],
            perjantai: ["Puutarhurin juuressosekeitto", "Mö chavre -kasvispihvit ja salsa verde", "Riisiä ja kotimaista kauraa", "Rigatoni-katkarapu-tilli ja pastajuusto", "Wienerschnitzel ja perunamuusi", "Jälkiruoka: Food & Co jäätelöbuffet"]
        }
    },
    {
        id: 13,
        name: "Ravintola Sewa",
        address: "Itämerenkatu 12, 00180 Helsinki",
        lat: 60.1632941,
        lng: 24.9169668,
        hours: "ma-pe 10:30-15:00",
        price: "13.90 \u20ac",
        website: "https://sewa.fi/en/",
        description: "Nepalilainen ravintola Ruoholahden metroaseman lähellä. Lounas sisältää basmatiriisin, naan-leivän, salaatin ja kahvin tai nepalilaisen teen.",
        menu: {
            maanantai: ["Veg Kofta Chilli (G,L) 13.90\u20ac", "Shahi Paneer (G) 13.90\u20ac", "Chicken Tikka Masala (G) 13.90\u20ac", "Lamb Vindalo (G,L) 13.90\u20ac", "Fish Korma (G,L) 13.90\u20ac", "Rojeko Khaja (2 annosta) 15.90\u20ac", "King Prawn Tikka Special (G) 17.90\u20ac"],
            tiistai: ["Paneer Masala (G) 13.90\u20ac", "Saag Tofu (G) 13.90\u20ac", "Butter Chicken (G) 13.90\u20ac", "Lamb Kofta (G,L) 13.90\u20ac", "King Prawn Chili (G,L) 13.90\u20ac", "Rojeko Khaja (2 annosta) 15.90\u20ac", "Chicken Tikka Special (G,L) 17.90\u20ac"],
            keskiviikko: ["Tofu Chili (G,L) 13.90\u20ac", "Malai Kofta (G) 13.90\u20ac", "Kadai Chicken (G,L) 13.90\u20ac", "Lamb Saag (G,L) 13.90\u20ac", "Fish Chili (G,L) 13.90\u20ac", "Rojeko Khaja (2 annosta) 15.90\u20ac", "Tandoori Mix Special (G) 17.90\u20ac"],
            torstai: ["Aloo Gobi (G,L) 13.90\u20ac", "Palak Paneer (G) 13.90\u20ac", "Chicken Korma (G) 13.90\u20ac", "Lamb Tikka (G,L) 13.90\u20ac", "Fish Masala (G,L) 13.90\u20ac", "Rojeko Khaja (2 annosta) 15.90\u20ac"],
            perjantai: ["Chana Masala (G,L,V) 13.90\u20ac", "Paneer Butter Masala (G) 13.90\u20ac", "Mango Chicken (G) 13.90\u20ac", "Lamb Curry (G,L) 13.90\u20ac", "Fish Tikka (G,L) 13.90\u20ac", "Rojeko Khaja (2 annosta) 15.90\u20ac"]
        }
    },
    {
        id: 14,
        name: "Gresa",
        address: "Itämerenkatu 1, 00180 Helsinki",
        lat: 60.1638792,
        lng: 24.9206189,
        hours: "ma-pe 10:45-13:45",
        price: "14.00 \u20ac",
        website: "https://gvcravintolat.fi/gresa/",
        description: "Skandinaavinen buffetravintola Ruoholahdessa. 92% suosittelee. Monipuolinen buffet sisältäen kasvisvaihtoehtoja.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Skandinaavinen buffet: päivittäin vaihtuva (katso gvcravintolat.fi)"],
            keskiviikko: ["Skandinaavinen buffet: päivittäin vaihtuva (katso gvcravintolat.fi)"],
            torstai: ["Skandinaavinen buffet: päivittäin vaihtuva (katso gvcravintolat.fi)"],
            perjantai: ["Skandinaavinen buffet: päivittäin vaihtuva (katso gvcravintolat.fi)"]
        }
    },
    {
        id: 15,
        name: "Antell Femma",
        address: "Itämerenkatu 5, 00180 Helsinki",
        lat: 60.1641902,
        lng: 24.9189664,
        hours: "ma-pe 10:30-13:30",
        price: "13.90 \u20ac",
        website: "https://www.antell.fi/femma/",
        description: "Antellin lounasravintola Ruoholahdessa. Buffet sisältää pääruoat, salaattipöydän, oman leivän, jälkiruoan ja luomukahvin.",
        menu: {
            maanantai: ["Suljettu (pääsiäinen)"],
            tiistai: ["Paahdettua kirjolohta ja tilli-perunasosetta", "Sitruuna-tillikerma", "Kasvisvaihtoehto: Porkkanaletut", "Luomukahvi ja jälkiruoka"],
            keskiviikko: ["Oskarinleikkeet choronkastikkeella", "Härkis-pihvit (V)", "Pannukakku marjoilla ja kermavaahdolla", "Luomukahvi"],
            torstai: ["Kermainen kirjolohikeitto", "Juusto-pinaattipiirakka", "Omena-kanelipiirakka ja vaniljakastike", "Luomukahvi"],
            perjantai: ["Suljettu (pääsiäinen)"]
        }
    },
    {
        id: 16,
        name: "Mekong Ravintola",
        address: "Lapinrinne 2, 00180 Helsinki",
        lat: 60.1663432,
        lng: 24.9266191,
        hours: "ma-pe 11:00-15:00",
        price: "12.70 \u20ac (buffet)",
        website: "https://mekong.restaurant/",
        description: "Vietnamilainen ravintola Kampin lähellä. Lounasbuffet tai yksittäiset annokset. Salaattipöytä, tee/kahvi ja jälkiruoka kuuluvat hintaan.",
        menu: {
            maanantai: ["Lounasbuffet ja salaattipöytä 12.70\u20ac", "Hu Tieu -keitto: tapiokanuudelit possukastikkeessa, jättikatkarapu, possu, viiriäisenmuna 15.90\u20ac", "Pho Bo Tai Nam \u2013 perinteinen vietnamilainen pho-nuudelikeitto 15.90\u20ac", "Bun thit xao \u2013 sitruunaruoho-wokpossu riisinuudeleilla 14.90\u20ac", "Hu Tieu Chay \u2013 vegaaninen tapiokanuudelikeitto 15.90\u20ac", "Vegan Pho \u2013 riisinuudelit kasvisliemessä tofulla 15.90\u20ac"],
            tiistai: ["Lounasbuffet ja salaattipöytä 12.70\u20ac", "Hu Tieu -keitto 15.90\u20ac", "Pho Bo Tai Nam 15.90\u20ac", "Bun thit xao 14.90\u20ac", "Hu Tieu Chay (V) 15.90\u20ac", "Vegan Pho (V) 15.90\u20ac"],
            keskiviikko: ["Lounasbuffet ja salaattipöytä 12.70\u20ac", "Hu Tieu -keitto 15.90\u20ac", "Pho Bo Tai Nam 15.90\u20ac", "Bun thit xao 14.90\u20ac", "Hu Tieu Chay (V) 15.90\u20ac", "Vegan Pho (V) 15.90\u20ac"],
            torstai: ["Lounasbuffet ja salaattipöytä 12.70\u20ac", "Hu Tieu -keitto 15.90\u20ac", "Pho Bo Tai Nam 15.90\u20ac", "Bun thit xao 14.90\u20ac", "Hu Tieu Chay (V) 15.90\u20ac", "Vegan Pho (V) 15.90\u20ac"],
            perjantai: ["Lounasbuffet ja salaattipöytä 12.70\u20ac", "Hu Tieu -keitto 15.90\u20ac", "Pho Bo Tai Nam 15.90\u20ac", "Bun thit xao 14.90\u20ac", "Hu Tieu Chay (V) 15.90\u20ac", "Vegan Pho (V) 15.90\u20ac"]
        }
    },
    // --- KAMPPI ---
    {
        id: 17,
        name: "Factory Kamppi",
        address: "Runeberginkatu 3, 00100 Helsinki",
        lat: 60.1710,
        lng: 24.9305,
        hours: "ma-pe 10:30-15:00",
        price: "13.70 \u20ac",
        website: "https://factorykamppi.com/lounas/",
        description: "Suosittu buffetlounas Kampin Autotalossa. Runsas salaattip\u00f6yt\u00e4, keitto, kolme l\u00e4mmint\u00e4 vaihtoehtoa, leip\u00e4, j\u00e4lkiruoka ja kahvi/tee. My\u00f6s iltabuffet ke-pe.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Kukkakaalikeitto tryffeli\u00f6ljyll\u00e4", "Pannupaistetut jauhelihapihvit karamellisoiduilla sipuleilla, perunagratini vuohenjuustolla", "Rapea Kievin kana yrttivoilla ja sahraamiriisill\u00e4", "Vegaaninen pinaatti-tofucurry basmatiriisill\u00e4", "J\u00e4lkiruoka: J\u00e4\u00e4tel\u00f6baari"],
            keskiviikko: ["Palsternakka-basilikakeitto", "Grillattu kananrinta chimichurrilla ja kasvisriisill\u00e4", "Makkarastroganoff smetanalla ja perunamuusilla", "Kasvis-Pad Thai kasvisprojeksilla ja p\u00e4hkin\u00f6ill\u00e4", "J\u00e4lkiruoka: Passionhelm\u00e4-karamellileivos"],
            torstai: ["Hernekeitto", "Factory-lihapullat paprikakastikkeessa ja paahdettuja perunalohkoja", "Paneroitu kananrinta b\u00e9arnaise-dipill\u00e4", "Nepalilainen Dal Makhani basmatiriisill\u00e4", "J\u00e4lkiruoka: Pannukakut mansikkahillolla ja kermavaahdolla"],
            perjantai: ["Lohikeitto", "Paneroitu kampela, perunamuusi ja remoulade-dippi", "Kreikkalainen kanalasagne mozzarellalla", "Kasvislasagne vegaanijuustolla", "J\u00e4lkiruoka: Ranskalainen paahtoleip\u00e4 mansikkahillolla"]
        }
    },
    {
        id: 18,
        name: "Ravintola Kansis",
        address: "Kansakoulukuja 1, 00100 Helsinki",
        lat: 60.1688,
        lng: 24.9300,
        hours: "ma-pe 11:00-14:00",
        price: "14.00-14.70 \u20ac",
        website: "https://ravintolakansis.fi/lounas/",
        description: "Moderni lounas- ja tapahtumaravintola Kampissa. Kolme lounasvaihtoehtoa: A & B (14\u20ac), C (14.70\u20ac). J\u00e4lkiruoka ja kahvi +2\u20ac.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["A) Provencen yrteill\u00e4 marinoitua kananpoikaa, couscousia ja tzatzikia 14\u20ac", "B) Pinaattit\u00e4ytteiset juustopihvit, munakoiso-kvinoa ja tomaattichutney 14\u20ac", "C) Kaali-k\u00e4\u00e4ryleet naudanrinnasta, puolukkakastike ja yrttiohrapuuroa 14.70\u20ac"],
            keskiviikko: ["A) Grillattu possunulkofilee b\u00e9arnaisella ja paahdettu peruna-parsasalaatti 14\u20ac", "B) Voicurry-tofu mausteisessa tomaatti-kermakastikkeessa ja basmatiriisi 14\u20ac", "C) Mantelikala \u2013 kevyesti hiillostettu kuha ja valkoviinikastike 14.70\u20ac"],
            torstai: ["A) Oluessa haudutettua riistak\u00e4ristyst\u00e4, juurespyree ja haudutettuja puolukoita 14\u20ac", "B) Gnocchi sitruunakastikkeessa, ricotta-mousse ja aurinkokuivatut tomaatit 14\u20ac", "C) Manteli-nieri\u00e4, valkoviinikastike ja paahdettuja perunoita 14.70\u20ac"],
            perjantai: ["A) Cheddar-jalape\u00f1o-burgeri briossilla ja ranskalaiset 14\u20ac", "B) Chili sin carne, avokado-mousse, riisi ja maissisalsa 14\u20ac", "C) Mantelikala, valkoviinikastike ja paahdettuja perunoita 14.70\u20ac"]
        }
    },
    {
        id: 19,
        name: "Sandro Kortteli",
        address: "Urho Kekkosen katu 1, 00100 Helsinki",
        lat: 60.1690,
        lng: 24.9330,
        hours: "ma-pe 11:00-15:00",
        price: "14.70 \u20ac",
        website: "https://www.sandro.fi/en/lunch/",
        description: "Pohjoisafrikkalainen lounasravintola Kamppi Korttelissa. Lounas sis\u00e4lt\u00e4\u00e4 salaattip\u00f6yd\u00e4n, falafelin, l\u00e4mpim\u00e4t lis\u00e4kkeet, kahvin/teen ja j\u00e4\u00e4tel\u00f6n.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Kanaa tulisessa tomaattikastikkeessa 14.70\u20ac", "H\u00e4rk\u00e4papuinen tagine mausteisella riisill\u00e4 (V) 14.70\u20ac", "Salaattip\u00f6yt\u00e4 ja falafelit kuuluvat hintaan"],
            keskiviikko: ["Naudanlihaa punaviinikastikkeessa 14.70\u20ac", "Kikherne-tagine ja couscous (V) 14.70\u20ac", "Salaattip\u00f6yt\u00e4 ja falafelit kuuluvat hintaan"],
            torstai: ["Valkoista kalaa sitruuna-yrttikastikkeella 14.70\u20ac", "Kurpitsa-tagine paahdetuilla perunoilla (V) 14.70\u20ac", "Salaattip\u00f6yt\u00e4 ja falafelit kuuluvat hintaan"],
            perjantai: ["Possua sahramikastikkeessa 14.70\u20ac", "H\u00e4rk\u00e4papuinen tagine lohkoperunoilla (V) 14.70\u20ac", "Salaattip\u00f6yt\u00e4 ja falafelit kuuluvat hintaan"]
        }
    },
    {
        id: 20,
        name: "Don Corleone",
        address: "Urho Kekkosen katu 1, 00100 Helsinki",
        lat: 60.1691,
        lng: 24.9332,
        hours: "ma-pe 11:00-14:30",
        price: "13.50-17.90 \u20ac",
        website: "https://doncorleone.fi/en/lunch/",
        description: "Italialainen ravintola Kampin keskuksessa. Lounaalla pastoja, salaatteja ja grillattuja annoksia lautasannoksina.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Insalata di Pollo \u2013 grillattu kanasalaatti 13.50\u20ac", "Spaghetti Porta Susa \u2013 sieni, tryffeli, parmesaanikastike 13.50\u20ac", "Penne alla Coppola \u2013 kana-paprika ja gorgonzola 14.20\u20ac", "Ravioli Tricolore \u2013 pinaatti-ricotta, vuohenjuusto 14.80\u20ac", "Pollo ai Beige \u2013 grillattua kanaa, punaviini-vuohenjuusto 16.90\u20ac", "Salmone alle Erbe \u2013 grillattua merilohta yrttiöljyll\u00e4 17.90\u20ac"],
            keskiviikko: ["Insalata di Pollo 13.50\u20ac", "Spaghetti Porta Susa 13.50\u20ac", "Penne alla Coppola 14.20\u20ac", "Ravioli Tricolore 14.80\u20ac", "Pollo ai Beige 16.90\u20ac", "Salmone alle Erbe 17.90\u20ac"],
            torstai: ["Insalata di Pollo 13.50\u20ac", "Spaghetti Porta Susa 13.50\u20ac", "Penne alla Coppola 14.20\u20ac", "Ravioli Tricolore 14.80\u20ac", "Pollo ai Beige 16.90\u20ac", "Salmone alle Erbe 17.90\u20ac"],
            perjantai: ["Insalata di Pollo 13.50\u20ac", "Spaghetti Porta Susa 13.50\u20ac", "Penne alla Coppola 14.20\u20ac", "Ravioli Tricolore 14.80\u20ac", "Pollo ai Beige 16.90\u20ac", "Salmone alle Erbe 17.90\u20ac"]
        }
    },
    {
        id: 21,
        name: "Henry's Distillery",
        address: "Narinkkatori 2, 00100 Helsinki",
        lat: 60.1685,
        lng: 24.9320,
        hours: "ma-pe 11:00-14:00",
        price: "14.00 \u20ac",
        website: "https://www.kulttuurikasarminravintolat.fi/en/henrys-distillery-en/",
        description: "Ravintola ja baari Narinkkatorilla Kampin vieress\u00e4. Lounas sis\u00e4lt\u00e4\u00e4 salaattibuffetin, leiv\u00e4n ja levitteet. Viikon erikoisburgeri 15.70\u20ac.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Kievin kana sitruunamajoneesilla 14\u20ac", "Mustajuuririsotto paahdetuilla manteleilla (kasvis, G) 14\u20ac", "Perunamuusi"],
            keskiviikko: ["Lohipata punajuurella 14\u20ac", "Pinaattiraviolit pesto-tomaattikastikkeessa 14\u20ac"],
            torstai: ["Italialaiset lihapullat tomaattikastikkeessa 14\u20ac", "Parmesaanirisotto 14\u20ac", "Kasvis-soijacurry 14\u20ac"],
            perjantai: ["Harissa-possunkaula 14\u20ac", "Kukkakaalisiivet (kasvis, G) 14\u20ac", "Vohveliranskalaiset ja jogurttikastike"]
        }
    },
    {
        id: 22,
        name: "Bistro Manu",
        address: "Etel\u00e4inen Rautatiekatu 4, 00100 Helsinki",
        lat: 60.1700,
        lng: 24.9335,
        hours: "ma-pe 11:00-14:00",
        price: "13.50-15.00 \u20ac",
        website: "https://www.raflaamo.fi/en/restaurant/helsinki/bistro-manu/menu/lunch",
        description: "Hotelli Presidentin lounasravintola. Monipuolinen buffetlounas (15\u20ac) tai keitto- ja salaattilounas (13.50\u20ac). Vaihtuva viikkomenu.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Buffet 15\u20ac: Paahdettua kanaa tulisella harissa-kermakastikkeella", "Pinaattiletut puolukkamurskeella", "Kvinoa ja kasviksia", "Kalakeitto"],
            keskiviikko: ["Buffet 15\u20ac: Inkiv\u00e4\u00e4ri-hunajapossua kastikkeessa", "Kikherne-kasviscurry ja riisi\u00e4", "H\u00f6yrytetty\u00e4 kukka- ja parsakaalia", "Maa-artisokakeitto"],
            torstai: ["Buffet 15\u20ac: Paistettua muikkua tillikermaviilikastikkeella", "Punajuuripihvit tillikermalla", "Perunamuusi ja juurespaahtoa", "Hernekeitto ja pannukakku hillolla ja kermavaahdolla"],
            perjantai: ["Buffet 15\u20ac: Uunilohta sienikermakastikkeella", "Paahdettuja perunoita ja kauden kasviksia", "Porkkana-inkiv\u00e4\u00e4rikeitto ja paahdettua tofua"]
        }
    },
    {
        id: 23,
        name: "Innovation Home Kamppi",
        address: "Kansakoulukatu 3, 00100 Helsinki",
        lat: 60.1690,
        lng: 24.9308,
        hours: "ma-pe 11:00-13:30",
        price: "14.00 \u20ac",
        website: "https://www.lounaat.info/lounas/innovation-home-kamppi/helsinki",
        description: "Lounasbuffet Innovation Home -tiloissa Kampissa. Sis\u00e4lt\u00e4\u00e4 salaattip\u00f6yd\u00e4n, p\u00e4\u00e4ruoat, j\u00e4lkiruoan ja kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Buffet 14\u20ac: Juurespihvit majoneesilla ja uuniperunoilla (V)", "Kievin kana majoneesilla ja uuniperunoilla (L)", "Salaattip\u00f6yt\u00e4, j\u00e4lkiruoka ja kahvi/tee"],
            keskiviikko: ["Buffet 14\u20ac: Uuniperunat \u2013 'No chicken' -t\u00e4yte (V) tai lohi-/kanat\u00e4yte (L)", "Salaattip\u00f6yt\u00e4, j\u00e4lkiruoka ja kahvi/tee"],
            torstai: ["Buffet 14\u20ac: Voi-'no chicken' riisill\u00e4 ja raitalla (V)", "Voikana riisill\u00e4 ja raitalla (L)", "Salaattip\u00f6yt\u00e4, j\u00e4lkiruoka ja kahvi/tee"],
            perjantai: ["Buffet 14\u20ac: Aasialainen buffet \u2013 kanasuikaleita, Pad Thai (V), dumplingeja (L)", "Salaattip\u00f6yt\u00e4, j\u00e4lkiruoka ja kahvi/tee"]
        }
    },
    {
        id: 24,
        name: "John Scott's Arkadia",
        address: "Salomonkatu 1, 00100 Helsinki",
        lat: 60.1706,
        lng: 24.9355,
        hours: "ma-pe 11:00-14:00",
        price: "11.90-13.50 \u20ac",
        website: "https://johnscotts.se/arkadia/john-scotts-lunch/",
        description: "Brittil\u00e4istyylinen pubi Salomonkadulla. Buffetlounas 13.50\u20ac sis\u00e4lt\u00e4\u00e4 salaattibarin, leiv\u00e4n, kahvin/teen. Keittolounas 11.90\u20ac, seniorit (13-14) 11.50\u20ac.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Borssikeitto", "Lihapullat kermakastikkeessa ja puolukkahillolla", "Paahdettua kanaa kermacurrykastikkeella", "Tofu-kasvispata", "Perunamuusi ja riisi"],
            keskiviikko: ["Kermainen latva-artisokakeitto", "Jauhelihapihvit pippurikastikkeella ja puolukkahillolla", "Broileria vihre\u00e4ll\u00e4 currykastikkeella", "Kikhernepata", "Lohkoperunat ja riisi"],
            torstai: ["Hernekeitto ja pannukakku", "Kievin kana chili-majoneesilla", "Turska voikastikkeessa", "Chili con verdura", "Valkosipuliperunat ja riisi"],
            perjantai: ["Minestronekeitto", "Kanapihvit kermakastikkeessa", "Maksapihvit sipuli-sinappikastikkeessa ja puolukkahillolla", "Tofu korma", "Perunamuusi ja riisi"]
        }
    },
    {
        id: 25,
        name: "Antell Pikkuarkadia",
        address: "Arkadiankatu 4-6, 00100 Helsinki",
        lat: 60.1718,
        lng: 24.9296,
        hours: "ma-pe 11:00-13:30",
        price: "13.70 \u20ac",
        website: "https://antell.fi/lounas/helsinki/pikkuarkadia/",
        description: "Antellin lounasravintola Pikkuarkadia-talossa. Buffet sis\u00e4lt\u00e4\u00e4 p\u00e4\u00e4ruoat lisukkeineen, salaatin, leiv\u00e4n, j\u00e4lkiruoan ja kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Kookos-sitruunaruoho-kanakastike", "Maissikeitto", "J\u00e4lkiruoka: Hedelm\u00e4salaatti ja kahvi"],
            keskiviikko: ["Naudanliha-ragugnocchit", "Tulinen hapanimel\u00e4 kanakeitto", "J\u00e4lkiruoka: Appelsiinikiisseli ja kahvi"],
            torstai: ["Lihapullat ja kermaperunat", "Falafelpallot", "Tomaatti-vuohenjuustokeitto", "J\u00e4lkiruoka: Pannukakut kermavaahdolla ja hillolla, kahvi"],
            perjantai: ["Pyttipannu suolakurkulla", "Riistapata juureksilla", "J\u00e4lkiruoka: Porkkanakakku ja kahvi"]
        }
    },
    {
        id: 26,
        name: "La Torrefazione Lasipalatsi",
        address: "Mannerheimintie 22, 00100 Helsinki",
        lat: 60.1710,
        lng: 24.9385,
        hours: "ma-pe 11:00-14:30",
        price: "14.00-16.90 \u20ac",
        website: "https://www.lounaat.info/lounas/la-torrefazione-lasipalatsi/helsinki",
        description: "Italialainen kahvila-ravintola Lasipalatsissa. Lautasannoksia: pasta, risotto ja pok\u00e9 bowleja.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Pasta marinara chorizolla ja burratalla 14\u20ac", "Appelsiini-sahramirisotto katkaravuilla (G,L) 14.90\u20ac", "Teriyaki-tofu bowl kookosriisill\u00e4 (V) 15.90\u20ac", "Teriyaki-lohi bowl kookosriisill\u00e4 (L) 16.90\u20ac"],
            keskiviikko: ["Pasta marinara chorizolla ja burratalla 14\u20ac", "Appelsiini-sahramirisotto katkaravuilla (G,L) 14.90\u20ac", "Teriyaki-tofu bowl kookosriisill\u00e4 (V) 15.90\u20ac", "Teriyaki-lohi bowl kookosriisill\u00e4 (L) 16.90\u20ac"],
            torstai: ["Pasta marinara chorizolla ja burratalla 14\u20ac", "Appelsiini-sahramirisotto katkaravuilla (G,L) 14.90\u20ac", "Teriyaki-tofu bowl kookosriisill\u00e4 (V) 15.90\u20ac", "Teriyaki-lohi bowl kookosriisill\u00e4 (L) 16.90\u20ac"],
            perjantai: ["Pasta marinara chorizolla ja burratalla 14\u20ac", "Appelsiini-sahramirisotto katkaravuilla (G,L) 14.90\u20ac", "Teriyaki-tofu bowl kookosriisill\u00e4 (V) 15.90\u20ac", "Teriyaki-lohi bowl kookosriisill\u00e4 (L) 16.90\u20ac"]
        }
    },
    {
        id: 27,
        name: "Caf\u00e9 Lasipalatsi",
        address: "Mannerheimintie 22-24, 00100 Helsinki",
        lat: 60.1708,
        lng: 24.9382,
        hours: "ma-pe 11:00-14:30",
        price: "14.00 \u20ac",
        website: "https://www.lounaat.info/lounas/cafe-lasipalatsi/helsinki",
        description: "Buffetlounas historiallisessa Lasipalatsissa. Sis\u00e4lt\u00e4\u00e4 salaattip\u00f6yd\u00e4n, keiton, p\u00e4\u00e4ruoat, leiv\u00e4n, j\u00e4lkiruoan ja kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Buffet 14\u20ac: Paistettua muikkua, perunamuusia ja tilli-kermakastiketta", "Kaalilaatikko (kasvis)", "Tomaatti-linssisosekeitto", "Kahvi/tee ja j\u00e4lkiruoka"],
            keskiviikko: ["Buffet 14\u20ac: Riistak\u00e4ristyst\u00e4, perunamuusia ja puolukkaa", "Kasvispasta", "Kukkakaali-currykeitto", "Kahvi/tee ja j\u00e4lkiruoka"],
            torstai: ["Buffet 14\u20ac: Lyonin kanaa ja basilikariisi\u00e4", "Punajuuri-falafel", "Poronk\u00e4ristys-juustokeitto", "Kahvi/tee ja j\u00e4lkiruoka"],
            perjantai: ["Buffet 14\u20ac: Jauhelihakastiketta ja perunamuusia", "Kasvisbolognese-pasta", "Kermainen lohikeitto", "Kahvi/tee ja j\u00e4lkiruoka"]
        }
    },
    {
        id: 28,
        name: "Osakuntabaari",
        address: "Urho Kekkosen katu 4-6 D, 00100 Helsinki",
        lat: 60.1692,
        lng: 24.9340,
        hours: "ma-to 11:00-15:30, pe 11:00-15:00",
        price: "9.50 \u20ac",
        website: "https://www.lounaat.info/lounas/osakuntabaari/helsinki",
        description: "Edullinen opiskelijahenkinen lounaspaikka Kampissa. Joka p\u00e4iv\u00e4 liha- ja kasvisvaihtoehto. Take away -mahdollisuus.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Kananugetteja (L)", "Kasviskroketteja (G,V)"],
            keskiviikko: ["Yrtti-pestokala (G)", "Tofu-kasvisgratiini (L,G)"],
            torstai: ["Jauhelihabolognese (L,G)", "Soijabolognese (V,G)"],
            perjantai: ["Lohipihvit (L,G)", "Pinaattirullat"]
        }
    },
    {
        id: 29,
        name: "Ravintola Sis\u00e4piha",
        address: "Lapinlahdenkatu 1, 00180 Helsinki",
        lat: 60.1655,
        lng: 24.9262,
        hours: "ma-pe 10:30-13:30",
        price: "10.50-14.00 \u20ac",
        website: "https://www.sodexo.fi/en/restaurants/restaurant-sisapiha",
        description: "Sodexon lounasravintola ja kahvila LAPI-talon katetulla sis\u00e4pihalla. Buffet (14\u20ac) tai keitto (10.50\u20ac). Kasvisvaihtoehto joka p\u00e4iv\u00e4.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Buffet 14\u20ac: Chili con carne riisill\u00e4, nachoja ja jalape\u00f1oja", "Kantarellirisotto parmesaanilla", "Keitto 10.50\u20ac: Tulinen makkarakeitto", "J\u00e4lkiruoka: Mansikka-meloni smoothie"],
            keskiviikko: ["Buffet 14\u20ac: Chorizo arrabiata -pasta parmesaanilla", "Feta-pinaattipiirakka", "Keitto 10.50\u20ac: Kukkakaali-parsakaalikeitto", "J\u00e4lkiruoka: Marjakiisseli"],
            torstai: ["Buffet 14\u20ac: Kalaa tikka masala -kastikkeessa ja keitettyi\u00e4 perunoita", "Linssi-tofut\u00e4ytetyt paprikat ja musta riisi", "Keitto 10.50\u20ac: Bataattikeitto", "J\u00e4lkiruoka: Mustikka-talkkunaj\u00e4lkiruoka"],
            perjantai: ["Buffet 14\u20ac: Kanaa yrtti-tomaattikastikkeessa ja sahraamiriisill\u00e4", "Mie goreng tofu", "Keitto 10.50\u20ac: Paprika-tuorejuustokeitto", "J\u00e4lkiruoka: Tres leches -kakku"]
        }
    },
    {
        id: 30,
        name: "Satama Bar & Bistro Kamppi",
        address: "Runeberginkatu 5 B, 00100 Helsinki",
        lat: 60.1714,
        lng: 24.9308,
        hours: "ma-pe 10:30-14:30",
        price: "14.50 \u20ac",
        website: "https://www.satamabar.com/",
        description: "Suomen parhaaksi valittu lounas 2022. All-you-can-eat buffet sis\u00e4lt\u00e4\u00e4 keiton, salaattibarin, 2-3 p\u00e4\u00e4ruokaa ja kahvin/teen. Laajat gluteenittomat ja vegaanivaihtoehdot.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Buffetlounas 14.50\u20ac (katso satamabar.com)"],
            keskiviikko: ["Buffetlounas 14.50\u20ac (katso satamabar.com)"],
            torstai: ["Buffet 14.50\u20ac: Espanjalaiset kana-fajitat", "Kvinoa-kasvispihvi pikkelsimajoneesilla", "Kikherne-pastalaatikko"],
            perjantai: ["Buffet 14.50\u20ac: Uunilohi tillimajoneesilla", "Fettuccine Alfredo sienill\u00e4", "Kvinoa-t\u00e4ytetty kes\u00e4kurpitsa"]
        }
    },
    {
        id: 31,
        name: "Ravintola L\u00f6nkka",
        address: "L\u00f6nnrotinkatu 11, 00120 Helsinki",
        lat: 60.1665,
        lng: 24.9368,
        hours: "ti-pe 11:00-14:00",
        price: "14.00-16.50 \u20ac",
        website: "https://lonkka.fi/en/lunch/",
        description: "Pihviravintola L\u00f6nnrotinkadulla. Lounaalla lautasannoksia: lihapullat, kalaa, falafel ja viikon burgeri. Alkusalaatti ja kahvi/tee kuuluvat hintaan.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Lihapullat perunamuusilla, arrabiata-kastikkeella ja grillatulla parsakaalilla 14\u20ac", "Rapea turska paahdetuilla kasviksilla ja aiolilla 14\u20ac", "Falafel riisill\u00e4 ja arrabiata-kastikkeella 14\u20ac", "Naudanlihahampurilainen sienikastikkeella ja ranskalaisilla 16.50\u20ac"],
            keskiviikko: ["Lihapullat perunamuusilla ja arrabiata-kastikkeella 14\u20ac", "Rapea turska kasviksilla ja aiolilla 14\u20ac", "Falafel riisill\u00e4 ja arrabiata-kastikkeella 14\u20ac", "Naudanlihahampurilainen 16.50\u20ac"],
            torstai: ["Lihapullat perunamuusilla ja arrabiata-kastikkeella 14\u20ac", "Rapea turska kasviksilla ja aiolilla 14\u20ac", "Falafel riisill\u00e4 ja arrabiata-kastikkeella 14\u20ac", "Naudanlihahampurilainen 16.50\u20ac"],
            perjantai: ["Lihapullat perunamuusilla ja arrabiata-kastikkeella 14\u20ac", "Rapea turska kasviksilla ja aiolilla 14\u20ac", "Falafel riisill\u00e4 ja arrabiata-kastikkeella 14\u20ac", "Naudanlihahampurilainen 16.50\u20ac"]
        }
    },
    {
        id: 32,
        name: "Ekberg",
        address: "Bulevardi 9, 00120 Helsinki",
        lat: 60.1650,
        lng: 24.9392,
        hours: "ma-pe 11:00-14:00",
        price: "13.90 \u20ac",
        website: "https://www.ekberg.fi/sv/cafe/lunch",
        description: "Suomen vanhin leipomo ja kahvila vuodesta 1852. Buffetlounas sis\u00e4lt\u00e4\u00e4 runsaan salaattip\u00f6yd\u00e4n, keiton, p\u00e4\u00e4ruoan, oman leipomon tuoretta leip\u00e4\u00e4, j\u00e4lkiruoan ja kahvin/teen.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Buffetlounas ja salaattip\u00f6yt\u00e4, oman leipomon tuore leip\u00e4, kahvi ja j\u00e4lkiruoka 13.90\u20ac (katso ekberg.fi)"],
            keskiviikko: ["Buffetlounas ja salaattip\u00f6yt\u00e4, oman leipomon tuore leip\u00e4, kahvi ja j\u00e4lkiruoka 13.90\u20ac (katso ekberg.fi)"],
            torstai: ["Fish & Chips, chili-majoneesi ja marinoitu punasipuli 13.90\u20ac", "Coleslaw (V) ja vihre\u00e4 salaatti", "Oman leipomon pulla hillolla ja kahvi/tee"],
            perjantai: ["Kanaschnitzel pinaatti-voikastikkeella ja lohkoperunoilla 13.90\u20ac", "Parsa-perunasalaatti (V) ja puutarhasalaatti", "Oman leipomon pulla hillolla ja kahvi/tee"]
        }
    },
    {
        id: 33,
        name: "Amos Caf\u00e9",
        address: "Yrj\u00f6nkatu 27A, 00100 Helsinki",
        lat: 60.1687,
        lng: 24.9398,
        hours: "ma-pe 11:00-14:00",
        price: "13.90 \u20ac",
        website: "https://www.lounaat.info/lounas/amos-cafe/helsinki",
        description: "Viihtyis\u00e4 lounaskahvila Forumin Kukontorin sis\u00e4pihalla. Kolme vaihtuvaa lounasta p\u00e4ivitt\u00e4in, sis\u00e4lt\u00e4\u00e4 salaattibuffetin, kahvin/teen ja j\u00e4lkiruoan.",
        menu: {
            maanantai: ["Suljettu (p\u00e4\u00e4si\u00e4inen)"],
            tiistai: ["Moussaka \u2013 kreikkalainen munakoiso-liharuukku ja bechamel 13.90\u20ac", "Kanacurry \u2013 kanaa currykermakastikkeessa ja riisi\u00e4 13.90\u20ac", "Punajuuririsotto yrteill\u00e4 (kasvis) 13.90\u20ac"],
            keskiviikko: ["Katkarapupasta \u2013 kermainen tomaattipasta ja katkarapuja 13.90\u20ac", "Kana-tagine \u2013 marokkolaista kanaa sitruunakastikkeessa ja bulgurpilaffia 13.90\u20ac", "Linssisosekeitto valkosipulilla (V) 13.90\u20ac"],
            torstai: ["P\u00e4ivitt\u00e4in vaihtuva lounas, salaattibuffet, kahvi/tee ja j\u00e4lkiruoka 13.90\u20ac (katso facebook.com/AmosCafeHelsinki)"],
            perjantai: ["P\u00e4ivitt\u00e4in vaihtuva lounas, salaattibuffet, kahvi/tee ja j\u00e4lkiruoka 13.90\u20ac (katso facebook.com/AmosCafeHelsinki)"]
        }
    }
];
