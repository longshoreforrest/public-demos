#!/usr/bin/env python3
"""Process Oulu2026 event data from Bubster API JSON into app-ready JS."""
import json, re, random, hashlib

# Finnish postal code -> approximate coordinates mapping
POSTAL_COORDS = {
    "90100": (65.0125, 25.4680),  # Oulu keskusta
    "90110": (65.0100, 25.4750),
    "90120": (65.0060, 25.4800),
    "90130": (65.0170, 25.4600),  # Oulu Tuira
    "90140": (65.0200, 25.4500),
    "90150": (65.0250, 25.4550),
    "90220": (65.0000, 25.5100),  # Oulu Kaukovainio
    "90230": (64.9950, 25.5200),
    "90240": (64.9900, 25.5000),
    "90250": (65.0040, 25.4785),  # Ouluhalli / Raksila
    "90400": (65.0050, 25.5100),  # Oulu Välivainio
    "90410": (65.0060, 25.5200),
    "90420": (65.0080, 25.5300),
    "90500": (65.0350, 25.4400),  # Oulu Hietasaari
    "90510": (65.0300, 25.3930),  # Nallikari
    "90520": (65.0280, 25.4200),
    "90530": (65.0400, 25.4000),
    "90540": (65.0150, 25.4350),  # Oulu Toppila
    "90550": (65.0350, 25.4600),
    "90560": (65.0400, 25.4800),
    "90570": (65.0450, 25.4900),  # Oulu Pateniemi
    "90580": (65.0600, 25.4700),
    "90590": (65.0500, 25.5000),
    "90620": (65.0300, 25.5200),
    "90630": (65.0350, 25.5400),
    "90640": (65.0400, 25.5600),
    "90650": (65.0450, 25.5800),
    "90660": (65.0500, 25.6000),  # Oulu Jääli
    "90670": (65.0800, 25.5300),  # Kiiminki
    "90680": (65.0900, 25.5400),
    "90740": (65.0100, 25.4300),  # Oulunsalo
    "90800": (64.9400, 25.4100),
    "90900": (65.1200, 25.3800),  # Kiiminki keskus
    "91100": (65.3160, 25.3770),  # Ii
    "91200": (65.2000, 25.3500),
    "91300": (65.0800, 25.8500),  # Ylikiiminki
    "91310": (65.0600, 25.7500),
    "91500": (65.0500, 25.6500),  # Muhos
    "91600": (64.7600, 26.4200),  # Utajärvi
    "91800": (64.7600, 25.6500),  # Tyrnävä
    "91900": (64.8100, 25.4200),  # Liminka
    "91910": (64.8400, 25.3900),
    "92100": (64.6847, 24.4734),  # Raahe
    "92120": (64.6900, 24.4800),
    "93100": (65.3600, 27.0000),  # Pudasjärvi
    "93600": (65.9600, 29.1700),  # Kuusamo
    "94100": (65.7350, 24.5700),  # Kemi
    "94200": (65.7500, 24.5600),
    "95400": (65.8490, 24.1460),  # Tornio
    "84100": (64.0800, 24.5300),  # Ylivieska
    "85100": (64.2590, 23.9480),  # Kalajoki
    "85410": (63.9050, 24.5200),  # Sievi
    "85500": (64.0000, 25.0000),  # Nivala
    "85800": (63.7500, 25.3200),  # Haapajärvi
    "86170": (63.8000, 25.4000),  # Kärsämäki
    "86300": (64.2700, 24.8100),  # Oulainen
    "86400": (64.3500, 24.6000),  # Vihanti
    "86600": (64.1800, 24.5000),  # Haapavesi
    "86710": (64.1380, 25.3730),  # Haapavesi folk
    "87100": (64.2270, 27.6780),  # Kajaani
    "87200": (64.2270, 27.6780),  # Kajaani
    "88270": (63.5500, 23.6900),  # Kaustinen
    "88900": (64.1300, 29.5200),  # Kuhmo
    "89200": (64.8700, 27.6700),  # Puolanka
    "89600": (64.9200, 29.0700),  # Suomussalmi
    "89800": (65.0800, 28.1200),  # Hyrynsalmi
    "90015": (65.0125, 25.4680),  # Oulu virtual
    "97700": (65.9300, 26.5100),  # Ranua
}

