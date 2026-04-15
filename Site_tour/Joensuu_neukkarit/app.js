// ==========================================
//  Neukkarit - Siili Joensuu
//  Kokoushuoneiden hallinta
// ==========================================

(function() {
'use strict';

// ---- i18n ----
const T = {
    fi: {
        guideLink: 'Käyttöohje \u2192',
        headerTitle: 'Joensuun toimiston kokoushuoneet',
        tabRooms: 'Huoneet', tabTimeline: 'Aikajana', tabPeople: 'Ihmiset',
        btnToday: 'Tanaan',
        modalBook: 'Varaa huone', modalDetail: 'Varauksen tiedot',
        formRoom: 'Huone', formSubject: 'Aihe', formOrganizer: 'Varaaja',
        formStart: 'Alkaa', formEnd: 'Paattyy',
        phSubject: 'Esim. Sprint Planning',
        btnCancel: 'Peruuta', btnBook: 'Varaa', btnDelete: 'Poista varaus',
        free: 'Vapaa', busy: 'Varattu', soonFree: 'Vapautuu pian',
        persons: 'hloa', floor: 'Kerros',
        noBookings: 'Ei varauksia talle paivalle',
        bookRoom: 'Varaa huone',
        toastBooked: 'Varaus tehty!', toastDeleted: 'Varaus poistettu',
        toastError: 'Tarkista tiedot',
        filterAll: 'Kaikki', filterOffice: 'Toimistolla', filterRemote: 'Etana', filterAway: 'Poissa',
        statOffice: 'Toimistolla', statRemote: 'Etana', statAway: 'Poissa',
        organizer: 'Jarjestaja', participants: 'Osallistujat',
        capacity: 'Kapasiteetti', equipment: 'Varustelu',
        roomLabel: 'Huoneet', timeLabel: 'Aika',
        phPersonSearch: 'Kenen varaukset? Hae nimella...',
        personBookings: 'varausta tanaan', personNoBookings: 'Ei varauksia tanaan',
        days: ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai'],
        daysShort: ['Su','Ma','Ti','Ke','To','Pe','La'],
        months: ['tammikuuta','helmikuuta','maaliskuuta','huhtikuuta','toukokuuta','kesakuuta','heinakuuta','elokuuta','syyskuuta','lokakuuta','marraskuuta','joulukuuta']
    },
    en: {
        guideLink: 'User Guide \u2192',
        headerTitle: 'Joensuu office meeting rooms',
        tabRooms: 'Rooms', tabTimeline: 'Timeline', tabPeople: 'People',
        btnToday: 'Today',
        modalBook: 'Book room', modalDetail: 'Booking details',
        formRoom: 'Room', formSubject: 'Subject', formOrganizer: 'Booker',
        formStart: 'Starts', formEnd: 'Ends',
        phSubject: 'E.g. Sprint Planning',
        btnCancel: 'Cancel', btnBook: 'Book', btnDelete: 'Delete booking',
        free: 'Free', busy: 'Busy', soonFree: 'Free soon',
        persons: 'ppl', floor: 'Floor',
        noBookings: 'No bookings for this day',
        bookRoom: 'Book room',
        toastBooked: 'Booking created!', toastDeleted: 'Booking deleted',
        toastError: 'Please check the details',
        filterAll: 'All', filterOffice: 'In office', filterRemote: 'Remote', filterAway: 'Away',
        statOffice: 'In office', statRemote: 'Remote', statAway: 'Away',
        organizer: 'Organizer', participants: 'Participants',
        capacity: 'Capacity', equipment: 'Equipment',
        roomLabel: 'Rooms', timeLabel: 'Time',
        phPersonSearch: "Whose bookings? Search by name...",
        personBookings: 'bookings today', personNoBookings: 'No bookings today',
        days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        daysShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        months: ['January','February','March','April','May','June','July','August','September','October','November','December']
    }
};

let lang = localStorage.getItem('siteTourLang') || 'fi';
const t = (key) => (T[lang] && T[lang][key]) || (T.fi[key]) || key;

function applyLang(l) {
    lang = l;
    localStorage.setItem('siteTourLang', l);
    document.documentElement.lang = l;
    document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === l));
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (T[l] && T[l][key]) el.textContent = T[l][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (T[l] && T[l][key]) el.placeholder = T[l][key];
    });
    render();
}

