// Analytiikka- ja ennustemoottori

// ===== MENU ANALYSOIJA =====
// Abstrahoi menu-tekstit kategorioiksi

const TAG_CATEGORIES = {
    protein: ['kana', 'nauta', 'sika', 'kala', 'kasvis', 'vegaani'],
    cuisine: ['suomalainen', 'aasialainen', 'japanilainen', 'kiinalainen', 'meksikolainen', 'italialainen', 'intialainen', 'amerikkalainen', 'skandinaavinen'],
    dishType: ['keitto', 'salaatti', 'hampurilainen', 'pasta', 'pizza', 'riisi', 'pata', 'curry', 'sushi', 'wrap', 'nuudeli', 'laatikko', 'pihvi'],
    style: ['kevyt', 'ruokaisa', 'comfort', 'terveellinen', 'mausteinen', 'bbq', 'paistettu', 'uuni']
};

const TAG_LABELS = {
    kana: 'Kana', nauta: 'Nauta', sika: 'Sika', kala: 'Kala', kasvis: 'Kasvis', vegaani: 'Vegaani',
    suomalainen: 'Suomalainen', aasialainen: 'Aasialainen', japanilainen: 'Japanilainen',
    kiinalainen: 'Kiinalainen', meksikolainen: 'Meksikolainen', italialainen: 'Italialainen',
    intialainen: 'Intialainen', amerikkalainen: 'Amerikkalainen', skandinaavinen: 'Skandinaavinen',
    keitto: 'Keitto', salaatti: 'Salaatti', hampurilainen: 'Hampurilainen', pasta: 'Pasta',
    pizza: 'Pizza', riisi: 'Riisi', pata: 'Pata', curry: 'Curry', sushi: 'Sushi',
    wrap: 'Wrap', nuudeli: 'Nuudeli', laatikko: 'Laatikko', pihvi: 'Pihvi',
    kevyt: 'Kevyt', ruokaisa: 'Ruokaisa', comfort: 'Comfort food', terveellinen: 'Terveellinen',
    mausteinen: 'Mausteinen', bbq: 'BBQ', paistettu: 'Paistettu', uuni: 'Uuniruoka'
};