# Known venues in Oulu -> exact coordinates
VENUE_COORDS = {
    "valve": (65.0142, 25.4703),
    "hallituskatu 7": (65.0142, 25.4703),
    "kauppatori": (65.0139, 25.4633),
    "ouluhalli": (65.0040, 25.4785),
    "ouluhallintie": (65.0040, 25.4785),
    "kaupunginteatteri": (65.0147, 25.4628),
    "kaarlenväylä 2": (65.0147, 25.4628),
    "tuomiokirkko": (65.0145, 25.4685),
    "kirkkokatu 3": (65.0145, 25.4685),
    "kaupungintalo": (65.0137, 25.4660),
    "torikatu 10": (65.0137, 25.4660),
    "pääkirjasto": (65.0143, 25.4610),
    "kaarlenväylä 6": (65.0143, 25.4610),
    "pekuri": (65.0128, 25.4717),
    "isokatu 23": (65.0128, 25.4717),
    "taidemuseo": (65.0160, 25.4730),
    "kasarmintie 7": (65.0160, 25.4730),
    "nallikari": (65.0300, 25.3930),
    "leiritie": (65.0300, 25.3930),
    "kuusisaari": (65.0090, 25.4395),
    "pikisaari": (65.0195, 25.4555),
    "tietomaa": (65.0110, 25.4750),
    "valkea": (65.0118, 25.4735),
    "pohjankartano": (65.0125, 25.4660),
    "proto": (65.0133, 25.4645),
    "torikatu 22": (65.0133, 25.4645),
    "mannenkatu": (65.0155, 25.4590),
    "tuba": (65.0155, 25.4590),
    "45 special": (65.0120, 25.4710),
    "kulttuurikeskus": (65.0142, 25.4703),
    "åström": (65.0100, 25.4600),
    "raatti": (65.0080, 25.4350),
    "tehtaankatu": (65.0050, 25.4780),
    "rotuaari": (65.0128, 25.4717),
    "isokatu": (65.0128, 25.4717),
    "kirjasto saari": (65.0143, 25.4610),
    "keskuskirjasto": (65.0143, 25.4610),
    "toppilansalmi": (65.0350, 25.4380),
}

# Category mapping from Bubster categories to our app categories
CATEGORY_MAP = {
    "theatre": "theatre",
    "music": "music",
    "movies": "film",
    "dance and circus": "dance",
    "dance": "dance",
    "circus": "circus",
    "literature": "literature",
    "sports and fitness": "sports",
    "sports": "sports",
    "fairs and markets": "community",
    "exhibitions": "visual",
    "city and village festivals": "festival",
    "nature and environmental art": "visual",
    "excursions/guided tours/activities": "community",
    "excursions": "community",
    "guided tours": "community",
    "food and drink": "food",
    "food": "food",
    "virtual events": "tech",
    "virtual": "tech",
    "crafts and design": "visual",
    "seminars/meetings/conferences": "community",
    "seminars": "community",
    "art and technology": "tech",
    "visual arts": "visual",
    "other events": "community",
    "other": "community",
}

CATEGORY_FI = {
    "music": "Musiikki",
    "theatre": "Teatteri",
    "visual": "Kuvataide",
    "food": "Ruokakulttuuri",
    "festival": "Festivaali",
    "film": "Elokuva",
    "literature": "Kirjallisuus",
    "tech": "Taide & Teknologia",
    "children": "Lastenkulttuuri",
    "heritage": "Perintökulttuuri",
    "circus": "Sirkus",
    "sauna": "Sauna",
    "community": "Yhteisö",
    "science": "Tiede",
    "dance": "Tanssi",
    "sports": "Urheilu",
}


def geocode(location_str):
    """Try to get coordinates from location string."""
    loc_lower = location_str.lower()

    # Check known venues first
    for venue_key, coords in VENUE_COORDS.items():
        if venue_key in loc_lower:
            # Add small random offset to prevent marker stacking
            return (coords[0] + random.uniform(-0.001, 0.001),
                    coords[1] + random.uniform(-0.002, 0.002))

    # Try postal code
    m = re.search(r'(\d{5})', location_str)
    if m:
        pc = m.group(1)
        if pc in POSTAL_COORDS:
            coords = POSTAL_COORDS[pc]
            return (coords[0] + random.uniform(-0.005, 0.005),
                    coords[1] + random.uniform(-0.008, 0.008))

    return None


