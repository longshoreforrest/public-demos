/* ============================================================
   Laskujen tarkastus – Siili Solutions Joensuu
   ============================================================ */

const $ = id => document.getElementById(id);

// ── i18n ────────────────────────────────────────────────────
const T = {
  fi: {
    guideLink: 'Käyttöohje \u2192',
    headerTitle: 'Laskujen tarkastus – Joensuu',
    uploadInvoice: 'Tuo lasku',
    uploadTitle: 'Tuo uusi lasku',
    uploadSubtitle: 'Valitse PDF-tiedosto tai pudota se alle',
    uploadDropText: 'Pudota PDF-lasku tähän tai klikkaa valitaksesi',
    uploadFormat: 'Tuettu muoto: PDF',
    tabDashboard: 'Yhteenveto',
    tabInvoices: 'Kaikki laskut',
    tabAnalytics: 'Analytiikka',
    tabSuppliers: 'Toimittajat',
    tabFlagged: 'Huomioitavat',
    totalInvoices: 'Laskuja yhteensä',
    totalSum: 'Summa yhteensä',
    autoApproved: 'Suositus: hyväksy',
    needsReview: 'Tarkista',
    flaggedIssues: 'Huomioitava',
    recentActivity: 'Kuukausittaiset laskut',
    recentFlags: 'Viimeisimmät huomiot',
    latestInvoices: 'Tuoreimmat laskut – toimenpidettä odottavat',
    latestAll: 'Tuoreimmat laskut',
    showAll: 'Näytä kaikki',
    search: 'Hae laskusta tai toimittajasta...',
    allStatuses: 'Kaikki tilat',
    allSuppliers: 'Kaikki toimittajat',
    allCategories: 'Kaikki kategoriat',
    date: 'Päivämäärä',
    invoiceNo: 'Laskunumero',
    supplier: 'Toimittaja',
    description: 'Kuvaus',
    amount: 'Summa',
    status: 'Tila',
    recommendation: 'Suositus',
    approve: 'Hyväksy',
    reject: 'Hylkää',
    markReview: 'Tarkistettava',
    close: 'Sulje',
    invoiceDetails: 'Laskun tiedot',
    lineItems: 'Rivit',
    comparison: 'Vertailu edelliseen',
    analysis: 'Analyysi',
    item: 'Tuote/Palvelu',
    qty: 'Määrä',
    unitPrice: 'Yksikköhinta',
    total: 'Yhteensä',
    prevInvoice: 'Edellinen lasku',
    thisInvoice: 'Tämä lasku',
    change: 'Muutos',
    priceUp: 'Yksikköhinta noussut',
    priceDown: 'Yksikköhinta laskenut',
    amountUp: 'Laskun summa kasvanut merkittävästi',
    amountSimilar: 'Laskun summa on samaa luokkaa kuin edellinen',
    noPrevious: 'Ei edellistä laskua vertailtavaksi',
    newSupplier: 'Uusi toimittaja – ei historiaa',
    unclear: 'Epäselvä kuvaus tai rivinimike',
    missingRef: 'Viite puuttuu',
    duplicateAmount: 'Sama summa kuin edellinen – mahdollinen tuplalasku',
    ok: 'OK – ei huomautettavaa',
    invoiceCount: 'Laskuja',
    avgAmount: 'Keskim. summa',
    trend: 'Trendi',
    category: 'Kategoria',
    dueDate: 'Eräpäivä',
    paymentTerm: 'Maksuehto',
    vatPercent: 'ALV %',
    vatAmount: 'ALV',
    netAmount: 'Veroton',
    referenceNo: 'Viitenumero',
    approved: 'Hyväksytty',
    rejected: 'Hylätty',
    pending: 'Odottaa',
    review: 'Tarkistettava',
    toastApproved: 'Lasku hyväksytty',
    toastRejected: 'Lasku hylätty',
    toastReview: 'Lasku merkitty tarkistettavaksi',
    uploadSuccess: 'Lasku tuotu onnistuneesti! Se on nyt analysoitavana.',
    supplierDetails: 'Toimittajan laskuhistoria',
    noFlags: 'Ei huomautettavaa',
    stablePrice: 'Hinta vakaa',
    rising: 'Nouseva',
    falling: 'Laskeva',
    stable: 'Vakaa',
    costByCategory: 'Kulut kategorioittain',
    costBySupplier: 'Kulut toimittajittain',
    monthlyTrend: 'Kuukausittainen kehitys',
    priceChanges: 'Hinnanmuutokset',
    dateFrom: 'Alkaen',
    dateTo: 'Päättyen',
    amountMin: 'Vähintään',
    amountMax: 'Enintään',
    resetFilters: 'Tyhjennä',
    drillDown: 'Poraudu',
    drillInvoices: 'Laskut',
    closeDrill: 'Sulje',
    topSuppliers: 'Suurimmat toimittajat',
    categoryShare: 'Kategorioiden osuudet',
    noRemarks: 'Ei huomautettavaa – voidaan hyväksyä',
    monthlyAvg: 'Kuukausikeskiarvo',
    details: 'Tiedot',
  },
  en: {
    guideLink: 'User Guide \u2192',
    headerTitle: 'Invoice Review – Joensuu',
    uploadInvoice: 'Import invoice',
    uploadTitle: 'Import new invoice',
    uploadSubtitle: 'Select a PDF file or drop it below',
    uploadDropText: 'Drop PDF invoice here or click to select',
    uploadFormat: 'Supported format: PDF',
    tabDashboard: 'Dashboard',
    tabInvoices: 'All invoices',
    tabAnalytics: 'Analytics',
    tabSuppliers: 'Suppliers',
    tabFlagged: 'Flagged',
    totalInvoices: 'Total invoices',
    totalSum: 'Total sum',
    autoApproved: 'Suggested: approve',
    needsReview: 'Needs review',
    flaggedIssues: 'Flagged issues',
    recentActivity: 'Monthly invoices',
    recentFlags: 'Recent flags',
    latestInvoices: 'Latest invoices – awaiting action',
    latestAll: 'Latest invoices',
    showAll: 'Show all',
    search: 'Search invoice or supplier...',
    allStatuses: 'All statuses',
    allSuppliers: 'All suppliers',
    allCategories: 'All categories',
    date: 'Date',
    invoiceNo: 'Invoice #',
    supplier: 'Supplier',
    description: 'Description',
    amount: 'Amount',
    status: 'Status',
    recommendation: 'Recommendation',
    approve: 'Approve',
    reject: 'Reject',
    markReview: 'Mark for review',
    close: 'Close',
    invoiceDetails: 'Invoice details',
    lineItems: 'Line items',
    comparison: 'Comparison to previous',
    analysis: 'Analysis',
    item: 'Item / Service',
    qty: 'Qty',
    unitPrice: 'Unit price',
    total: 'Total',
    prevInvoice: 'Previous invoice',
    thisInvoice: 'This invoice',
    change: 'Change',
    priceUp: 'Unit price increased',
    priceDown: 'Unit price decreased',
    amountUp: 'Invoice total significantly higher',
    amountSimilar: 'Invoice total similar to previous',
    noPrevious: 'No previous invoice for comparison',
    newSupplier: 'New supplier – no history',
    unclear: 'Unclear description or line item',
    missingRef: 'Reference missing',
    duplicateAmount: 'Same amount as previous – possible duplicate',
    ok: 'OK – no remarks',
    invoiceCount: 'Invoices',
    avgAmount: 'Avg. amount',
    trend: 'Trend',
    category: 'Category',
    dueDate: 'Due date',
    paymentTerm: 'Payment term',
    vatPercent: 'VAT %',
    vatAmount: 'VAT',
    netAmount: 'Net amount',
    referenceNo: 'Reference #',
    approved: 'Approved',
    rejected: 'Rejected',
    pending: 'Pending',
    review: 'Review',
    toastApproved: 'Invoice approved',
    toastRejected: 'Invoice rejected',
    toastReview: 'Invoice marked for review',
    uploadSuccess: 'Invoice imported successfully! It is now being analyzed.',
    supplierDetails: 'Supplier invoice history',
    noFlags: 'No remarks',
    stablePrice: 'Price stable',
    rising: 'Rising',
    falling: 'Falling',
    stable: 'Stable',
    costByCategory: 'Costs by category',
    costBySupplier: 'Costs by supplier',
    monthlyTrend: 'Monthly trend',
    priceChanges: 'Price changes',
    dateFrom: 'From',
    dateTo: 'To',
    amountMin: 'Min amount',
    amountMax: 'Max amount',
    resetFilters: 'Reset',
    drillDown: 'Drill down',
    drillInvoices: 'Invoices',
    closeDrill: 'Close',
    topSuppliers: 'Top suppliers',
    categoryShare: 'Category shares',
    noRemarks: 'No remarks – can be approved',
    monthlyAvg: 'Monthly average',
    details: 'Details',
  }
};

