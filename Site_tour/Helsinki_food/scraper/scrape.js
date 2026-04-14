#!/usr/bin/env node

import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Day mappings ---
const DAYS = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai'];

// Finnish partitive → base (used by lounaat.info)
const DAY_PARTITIVE = {
    'maanantaina': 'maanantai',
    'tiistaina': 'tiistai',
    'keskiviikkona': 'keskiviikko',
    'torstaina': 'torstai',
    'perjantaina': 'perjantai',
};

// English → base (used by Antell panels)
const DAY_ENGLISH = {
    'monday': 'maanantai',
    'tuesday': 'tiistai',
    'wednesday': 'keskiviikko',
    'thursday': 'torstai',
    'friday': 'perjantai',
};

// .NET DayOfWeek → base (used by Compass Group)
const DAY_FROM_DOW = { 1: 'maanantai', 2: 'tiistai', 3: 'keskiviikko', 4: 'torstai', 5: 'perjantai' };

// --- Restaurant source configuration ---
// Each restaurant maps to a scraping source and parameters
const SOURCES = {
    1:  { type: 'halo', url: 'https://halorestaurant.fi/lounas/' },
    2:  { type: 'aangan', url: 'https://aangan.fi/helsinki/lounaslista/' },
    3:  { type: 'factory', url: 'https://ravintolafactory.com/lounasravintolat/ravintolat/factory-ruoholahti/' },
    4:  { type: 'lounastaja', url: 'https://www.himasali.com/lounaslista/' },
    5:  { type: 'compass', url: 'https://www.compass-group.fi/ravintolat-ja-ruokalistat/food--co/kaupungit/helsinki/ruoholahti/' },
    6:  { type: 'direct', url: 'https://ravintolapalvelut.iss.fi/restaurant-kasi/' },
    7:  { type: 'direct', url: 'https://thepantry.fi/en/ruoholahti' },
    8:  { type: 'direct', url: 'https://morton.fi/lounas/' },
    9:  { type: 'direct', url: 'https://faroravintola.fi/lounas/' },
    10: { type: 'compass', url: 'https://www.compass-group.fi/ravintolat-ja-ruokalistat/muut-avoimet-ravintolat/kaupungit/helsinki/roihu/' },
    11: { type: 'antell', url: 'https://antell.fi/lounas/helsinki/explorer/' },
    12: { type: 'compass', url: 'https://www.compass-group.fi/ravintolat-ja-ruokalistat/food--co/kaupungit/helsinki/the-local-kitchen-poijut/' },
    13: { type: 'direct', url: 'https://sewa.fi/en/' },
    14: { type: 'direct', url: 'https://gvcravintolat.fi/gresa/' },
    15: { type: 'antell', url: 'https://www.antell.fi/lounas/helsinki/femma/' },
    16: { type: 'mekong', url: 'https://mekong.restaurant/' },
    17: { type: 'factory-kamppi', url: 'https://factorykamppi.com/lounas/' },
    18: { type: 'direct', url: 'https://ravintolakansis.fi/lounas/' },
    19: { type: 'direct', url: 'https://www.sandro.fi/lounas/' },
    20: { type: 'doncorleone', url: 'https://doncorleone.fi/lounas/' },
    21: { type: 'direct', url: 'https://www.kulttuurikasarminravintolat.fi/en/henrys-distillery-en/' },
    22: { type: 'raflaamo', url: 'https://www.raflaamo.fi/fi/ravintola/helsinki/bistro-manu/menu/lounas' },
    23: { type: 'lounaat', slug: 'innovation-home-kamppi' },
    24: { type: 'direct', url: 'https://johnscotts.se/arkadia/john-scotts-lunch/' },
    25: { type: 'antell', url: 'https://antell.fi/lounas/helsinki/pikkuarkadia/' },
    26: { type: 'latorre', url: 'https://www.latorre.fi/index.php/toimipiste/lasipalatsi/lounas' },
    27: { type: 'raflaamo', url: 'https://www.raflaamo.fi/fi/ravintola/helsinki/cafe-lasipalatsi/menu/lounas' },
    28: { type: 'direct', url: 'https://www.hys.net/osakuntabaari/ruokalista/' },
    29: { type: 'sodexo', url: 'https://www.sodexo.fi/ravintolat/ravintola-sisapiha' },
    30: { type: 'satamabar', url: 'https://www.satamabar.com/lounas' },
    31: { type: 'direct', url: 'https://lonkka.fi/en/lunch/' },
    32: { type: 'lounasmenu', slug: 'ekberg' },
    33: { type: 'lounaat', slug: 'amos-cafe' },
};