// ---- State ----
let currentDate = new Date();
let currentView = 'timeline';
let presenceFilter = 'all';
let selectedPerson = null; // { id, name } or null

// ---- Elements ----
const $ = id => document.getElementById(id);
const dateLabel = $('dateLabel');
const roomsGrid = $('roomsGrid');
const fullTimeline = $('fullTimeline');
const presenceStats = $('presenceStats');
const peopleFilters = $('peopleFilters');
const peopleGrid = $('peopleGrid');
const tooltip = $('tooltip');
const toast = $('toast');
const bookingModal = $('bookingModal');
const headerDate = $('headerDate');

// ---- Date helpers ----
function formatDate(d) {
    const day = t('days')[d.getDay()];
    const dd = d.getDate();
    const month = t('months')[d.getMonth()];
    const yyyy = d.getFullYear();
    return `${day} ${dd}. ${month} ${yyyy}`;
}

function formatDateShort(d) {
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
}

function isToday(d) {
    const now = new Date();
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function timeStr(h) {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    return `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}`;
}

function currentHourFraction() {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
}

// ---- Navigation ----
$('prevDay').onclick = () => { currentDate.setDate(currentDate.getDate() - 1); render(); };
$('nextDay').onclick = () => { currentDate.setDate(currentDate.getDate() + 1); render(); };
$('todayBtn').onclick = () => { currentDate = new Date(); render(); };

// Tabs
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentView = tab.dataset.view;
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        $(currentView).classList.add('active');
    });
});

// Language
document.querySelectorAll('.lang-btn').forEach(b =>
    b.addEventListener('click', () => applyLang(b.dataset.lang)));

// ---- Room status ----
function getRoomStatus(room, bookings, now) {
    const roomBookings = bookings.filter(b => b.roomId === room.id)
        .sort((a,b) => a.startHour - b.startHour);

    const current = roomBookings.find(b => now >= b.startHour && now < b.endHour);
    if (current) {
        // Varattu - vapautuuko pian (30 min sisalla)?
        if (current.endHour - now <= 0.5) {
            return { status: 'soon', booking: current, label: t('soonFree') };
        }
        return { status: 'busy', booking: current, label: t('busy') };
    }
    return { status: 'free', booking: null, label: t('free') };
}

// ---- Avatar color ----
function avatarColor(id) {
    const colors = ['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899','#84cc16','#f97316','#6366f1'];
    return colors[id % colors.length];
}

// ---- Person filter ----
const personSearch = $('personSearch');
const personSuggestions = $('personSuggestions');
const personChip = $('personChip');
const personFilterSummary = $('personFilterSummary');

function isPersonInBooking(b, personId) {
    return b.organizer === personId || (b.participants && b.participants.includes(personId));
}

function renderPersonChip() {
    if (selectedPerson) {
        const emp = EMPLOYEES.find(e => e.id === selectedPerson.id);
        personChip.innerHTML = `<span class="person-chip">
            <span class="avatar" style="background:${avatarColor(selectedPerson.id)};width:22px;height:22px;font-size:0.5rem;border:none">${emp ? emp.avatar : '?'}</span>
            ${selectedPerson.name}
            <button class="person-chip-close" onclick="clearPersonFilter()">&#10005;</button>
        </span>`;
        personSearch.style.display = 'none';
    } else {
        personChip.innerHTML = '';
        personSearch.style.display = '';
        personSearch.value = '';
    }
}

function updatePersonSummary(bookings) {
    if (!selectedPerson) {
        personFilterSummary.textContent = '';
        return;
    }
    const count = bookings.filter(b => isPersonInBooking(b, selectedPerson.id)).length;
    personFilterSummary.textContent = count > 0
        ? `${count} ${t('personBookings')}`
        : t('personNoBookings');
}

window.clearPersonFilter = function() {
    selectedPerson = null;
    renderPersonChip();
    render();
};