let lang = localStorage.getItem('siteTourLang') || 'fi';
const t = key => (T[lang] && T[lang][key]) || T.fi[key] || key;

function applyLang(l) {
  lang = l;
  localStorage.setItem('siteTourLang', l);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (el.tagName === 'INPUT' && el.type !== 'button') {
      el.placeholder = t(k);
    } else {
      el.textContent = t(k);
    }
  });
  $('langFi').classList.toggle('active', l === 'fi');
  $('langEn').classList.toggle('active', l === 'en');
  renderNav();
  renderAll();
}

// ── Suppliers ───────────────────────────────────────────────
const SUPPLIERS = [
  { id: 'joensuun-toimitilat', name: 'Joensuun Toimitilat Oy', category: 'fi:Toimitilavuokra|en:Office Rent', ytunnus: '1234567-8' },
  { id: 'pks-sahko', name: 'Pohjois-Karjalan Sähkö Oy', category: 'fi:Sähkö|en:Electricity', ytunnus: '0584453-4' },
  { id: 'joensuun-vesi', name: 'Joensuun Vesi Oy', category: 'fi:Vesi|en:Water', ytunnus: '0584454-2' },
  { id: 'sol-palvelut', name: 'SOL Palvelut Oy', category: 'fi:Siivous|en:Cleaning', ytunnus: '0825735-1' },
  { id: 'telia', name: 'Telia Finland Oyj', category: 'fi:Tietoliikenne|en:Telecom', ytunnus: '0346041-1' },
  { id: 'elisa', name: 'Elisa Oyj', category: 'fi:Tietoliikenne|en:Telecom', ytunnus: '0116510-6' },
  { id: 'lyreco', name: 'Lyreco Finland Oy', category: 'fi:Toimistotarvikkeet|en:Office Supplies', ytunnus: '0871043-3' },
  { id: 'talenom', name: 'Talenom Oyj', category: 'fi:Kirjanpito|en:Accounting', ytunnus: '0759205-8' },
  { id: 'lahitapiola', name: 'LähiTapiola Keskinäinen', category: 'fi:Vakuutukset|en:Insurance', ytunnus: '0201281-5' },
  { id: 'puhas', name: 'Puhas Oy', category: 'fi:Jätehuolto|en:Waste Management', ytunnus: '0584455-0' },
  { id: 'securitas', name: 'Securitas Oy', category: 'fi:Turvallisuus|en:Security', ytunnus: '0983295-0' },
  { id: 'canon', name: 'Canon Finland Oy', category: 'fi:Tulostuspalvelut|en:Printing', ytunnus: '0112468-3' },
  { id: 'isku', name: 'Isku Interior Oy', category: 'fi:Kalusteet|en:Furniture', ytunnus: '0186300-3' },
  { id: 'paulig', name: 'Paulig Oy', category: 'fi:Kahvi ja tarvikkeet|en:Coffee & Supplies', ytunnus: '0112456-0' },
  { id: 'posti', name: 'Posti Group Oyj', category: 'fi:Postitus|en:Postal Services', ytunnus: '0109357-9' },
];

function getCategory(supplier) {
  const parts = supplier.category.split('|');
  const match = parts.find(p => p.startsWith(lang + ':'));
  return match ? match.split(':')[1] : parts[0].split(':')[1];
}

// Category colors for analytics
const CATEGORY_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
  '#14b8a6', '#e11d48', '#a855f7', '#eab308', '#0ea5e9'
];

function getCategoryColor(catName) {
  const cats = [...new Set(SUPPLIERS.map(s => getCategory(s)))];
  const idx = cats.indexOf(catName);
  return CATEGORY_COLORS[idx >= 0 ? idx % CATEGORY_COLORS.length : 0];
}

function getSupplierColor(supplierId) {
  const idx = SUPPLIERS.findIndex(s => s.id === supplierId);
  return CATEGORY_COLORS[idx >= 0 ? idx % CATEGORY_COLORS.length : 0];
}