// --- Utilities ---
const delay = ms => new Promise(r => setTimeout(r, ms));

async function fetchPage(url) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/json',
                'Accept-Language': 'fi-FI,fi;q=0.9,en;q=0.8',
            },
            redirect: 'follow',
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) return null;
        return await res.text();
    } catch (e) {
        return null;
    }
}

function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

// --- Parsers ---

// Halo: parse <p> tags split by weekday headers
async function parseHalo(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const menu = {};

    // Get all text content from the rich text blocks
    let allText = '';
    $('p').each((_, el) => {
        allText += $(el).text().trim() + '\n';
    });

    // Split by day names
    const dayPattern = /(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)\s+\d+\.\d+\.?/gi;
    const parts = allText.split(dayPattern);

    let currentDay = null;
    for (const part of parts) {
        const dayMatch = part.match(/^(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)$/i);
        if (dayMatch) {
            currentDay = dayMatch[1].toLowerCase();
            continue;
        }
        if (currentDay && part.trim()) {
            const lines = part.split('\n').map(l => l.trim()).filter(l => l.length > 3);
            const items = [];
            for (const line of lines) {
                // Match menu categories: PICK IT, CHOOSE IT, LOVE IT, SOUP IT, DESSERT IT
                if (/^(PICK IT|CHOOSE IT|LOVE IT|SOUP IT|DESSERT)/i.test(line)) {
                    items.push(line);
                }
            }
            if (items.length > 0) {
                menu[currentDay] = items;
            }
            currentDay = null;
        }
    }
    return Object.keys(menu).length > 0 ? menu : null;
}

// Compass Group: extract window.__INITIAL_MENU__ JSON
async function parseCompass(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const match = html.match(/window\.__INITIAL_MENU__\s*=\s*(\{.*?\});\s*$/m);
    if (!match) return null;

    try {
        const data = JSON.parse(match[1]);
        const weekMenu = data.weekMenu;
        if (!weekMenu || !weekMenu.menus) return null;

        const menu = {};
        for (const dayMenu of weekMenu.menus) {
            const dayName = DAY_FROM_DOW[dayMenu.dayOfWeek];
            if (!dayName) continue;

            const items = [];
            for (const pkg of (dayMenu.menuPackages || [])) {
                const pkgName = pkg.name || '';
                for (const meal of (pkg.meals || [])) {
                    const name = meal.name || '';
                    const diets = (meal.diets || []).filter(d => d !== '*').join(', ');
                    if (name) {
                        const item = diets ? `${name} (${diets})` : name;
                        items.push(pkgName ? `${pkgName}: ${item}` : item);
                    }
                }
            }
            if (items.length > 0) {
                menu[dayName] = items;
            }
        }
        return Object.keys(menu).length > 0 ? menu : null;
    } catch {
        return null;
    }
}

