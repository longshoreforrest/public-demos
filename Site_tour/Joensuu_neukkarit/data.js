// Neukkarit - Joensuu-teemaiset kokoushuoneet
const ROOMS = [
    { id: 'koli',       name: 'Koli',        capacity: 8,  floor: 2, equipment: ['näyttö','whiteboard','videokamera'], color: '#3b82f6', description: 'Iso neuvotteluhuone, upea näkymä' },
    { id: 'pielisjoki', name: 'Pielisjoki',   capacity: 6,  floor: 2, equipment: ['näyttö','whiteboard'], color: '#10b981', description: 'Keskikokoinen, rauhallinen' },
    { id: 'ilosaari',   name: 'Ilosaari',     capacity: 4,  floor: 2, equipment: ['näyttö'], color: '#f59e0b', description: 'Pieni ja intiimi palaverihuone' },
    { id: 'pyhaselka',  name: 'Pyhäselkä',    capacity: 10, floor: 3, equipment: ['näyttö','whiteboard','videokamera','äänentoisto'], color: '#8b5cf6', description: 'Suurin tila, sopii koko tiimin palaveriin' },
    { id: 'utran',      name: 'Utran Sauna',  capacity: 3,  floor: 3, equipment: ['näyttö'], color: '#ef4444', description: 'Pikkuhuone, 1-on-1 keskustelut' }
];

// Henkilöstö (~30 hlö)
const EMPLOYEES = [
    { id: 1,  name: 'Matti Virtanen',      role: 'Lead Developer',        team: 'Platform',   avatar: 'MV' },
    { id: 2,  name: 'Liisa Korhonen',      role: 'UX Designer',           team: 'Design',     avatar: 'LK' },
    { id: 3,  name: 'Juha Mäkinen',        role: 'Backend Developer',     team: 'Platform',   avatar: 'JM' },
    { id: 4,  name: 'Anna Nieminen',       role: 'Project Manager',       team: 'Management', avatar: 'AN' },
    { id: 5,  name: 'Tero Hämäläinen',     role: 'Full Stack Developer',  team: 'Platform',   avatar: 'TH' },
    { id: 6,  name: 'Sanna Laine',         role: 'Scrum Master',          team: 'Management', avatar: 'SL' },
    { id: 7,  name: 'Pekka Heikkinen',     role: 'DevOps Engineer',       team: 'Infra',      avatar: 'PH' },
    { id: 8,  name: 'Katri Järvinen',      role: 'Frontend Developer',    team: 'Platform',   avatar: 'KJ' },
    { id: 9,  name: 'Mikko Lehtonen',      role: 'Data Engineer',         team: 'Data',       avatar: 'ML' },
    { id: 10, name: 'Elina Saarinen',      role: 'QA Engineer',           team: 'Quality',    avatar: 'ES' },
    { id: 11, name: 'Ville Turunen',       role: 'Solution Architect',    team: 'Platform',   avatar: 'VT' },
    { id: 12, name: 'Riikka Lahtinen',     role: 'Business Analyst',      team: 'Management', avatar: 'RL' },
    { id: 13, name: 'Antti Aalto',         role: 'Backend Developer',     team: 'Platform',   avatar: 'AA' },
    { id: 14, name: 'Hanna Salonen',       role: 'UI Designer',           team: 'Design',     avatar: 'HS' },
    { id: 15, name: 'Jari Miettinen',      role: 'Cloud Engineer',        team: 'Infra',      avatar: 'JMi' },
    { id: 16, name: 'Päivi Koskinen',      role: 'Product Owner',         team: 'Management', avatar: 'PK' },
    { id: 17, name: 'Risto Nurmi',         role: 'Security Engineer',     team: 'Infra',      avatar: 'RN' },
    { id: 18, name: 'Johanna Karjalainen', role: 'Full Stack Developer',  team: 'Platform',   avatar: 'JK' },
    { id: 19, name: 'Olli Mattila',        role: 'Mobile Developer',      team: 'Mobile',     avatar: 'OM' },
    { id: 20, name: 'Tiina Ahonen',        role: 'Data Scientist',        team: 'Data',       avatar: 'TA' },
    { id: 21, name: 'Markku Leppänen',     role: 'Tech Lead',             team: 'Platform',   avatar: 'MLe' },
    { id: 22, name: 'Kirsi Hiltunen',      role: 'Frontend Developer',    team: 'Platform',   avatar: 'KH' },
    { id: 23, name: 'Timo Rantanen',       role: 'Backend Developer',     team: 'Platform',   avatar: 'TR' },
    { id: 24, name: 'Mari Laitinen',       role: 'UX Researcher',         team: 'Design',     avatar: 'MLa' },
    { id: 25, name: 'Petri Kinnunen',      role: 'Site Reliability Eng.', team: 'Infra',      avatar: 'PKi' },
    { id: 26, name: 'Laura Väisänen',      role: 'QA Lead',               team: 'Quality',    avatar: 'LV' },
    { id: 27, name: 'Sampo Koivisto',      role: 'Mobile Developer',      team: 'Mobile',     avatar: 'SK' },
    { id: 28, name: 'Noora Ojala',         role: 'Agile Coach',           team: 'Management', avatar: 'NO' },
    { id: 29, name: 'Esa Heinonen',        role: 'Integration Developer', team: 'Platform',   avatar: 'EH' },
    { id: 30, name: 'Jenni Partanen',      role: 'Data Analyst',          team: 'Data',       avatar: 'JP' }
];