// ── Generate 50 realistic invoices ──────────────────────────
function generateInvoices() {
  const invoices = [];
  let idCounter = 1;

  const rnd = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);
  const rndInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

  const templates = {
    'joensuun-toimitilat': {
      baseAmount: 3200, variance: 0, vat: 24,
      lines: () => [
        { desc: { fi: 'Toimitilavuokra, Siltakatu 10', en: 'Office rent, Siltakatu 10' }, qty: 1, unit: rnd(3200, 3200) }
      ],
      paymentTerm: 14
    },
    'pks-sahko': {
      baseAmount: 420, variance: 80, vat: 24,
      lines: () => {
        const kwh = rndInt(1800, 3200);
        const price = rnd(0.12, 0.16);
        const transfer = rnd(85, 110);
        return [
          { desc: { fi: `Sähkönkulutus ${kwh} kWh`, en: `Electricity ${kwh} kWh` }, qty: kwh, unit: price },
          { desc: { fi: 'Siirtomaksu', en: 'Transfer fee' }, qty: 1, unit: transfer }
        ];
      },
      paymentTerm: 21
    },
    'joensuun-vesi': {
      baseAmount: 95, variance: 25, vat: 24,
      lines: () => {
        const m3 = rndInt(8, 18);
        return [
          { desc: { fi: `Vesi ${m3} m³`, en: `Water ${m3} m³` }, qty: m3, unit: rnd(4.50, 5.20) },
          { desc: { fi: 'Perusmaksu', en: 'Base fee' }, qty: 1, unit: 18.50 }
        ];
      },
      paymentTerm: 21
    },
    'sol-palvelut': {
      baseAmount: 680, variance: 40, vat: 24,
      lines: () => [
        { desc: { fi: 'Toimistosiivous, viikottainen', en: 'Office cleaning, weekly' }, qty: 4, unit: rnd(145, 165) },
        { desc: { fi: 'Ikkunanpesu', en: 'Window cleaning' }, qty: rndInt(0, 1), unit: 120 }
      ],
      paymentTerm: 14
    },
    'telia': {
      baseAmount: 289, variance: 30, vat: 24,
      lines: () => [
        { desc: { fi: 'Internet-yhteys 200M', en: 'Internet connection 200M' }, qty: 1, unit: 89.90 },
        { desc: { fi: 'Puhelinliittymät', en: 'Phone subscriptions' }, qty: rndInt(6, 8), unit: rnd(24.90, 29.90) }
      ],
      paymentTerm: 14
    },
    'elisa': {
      baseAmount: 156, variance: 20, vat: 24,
      lines: () => [
        { desc: { fi: 'Mobiililiittymät', en: 'Mobile subscriptions' }, qty: rndInt(4, 6), unit: rnd(29.90, 34.90) }
      ],
      paymentTerm: 14
    },
    'lyreco': {
      baseAmount: 180, variance: 100, vat: 24,
      lines: () => {
        const items = [
          { fi: 'Kopiopaperi A4, 5 riisiä', en: 'Copy paper A4, 5 reams', price: rnd(22, 28) },
          { fi: 'Muistilaput Post-it', en: 'Post-it notes', price: rnd(8, 12) },
          { fi: 'Kynät, 10 kpl', en: 'Pens, 10 pcs', price: rnd(6, 9) },
          { fi: 'Mappeja, 10 kpl', en: 'Binders, 10 pcs', price: rnd(15, 22) },
          { fi: 'Tulostusmuste HP', en: 'HP printer ink', price: rnd(45, 65) },
          { fi: 'Niitit ja liittimet', en: 'Staples and clips', price: rnd(5, 8) },
          { fi: 'Kirjekuoret C4, 100 kpl', en: 'Envelopes C4, 100 pcs', price: rnd(12, 18) },
        ];
        const selected = items.sort(() => Math.random() - 0.5).slice(0, rndInt(2, 5));
        return selected.map(it => ({
          desc: { fi: it.fi, en: it.en }, qty: rndInt(1, 3), unit: it.price
        }));
      },
      paymentTerm: 30
    },
    'talenom': {
      baseAmount: 890, variance: 50, vat: 24,
      lines: () => [
        { desc: { fi: 'Kirjanpitopalvelu, kuukausi', en: 'Accounting service, monthly' }, qty: 1, unit: rnd(650, 700) },
        { desc: { fi: 'Palkanlaskenta', en: 'Payroll processing' }, qty: rndInt(8, 12), unit: rnd(15, 20) }
      ],
      paymentTerm: 14
    },
    'lahitapiola': {
      baseAmount: 520, variance: 0, vat: 0,
      lines: () => [
        { desc: { fi: 'Toimiston vakuutus, kuukausierä', en: 'Office insurance, monthly installment' }, qty: 1, unit: rnd(320, 330) },
        { desc: { fi: 'Vastuuvakuutus', en: 'Liability insurance' }, qty: 1, unit: rnd(185, 195) }
      ],
      paymentTerm: 14
    },
    'puhas': {
      baseAmount: 145, variance: 30, vat: 24,
      lines: () => [
        { desc: { fi: 'Jätteenkuljetus', en: 'Waste collection' }, qty: rndInt(2, 4), unit: rnd(28, 38) },
        { desc: { fi: 'Kierrätyspalvelu', en: 'Recycling service' }, qty: 1, unit: rnd(25, 35) }
      ],
      paymentTerm: 21
    },
    'securitas': {
      baseAmount: 345, variance: 15, vat: 24,
      lines: () => [
        { desc: { fi: 'Hälytysjärjestelmä, kuukausimaksu', en: 'Alarm system, monthly fee' }, qty: 1, unit: rnd(185, 195) },
        { desc: { fi: 'Kulunvalvonta', en: 'Access control' }, qty: 1, unit: rnd(145, 155) }
      ],
      paymentTerm: 14
    },
    'canon': {
      baseAmount: 210, variance: 60, vat: 24,
      lines: () => {
        const pages = rndInt(2000, 6000);
        return [
          { desc: { fi: 'Monitoimilaitteen vuokra', en: 'Multifunction device lease' }, qty: 1, unit: 125 },
          { desc: { fi: `Tulosteet ${pages} kpl`, en: `Prints ${pages} pcs` }, qty: pages, unit: rnd(0.02, 0.04) }
        ];
      },
      paymentTerm: 30
    },
    'isku': {
      baseAmount: 450, variance: 300, vat: 24,
      lines: () => {
        const items = [
          { fi: 'Työtuoli ergonominen', en: 'Ergonomic office chair', price: rnd(380, 520) },
          { fi: 'Sähköpöytä', en: 'Standing desk', price: rnd(450, 680) },
          { fi: 'Näytönkiinnike', en: 'Monitor arm', price: rnd(85, 120) },
          { fi: 'Säilytyskaappi', en: 'Storage cabinet', price: rnd(220, 340) },
          { fi: 'Neuvottelupöydän tuolit 4 kpl', en: 'Meeting room chairs 4 pcs', price: rnd(480, 640) },
        ];
        const selected = items.sort(() => Math.random() - 0.5).slice(0, rndInt(1, 2));
        return selected.map(it => ({
          desc: { fi: it.fi, en: it.en }, qty: rndInt(1, 2), unit: it.price
        }));
      },
      paymentTerm: 30
    },
    'paulig': {
      baseAmount: 120, variance: 40, vat: 14,
      lines: () => [
        { desc: { fi: 'Juhla Mokka kahvi 500g', en: 'Juhla Mokka coffee 500g' }, qty: rndInt(4, 8), unit: rnd(6.50, 8.50) },
        { desc: { fi: 'Tee, lajitelma', en: 'Tea, assortment' }, qty: rndInt(2, 4), unit: rnd(4.20, 5.80) },
        { desc: { fi: 'Kahvimaito', en: 'Coffee milk' }, qty: rndInt(6, 12), unit: rnd(1.60, 2.10) },
        { desc: { fi: 'Sokeripikareita', en: 'Sugar cups' }, qty: rndInt(1, 2), unit: rnd(3.50, 4.50) }
      ],
      paymentTerm: 14
    },
    'posti': {
      baseAmount: 85, variance: 50, vat: 24,
      lines: () => [
        { desc: { fi: 'Postitus, kirjeet', en: 'Postal, letters' }, qty: rndInt(15, 40), unit: rnd(1.20, 2.80) },
        { desc: { fi: 'Paketteja', en: 'Packages' }, qty: rndInt(1, 5), unit: rnd(6.90, 12.50) }
      ],
      paymentTerm: 14
    }
  };

  const months = [
    '2025-10', '2025-11', '2025-12',
    '2026-01', '2026-02', '2026-03', '2026-04'
  ];

  const monthlySuppliers = [
    'joensuun-toimitilat', 'pks-sahko', 'sol-palvelut', 'telia',
    'talenom', 'lahitapiola', 'securitas', 'canon'
  ];

  const biMonthlySuppliers = ['joensuun-vesi', 'puhas', 'elisa'];
  const occasionalSuppliers = ['lyreco', 'isku', 'paulig', 'posti'];

  const prevAmounts = {};
  const prevLines = {};

  months.forEach((month, mi) => {
    const [y, m] = month.split('-').map(Number);
    const dayInMonth = new Date(y, m, 0).getDate();

    monthlySuppliers.forEach(sid => {
      const tmpl = templates[sid];
      const sup = SUPPLIERS.find(s => s.id === sid);
      const day = rndInt(1, Math.min(15, dayInMonth));
      const dateStr = `${month}-${String(day).padStart(2, '0')}`;
      let lines = tmpl.lines().filter(l => l.qty > 0);

      if (prevLines[sid] && Math.random() < 0.15) {
        lines = lines.map(l => ({ ...l, unit: +(l.unit * rnd(1.05, 1.15)).toFixed(2) }));
      }

      const netTotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
      const vatAmount = +(netTotal * tmpl.vat / 100).toFixed(2);
      const grossTotal = +(netTotal + vatAmount).toFixed(2);
      const dueDate = new Date(y, m - 1, day + tmpl.paymentTerm);
      const dueDateStr = dueDate.toISOString().slice(0, 10);
      const ref = `${1000000 + idCounter * 7}${rndInt(10, 99)}`;

      invoices.push({
        id: idCounter++,
        invoiceNo: `${sup.name.slice(0, 3).toUpperCase()}-${y}${String(m).padStart(2,'0')}-${String(idCounter).padStart(3, '0')}`,
        supplierId: sid, date: dateStr, dueDate: dueDateStr, paymentTerm: tmpl.paymentTerm,
        lines, netTotal: +netTotal.toFixed(2), vatPercent: tmpl.vat, vatAmount, grossTotal,
        referenceNo: ref, status: 'pending',
        prevGrossTotal: prevAmounts[sid] || null, prevLines: prevLines[sid] || null
      });

      prevAmounts[sid] = grossTotal;
      prevLines[sid] = lines.map(l => ({ ...l }));
    });

    if (mi % 2 === 0) {
      biMonthlySuppliers.forEach(sid => {
        const tmpl = templates[sid];
        const sup = SUPPLIERS.find(s => s.id === sid);
        const day = rndInt(5, 20);
        const dateStr = `${month}-${String(day).padStart(2, '0')}`;
        let lines = tmpl.lines().filter(l => l.qty > 0);

        const netTotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
        const vatAmount = +(netTotal * tmpl.vat / 100).toFixed(2);
        const grossTotal = +(netTotal + vatAmount).toFixed(2);
        const dueDate = new Date(y, m - 1, day + tmpl.paymentTerm);
        const dueDateStr = dueDate.toISOString().slice(0, 10);
        const ref = `${2000000 + idCounter * 3}${rndInt(10, 99)}`;

        invoices.push({
          id: idCounter++,
          invoiceNo: `${sup.name.slice(0, 3).toUpperCase()}-${y}${String(m).padStart(2,'0')}-${String(idCounter).padStart(3, '0')}`,
          supplierId: sid, date: dateStr, dueDate: dueDateStr, paymentTerm: tmpl.paymentTerm,
          lines, netTotal: +netTotal.toFixed(2), vatPercent: tmpl.vat, vatAmount, grossTotal,
          referenceNo: ref, status: 'pending',
          prevGrossTotal: prevAmounts[sid] || null, prevLines: prevLines[sid] || null
        });

        prevAmounts[sid] = grossTotal;
        prevLines[sid] = lines.map(l => ({ ...l }));
      });
    }

    occasionalSuppliers.forEach(sid => {
      if (Math.random() < 0.45) {
        const tmpl = templates[sid];
        const sup = SUPPLIERS.find(s => s.id === sid);
        const day = rndInt(1, dayInMonth);
        const dateStr = `${month}-${String(day).padStart(2, '0')}`;
        let lines = tmpl.lines().filter(l => l.qty > 0);

        const netTotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
        const vatAmount = +(netTotal * tmpl.vat / 100).toFixed(2);
        const grossTotal = +(netTotal + vatAmount).toFixed(2);
        const dueDate = new Date(y, m - 1, day + tmpl.paymentTerm);
        const dueDateStr = dueDate.toISOString().slice(0, 10);
        const ref = `${3000000 + idCounter * 11}${rndInt(10, 99)}`;

        let anomalyRef = ref;
        if (sid === 'lyreco' && Math.random() < 0.3) anomalyRef = '';
        if (sid === 'isku' && Math.random() < 0.25) {
          lines.push({ desc: { fi: 'Muu', en: 'Other' }, qty: 1, unit: rnd(50, 150) });
        }

        invoices.push({
          id: idCounter++,
          invoiceNo: `${sup.name.slice(0, 3).toUpperCase()}-${y}${String(m).padStart(2,'0')}-${String(idCounter).padStart(3, '0')}`,
          supplierId: sid, date: dateStr, dueDate: dueDateStr, paymentTerm: tmpl.paymentTerm,
          lines, netTotal: +netTotal.toFixed(2), vatPercent: tmpl.vat, vatAmount, grossTotal,
          referenceNo: anomalyRef, status: 'pending',
          prevGrossTotal: prevAmounts[sid] || null, prevLines: prevLines[sid] || null
        });

        prevAmounts[sid] = grossTotal;
        prevLines[sid] = lines.map(l => ({ ...l }));
      }
    });
  });

  return invoices;
}