// Antell: parse tab panels with accordion buttons
async function parseAntell(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const menu = {};

    for (const [engDay, fiDay] of Object.entries(DAY_ENGLISH)) {
        const panelId = `panel-${engDay.charAt(0).toUpperCase() + engDay.slice(1)}`;
        const panel = $(`#${panelId}, [id="${panelId}"]`);
        if (!panel.length) continue;

        const items = [];

        // Get section headers and prices
        const sectionTitle = panel.find('.tabpanel__header__title').first().text().trim();
        const sectionPrice = panel.find('.tabpanel__header__price').first().text().trim();

        // Get dish names from accordion buttons
        panel.find('.accordion__button').each((_, el) => {
            const dish = cleanText($(el).text());
            if (dish && dish.length > 2 && !dish.includes('Katso lisätiedot')) {
                items.push(dish);
            }
        });

        if (items.length > 0) {
            const header = sectionTitle && sectionPrice ? `${sectionTitle} ${sectionPrice}` : '';
            if (header) {
                menu[fiDay] = [`${header}:`, ...items];
            } else {
                menu[fiDay] = items;
            }
        }
    }
    return Object.keys(menu).length > 0 ? menu : null;
}

// Factory Ruoholahti: h3 day headers + p items
async function parseFactory(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const menu = {};

    // Find h3 elements with day names
    $('h3').each((_, el) => {
        const headerText = $(el).text().trim();
        const dayMatch = headerText.match(/^(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)/i);
        if (!dayMatch) return;

        const dayName = dayMatch[1].toLowerCase();
        const items = [];

        // Get following p elements until next h3
        let next = $(el).next();
        while (next.length && next.prop('tagName') !== 'H3') {
            if (next.prop('tagName') === 'P') {
                const text = next.text().trim();
                // Split by <br> or newlines
                const lines = text.split(/\n/).map(l => l.trim()).filter(l => l.length > 3);
                items.push(...lines);
            }
            next = next.next();
        }

        if (items.length > 0) {
            menu[dayName] = items;
        }
    });
    return Object.keys(menu).length > 0 ? menu : null;
}

// Factory Kamppi: similar to Factory but different site
async function parseFactoryKamppi(url) {
    return parseFactory(url); // Try same parser first
}