def parse_date(time_str):
    """Parse Bubster time string into startDate, endDate, month."""
    if not time_str or time_str == "Past event":
        return None, None, None

    # Patterns:
    # "Fri 26.6.2026 at 17:00 - 2:00"
    # "Wed 22.4.2026 - Sat 16.5.2026"
    # "Mon 30.3.2026 - Wed 15.7.2026"
    # "Fri 26.6.2026 at 17:00 - 2:00 | +2 dates"

    dates = re.findall(r'(\d{1,2})\.(\d{1,2})\.(\d{4})', time_str)
    if not dates:
        return None, None, None

    start_day, start_month, start_year = dates[0]
    start_date = f"{start_year}-{int(start_month):02d}-{int(start_day):02d}"
    start_month_num = int(start_month)

    if len(dates) >= 2:
        end_day, end_month, end_year = dates[1]
        end_date = f"{end_year}-{int(end_month):02d}-{int(end_day):02d}"
    else:
        end_date = start_date

    return start_date, end_date, start_month_num


def map_category(categories_list, name="", description=""):
    """Map Bubster categories to app categories using keywords."""
    # First try Bubster categories
    if categories_list:
        for cat in categories_list:
            cat_lower = cat.lower().strip()
            if cat_lower in CATEGORY_MAP:
                app_cat = CATEGORY_MAP[cat_lower]
                return app_cat, CATEGORY_FI[app_cat]

    # Keyword-based categorization from name + description
    text = (name + " " + description).lower()

    # Order matters: more specific first
    keyword_rules = [
        (["sauna"], "sauna"),
        (["circus", "sirkus", "acrobat"], "circus"),
        (["jazz"], "music"),
        (["opera", "ooppera", "sinfonia", "symphony", "orchestra", "orkester"], "music"),
        (["folk music", "kansanmusiik", "chamber music", "kamarimusiik"], "music"),
        (["concert", "konsertti", "gig ", "keikka", "live music", "album launch", "dj ", "electronic music"], "music"),
        (["rock", "punk", "metal", "hip hop", "rap "], "music"),
        (["music festival", "musiikkifestivaali"], "music"),
        (["choir", "kuoro", "singing", "laulu"], "music"),
        (["dance", "tanssi", "ballet", "baletti"], "dance"),
        (["theatre", "teatteri", "play ", "näytelmä", "drama", "draama", "performance art", "esitys"], "theatre"),
        (["film", "elokuva", "movie", "screening", "documentary", "cinema"], "film"),
        (["book", "kirja", "poetry", "runo", "literature", "kirjallisuus", "reading", "writing", "novel"], "literature"),
        (["exhibition", "näyttely", "gallery", "galleria", "painting", "sculpture", "photography", "valokuva", "installation", "installaatio", "mural"], "visual"),
        (["art trail", "taidereitti", "public art", "julkinen taide", "environmental art", "ympäristötaide", "street art"], "visual"),
        (["food", "ruoka", "culinary", "tasting", "restaurant", "ravintola", "cooking", "chef", "dinner"], "food"),
        (["technology", "teknologia", "digital", "light festival", "valo", "media art", "ai ", "robot"], "tech"),
        (["museum", "museo", "science", "tiede"], "science"),
        (["child", "lapsi", "family", "perhe", "kids", "nuor"], "children"),
        (["sami", "saame", "indigenous", "alkuperäis"], "heritage"),
        (["festival", "festivaali", "fiesta", "karnevaa"], "festival"),
        (["sport", "urheilu", "swimming", "uinti", "running", "juoksu", "skiing", "hiihto", "games"], "sports"),
        (["workshop", "työpaja", "seminar", "lecture", "luento", "conference", "guided tour", "opastus"], "community"),
        (["market", "markkin", "fair ", "messut"], "community"),
        (["art", "taide", "artist", "taiteilija", "creative"], "visual"),
        (["music", "musiik", "band ", "bändi", "song"], "music"),
    ]

    for keywords, cat in keyword_rules:
        for kw in keywords:
            if kw in text:
                return cat, CATEGORY_FI[cat]

    return "community", CATEGORY_FI["community"]