// Läsnäolostatus - generoidaan dynaamisesti päivän mukaan
function generatePresence(date) {
    const seed = date.getFullYear() * 10000 + (date.getMonth()+1) * 100 + date.getDate();
    const rng = (id) => {
        let x = (seed * 9301 + id * 49297) % 233280;
        return x / 233280;
    };
    const statuses = ['office','remote','away'];
    const weights = [0.55, 0.30, 0.15]; // 55% toimistolla, 30% etänä, 15% poissa
    return EMPLOYEES.map(emp => {
        const r = rng(emp.id);
        let status;
        if (r < weights[0]) status = 'office';
        else if (r < weights[0]+weights[1]) status = 'remote';
        else status = 'away';
        return { employeeId: emp.id, status };
    });
}

// Varaukset - generoidaan esimerkkivarauksia päivän mukaan
function generateBookings(date) {
    const seed = date.getFullYear() * 10000 + (date.getMonth()+1) * 100 + date.getDate();
    const rng = (i) => {
        let x = (seed * 1337 + i * 7919) % 104729;
        return x / 104729;
    };

    const subjects = [
        'Sprint Planning', 'Daily Standup', 'Retro', 'Design Review',
        'Tech Huddle', '1-on-1', 'Demo', 'Backlog Refinement',
        'Arkkitehtuurikatselmus', 'Asiakaspalaveri', 'Tiimin viikkopalaveri',
        'Code Review', 'Workshop', 'Onboarding', 'Strategiapalaveri',
        'PI Planning', 'Incident Review', 'Knowledge Sharing'
    ];

    const bookings = [];
    let idx = 0;
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    // Jos tänään, varmista että joka huone on juuri nyt varattu
    const nowSubjects = ['Sprint Planning', 'Asiakaspalaveri', 'Design Review', 'Strategiapalaveri', 'Tech Huddle'];
    const nowOrganizers = [4, 11, 2, 16, 21]; // Anna, Ville, Liisa, Päivi, Markku

    ROOMS.forEach((room, ri) => {
        const usedSlots = [];

        // Tänään: lisää varaus joka kattaa nykyhetken
        if (isToday && currentHour >= 8 && currentHour < 17) {
            const startHour = Math.floor(currentHour);
            const endHour = Math.min(startHour + 1.5, 17);
            usedSlots.push({ start: startHour, end: endHour });

            const orgId = nowOrganizers[ri % nowOrganizers.length];
            const participants = [orgId];
            // Lisää 2-4 osallistujaa
            for (let p = 0; p < 3; p++) {
                const pIdx = Math.floor(rng(idx++) * EMPLOYEES.length);
                if (!participants.includes(EMPLOYEES[pIdx].id)) {
                    participants.push(EMPLOYEES[pIdx].id);
                }
            }

            bookings.push({
                id: `${room.id}-now-${seed}`,
                roomId: room.id,
                subject: nowSubjects[ri % nowSubjects.length],
                organizer: orgId,
                participants,
                startHour,
                endHour,
                date: date.toISOString().split('T')[0]
            });
        }

        // Loput varaukset normaalisti
        const count = 2 + Math.floor(rng(idx++) * 4);

        for (let i = 0; i < count; i++) {
            const startHour = 8 + Math.floor(rng(idx++) * 9); // 8-16
            const duration = [0.5, 1, 1, 1.5, 2][Math.floor(rng(idx++) * 5)];
            const endHour = startHour + duration;

            // Tarkista ettei mene päällekkäin
            const overlaps = usedSlots.some(s => startHour < s.end && endHour > s.start);
            if (overlaps || endHour > 17) continue;
            usedSlots.push({ start: startHour, end: endHour });

            const empIdx = Math.floor(rng(idx++) * EMPLOYEES.length);
            const subject = subjects[Math.floor(rng(idx++) * subjects.length)];

            // Lisää 1-4 osallistujaa
            const participantCount = 1 + Math.floor(rng(idx++) * Math.min(4, room.capacity - 1));
            const participants = [EMPLOYEES[empIdx].id];
            for (let p = 0; p < participantCount; p++) {
                const pIdx = Math.floor(rng(idx++) * EMPLOYEES.length);
                if (!participants.includes(EMPLOYEES[pIdx].id)) {
                    participants.push(EMPLOYEES[pIdx].id);
                }
            }

            bookings.push({
                id: `${room.id}-${i}-${seed}`,
                roomId: room.id,
                subject,
                organizer: EMPLOYEES[empIdx].id,
                participants,
                startHour,
                endHour,
                date: date.toISOString().split('T')[0]
            });
        }
    });

    return bookings;
}

// Käyttäjän omat varaukset (localStorage)
function getUserBookings() {
    try {
        return JSON.parse(localStorage.getItem('neukkari_bookings') || '[]');
    } catch { return []; }
}

function saveUserBooking(booking) {
    const bookings = getUserBookings();
    bookings.push(booking);
    localStorage.setItem('neukkari_bookings', JSON.stringify(bookings));
}

function removeUserBooking(id) {
    const bookings = getUserBookings().filter(b => b.id !== id);
    localStorage.setItem('neukkari_bookings', JSON.stringify(bookings));
}

// Yhdistä generoidut ja käyttäjän varaukset
function getAllBookings(date) {
    const dateStr = date.toISOString().split('T')[0];
    const generated = generateBookings(date);
    const user = getUserBookings().filter(b => b.date === dateStr);
    return [...generated, ...user];
}