// Sodexo: JSON API
async function parseSodexo(config) {
    // First, try to find the restaurant ID from the page
    const html = await fetchPage(config.url);
    if (!html) return null;

    const idMatch = html.match(/weekly_json\/(\d+)|restaurant[_-]?id["\s:=]+(\d+)/i);
    if (!idMatch) return null;

    const restaurantId = idMatch[1] || idMatch[2];
    const jsonUrl = `https://www.sodexo.fi/ruokalistat/output/weekly_json/${restaurantId}`;
    const jsonText = await fetchPage(jsonUrl);
    if (!jsonText) return null;

    try {
        const data = JSON.parse(jsonText);
        const menu = {};

        for (const mealDate of (data.mealdates || [])) {
            const dayHeader = (mealDate.date || '').toLowerCase();
            const dayName = DAYS.find(d => dayHeader.includes(d));
            if (!dayName) continue;

            const items = [];
            for (const [, course] of Object.entries(mealDate.courses || {})) {
                const title = course.title_fi || course.title_en || '';
                const category = course.category || '';
                const diets = course.dietcodes || '';
                if (title) {
                    let item = title;
                    if (diets) item += ` (${diets})`;
                    items.push(item);
                }
            }
            if (items.length > 0) {
                menu[dayName] = items;
            }
        }
        return Object.keys(menu).length > 0 ? menu : null;
    } catch {
        return null;
    }
}

// Aangan: WordPress Elementor page
async function parseAangan(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const menu = {};

    // Aangan uses Elementor accordion: each day is an accordion item
    // with day name in .e-n-accordion-item-title-text and
    // dishes in .elementor-price-list-title / .elementor-price-list-price
    $('.e-n-accordion-item').each((_, item) => {
        const $item = $(item);
        const title = $item.find('.e-n-accordion-item-title-text').text().trim();
        const dayMatch = title.match(/^(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)$/i);
        if (!dayMatch) return;

        const dayName = dayMatch[1].toLowerCase();
        const items = [];

        $item.find('.elementor-price-list-title').each((_, el) => {
            const name = $(el).text().trim();
            const price = $(el).closest('.elementor-price-list-header')
                .find('.elementor-price-list-price').text().trim();
            if (name && name.length > 2) {
                items.push(name + (price ? ' ' + price : ''));
            }
        });

        if (items.length > 0) {
            menu[dayName] = items;
        }
    });

    return Object.keys(menu).length > 0 ? menu : null;
}

// Mekong: English day tabs with menu items
async function parseMekong(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const menu = {};
    const engDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Split by "Day's Menu" headers
    for (let i = 0; i < engDays.length; i++) {
        const dayEng = engDays[i];
        const fiDay = DAYS[i];
        const headerPattern = new RegExp(`${dayEng}['']s Menu`, 'i');
        const headerIdx = html.search(headerPattern);
        if (headerIdx < 0) continue;

        // Get content until next day's menu or end
        const nextDay = i + 1 < engDays.length ? engDays[i + 1] : null;
        const endPattern = nextDay ? new RegExp(`${nextDay}['']s Menu`, 'i') : null;
        const endIdx = endPattern ? html.slice(headerIdx + 20).search(endPattern) : 3000;
        const section = html.slice(headerIdx, headerIdx + 20 + (endIdx > 0 ? endIdx : 3000));

        // Extract text, removing HTML
        const text = section.replace(/<[^>]+>/g, '\n');
        const lines = text.split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 5)
            .filter(l => !/Menu details|Desert|^\s*$/i.test(l))
            .filter(l => !/^(Monday|Tuesday|Wednesday|Thursday|Friday)/i.test(l));

        if (lines.length > 0) {
            menu[fiDay] = lines.slice(0, 8);
        }
    }
    return Object.keys(menu).length > 0 ? menu : null;
}

// Raflaamo (S Group): extract weeklyLunchMenu from embedded JSON
async function parseRaflaamo(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const idx = html.indexOf('weeklyLunchMenu');
    if (idx < 0) return null;

    const menu = {};
    const chunk = html.slice(idx, idx + 50000);

    const engToFi = { monday: 'maanantai', tuesday: 'tiistai', wednesday: 'keskiviikko', thursday: 'torstai', friday: 'perjantai' };

    for (const [eng, fi] of Object.entries(engToFi)) {
        const dayIdx = chunk.indexOf(`"${eng}"`);
        if (dayIdx < 0) continue;

        // Check if it's null
        const afterDay = chunk.slice(dayIdx + eng.length + 2, dayIdx + eng.length + 10);
        if (afterDay.includes('null')) continue;

        // Find portions for this day - get the next "portions" block after the day key
        const daySection = chunk.slice(dayIdx, dayIdx + 5000);
        const portionBlocks = [...daySection.matchAll(/"portions":\[(.*?)\]/gs)];

        const items = [];
        for (const block of portionBlocks) {
            const names = [...block[1].matchAll(/"default":"([^"]+)"/g)];
            for (const n of names) {
                let text = n[1].replace(/\\n/g, '\n').trim();
                // Split multi-dish descriptions into separate items
                const dishes = text.split('\n').map(d => d.trim()).filter(d => d.length > 3);
                items.push(...dishes);
            }
        }
        if (items.length > 0) {
            menu[fi] = items;
        }
    }
    return Object.keys(menu).length > 0 ? menu : null;
}

// Don Corleone: weekly menu (same dishes all week, no per-day split)
async function parseDonCorleone(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const body = $('body').text();

    // Find menu section after "Lounas vko" header
    const startMatch = body.match(/Lounas\s+vko\s+\d+/i);
    if (!startMatch) return null;

    const startIdx = body.indexOf(startMatch[0]) + startMatch[0].length;
    const section = body.slice(startIdx, startIdx + 2000);

    const lines = section.split('\n').map(l => l.trim()).filter(l => l.length > 2);
    const items = [];

    // Lines alternate: dish name, price (€), description
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Stop at footer text
        if (/^\+358|^Kampin|^Urho|^Tietosuoja|^Oiva/i.test(line)) break;
        if (/Lounasaikaan|arkisin/i.test(line)) continue;

        // If this line is a dish name and next line is a price
        const next = lines[i + 1] || '';
        if (!(/€/.test(line)) && /^\d+[.,]\d+\s*€/.test(next) && line.length > 5) {
            items.push(`${line} ${next}`);
            i++; // skip price line
            // Skip description line too if present
            const desc = lines[i + 1] || '';
            if (desc && !(/€/.test(desc)) && !(/^\+358|^Kampin|^Urho|^Tietosuoja|^Oiva/i.test(desc)) && !(/Lounasaikaan|arkisin/i.test(desc))) {
                i++; // skip description
            }
        }
    }

    if (items.length === 0) return null;

    const menu = {};
    for (const day of DAYS) {
        menu[day] = items;
    }
    return menu;
}