personSearch.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    if (q.length < 1) {
        personSuggestions.classList.remove('show');
        return;
    }
    const matches = EMPLOYEES.filter(e =>
        e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)
    ).slice(0, 8);

    if (matches.length === 0) {
        personSuggestions.classList.remove('show');
        return;
    }

    personSuggestions.innerHTML = matches.map(e =>
        `<div class="person-sug-item" data-id="${e.id}">
            <div class="sug-avatar" style="background:${avatarColor(e.id)}">${e.avatar}</div>
            <span class="sug-name">${e.name}</span>
            <span class="sug-role">${e.role}</span>
        </div>`
    ).join('');
    personSuggestions.classList.add('show');

    personSuggestions.querySelectorAll('.person-sug-item').forEach(item => {
        item.addEventListener('click', () => {
            const emp = EMPLOYEES.find(e => e.id === parseInt(item.dataset.id));
            if (emp) {
                selectedPerson = { id: emp.id, name: emp.name };
                personSuggestions.classList.remove('show');
                renderPersonChip();
                render();
            }
        });
    });
});

personSearch.addEventListener('focus', function() {
    if (this.value.trim().length >= 1) {
        this.dispatchEvent(new Event('input'));
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.person-search-wrap')) {
        personSuggestions.classList.remove('show');
    }
});

// ---- Render: Rooms View ----
function renderRooms() {
    const bookings = getAllBookings(currentDate);
    const presence = generatePresence(currentDate);
    const now = isToday(currentDate) ? currentHourFraction() : -1;

    const START_H = 8, END_H = 17;
    const filtering = !!selectedPerson;

    renderPersonChip();
    updatePersonSummary(bookings);

    roomsGrid.innerHTML = ROOMS.map(room => {
        const roomBookings = bookings.filter(b => b.roomId === room.id).sort((a,b) => a.startHour - b.startHour);
        const status = getRoomStatus(room, bookings, now);

        // Does this room have any bookings for the selected person?
        const roomHasMatch = filtering && roomBookings.some(b => isPersonInBooking(b, selectedPerson.id));
        const roomCardClass = filtering ? (roomHasMatch ? 'room-card highlighted' : 'room-card dimmed') : 'room-card';

        // Timeline slots
        const slots = roomBookings.map(b => {
            const left = Math.max(0, (b.startHour - START_H) / (END_H - START_H) * 100);
            const width = Math.min(100 - left, (b.endHour - b.startHour) / (END_H - START_H) * 100);
            const match = filtering && isPersonInBooking(b, selectedPerson.id);
            const slotClass = filtering ? (match ? 'timeline-slot highlighted' : 'timeline-slot dimmed') : 'timeline-slot';
            return `<div class="${slotClass}" style="left:${left}%;width:${width}%;background:${room.color}cc"
                        data-booking='${JSON.stringify(b).replace(/'/g, "&#39;")}'
                        onmouseenter="showTooltip(event, this)" onmouseleave="hideTooltip()">
                        <span class="timeline-slot-text">${b.subject}</span>
                    </div>`;
        }).join('');

        // Now marker
        const nowMarker = (now >= START_H && now <= END_H) ?
            `<div class="timeline-now" style="left:${(now - START_H) / (END_H - START_H) * 100}%"></div>` : '';

        // Hour labels
        const hours = [];
        for (let h = START_H; h <= END_H; h++) hours.push(`<span class="timeline-hour">${h}</span>`);

        // Booking list
        const bookingList = roomBookings.length > 0 ? roomBookings.map(b => {
            const org = EMPLOYEES.find(e => e.id === b.organizer);
            const pres = presence.find(p => p.employeeId === b.organizer);
            const presClass = pres ? `presence-${pres.status}` : '';
            const match = filtering && isPersonInBooking(b, selectedPerson.id);
            const itemClass = filtering ? (match ? 'booking-item highlighted' : 'booking-item dimmed') : 'booking-item';

            const avatars = b.participants.slice(0, 4).map(pid => {
                const emp = EMPLOYEES.find(e => e.id === pid);
                return `<div class="avatar" style="background:${avatarColor(pid)}" title="${emp ? emp.name : ''}">${emp ? emp.avatar : '?'}</div>`;
            }).join('');
            const extra = b.participants.length > 4 ? `<div class="avatar" style="background:#94a3b8">+${b.participants.length - 4}</div>` : '';

            return `<div class="${itemClass}" data-booking='${JSON.stringify(b).replace(/'/g, "&#39;")}'
                        onclick="showBookingDetail(this)">
                        <span class="booking-organizer-presence ${presClass}" title="${pres ? pres.status : ''}"></span>
                        <span class="booking-time">${timeStr(b.startHour)}-${timeStr(b.endHour)}</span>
                        <span class="booking-subject">${b.subject}</span>
                        <div class="avatar-stack">${avatars}${extra}</div>
                    </div>`;
        }).join('') : `<div class="empty-bookings">${t('noBookings')}</div>`;

        return `<div class="${roomCardClass}">
            <div class="room-card-header">
                <div class="room-dot" style="background:${room.color}"></div>
                <span class="room-name">${room.name}</span>
                <div class="room-meta">
                    <span>${room.capacity} ${t('persons')}</span>
                    <span class="room-status ${status.status}">${status.label}</span>
                </div>
            </div>
            <div class="room-timeline">
                <div class="timeline-bar">
                    ${slots}
                    ${nowMarker}
                </div>
                <div class="timeline-hours">${hours.join('')}</div>
            </div>
            <div class="room-bookings">${bookingList}</div>
            <div class="room-card-actions">
                <button class="btn btn-book" onclick="openBooking('${room.id}')">${t('bookRoom')}</button>
            </div>
        </div>`;
    }).join('');
}