// Analysoi päivän menut ja palauta tagien jakaumat per ravintola
function analyzeMenuTags(menuItems) {
    const tagCounts = {};
    menuItems.forEach(item => {
        item.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    return tagCounts;
}

// ===== ANALYTIIKKAFUNKTIOT =====

function computeOverviewStats(votingData) {
    const totalDays = votingData.length;
    const totalVotes = votingData.reduce((s, d) => s + Object.keys(d.votes).length, 0);

    // Ravintola suosio
    const restaurantWins = {};
    const restaurantVotes = {};
    RESTAURANTS.forEach(r => {
        restaurantWins[r.id] = 0;
        restaurantVotes[r.id] = 0;
    });

    votingData.forEach(day => {
        if (day.winner) restaurantWins[day.winner]++;
        Object.values(day.votes).forEach(rid => {
            restaurantVotes[rid]++;
        });
    });

    // Kuukausittaiset trendit
    const monthlyData = {};
    votingData.forEach(day => {
        const month = day.date.substring(0, 7); // YYYY-MM
        if (!monthlyData[month]) monthlyData[month] = { votes: {}, total: 0 };
        Object.values(day.votes).forEach(rid => {
            monthlyData[month].votes[rid] = (monthlyData[month].votes[rid] || 0) + 1;
            monthlyData[month].total++;
        });
    });

    // Viikonpäivien vaikutus
    const dayOfWeekStats = {};
    DAYS.forEach((d, i) => { dayOfWeekStats[i] = { votes: {}, total: 0 }; });
    votingData.forEach(day => {
        Object.values(day.votes).forEach(rid => {
            dayOfWeekStats[day.dayIndex].votes[rid] = (dayOfWeekStats[day.dayIndex].votes[rid] || 0) + 1;
            dayOfWeekStats[day.dayIndex].total++;
        });
    });

    return { totalDays, totalVotes, restaurantWins, restaurantVotes, monthlyData, dayOfWeekStats };
}

function computePersonStats(personId, votingData) {
    const personDays = votingData.filter(d => d.presentMembers.includes(personId));
    const totalDays = personDays.length;

    // Ravintola-äänet
    const restaurantVotes = {};
    RESTAURANTS.forEach(r => { restaurantVotes[r.id] = 0; });
    personDays.forEach(day => {
        const vote = day.votes[personId];
        if (vote) restaurantVotes[vote]++;
    });

    // Voittavan ravintolan valinta
    let winnerVotes = 0;
    personDays.forEach(day => {
        if (day.votes[personId] === day.winner) winnerVotes++;
    });
    const winRate = totalDays > 0 ? winnerVotes / totalDays : 0;

    // Tag-analyysi: mitkä tagit korreloivat henkilön äänien kanssa
    const tagVoteCorrelation = {};
    const tagPresenceCount = {};

    personDays.forEach(day => {
        const vote = day.votes[personId];
        if (!vote) return;

        // Tarkista mitä tageja äänestyksen kohteen menussa oli
        const votedMenuTags = {};
        if (day.menus[vote]) {
            day.menus[vote].forEach(item => {
                item.tags.forEach(tag => { votedMenuTags[tag] = true; });
            });
        }

        // Vertaa kaikkiin ravintoloihin
        RESTAURANTS.forEach(r => {
            const menuTags = {};
            if (day.menus[r.id]) {
                day.menus[r.id].forEach(item => {
                    item.tags.forEach(tag => { menuTags[tag] = true; });
                });
            }

            Object.keys(menuTags).forEach(tag => {
                if (!tagPresenceCount[tag]) tagPresenceCount[tag] = 0;
                tagPresenceCount[tag]++;

                if (r.id === vote) {
                    if (!tagVoteCorrelation[tag]) tagVoteCorrelation[tag] = 0;
                    tagVoteCorrelation[tag]++;
                }
            });
        });
    });

    // Laske tagien vetovoima: kuinka usein henkilö äänestää ravintolaa jossa tagi esiintyy
    // vs. kuinka usein tagi esiintyy yleisesti
    const tagAttraction = {};
    Object.keys(tagPresenceCount).forEach(tag => {
        const voteRate = (tagVoteCorrelation[tag] || 0) / totalDays;
        const baseRate = tagPresenceCount[tag] / (totalDays * RESTAURANTS.length);
        tagAttraction[tag] = baseRate > 0 ? voteRate / baseRate : 0;
    });

    // Yhteensopivuus muiden kanssa
    const agreementWith = {};
    TEAM_MEMBERS.forEach(other => {
        if (other.id === personId) return;
        let sameVotes = 0;
        let commonDays = 0;
        personDays.forEach(day => {
            if (day.presentMembers.includes(other.id)) {
                commonDays++;
                if (day.votes[personId] === day.votes[other.id]) sameVotes++;
            }
        });
        agreementWith[other.id] = commonDays > 0 ? sameVotes / commonDays : 0;
    });

    // Ennustettavuus (entropia)
    const totalPersonVotes = Object.values(restaurantVotes).reduce((a, b) => a + b, 0);
    let entropy = 0;
    Object.values(restaurantVotes).forEach(count => {
        if (count > 0 && totalPersonVotes > 0) {
            const p = count / totalPersonVotes;
            entropy -= p * Math.log2(p);
        }
    });
    const maxEntropy = Math.log2(RESTAURANTS.length);
    const predictability = 1 - (entropy / maxEntropy);

    // Kuukausittaiset trendit per henkilö
    const monthlyVotes = {};
    personDays.forEach(day => {
        const month = day.date.substring(0, 7);
        if (!monthlyVotes[month]) monthlyVotes[month] = {};
        const vote = day.votes[personId];
        if (vote) {
            monthlyVotes[month][vote] = (monthlyVotes[month][vote] || 0) + 1;
        }
    });

    return {
        totalDays, restaurantVotes, winRate, winnerVotes,
        tagAttraction, agreementWith, predictability, entropy, monthlyVotes
    };
}

function computeGroupDynamics(votingData) {
    // Yhteensopivuusmatriisi
    const agreementMatrix = {};
    TEAM_MEMBERS.forEach(a => {
        agreementMatrix[a.id] = {};
        TEAM_MEMBERS.forEach(b => {
            if (a.id === b.id) { agreementMatrix[a.id][b.id] = 1; return; }
            let same = 0, common = 0;
            votingData.forEach(day => {
                if (day.presentMembers.includes(a.id) && day.presentMembers.includes(b.id)) {
                    common++;
                    if (day.votes[a.id] === day.votes[b.id]) same++;
                }
            });
            agreementMatrix[a.id][b.id] = common > 0 ? same / common : 0;
        });
    });

    // "Koalitiot" - ketkä äänestävät usein samoin
    // Kerätään kaikki parit ja näytetään top 10
    const coalitions = [];
    const memberIds = TEAM_MEMBERS.map(m => m.id);
    for (let i = 0; i < memberIds.length; i++) {
        for (let j = i + 1; j < memberIds.length; j++) {
            const rate = agreementMatrix[memberIds[i]][memberIds[j]];
            coalitions.push({
                members: [memberIds[i], memberIds[j]],
                rate: rate
            });
        }
    }
    coalitions.sort((a, b) => b.rate - a.rate);

    // Hajotus-indeksi per päivä (kuinka monta eri ravintolaa äänestettiin)
    const dispersalOverTime = votingData.map(day => {
        const uniqueVotes = new Set(Object.values(day.votes)).size;
        return { date: day.date, dispersal: uniqueVotes / day.presentMembers.length };
    });

    return { agreementMatrix, coalitions, dispersalOverTime };
}

// ===== ENNUSTEMALLI =====
// Perustuu opittuihin preferensseihin ja päivän menuihin

function buildPredictionModel(votingData) {
    // Opi jokaisen henkilön tag-painot empiirisesti datasta
    const learnedWeights = {};

    TEAM_MEMBERS.forEach(member => {
        const personDays = votingData.filter(d => d.presentMembers.includes(member.id));
        const tagVoteCount = {};
        const tagTotalCount = {};

        personDays.forEach(day => {
            const vote = day.votes[member.id];
            if (!vote) return;

            RESTAURANTS.forEach(r => {
                if (!day.menus[r.id]) return;
                const tags = new Set();
                day.menus[r.id].forEach(item => item.tags.forEach(t => tags.add(t)));

                tags.forEach(tag => {
                    if (!tagTotalCount[tag]) tagTotalCount[tag] = 0;
                    tagTotalCount[tag]++;
                    if (r.id === vote) {
                        if (!tagVoteCount[tag]) tagVoteCount[tag] = 0;
                        tagVoteCount[tag]++;
                    }
                });
            });
        });

        const weights = {};
        const numRestaurants = RESTAURANTS.length;
        Object.keys(tagTotalCount).forEach(tag => {
            const observed = (tagVoteCount[tag] || 0) / (personDays.length || 1);
            const expected = tagTotalCount[tag] / ((personDays.length || 1) * numRestaurants);
            // Log-likelihood ratio
            weights[tag] = expected > 0 ? Math.log(observed / expected + 0.001) : 0;
        });

        // Ravintola-bias (opittu suosio)
        const restaurantBias = {};
        const totalVotes = personDays.length;
        RESTAURANTS.forEach(r => {
            let count = 0;
            personDays.forEach(day => {
                if (day.votes[member.id] === r.id) count++;
            });
            restaurantBias[r.id] = totalVotes > 0 ? count / totalVotes : 1 / numRestaurants;
        });

        learnedWeights[member.id] = { tagWeights: weights, restaurantBias };
    });

    // Parin yhteensopivuus (opittu)
    const pairAgreement = {};
    TEAM_MEMBERS.forEach(a => {
        pairAgreement[a.id] = {};
        TEAM_MEMBERS.forEach(b => {
            if (a.id === b.id) return;
            let same = 0, common = 0;
            votingData.forEach(day => {
                if (day.presentMembers.includes(a.id) && day.presentMembers.includes(b.id)) {
                    common++;
                    if (day.votes[a.id] === day.votes[b.id]) same++;
                }
            });
            pairAgreement[a.id][b.id] = common > 0 ? same / common : 0;
        });
    });

    return { learnedWeights, pairAgreement };
}

function predict(model, presentMemberIds, dailyMenus) {
    if (presentMemberIds.length === 0) return { scores: {}, winner: null };

    const restaurantScores = {};

    RESTAURANTS.forEach(r => {
        // Kerää päivän menun tagit
        const menuTags = new Set();
        if (dailyMenus && dailyMenus[r.id]) {
            dailyMenus[r.id].forEach(item => {
                item.tags.forEach(t => menuTags.add(t));
            });
        }

        let totalScore = 0;

        presentMemberIds.forEach(memberId => {
            const weights = model.learnedWeights[memberId];
            if (!weights) return;

            // Base: ravintola-bias
            let score = weights.restaurantBias[r.id] || 0.05;

            // Menu-match: tagien painotus
            menuTags.forEach(tag => {
                if (weights.tagWeights[tag]) {
                    score += weights.tagWeights[tag] * 0.05;
                }
            });

            // Sosiaalinen tekijä: huomioidaan muiden läsnäolevien preferenssit
            const member = TEAM_MEMBERS.find(m => m.id === memberId);
            if (member && member.socialFactor > 0.3) {
                // Tarkista muiden trendi tähän ravintolaan
                let otherBias = 0;
                presentMemberIds.forEach(otherId => {
                    if (otherId === memberId) return;
                    const otherWeights = model.learnedWeights[otherId];
                    if (otherWeights) {
                        otherBias += otherWeights.restaurantBias[r.id] || 0;
                    }
                });
                score += otherBias * member.socialFactor * 0.1;
            }

            totalScore += Math.max(0.001, score);
        });

        restaurantScores[r.id] = totalScore;
    });

    // Normalisoi prosentteiksi
    const total = Object.values(restaurantScores).reduce((a, b) => a + b, 0);
    const normalized = {};
    Object.entries(restaurantScores).forEach(([rid, score]) => {
        normalized[rid] = total > 0 ? score / total : 0;
    });

    // Selvitä voittaja
    let winner = null;
    let maxScore = 0;
    Object.entries(normalized).forEach(([rid, score]) => {
        if (score > maxScore) {
            maxScore = score;
            winner = rid;
        }
    });

    return { scores: normalized, winner, confidence: maxScore };
}

// Yksityiskohtainen ennuste: per-henkilö-pistemäärät per ravintola
function predictDetailed(model, presentMemberIds, dailyMenus) {
    if (presentMemberIds.length === 0) return {};

    const detail = {}; // { restaurantId: { memberId: { score, bias, menuMatch, topTags } } }

    RESTAURANTS.forEach(r => {
        const menuTags = new Set();
        if (dailyMenus && dailyMenus[r.id]) {
            dailyMenus[r.id].forEach(item => item.tags.forEach(t => menuTags.add(t)));
        }

        detail[r.id] = {};

        presentMemberIds.forEach(memberId => {
            const weights = model.learnedWeights[memberId];
            if (!weights) return;

            const bias = weights.restaurantBias[r.id] || 0.05;
            let menuMatch = 0;
            const matchedTags = [];

            menuTags.forEach(tag => {
                if (weights.tagWeights[tag]) {
                    const contrib = weights.tagWeights[tag] * 0.05;
                    menuMatch += contrib;
                    if (Math.abs(weights.tagWeights[tag]) > 0.3) {
                        matchedTags.push({ tag, weight: weights.tagWeights[tag] });
                    }
                }
            });

            matchedTags.sort((a, b) => b.weight - a.weight);
            const score = Math.max(0.001, bias + menuMatch);

            detail[r.id][memberId] = {
                score,
                bias: Math.round(bias * 1000) / 10,
                menuMatch: Math.round(menuMatch * 1000) / 10,
                topTags: matchedTags.slice(0, 3)
            };
        });
    });

    return detail;
}

// Generoi satunnainen "tämän päivän menu" ennustetta varten
function generateTodayMenus() {
    const rng = mulberry32(Date.now() % 100000);
    const menus = {};
    RESTAURANTS.forEach(r => {
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
        menus[r.id] = items;
    });
    return menus;
}