// La Torrefazione: weekly menu (same dishes, no per-day split)
async function parseLatorre(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const body = $('body').text();

    // Find menu section after "Kaikki lounasannoksemme"
    const markerIdx = body.indexOf('Kaikki lounasannoksemme');
    if (markerIdx < 0) return null;

    const section = body.slice(markerIdx, markerIdx + 3000);
    const lines = section.split('\n').map(l => l.trim()).filter(l => l.length > 3);

    const items = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Stop at footer or breakfast section
        if (/Aukioloajat|yhteystiedot|instagram|facebook|^Aamiainen$/i.test(line)) break;

        // Dish lines contain allergen codes like (L, G), (Ve), (L) or are clearly dish names
        if (/\([LGV][^)]*\)/.test(line) && line.length > 8 && line.length < 150) {
            // Look ahead for price
            const next = lines[i + 1] || '';
            const priceMatch = next.match(/^(\d+[.,]\d+\s*€)/);
            if (priceMatch) {
                items.push(`${line} ${priceMatch[1]}`);
                i++; // skip price line
            } else {
                items.push(line);
            }
        }
    }

    if (items.length === 0) return null;

    const menu = {};
    for (const day of DAYS) {
        menu[day] = items;
    }
    return menu;
}

// Lounasmenu.fi: for restaurants like Ekberg — uses .mim-full day blocks
async function parseLounasmenu(slug) {
    const url = `https://www.lounasmenu.fi/helsinki/${slug}/lounas/`;
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const menu = {};
    const dayPattern = /^(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)\s+\d/i;

    // Each .mim-full block is one day's menu
    $('.mim-full').each((_, block) => {
        let dayName = null;
        const items = [];

        $(block).find('.mim-row').each((__, row) => {
            const txt = $(row).find('.mim-txt0, .mim-txt').text().trim();
            if (!txt) return;

            // First row with a day name + date is the header
            if (!dayName) {
                const m = txt.match(dayPattern);
                if (m) { dayName = m[1].toLowerCase(); return; }
            }

            // Skip noise
            if (/^\*|^Lounas buffet$|^Tarjolla on/i.test(txt)) return;
            if (/^\d+[.,]\d+\s*€$/.test(txt)) return;
            if (txt.length < 5 || txt.length > 200) return;

            items.push(txt);
        });

        if (dayName && items.length > 0) {
            menu[dayName] = items;
        }
    });

    return Object.keys(menu).length > 0 ? menu : null;
}

// Lounaat.info: individual restaurant page
async function parseLounaat(slug) {
    const url = `https://www.lounaat.info/lounas/${slug}/helsinki`;
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const menu = {};

    $('div.item').each((_, el) => {
        const $el = $(el);
        const header = $el.find('.item-header h3').text().trim().toLowerCase();

        // Find day name
        let dayName = null;
        for (const [partitive, base] of Object.entries(DAY_PARTITIVE)) {
            if (header.includes(partitive)) {
                dayName = base;
                break;
            }
        }
        if (!dayName) return;

        // Check for "missing" links (no menu data)
        if ($el.find('.missing').length > 0) return;

        const items = [];
        $el.find('li.menu-item, li').each((_, li) => {
            const $li = $(li);
            if ($li.find('.missing').length > 0) return;

            const dish = $li.find('.dish').text().trim();
            const info = $li.find('.info').text().trim();

            let item = '';
            if (dish && info) item = `${dish}: ${info}`;
            else if (dish) item = dish;
            else if (info) item = info;
            else item = cleanText($li.text());

            // Filter out placeholder text
            if (item && item.length > 3 && !item.startsWith('+++') && !item.includes('Katso päivän')) {
                items.push(item);
            }
        });

        if (items.length > 0) {
            menu[dayName] = items;
        }
    });
    return Object.keys(menu).length > 0 ? menu : null;
}