// ---- Render: Timeline View ----
function renderTimeline() {
    const bookings = getAllBookings(currentDate);
    const presence = generatePresence(currentDate);
    const now = isToday(currentDate) ? currentHourFraction() : -1;
    const START_H = 8, END_H = 17, HOURS = END_H - START_H;

    // Header
    let headerCells = `<div class="ft-header-cell">${t('roomLabel')}</div>`;
    for (let h = START_H; h <= END_H; h++) {
        const isNow = (now >= h && now < h + 1);
        headerCells += `<div class="ft-header-cell${isNow ? ' now' : ''}">${h}:00</div>`;
    }

    // Grid lines + now line
    let gridLines = '';
    for (let h = START_H; h <= END_H; h++) {
        const pct = (h - START_H) / HOURS * 100;
        gridLines += `<div class="ft-grid-line" style="left:${pct}%"></div>`;
    }

    const nowLine = (now >= START_H && now <= END_H) ?
        `<div class="ft-now-line" style="left:${(now - START_H) / HOURS * 100}%"></div>` : '';

    // Rows
    const rows = ROOMS.map(room => {
        const roomBookings = bookings.filter(b => b.roomId === room.id);
        const slots = roomBookings.map(b => {
            const left = Math.max(0, (b.startHour - START_H) / HOURS * 100);
            const width = Math.min(100 - left, (b.endHour - b.startHour) / HOURS * 100);
            const org = EMPLOYEES.find(e => e.id === b.organizer);
            const orgName = org ? org.name.split(' ')[0] : '';
            const pres = presence.find(p => p.employeeId === b.organizer);
            const presColor = pres ? (pres.status === 'office' ? '#10b981' : pres.status === 'remote' ? '#3b82f6' : '#94a3b8') : '#94a3b8';
            // Show organizer name + subject, and a presence dot
            return `<div class="ft-slot" style="left:${left}%;width:${width}%;background:${room.color}dd"
                        data-booking='${JSON.stringify(b).replace(/'/g, "&#39;")}'
                        onmouseenter="showTooltip(event, this)" onmouseleave="hideTooltip()">
                        <span class="ft-slot-text"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${presColor};margin-right:4px;vertical-align:middle"></span>${orgName}: ${b.subject}</span>
                    </div>`;
        }).join('');

        return `<div class="ft-row">
            <div class="ft-room-label">
                <div class="ft-room-dot" style="background:${room.color}"></div>
                ${room.name}
                <span class="ft-room-cap">(${room.capacity})</span>
            </div>
            <div class="ft-timeline-area">
                ${gridLines}
                ${slots}
                ${nowLine}
            </div>
        </div>`;
    }).join('');

    fullTimeline.innerHTML = `
        <div class="ft-header">${headerCells}</div>
        ${rows}
    `;
}

