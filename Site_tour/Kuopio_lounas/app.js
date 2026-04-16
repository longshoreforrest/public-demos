// --- Utilities ---
function getTodayDayIndex() {
    const jsDay = new Date().getDay(); // 0=Sun, 1=Mon...
    if (jsDay === 0 || jsDay === 6) return 0; // Weekend -> show Monday
    return jsDay - 1; // 0=Mon, 1=Tue...
}

function getDayName(index) {
    return DAYS[index];
}

// Get menu for a restaurant: prefer scraped MENUS data, fall back to hardcoded
function getMenu(restaurant) {
    if (typeof MENUS !== 'undefined' && MENUS.menus && MENUS.menus[restaurant.id]) {
        return MENUS.menus[restaurant.id];
    }
    return restaurant.menu || {};
}

function getTodayMenuForRestaurant(restaurant, dayIndex) {
    const day = getDayName(dayIndex);
    return getMenu(restaurant)[day] || [];
}

function getWeekDates() {
    const today = new Date();
    const dow = today.getDay(); // 0=Sun, 1=Mon...
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));
    return DAYS.map((_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return `${d.getDate()}.${d.getMonth() + 1}.`;
    });
}

const weekDates = getWeekDates();

// --- Tab navigation ---
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.view).classList.add('active');
        if (tab.dataset.view === 'map-view') {
            map.invalidateSize();
        }
    });
});

// --- MAP VIEW ---
const map = L.map('map').setView([SIILI_LOCATION.lat, SIILI_LOCATION.lng], 15);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 20,
    subdomains: 'abcd'
}).addTo(map);

// Siili marker (special) - pulsating circle + label
L.circle([SIILI_LOCATION.lat, SIILI_LOCATION.lng], {
    radius: 40,
    color: '#1a1a2e',
    fillColor: '#1a1a2e',
    fillOpacity: 0.15,
    weight: 3,
    dashArray: '6 4'
}).addTo(map);

const siiliIcon = L.divIcon({
    html: `<div style="display:flex;flex-direction:column;align-items:center;">
        <div style="background:#1a1a2e;color:white;padding:6px 14px;border-radius:8px;font-size:13px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.35);border:2px solid #e63946;letter-spacing:0.3px;">
            <span style="margin-right:4px;">&#127970;</span> Siili Solutions
        </div>
        <div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #1a1a2e;"></div>
    </div>`,
    className: '',
    iconAnchor: [72, 42]
});
L.marker([SIILI_LOCATION.lat, SIILI_LOCATION.lng], { icon: siiliIcon, zIndexOffset: 1000 })
    .addTo(map)
    .bindPopup('<b>Siili Solutions Oyj</b><br>Kauppakatu 25-27 A<br>70100 Kuopio');

// Restaurant markers
const restaurantIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const todayIndex = getTodayDayIndex();
const mapMarkers = {}; // id -> marker

restaurants.forEach(r => {
    const todayMenu = getTodayMenuForRestaurant(r, todayIndex);
    const menuHtml = todayMenu.length > 0
        ? todayMenu.map(item => `<div>• ${item}</div>`).join('')
        : '<div><em>Menu ei saatavilla</em></div>';

    const popupContent = `
        <div class="popup-content">
            <h3>${r.name}</h3>
            <div class="popup-addr">${r.address}</div>
            <div class="popup-hours">${r.hours}</div>
            <div class="popup-price">${r.price}</div>
            <div class="popup-menu"><strong>${DAYS[todayIndex]}:</strong><br>${menuHtml}</div>
            <div style="margin-top:6px;">
                <a href="${r.website}" target="_blank">Kotisivu &rarr;</a>
            </div>
        </div>
    `;

    const marker = L.marker([r.lat, r.lng], { icon: restaurantIcon })
        .addTo(map)
        .bindPopup(popupContent, { maxWidth: 300 });
    mapMarkers[r.id] = marker;
});

// --- MAP VIEW FILTERS ---
let mapFilterIds = null; // null = all