// Lounastaja widget: fetch page to get widget ID + API key, then call Lounastaja API
async function parseLounastaja(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    // Extract widget ID and API key from the page
    const widgetIdMatch = html.match(/lounastaja-widget-id=["']?([^"'\s>]+)/i);
    const apiKeyMatch = html.match(/data-api-key=["']?([^"'\s>]+)/i);
    if (!widgetIdMatch || !apiKeyMatch) return null;

    const widgetId = widgetIdMatch[1];
    const apiKey = apiKeyMatch[1];
    const apiUrl = `https://lounastaja.app/api/v1/widget/${apiKey}/${widgetId}`;

    try {
        const res = await fetch(apiUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.data?.week?.days) return null;

        const menu = {};
        for (const day of data.data.week.days) {
            const dayName = day.dayName?.fi?.toLowerCase();
            if (!dayName || !DAYS.includes(dayName)) continue;
            if (day.isClosed || !day.lunches?.length) continue;

            const items = day.lunches.map(lunch => {
                const name = lunch.title?.fi || '';
                const price = lunch.normalPrice?.price || '';
                if (!name) return null;
                return price ? `${name} ${price} €` : name;
            }).filter(Boolean);

            if (items.length > 0) {
                menu[dayName] = items;
            }
        }
        return Object.keys(menu).length > 0 ? menu : null;
    } catch {
        return null;
    }
}

// Satama Bar: daily menus on /lounas page — text split by day names with dates
async function parseSatamabar(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const body = $('body').text();

    const menu = {};
    // Match day names with dates: "Maanantai 6.4.2026" or "Tiistai7.4.2026"
    const dayPattern = /(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)\s*\d+\.\d+\.\d{4}/gi;
    const matches = [...body.matchAll(dayPattern)];

    for (let i = 0; i < matches.length; i++) {
        const dayName = matches[i][1].toLowerCase();
        const start = matches[i].index + matches[i][0].length;
        const end = i + 1 < matches.length ? matches[i + 1].index : start + 1000;
        const section = body.slice(start, end);

        // Check for closed message
        if (/suljettu/i.test(section.slice(0, 100))) continue;

        // Extract dish items — they typically contain allergen codes like (G, M), (VE), (VE, G)
        const items = [];
        // The text is concatenated without separators, split at allergen code boundaries
        const dishPattern = /([^()]{5,}?\s*\([^)]+\))/g;
        const dishMatches = [...section.matchAll(dishPattern)];
        for (const dm of dishMatches) {
            let dish = dm[1].trim();
            // Stop at footer text
            if (/Aukioloajat|Kalasatama|Herttoniemi|Työpajankatu|info@/i.test(dish)) break;
            if (dish.length > 8 && dish.length < 200) {
                items.push(dish);
            }
        }

        if (items.length > 0) {
            menu[dayName] = items;
        }
    }
    return Object.keys(menu).length > 0 ? menu : null;
}

// Generic "direct" parser: tries to extract menu from any site by looking for day names
async function parseDirect(url) {
    const html = await fetchPage(url);
    if (!html) return null;

    const $ = cheerio.load(html);
    const bodyText = $('body').text();
    const menu = {};

    // Strategy: split text by Finnish day names and extract lines
    const dayPattern = /(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)(?:\s*\d+\.\d+\.?\d*)?/gi;
    const matches = [...bodyText.matchAll(dayPattern)];

    for (let i = 0; i < matches.length; i++) {
        const dayName = matches[i][1].toLowerCase();
        if (menu[dayName]) continue; // Already found this day

        const start = matches[i].index + matches[i][0].length;
        const end = i + 1 < matches.length ? matches[i + 1].index : start + 2000;
        const section = bodyText.substring(start, Math.min(end, start + 2000));

        // Split by newlines, but also try splitting concatenated multilingual items
        // (e.g., "Finnish textEnglish text" → only keep Finnish)
        let rawLines = section.split(/\n/).map(l => l.trim());

        // If a line contains concatenated Finnish+English, try to split at uppercase letter mid-word
        rawLines = rawLines.flatMap(l => {
            // Split very long concatenated strings at likely boundaries
            if (l.length > 100) {
                // Split before English translations that follow Finnish text
                const parts = l.split(/(?<=[a-zäöå])(?=[A-Z][a-z])/);
                if (parts.length > 1) return parts;
            }
            return [l];
        });

        const lines = rawLines
            .map(l => l.trim())
            .filter(l => l.length > 5 && l.length < 200)
            .filter(l => !/^(Maanantai|Tiistai|Keskiviikko|Torstai|Perjantai)/i.test(l))
            .filter(l => !/^(Copyright|©|\d{4}|Menu|Lounas|Ruokalista|Osoite|Puhelin|Yhteystiedot)/i.test(l))
            // Filter likely English translations
            .filter(l => !/^[A-Z][a-z]+(?: [a-z]+){2,}/.test(l) || /[äöåÄÖÅ€]/.test(l))
            .slice(0, 10);

        if (lines.length > 0) {
            menu[dayName] = lines;
        }
    }
    return Object.keys(menu).length > 0 ? menu : null;
}

// --- Quality filter ---
function validateMenu(menu) {
    if (!menu || Object.keys(menu).length === 0) return null;

    const filtered = {};
    for (const [day, items] of Object.entries(menu)) {
        // Filter individual items
        const goodItems = items
            .map(item => {
                // Fix concatenated text (e.g., "/ MondayPunainencurry" -> "Punainencurry")
                let cleaned = item.replace(/^\/\s*(?:Monday|Tuesday|Wednesday|Thursday|Friday)\s*/i, '');
                // Remove leading/trailing whitespace and normalize spaces
                cleaned = cleaned.replace(/\s+/g, ' ').trim();
                return cleaned;
            })
            .filter(item => {
                if (item.length < 5) return false;
                // Filter generic/non-menu content
                if (item.includes('kuuluu runsas salaattipöytä')) return false;
                if (item.includes('Nähdään lounaalla')) return false;
                if (item.includes('Katso päivän')) return false;
                if (item.startsWith('+++')) return false;
                // CSS class names in text = parsing error
                if (/\.kb-dynamic|\.elementor|class=/.test(item)) return false;
                // Standalone prices without food description
                if (/^\d+[.,]\d+\s*€?$/.test(item)) return false;
                // Navigation/UI text
                if (/^(Yrityksille|Yksityisille|Ota yhteyttä|Varaa|What's Happening|More upcoming|Kulttuurikasarmin|Narinkkatori|Sijanti kartalla|Kuvagalleria)/i.test(item)) return false;
                // Too long = probably page text, not a menu item
                if (item.length > 200) return false;
                return true;
            });

        if (goodItems.length > 0) {
            filtered[day] = goodItems;
        }
    }

    // If all days have identical items, it might be generic text — but allow real weekly menus
    const allItems = Object.values(filtered);
    if (allItems.length > 1) {
        const first = JSON.stringify(allItems[0]);
        if (allItems.every(items => JSON.stringify(items) === first)) {
            // If items contain prices or allergen codes, it's a real weekly menu
            const hasRealContent = allItems[0].some(item => /€/.test(item) || /\([LGV][^)]*\)/.test(item));
            if (!hasRealContent) return null;
        }
    }

    return Object.keys(filtered).length > 0 ? filtered : null;
}

// --- Main orchestrator ---
async function scrapeRestaurant(id, source) {
    try {
        switch (source.type) {
            case 'halo':        return await parseHalo(source.url);
            case 'compass':     return await parseCompass(source.url);
            case 'antell':      return await parseAntell(source.url);
            case 'factory':     return await parseFactory(source.url);
            case 'factory-kamppi': return await parseFactoryKamppi(source.url);
            case 'sodexo':      return await parseSodexo(source);
            case 'aangan':      return await parseAangan(source.url);
            case 'mekong':      return await parseMekong(source.url);
            case 'raflaamo':    return await parseRaflaamo(source.url);
            case 'doncorleone': return await parseDonCorleone(source.url);
            case 'latorre':     return await parseLatorre(source.url);
            case 'lounasmenu':  return await parseLounasmenu(source.slug);
            case 'lounaat':     return await parseLounaat(source.slug);
            case 'lounastaja':  return await parseLounastaja(source.url);
            case 'satamabar':   return await parseSatamabar(source.url);
            case 'direct':      return await parseDirect(source.url);
            default:            return null;
        }
    } catch (e) {
        console.error(`  Error parsing ${source.type}: ${e.message}`);
        return null;
    }
}

async function main() {
    console.log('Siili Lounas - Menu Scraper');
    console.log('==========================\n');

    // Load restaurant names for logging
    const restaurantsJsPath = path.join(__dirname, '..', 'restaurants.js');
    const restaurantsJs = fs.readFileSync(restaurantsJsPath, 'utf8');
    const nameMap = {};
    const nameMatches = restaurantsJs.matchAll(/id:\s*(\d+),\s*\n\s*name:\s*"([^"]+)"/g);
    for (const m of nameMatches) {
        nameMap[m[1]] = m[2];
    }

    const menus = {};
    let success = 0, fail = 0;
    const ids = Object.keys(SOURCES).map(Number).sort((a, b) => a - b);

    // Process in batches of 3 to be polite to servers
    for (let i = 0; i < ids.length; i += 3) {
        const batch = ids.slice(i, i + 3);
        const results = await Promise.all(batch.map(async (id) => {
            const source = SOURCES[id];
            const name = nameMap[id] || `#${id}`;

            const rawMenu = await scrapeRestaurant(id, source);
            const menu = validateMenu(rawMenu);

            if (menu) {
                const days = Object.keys(menu).length;
                const totalItems = Object.values(menu).reduce((sum, items) => sum + items.length, 0);
                console.log(`  [${id}] ${name} (${source.type}): ✓ ${days} päivää, ${totalItems} annosta`);
                return { id, menu };
            } else {
                console.log(`  [${id}] ${name} (${source.type}): ✗ ei dataa`);
                return { id, menu: null };
            }
        }));

        for (const r of results) {
            if (r.menu) {
                menus[r.id] = r.menu;
                success++;
            } else {
                fail++;
            }
        }

        if (i + 3 < ids.length) await delay(500);
    }

    console.log(`\n==========================`);
    console.log(`Tulos: ${success} onnistui, ${fail} epäonnistui (${ids.length} yhteensä)`);

    // Calculate week info
    const now = new Date();
    const jan1 = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - jan1) / 86400000) + 1;
    const weekNumber = Math.ceil((dayOfYear + jan1.getDay()) / 7);

    // Get week date range
    const dow = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    const dateRange = `${monday.getDate()}.${monday.getMonth() + 1}.–${friday.getDate()}.${friday.getMonth() + 1}.${friday.getFullYear()}`;

    const output = {
        lastUpdated: now.toISOString(),
        weekNumber,
        dateRange,
        menus,
    };

    // Write menus.js
    const outputPath = path.join(__dirname, '..', 'menus.js');
    const jsContent = `// Auto-generated by scraper – ${now.toISOString()}\n// Do not edit manually\nconst MENUS = ${JSON.stringify(output, null, 2)};\n`;
    fs.writeFileSync(outputPath, jsContent, 'utf8');

    console.log(`\nKirjoitettu: ${outputPath}`);
    console.log(`Viikko ${weekNumber} / ${dateRange}`);
}

main().catch(e => {
    console.error('Fatal error:', e);
    process.exit(1);
});