let invoices = generateInvoices();
invoices.sort((a, b) => b.date.localeCompare(a.date));

function loadStatuses() {
  try {
    const saved = JSON.parse(localStorage.getItem('joensuu_invoice_statuses') || '{}');
    invoices.forEach(inv => { if (saved[inv.id]) inv.status = saved[inv.id]; });
  } catch(e) {}
}

function saveStatuses() {
  const map = {};
  invoices.forEach(inv => { if (inv.status !== 'pending') map[inv.id] = inv.status; });
  localStorage.setItem('joensuu_invoice_statuses', JSON.stringify(map));
}

// ── Analysis engine ─────────────────────────────────────────
function analyzeInvoice(inv) {
  const flags = [];

  if (inv.prevGrossTotal !== null) {
    const diff = inv.grossTotal - inv.prevGrossTotal;
    const pct = (diff / inv.prevGrossTotal) * 100;
    if (pct > 15) flags.push({ type: 'warning', key: 'amountUp', detail: `+${pct.toFixed(1)}% (${formatEur(diff)})` });
    else if (pct < -15) flags.push({ type: 'info', key: 'amountSimilar', detail: `${pct.toFixed(1)}% (${formatEur(diff)})` });
  } else {
    const sameSupplier = invoices.filter(i => i.supplierId === inv.supplierId && i.date < inv.date);
    if (sameSupplier.length === 0) flags.push({ type: 'info', key: 'newSupplier' });
  }

  if (inv.prevLines) {
    inv.lines.forEach(line => {
      const prev = inv.prevLines.find(pl => {
        const prevDesc = pl.desc.fi || pl.desc;
        const curDesc = line.desc.fi || line.desc;
        return prevDesc.replace(/\d+/g, '').trim() === curDesc.replace(/\d+/g, '').trim();
      });
      if (prev) {
        const priceDiff = ((line.unit - prev.unit) / prev.unit) * 100;
        if (priceDiff > 5) flags.push({ type: 'warning', key: 'priceUp', detail: `${line.desc[lang] || line.desc.fi}: +${priceDiff.toFixed(1)}%` });
        else if (priceDiff < -5) flags.push({ type: 'info', key: 'priceDown', detail: `${line.desc[lang] || line.desc.fi}: ${priceDiff.toFixed(1)}%` });
      }
    });
  }

  if (inv.prevGrossTotal !== null && Math.abs(inv.grossTotal - inv.prevGrossTotal) < 0.01) {
    flags.push({ type: 'danger', key: 'duplicateAmount' });
  }

  if (!inv.referenceNo || inv.referenceNo.trim() === '') {
    flags.push({ type: 'warning', key: 'missingRef' });
  }

  const unclearDescs = ['muu', 'other', 'lisä', 'extra', 'misc'];
  inv.lines.forEach(line => {
    const desc = (line.desc.fi || '').toLowerCase();
    if (unclearDescs.some(u => desc === u || desc.startsWith(u + ' '))) {
      flags.push({ type: 'warning', key: 'unclear', detail: line.desc[lang] || line.desc.fi });
    }
  });

  let recommendation = 'approve';
  if (flags.some(f => f.type === 'danger')) recommendation = 'reject';
  else if (flags.some(f => f.type === 'warning')) recommendation = 'review';

  return { flags, recommendation };
}

// ── Formatting helpers ──────────────────────────────────────
function formatEur(amount) {
  return new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(amount);
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return lang === 'fi' ? `${d}.${m}.${y}` : `${y}-${m}-${d}`;
}

// ── Navigation ──────────────────────────────────────────────
let currentView = 'dashboard';

function renderNav() {
  const flaggedCount = invoices.filter(inv => {
    const a = analyzeInvoice(inv);
    return a.recommendation !== 'approve' && inv.status === 'pending';
  }).length;

  $('navBar').innerHTML = `
    <div class="nav-tab ${currentView === 'dashboard' ? 'active' : ''}" onclick="switchView('dashboard')">
      <span>${t('tabDashboard')}</span>
    </div>
    <div class="nav-tab ${currentView === 'invoices' ? 'active' : ''}" onclick="switchView('invoices')">
      <span>${t('tabInvoices')}</span>
      <span class="nav-badge">${invoices.length}</span>
    </div>
    <div class="nav-tab ${currentView === 'analytics' ? 'active' : ''}" onclick="switchView('analytics')">
      <span>${t('tabAnalytics')}</span>
    </div>
    <div class="nav-tab ${currentView === 'suppliers' ? 'active' : ''}" onclick="switchView('suppliers')">
      <span>${t('tabSuppliers')}</span>
      <span class="nav-badge">${SUPPLIERS.length}</span>
    </div>
    <div class="nav-tab ${currentView === 'flagged' ? 'active' : ''}" onclick="switchView('flagged')">
      <span>${t('tabFlagged')}</span>
      ${flaggedCount > 0 ? `<span class="nav-badge badge-warning">${flaggedCount}</span>` : '<span class="nav-badge">0</span>'}
    </div>
  `;
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $(view).classList.add('active');
  renderNav();
  renderAll();
}