function renderMapFilter() {
    const container = document.getElementById('map-restaurant-filter');
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Kaikki';
    allBtn.dataset.id = 'all';
    allBtn.addEventListener('click', () => {
        mapFilterIds = null;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        filterMapView();
    });
    container.appendChild(allBtn);

    restaurants.forEach(r => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = r.name;
        btn.dataset.id = r.id;
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            if (wasActive && mapFilterIds && mapFilterIds.size === 1) {
                mapFilterIds = null;
                container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
            } else {
                allBtn.classList.remove('active');
                btn.classList.toggle('active');
                const activeBtns = container.querySelectorAll('.filter-btn.active:not([data-id="all"])');
                if (activeBtns.length === 0) {
                    mapFilterIds = null;
                    allBtn.classList.add('active');
                } else {
                    mapFilterIds = new Set();
                    activeBtns.forEach(b => mapFilterIds.add(Number(b.dataset.id)));
                }
            }
            filterMapView();
        });
        container.appendChild(btn);
    });
}

function filterMapView() {
    const query = document.getElementById('map-search-input').value.toLowerCase().trim();
    restaurants.forEach(r => {
        const marker = mapMarkers[r.id];
        const matchesFilter = !mapFilterIds || mapFilterIds.has(r.id);
        const matchesSearch = !query || r.name.toLowerCase().includes(query) || r.address.toLowerCase().includes(query) || r.description.toLowerCase().includes(query);
        const visible = matchesFilter && matchesSearch;
        if (visible) {
            if (!map.hasLayer(marker)) marker.addTo(map);
        } else {
            if (map.hasLayer(marker)) map.removeLayer(marker);
        }
    });
}

renderMapFilter();

document.getElementById('map-search-input').addEventListener('input', () => {
    filterMapView();
});

// --- RESTAURANT LIST VIEW ---
function renderRestaurantList() {
    const container = document.getElementById('restaurant-list');
    container.innerHTML = '';

    restaurants.forEach(r => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.dataset.id = r.id;

        let menuHtml = '';
        const rMenu = getMenu(r);
        DAYS.forEach((day, i) => {
            const items = rMenu[day] || [];
            const isToday = i === todayIndex;
            menuHtml += `
                <div class="menu-day">
                    <div class="menu-day-name ${isToday ? 'today' : ''}">${isToday ? '&#9654; ' : ''}${day.charAt(0).toUpperCase() + day.slice(1)} ${weekDates[i]}</div>
                    <div class="menu-items">${items.map(item => `<div>• ${item}</div>`).join('')}</div>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="restaurant-header">
                <div class="restaurant-name">${r.name}</div>
                <div class="restaurant-price">${r.price}</div>
            </div>
            <div class="restaurant-meta">
                <span>${r.address}</span>
                <span>${r.hours}</span>
            </div>
            <div class="restaurant-links">
                <a href="${r.website}" target="_blank">Kotisivu &rarr;</a>
            </div>
            <p style="font-size:0.85rem;color:#666;margin-bottom:12px;">${r.description}</p>
            <div class="menu-section">
                <h4>Viikon ruokalista</h4>
                ${menuHtml}
            </div>
        `;
        container.appendChild(card);
    });
}

renderRestaurantList();

// --- LIST VIEW FILTERS ---
let listFilterIds = null; // null = all

function renderListFilter() {
    const container = document.getElementById('list-restaurant-filter');
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Kaikki';
    allBtn.dataset.id = 'all';
    allBtn.addEventListener('click', () => {
        listFilterIds = null;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        filterListView();
    });
    container.appendChild(allBtn);

    restaurants.forEach(r => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = r.name;
        btn.dataset.id = r.id;
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            if (wasActive && listFilterIds && listFilterIds.size === 1) {
                listFilterIds = null;
                container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
            } else {
                allBtn.classList.remove('active');
                btn.classList.toggle('active');
                const activeBtns = container.querySelectorAll('.filter-btn.active:not([data-id="all"])');
                if (activeBtns.length === 0) {
                    listFilterIds = null;
                    allBtn.classList.add('active');
                } else {
                    listFilterIds = new Set();
                    activeBtns.forEach(b => listFilterIds.add(Number(b.dataset.id)));
                }
            }
            filterListView();
        });
        container.appendChild(btn);
    });
}

function filterListView() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.restaurant-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const id = Number(card.dataset.id);
        const matchesFilter = !listFilterIds || listFilterIds.has(id);
        const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
        const visible = matchesFilter && matchesSearch;
        card.classList.toggle('hidden', !visible);
        if (visible) visibleCount++;
    });

    let noResults = document.getElementById('no-results');
    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.id = 'no-results';
            noResults.className = 'no-results';
            noResults.textContent = 'Ei hakutuloksia.';
            document.getElementById('restaurant-list').appendChild(noResults);
        }
        noResults.style.display = 'block';
    } else if (noResults) {
        noResults.style.display = 'none';
    }
}