def clean_location(loc):
    """Extract a clean venue name from address."""
    # Remove duplicates like "Cultural Centre Valve, Cultural Centre Valve, ..."
    parts = [p.strip() for p in loc.split(",")]
    seen = set()
    clean_parts = []
    for p in parts:
        if p.lower() not in seen:
            seen.add(p.lower())
            clean_parts.append(p)
    return ", ".join(clean_parts)


def format_dates_fi(time_str, start_date, end_date):
    """Create Finnish-style date string."""
    if not start_date:
        return time_str

    months_fi = {
        1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6",
        7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12"
    }

    sd = start_date.split("-")
    ed = end_date.split("-")

    s_day = int(sd[2])
    s_month = int(sd[1])
    e_day = int(ed[2])
    e_month = int(ed[1])

    if start_date == end_date:
        return f"{s_day}.{s_month}.{sd[0]}"
    elif s_month == e_month:
        return f"{s_day}.–{e_day}.{s_month}.{sd[0]}"
    else:
        return f"{s_day}.{s_month}.–{e_day}.{e_month}.{sd[0]}"


def main():
    with open("/tmp/oulu2026_all_events_complete.json") as f:
        data = json.load(f)

    events = data["events"]
    processed = []
    seen_names = set()

    for ev in events:
        # Skip past events
        if ev["time"] == "Past event":
            continue

        # Skip events without location
        loc = ev.get("location", "").strip()
        if not loc:
            continue

        # Parse dates
        start_date, end_date, month = parse_date(ev["time"])
        if not start_date:
            continue

        # Skip if before today (2026-04-09)
        if end_date < "2026-04-09":
            continue

        # Geocode
        coords = geocode(loc)
        if not coords:
            continue

        # Map category
        category, category_fi = map_category(ev.get("categories", []), ev["name"], ev.get("description", ""))

        # Skip duplicate names
        name_key = ev["name"].lower().strip()
        if name_key in seen_names:
            continue
        seen_names.add(name_key)

        # Clean data
        name = ev["name"].strip()
        if name.startswith('"') and name.endswith('"'):
            name = name[1:-1]

        location = clean_location(loc)
        description = ev.get("description", "").strip()
        dates_fi = format_dates_fi(ev["time"], start_date, end_date)
        url = ev.get("oulu2026_url", ev.get("detail_url", ""))

        # Generate stable numeric ID from event id string
        num_id = int(hashlib.md5(ev["id"].encode()).hexdigest()[:8], 16) % 100000 + 100

        processed.append({
            "id": num_id,
            "name": name,
            "nameEn": name,
            "dates": dates_fi,
            "startDate": start_date,
            "endDate": end_date,
            "month": month if month else 0,
            "location": location,
            "address": location,
            "lat": round(coords[0], 4),
            "lng": round(coords[1], 4),
            "category": category,
            "categoryFi": category_fi,
            "price": "",
            "url": url,
            "description": description,
        })

    # Sort by start date
    processed.sort(key=lambda x: x["startDate"])

    print(f"Processed {len(processed)} events")

    # Category breakdown
    cats = {}
    for e in processed:
        cats[e["category"]] = cats.get(e["category"], 0) + 1
    for k, v in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {k}: {v}")

    # Write JS file
    output_path = "/Users/tapio.pitkaranta/Documents/Gitlab/rapid-agent-prototypes/Site_Tour/Oulu_kulttuuripaakaupunki/events_data.js"
    with open(output_path, "w") as f:
        f.write("// Auto-generated from Oulu2026 Bubster API - " + str(len(processed)) + " events\n")
        f.write("const eventsFromAPI = ")
        f.write(json.dumps(processed, ensure_ascii=False, indent=None))
        f.write(";\n")

    print(f"Written to {output_path}")


if __name__ == "__main__":
    random.seed(42)  # Reproducible coordinates
    main()
