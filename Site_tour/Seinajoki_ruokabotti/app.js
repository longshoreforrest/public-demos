// Pääsovellus - UI ja renderöinti

let votingData = null;
let overviewStats = null;
let groupDynamics = null;
let predictionModel = null;
let currentTodayMenus = null;
let selectedPersonId = null;
let activePredictionMembers = new Set();
let historyPage = 0;
const HISTORY_PAGE_SIZE = 20;

// Daily menu view state
let weeklyMenus = null;
let activeDayIndex = null;
let dailyFilterIds = null; // null = all
let dailyViewInitialized = false;

// Väripaletti ravintoloille
const RESTAURANT_COLORS = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
    '#06b6d4', '#a855f7', '#e11d48', '#0891b2'
];

function getRestaurantColor(index) {
    return RESTAURANT_COLORS[index % RESTAURANT_COLORS.length];
}

// ESC sulkee popupin
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePredictionPopup();
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Näytä latausviesti
    document.getElementById('loading').style.display = 'block';

    setTimeout(() => {
        // Generoi data
        votingData = getVotingData();
        overviewStats = computeOverviewStats(votingData);
        groupDynamics = computeGroupDynamics(votingData);
        predictionModel = buildPredictionModel(votingData);
        currentTodayMenus = generateTodayMenus();

        // Alusta kaikki paikalla olevat
        TEAM_MEMBERS.forEach(m => activePredictionMembers.add(m.id));

        // Päivitä header
        document.getElementById('stat-days').textContent = overviewStats.totalDays;
        document.getElementById('stat-votes').textContent = overviewStats.totalVotes;
        document.getElementById('stat-restaurants').textContent = RESTAURANTS.length;
        document.getElementById('stat-members').textContent = TEAM_MEMBERS.length;

        document.getElementById('loading').style.display = 'none';

        // Renderöi oletusnäkymä
        initNavigation();
        renderPrediction();
    }, 100);
});

// ===== NAVIGAATIO =====
function initNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            tab.classList.add('active');
            const viewId = tab.dataset.view;
            document.getElementById(viewId).classList.add('active');

            // Lazy render
            if (viewId === 'view-map') {
                if (!mapInstance) {
                    setTimeout(() => initMap(), 50);
                } else {
                    mapInstance.invalidateSize();
                }
            }
            else if (viewId === 'view-daily') initDailyView();
            else if (viewId === 'view-overview') renderOverview();
            else if (viewId === 'view-individual') renderIndividual();
            else if (viewId === 'view-group') renderGroupDynamics();
            else if (viewId === 'view-prediction') renderPrediction();
            else if (viewId === 'view-history') renderHistory();
        });
    });
}

// ===== YLEISKATSAUS =====
function renderOverview() {
    // Top ravintolat (voitot)
    const sortedByWins = RESTAURANTS.map((r, i) => ({
        ...r, wins: overviewStats.restaurantWins[r.id], votes: overviewStats.restaurantVotes[r.id], colorIndex: i
    })).sort((a, b) => b.wins - a.wins);

    let topHtml = '';
    sortedByWins.slice(0, 5).forEach((r, i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        topHtml += `
            <div class="top-list-item">
                <div class="top-list-rank ${rankClass}">${i + 1}</div>
                <div class="top-list-info">
                    <div class="top-list-name">${r.name}</div>
                    <div class="top-list-detail">${r.votes} ääntä yhteensä</div>
                </div>
                <div class="top-list-value">${r.wins} voittoa</div>
            </div>`;
    });
    document.getElementById('top-restaurants').innerHTML = topHtml;

    // Ravintola-jakaumapylväs (Chart.js)
    const sortedForChart = [...sortedByWins];
    renderBarChart('chart-restaurant-votes', {
        labels: sortedForChart.map(r => r.name),
        datasets: [{
            label: 'Ääniä',
            data: sortedForChart.map(r => r.votes),
            backgroundColor: sortedForChart.map((r, i) => getRestaurantColor(RESTAURANTS.findIndex(x => x.id === r.id)))
        }]
    }, { indexAxis: 'y' });

    // Kuukausittainen trendi (top 5 ravintolaa)
    const top5Ids = sortedByWins.slice(0, 5).map(r => r.id);
    const months = Object.keys(overviewStats.monthlyData).sort();
    const trendDatasets = top5Ids.map((rid, i) => {
        const r = RESTAURANTS.find(x => x.id === rid);
        return {
            label: r.name,
            data: months.map(m => {
                const total = overviewStats.monthlyData[m].total;
                const votes = overviewStats.monthlyData[m].votes[rid] || 0;
                return total > 0 ? Math.round(votes / total * 100) : 0;
            }),
            borderColor: getRestaurantColor(RESTAURANTS.indexOf(r)),
            backgroundColor: getRestaurantColor(RESTAURANTS.indexOf(r)) + '20',
            tension: 0.3,
            fill: false
        };
    });

    renderLineChart('chart-monthly-trend', {
        labels: months.map(m => m.substring(2)), // YY-MM
        datasets: trendDatasets
    }, { ylabel: 'Osuus äänistä (%)' });

    // Viikonpäiväjakauma
    const dayLabels = DAYS.map(d => d.charAt(0).toUpperCase() + d.slice(1));
    const topForDayChart = top5Ids.map((rid, i) => {
        const r = RESTAURANTS.find(x => x.id === rid);
        return {
            label: r.name,
            data: DAYS.map((_, di) => {
                const stats = overviewStats.dayOfWeekStats[di];
                return stats.votes[rid] || 0;
            }),
            backgroundColor: getRestaurantColor(RESTAURANTS.indexOf(r))
        };
    });

    renderBarChart('chart-day-of-week', {
        labels: dayLabels,
        datasets: topForDayChart
    }, { stacked: false });

    // Tiimin jäsenten tilastot
    let membersHtml = '';
    TEAM_MEMBERS.forEach(member => {
        const stats = computePersonStats(member.id, votingData);
        const topRestaurant = Object.entries(stats.restaurantVotes)
            .sort((a, b) => b[1] - a[1])[0];
        const topR = RESTAURANTS.find(r => r.id === topRestaurant[0]);

        membersHtml += `
            <div class="card" style="cursor:pointer" onclick="showPersonDetail('${member.id}')">
                <div class="card-title">${member.emoji} ${member.name}</div>
                <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px">${member.role}</div>
                <div style="display:flex;gap:16px;font-size:0.85rem">
                    <div><strong>${stats.totalDays}</strong> päivää</div>
                    <div><strong>${Math.round(stats.winRate * 100)}%</strong> voitto-%</div>
                    <div><strong>${Math.round(stats.predictability * 100)}%</strong> ennustettavuus</div>
                </div>
                <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px">
                    Suosikki: ${topR ? topR.name : '-'} (${topRestaurant[1]} kertaa)
                </div>
            </div>`;
    });
    document.getElementById('team-grid').innerHTML = membersHtml;
}