renderListFilter();

document.getElementById('search-input').addEventListener('input', () => {
    filterListView();
});

// --- DAILY MENU VIEW ---
let activeDayIndex = todayIndex;
let activeFilterIds = null; // null = all
let menuAvailFilter = 'yes'; // 'yes' | 'no' | 'all'

function renderDaySelector() {
    const container = document.getElementById('day-selector');
    DAYS.forEach((day, i) => {
        const btn = document.createElement('button');
        btn.className = 'day-btn' + (i === todayIndex ? ' active' : '');
        btn.textContent = day.charAt(0).toUpperCase() + day.slice(1) + ' ' + weekDates[i];
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

    // "Kaikki" button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Kaikki';
    allBtn.dataset.id = 'all';
    allBtn.addEventListener('click', () => {
        activeFilterIds = null;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        filterDailyView();
    });
    container.appendChild(allBtn);

    // Per-restaurant buttons
    restaurants.forEach(r => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = r.name;
        btn.dataset.id = r.id;
        btn.addEventListener('click', () => {
            const wasActive = btn.classList.contains('active');
            // If clicking an already-active single filter, go back to all
            if (wasActive && activeFilterIds && activeFilterIds.size === 1) {
                activeFilterIds = null;
                container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
            } else {
                // Deactivate "Kaikki", toggle this filter
                allBtn.classList.remove('active');
                btn.classList.toggle('active');

                // Collect active ids
                const activeBtns = container.querySelectorAll('.filter-btn.active:not([data-id="all"])');
                if (activeBtns.length === 0) {
                    activeFilterIds = null;
                    allBtn.classList.add('active');
                } else {
                    activeFilterIds = new Set();
                    activeBtns.forEach(b => activeFilterIds.add(Number(b.dataset.id)));
                }
            }
            filterDailyView();
        });
        container.appendChild(btn);
    });
}

function renderMenuAvailFilter() {
    const container = document.getElementById('menu-avail-filter');
    const options = [
        { value: 'yes', label: 'Kyllä' },
        { value: 'no', label: 'Ei' },
        { value: 'all', label: 'Kaikki' },
    ];
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (opt.value === menuAvailFilter ? ' active' : '');
        btn.textContent = opt.label;
        btn.dataset.value = opt.value;
        btn.addEventListener('click', () => {
            menuAvailFilter = opt.value;
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterDailyView();
        });
        container.appendChild(btn);
    });
}

function renderDailyMenu(dayIndex) {
    const container = document.getElementById('daily-list');
    container.innerHTML = '';
    const dayName = getDayName(dayIndex);

    restaurants.forEach(r => {
        const items = getMenu(r)[dayName] || [];
        const card = document.createElement('div');
        card.className = 'daily-card' + (items.length === 0 ? ' no-menu' : '');
        card.dataset.id = r.id;

        const menuText = items.length > 0
            ? items.map(item => `<div>• ${item}</div>`).join('')
            : '<em>Menu ei saatavilla</em>';

        card.innerHTML = `
            <div>
                <div class="dc-name">${r.name}</div>
                <div class="dc-meta">${r.address}</div>
                <div class="dc-meta">${r.hours}</div>
                <a href="${r.website}" target="_blank" style="color:#e63946;font-size:0.8rem;text-decoration:none;">Kotisivu &rarr;</a>
            </div>
            <div class="dc-menu">${menuText}</div>
            <div class="dc-price">${r.price}</div>
        `;
        container.appendChild(card);
    });
}

function filterDailyView() {
    renderDailyMenu(activeDayIndex);
    const query = document.getElementById('daily-search-input').value.toLowerCase().trim();
    const cards = document.querySelectorAll('#daily-list .daily-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const id = Number(card.dataset.id);
        const hasMenu = !card.classList.contains('no-menu');
        const matchesAvail = menuAvailFilter === 'all' || (menuAvailFilter === 'yes' && hasMenu) || (menuAvailFilter === 'no' && !hasMenu);
        const matchesFilter = !activeFilterIds || activeFilterIds.has(id);
        const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
        const visible = matchesAvail && matchesFilter && matchesSearch;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
    });

    let noResults = document.getElementById('daily-no-results');
    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.id = 'daily-no-results';
            noResults.className = 'no-results';
            noResults.textContent = 'Ei hakutuloksia.';
            document.getElementById('daily-list').appendChild(noResults);
        }
        noResults.style.display = 'block';
    } else if (noResults) {
        noResults.style.display = 'none';
    }
}