// ---- Render: People View ----
function renderPeople() {
    const presence = generatePresence(currentDate);
    const bookings = getAllBookings(currentDate);

    const counts = { office: 0, remote: 0, away: 0 };
    presence.forEach(p => counts[p.status]++);

    $('peopleBadge').textContent = counts.office;

    // Stats
    presenceStats.innerHTML = `
        <div class="stat-card">
            <div class="stat-number office">${counts.office}</div>
            <div class="stat-label">${t('statOffice')}</div>
        </div>
        <div class="stat-card">
            <div class="stat-number remote">${counts.remote}</div>
            <div class="stat-label">${t('statRemote')}</div>
        </div>
        <div class="stat-card">
            <div class="stat-number away">${counts.away}</div>
            <div class="stat-label">${t('statAway')}</div>
        </div>
    `;

    // Filters
    const filters = [
        { key: 'all', label: t('filterAll'), count: EMPLOYEES.length },
        { key: 'office', label: t('filterOffice'), count: counts.office },
        { key: 'remote', label: t('filterRemote'), count: counts.remote },
        { key: 'away', label: t('filterAway'), count: counts.away }
    ];

    peopleFilters.innerHTML = `<span class="filter-label">${t('filterAll')}:</span>` +
        filters.map(f =>
            `<button class="filter-btn${presenceFilter === f.key ? ' active' : ''}" data-filter="${f.key}">
                ${f.label} (${f.count})
            </button>`
        ).join('');

    peopleFilters.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            presenceFilter = btn.dataset.filter;
            renderPeople();
        });
    });

    // People cards
    const filtered = EMPLOYEES.filter(emp => {
        if (presenceFilter === 'all') return true;
        const p = presence.find(pr => pr.employeeId === emp.id);
        return p && p.status === presenceFilter;
    });

    peopleGrid.innerHTML = filtered.map(emp => {
        const pres = presence.find(p => p.employeeId === emp.id);
        const status = pres ? pres.status : 'away';
        const statusLabel = status === 'office' ? t('statOffice') :
                           status === 'remote' ? t('statRemote') : t('statAway');
        const statusClass = `status-${status}`;

        // Onko varaus tanaan?
        const empBookings = bookings.filter(b =>
            b.organizer === emp.id || b.participants.includes(emp.id));
        const nextBooking = empBookings.sort((a,b) => a.startHour - b.startHour)[0];

        let bookingInfo = '';
        if (nextBooking) {
            const room = ROOMS.find(r => r.id === nextBooking.roomId);
            bookingInfo = `<div style="font-size:0.65rem;color:var(--pri);margin-top:2px">
                ${timeStr(nextBooking.startHour)} ${room ? room.name : ''} - ${nextBooking.subject}
            </div>`;
        }

        return `<div class="person-card">
            <div class="person-avatar" style="background:${avatarColor(emp.id)}">
                ${emp.avatar}
                <div class="presence-dot presence-${status}"></div>
            </div>
            <div class="person-info">
                <div class="person-name">${emp.name}</div>
                <div class="person-role">${emp.role} &middot; ${emp.team}</div>
                ${bookingInfo}
            </div>
            <span class="person-status ${statusClass}">${statusLabel}</span>
        </div>`;
    }).join('');
}