// ── Dashboard ───────────────────────────────────────────────
function renderDashboard() {
  const total = invoices.length;
  const totalSum = invoices.reduce((s, i) => s + i.grossTotal, 0);
  const approved = invoices.filter(i => i.status === 'approved').length;
  const pending = invoices.filter(i => i.status === 'pending').length;
  const analyses = invoices.map(inv => ({ inv, ...analyzeInvoice(inv) }));
  const autoApprove = analyses.filter(a => a.recommendation === 'approve' && a.inv.status === 'pending').length;
  const needsReview = analyses.filter(a => a.recommendation === 'review' && a.inv.status === 'pending').length;
  const flagged = analyses.filter(a => a.recommendation === 'reject' && a.inv.status === 'pending').length;

  // Latest pending invoices for the action cards
  const latestPending = analyses
    .filter(a => a.inv.status === 'pending')
    .sort((a, b) => b.inv.date.localeCompare(a.inv.date))
    .slice(0, 10);

  // Monthly data for chart
  const monthlyData = {};
  invoices.forEach(inv => {
    const month = inv.date.slice(0, 7);
    if (!monthlyData[month]) monthlyData[month] = { count: 0, sum: 0 };
    monthlyData[month].count++;
    monthlyData[month].sum += inv.grossTotal;
  });
  const sortedMonths = Object.keys(monthlyData).sort();
  const maxSum = Math.max(...sortedMonths.map(m => monthlyData[m].sum));

  $('dashboard').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">${t('totalInvoices')}</div>
        <div class="stat-value info">${total}</div>
        <div class="stat-sub">${pending} ${t('pending').toLowerCase()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${t('totalSum')}</div>
        <div class="stat-value">${formatEur(totalSum)}</div>
        <div class="stat-sub">${t('vatAmount')}: ${formatEur(invoices.reduce((s, i) => s + i.vatAmount, 0))}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${t('autoApproved')}</div>
        <div class="stat-value success">${autoApprove}</div>
        <div class="stat-sub">${approved} ${t('approved').toLowerCase()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${t('needsReview')}</div>
        <div class="stat-value warning">${needsReview}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${t('flaggedIssues')}</div>
        <div class="stat-value danger">${flagged}</div>
      </div>
    </div>

    <div class="section-title" style="justify-content:space-between">
      <span>${t('latestInvoices')}</span>
      <span style="font-size:0.75rem;font-weight:500;color:var(--primary);cursor:pointer" onclick="switchView('invoices')">${t('showAll')} &rarr;</span>
    </div>
    <div class="latest-invoices-grid">
      ${latestPending.map(a => {
        const inv = a.inv;
        const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
        const recClass = a.recommendation === 'approve' ? 'rec-approve' : a.recommendation === 'review' ? 'rec-review' : 'rec-reject';
        const recIcon = a.recommendation === 'approve' ? '&#x2705;' : a.recommendation === 'review' ? '&#x26A0;' : '&#x26D4;';
        const flagText = a.flags.filter(f => f.type === 'warning' || f.type === 'danger').map(f => t(f.key)).join(', ');
        const flagClass = a.flags.some(f => f.type === 'danger') ? 'danger' : '';

        let changeHtml = '';
        if (inv.prevGrossTotal !== null) {
          const pct = ((inv.grossTotal - inv.prevGrossTotal) / inv.prevGrossTotal) * 100;
          if (Math.abs(pct) > 1) {
            const cls = pct > 0 ? 'change-up' : 'change-down';
            const arrow = pct > 0 ? '&#x25B2;' : '&#x25BC;';
            changeHtml = `<span class="change-indicator ${cls}">${arrow}${Math.abs(pct).toFixed(0)}%</span>`;
          }
        }

        return `
          <div class="action-card" onclick="openInvoiceModal(${inv.id})">
            <div class="action-card-left ${recClass}">${recIcon}</div>
            <div class="action-card-body">
              <div class="action-card-title">
                ${sup.name}
                <span class="supplier-tag">${getCategory(sup)}</span>
              </div>
              <div class="action-card-meta">
                <span>${formatDate(inv.date)}</span>
                <span>${inv.invoiceNo}</span>
                <span>${t('dueDate')}: ${formatDate(inv.dueDate)}</span>
              </div>
              ${flagText ? `<div class="action-card-flags ${flagClass}">${flagText}</div>` : `<div class="action-card-flags" style="color:var(--success)">${t('noRemarks')}</div>`}
            </div>
            <div class="action-card-amount">${formatEur(inv.grossTotal)}${changeHtml}</div>
            <div class="action-card-btns" onclick="event.stopPropagation()">
              ${a.recommendation === 'approve' ? `
                <button class="btn btn-approve" onclick="setStatus(${inv.id},'approved')">${t('approve')}</button>
              ` : a.recommendation === 'review' ? `
                <button class="btn btn-review" onclick="setStatus(${inv.id},'review')">${t('markReview')}</button>
                <button class="btn" onclick="openInvoiceModal(${inv.id})">${t('details')}</button>
              ` : `
                <button class="btn btn-reject" onclick="setStatus(${inv.id},'rejected')">${t('reject')}</button>
                <button class="btn" onclick="openInvoiceModal(${inv.id})">${t('details')}</button>
              `}
            </div>
          </div>`;
      }).join('')}
    </div>

    <div class="chart-container">
      <div class="section-title">${t('recentActivity')}</div>
      <div class="bar-chart">
        ${sortedMonths.map(month => {
          const d = monthlyData[month];
          const h = Math.max(8, (d.sum / maxSum) * 140);
          const label = month.slice(5);
          return `
            <div class="bar-group">
              <div class="bar-value">${formatEur(d.sum)}</div>
              <div class="bar" style="height:${h}px;background:linear-gradient(180deg,var(--primary),var(--primary-dark))" title="${d.count} ${t('totalInvoices').toLowerCase()}"></div>
              <div class="bar-label">${label}/${month.slice(2,4)}</div>
            </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ── Invoice list ────────────────────────────────────────────
let searchQuery = '';
let statusFilter = '';
let supplierFilter = '';

function renderInvoiceList(targetId, filterFn) {
  const target = targetId || 'invoices';
  const filtered = invoices.filter(inv => {
    if (filterFn && !filterFn(inv)) return false;
    const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = sup.name.toLowerCase().includes(q) ||
        inv.invoiceNo.toLowerCase().includes(q) ||
        inv.lines.some(l => (l.desc.fi || '').toLowerCase().includes(q) || (l.desc.en || '').toLowerCase().includes(q));
      if (!match) return false;
    }
    if (statusFilter && inv.status !== statusFilter) return false;
    if (supplierFilter && inv.supplierId !== supplierFilter) return false;
    return true;
  });

  const supplierOptions = [...new Set(invoices.map(i => i.supplierId))].map(sid => {
    const s = SUPPLIERS.find(ss => ss.id === sid);
    return `<option value="${sid}" ${supplierFilter === sid ? 'selected' : ''}>${s.name}</option>`;
  }).join('');

  $(target).innerHTML = `
    <div class="filter-bar">
      <input class="search-input" type="text" placeholder="${t('search')}" value="${searchQuery}" oninput="searchQuery=this.value;renderAll()">
      <select class="filter-select" onchange="statusFilter=this.value;renderAll()">
        <option value="">${t('allStatuses')}</option>
        <option value="pending" ${statusFilter === 'pending' ? 'selected' : ''}>${t('pending')}</option>
        <option value="approved" ${statusFilter === 'approved' ? 'selected' : ''}>${t('approved')}</option>
        <option value="rejected" ${statusFilter === 'rejected' ? 'selected' : ''}>${t('rejected')}</option>
        <option value="review" ${statusFilter === 'review' ? 'selected' : ''}>${t('review')}</option>
      </select>
      <select class="filter-select" onchange="supplierFilter=this.value;renderAll()">
        <option value="">${t('allSuppliers')}</option>
        ${supplierOptions}
      </select>
    </div>
    <table class="invoice-table">
      <thead>
        <tr>
          <th>${t('date')}</th>
          <th>${t('invoiceNo')}</th>
          <th>${t('supplier')}</th>
          <th class="hide-mobile">${t('description')}</th>
          <th style="text-align:right">${t('amount')}</th>
          <th>${t('status')}</th>
          <th>${t('recommendation')}</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(inv => {
          const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
          const analysis = analyzeInvoice(inv);
          const desc = inv.lines.slice(0, 2).map(l => l.desc[lang] || l.desc.fi).join(', ');
          const descShort = desc.length > 40 ? desc.slice(0, 40) + '...' : desc;

          let changeHtml = '';
          if (inv.prevGrossTotal !== null) {
            const diff = inv.grossTotal - inv.prevGrossTotal;
            const pct = (diff / inv.prevGrossTotal) * 100;
            if (Math.abs(pct) > 1) {
              const cls = pct > 0 ? 'change-up' : 'change-down';
              const arrow = pct > 0 ? '&#x25B2;' : '&#x25BC;';
              changeHtml = `<span class="change-indicator ${cls}">${arrow}${Math.abs(pct).toFixed(0)}%</span>`;
            } else {
              changeHtml = '<span class="change-indicator change-same">&#x25CF;</span>';
            }
          }

          let statusBadge = '';
          if (inv.status === 'approved') statusBadge = `<span class="status-badge status-ok">&#x2713; ${t('approved')}</span>`;
          else if (inv.status === 'rejected') statusBadge = `<span class="status-badge status-danger">&#x2717; ${t('rejected')}</span>`;
          else if (inv.status === 'review') statusBadge = `<span class="status-badge status-warning">&#x1F50D; ${t('review')}</span>`;
          else statusBadge = `<span class="status-badge status-pending">&#x23F3; ${t('pending')}</span>`;

          let recBadge = '';
          if (analysis.recommendation === 'approve') recBadge = `<span class="status-badge status-ok">${t('approve')}</span>`;
          else if (analysis.recommendation === 'review') recBadge = `<span class="status-badge status-warning">${t('markReview')}</span>`;
          else recBadge = `<span class="status-badge status-danger">${t('reject')}</span>`;

          return `
            <tr onclick="openInvoiceModal(${inv.id})">
              <td>${formatDate(inv.date)}</td>
              <td style="font-weight:600;font-size:0.75rem">${inv.invoiceNo}</td>
              <td>${sup.name}</td>
              <td class="hide-mobile" style="color:var(--text-secondary)">${descShort}</td>
              <td class="amount-cell">${formatEur(inv.grossTotal)}${changeHtml}</td>
              <td>${statusBadge}</td>
              <td>${recBadge}</td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>
    ${filtered.length === 0 ? '<p style="text-align:center;color:var(--text-light);padding:40px 0">&#x1F50D; ' + t('search') + '</p>' : ''}
  `;
}

// ── Analytics ───────────────────────────────────────────────
let analyticsDateFrom = '';
let analyticsDateTo = '';
let analyticsAmountMin = '';
let analyticsAmountMax = '';
let analyticsCategoryFilter = '';
let analyticsSupplierFilter = '';
let analyticsDrill = null; // { type: 'category'|'supplier', value: string }

function getFilteredForAnalytics() {
  return invoices.filter(inv => {
    if (analyticsDateFrom && inv.date < analyticsDateFrom) return false;
    if (analyticsDateTo && inv.date > analyticsDateTo) return false;
    if (analyticsAmountMin && inv.grossTotal < parseFloat(analyticsAmountMin)) return false;
    if (analyticsAmountMax && inv.grossTotal > parseFloat(analyticsAmountMax)) return false;
    if (analyticsCategoryFilter) {
      const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
      if (getCategory(sup) !== analyticsCategoryFilter) return false;
    }
    if (analyticsSupplierFilter && inv.supplierId !== analyticsSupplierFilter) return false;
    return true;
  });
}

function renderAnalytics() {
  const filtered = getFilteredForAnalytics();
  const totalFiltered = filtered.reduce((s, i) => s + i.grossTotal, 0);

  // Category data
  const catData = {};
  filtered.forEach(inv => {
    const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
    const cat = getCategory(sup);
    if (!catData[cat]) catData[cat] = { sum: 0, count: 0, invoices: [] };
    catData[cat].sum += inv.grossTotal;
    catData[cat].count++;
    catData[cat].invoices.push(inv);
  });
  const catSorted = Object.entries(catData).sort((a, b) => b[1].sum - a[1].sum);
  const catMax = catSorted.length > 0 ? catSorted[0][1].sum : 1;

  // Supplier data
  const supData = {};
  filtered.forEach(inv => {
    if (!supData[inv.supplierId]) supData[inv.supplierId] = { sum: 0, count: 0, invoices: [] };
    supData[inv.supplierId].sum += inv.grossTotal;
    supData[inv.supplierId].count++;
    supData[inv.supplierId].invoices.push(inv);
  });
  const supSorted = Object.entries(supData).sort((a, b) => b[1].sum - a[1].sum).slice(0, 10);
  const supMax = supSorted.length > 0 ? supSorted[0][1].sum : 1;

  // Monthly stacked data by category
  const monthCatData = {};
  const allCats = catSorted.map(c => c[0]);
  filtered.forEach(inv => {
    const month = inv.date.slice(0, 7);
    const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
    const cat = getCategory(sup);
    if (!monthCatData[month]) monthCatData[month] = {};
    if (!monthCatData[month][cat]) monthCatData[month][cat] = 0;
    monthCatData[month][cat] += inv.grossTotal;
  });
  const allMonths = Object.keys(monthCatData).sort();
  const maxMonthTotal = Math.max(...allMonths.map(m => Object.values(monthCatData[m]).reduce((s, v) => s + v, 0)), 1);

  // Price changes tracking
  const priceChanges = [];
  filtered.forEach(inv => {
    if (!inv.prevLines) return;
    inv.lines.forEach(line => {
      const prev = inv.prevLines.find(pl => {
        const prevDesc = pl.desc.fi || pl.desc;
        const curDesc = line.desc.fi || line.desc;
        return prevDesc.replace(/\d+/g, '').trim() === curDesc.replace(/\d+/g, '').trim();
      });
      if (prev) {
        const pct = ((line.unit - prev.unit) / prev.unit) * 100;
        if (Math.abs(pct) > 3) {
          const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
          priceChanges.push({
            date: inv.date,
            supplier: sup.name,
            item: line.desc[lang] || line.desc.fi,
            prevPrice: prev.unit,
            newPrice: line.unit,
            pct,
            invId: inv.id
          });
        }
      }
    });
  });
  priceChanges.sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct));

  // All categories for filter
  const allCategoryNames = [...new Set(SUPPLIERS.map(s => getCategory(s)))];

  // Drill-down HTML
  let drillHtml = '';
  if (analyticsDrill) {
    let drillInvoices = [];
    let drillTitle = '';
    if (analyticsDrill.type === 'category') {
      drillTitle = analyticsDrill.value;
      drillInvoices = filtered.filter(inv => {
        const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
        return getCategory(sup) === analyticsDrill.value;
      });
    } else if (analyticsDrill.type === 'supplier') {
      const sup = SUPPLIERS.find(s => s.id === analyticsDrill.value);
      drillTitle = sup ? sup.name : analyticsDrill.value;
      drillInvoices = filtered.filter(inv => inv.supplierId === analyticsDrill.value);
    }
    drillInvoices.sort((a, b) => b.date.localeCompare(a.date));

    drillHtml = `
      <div class="drill-section visible">
        <div class="drill-header">
          <div class="section-title">${t('drillInvoices')}: ${drillTitle} (${drillInvoices.length})</div>
          <button class="drill-close" onclick="analyticsDrill=null;renderAnalytics()">&times; ${t('closeDrill')}</button>
        </div>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>${t('date')}</th>
              <th>${t('invoiceNo')}</th>
              <th>${t('supplier')}</th>
              <th style="text-align:right">${t('amount')}</th>
              <th>${t('status')}</th>
              <th>${t('recommendation')}</th>
            </tr>
          </thead>
          <tbody>
            ${drillInvoices.map(inv => {
              const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
              const analysis = analyzeInvoice(inv);
              let statusBadge = inv.status === 'approved' ? `<span class="status-badge status-ok">&#x2713;</span>` :
                inv.status === 'rejected' ? `<span class="status-badge status-danger">&#x2717;</span>` :
                inv.status === 'review' ? `<span class="status-badge status-warning">&#x1F50D;</span>` :
                `<span class="status-badge status-pending">&#x23F3;</span>`;
              let recBadge = analysis.recommendation === 'approve' ? `<span class="status-badge status-ok">${t('approve')}</span>` :
                analysis.recommendation === 'review' ? `<span class="status-badge status-warning">${t('markReview')}</span>` :
                `<span class="status-badge status-danger">${t('reject')}</span>`;
              return `
                <tr onclick="openInvoiceModal(${inv.id})" style="cursor:pointer">
                  <td>${formatDate(inv.date)}</td>
                  <td style="font-weight:600;font-size:0.75rem">${inv.invoiceNo}</td>
                  <td>${sup.name}</td>
                  <td class="amount-cell">${formatEur(inv.grossTotal)}</td>
                  <td>${statusBadge}</td>
                  <td>${recBadge}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  $('analytics').innerHTML = `
    <div class="analytics-filters">
      <label>${t('dateFrom')}</label>
      <input type="date" value="${analyticsDateFrom}" onchange="analyticsDateFrom=this.value;analyticsDrill=null;renderAnalytics()">
      <label>${t('dateTo')}</label>
      <input type="date" value="${analyticsDateTo}" onchange="analyticsDateTo=this.value;analyticsDrill=null;renderAnalytics()">
      <label>${t('amountMin')}</label>
      <input type="number" placeholder="0" value="${analyticsAmountMin}" onchange="analyticsAmountMin=this.value;analyticsDrill=null;renderAnalytics()" style="width:100px">
      <label>${t('amountMax')}</label>
      <input type="number" placeholder="--" value="${analyticsAmountMax}" onchange="analyticsAmountMax=this.value;analyticsDrill=null;renderAnalytics()" style="width:100px">
      <select class="filter-select" onchange="analyticsCategoryFilter=this.value;analyticsDrill=null;renderAnalytics()">
        <option value="">${t('allCategories')}</option>
        ${allCategoryNames.map(c => `<option value="${c}" ${analyticsCategoryFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      <select class="filter-select" onchange="analyticsSupplierFilter=this.value;analyticsDrill=null;renderAnalytics()">
        <option value="">${t('allSuppliers')}</option>
        ${SUPPLIERS.map(s => `<option value="${s.id}" ${analyticsSupplierFilter === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
      </select>
      <button class="btn" style="padding:6px 14px;font-size:0.75rem" onclick="analyticsDateFrom='';analyticsDateTo='';analyticsAmountMin='';analyticsAmountMax='';analyticsCategoryFilter='';analyticsSupplierFilter='';analyticsDrill=null;renderAnalytics()">${t('resetFilters')}</button>
    </div>

    <div class="stats-grid" style="margin-bottom:20px">
      <div class="stat-card">
        <div class="stat-label">${t('totalInvoices')}</div>
        <div class="stat-value info">${filtered.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${t('totalSum')}</div>
        <div class="stat-value">${formatEur(totalFiltered)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${t('monthlyAvg')}</div>
        <div class="stat-value">${formatEur(allMonths.length > 0 ? totalFiltered / allMonths.length : 0)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${t('avgAmount')}</div>
        <div class="stat-value">${formatEur(filtered.length > 0 ? totalFiltered / filtered.length : 0)}</div>
      </div>
    </div>

    <div class="analytics-grid">
      <div class="analytics-panel">
        <div class="analytics-panel-title"><span class="panel-icon">&#x1F4CA;</span> ${t('costByCategory')}</div>
        ${catSorted.map(([cat, data]) => {
          const pct = (data.sum / totalFiltered * 100).toFixed(1);
          const w = (data.sum / catMax * 100).toFixed(1);
          const color = getCategoryColor(cat);
          return `
            <div class="h-bar-row" onclick="analyticsDrill={type:'category',value:'${cat.replace(/'/g, "\\'")}'}; renderAnalytics()">
              <div class="h-bar-label"><span class="cat-dot" style="background:${color}"></span>${cat}</div>
              <div class="h-bar-track">
                <div class="h-bar-fill" style="width:${w}%;background:${color}">
                  <span class="h-bar-fill-text">${pct}%</span>
                </div>
              </div>
              <div class="h-bar-value">${formatEur(data.sum)}</div>
            </div>`;
        }).join('')}
      </div>

      <div class="analytics-panel">
        <div class="analytics-panel-title"><span class="panel-icon">&#x1F3E2;</span> ${t('topSuppliers')}</div>
        ${supSorted.map(([sid, data]) => {
          const sup = SUPPLIERS.find(s => s.id === sid);
          const pct = (data.sum / totalFiltered * 100).toFixed(1);
          const w = (data.sum / supMax * 100).toFixed(1);
          const color = getSupplierColor(sid);
          return `
            <div class="h-bar-row" onclick="analyticsDrill={type:'supplier',value:'${sid}'}; renderAnalytics()">
              <div class="h-bar-label">${sup.name}</div>
              <div class="h-bar-track">
                <div class="h-bar-fill" style="width:${w}%;background:${color}">
                  <span class="h-bar-fill-text">${pct}%</span>
                </div>
              </div>
              <div class="h-bar-value">${formatEur(data.sum)}</div>
            </div>`;
        }).join('')}
      </div>

      <div class="analytics-panel full-width">
        <div class="analytics-panel-title"><span class="panel-icon">&#x1F4C8;</span> ${t('monthlyTrend')}</div>
        <div class="stacked-chart">
          ${allMonths.map(month => {
            const monthTotal = Object.values(monthCatData[month]).reduce((s, v) => s + v, 0);
            const h = (monthTotal / maxMonthTotal) * 160;
            return `
              <div class="stacked-group" title="${formatEur(monthTotal)}">
                <div class="bar-value" style="font-size:0.6rem">${formatEur(monthTotal)}</div>
                <div class="stacked-bar" style="height:${h}px">
                  ${allCats.filter(cat => monthCatData[month][cat]).map(cat => {
                    const segH = (monthCatData[month][cat] / monthTotal) * 100;
                    const color = getCategoryColor(cat);
                    return `<div class="stacked-segment" style="height:${segH}%;background:${color}" title="${cat}: ${formatEur(monthCatData[month][cat])}"></div>`;
                  }).join('')}
                </div>
                <div class="bar-label">${month.slice(5)}/${month.slice(2,4)}</div>
              </div>`;
          }).join('')}
        </div>
        <div class="chart-legend">
          ${allCats.map(cat => `<div class="legend-item"><div class="legend-dot" style="background:${getCategoryColor(cat)}"></div>${cat}</div>`).join('')}
        </div>
      </div>

      <div class="analytics-panel full-width">
        <div class="analytics-panel-title"><span class="panel-icon">&#x1F4B9;</span> ${t('priceChanges')} (${priceChanges.length})</div>
        ${priceChanges.length > 0 ? `
        <table class="invoice-table" style="font-size:0.8rem">
          <thead>
            <tr>
              <th>${t('date')}</th>
              <th>${t('supplier')}</th>
              <th>${t('item')}</th>
              <th style="text-align:right">${t('prevInvoice')}</th>
              <th style="text-align:right">${t('thisInvoice')}</th>
              <th>${t('change')}</th>
            </tr>
          </thead>
          <tbody>
            ${priceChanges.slice(0, 20).map(pc => {
              const cls = pc.pct > 0 ? 'change-up' : 'change-down';
              return `
                <tr onclick="openInvoiceModal(${pc.invId})" style="cursor:pointer">
                  <td>${formatDate(pc.date)}</td>
                  <td>${pc.supplier}</td>
                  <td>${pc.item}</td>
                  <td style="text-align:right">${formatEur(pc.prevPrice)}</td>
                  <td style="text-align:right">${formatEur(pc.newPrice)}</td>
                  <td><span class="${cls}" style="font-weight:600">${pc.pct > 0 ? '+' : ''}${pc.pct.toFixed(1)}%</span></td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>` : `<p style="color:var(--text-light);font-size:0.82rem">${t('noFlags')}</p>`}
      </div>
    </div>

    ${drillHtml}
  `;
}

// ── Supplier view ───────────────────────────────────────────
function renderSuppliers() {
  const supplierData = SUPPLIERS.map(sup => {
    const supInvoices = invoices.filter(i => i.supplierId === sup.id).sort((a, b) => a.date.localeCompare(b.date));
    const count = supInvoices.length;
    if (count === 0) return null;
    const totalSum = supInvoices.reduce((s, i) => s + i.grossTotal, 0);
    const avg = totalSum / count;

    let trend = 'stable';
    if (count >= 2) {
      const first = supInvoices.slice(0, Math.ceil(count / 2));
      const last = supInvoices.slice(Math.ceil(count / 2));
      const avgFirst = first.reduce((s, i) => s + i.grossTotal, 0) / first.length;
      const avgLast = last.reduce((s, i) => s + i.grossTotal, 0) / last.length;
      const trendPct = ((avgLast - avgFirst) / avgFirst) * 100;
      if (trendPct > 5) trend = 'rising';
      else if (trendPct < -5) trend = 'falling';
    }

    const flagCount = supInvoices.filter(inv => {
      const a = analyzeInvoice(inv);
      return a.flags.some(f => f.type === 'warning' || f.type === 'danger');
    }).length;

    return { ...sup, count, totalSum, avg, trend, flagCount, invoices: supInvoices };
  }).filter(Boolean);

  $('suppliers').innerHTML = `
    <div class="section-title">${t('tabSuppliers')} (${supplierData.length})</div>
    <div class="supplier-grid">
      ${supplierData.map(s => {
        const trendIcon = s.trend === 'rising' ? '&#x2197;' : s.trend === 'falling' ? '&#x2198;' : '&#x2192;';
        const trendColor = s.trend === 'rising' ? 'var(--danger)' : s.trend === 'falling' ? 'var(--success)' : 'var(--text-light)';
        return `
          <div class="supplier-card" onclick="openSupplierModal('${s.id}')">
            <div class="supplier-name">${s.name}</div>
            <div class="supplier-category">${getCategory(s)} &middot; ${s.ytunnus}</div>
            <div class="supplier-stats">
              <div class="supplier-stat">
                <div class="supplier-stat-label">${t('invoiceCount')}</div>
                <div class="supplier-stat-value">${s.count}</div>
              </div>
              <div class="supplier-stat">
                <div class="supplier-stat-label">${t('avgAmount')}</div>
                <div class="supplier-stat-value">${formatEur(s.avg)}</div>
              </div>
              <div class="supplier-stat">
                <div class="supplier-stat-label">${t('totalSum')}</div>
                <div class="supplier-stat-value">${formatEur(s.totalSum)}</div>
              </div>
            </div>
            <div class="supplier-trend">
              <span style="color:${trendColor}">${trendIcon} ${t(s.trend)}</span>
              ${s.flagCount > 0 ? `<span style="margin-left:auto;color:var(--warning);font-weight:600">&#x26A0; ${s.flagCount}</span>` : `<span style="margin-left:auto;color:var(--success)">&#x2713; ${t('noFlags')}</span>`}
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
}

// ── Flagged view ────────────────────────────────────────────
function renderFlagged() {
  renderInvoiceList('flagged', inv => {
    const a = analyzeInvoice(inv);
    return a.recommendation !== 'approve';
  });
}

// ── Invoice detail modal ────────────────────────────────────
function openInvoiceModal(id) {
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;
  const sup = SUPPLIERS.find(s => s.id === inv.supplierId);
  const analysis = analyzeInvoice(inv);

  let comparisonHtml = '';
  if (inv.prevLines && inv.prevLines.length > 0) {
    comparisonHtml = `
      <div class="modal-section">
        <div class="modal-section-title">${t('comparison')}</div>
        <table class="comparison-table">
          <thead>
            <tr><th>${t('item')}</th><th>${t('prevInvoice')}</th><th>${t('thisInvoice')}</th><th>${t('change')}</th></tr>
          </thead>
          <tbody>
            ${inv.lines.map(line => {
              const desc = line.desc[lang] || line.desc.fi;
              const descKey = (line.desc.fi || '').replace(/\d+/g, '').trim();
              const prev = inv.prevLines.find(pl => (pl.desc.fi || '').replace(/\d+/g, '').trim() === descKey);
              if (!prev) return `<tr><td>${desc}</td><td>-</td><td>${formatEur(line.unit)}</td><td><span class="status-badge status-pending">${t('newSupplier')}</span></td></tr>`;
              const priceDiff = ((line.unit - prev.unit) / prev.unit) * 100;
              const highlight = Math.abs(priceDiff) > 5 ? 'highlight-row' : '';
              const changeText = priceDiff > 0 ? `<span style="color:var(--danger)">+${priceDiff.toFixed(1)}%</span>` :
                priceDiff < -1 ? `<span style="color:var(--success)">${priceDiff.toFixed(1)}%</span>` :
                `<span style="color:var(--text-light)">0%</span>`;
              return `<tr class="${highlight}"><td>${desc}</td><td>${formatEur(prev.unit)}</td><td>${formatEur(line.unit)}</td><td>${changeText}</td></tr>`;
            }).join('')}
            <tr style="font-weight:700;border-top:2px solid var(--border)">
              <td>${t('total')}</td>
              <td>${formatEur(inv.prevGrossTotal)}</td>
              <td>${formatEur(inv.grossTotal)}</td>
              <td>${inv.prevGrossTotal ? (() => {
                const d = ((inv.grossTotal - inv.prevGrossTotal) / inv.prevGrossTotal * 100);
                return d > 0 ? `<span style="color:var(--danger)">+${d.toFixed(1)}%</span>` : `<span style="color:var(--success)">${d.toFixed(1)}%</span>`;
              })() : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>`;
  }

  let alertsHtml = '';
  if (analysis.flags.length > 0) {
    alertsHtml = analysis.flags.map(f => `
      <div class="alert-box ${f.type === 'danger' ? 'danger' : f.type === 'warning' ? 'warning' : 'info'}">
        <span class="alert-icon">${f.type === 'danger' ? '&#x26D4;' : f.type === 'warning' ? '&#x26A0;' : '&#x2139;'}</span>
        <div>${t(f.key)}${f.detail ? '<br><small>' + f.detail + '</small>' : ''}</div>
      </div>`).join('');
  } else {
    alertsHtml = `<div class="alert-box success"><span class="alert-icon">&#x2705;</span><div>${t('ok')}</div></div>`;
  }

  $('modalContent').innerHTML = `
    <div class="modal-header">
      <div>
        <div class="modal-title">${inv.invoiceNo}</div>
        <div class="modal-subtitle">${sup.name} – ${formatDate(inv.date)}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">${t('invoiceDetails')}</div>
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">${t('supplier')}</div>
            <div class="detail-value">${sup.name}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('category')}</div>
            <div class="detail-value">${getCategory(sup)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('date')}</div>
            <div class="detail-value">${formatDate(inv.date)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('dueDate')}</div>
            <div class="detail-value">${formatDate(inv.dueDate)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('netAmount')}</div>
            <div class="detail-value">${formatEur(inv.netTotal)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('vatPercent')} / ${t('vatAmount')}</div>
            <div class="detail-value">${inv.vatPercent}% / ${formatEur(inv.vatAmount)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('amount')}</div>
            <div class="detail-value" style="font-size:1.1rem;color:var(--primary)">${formatEur(inv.grossTotal)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('referenceNo')}</div>
            <div class="detail-value">${inv.referenceNo || '<span style="color:var(--danger)">&#x26A0; ' + t('missingRef') + '</span>'}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">${t('lineItems')}</div>
        <table class="line-items-table">
          <thead>
            <tr><th>${t('item')}</th><th>${t('qty')}</th><th>${t('unitPrice')}</th><th class="amount">${t('total')}</th></tr>
          </thead>
          <tbody>
            ${inv.lines.map(l => `
              <tr>
                <td>${l.desc[lang] || l.desc.fi}</td>
                <td>${l.qty}</td>
                <td>${formatEur(l.unit)}</td>
                <td class="amount">${formatEur(l.qty * l.unit)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>

      ${comparisonHtml}

      <div class="modal-section">
        <div class="modal-section-title">${t('analysis')}</div>
        ${alertsHtml}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">${t('close')}</button>
      <button class="btn btn-review" onclick="setStatus(${inv.id},'review')">${t('markReview')}</button>
      <button class="btn btn-reject" onclick="setStatus(${inv.id},'rejected')">${t('reject')}</button>
      <button class="btn btn-approve" onclick="setStatus(${inv.id},'approved')">${t('approve')}</button>
    </div>
  `;

  $('modalOverlay').classList.add('show');
}

function openSupplierModal(supplierId) {
  const sup = SUPPLIERS.find(s => s.id === supplierId);
  const supInvoices = invoices.filter(i => i.supplierId === supplierId).sort((a, b) => a.date.localeCompare(b.date));

  $('modalContent').innerHTML = `
    <div class="modal-header">
      <div>
        <div class="modal-title">${sup.name}</div>
        <div class="modal-subtitle">${getCategory(sup)} &middot; ${sup.ytunnus}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">${t('supplierDetails')}</div>
        <table class="invoice-table" style="font-size:0.8rem">
          <thead>
            <tr><th>${t('date')}</th><th>${t('invoiceNo')}</th><th style="text-align:right">${t('amount')}</th><th>${t('change')}</th><th>${t('status')}</th></tr>
          </thead>
          <tbody>
            ${supInvoices.map((inv, i) => {
              const prev = i > 0 ? supInvoices[i - 1].grossTotal : null;
              let changeHtml = '-';
              if (prev !== null) {
                const pct = ((inv.grossTotal - prev) / prev) * 100;
                if (Math.abs(pct) > 1) {
                  const cls = pct > 0 ? 'change-up' : 'change-down';
                  changeHtml = `<span class="${cls}">${pct > 0 ? '+' : ''}${pct.toFixed(1)}%</span>`;
                } else {
                  changeHtml = `<span class="change-same">${t('stablePrice')}</span>`;
                }
              }

              let statusBadge = '';
              if (inv.status === 'approved') statusBadge = `<span class="status-badge status-ok">&#x2713;</span>`;
              else if (inv.status === 'rejected') statusBadge = `<span class="status-badge status-danger">&#x2717;</span>`;
              else if (inv.status === 'review') statusBadge = `<span class="status-badge status-warning">&#x1F50D;</span>`;
              else statusBadge = `<span class="status-badge status-pending">&#x23F3;</span>`;

              return `
                <tr onclick="closeModal();setTimeout(()=>openInvoiceModal(${inv.id}),200)" style="cursor:pointer">
                  <td>${formatDate(inv.date)}</td>
                  <td>${inv.invoiceNo}</td>
                  <td style="text-align:right;font-weight:600">${formatEur(inv.grossTotal)}</td>
                  <td>${changeHtml}</td>
                  <td>${statusBadge}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">${t('close')}</button>
    </div>
  `;

  $('modalOverlay').classList.add('show');
}

function closeModal() {
  $('modalOverlay').classList.remove('show');
}

$('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ── Status management ───────────────────────────────────────
function setStatus(id, status) {
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;
  inv.status = status;
  saveStatuses();

  const toastKey = status === 'approved' ? 'toastApproved' : status === 'rejected' ? 'toastRejected' : 'toastReview';
  showToast(t(toastKey));

  closeModal();
  renderAll();
}

// ── Upload ──────────────────────────────────────────────────
function openUploadModal() {
  $('uploadOverlay').classList.add('show');
  $('uploadResult').innerHTML = '';
}

function closeUploadModal() {
  $('uploadOverlay').classList.remove('show');
}

$('uploadOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeUploadModal();
});

const uploadZone = $('uploadZone');
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) processUploadedFile(e.dataTransfer.files[0]);
});

function handleFileUpload(event) {
  if (event.target.files.length > 0) processUploadedFile(event.target.files[0]);
}

function processUploadedFile(file) {
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    $('uploadResult').innerHTML = `<div class="alert-box danger"><span class="alert-icon">&#x26D4;</span><div>${t('uploadFormat')}</div></div>`;
    return;
  }

  $('uploadResult').innerHTML = `
    <div class="alert-box info" style="margin-top:12px">
      <span class="alert-icon">&#x2699;</span>
      <div>Prosessoidaan: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(0)} KB)...</div>
    </div>`;

  setTimeout(() => {
    const randomSupplier = SUPPLIERS[Math.floor(Math.random() * SUPPLIERS.length)];
    const amount = +(Math.random() * 2000 + 100).toFixed(2);
    const today = new Date().toISOString().slice(0, 10);

    const newInv = {
      id: Math.max(...invoices.map(i => i.id)) + 1,
      invoiceNo: `UPL-${Date.now().toString().slice(-6)}`,
      supplierId: randomSupplier.id,
      date: today,
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      paymentTerm: 14,
      lines: [{ desc: { fi: `Tuotu: ${file.name}`, en: `Imported: ${file.name}` }, qty: 1, unit: amount }],
      netTotal: amount,
      vatPercent: 24,
      vatAmount: +(amount * 0.24).toFixed(2),
      grossTotal: +(amount * 1.24).toFixed(2),
      referenceNo: `${Math.floor(Math.random() * 9000000 + 1000000)}`,
      status: 'pending',
      prevGrossTotal: null,
      prevLines: null
    };

    invoices.unshift(newInv);

    $('uploadResult').innerHTML = `
      <div class="alert-box success" style="margin-top:12px">
        <span class="alert-icon">&#x2705;</span>
        <div>${t('uploadSuccess')}<br><small>${randomSupplier.name} – ${formatEur(newInv.grossTotal)}</small></div>
      </div>`;

    showToast(t('uploadSuccess'));
    renderAll();
    renderNav();

    setTimeout(() => closeUploadModal(), 2000);
  }, 1500);
}

// ── Toast ───────────────────────────────────────────────────
function showToast(msg) {
  const toast = $('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Render all ──────────────────────────────────────────────
function renderAll() {
  renderDashboard();
  renderInvoiceList('invoices');
  renderAnalytics();
  renderSuppliers();
  renderFlagged();
}

// ── Init ────────────────────────────────────────────────────
loadStatuses();
applyLang(lang);