// ===== YKSILÖANALYYSI =====
function renderIndividual() {
    // Henkilövalitsin
    let selectorHtml = '';
    TEAM_MEMBERS.forEach(m => {
        const active = m.id === selectedPersonId ? 'active' : '';
        selectorHtml += `<button class="person-btn ${active}" onclick="selectPerson('${m.id}')">${m.emoji} ${m.name}</button>`;
    });
    document.getElementById('person-selector').innerHTML = selectorHtml;

    if (!selectedPersonId) {
        selectedPersonId = TEAM_MEMBERS[0].id;
        renderIndividual();
        return;
    }

    const member = TEAM_MEMBERS.find(m => m.id === selectedPersonId);
    const stats = computePersonStats(selectedPersonId, votingData);

    // Tallennetaan stats popupeja varten
    window._individualStats = stats;
    window._individualMember = member;

    // Profiili
    document.getElementById('person-profile').innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <span style="font-size:2.5rem">${member.emoji}</span>
            <div>
                <h2 style="font-size:1.3rem">${member.name}</h2>
                <div style="color:var(--text-muted)">${member.role}</div>
            </div>
        </div>
        <p style="font-size:0.9rem;margin-bottom:12px">${member.bio}</p>
        <div class="grid grid-4">
            <div class="stat-mini stat-mini-clickable" onclick="showIndividualPopup('stat-days')">
                <div class="stat-number">${stats.totalDays}</div>
                <div class="stat-label">Äänestyspäiviä</div>
            </div>
            <div class="stat-mini stat-mini-clickable" onclick="showIndividualPopup('stat-winrate')">
                <div class="stat-number">${Math.round(stats.winRate * 100)}%</div>
                <div class="stat-label">Voitto-%</div>
            </div>
            <div class="stat-mini stat-mini-clickable" onclick="showIndividualPopup('stat-predictability')">
                <div class="stat-number">${Math.round(stats.predictability * 100)}%</div>
                <div class="stat-label">Ennustettavuus</div>
            </div>
            <div class="stat-mini stat-mini-clickable" onclick="showIndividualPopup('stat-wins')">
                <div class="stat-number">${stats.winnerVotes}</div>
                <div class="stat-label">Voittoja</div>
            </div>
        </div>`;

    // Ravintola-jakaumapiirakka (klikattava)
    const sortedVotes = Object.entries(stats.restaurantVotes)
        .filter(([, v]) => v > 0)
        .sort((a, b) => b[1] - a[1]);

    renderDoughnutChart('chart-person-restaurants', {
        labels: sortedVotes.map(([rid]) => RESTAURANTS.find(r => r.id === rid)?.name || rid),
        datasets: [{
            data: sortedVotes.map(([, v]) => v),
            backgroundColor: sortedVotes.map(([rid]) => getRestaurantColor(RESTAURANTS.findIndex(r => r.id === rid)))
        }]
    }, sortedVotes.map(([rid]) => rid));

    // Tag-analyysi (klikattavat tagit)
    const tagEntries = Object.entries(stats.tagAttraction)
        .filter(([tag]) => Object.values(TAG_CATEGORIES).flat().includes(tag))
        .sort((a, b) => b[1] - a[1]);

    const topTags = tagEntries.slice(0, 8);
    const bottomTags = tagEntries.filter(([, v]) => v < 1).sort((a, b) => a[1] - b[1]).slice(0, 8);

    let tagHtml = '<div class="card-title">Vetovoimatekijät (menu-tagit)</div>';
    tagHtml += '<p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px">Kerroin kertoo kuinka paljon enemmän/vähemmän henkilö äänestää ravintolaa kun tagi esiintyy menussa. Klikkaa tagia nähdäksesi lisätiedot.</p>';

    tagHtml += '<div style="margin-bottom:12px"><strong style="font-size:0.85rem">Vetää puoleensa:</strong><br>';
    topTags.forEach(([tag, value]) => {
        tagHtml += `<span class="tag tag-positive tag-clickable" onclick="showTagPopup('${tag}', ${value})">${TAG_LABELS[tag] || tag}: ${value.toFixed(2)}x</span>`;
    });
    tagHtml += '</div>';

    tagHtml += '<div><strong style="font-size:0.85rem">Torjuu:</strong><br>';
    bottomTags.forEach(([tag, value]) => {
        tagHtml += `<span class="tag tag-negative tag-clickable" onclick="showTagPopup('${tag}', ${value})">${TAG_LABELS[tag] || tag}: ${value.toFixed(2)}x</span>`;
    });
    tagHtml += '</div>';
    document.getElementById('person-tags').innerHTML = tagHtml;

    // Yhteensopivuus muiden kanssa (klikattavat rivit)
    const agreementSorted = Object.entries(stats.agreementWith)
        .sort((a, b) => b[1] - a[1]);

    let agreementHtml = '<div class="card-title">Yhteensopivuus muiden kanssa</div>';
    agreementHtml += '<p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px">Klikkaa henkilöä nähdäksesi yhteisen historian.</p>';
    agreementSorted.forEach(([otherId, rate]) => {
        const other = TEAM_MEMBERS.find(m => m.id === otherId);
        const pct = Math.round(rate * 100);
        const color = pct > 30 ? 'var(--success)' : pct > 20 ? 'var(--accent)' : 'var(--danger)';
        agreementHtml += `
            <div class="prediction-bar prediction-bar-clickable" onclick="showAgreementPopup('${otherId}')">
                <div class="prediction-bar-label">${other.emoji} ${other.name}</div>
                <div class="prediction-bar-track">
                    <div class="prediction-bar-fill" style="width:${pct}%;background:${color}">${pct > 15 ? pct + '%' : ''}</div>
                </div>
                <div class="prediction-bar-pct" style="color:${color}">${pct}%</div>
            </div>`;
    });
    document.getElementById('person-agreement').innerHTML = agreementHtml;

    // Kuukausittainen trendi (klikattava)
    const memberMonths = Object.keys(stats.monthlyVotes).sort();
    window._individualMonths = memberMonths;
    const topPersonRestaurants = sortedVotes.slice(0, 4).map(([rid]) => rid);

    const personTrendDatasets = topPersonRestaurants.map(rid => {
        const r = RESTAURANTS.find(x => x.id === rid);
        return {
            label: r.name,
            data: memberMonths.map(m => stats.monthlyVotes[m]?.[rid] || 0),
            borderColor: getRestaurantColor(RESTAURANTS.indexOf(r)),
            tension: 0.3,
            fill: false
        };
    });

    renderLineChart('chart-person-trend', {
        labels: memberMonths.map(m => m.substring(2)),
        datasets: personTrendDatasets
    }, { ylabel: 'Ääniä', onClick: handleTrendClick });
}

function selectPerson(personId) {
    selectedPersonId = personId;
    renderIndividual();
}

// ===== YKSILÖANALYYSIN POPUPIT =====

function openPopup(html) {
    document.getElementById('prediction-popup-body').innerHTML = html;
    document.getElementById('prediction-popup-overlay').style.display = 'flex';
}

function showIndividualPopup(type) {
    const stats = window._individualStats;
    const member = window._individualMember;
    if (!stats || !member) return;

    let html = '';
    if (type === 'stat-days') {
        const attendancePct = Math.round((stats.totalDays / votingData.length) * 100);
        html = `<h3 style="margin-bottom:12px">${member.emoji} ${member.name} — Äänestyspäivät</h3>
            <p style="margin-bottom:8px">${member.name} on osallistunut äänestykseen <strong>${stats.totalDays}</strong> kertaa ${votingData.length} mahdollisesta päivästä.</p>
            <p style="margin-bottom:8px">Läsnäoloprosentti: <strong>${attendancePct}%</strong></p>
            <p style="font-size:0.85rem;color:var(--text-muted)">Tämä sisältää arkipäivät joina henkilö on ollut toimistolla ja osallistunut lounasäänestykseen. Poissaoloja selittävät lomat, etäpäivät ja sairastumiset.</p>`;
    } else if (type === 'stat-winrate') {
        const pct = Math.round(stats.winRate * 100);
        const avg = Math.round(100 / RESTAURANTS.length);
        html = `<h3 style="margin-bottom:12px">${member.emoji} ${member.name} — Voittoprosentti</h3>
            <p style="margin-bottom:8px">${member.name} on äänestänyt voittavaa ravintolaa <strong>${pct}%</strong> kerroista (${stats.winnerVotes}/${stats.totalDays} päivää).</p>
            <p style="margin-bottom:8px">Jos äänet jakautuisivat tasaisesti ${RESTAURANTS.length} ravintolan kesken, satunnainen voittoprosentti olisi noin ${avg}%.</p>
            <p style="font-size:0.85rem;color:var(--text-muted)">${pct > 35 ? 'Korkea voittoprosentti kertoo siitä, että henkilön mieltymykset ovat linjassa ryhmän kanssa tai hän seuraa muiden ääniä.' : pct > 25 ? 'Keskimääräinen voittoprosentti — henkilön oma tyyli mutta osuu usein yhteen muiden kanssa.' : 'Matala voittoprosentti viittaa vahvaan omaan makuun joka eroaa ryhmän valtavirrasta.'}</p>`;
    } else if (type === 'stat-predictability') {
        const pct = Math.round(stats.predictability * 100);
        html = `<h3 style="margin-bottom:12px">${member.emoji} ${member.name} — Ennustettavuus</h3>
            <p style="margin-bottom:8px">Ennustettavuusarvo: <strong>${pct}%</strong></p>
            <p style="margin-bottom:8px">Tämä perustuu Shannon-entropiaan henkilön äänestysten jakaumasta. Korkea arvo tarkoittaa, että henkilö suosii vahvasti tiettyjä ravintoloita. Matala arvo kertoo laajemmasta hajonnasta.</p>
            <p style="margin-bottom:8px">Entropia: ${stats.entropy.toFixed(2)} bittiä (max ${Math.log2(RESTAURANTS.length).toFixed(2)} bittiä)</p>
            <p style="font-size:0.85rem;color:var(--text-muted)">${pct > 60 ? 'Erittäin ennustettava — vahvat suosikit, helppo ennustaa mihin äänestää.' : pct > 40 ? 'Kohtalaisen ennustettava — selkeitä suosikkeja mutta myös vaihtelua.' : 'Vaikeasti ennustettava — jakaa äänensä laajasti eri ravintoloille.'}</p>`;
    } else if (type === 'stat-wins') {
        // Näytä viimeisimmät voitot
        const personWins = votingData.filter(d =>
            d.presentMembers.includes(member.id) && d.votes[member.id] === d.winner
        ).slice(-10).reverse();

        let recentHtml = personWins.map(d => {
            const r = RESTAURANTS.find(x => x.id === d.winner);
            return `<div style="padding:4px 0;font-size:0.85rem;border-bottom:1px solid var(--border)">${d.date} — ${r?.name} (${d.winnerVotes} ääntä)</div>`;
        }).join('');

        html = `<h3 style="margin-bottom:12px">${member.emoji} ${member.name} — Voitot</h3>
            <p style="margin-bottom:12px">${member.name} on valinnut voittavan ravintolan <strong>${stats.winnerVotes}</strong> kertaa.</p>
            <div style="font-weight:600;margin-bottom:6px">Viimeisimmät voitot:</div>
            ${recentHtml || '<em>Ei voittoja</em>'}`;
    }
    openPopup(html);
}

function showTagPopup(tag, value) {
    const member = window._individualMember;
    if (!member) return;

    const label = TAG_LABELS[tag] || tag;
    const isPositive = value > 1;

    // Etsi ravintolat joiden menuissa tagi esiintyy usein
    const restaurantsWithTag = RESTAURANTS.filter(r =>
        r.menuPool.some(item => item.tags.includes(tag))
    ).map(r => {
        const count = r.menuPool.filter(item => item.tags.includes(tag)).length;
        return { name: r.name, count, total: r.menuPool.length };
    }).sort((a, b) => b.count - a.count);

    // Löydä esimerkkiannoksia tagilla
    const examples = [];
    RESTAURANTS.forEach(r => {
        r.menuPool.forEach(item => {
            if (item.tags.includes(tag) && examples.length < 5) {
                examples.push({ dish: item.name, restaurant: r.name });
            }
        });
    });

    // Mihin tag-kategoriaan kuuluu
    let category = '';
    for (const [cat, tags] of Object.entries(TAG_CATEGORIES)) {
        if (tags.includes(tag)) {
            category = cat === 'protein' ? 'Proteiini' : cat === 'cuisine' ? 'Keittiö' : cat === 'dishType' ? 'Ruokalaji' : 'Tyyli';
            break;
        }
    }

    let html = `<h3 style="margin-bottom:12px">${member.emoji} ${member.name} — "${label}"</h3>
        <p style="margin-bottom:8px"><strong>Kategoria:</strong> ${category}</p>
        <p style="margin-bottom:8px"><strong>Vetovoimakerroin:</strong> <span class="tag ${isPositive ? 'tag-positive' : 'tag-negative'}">${value.toFixed(2)}x</span></p>
        <p style="margin-bottom:12px">${isPositive
            ? `${member.name.split(' ')[0]} äänestää <strong>${value.toFixed(1)}x todennäköisemmin</strong> ravintolaa jossa "${label}" esiintyy menussa verrattuna keskiarvoon.`
            : `${member.name.split(' ')[0]} äänestää <strong>${(1/value).toFixed(1)}x epätodennäköisemmin</strong> ravintolaa jossa "${label}" esiintyy menussa.`}
        </p>
        <div style="font-weight:600;margin-bottom:6px">Ravintolat joissa "${label}" esiintyy:</div>
        ${restaurantsWithTag.slice(0, 6).map(r =>
            `<div style="padding:3px 0;font-size:0.85rem">${r.name} — ${r.count}/${r.total} annoksessa</div>`
        ).join('')}
        <div style="font-weight:600;margin-top:12px;margin-bottom:6px">Esimerkkiannoksia:</div>
        ${examples.map(e =>
            `<div style="padding:3px 0;font-size:0.85rem">• ${e.dish} <span style="color:var(--text-muted)">(${e.restaurant})</span></div>`
        ).join('')}`;
    openPopup(html);
}

function showAgreementPopup(otherId) {
    const member = window._individualMember;
    if (!member) return;
    const other = TEAM_MEMBERS.find(m => m.id === otherId);

    // Laske yhteiset päivät ja samat äänet
    const commonDays = votingData.filter(d =>
        d.presentMembers.includes(member.id) && d.presentMembers.includes(otherId)
    );
    const sameDays = commonDays.filter(d => d.votes[member.id] === d.votes[otherId]);
    const pct = commonDays.length > 0 ? Math.round(sameDays.length / commonDays.length * 100) : 0;

    // Mihin ravintolaan he äänestävät yhdessä useimmin
    const sharedVotes = {};
    sameDays.forEach(d => {
        const rid = d.votes[member.id];
        sharedVotes[rid] = (sharedVotes[rid] || 0) + 1;
    });
    const sharedSorted = Object.entries(sharedVotes).sort((a, b) => b[1] - a[1]);

    // Viimeisimmät yhteiset päivät
    const recent = commonDays.slice(-8).reverse();

    let html = `<h3 style="margin-bottom:12px">${member.emoji} ${member.name.split(' ')[0]} & ${other.emoji} ${other.name.split(' ')[0]}</h3>
        <p style="margin-bottom:8px">Yhteisiä äänestyspäiviä: <strong>${commonDays.length}</strong></p>
        <p style="margin-bottom:8px">Samaa mieltä: <strong>${sameDays.length}</strong> kertaa (<strong>${pct}%</strong>)</p>
        <div style="font-weight:600;margin-top:12px;margin-bottom:6px">Yhteisten valintojen suosikkipaikat:</div>
        ${sharedSorted.slice(0, 5).map(([rid, count], i) => {
            const r = RESTAURANTS.find(x => x.id === rid);
            return `<div style="padding:4px 0;font-size:0.85rem;border-bottom:1px solid var(--border)">${i+1}. ${r?.name} — ${count} kertaa</div>`;
        }).join('')}
        <div style="font-weight:600;margin-top:12px;margin-bottom:6px">Viimeisimmät yhteiset päivät:</div>
        ${recent.map(d => {
            const v1 = RESTAURANTS.find(x => x.id === d.votes[member.id])?.name || '?';
            const v2 = RESTAURANTS.find(x => x.id === d.votes[otherId])?.name || '?';
            const same = d.votes[member.id] === d.votes[otherId];
            return `<div style="padding:4px 0;font-size:0.85rem;border-bottom:1px solid var(--border)">
                ${d.date} — ${member.name.split(' ')[0]}: ${v1}, ${other.name.split(' ')[0]}: ${v2}
                ${same ? '<span class="tag tag-positive" style="font-size:0.7rem">sama</span>' : ''}
            </div>`;
        }).join('')}`;
    openPopup(html);
}

function handleTrendClick(event, elements, chart) {
    if (!elements || elements.length === 0) return;
    const member = window._individualMember;
    const stats = window._individualStats;
    const months = window._individualMonths;
    if (!member || !stats || !months) return;

    const idx = elements[0].index;
    const month = months[idx];
    if (!month) return;

    const monthVotes = stats.monthlyVotes[month] || {};
    const sorted = Object.entries(monthVotes).sort((a, b) => b[1] - a[1]);
    const total = sorted.reduce((s, [, v]) => s + v, 0);

    // Kuukauden äänestyshistoria
    const monthDays = votingData.filter(d =>
        d.date.startsWith(month) && d.presentMembers.includes(member.id)
    );

    let html = `<h3 style="margin-bottom:12px">${member.emoji} ${member.name.split(' ')[0]} — ${month}</h3>
        <p style="margin-bottom:12px">Äänestyspäiviä: <strong>${total}</strong></p>
        <div style="font-weight:600;margin-bottom:6px">Ravintolajakauma:</div>`;

    sorted.forEach(([rid, count]) => {
        const r = RESTAURANTS.find(x => x.id === rid);
        const pct = Math.round(count / total * 100);
        const color = getRestaurantColor(RESTAURANTS.indexOf(r));
        html += `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid var(--border)">
            <span style="width:130px;font-size:0.85rem;font-weight:500">${r?.name}</span>
            <div style="flex:1;height:16px;background:var(--bg);border-radius:8px;overflow:hidden">
                <div style="width:${pct}%;height:100%;background:${color};border-radius:8px"></div>
            </div>
            <span style="font-size:0.85rem;font-weight:600;width:50px;text-align:right">${count} (${pct}%)</span>
        </div>`;
    });

    html += `<div style="font-weight:600;margin-top:12px;margin-bottom:6px">Päiväkohtaiset äänet:</div>`;
    monthDays.forEach(d => {
        const r = RESTAURANTS.find(x => x.id === d.votes[member.id]);
        const won = d.votes[member.id] === d.winner;
        html += `<div style="padding:3px 0;font-size:0.8rem">${d.date} ${d.dayName.substring(0,2)} — ${r?.name} ${won ? '<span class="tag tag-positive" style="font-size:0.65rem">voitto</span>' : ''}</div>`;
    });
    openPopup(html);
}

function showPersonDetail(personId) {
    selectedPersonId = personId;
    // Vaihda yksilönäkymään
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelector('[data-view="view-individual"]').classList.add('active');
    document.getElementById('view-individual').classList.add('active');
    renderIndividual();
}

// ===== RYHMÄDYNAMIIKKA =====
function renderGroupDynamics() {
    // Yhteensopivuusmatriisi (heatmap)
    let matrixHtml = '<table class="heatmap-table"><tr><th></th>';
    TEAM_MEMBERS.forEach(m => {
        matrixHtml += `<th title="${m.name}">${m.name.split(' ')[0]}</th>`;
    });
    matrixHtml += '</tr>';

    TEAM_MEMBERS.forEach(a => {
        matrixHtml += `<tr><td><strong>${a.name.split(' ')[0]}</strong></td>`;
        TEAM_MEMBERS.forEach(b => {
            const val = groupDynamics.agreementMatrix[a.id][b.id];
            const pct = Math.round(val * 100);
            const intensity = Math.min(255, Math.round(val * 400));
            const bg = a.id === b.id ? '#e2e8f0' : `rgba(37, 99, 235, ${val * 1.5})`;
            const color = val > 0.35 ? 'white' : 'var(--text)';
            matrixHtml += `<td style="background:${bg};color:${color}" title="${a.name} & ${b.name}: ${pct}%">${a.id === b.id ? '-' : pct + '%'}</td>`;
        });
        matrixHtml += '</tr>';
    });
    matrixHtml += '</table>';
    document.getElementById('agreement-matrix').innerHTML = matrixHtml;

    // Koalitiot (top pari)
    let coalHtml = '';
    groupDynamics.coalitions.slice(0, 10).forEach((c, i) => {
        const m1 = TEAM_MEMBERS.find(m => m.id === c.members[0]);
        const m2 = TEAM_MEMBERS.find(m => m.id === c.members[1]);
        const pct = Math.round(c.rate * 100);
        coalHtml += `
            <div class="top-list-item">
                <div class="top-list-rank ${i < 3 ? ['gold', 'silver', 'bronze'][i] : ''}">${i + 1}</div>
                <div class="top-list-info">
                    <div class="top-list-name">${m1.emoji} ${m1.name.split(' ')[0]} & ${m2.emoji} ${m2.name.split(' ')[0]}</div>
                </div>
                <div class="top-list-value">${pct}%</div>
            </div>`;
    });
    document.getElementById('coalitions').innerHTML = coalHtml;

    // Hajonnan trendi (kuukausittain)
    const dispersalByMonth = {};
    groupDynamics.dispersalOverTime.forEach(d => {
        const month = d.date.substring(0, 7);
        if (!dispersalByMonth[month]) dispersalByMonth[month] = [];
        dispersalByMonth[month].push(d.dispersal);
    });

    const dispersalMonths = Object.keys(dispersalByMonth).sort();
    renderLineChart('chart-dispersal', {
        labels: dispersalMonths.map(m => m.substring(2)),
        datasets: [{
            label: 'Hajonnan keskiarvo',
            data: dispersalMonths.map(m => {
                const vals = dispersalByMonth[m];
                return vals.reduce((a, b) => a + b, 0) / vals.length;
            }),
            borderColor: '#8b5cf6',
            backgroundColor: '#8b5cf620',
            tension: 0.3,
            fill: true
        }]
    }, { ylabel: 'Hajonta (0=yksimielinen, 1=kaikki eri)', min: 0, max: 1 });

    // Henkilöiden voittoprosentti
    const winRates = TEAM_MEMBERS.map(m => {
        const stats = computePersonStats(m.id, votingData);
        return { member: m, winRate: stats.winRate };
    }).sort((a, b) => b.winRate - a.winRate);

    renderBarChart('chart-win-rates', {
        labels: winRates.map(w => w.member.name.split(' ')[0]),
        datasets: [{
            label: 'Voitto-%',
            data: winRates.map(w => Math.round(w.winRate * 100)),
            backgroundColor: winRates.map((w, i) => getRestaurantColor(i))
        }]
    }, {});
}

// ===== ENNUSTE =====
function renderPrediction() {
    // Henkilövalitsin (toggle)
    let toggleHtml = '';
    TEAM_MEMBERS.forEach(m => {
        const active = activePredictionMembers.has(m.id) ? 'active' : '';
        toggleHtml += `
            <div class="person-toggle ${active}" onclick="togglePredictionPerson('${m.id}')">
                <span>${m.emoji}</span>
                <span>${m.name.split(' ')[0]}</span>
            </div>`;
    });
    document.getElementById('prediction-persons').innerHTML = toggleHtml;

    // Näytä päivän menut
    renderTodayMenus();

    // Laske ennuste
    const presentIds = Array.from(activePredictionMembers);
    if (presentIds.length === 0) {
        document.getElementById('prediction-result').innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px">Valitse ainakin yksi henkilö</p>';
        return;
    }

    const result = predict(predictionModel, presentIds, currentTodayMenus);

    // Voittaja
    const winnerR = RESTAURANTS.find(r => r.id === result.winner);
    const confidence = Math.round(result.confidence * 100);

    document.getElementById('prediction-winner-box').innerHTML = winnerR ? `
        <div class="prediction-winner">
            <h3>Ennuste: ${winnerR.name}</h3>
            <p>Todennäköisyys ${confidence}% &bull; ${winnerR.address} &bull; ${winnerR.price}</p>
            <p style="margin-top:8px;font-size:0.8rem">${presentIds.length} henkilöä paikalla</p>
        </div>` : '';

    // Yksityiskohtaiset per-henkilö pisteet
    const detailed = predictDetailed(predictionModel, presentIds, currentTodayMenus);

    // Kaikki ravintolat pisteytettynä
    const sortedScores = Object.entries(result.scores)
        .sort((a, b) => b[1] - a[1]);

    let barsHtml = '';
    const maxScore = sortedScores[0]?.[1] || 1;

    sortedScores.forEach(([rid, score]) => {
        const r = RESTAURANTS.find(x => x.id === rid);
        const pct = Math.round(score * 100);
        const barWidth = Math.max(2, score / maxScore * 100);
        const colorIdx = RESTAURANTS.indexOf(r);
        const isWinner = rid === result.winner;
        const color = getRestaurantColor(colorIdx);

        barsHtml += `
            <div class="prediction-bar prediction-bar-clickable" onclick="showPredictionDetail('${rid}')" title="Klikkaa nähdäksesi lisätiedot">
                <div class="prediction-bar-label">${r.name}</div>
                <div class="prediction-bar-track">
                    <div class="prediction-bar-fill" style="width:${barWidth}%;background:${color}${isWinner ? '' : '99'}">${pct > 5 ? pct + '%' : ''}</div>
                </div>
                <div class="prediction-bar-pct" style="color:${color}">${pct}%</div>
            </div>`;
    });
    document.getElementById('prediction-result').innerHTML = barsHtml;

    // Tallennetaan detailed tila popupia varten
    window._predictionDetailed = detailed;
    window._predictionMenus = currentTodayMenus;

    // Per-henkilö ennuste
    let perPersonHtml = '<div class="card-title">Yksilöennusteet</div>';
    presentIds.forEach(mid => {
        const member = TEAM_MEMBERS.find(m => m.id === mid);
        const personalResult = predict(predictionModel, [mid], currentTodayMenus);
        const topR = RESTAURANTS.find(r => r.id === personalResult.winner);
        const topPct = Math.round(personalResult.confidence * 100);

        perPersonHtml += `
            <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--border)">
                <span>${member.emoji}</span>
                <span style="width:100px;font-weight:500;font-size:0.85rem">${member.name.split(' ')[0]}</span>
                <span style="flex:1;font-size:0.85rem">${topR ? topR.name : '-'}</span>
                <span style="font-weight:600;color:var(--primary)">${topPct}%</span>
            </div>`;
    });
    document.getElementById('prediction-per-person').innerHTML = perPersonHtml;
}

function showPredictionDetail(restaurantId) {
    const r = RESTAURANTS.find(x => x.id === restaurantId);
    if (!r) return;

    const detailed = window._predictionDetailed || {};
    const menus = window._predictionMenus || {};
    const personScores = detailed[restaurantId] || {};
    const presentIds = Array.from(activePredictionMembers);

    // Ravintolan menu
    const menuItems = menus[restaurantId] || [];
    let menuHtml = menuItems.map(item => {
        const tags = item.tags.slice(0, 4).map(t => `<span class="tag tag-neutral" style="font-size:0.7rem">${TAG_LABELS[t] || t}</span>`).join('');
        return `<div style="padding:2px 0;font-size:0.85rem">• ${item.name} ${tags}</div>`;
    }).join('');

    // Per-henkilö pisteytys, järjestettynä pisteillä
    const personEntries = presentIds
        .filter(mid => personScores[mid])
        .map(mid => ({ id: mid, ...personScores[mid] }))
        .sort((a, b) => b.score - a.score);

    const maxPersonScore = personEntries[0]?.score || 1;

    let personsHtml = '';
    personEntries.forEach(p => {
        const member = TEAM_MEMBERS.find(m => m.id === p.id);
        const barWidth = Math.max(3, (p.score / maxPersonScore) * 100);

        // Vetovoimatekijät
        let tagsHtml = '';
        if (p.topTags.length > 0) {
            tagsHtml = p.topTags.map(t => {
                const cls = t.weight > 0 ? 'tag-positive' : 'tag-negative';
                return `<span class="tag ${cls}" style="font-size:0.65rem">${TAG_LABELS[t.tag] || t.tag}</span>`;
            }).join('');
        }

        personsHtml += `
            <div class="popup-person-row">
                <span style="font-size:1.1rem">${member.emoji}</span>
                <div class="popup-person-name">${member.name.split(' ')[0]}</div>
                <div class="popup-person-bar">
                    <div class="popup-person-bar-fill" style="width:${barWidth}%;background:var(--primary)"></div>
                </div>
                <div class="popup-person-detail">
                    <div>Suosio ${p.bias}% ${p.menuMatch > 0 ? '+ menu ' + p.menuMatch + '%' : p.menuMatch < 0 ? '- menu ' + Math.abs(p.menuMatch) + '%' : ''}</div>
                    <div>${tagsHtml}</div>
                </div>
            </div>`;
    });

    const linkHtml = r.website
        ? `<a href="${r.website}" target="_blank" class="btn btn-primary" style="font-size:0.8rem;padding:6px 12px;text-decoration:none">Ruokalista &rarr;</a>`
        : '';

    document.getElementById('prediction-popup-body').innerHTML = `
        <div class="popup-restaurant-header">
            <div>
                <h3>${r.name}</h3>
                <div style="font-size:0.85rem;color:var(--text-muted)">${r.address}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">${r.hours} &bull; <strong style="color:var(--accent)">${r.price}</strong></div>
                <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px">${r.description}</div>
            </div>
            <div style="text-align:right">${linkHtml}</div>
        </div>
        <div style="margin-bottom:16px">
            <div style="font-weight:600;margin-bottom:6px">Päivän lounas:</div>
            ${menuHtml || '<em style="color:var(--text-muted)">Ei menutietoja</em>'}
        </div>
        <div>
            <div style="font-weight:600;margin-bottom:8px">Keiden äänet vaikuttavat (${personEntries.length} hlö):</div>
            ${personsHtml}
        </div>`;

    document.getElementById('prediction-popup-overlay').style.display = 'flex';
}

function closePredictionPopup() {
    document.getElementById('prediction-popup-overlay').style.display = 'none';
}

function togglePredictionPerson(personId) {
    if (activePredictionMembers.has(personId)) {
        activePredictionMembers.delete(personId);
    } else {
        activePredictionMembers.add(personId);
    }
    renderPrediction();
}

function refreshMenus() {
    currentTodayMenus = generateTodayMenus();
    renderPrediction();
}

function renderTodayMenus() {
    let menuHtml = '';
    RESTAURANTS.forEach(r => {
        const items = currentTodayMenus[r.id] || [];
        const linkHtml = r.website ? `<a href="${r.website}" target="_blank" onclick="event.stopPropagation()" style="color:var(--primary);text-decoration:none;font-size:0.8rem;margin-left:8px" title="Avaa ruokalista">🔗 Ruokalista</a>` : '';
        menuHtml += `
            <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('open')">
                <span>${r.name} (${r.price})${linkHtml}</span>
                <span style="font-size:0.8rem;color:var(--text-muted)">${items.length} annosta ▼</span>
            </div>
            <div class="accordion-body">`;
        items.forEach(item => {
            menuHtml += `
                <div class="menu-item">
                    <span>${item.name}</span>
                    <div class="menu-item-tags">
                        ${item.tags.slice(0, 4).map(t => `<span class="tag tag-neutral">${TAG_LABELS[t] || t}</span>`).join('')}
                    </div>
                </div>`;
        });
        menuHtml += '</div>';
    });
    document.getElementById('today-menus').innerHTML = menuHtml;
}

// ===== HISTORIA =====
function renderHistory() {
    const search = document.getElementById('history-search')?.value?.toLowerCase() || '';
    const sorted = [...votingData].reverse();

    const filtered = search ? sorted.filter(day =>
        day.date.includes(search) ||
        day.dayName.includes(search) ||
        RESTAURANTS.find(r => r.id === day.winner)?.name.toLowerCase().includes(search)
    ) : sorted;

    const totalPages = Math.ceil(filtered.length / HISTORY_PAGE_SIZE);
    if (historyPage >= totalPages) historyPage = Math.max(0, totalPages - 1);

    const pageData = filtered.slice(historyPage * HISTORY_PAGE_SIZE, (historyPage + 1) * HISTORY_PAGE_SIZE);

    let html = '';
    pageData.forEach(day => {
        const winnerR = RESTAURANTS.find(r => r.id === day.winner);
        const dayLabel = day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1);

        let votesHtml = '';
        Object.entries(day.votes).forEach(([memberId, restaurantId]) => {
            const member = TEAM_MEMBERS.find(m => m.id === memberId);
            const r = RESTAURANTS.find(x => x.id === restaurantId);
            const isWinner = restaurantId === day.winner;
            votesHtml += `<span class="vote-chip ${isWinner ? 'winner' : ''}">${member.emoji} ${r?.name?.substring(0, 12) || restaurantId}</span>`;
        });

        html += `
            <div class="history-day">
                <div class="history-day-date">${day.date}<br><small style="color:var(--text-muted)">${dayLabel}</small></div>
                <div class="history-day-winner">${winnerR?.name || day.winner} (${day.winnerVotes})</div>
                <div class="history-day-votes">${votesHtml}</div>
            </div>`;
    });

    document.getElementById('history-list').innerHTML = html;

    // Pagination
    let pageHtml = '';
    if (totalPages > 1) {
        pageHtml += `<button class="page-btn" onclick="historyPage=0;renderHistory()" ${historyPage === 0 ? 'disabled' : ''}>&laquo;</button>`;
        pageHtml += `<button class="page-btn" onclick="historyPage=Math.max(0,historyPage-1);renderHistory()" ${historyPage === 0 ? 'disabled' : ''}>&lsaquo;</button>`;

        const start = Math.max(0, historyPage - 2);
        const end = Math.min(totalPages, start + 5);
        for (let i = start; i < end; i++) {
            pageHtml += `<button class="page-btn ${i === historyPage ? 'active' : ''}" onclick="historyPage=${i};renderHistory()">${i + 1}</button>`;
        }

        pageHtml += `<button class="page-btn" onclick="historyPage=Math.min(${totalPages - 1},historyPage+1);renderHistory()" ${historyPage >= totalPages - 1 ? 'disabled' : ''}>&rsaquo;</button>`;
        pageHtml += `<button class="page-btn" onclick="historyPage=${totalPages - 1};renderHistory()" ${historyPage >= totalPages - 1 ? 'disabled' : ''}>&raquo;</button>`;
    }
    pageHtml += `<span style="padding:6px 12px;font-size:0.8rem;color:var(--text-muted)">${filtered.length} päivää</span>`;
    document.getElementById('history-pagination').innerHTML = pageHtml;
}

// ===== KARTTA =====
let mapInstance = null;

function initMap() {
    if (mapInstance) return;

    // Laske kaikkien ravintoloiden ja toimiston rajat
    const allPoints = RESTAURANTS.map(r => [r.lat, r.lng]);
    allPoints.push([OFFICE_LOCATION.lat, OFFICE_LOCATION.lng]);
    const bounds = L.latLngBounds(allPoints);

    mapInstance = L.map('map').fitBounds(bounds, { padding: [30, 30] });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(mapInstance);

    // Toimiston merkki
    const officeIcon = L.divIcon({
        className: 'office-icon',
        html: '🏢',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });

    L.marker([OFFICE_LOCATION.lat, OFFICE_LOCATION.lng], { icon: officeIcon })
        .addTo(mapInstance)
        .bindPopup(`<div class="restaurant-popup"><h3>${OFFICE_LOCATION.name}</h3><p>${OFFICE_LOCATION.address}</p></div>`);

    L.circle([OFFICE_LOCATION.lat, OFFICE_LOCATION.lng], {
        radius: 200,
        color: '#2563eb',
        fillColor: '#2563eb',
        fillOpacity: 0.05,
        weight: 1,
        dashArray: '5, 5'
    }).addTo(mapInstance);

    // Ravintolamerkit
    const defaultIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    RESTAURANTS.forEach((r, i) => {
        // Päivän menu
        const todayMenu = currentTodayMenus?.[r.id] || r.menuPool.slice(0, 3);
        let menuHtml = todayMenu.map(item => `<div style="font-size:0.8rem;padding:2px 0">• ${item.name}</div>`).join('');

        // Suosio datan perusteella
        const votes = overviewStats?.restaurantVotes[r.id] || 0;
        const wins = overviewStats?.restaurantWins[r.id] || 0;

        const popupContent = `
            <div class="restaurant-popup">
                <h3>${r.name}</h3>
                <p>${r.address}</p>
                <p>${r.hours} &bull; <span class="price">${r.price}</span></p>
                <p style="font-size:0.8rem;color:var(--text-muted)">${r.description}</p>
                ${r.website ? `<p><a href="${r.website}" target="_blank">Kotisivu</a></p>` : ''}
                <div style="margin-top:8px;padding-top:8px;border-top:1px solid #eee">
                    <div class="menu-title">Päivän lounas:</div>
                    ${menuHtml}
                </div>
                <div style="margin-top:8px;font-size:0.8rem;color:var(--text-muted)">
                    Ääniä: ${votes} &bull; Voittoja: ${wins}
                </div>
            </div>`;

        L.marker([r.lat, r.lng], { icon: defaultIcon })
            .addTo(mapInstance)
            .bindPopup(popupContent);
    });

    // Ravintolalista kartan alla
    let listHtml = '';
    const sortedByVotes = RESTAURANTS.map(r => ({
        ...r,
        votes: overviewStats?.restaurantVotes[r.id] || 0,
        wins: overviewStats?.restaurantWins[r.id] || 0
    })).sort((a, b) => b.votes - a.votes);

    sortedByVotes.forEach((r, i) => {
        listHtml += `
            <div class="card" style="cursor:pointer" onclick="mapInstance.setView([${r.lat},${r.lng}],16)">
                <div style="display:flex;justify-content:space-between;align-items:flex-start">
                    <div>
                        <div class="card-title" style="margin-bottom:4px">${r.name}</div>
                        <div style="font-size:0.8rem;color:var(--text-muted)">${r.address}</div>
                        <div style="font-size:0.8rem;margin-top:2px">${r.hours} &bull; <strong>${r.price}</strong></div>
                        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px">${r.description}</div>
                        ${r.website ? `<a href="${r.website}" target="_blank" style="font-size:0.8rem">Kotisivu</a>` : ''}
                    </div>
                    <div style="text-align:right">
                        <div style="font-size:1.1rem;font-weight:700;color:var(--primary)">${r.votes}</div>
                        <div style="font-size:0.75rem;color:var(--text-muted)">ääntä</div>
                        <div style="font-size:0.9rem;font-weight:600;color:var(--success);margin-top:4px">${r.wins}</div>
                        <div style="font-size:0.75rem;color:var(--text-muted)">voittoa</div>
                    </div>
                </div>
            </div>`;
    });
    document.getElementById('map-restaurant-list').innerHTML = listHtml;
}

// ===== PÄIVÄN RUOKALISTAT =====

function getTodayDayIndex() {
    const jsDay = new Date().getDay(); // 0=Sun, 1=Mon...
    if (jsDay === 0 || jsDay === 6) return 0; // Viikonloppu -> näytä maanantai
    return jsDay - 1; // 0=Ma, 1=Ti...
}

function generateWeeklyMenus() {
    // Generoi koko viikon menut seedillä joka vaihtuu viikottain
    const now = new Date();
    const weekNum = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    const seed = now.getFullYear() * 100 + weekNum;
    const rng = mulberry32(seed);

    const menus = {};
    DAYS.forEach((day, dayIdx) => {
        menus[day] = {};
        RESTAURANTS.forEach(r => {
            const numItems = 2 + Math.floor(rng() * 2); // 2-3 annosta
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
            menus[day][r.id] = items;
        });
    });
    return menus;
}

function initDailyView() {
    if (!weeklyMenus) weeklyMenus = generateWeeklyMenus();
    if (activeDayIndex === null) activeDayIndex = getTodayDayIndex();

    if (!dailyViewInitialized) {
        renderDaySelector();
        renderRestaurantFilter();
        document.getElementById('daily-search-input').addEventListener('input', filterDailyView);
        dailyViewInitialized = true;
    }
    filterDailyView();
}

function renderDaySelector() {
    const container = document.getElementById('day-selector');
    container.innerHTML = '';
    const todayIdx = getTodayDayIndex();

    DAYS.forEach((day, i) => {
        const btn = document.createElement('button');
        btn.className = 'day-btn' + (i === activeDayIndex ? ' active' : '');
        let label = day.charAt(0).toUpperCase() + day.slice(1);
        if (i === todayIdx) label += ' (tänään)';
        btn.textContent = label;
        btn.addEventListener('click', () => {
            container.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeDayIndex = i;
            filterDailyView();
        });
        container.appendChild(btn);
    });
}

function renderRestaurantFilter() {
    const container = document.getElementById('restaurant-filter');
    container.innerHTML = '';

    // "Kaikki" button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Kaikki';
    allBtn.dataset.id = 'all';
    allBtn.addEventListener('click', () => {
        dailyFilterIds = null;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        filterDailyView();
    });
    container.appendChild(allBtn);

    // Ravintolakohtaiset napit
    RESTAURANTS.forEach(r => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = r.name;
        btn.dataset.id = r.id;
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active') && dailyFilterIds && dailyFilterIds.size === 1) {
                // Ainoa aktiivinen -> takaisin kaikki
                dailyFilterIds = null;
                container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
            } else {
                allBtn.classList.remove('active');
                btn.classList.toggle('active');

                const activeBtns = container.querySelectorAll('.filter-btn.active:not([data-id="all"])');
                if (activeBtns.length === 0) {
                    dailyFilterIds = null;
                    allBtn.classList.add('active');
                } else {
                    dailyFilterIds = new Set();
                    activeBtns.forEach(b => dailyFilterIds.add(b.dataset.id));
                }
            }
            filterDailyView();
        });
        container.appendChild(btn);
    });
}

function renderDailyMenu(dayIndex) {
    const container = document.getElementById('daily-list');
    container.innerHTML = '';
    const dayName = DAYS[dayIndex];
    const dayMenus = weeklyMenus[dayName];

    RESTAURANTS.forEach(r => {
        const items = dayMenus[r.id] || [];
        const card = document.createElement('div');
        card.className = 'daily-card' + (items.length === 0 ? ' no-menu' : '');
        card.dataset.id = r.id;

        const menuText = items.length > 0
            ? items.map(item => {
                const tagHtml = item.tags.slice(0, 3).map(t =>
                    `<span class="tag tag-neutral" style="font-size:0.7rem">${TAG_LABELS[t] || t}</span>`
                ).join('');
                return `<div style="margin-bottom:4px">• ${item.name} ${tagHtml}</div>`;
            }).join('')
            : '<em>Menu ei saatavilla</em>';

        const linkHtml = r.website
            ? `<a href="${r.website}" target="_blank" class="dc-link">Ruokalista &rarr;</a>`
            : '';

        card.innerHTML = `
            <div>
                <div class="dc-name">${r.name}</div>
                <div class="dc-meta">${r.address}</div>
                <div class="dc-meta">${r.hours}</div>
                ${linkHtml}
            </div>
            <div class="dc-menu">${menuText}</div>
            <div class="dc-price">${r.price}</div>
        `;
        container.appendChild(card);
    });
}

function filterDailyView() {
    renderDailyMenu(activeDayIndex);
    const query = (document.getElementById('daily-search-input').value || '').toLowerCase().trim();
    const cards = document.querySelectorAll('#daily-list .daily-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const id = card.dataset.id;
        const matchesFilter = !dailyFilterIds || dailyFilterIds.has(id);
        const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
        const visible = matchesFilter && matchesSearch;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
    });

    const noResults = document.getElementById('daily-no-results');
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// ===== CHART.JS APUFUNKTIOT =====
const chartInstances = {};

function renderBarChart(canvasId, data, options = {}) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: options.indexAxis || 'x',
            plugins: {
                legend: { display: data.datasets.length > 1, position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
            },
            scales: {
                x: { stacked: options.stacked, grid: { display: false } },
                y: {
                    stacked: options.stacked,
                    beginAtZero: true,
                    title: options.ylabel ? { display: true, text: options.ylabel } : undefined
                }
            }
        }
    });
}

function renderLineChart(canvasId, data, options = {}) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const chartConfig = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: data.datasets.length > 1, position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { maxRotation: 45, font: { size: 10 } }
                },
                y: {
                    beginAtZero: true,
                    min: options.min,
                    max: options.max,
                    title: options.ylabel ? { display: true, text: options.ylabel } : undefined
                }
            }
        }
    };

    if (options.onClick) {
        chartConfig.options.onClick = (event, elements) => {
            options.onClick(event, elements, chartInstances[canvasId]);
        };
    }

    chartInstances[canvasId] = new Chart(ctx, chartConfig);
}

function renderDoughnutChart(canvasId, data, restaurantIds) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 } } }
            },
            onClick: (event, elements) => {
                if (!elements || elements.length === 0 || !restaurantIds) return;
                const idx = elements[0].index;
                const rid = restaurantIds[idx];
                if (rid) showRestaurantVotePopup(rid);
            }
        }
    });
}

function showRestaurantVotePopup(restaurantId) {
    const member = window._individualMember;
    const stats = window._individualStats;
    if (!member || !stats) return;

    const r = RESTAURANTS.find(x => x.id === restaurantId);
    if (!r) return;

    const voteCount = stats.restaurantVotes[restaurantId] || 0;
    const totalVotes = Object.values(stats.restaurantVotes).reduce((a, b) => a + b, 0);
    const pct = totalVotes > 0 ? Math.round(voteCount / totalVotes * 100) : 0;

    // Kuinka usein tämä ravintola voitti kun henkilö äänesti sitä
    const personVoteDays = votingData.filter(d =>
        d.presentMembers.includes(member.id) && d.votes[member.id] === restaurantId
    );
    const wonDays = personVoteDays.filter(d => d.winner === restaurantId);
    const winPct = personVoteDays.length > 0 ? Math.round(wonDays.length / personVoteDays.length * 100) : 0;

    // Suosituimmat menu-tagit tässä ravintolassa
    const tagCounts = {};
    r.menuPool.forEach(item => item.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
    const topMenuTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Viimeisimmät äänet
    const recent = personVoteDays.slice(-6).reverse();

    const linkHtml = r.website
        ? `<a href="${r.website}" target="_blank" class="btn btn-primary" style="font-size:0.8rem;padding:6px 12px;text-decoration:none;margin-top:8px;display:inline-block">Ruokalista &rarr;</a>`
        : '';

    let html = `<h3 style="margin-bottom:4px">${member.emoji} ${member.name.split(' ')[0]} &rarr; ${r.name}</h3>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px">${r.address} &bull; ${r.hours} &bull; ${r.price}</div>
        ${linkHtml}
        <div style="margin-top:12px;display:flex;gap:20px;margin-bottom:12px">
            <div><strong style="font-size:1.3rem;color:var(--primary)">${voteCount}</strong><br><span style="font-size:0.8rem;color:var(--text-muted)">ääntä (${pct}%)</span></div>
            <div><strong style="font-size:1.3rem;color:var(--success)">${wonDays.length}</strong><br><span style="font-size:0.8rem;color:var(--text-muted)">voittoa (${winPct}%)</span></div>
        </div>
        <div style="font-weight:600;margin-bottom:6px">Ravintolan tyypilliset tagit:</div>
        <div style="margin-bottom:12px">${topMenuTags.map(([t, c]) =>
            `<span class="tag tag-neutral">${TAG_LABELS[t] || t} (${c})</span>`
        ).join('')}</div>
        <div style="font-weight:600;margin-bottom:6px">Viimeisimmät äänet tälle ravintolalle:</div>
        ${recent.map(d => {
            const won = d.winner === restaurantId;
            return `<div style="padding:3px 0;font-size:0.85rem">${d.date} ${d.dayName.substring(0,2)} ${won ? '<span class="tag tag-positive" style="font-size:0.65rem">voitto</span>' : '<span class="tag tag-negative" style="font-size:0.65rem">hävisi</span>'}</div>`;
        }).join('')}`;
    openPopup(html);
}