// ---- Tooltip ----
window.showTooltip = function(e, el) {
    const b = JSON.parse(el.dataset.booking);
    const org = EMPLOYEES.find(emp => emp.id === b.organizer);
    const presence = generatePresence(currentDate);

    const people = b.participants.map(pid => {
        const emp = EMPLOYEES.find(e => e.id === pid);
        const pres = presence.find(p => p.employeeId === pid);
        const dotColor = pres ? (pres.status === 'office' ? 'var(--ok)' : pres.status === 'remote' ? 'var(--remote)' : 'var(--away)') : 'var(--away)';
        const isOrg = pid === b.organizer;
        return `<div class="tooltip-person">
            <span class="mini-dot" style="background:${dotColor}"></span>
            ${emp ? emp.name : '?'}${isOrg ? ' (org.)' : ''}
        </div>`;
    }).join('');

    tooltip.innerHTML = `
        <div class="tooltip-subject">${b.subject}</div>
        <div class="tooltip-time">${timeStr(b.startHour)} - ${timeStr(b.endHour)}</div>
        ${people}
    `;

    tooltip.classList.add('show');
    positionTooltip(e);
};

window.hideTooltip = function() {
    tooltip.classList.remove('show');
};

function positionTooltip(e) {
    const rect = tooltip.getBoundingClientRect();
    let x = e.clientX + 12;
    let y = e.clientY + 12;
    if (x + rect.width > window.innerWidth - 10) x = e.clientX - rect.width - 12;
    if (y + rect.height > window.innerHeight - 10) y = e.clientY - rect.height - 12;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

document.addEventListener('mousemove', (e) => {
    if (tooltip.classList.contains('show')) positionTooltip(e);
});

// ---- Booking detail ----
window.showBookingDetail = function(el) {
    const b = JSON.parse(el.dataset.booking);
    const room = ROOMS.find(r => r.id === b.roomId);
    const org = EMPLOYEES.find(e => e.id === b.organizer);
    const presence = generatePresence(currentDate);
    const isUserBooking = b.id && b.id.startsWith('user-');

    const people = b.participants.map(pid => {
        const emp = EMPLOYEES.find(e => e.id === pid);
        const pres = presence.find(p => p.employeeId === pid);
        const status = pres ? pres.status : 'away';
        const dotColor = status === 'office' ? 'var(--ok)' : status === 'remote' ? 'var(--remote)' : 'var(--away)';
        return `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;font-size:0.82rem">
            <span style="width:8px;height:8px;border-radius:50%;background:${dotColor};flex-shrink:0"></span>
            <span style="font-weight:${pid === b.organizer ? '700' : '400'}">${emp ? emp.name : '?'}</span>
            <span style="font-size:0.7rem;color:var(--text-light)">${emp ? emp.role : ''}</span>
        </div>`;
    }).join('');

    $('modalTitle').textContent = b.subject;
    $('bookingModal').querySelector('.modal-body').innerHTML = `
        <div style="margin-bottom:16px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <div style="width:10px;height:10px;border-radius:50%;background:${room ? room.color : '#ccc'}"></div>
                <span style="font-weight:600">${room ? room.name : ''}</span>
                <span style="font-size:0.75rem;color:var(--text-light)">${room ? room.capacity + ' ' + t('persons') : ''}</span>
            </div>
            <div style="font-size:0.88rem;color:var(--pri);font-weight:700;margin-bottom:12px">
                ${timeStr(b.startHour)} - ${timeStr(b.endHour)}
            </div>
        </div>
        <div style="margin-bottom:8px">
            <div class="form-label">${t('participants')}</div>
            ${people}
        </div>
        <div class="modal-actions">
            ${isUserBooking ? `<button class="btn" style="background:#fee2e2;color:#991b1b;border-color:#fecaca" onclick="deleteBooking('${b.id}')">${t('btnDelete')}</button>` : ''}
            <button class="btn" onclick="closeModal()">${t('btnCancel')}</button>
        </div>
    `;
    bookingModal.classList.add('show');
};

// ---- Booking form ----
window.openBooking = function(roomId) {
    $('modalTitle').textContent = t('modalBook');

    // Reset modal body to the form
    $('bookingModal').querySelector('.modal-body').innerHTML = `
        <div class="form-group">
            <label class="form-label">${t('formRoom')}</label>
            <select class="form-select" id="formRoom"></select>
        </div>
        <div class="form-group">
            <label class="form-label">${t('formSubject')}</label>
            <input type="text" class="form-input" id="formSubject" placeholder="${t('phSubject')}">
        </div>
        <div class="form-group">
            <label class="form-label">${t('formOrganizer')}</label>
            <select class="form-select" id="formOrganizer"></select>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">${t('formStart')}</label>
                <select class="form-select" id="formStart"></select>
            </div>
            <div class="form-group">
                <label class="form-label">${t('formEnd')}</label>
                <select class="form-select" id="formEnd"></select>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn" onclick="closeModal()">${t('btnCancel')}</button>
            <button class="btn btn-pri" onclick="saveBooking()">${t('btnBook')}</button>
        </div>
    `;

    // Populate room select
    const formRoom = $('formRoom');
    ROOMS.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = `${r.name} (${r.capacity} ${t('persons')})`;
        formRoom.appendChild(opt);
    });
    if (roomId) formRoom.value = roomId;

    // Populate organizer
    const formOrg = $('formOrganizer');
    EMPLOYEES.sort((a,b) => a.name.localeCompare(b.name)).forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.id;
        opt.textContent = e.name;
        formOrg.appendChild(opt);
    });

    // Time selects
    const formStart = $('formStart');
    const formEnd = $('formEnd');
    for (let h = 8; h <= 16.5; h += 0.5) {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = timeStr(h);
        formStart.appendChild(opt);
    }
    for (let h = 8.5; h <= 17; h += 0.5) {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = timeStr(h);
        formEnd.appendChild(opt);
    }

    // Default: seuraava tasatunti
    const now = currentHourFraction();
    const nextHour = Math.ceil(now);
    if (nextHour >= 8 && nextHour <= 16) {
        formStart.value = nextHour;
        formEnd.value = nextHour + 1;
    }

    bookingModal.classList.add('show');
};