// Search in daily view
document.getElementById('daily-search-input').addEventListener('input', () => {
    filterDailyView();
});

renderDaySelector();
renderMenuAvailFilter();
renderRestaurantFilter();
filterDailyView();

// --- Mobile: collapsible restaurant filters ---
function setupFilterToggle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const toggle = document.createElement('button');
    toggle.className = 'filter-toggle';
    container.insertBefore(toggle, container.querySelector('.filter-btn'));

    function updateText() {
        const collapsed = container.classList.contains('collapsed');
        const activeCount = container.querySelectorAll('.filter-btn.active:not([data-id="all"])').length;
        const isAll = container.querySelector('.filter-btn[data-id="all"]')?.classList.contains('active');
        let text = currentLang === 'en' ? 'Restaurants' : 'Ravintolat';
        if (activeCount > 0 && !isAll) text += ` (${activeCount})`;
        text += collapsed ? ' \u25BC' : ' \u25B2';
        toggle.textContent = text;
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
        container.classList.add('collapsed');
    }
    toggle.addEventListener('click', () => {
        container.classList.toggle('collapsed');
        updateText();
    });
    new MutationObserver(updateText).observe(container, {
        attributes: true, subtree: true, attributeFilter: ['class']
    });
    updateText();
}

setupFilterToggle('restaurant-filter');
setupFilterToggle('list-restaurant-filter');
setupFilterToggle('map-restaurant-filter');

// --- Search: restaurant name suggestions ---
function setupSearchSuggestions(inputId, filterContainerId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const box = document.createElement('div');
    box.className = 'search-suggestions';
    input.after(box);

    function update() {
        const q = input.value.toLowerCase().trim();
        box.innerHTML = '';
        if (q.length < 1) return;
        const hits = restaurants.filter(r => r.name.toLowerCase().includes(q));
        if (hits.length === 0 || hits.length === restaurants.length) return;
        hits.forEach(r => {
            const chip = document.createElement('button');
            const filterBtn = document.getElementById(filterContainerId)
                ?.querySelector('.filter-btn[data-id="' + r.id + '"]');
            chip.className = 'search-suggestion' + (filterBtn?.classList.contains('active') ? ' active' : '');
            chip.textContent = r.name;
            chip.addEventListener('click', e => {
                e.preventDefault();
                input.value = '';
                box.innerHTML = '';
                if (filterBtn) filterBtn.click();
            });
            box.appendChild(chip);
        });
    }

    input.addEventListener('input', update);
    input.addEventListener('blur', () => setTimeout(() => { box.innerHTML = ''; }, 150));
}

setupSearchSuggestions('daily-search-input', 'restaurant-filter');
setupSearchSuggestions('search-input', 'list-restaurant-filter');
setupSearchSuggestions('map-search-input', 'map-restaurant-filter');

// Update subtitle with dynamic week info
(function updateSubtitle() {
    const today = new Date();
    const dow = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    // ISO week number
    const jan4 = new Date(today.getFullYear(), 0, 4);
    const weekNum = Math.ceil(((today - jan4) / 86400000 + jan4.getDay() + 1) / 7);

    const range = `${monday.getDate()}.${monday.getMonth()+1}.\u2013${friday.getDate()}.${friday.getMonth()+1}.${friday.getFullYear()}`;
    const el = document.getElementById('header-subtitle');
    if (el) {
        let text = `Lounasravintolat Kuopion keskustassa \u00b7 Viikko ${weekNum} / ${range}`;
        if (typeof MENUS !== 'undefined' && MENUS.lastUpdated) {
            const updated = new Date(MENUS.lastUpdated);
            text += ` \u00b7 Päivitetty ${updated.getDate()}.${updated.getMonth()+1}. klo ${updated.getHours()}:${String(updated.getMinutes()).padStart(2,'0')}`;
        }
        el.textContent = text;
    }
})();
