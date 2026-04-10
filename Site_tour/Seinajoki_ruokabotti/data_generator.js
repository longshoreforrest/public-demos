// Tiimin jäsenet ja äänestysdata generaattori
// Deterministinen PRNG takaa toistettavat tulokset

// ===== SEEDED PRNG (Mulberry32) =====
function mulberry32(seed) {
    return function() {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

// ===== TIIMIN JÄSENET =====
const TEAM_MEMBERS = [
    {
        id: 'mikko',
        name: 'Mikko Virtanen',
        role: 'Lead Developer',
        emoji: '👨‍💻',
        bio: 'Burgeriaddikti ja grillimestari. Jos listalla on hampurilainen, Mikko äänestää sitä.',
        // Ravintola-preferenssit (peruspaino 0-1)
        restaurantPrefs: {
            holy_smoke: 0.30, juku: 0.06, marttilan_talli: 0.08, aarella: 0.03,
            uppalan_kartano: 0.06, pancho_villa: 0.12, juurella: 0.04, valkoinen_puu: 0.02,
            shi_quan: 0.07, alma: 0.08, mangal: 0.05, pohjan_purtava: 0.04, varicko: 0.03, hanna_ja_kerttu: 0.02
        },
        // Ruokatagien painoarvot äänestyspäätökseen (positiivinen = vetää, negatiivinen = torjuu)
        tagWeights: {
            hampurilainen: 2.5, bbq: 2.0, nauta: 1.5, pihvi: 1.8, amerikkalainen: 1.5,
            ruokaisa: 1.0, comfort: 0.8, paistettu: 0.5,
            kasvis: -1.0, vegaani: -1.5, kevyt: -1.2, salaatti: -0.8, terveellinen: -0.5
        },
        // Hintaherkkyys (0=ei välitä, 1=todella herkkä)
        priceSensitivity: 0.1,
        // Sosiaalinen vaikutin (0=ei seuraa, 1=seuraa aina muita)
        socialFactor: 0.15,
        // Todennäköisyys olla paikalla
        attendanceRate: 0.85
    },
    {
        id: 'antti',
        name: 'Antti Korhonen',
        role: 'Backend Developer',
        emoji: '🌿',
        bio: 'Vegaani ja ympäristötietoinen. Etsii aina kasvisvaihtoehdon ja suosii luomua.',
        restaurantPrefs: {
            holy_smoke: 0.02, juku: 0.08, marttilan_talli: 0.03, aarella: 0.30,
            uppalan_kartano: 0.08, pancho_villa: 0.06, juurella: 0.12, valkoinen_puu: 0.10,
            shi_quan: 0.04, alma: 0.03, mangal: 0.06, pohjan_purtava: 0.02, varicko: 0.04, hanna_ja_kerttu: 0.02
        },
        tagWeights: {
            kasvis: 2.0, vegaani: 2.5, terveellinen: 1.5, kevyt: 1.0, salaatti: 1.0,
            nauta: -1.5, sika: -1.5, kana: -0.5, kala: -0.3,
            hampurilainen: -1.5, bbq: -1.0, paistettu: -0.8, ruokaisa: -0.5
        },
        priceSensitivity: 0.2,
        socialFactor: 0.10,
        attendanceRate: 0.90
    },
    {
        id: 'sari',
        name: 'Sari Mäkinen',
        role: 'Frontend Developer',
        emoji: '🍣',
        bio: 'Aasian ruoan fani. Sushi, ramen ja curry ovat aina listalla.',
        restaurantPrefs: {
            holy_smoke: 0.03, juku: 0.28, marttilan_talli: 0.03, aarella: 0.05,
            uppalan_kartano: 0.04, pancho_villa: 0.04, juurella: 0.05, valkoinen_puu: 0.03,
            shi_quan: 0.18, alma: 0.03, mangal: 0.12, pohjan_purtava: 0.03, varicko: 0.06, hanna_ja_kerttu: 0.03
        },
        tagWeights: {
            aasialainen: 2.0, japanilainen: 2.2, kiinalainen: 1.5, intialainen: 1.5,
            sushi: 2.0, nuudeli: 1.5, curry: 1.8, riisi: 0.8, mausteinen: 1.0,
            suomalainen: -0.5, laatikko: -1.0, comfort: -0.3
        },
        priceSensitivity: 0.15,
        socialFactor: 0.20,
        attendanceRate: 0.82
    },
    {
        id: 'jukka',
        name: 'Jukka Heikkinen',
        role: 'DevOps Engineer',
        emoji: '🥔',
        bio: 'Perinteisen suomalaisen ruoan ystävä. Hernekeitto ja perunamuusi riittävät.',
        restaurantPrefs: {
            holy_smoke: 0.05, juku: 0.03, marttilan_talli: 0.28, aarella: 0.04,
            uppalan_kartano: 0.05, pancho_villa: 0.03, juurella: 0.04, valkoinen_puu: 0.03,
            shi_quan: 0.04, alma: 0.05, mangal: 0.02, pohjan_purtava: 0.22, varicko: 0.08, hanna_ja_kerttu: 0.04
        },
        tagWeights: {
            suomalainen: 2.0, comfort: 1.5, keitto: 1.5, laatikko: 1.2, pata: 1.0,
            ruokaisa: 0.8, uuni: 0.5,
            aasialainen: -1.0, japanilainen: -1.2, mausteinen: -1.5, intialainen: -1.0,
            sushi: -1.5, nuudeli: -0.5
        },
        priceSensitivity: 0.35,
        socialFactor: 0.10,
        attendanceRate: 0.88
    },
    {
        id: 'laura',
        name: 'Laura Nieminen',
        role: 'UX Designer',
        emoji: '🍝',
        bio: 'Italialaisen ja skandinaavisen keittiön ystävä. Arvostaa estetiikkaa ja makua.',
        restaurantPrefs: {
            holy_smoke: 0.03, juku: 0.05, marttilan_talli: 0.04, aarella: 0.08,
            uppalan_kartano: 0.25, pancho_villa: 0.04, juurella: 0.18, valkoinen_puu: 0.06,
            shi_quan: 0.03, alma: 0.12, mangal: 0.03, pohjan_purtava: 0.02, varicko: 0.05, hanna_ja_kerttu: 0.02
        },
        tagWeights: {
            italialainen: 2.0, skandinaavinen: 1.8, pasta: 1.5, riisi: 0.3,
            kevyt: 0.5, terveellinen: 0.5,
            amerikkalainen: -0.8, hampurilainen: -0.8, bbq: -0.5, paistettu: -0.5,
            kiinalainen: -0.5, comfort: -0.3
        },
        priceSensitivity: 0.05,
        socialFactor: 0.25,
        attendanceRate: 0.80
    },
    {
        id: 'petri',
        name: 'Petri Lahtinen',
        role: 'Full Stack Developer',
        emoji: '🌶️',
        bio: 'Mausteisen ruoan rakastaja. Meksikolainen on lempikeittiö, mitä tulisempaa sen parempi.',
        restaurantPrefs: {
            holy_smoke: 0.08, juku: 0.06, marttilan_talli: 0.03, aarella: 0.04,
            uppalan_kartano: 0.04, pancho_villa: 0.28, juurella: 0.04, valkoinen_puu: 0.02,
            shi_quan: 0.08, alma: 0.03, mangal: 0.15, pohjan_purtava: 0.03, varicko: 0.08, hanna_ja_kerttu: 0.04
        },
        tagWeights: {
            meksikolainen: 2.5, mausteinen: 2.0, intialainen: 1.5, curry: 1.5,
            wrap: 0.8, kiinalainen: 0.5, aasialainen: 0.5,
            suomalainen: -0.5, kevyt: -0.8, laatikko: -0.8, keitto: -0.3
        },
        priceSensitivity: 0.15,
        socialFactor: 0.20,
        attendanceRate: 0.87
    },
    {
        id: 'henna',
        name: 'Henna Savolainen',
        role: 'QA Engineer',
        emoji: '☕',
        bio: 'Kahvilatyyppi. Mieluummin kevyt lounas kuin raskas buffet. Tykkää salaateista ja keitoista.',
        restaurantPrefs: {
            holy_smoke: 0.02, juku: 0.04, marttilan_talli: 0.04, aarella: 0.10,
            uppalan_kartano: 0.06, pancho_villa: 0.03, juurella: 0.08, valkoinen_puu: 0.22,
            shi_quan: 0.03, alma: 0.05, mangal: 0.03, pohjan_purtava: 0.05, varicko: 0.05, hanna_ja_kerttu: 0.20
        },
        tagWeights: {
            kevyt: 2.0, salaatti: 1.8, keitto: 1.5, terveellinen: 1.5, wrap: 1.0,
            ruokaisa: -1.5, hampurilainen: -1.0, bbq: -0.8, paistettu: -0.8,
            pihvi: -0.5, laatikko: -0.5
        },
        priceSensitivity: 0.30,
        socialFactor: 0.15,
        attendanceRate: 0.92
    },
    {
        id: 'timo',
        name: 'Timo Järvinen',
        role: 'Software Architect',
        emoji: '🎩',
        bio: 'Gourmet-henkinen. Valitsee aina laadukkaimman vaihtoehdon hinnasta riippumatta.',
        restaurantPrefs: {
            holy_smoke: 0.05, juku: 0.08, marttilan_talli: 0.04, aarella: 0.08,
            uppalan_kartano: 0.22, pancho_villa: 0.03, juurella: 0.20, valkoinen_puu: 0.04,
            shi_quan: 0.02, alma: 0.18, mangal: 0.02, pohjan_purtava: 0.01, varicko: 0.02, hanna_ja_kerttu: 0.01
        },
        tagWeights: {
            skandinaavinen: 2.0, pihvi: 1.5, kala: 1.0, italialainen: 1.0,
            ruokaisa: 0.3,
            comfort: -0.5, suomalainen: -0.3, laatikko: -1.5,
            hampurilainen: -0.3, kiinalainen: -0.8
        },
        priceSensitivity: 0.0, // ei välitä hinnasta
        socialFactor: 0.10,
        attendanceRate: 0.78
    },
    {
        id: 'ville',
        name: 'Ville Laine',
        role: 'Junior Developer',
        emoji: '💰',
        bio: 'Budjettitietoinen juniori. Edullisin vaihtoehto voittaa yleensä. Tykkää silti burgereista.',
        restaurantPrefs: {
            holy_smoke: 0.08, juku: 0.04, marttilan_talli: 0.12, aarella: 0.05,
            uppalan_kartano: 0.03, pancho_villa: 0.08, juurella: 0.04, valkoinen_puu: 0.08,
            shi_quan: 0.12, alma: 0.02, mangal: 0.08, pohjan_purtava: 0.12, varicko: 0.06, hanna_ja_kerttu: 0.08
        },
        tagWeights: {
            hampurilainen: 1.0, comfort: 0.8, ruokaisa: 0.5, bbq: 0.5,
            paistettu: 0.3
        },
        priceSensitivity: 0.70, // todella hintaherkkä
        socialFactor: 0.30,
        attendanceRate: 0.83
    },
    {
        id: 'katja',
        name: 'Katja Rantanen',
        role: 'Scrum Master',
        emoji: '👥',
        bio: 'Sosiaalinen äänestäjä. Haluaa mennä sinne missä muutkin menevät. Pitää kaikesta vähän.',
        restaurantPrefs: {
            holy_smoke: 0.08, juku: 0.08, marttilan_talli: 0.08, aarella: 0.08,
            uppalan_kartano: 0.08, pancho_villa: 0.08, juurella: 0.08, valkoinen_puu: 0.08,
            shi_quan: 0.07, alma: 0.07, mangal: 0.06, pohjan_purtava: 0.06, varicko: 0.05, hanna_ja_kerttu: 0.05
        },
        tagWeights: {
            // Hyvin miedot preferenssit - seuraa muita
            comfort: 0.3, ruokaisa: 0.2, kevyt: 0.1
        },
        priceSensitivity: 0.15,
        socialFactor: 0.65, // erittäin sosiaalinen
        attendanceRate: 0.90
    }
];

// ===== ÄÄNESTYSDATA GENERAATTORI =====

function generateVotingData() {
    const rng = mulberry32(42); // Kiinteä seed = toistettava data

    const startDate = new Date(2024, 0, 2); // 2.1.2024 (tiistai)
    const endDate = new Date(2026, 3, 8);   // 8.4.2026 (keskiviikko)

    const votingDays = [];
    const current = new Date(startDate);

    // Loma-ajat (ei äänestystä)
    const holidays = [
        // 2024
        { start: new Date(2024, 2, 29), end: new Date(2024, 3, 1) }, // Pääsiäinen 2024
        { start: new Date(2024, 5, 21), end: new Date(2024, 5, 21) }, // Juhannus
        { start: new Date(2024, 6, 1), end: new Date(2024, 6, 31) }, // Heinäkuu (loma)
        { start: new Date(2024, 11, 23), end: new Date(2024, 11, 31) }, // Joulu
        // 2025
        { start: new Date(2025, 0, 1), end: new Date(2025, 0, 6) }, // Uudenvuosi+loppiainen
        { start: new Date(2025, 3, 18), end: new Date(2025, 3, 21) }, // Pääsiäinen 2025
        { start: new Date(2025, 5, 20), end: new Date(2025, 5, 20) }, // Juhannus
        { start: new Date(2025, 6, 1), end: new Date(2025, 6, 31) }, // Heinäkuu (loma)
        { start: new Date(2025, 11, 22), end: new Date(2025, 11, 31) }, // Joulu
        // 2026
        { start: new Date(2026, 0, 1), end: new Date(2026, 0, 6) }, // Uudenvuosi+loppiainen
        { start: new Date(2026, 3, 3), end: new Date(2026, 3, 6) }, // Pääsiäinen 2026
    ];

    function isHoliday(date) {
        return holidays.some(h => date >= h.start && date <= h.end);
    }

    // Henkilökohtaiset lomat (viikon lomat satunnaisesti)
    const personalVacations = {};
    TEAM_MEMBERS.forEach(member => {
        personalVacations[member.id] = [];
        // Jokainen saa 2-3 viikon lomaa per vuosi (heinäkuun lisäksi)
        for (let year = 2024; year <= 2026; year++) {
            const numVacations = 2 + Math.floor(rng() * 2);
            for (let v = 0; v < numVacations; v++) {
                const month = Math.floor(rng() * 10) + 1; // helmi-marras
                if (month === 6) continue; // ei heinäkuussa (yhteinen loma)
                const startDay = Math.floor(rng() * 20) + 1;
                const vacStart = new Date(year, month, startDay);
                const vacEnd = new Date(year, month, startDay + 4); // viikon loma
                personalVacations[member.id].push({ start: vacStart, end: vacEnd });
            }
        }
    });

    function isOnVacation(memberId, date) {
        return personalVacations[memberId].some(v => date >= v.start && date <= v.end);
    }

    while (current <= endDate) {
        const dayOfWeek = current.getDay();

        // Vain arkipäivät (ma-pe)
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && !isHoliday(current)) {
            const dateStr = current.toISOString().split('T')[0];
            const dayIndex = dayOfWeek - 1; // 0=ma, 4=pe

            // Päivän menut - jokainen ravintola saa satunnaisen menun poolistaan
            const dailyMenus = {};
            RESTAURANTS.forEach(r => {
                // Valitaan 2-3 vaihtoehtoa per ravintola
                const numItems = 2 + Math.floor(rng() * 2);
                const items = [];
                const usedIndices = new Set();
                for (let i = 0; i < numItems; i++) {
                    let idx;
                    do {
                        idx = Math.floor(rng() * r.menuPool.length);
                    } while (usedIndices.has(idx));
                    usedIndices.add(idx);
                    items.push(r.menuPool[idx]);
                }
                dailyMenus[r.id] = items;
            });

            // Ketkä ovat paikalla
            const presentMembers = [];
            TEAM_MEMBERS.forEach(member => {
                if (isOnVacation(member.id, current)) return;
                // Sairauspäivät yms.
                if (rng() > member.attendanceRate) return;
                // Perjantai: jotkut tekevät etätöitä
                if (dayOfWeek === 5 && rng() > 0.7) return;
                presentMembers.push(member);
            });

            if (presentMembers.length < 3) {
                // Liian vähän porukkaa, ei äänestetä
                current.setDate(current.getDate() + 1);
                continue;
            }

            // Äänestysprosessi
            // Ensimmäinen kierros: henkilökohtaiset preferenssit
            const firstRoundScores = {};
            presentMembers.forEach(member => {
                const scores = {};
                RESTAURANTS.forEach(r => {
                    let score = member.restaurantPrefs[r.id] || 0.05;

                    // Menu-vaikutus: katso päivän menut ja sopeuta painot
                    const menuItems = dailyMenus[r.id];
                    let menuBoost = 0;
                    menuItems.forEach(item => {
                        item.tags.forEach(tag => {
                            if (member.tagWeights[tag]) {
                                menuBoost += member.tagWeights[tag] * 0.1;
                            }
                        });
                    });
                    score += menuBoost;

                    // Hintavaikutus
                    const avgPrice = RESTAURANTS.reduce((s, r) => s + r.priceNum, 0) / RESTAURANTS.length;
                    const priceFactor = (avgPrice - r.priceNum) / avgPrice;
                    score += priceFactor * member.priceSensitivity * 0.5;

                    // Päiväkohtainen satunnaisuus (mielialan vaihtelu)
                    score += (rng() - 0.5) * 0.15;

                    // Perjantai-efekti: ihmiset haluavat jotain erityistä
                    if (dayOfWeek === 5) {
                        if (r.priceNum > avgPrice) score += 0.05;
                    }

                    scores[r.id] = Math.max(0.01, score);
                });
                firstRoundScores[member.id] = scores;
            });

            // Toinen kierros: sosiaalinen vaikutus
            // Ensin laske "trendi" - mihin useimmat kallistuvat
            const trendScores = {};
            RESTAURANTS.forEach(r => {
                trendScores[r.id] = 0;
                presentMembers.forEach(m => {
                    trendScores[r.id] += firstRoundScores[m.id][r.id];
                });
            });

            // Lopullinen äänestys
            const votes = {};
            presentMembers.forEach(member => {
                const finalScores = {};
                RESTAURANTS.forEach(r => {
                    let score = firstRoundScores[member.id][r.id];
                    // Sosiaalinen tekijä: anna pisteitä suosituille valinnoille
                    score += trendScores[r.id] * member.socialFactor * 0.05;
                    finalScores[r.id] = score;
                });

                // Valitse painotetulla todennäköisyydellä
                const totalScore = Object.values(finalScores).reduce((a, b) => a + Math.max(0, b), 0);
                let roll = rng() * totalScore;
                let chosen = RESTAURANTS[0].id;
                for (const r of RESTAURANTS) {
                    roll -= Math.max(0, finalScores[r.id]);
                    if (roll <= 0) {
                        chosen = r.id;
                        break;
                    }
                }

                votes[member.id] = chosen;
            });

            // Lopputulos: eniten ääniä saanut ravintola
            const voteCounts = {};
            Object.values(votes).forEach(restaurantId => {
                voteCounts[restaurantId] = (voteCounts[restaurantId] || 0) + 1;
            });

            let winner = null;
            let maxVotes = 0;
            Object.entries(voteCounts).forEach(([rid, count]) => {
                if (count > maxVotes) {
                    maxVotes = count;
                    winner = rid;
                }
            });

            votingDays.push({
                date: dateStr,
                dayIndex: dayIndex,
                dayName: DAYS[dayIndex],
                menus: dailyMenus,
                presentMembers: presentMembers.map(m => m.id),
                votes: votes,
                voteCounts: voteCounts,
                winner: winner,
                winnerVotes: maxVotes
            });
        }

        current.setDate(current.getDate() + 1);
    }

    return votingDays;
}

// Generoidaan data sovelluksen käynnistyessä
let VOTING_DATA = null;
function getVotingData() {
    if (!VOTING_DATA) {
        VOTING_DATA = generateVotingData();
    }
    return VOTING_DATA;
}