window.saveBooking = function() {
    const roomId = $('formRoom').value;
    const subject = $('formSubject').value.trim();
    const organizer = parseInt($('formOrganizer').value);
    const startHour = parseFloat($('formStart').value);
    const endHour = parseFloat($('formEnd').value);

    if (!subject || endHour <= startHour) {
        showToast(t('toastError'), true);
        return;
    }

    // Tarkista paallekkaisyys
    const existing = getAllBookings(currentDate).filter(b => b.roomId === roomId);
    const overlap = existing.some(b => startHour < b.endHour && endHour > b.startHour);
    if (overlap) {
        showToast(lang === 'fi' ? 'Huone on jo varattu talla ajalla!' : 'Room is already booked at this time!', true);
        return;
    }

    const booking = {
        id: 'user-' + Date.now(),
        roomId,
        subject,
        organizer,
        participants: [organizer],
        startHour,
        endHour,
        date: currentDate.toISOString().split('T')[0]
    };

    saveUserBooking(booking);
    closeModal();
    showToast(t('toastBooked'));
    render();
};

window.deleteBooking = function(id) {
    removeUserBooking(id);
    closeModal();
    showToast(t('toastDeleted'));
    render();
};

window.closeModal = function() {
    bookingModal.classList.remove('show');
};

$('modalClose').onclick = closeModal;
bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeModal();
});

// ---- Toast ----
function showToast(msg, isError) {
    toast.textContent = msg;
    toast.style.background = isError ? 'var(--err)' : 'var(--text)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---- Main render ----
function render() {
    // Date label
    dateLabel.innerHTML = formatDate(currentDate) +
        (isToday(currentDate) ? ` <span class="today-tag">${t('btnToday')}</span>` : '');

    // Header date
    headerDate.textContent = formatDateShort(currentDate);

    // Room badge
    const bookings = getAllBookings(currentDate);
    const now = isToday(currentDate) ? currentHourFraction() : -1;
    const freeCount = ROOMS.filter(r => getRoomStatus(r, bookings, now).status === 'free').length;
    $('roomsBadge').textContent = `${freeCount}/${ROOMS.length}`;

    renderRooms();
    renderTimeline();
    renderPeople();
}

// ---- Init ----
render();

// Autorefresh joka minuutti
setInterval(render, 60000);

})();
