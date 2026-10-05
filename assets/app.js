/* ============================================================
   Visma Net — interactieve demo (sandbox)
   Nagebouwd op basis van screenshots van het ECHTE product.
   100% client-side. Alle gegevens zijn VERZONNEN (dummy).
   ============================================================ */
(function () {
  "use strict";

  var CONFIG = {
    ctaUrl: "https://www.consolit.nl/contact",
    ctaAfterSeconds: 180,       // lead-pop-up na 3 min actief gebruik
    offerTourOnLoad: true
  };
  var DEMO_TODAY = "05-10-2026"; // vaste demodatum (consistent met de dataset)

  /* ---------------- DUMMY DATA (Noordzee Outdoor B.V.) ---------------- */
  function seedData() {
    return {
      company: { name: "Noordzee Outdoor B.V.", location: "Noordwijk" },
      products: [
        { sku: "ART-TNT4", name: "Familietent Fjord 4",     unit: "stuk", price: 349.00, cost: 232.0, stock: 42 },
        { sku: "ART-SLP5", name: "Slaapzak Comfort -5°",    unit: "stuk", price: 79.95,  cost: 47.0,  stock: 180 },
        { sku: "ART-STLA", name: "Campingstoel Aluxe",      unit: "stuk", price: 44.50,  cost: 25.5,  stock: 320 },
        { sku: "ART-KKR2", name: "Kookset Trangia 2-pers.", unit: "stuk", price: 64.90,  cost: 39.0,  stock: 95 },
        { sku: "ART-LMPS", name: "LED Campinglamp Solar",   unit: "stuk", price: 24.95,  cost: 12.5,  stock: 6 },
        { sku: "ART-MATS", name: "Slaapmat Self-Inflating", unit: "stuk", price: 54.00,  cost: 30.0,  stock: 140 },
        { sku: "ART-KBX45",name: "Koelbox Arctic 45L",      unit: "stuk", price: 129.00, cost: 83.0,  stock: 28 },
        { sku: "ART-TBLV", name: "Vouwtafel Compact",       unit: "stuk", price: 69.00,  cost: 41.0,  stock: 60 }
      ],
      customers: [
        { code: "30001", name: "De Kampeervriend",           city: "Utrecht",   terms: "30 - 30 dagen" },
        { code: "30002", name: "Outdoor World Rotterdam",     city: "Rotterdam", terms: "30 - 30 dagen" },
        { code: "30003", name: "Buitensport Jansen",          city: "Zwolle",    terms: "14 - 14 dagen" },
        { code: "30004", name: "Camping De Duinrand",         city: "Noordwijk", terms: "30 - 30 dagen" },
        { code: "30005", name: "Avontuur Retail B.V.",        city: "Eindhoven", terms: "60 - 60 dagen" },
        { code: "30006", name: "Recreatie Groothandel Noord", city: "Groningen", terms: "30 - 30 dagen" }
      ],
      salesOrders: [
        so("253100026", "Voltooid",     "16-9-2026", "30001", "De Kampeervriend",           0.00,    "",          1, 1),
        so("253100025", "In verzending","23-8-2026", "30004", "Camping De Duinrand",         3896.14, "253200018", 0, 0),
        so("253100024", "In verzending","23-8-2026", "30005", "Avontuur Retail B.V.",        2589.38, "253200019", 0, 0),
        so("253100023", "Voltooid",     "19-8-2026", "30004", "Camping De Duinrand",         2420.00, "253200017", 1, 1),
        so("253100022", "Voltooid",     "11-8-2026", "30002", "Outdoor World Rotterdam",     1705.98, "253200015", 1, 1),
        so("253100021", "Voltooid",     "10-7-2026", "30005", "Avontuur Retail B.V.",        4353.58, "253200014", 1, 1),
        so("253100020", "Voltooid",     "10-7-2026", "30001", "De Kampeervriend",            1959.11, "253200013", 1, 1),
        so("253100018", "Voltooid",     "16-6-2026", "30005", "Avontuur Retail B.V.",        21576.08,"253200011", 1, 1),
        so("253100016", "Voltooid",     "30-5-2026", "30001", "De Kampeervriend",            5307.90, "253200009", 1, 1),
        so("253100015", "Open",         "15-5-2026", "30004", "Camping De Duinrand",         744.50,  "",          0, 0),
        so("253100014", "Geblokkeerd",  "30-4-2026", "30004", "Camping De Duinrand",         157.20,  "",          0, 0),
        so("253100012", "In verzending","25-4-2026", "30006", "Recreatie Groothandel Noord", 1932.80, "253200006", 1, 0),
        so("253100009", "Geblokkeerd",  "03-4-2026", "30002", "Outdoor World Rotterdam",     1441.55, "",          0, 0),
        so("253100006", "In verzending","26-3-2026", "30003", "Buitensport Jansen",          1112.96, "253200003", 1, 0)
      ],
      purchaseInvoices: [
        {
          id: "IF-90231", supplier: "Tentpoint Supplies B.V.", date: "01-10-2026",
          channel: "Peppol (e-factuur)", net: 7000.00, vat: 1470.00, total: 8470.00,
          account: "7000 · Inkoopwaarde handelsgoederen", status: "te keuren",
          steps: [ { role: "Inkoop", who: "Mark de Vries", state: "pending" },
                   { role: "Financieel manager (> € 5.000)", who: "Sandra Bos", state: "waiting" } ]
        },
        {
          id: "IF-90232", supplier: "Fjordtex Fabrics", date: "02-10-2026",
          channel: "Peppol (e-factuur)", net: 2100.00, vat: 441.00, total: 2541.00,
          account: "7000 · Inkoopwaarde handelsgoederen", status: "te keuren",
          steps: [ { role: "Inkoop", who: "Mark de Vries", state: "pending" } ]
        },
        {
          id: "IF-90233", supplier: "Logistiek Partner Zuid", date: "02-10-2026",
          channel: "E-mail (PDF, via SmartScan)", net: 800.00, vat: 168.00, total: 968.00,
          account: "4210 · Vrachtkosten", status: "te keuren",
          steps: [ { role: "Inkoop", who: "Mark de Vries", state: "pending" } ]
        }
      ],
      kpi: { revenueYTD: 1284500, cash: 342900, liq30: 186400, vervallen90: 24150 },
      omzetPerKlant: [
        { code: "30005", name: "Avontuur Retail B.V.",        omzet: 324100, orders: 38 },
        { code: "30002", name: "Outdoor World Rotterdam",      omzet: 268900, orders: 52 },
        { code: "30006", name: "Recreatie Groothandel Noord",  omzet: 214300, orders: 29 },
        { code: "30001", name: "De Kampeervriend",             omzet: 198600, orders: 61 },
        { code: "30004", name: "Camping De Duinrand",          omzet: 162200, orders: 24 },
        { code: "30003", name: "Buitensport Jansen",           omzet: 116400, orders: 33 }
      ],
      bankAccounts: [
        { acct: "1000", name: "ING Zakelijke rekening",   iban: "NL21 INGB 0001 2345 67", saldo: 198400 },
        { acct: "1010", name: "Rabobank Spaarrekening",   iban: "NL44 RABO 0127 8899 10", saldo: 120000 },
        { acct: "1100", name: "Kas",                       iban: "—",                       saldo: 24500 }
      ],
      openAR: [
        { inv: "253300088", code: "30005", name: "Avontuur Retail B.V.",       date: "15-6-2026",  due: "15-7-2026",  amount: 14300, days: 112 },
        { inv: "253300090", code: "30002", name: "Outdoor World Rotterdam",     date: "28-6-2026",  due: "28-7-2026",  amount: 9850,  days: 97 },
        { inv: "253300095", code: "30006", name: "Recreatie Groothandel Noord", date: "22-7-2026",  due: "22-8-2026",  amount: 8400,  days: 74 },
        { inv: "253300101", code: "30004", name: "Camping De Duinrand",         date: "21-8-2026",  due: "20-9-2026",  amount: 6900,  days: 44 },
        { inv: "253300106", code: "30001", name: "De Kampeervriend",            date: "17-9-2026",  due: "17-10-2026", amount: 9800,  days: 18 },
        { inv: "253300108", code: "30003", name: "Buitensport Jansen",          date: "28-9-2026",  due: "28-10-2026", amount: 6400,  days: 7 },
        { inv: "253300110", code: "30005", name: "Avontuur Retail B.V.",        date: "02-10-2026", due: "17-10-2026", amount: 18200, days: -12 },
        { inv: "253300111", code: "30002", name: "Outdoor World Rotterdam",     date: "03-10-2026", due: "10-10-2026", amount: 12400, days: -5 }
      ],
      liq: {
        ontvangsten: [
          { label: "Debiteuren (vervallend binnen 30 dgn)", amount: 142300 },
          { label: "Overige ontvangsten", amount: 8000 }
        ],
        uitgaven: [
          { label: "Crediteuren (openstaand)", amount: 118400 },
          { label: "Salarissen", amount: 42000 },
          { label: "Btw-afdracht", amount: 18600 },
          { label: "Vaste lasten", amount: 7400 }
        ]
      },
      liquidity: [1.13, 1.11, 1.22, 0.83, 2.1, 2.25, 2.6, 2.61, 3.26, 3.27, 3.27, 3.27], // x mln
      debAging: [
        { name: "Avontuur Retail B.V.", amount: 48300 },
        { name: "Outdoor World Rotterdam", amount: 33900 },
        { name: "Recreatie Groothandel Noord", amount: 24600 },
        { name: "Camping De Duinrand", amount: 14200 },
        { name: "De Kampeervriend", amount: 9800 },
        { name: "Buitensport Jansen", amount: 6400 }
      ],
      counters: { order: 253100027, shipment: 253200021, invoice: 253300112 }
    };
  }
  function so(id, status, date, code, name, total, verz, pak, pakbon) {
    return { id: id, status: status, date: date, code: code, name: name, total: total, verz: verz, pak: pak, pakbon: pakbon };
  }

  var S = seedData();
  var CHART_BLUE = "#2f7ed8";

  /* ---------------- HELPERS ---------------- */
  var eur2 = new Intl.NumberFormat("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var eur0 = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  function money(n) { return eur2.format(n); }
  function euro0(n) { return eur0.format(n); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(h) { var t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function product(sku) { return S.products.find(function (p) { return p.sku === sku; }); }
  function customer(code) { return S.customers.find(function (c) { return c.code === code; }); }
  function pendingCount() { return S.purchaseInvoices.filter(function (i) { return i.status === "te keuren"; }).length; }
  function openOrdersCount() { return S.salesOrders.filter(function (o) { return o.status !== "Voltooid"; }).length; }

  /* ---------------- ICONS ---------------- */
  var I = {
    refresh: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a6 6 0 0 1 0 12h-3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2 2 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/>',
    fit: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/>',
    excel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9l8 6M16 9l-8 6"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
    save: '<path d="M5 3h12l4 4v14H5z"/><path d="M9 3v5h7"/><path d="M9 21v-7h8v7"/>',
    first: '<path d="M18 6l-6 6 6 6M8 6v12"/>', prev: '<path d="M15 6l-6 6 6 6"/>',
    next: '<path d="M9 6l6 6-6 6"/>', last: '<path d="M6 6l6 6-6 6M16 6v12"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    clip: '<path d="M21 11l-9 9a5 5 0 0 1-7-7l9-9a3 3 0 0 1 4 4l-9 9a1 1 0 0 1-2-2l8-8"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    bank: '<path d="M3 10l9-6 9 6"/><path d="M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  function ic(name, cls) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="' + (cls || "") + '">' + I[name] + '</svg>'; }

  /* ---------------- TOASTS / MODAL ---------------- */
  function toast(t, b, k) {
    var n = el('<div class="toast ' + (k || "") + '"><div class="tt">' + esc(t) + '</div>' + (b ? '<div class="tb">' + esc(b) + '</div>' : "") + '</div>');
    $("#toasts").appendChild(n);
    setTimeout(function () { n.style.transition = "opacity .3s"; n.style.opacity = "0"; setTimeout(function () { n.remove(); }, 300); }, 4200);
  }
  function openModal(node) { var h = $("#overlay-content"); h.innerHTML = ""; h.appendChild(node); $("#overlay").classList.add("open"); }
  function closeModal() { $("#overlay").classList.remove("open"); $("#overlay-content").innerHTML = ""; }

  /* ---------------- CHARTS ---------------- */
  function lineChart(vals) {
    var W = 560, H = 210, pL = 52, pR = 10, pT = 10, pB = 34;
    var max = 3.5, min = 0.5;
    var iw = W - pL - pR, ih = H - pT - pB;
    function x(i) { return pL + iw * (i / (vals.length - 1)); }
    function y(v) { return pT + ih * (1 - (v - min) / (max - min)); }
    var grid = "", labs = ["2026-01","","2026-03","","2026-05","","2026-07","","2026-09","","2026-11",""];
    for (var g = 0; g <= 5; g++) { var gy = pT + ih * g / 5; var gv = (max - (max - min) * g / 5); grid += '<line x1="' + pL + '" y1="' + gy + '" x2="' + (W - pR) + '" y2="' + gy + '" stroke="#eef1f3"/><text x="' + (pL - 8) + '" y="' + (gy + 3) + '" text-anchor="end" font-size="10" fill="#8a97a1">' + gv.toFixed(1).replace(".", ",") + ' mln</text>'; }
    var d = vals.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); }).join(" ");
    var dots = vals.map(function (v, i) { return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="3" fill="' + CHART_BLUE + '"/>'; }).join("");
    var xlabs = vals.map(function (v, i) { return labs[i] ? '<text x="' + x(i).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="9" fill="#8a97a1">' + labs[i] + '</text>' : ""; }).join("");
    return '<div class="chart-wrap"><svg viewBox="0 0 ' + W + ' ' + H + '">' + grid + '<path d="' + d + '" fill="none" stroke="' + CHART_BLUE + '" stroke-width="2"/>' + dots + xlabs + '</svg></div>';
  }
  function hbar(rows) {
    var W = 600, rowH = 30, pL = 180, pR = 86, H = rows.length * rowH + 6, bw = W - pL - pR;
    var max = Math.max.apply(null, rows.map(function (r) { return r.amount; }));
    var out = "";
    rows.forEach(function (r, i) {
      var y = i * rowH + 6, w = bw * (r.amount / max);
      out += '<text x="' + (pL - 8) + '" y="' + (y + 14) + '" text-anchor="end" font-size="11" fill="#1b2b36">' + esc(r.name) + '</text>';
      out += '<rect x="' + pL + '" y="' + (y + 5) + '" width="' + w.toFixed(1) + '" height="14" fill="' + CHART_BLUE + '"/>';
      out += '<text x="' + (pL + w + 6) + '" y="' + (y + 16) + '" font-size="10" fill="#5a6b78">' + euro0(r.amount) + '</text>';
    });
    return '<div class="chart-wrap"><svg viewBox="0 0 ' + W + ' ' + H + '">' + out + '</svg></div>';
  }
  function donut(pct) {
    pct = Math.max(0, Math.min(100, pct));
    var r = 30, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return '<div class="donut"><svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="' + r + '" fill="none" stroke="#e2e6ea" stroke-width="9"/>' +
      '<circle cx="38" cy="38" r="' + r + '" fill="none" stroke="#5aa75a" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 38 38)"/></svg>' +
      '<div class="pc"><span class="pl">Marge</span><span class="pv">' + Math.round(pct) + '%</span></div></div>';
  }

  /* ---------------- BREADCRUMB + NAV ---------------- */
  var CRUMBS = {
    dashboard:   ["Services", "Visma Net", "Dashboards", "Dashboard: Financieel", "Financiële gebruiker"],
    sales:       ["Services", "Visma Net", "Verkoop", "Transacties", "Verkooporders"],
    order:       ["Services", "Visma Net", "Verkoop", "Transacties", "Verkooporders (nieuwe versie)"],
    purchase:    ["Services", "Visma Net", "Crediteuren", "Transacties", "Inkoopfacturen"],
    omzet:       ["Services", "Visma Net", "Verkoop", "Analyses", "Omzet per debiteur"],
    cash:        ["Services", "Visma Net", "Bank/kas", "Overzichten", "Kassaldi"],
    debiteuren:  ["Services", "Visma Net", "Debiteuren", "Overzichten", "Openstaande posten"],
    liquiditeit: ["Services", "Visma Net", "Bank/kas", "Analyses", "Liquiditeitsprognose"]
  };
  function setBreadcrumb(view) {
    var parts = CRUMBS[view] || ["Services", "Visma Net"];
    $("#breadcrumb").innerHTML = parts.map(function (p, i) {
      var last = i === parts.length - 1;
      return '<span class="bc' + (last ? " last" : "") + '">' + esc(p) + '</span>' + (last ? "" : '<span class="sep">/</span>');
    }).join("");
  }
  var MENU = [
    { label: "Eigen menu", dim: true },
    { label: "Dashboards", nav: "dashboard" },
    { label: "Crediteuren", nav: "purchase" },
    { label: "Debiteuren", nav: "debiteuren" },
    { label: "Bank/kas", nav: "cash" },
    { label: "Grootboek", dim: true },
    { label: "Valuta", dim: true },
    { label: "Verkoop", nav: "sales" },
    { label: "Inkoop", nav: "purchase" },
    { label: "Voorraad", dim: true },
    { label: "Beveiliging (regelniveau)", dim: true },
    { label: "Meer onderdelen", dim: true }
  ];
  function renderMenu() {
    $("#flyout-list").innerHTML = MENU.map(function (m) {
      return '<button class="flyout-item ' + (m.dim ? "dim" : "enabled") + '" ' + (m.nav ? 'data-nav="' + m.nav + '"' : 'data-dim="1"') + '>' +
        esc(m.label) + '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto"><path d="M9 6l6 6-6 6"/></svg></button>';
    }).join("");
  }
  function openFlyout() { $("#flyout").classList.add("open"); $("#flyout-backdrop").classList.add("open"); }
  function closeFlyout() { $("#flyout").classList.remove("open"); $("#flyout-backdrop").classList.remove("open"); }

  function showView(view) {
    $all(".view").forEach(function (v) { v.classList.remove("active"); });
    var v = $("#view-" + view); if (v) v.classList.add("active");
    setBreadcrumb(view);
    $("#content").scrollTop = 0;
    closeFlyout();
    if (view === "dashboard") renderDashboard();
    if (view === "sales") renderSales();
    if (view === "purchase") renderPurchase();
    if (view === "omzet") renderOmzet();
    if (view === "cash") renderCash();
    if (view === "debiteuren") renderDebiteuren();
    if (view === "liquiditeit") renderLiquiditeit();
    // 'order' view is rendered on demand by openOrder()
  }

  /* ---------------- DASHBOARD ---------------- */
  function renderDashboard() {
    var k = S.kpi;
    var tiles =
      '<div class="tile-logo"><div class="lg"><svg class="mark" viewBox="0 0 288 288"><path fill="#ff8e05" d="M223.43,111.861c-.48,4.63-3.21,8.96-7.45,11.38l-45.47,26.39c-8.11-4.68-27.819-15.97-27.819-15.97-5.15-3.25-8.44-8.93-8.44-15.21v-49.989c0-3.2,1.7-6.2,4.5-7.5,1.9-1.1,4.3-1.2,6.4,0l68.428,39.469c3.98,2.3,6.09,5.15,6.26,9.2Z"/><path fill="#9ecb45" d="M153.809,164.121v54.485c0,6.864-7.294,11.161-13.299,7.724l-68.428-39.467c-4.5-2.8-7.29-5.79-7.51-10.72.22-4.94,3.01-9.66,7.51-12.24l45.47-26.38c9.66,5.58,25.53,14.59,31.32,18.03,3,1.71,4.93,4.93,4.93,8.57Z"/><path fill="#1f7f94" d="M64.6,176.489c.3-5.01,3.04-9.54,7.48-12.16l45.5-26.49,30.03-17.38c5.36-3.22,8.8-9.01,8.8-15.44v-49.989c0-3.21-1.72-6.22-4.51-7.72-2.57-1.51-6.01-1.51-8.8,0l-68.429,39.479c-4.71,2.78-7.51,7.71-7.51,13.08v74.448z"/></svg> NOORDZEE OUTDOOR</div></div>' +
      tile("teal", euro0(k.revenueYTD), "Omzet YTD", null, "omzet") +
      tile("green", euro0(k.cash), "Cashpositie", "bank", "cash") +
      tile("orange", String(pendingCount()), "Te keuren inkoopfacturen", null, "purchase") +
      tile("teal", String(openOrdersCount()), "Openstaande verkooporders", null, "sales") +
      tile("red", euro0(k.vervallen90), "Vervallen debiteuren 90+", null, "debiteuren") +
      tile("grey", euro0(k.liq30), "Liq.behoefte 30 dgn", null, "liquiditeit");

    $("#view-dashboard").innerHTML =
      '<div class="page-title-row"><h1>Financiële gebruiker</h1><span class="star">☆</span><span class="spacer"></span>' +
        '<button class="link-btn" data-action="reset-demo" title="Zet de voorbeeldgegevens terug">' + ic("refresh") + ' Demo resetten</button>' +
        '<button class="link-btn" data-noop="1">Gebruikerskopie maken</button></div>' +
      '<div class="dash" data-tour="dash">' +
        '<div class="tile-grid">' + tiles + '</div>' +
        '<div class="dash-right">' +
          '<div class="dash-card"><div class="dc-head">' + ic("refresh") + 'Liquiditeit (per maand)</div><div class="dc-body">' + lineChart(S.liquidity) + '</div></div>' +
          '<div class="dash-card"><div class="dc-head">' + ic("refresh") + 'Deb.saldo (vervallen)</div><div class="dc-body">' + hbar(S.debAging) + '</div></div>' +
        '</div>' +
      '</div>';
  }
  function tile(color, value, label, icon, nav) {
    return '<button class="tile t-' + color + (nav ? " clickable" : "") + '" ' + (nav ? 'data-nav="' + nav + '"' : 'data-noop="1"') + '>' +
      (icon ? '<span class="ic">' + ic(icon) + '</span>' : "") +
      '<span class="v">' + value + '</span><span class="l">' + label + '</span>' +
      '<span class="more">Meer gegevens →</span></button>';
  }

  /* ---------------- DRILL-DOWN: OMZET PER DEBITEUR ---------------- */
  function inquiryToolbar() { return '<div class="grid-toolbar">' + gt("refresh") + gt("undo") + gt("fit") + gt("excel") + gt("filter") + '</div>'; }
  function renderOmzet() {
    var total = S.omzetPerKlant.reduce(function (a, r) { return a + r.omzet; }, 0);
    var rows = S.omzetPerKlant.map(function (r) {
      return '<tr><td>' + r.code + '</td><td>' + esc(r.name) + '</td><td class="num">' + money(r.omzet) + '</td><td class="num">' + r.orders + '</td><td class="num">' + (r.omzet / total * 100).toFixed(1).replace(".", ",") + '%</td></tr>';
    }).join("");
    $("#view-omzet").innerHTML =
      '<div class="page-title-row"><h1>Omzet per debiteur</h1><span class="star">☆</span><span class="spacer"></span><button class="link-btn" data-nav="dashboard">' + ic("prev") + ' Terug naar dashboard</button></div>' +
      '<div style="padding:0 20px 8px;color:#5a6b78;font-size:12.5px">Boekjaar 2026 · year-to-date · excl. btw · omzet YTD <b>' + euro0(total) + '</b></div>' +
      inquiryToolbar() +
      '<div style="padding:12px 20px"><div class="dash-card"><div class="dc-head">' + ic("refresh") + 'Omzet per debiteur (YTD)</div><div class="dc-body">' + hbar(S.omzetPerKlant.map(function (r) { return { name: r.name, amount: r.omzet }; })) + '</div></div></div>' +
      '<div class="grid-scroll"><table class="grid"><thead><tr><th>Debiteur</th><th>Naam debiteur</th><th class="num">Omzet YTD</th><th class="num">Aantal orders</th><th class="num">Aandeel</th></tr></thead>' +
      '<tbody>' + rows + '<tr class="sel"><td></td><td style="font-weight:600">Totaal</td><td class="num" style="font-weight:700">' + money(total) + '</td><td class="num" style="font-weight:600">' + S.omzetPerKlant.reduce(function (a, r) { return a + r.orders; }, 0) + '</td><td class="num">100,0%</td></tr></tbody></table></div>' +
      '<div class="grid-foot">1-' + S.omzetPerKlant.length + ' van ' + S.omzetPerKlant.length + ' regels</div>';
  }

  /* ---------------- DRILL-DOWN: CASHPOSITIE (BANK/KAS) ---------------- */
  function renderCash() {
    var total = S.bankAccounts.reduce(function (a, r) { return a + r.saldo; }, 0);
    var rows = S.bankAccounts.map(function (b) {
      return '<tr><td>' + b.acct + '</td><td>' + esc(b.name) + '</td><td>' + esc(b.iban) + '</td><td>EUR</td><td class="num">' + money(b.saldo) + '</td></tr>';
    }).join("");
    $("#view-cash").innerHTML =
      '<div class="page-title-row"><h1>Kassaldi</h1><span class="star">☆</span><span class="spacer"></span><button class="link-btn" data-nav="dashboard">' + ic("prev") + ' Terug naar dashboard</button></div>' +
      '<div style="padding:0 20px 8px;color:#5a6b78;font-size:12.5px">Actuele saldi van bank- en kasrekeningen · totale cashpositie <b>' + euro0(total) + '</b></div>' +
      inquiryToolbar() +
      '<div class="grid-scroll"><table class="grid"><thead><tr><th>Rekening</th><th>Omschrijving</th><th>IBAN</th><th>Valuta</th><th class="num">Saldo</th></tr></thead>' +
      '<tbody>' + rows + '<tr class="sel"><td></td><td style="font-weight:600">Totaal cashpositie</td><td></td><td></td><td class="num" style="font-weight:700">' + money(total) + '</td></tr></tbody></table></div>' +
      '<div class="grid-foot">1-' + S.bankAccounts.length + ' van ' + S.bankAccounts.length + ' regels</div>';
  }

  /* ---------------- DRILL-DOWN: VERVALLEN DEBITEUREN (OUDERDOM) ---------------- */
  function arBucket(days) { return days <= 0 ? "Niet vervallen" : days <= 30 ? "1 - 30" : days <= 60 ? "31 - 60" : days <= 90 ? "61 - 90" : "90+"; }
  function renderDebiteuren() {
    var buckets = { "Niet vervallen": 0, "1 - 30": 0, "31 - 60": 0, "61 - 90": 0, "90+": 0 };
    S.openAR.forEach(function (r) { buckets[arBucket(r.days)] += r.amount; });
    var total = S.openAR.reduce(function (a, r) { return a + r.amount; }, 0);
    var bucketOrder = ["Niet vervallen", "1 - 30", "31 - 60", "61 - 90", "90+"];
    var strip = bucketOrder.map(function (b) {
      var warn = b === "90+" || b === "61 - 90";
      return '<div style="flex:1;border:1px solid #e2e6ea;border-top:3px solid ' + (b === "90+" ? "#d9534f" : b === "61 - 90" ? "#e8923a" : "#1f7f94") + ';border-radius:6px;padding:10px 12px">' +
        '<div style="font-size:11.5px;color:#5a6b78">' + b + (b === "Niet vervallen" ? "" : " dgn") + '</div><div style="font-size:18px;font-weight:700;' + (warn ? "color:#cc453e" : "") + '">' + money(buckets[b]) + '</div></div>';
    }).join("");
    var rows = S.openAR.slice().sort(function (a, b) { return b.days - a.days; }).map(function (r) {
      var bk = arBucket(r.days), late = r.days > 0;
      return '<tr><td><span class="so-type">AR</span></td><td class="lnk" data-noop="1">' + r.inv + '</td><td>' + r.code + '</td><td>' + esc(r.name) + '</td><td>' + r.date + '</td><td>' + r.due + '</td>' +
        '<td class="num">' + money(r.amount) + '</td><td class="num"' + (late ? ' style="color:#cc453e;font-weight:600"' : "") + '>' + (late ? r.days : "–") + '</td>' +
        '<td>' + (bk === "90+" ? '<span style="color:#cc453e;font-weight:600">90+</span>' : bk) + '</td></tr>';
    }).join("");
    $("#view-debiteuren").innerHTML =
      '<div class="page-title-row"><h1>Openstaande posten debiteuren</h1><span class="star">☆</span><span class="spacer"></span><button class="link-btn" data-nav="dashboard">' + ic("prev") + ' Terug naar dashboard</button></div>' +
      '<div style="padding:0 20px 8px;color:#5a6b78;font-size:12.5px">Ouderdomsanalyse per ' + DEMO_TODAY + ' · totaal openstaand <b>' + euro0(total) + '</b> · waarvan 90+ <b style="color:#cc453e">' + euro0(buckets["90+"]) + '</b></div>' +
      '<div style="display:flex;gap:10px;padding:8px 20px 14px">' + strip + '</div>' +
      inquiryToolbar() +
      '<div class="grid-scroll"><table class="grid"><thead><tr><th>Soort</th><th>Referentienr.</th><th>Debiteur</th><th>Naam debiteur</th><th>Factuurdatum</th><th>Vervaldatum</th><th class="num">Openstaand bedrag</th><th class="num">Dagen te laat</th><th>Ouderdom</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="grid-foot">1-' + S.openAR.length + ' van ' + S.openAR.length + ' regels</div>';
  }

  /* ---------------- DRILL-DOWN: LIQUIDITEITSPROGNOSE ---------------- */
  function renderLiquiditeit() {
    var cash = S.kpi.cash;
    var inSum = S.liq.ontvangsten.reduce(function (a, r) { return a + r.amount; }, 0);
    var outSum = S.liq.uitgaven.reduce(function (a, r) { return a + r.amount; }, 0);
    var eind = cash + inSum - outSum;
    function tbl(title, items, cls) {
      return '<div class="dash-card"><div class="dc-head">' + title + '</div><div style="padding:4px 0 10px">' +
        '<table class="grid" style="white-space:normal"><tbody>' + items.map(function (r) { return '<tr><td>' + esc(r.label) + '</td><td class="num">' + money(r.amount) + '</td></tr>'; }).join("") +
        '<tr class="sel"><td style="font-weight:600">Totaal</td><td class="num" style="font-weight:700' + (cls === "out" ? ";color:#cc453e" : "") + '">' + money(cls === "out" ? -outSum : inSum) + '</td></tr></tbody></table></div></div>';
    }
    $("#view-liquiditeit").innerHTML =
      '<div class="page-title-row"><h1>Liquiditeitsprognose</h1><span class="star">☆</span><span class="spacer"></span><button class="link-btn" data-nav="dashboard">' + ic("prev") + ' Terug naar dashboard</button></div>' +
      '<div style="padding:0 20px 8px;color:#5a6b78;font-size:12.5px">Prognose komende 30 dagen · liquiditeitsbehoefte (uitgaven) <b>' + euro0(outSum) + '</b></div>' +
      '<div style="padding:12px 20px;display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">' +
        tbl("Verwachte ontvangsten (30 dgn)", S.liq.ontvangsten, "in") +
        tbl("Verwachte uitgaven (30 dgn)", S.liq.uitgaven, "out") +
      '</div>' +
      '<div style="padding:0 20px 24px"><div class="dash-card"><div style="padding:16px">' +
        liqRow("Beginsaldo (huidige cashpositie)", cash, false) +
        liqRow("Verwachte ontvangsten", inSum, false) +
        liqRow("Verwachte uitgaven", -outSum, false) +
        liqRow("Prognose-eindsaldo over 30 dagen", eind, true) +
      '</div></div></div>';
  }
  function liqRow(label, v, grand) {
    return '<div style="display:flex;justify-content:space-between;padding:' + (grand ? "12px 0 0;border-top:1px solid #e2e6ea;margin-top:6px;font-weight:700;font-size:15px" : "6px 0;font-size:13px") + '"><span>' + esc(label) + '</span><span style="font-variant-numeric:tabular-nums' + (v < 0 ? ";color:#cc453e" : "") + '">' + money(v) + '</span></div>';
  }

  /* ---------------- SALES LIST ---------------- */
  function renderSales() {
    var tabs = ["Alle regels", "Verkoop", "Facturen", "RMA-orders", "Creditnota's", "Offertes", "Mijn orders", "Uit te leveren", "Kredietstop"];
    $("#view-sales").innerHTML =
      '<div class="page-title-row"><h1>Verkooporders</h1><span class="star">☆</span><span class="spacer"></span>' +
        '<button class="link-btn" data-noop="1">⚙ Aanpassingen ▾</button></div>' +
      '<div class="grid-toolbar">' +
        gt("refresh") + gt("undo") + '<button class="gt add" data-action="new-order" data-tour="new-order">' + ic("plus") + '</button>' +
        gt("pencil") + gt("fit") + gt("excel") + gt("filter") +
      '</div>' +
      '<div class="list-tabs">' + tabs.map(function (t, i) { return '<button class="list-tab' + (i === 0 ? " active" : "") + '" data-noop="1">' + esc(t) + '</button>'; }).join("") + '</div>' +
      '<div class="grid-scroll"><table class="grid"><thead>' +
        '<tr><th></th><th>Or.</th><th>Ordernr.</th><th>Status</th><th>Datum</th><th>Geplande verzending</th><th>Debiteur</th><th>Naam debiteur</th><th class="num">Besteld aantal</th><th class="num">Totaal order</th><th>Val.</th><th>Verzendnummer</th><th>Paklijst afgedr.</th><th>Pakbon afgedr.</th></tr>' +
        '<tr class="filter-row"><td></td><td></td>' + Array(12).fill('<td><input placeholder="Zoeken"></td>').join("") + '</tr>' +
      '</thead><tbody>' + salesRows() + '</tbody></table></div>' +
      '<div class="grid-foot">1-' + S.salesOrders.length + ' van ' + S.salesOrders.length + ' regels' +
        '<span class="pager"><span class="pg">' + ic("first") + '</span><span class="pg">' + ic("prev") + '</span><span class="cur">1</span> van 1 pagina’s<span class="pg">' + ic("next") + '</span><span class="pg">' + ic("last") + '</span></span></div>';
  }
  function gt(name) { return '<button class="gt" data-noop="1">' + ic(name) + '</button>'; }
  function salesRows() {
    return S.salesOrders.map(function (o) {
      var aantal = Math.max(1, Math.round(o.total / 400));
      return '<tr>' +
        '<td><span style="color:#8a97a1">' + ic("clip") + '</span></td>' +
        '<td><span class="so-type">SO</span></td>' +
        '<td><span class="lnk" data-action="open-order" data-id="' + o.id + '">' + o.id + '</span></td>' +
        '<td>' + esc(o.status) + '</td><td>' + o.date + '</td><td>' + o.date + '</td>' +
        '<td>' + o.code + '</td><td>' + esc(o.name) + '</td>' +
        '<td class="num">' + aantal + '</td><td class="num">' + money(o.total) + '</td><td>EUR</td>' +
        '<td>' + (o.verz ? '<span class="lnk" data-noop="1">' + o.verz + '</span>' : "") + '</td>' +
        '<td><span class="cellchk' + (o.pak ? " on" : "") + '"></span></td>' +
        '<td><span class="cellchk' + (o.pakbon ? " on" : "") + '"></span></td></tr>';
    }).join("");
  }

  /* ---------------- MODERN ORDER SCREEN ---------------- */
  var draft = null;
  function openOrder(existingId) {
    var ex = existingId ? S.salesOrders.find(function (o) { return o.id === existingId; }) : null;
    draft = {
      id: ex ? ex.id : "<nieuw>",
      status: ex ? ex.status : "Open",
      code: ex ? ex.code : "",
      locatie: "HOOFD - Hoofdmagazijn",
      datum: DEMO_TODAY, leverdatum: DEMO_TODAY,
      project: "X - Non-Project Code",
      omschrijving: "",
      lines: ex ? demoLinesFor(ex) : [],
      readonly: !!ex, shipment: ex ? ex.verz : ""
    };
    renderOrder();
    showView("order");
  }
  function demoLinesFor(o) { // genereer plausibele regels voor een bestaande order
    var n = (o.total > 3000) ? 3 : 2, lines = [], pool = S.products.slice();
    for (var i = 0; i < n; i++) { var p = pool[(parseInt(o.id.slice(-2)) + i) % pool.length]; lines.push({ sku: p.sku, aantal: 1 + ((i + 2) % 4) }); }
    return lines;
  }
  function orderTotals() {
    var net = 0, cost = 0;
    draft.lines.forEach(function (l) { var p = product(l.sku); if (!p) return; net += p.price * l.aantal; cost += p.cost * l.aantal; });
    return { net: net, cost: cost, winst: net - cost, vat: net * 0.21, total: net * 1.21, marge: net > 0 ? (net - cost) / net * 100 : 0, aantal: draft.lines.reduce(function (a, l) { return a + (+l.aantal || 0); }, 0) };
  }
  function renderOrder() {
    var ro = draft.readonly;
    var custOpts = '<option value="">Zoeken naar...</option>' + S.customers.map(function (c) { return '<option value="' + c.code + '"' + (c.code === draft.code ? " selected" : "") + '>' + c.code + " - " + esc(c.name) + '</option>'; }).join("");
    var statusCls = draft.status === "Geblokkeerd" ? "blocked" : "open";
    $("#view-order").innerHTML =
      '<div class="page-title-row"><h1>Verkooporders (nieuwe versie)</h1><span class="star">☆</span></div>' +
      '<div class="msub">' +
        '<button class="back" data-nav="sales">' + ic("prev") + ' Terug</button>' +
        '<span class="typebox">SO (Verkooporder) <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a6b78" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>' +
        '<span class="recnav"><span class="rb">' + ic("first") + '</span><span class="rb">' + ic("prev") + '</span></span>' +
        '<span class="newbox">' + esc(draft.id) + '</span>' +
        '<span class="recnav"><span class="rb">' + ic("next") + '</span><span class="rb">' + ic("last") + '</span></span>' +
        '<span class="mright">' +
          '<span class="acties" data-action="order-acties">Acties <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a6b78" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>' +
          '<span class="mico save">' + ic("save") + '</span><span class="mico">' + ic("plus") + '</span>' +
        '</span>' +
      '</div>' +
      '<div class="mbody">' +
        '<div><div class="mstatus"><span class="pill ' + statusCls + '">' + esc(draft.status) + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span></div>' +
          '<div class="mform">' +
            mf("Debiteur", '<select class="minput" data-action="order-cust"' + (ro ? " disabled" : "") + '>' + custOpts + '</select>', true) +
            mf("Locatie", inp(draft.locatie, ro), true) +
            mf("Datum", inp(draft.datum, true)) +
            mf("Gewenste leverdatum", inp(draft.leverdatum, true)) +
            mf("Contactpersoon", ph("Zoeken naar...", ro)) +
            mf("Debiteurorder", ph("", ro)) +
            mf("Externe referentie", ph("", ro)) +
            mf("Vervoersmethode", ph("Zoeken naar...", ro)) +
            mf("Verkoper", ph("Zoeken naar...", ro)) +
            mf("Project", inp(draft.project, true), true) +
            mf("Hoofddebiteur", ph("", ro)) +
            '<div class="mfield col2"><label>Omschrijving</label><textarea class="mtextarea" placeholder="Voer hier geen gevoelige informatie in"' + (ro ? " disabled" : "") + '>' + esc(draft.omschrijving) + '</textarea></div>' +
            '<div class="mfield col2"><label>Notities</label><textarea class="mtextarea" placeholder="Voer hier geen gevoelige informatie in"' + (ro ? " disabled" : "") + '></textarea></div>' +
          '</div>' +
        '</div>' +
        '<div class="msummary" id="order-summary"></div>' +
      '</div>' +
      '<div class="mtabs">' + ["Orderregels", "Btw-gegevens", "Provisies", "Financiële instellingen", "Betalingsinstellingen", "Instellingen verzendingen", "Kortingsgegevens", "Verzendingen", "Betalingen", "Totaal", "Webhook-melding"].map(function (t, i) { return '<button class="mtab' + (i === 0 ? " active" : "") + '" data-noop="1">' + esc(t) + '</button>'; }).join("") + '</div>' +
      '<div class="mline-tools"><button class="mlb add" data-action="order-add-line" data-tour="add-line"' + (ro ? " disabled" : "") + '>' + ic("plus") + '</button><button class="mlb" data-noop="1">' + ic("trash") + '</button><span class="spacer"></span></div>' +
      (ro ? "" : '<div class="msearch"><input placeholder="Artikelen zoeken — klik + om een regel toe te voegen" readonly></div>') +
      '<div class="grid-scroll"><table class="grid"><thead><tr><th></th><th>Sortering</th><th>Regel</th><th>Artikel</th><th>Regelomschrijving</th><th>Eenheid</th><th class="num">Beschikbaar v. verzending</th><th class="num">Aantal</th><th class="num">Artikelprijs</th><th class="num">Regeltotaal</th><th class="num">Toeslag</th><th class="num">Niet-gefact. bedrag</th></tr></thead><tbody id="order-lines">' + orderLinesHtml() + '</tbody></table></div>' +
      '<div class="mbottom"><span class="feedback">👍 Geef feedback ▾</span>' +
        '<span class="net"><span id="order-count" class="nl"></span><br><span class="nv"><b>Netto totaal</b><span id="order-net">€ 0,00</span></span></span>' +
        '<button class="btn btn-secondary" data-action="order-preview">Voorbeeldweergave document</button>' +
        '<button class="btn btn-primary" data-action="order-ship"' + (ro ? " disabled" : "") + '>Verzending aanmaken</button>' +
      '</div>';
    updateOrderSummary();
  }
  function mf(label, inner, req) { return '<div class="mfield"><label>' + (req ? '<span class="req">*</span>' : "") + esc(label) + '</label>' + inner + '</div>'; }
  function inp(val, ro) { return '<input class="minput" value="' + esc(val) + '"' + (ro ? " disabled" : "") + '>'; }
  function ph(p, ro) { return '<input class="minput" placeholder="' + esc(p) + '"' + (ro ? " disabled" : "") + '>'; }
  function orderLinesHtml() {
    if (!draft.lines.length) return '<tr><td colspan="12" style="text-align:center;color:#8a97a1;padding:26px">Nog geen orderregels — klik op <b>+</b> om een artikel toe te voegen.</td></tr>';
    return draft.lines.map(function (l, i) {
      var p = product(l.sku);
      var opts = S.products.map(function (pp) { return '<option value="' + pp.sku + '"' + (pp.sku === l.sku ? " selected" : "") + '>' + pp.sku + " - " + esc(pp.name) + '</option>'; }).join("");
      return '<tr data-line="' + i + '"><td style="color:#c4ced6">⋮⋮</td><td>' + ((i + 1) * 10) + '</td><td>' + (i + 1) + '</td>' +
        '<td>' + (draft.readonly ? esc(p.sku) : '<select class="winput" data-action="line-sku" data-i="' + i + '" style="min-width:150px">' + opts + '</select>') + '</td>' +
        '<td>' + esc(p.name) + '</td><td>' + p.unit + '</td>' +
        '<td class="num">' + p.stock + '</td>' +
        '<td class="num">' + (draft.readonly ? l.aantal : '<input class="winput num" type="number" min="1" value="' + l.aantal + '" data-action="line-qty" data-i="' + i + '" style="width:64px">') + '</td>' +
        '<td class="num">' + money(p.price) + '</td><td class="num">' + money(p.price * l.aantal) + '</td><td class="num">0,00</td><td class="num">' + money(p.price * l.aantal) + '</td></tr>';
    }).join("");
  }
  function updateOrderSummary() {
    var t = orderTotals();
    var s = $("#order-summary");
    if (s) s.innerHTML =
      '<div class="msum-top">' + donut(t.marge) +
        '<div class="msum-kpis"><div class="r"><span class="sw" style="background:#1f7f94"></span><span class="lab">Kosten</span><span class="amt">' + money(t.cost) + '</span></div>' +
        '<div class="r"><span class="sw" style="background:#9ecb45"></span><span class="lab">Winst</span><span class="amt">' + money(t.winst) + '</span></div></div>' +
      '</div>' +
      '<div class="msum-rows">' +
        row("Belastbaar bedrag", t.net) + row("Btw-bedrag", t.vat) + row("Vrijgesteld bedrag", 0) +
        row("Factuurkorting", 0) + row("Regelkorting", 0) +
        '<div class="mr grand"><span>Totaal order</span><span class="v">' + money(t.total) + '</span></div>' +
      '</div>';
    var net = $("#order-net"); if (net) net.textContent = "€ " + money(t.net);
    var cnt = $("#order-count"); if (cnt) cnt.textContent = draft.lines.length + " regel(s) in deze verkooporder";
  }
  function row(l, v) { return '<div class="mr"><span>' + l + '</span><span class="v">' + money(v) + '</span></div>'; }

  function orderShip() {
    if (!draft.code) { toast("Debiteur ontbreekt", "Kies eerst een debiteur bovenaan.", "warn"); return; }
    if (!draft.lines.length) { toast("Geen orderregels", "Voeg minstens één artikel toe met +.", "warn"); return; }
    var t = orderTotals();
    draft.lines.forEach(function (l) { var p = product(l.sku); if (p) p.stock = Math.max(0, p.stock - l.aantal); });
    var cust = customer(draft.code);
    var oid = String(S.counters.order++), ship = String(S.counters.shipment++);
    var order = so(oid, "In verzending", DEMO_TODAY, draft.code, cust.name, t.total, ship, 1, 0);
    order.lines = draft.lines.slice(); order.net = t.net; order.vat = t.vat;
    S.salesOrders.unshift(order);
    draft.id = oid; draft.status = "In verzending"; draft.shipment = ship; draft.readonly = true; draft._order = order;
    renderOrder();
    var m = el('<div class="modal"></div>');
    m.innerHTML = '<div class="modal-head"><h2>Verzending ' + ship + ' aangemaakt</h2><span class="sub">pakbon automatisch gegenereerd</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body"><p style="margin-top:0;color:#5a6b78">De order is bevestigd en de <b>voorraad is automatisch afgeboekt</b>. In Visma Net stroomt dit zonder overtypen door naar de verkoopfactuur.</p>' + docHtml(order, "PAKBON", false) + '</div>' +
      '<div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal">Sluiten</button><span class="spacer"></span>' +
      '<button class="btn btn-primary" data-action="make-invoice" data-id="' + oid + '">Factuur aanmaken →</button></div>';
    openModal(m);
    toast("Verzending " + ship + " aangemaakt", "Voorraad automatisch afgeboekt.", "");
  }

  /* ---------------- SALES INVOICE (classic window AR301000) ---------------- */
  function makeInvoice(id) {
    var o = S.salesOrders.find(function (x) { return x.id === id; }); if (!o) return;
    if (!o.invoiceNo) o.invoiceNo = String(S.counters.invoice++);
    if (o.istatus !== "Open" && o.istatus !== "verzonden") o.istatus = "In balans";
    var cust = customer(o.code) || { name: o.name, terms: "30 - 30 dagen" };
    var net = o.net != null ? o.net : o.total / 1.21, vat = o.vat != null ? o.vat : o.total - net;
    var lines = (o.lines || []).map(function (l) { var p = product(l.sku); return p ? { p: p, q: l.aantal } : null; }).filter(Boolean);
    var m = el('<div class="modal wide"></div>');
    m.innerHTML =
      '<div class="modal-head"><h2>Verkoopfacturen</h2><span class="sub">AR301000 · ' + esc(cust.name) + '</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body" style="padding:0">' +
        '<div class="wtoolbar">' +
          wtb("save", "Opslaan en sluiten", "text") + wtbIco("undo") + wtbIco("plus", "add") + wtbIco("trash") + '<span class="sep"></span>' +
          wtbIco("first") + wtbIco("prev") + wtbIco("next") + wtbIco("last") + '<span class="sep"></span>' +
          '<button class="tb text strong" data-action="inv-release" data-id="' + id + '">Vrijgeven</button>' +
          '<button class="tb text" data-action="inv-acties" data-id="' + id + '">Acties <span class="caret">▾</span></button>' +
          '<button class="tb text" data-noop="1">Analyses <span class="caret">▾</span></button>' +
          '<button class="tb text" data-noop="1">Rapporten <span class="caret">▾</span></button>' +
        '</div>' +
        '<div class="wform"><div class="wform-grid">' +
          wf("Soort", '<span class="val">Factuur</span>') +
          wf("Debiteur", '<span class="val">' + o.code + ' - ' + esc(cust.name) + '</span>') +
          wfAmt("Totaal", o.total) +
          wf("Referentienr.", '<span class="val">' + o.invoiceNo + '</span>') +
          wf("Locatie", '<span class="val">' + esc(cust.name) + '</span>') +
          wfAmt("Btw-bedrag", vat) +
          wf("Status", '<span class="status-inline" id="inv-status">' + (o.istatus || "In balans") + '</span>') +
          wf("Valuta", '<span class="val">EUR · 1,00</span>') +
          wfAmt("Belastbaar bedr.", net) +
          wf("Datum", '<span class="val">' + DEMO_TODAY + '</span>') +
          wf("Voorwaarden", '<span class="val">' + cust.terms + '</span>') +
          wfAmt("Saldo", (o.istatus === "verzonden") ? 0 : o.total) +
          wf("Periode", '<span class="val">10-2026</span>') +
          wf("Project", '<span class="val">X - Non-Project Code</span>') +
        '</div></div>' +
        '<div class="wtabs">' + ["Documentgegevens", "Financiële gegevens", "Factuuradres", "Btw-gegevens", "Kortingsgegevens", "Betalingen", "Bijlagen"].map(function (t, i) { return '<button class="wtab' + (i === 0 ? " active" : "") + '" data-noop="1">' + esc(t) + '</button>'; }).join("") + '</div>' +
        '<div class="grid-toolbar">' + gt("refresh") + '<button class="gt add" data-noop="1">' + ic("plus") + '</button>' + gt("pencil") + gt("fit") + gt("excel") + '</div>' +
        '<div class="grid-scroll"><table class="grid"><thead><tr><th>*Vestiging</th><th>Artikel</th><th>Omschrijving transactie</th><th class="num">Aantal</th><th>Eenh.</th><th class="num">Artikelprijs</th><th class="num">Bedrag</th><th>*Rekening</th><th>Omschrijving</th><th>*Subrekening</th></tr></thead><tbody>' +
          lines.map(function (r) {
            return '<tr><td>HOOFD</td><td>' + esc(r.p.sku) + '</td><td>' + esc(r.p.name) + '</td><td class="num">' + r.q + '</td><td>' + r.p.unit + '</td>' +
              '<td class="num">' + money(r.p.price) + '</td><td class="num">' + money(r.p.price * r.q) + '</td><td>8000 - Omzet handelsgoederen</td><td>Verkoop</td><td>000-000</td></tr>';
          }).join("") +
        '</tbody></table></div>' +
      '</div>' +
      '<div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal">Later</button><span class="spacer"></span>' +
        '<div id="inv-foot-action">' +
          ((o.istatus === "verzonden") ? '<button class="btn btn-secondary" data-action="close-modal">Reeds verzonden via Peppol ✓</button>'
            : (o.istatus === "Open") ? '<button class="btn btn-primary" data-action="send-peppol" data-id="' + id + '">' + ic("plus") + 'Verzenden via AutoInvoice (Peppol)</button>'
            : '<button class="btn btn-primary" data-action="inv-release" data-id="' + id + '">Vrijgeven</button>') +
        '</div>' +
      '</div>';
    openModal(m);
  }
  function wtb(icoName, label, cls) { return '<button class="tb ' + (cls || "") + '" data-noop="1">' + ic(icoName) + label + '</button>'; }
  function wtbIco(icoName, cls) { return '<button class="tb ' + (cls || "") + '" data-noop="1">' + ic(icoName) + '</button>'; }
  function wf(label, inner) { return '<div class="wfield"><label>' + esc(label) + '</label>' + inner + '</div>'; }
  function wfAmt(label, v) { return '<div class="wfield"><label>' + esc(label) + '</label><span class="amount">' + money(v) + '</span></div>'; }

  function invRelease(id) {
    var o = S.salesOrders.find(function (x) { return x.id === id; }); if (!o) return;
    o.istatus = "Open";
    var st = $("#inv-status"); if (st) st.textContent = "Open";
    var fa = $("#inv-foot-action"); if (fa) fa.innerHTML = '<button class="btn btn-primary" data-action="send-peppol" data-id="' + id + '">' + ic("plus") + 'Verzenden via AutoInvoice (Peppol)</button>';
    toast("Factuur vrijgegeven", "Status is nu Open. Verzend 'm nu via AutoInvoice.", "info");
  }
  function invActies(id, anchor) {
    openMenu(anchor, [
      { label: "Verzenden via AutoInvoice (Peppol)", action: function () { sendPeppol(id); } },
      { label: "Correctiefactuur maken", dim: true },
      { label: "Afdrukken / downloaden", dim: true }
    ]);
  }
  function sendPeppol(id) {
    var o = S.salesOrders.find(function (x) { return x.id === id; }); if (!o) return;
    if (o.istatus !== "Open") o.istatus = "Open";
    var m = el('<div class="modal"></div>');
    m.innerHTML = '<div class="modal-head"><h2>AutoInvoice</h2><span class="sub">e-factuur via het Peppol-netwerk</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body"><div class="sending" id="send-area"><div class="spin"></div><h3>Factuur ' + (o.invoiceNo || "") + ' wordt verzonden…</h3><p>Visma Net kiest automatisch het juiste kanaal op basis van de debiteurgegevens.</p>' +
      '<div class="send-steps" id="send-steps">' + ss("Factuur omgezet naar e-factuur (UBL / Peppol BIS 3.0)") + ss("Ontvanger opgezocht in het Peppol-register") + ss("Verzonden via het Peppol-netwerk") + '</div></div></div>';
    openModal(m);
    var steps = $all("#send-steps .ss"), i = 0;
    var iv = setInterval(function () {
      if (i < steps.length) { steps[i].classList.add("done"); steps[i].querySelector(".mk").innerHTML = ic("check"); i++; }
      else {
        clearInterval(iv); o.istatus = "verzonden";
        $("#send-area").innerHTML = '<div class="check">' + '<svg viewBox="0 0 24 24" fill="none" stroke="#2f8c4f" stroke-width="2.5" style="width:30px;height:30px">' + I.check + '</svg></div>' +
          '<h3>Verzonden via Peppol ✓</h3><p>De klant ontvangt de e-factuur direct in zijn eigen boekhouding. Verwerkingstijd: <b>minder dan 1 minuut</b> in plaats van ~10 minuten handmatig.</p><div style="margin-top:18px"><button class="btn btn-primary" data-action="after-peppol">Klaar</button></div>';
        toast("Factuur verzonden via Peppol", "Order volledig afgerond (order → verzending → factuur → verzonden).", "");
      }
    }, 650);
  }
  function ss(t) { return '<div class="ss"><span class="mk"></span>' + esc(t) + '</div>'; }
  function docHtml(o, title, withTotals) {
    var cust = customer(o.code) || { name: o.name, city: "", terms: "30 - 30 dagen" };
    var lines = (o.lines || []).map(function (l) { var p = product(l.sku); return p ? '<tr><td>' + esc(p.name) + '<br><span style="color:#8a97a1;font-size:11px">' + p.sku + '</span></td><td class="r">' + l.aantal + '</td><td class="r">' + money(p.price) + '</td><td class="r">' + money(p.price * l.aantal) + '</td></tr>' : ""; }).join("");
    var net = o.net != null ? o.net : o.total / 1.21;
    var totals = withTotals ? '<div style="margin-left:auto;width:230px;margin-top:12px"><div style="display:flex;justify-content:space-between;padding:3px 0;font-size:12.5px"><span>Subtotaal</span><span>' + money(net) + '</span></div><div style="display:flex;justify-content:space-between;padding:3px 0;font-size:12.5px"><span>Btw 21%</span><span>' + money(o.total - net) + '</span></div><div style="display:flex;justify-content:space-between;padding:8px 0 0;border-top:1px solid #e2e6ea;font-weight:700"><span>Te voldoen</span><span>' + money(o.total) + '</span></div></div>' : "";
    return '<div class="doc"><div class="top"><div><div class="title">' + title + '</div><div style="margin-top:8px;font-weight:600">' + esc(S.company.name) + '</div><div style="color:#5a6b78;font-size:12px">Havenweg 12 · 2201 Noordwijk</div></div><div class="meta">' + (title === "FACTUUR" ? "Factuurnr. " + (o.invoiceNo || "") : "Verzending " + (o.verz || "")) + '<br>Datum: ' + (o.date || DEMO_TODAY) + '<br>Betaaltermijn: ' + cust.terms + '</div></div>' +
      '<div style="font-size:12px;color:#5a6b78">Aan</div><div style="font-weight:600;margin-bottom:6px">' + esc(cust.name) + (cust.city ? ' · ' + cust.city : "") + '</div>' +
      '<table><thead><tr><th>Artikel</th><th class="r">Aantal</th><th class="r">Prijs</th><th class="r">Totaal</th></tr></thead><tbody>' + lines + '</tbody></table>' + totals + '</div>';
  }

  /* ---------------- PURCHASE (inkoopfacturen + approval) ---------------- */
  function renderPurchase() {
    $("#view-purchase").innerHTML =
      '<div class="page-title-row"><h1>Inkoopfacturen</h1><span class="star">☆</span><span class="spacer"></span><button class="link-btn" data-noop="1">⚙ Aanpassingen ▾</button></div>' +
      '<div class="grid-toolbar">' + gt("refresh") + gt("undo") + gt("fit") + gt("excel") + gt("filter") + '</div>' +
      '<div class="list-tabs"><button class="list-tab active" data-noop="1">Alle facturen</button><button class="list-tab" data-noop="1">Te keuren</button><button class="list-tab" data-noop="1">Goedgekeurd</button></div>' +
      '<div class="grid-scroll"><table class="grid"><thead><tr><th></th><th>Soort</th><th>Referentienr.</th><th>Crediteur</th><th>Datum</th><th>Binnengekomen via</th><th class="num">Bedrag (incl. btw)</th><th>Status</th><th></th></tr></thead><tbody id="purchase-rows">' + purchaseRows() + '</tbody></table></div>' +
      '<div class="grid-foot">1-' + S.purchaseInvoices.length + ' van ' + S.purchaseInvoices.length + ' regels</div>';
  }
  function purchaseRows() {
    return S.purchaseInvoices.map(function (inv) {
      var st = inv.status === "te keuren" ? "Ter goedkeuring" : inv.status === "geboekt" ? "Goedgekeurd & vrijgegeven" : "Afgekeurd";
      var btn = '<button class="btn btn-sm ' + (inv.status === "te keuren" ? "btn-primary" : "btn-secondary") + '" data-action="open-invoice" data-id="' + inv.id + '">' + (inv.status === "te keuren" ? "Beoordelen" : "Bekijken") + '</button>';
      return '<tr><td><span style="color:#8a97a1">' + ic("clip") + '</span></td><td><span class="so-type">AP</span></td><td class="lnk" data-action="open-invoice" data-id="' + inv.id + '">' + inv.id + '</td><td>' + esc(inv.supplier) + '</td><td>' + inv.date + '</td><td>' + esc(inv.channel) + '</td><td class="num">' + money(inv.total) + '</td><td>' + esc(st) + '</td><td style="text-align:right">' + btn + '</td></tr>';
    }).join("");
  }
  function openInvoice(id) {
    var inv = S.purchaseInvoices.find(function (i) { return i.id === id; }); if (!inv) return;
    var m = el('<div class="modal wide"></div>');
    m.innerHTML =
      '<div class="modal-head"><h2>Inkoopfacturen</h2><span class="sub">AP301000 · ' + esc(inv.id) + ' · ' + esc(inv.channel) + '</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body" style="padding:0">' +
        '<div class="wtoolbar">' + wtb("save", "Opslaan en sluiten", "text") + wtbIco("undo") + wtbIco("plus", "add") + wtbIco("trash") + '<span class="sep"></span>' + wtbIco("first") + wtbIco("prev") + wtbIco("next") + wtbIco("last") + '<span class="sep"></span>' +
          '<button class="tb text" data-noop="1">Acties <span class="caret">▾</span></button><button class="tb text" data-noop="1">Rapporten <span class="caret">▾</span></button></div>' +
        '<div style="padding:18px"><div class="wform-grid" style="gap:16px 28px">' +
          '<div><div style="font-weight:600;font-size:13px;margin-bottom:10px">Automatisch herkend <span class="recog-tag">SmartScan</span></div>' +
            recogF("Crediteur", esc(inv.supplier)) + recogF("Factuurdatum", inv.date) + recogF("Grootboekrekening (voorstel)", esc(inv.account)) +
            '<div style="display:flex;gap:10px">' + recogF("Bedrag excl. btw", money(inv.net)) + recogF("Btw", money(inv.vat)) + '</div>' +
            recogF("Totaal incl. btw", '<b style="font-size:15px">' + money(inv.total) + '</b>') +
          '</div>' +
          '<div><div style="font-weight:600;font-size:13px;margin-bottom:12px">Goedkeuringsworkflow</div><ul class="timeline" id="appr-timeline">' + apprTimeline(inv) + '</ul>' +
            (inv.status === "te keuren" ? apprHint(inv) : "") + '</div>' +
        '</div></div>' +
      '</div>' +
      '<div class="modal-foot">' + footButtons(inv) + '</div>';
    openModal(m);
    setTimeout(function () { $all(".recog").forEach(function (n) { n.classList.add("animate"); }); }, 80);
  }
  function recogF(label, val) { return '<div class="recog" style="margin-bottom:12px"><label style="font-size:12px;color:#5a6b78;display:block;margin-bottom:4px">' + esc(label) + '</label><div style="border:1px solid #c4ced6;border-radius:4px;background:#fafbfc;padding:6px 9px;font-size:13px">' + val + '</div></div>'; }
  function apprTimeline(inv) {
    return inv.steps.map(function (s, i) {
      var cls = s.state === "approved" ? "done" : s.state === "pending" ? "active" : s.state === "rejected" ? "rejected" : "";
      var dot = s.state === "approved" ? '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" style="width:14px;height:14px">' + I.check + '</svg>' : s.state === "rejected" ? "✕" : (i + 1);
      var sub = s.state === "approved" ? "Goedgekeurd door " + esc(s.who) : s.state === "rejected" ? "Afgekeurd door " + esc(s.who) : s.state === "pending" ? "Wacht op " + esc(s.who) : "Daarna: " + esc(s.who);
      return '<li class="' + cls + '"><span class="dot">' + dot + '</span><div><div class="t">' + esc(s.role) + '</div><div class="s">' + sub + '</div></div></li>';
    }).join("");
  }
  function apprHint(inv) {
    var cur = inv.steps.find(function (s) { return s.state === "pending"; }); if (!cur) return "";
    return '<div style="margin-top:6px;padding:11px 13px;background:#edf3fd;border-radius:8px;font-size:12.5px;color:#1f4e66">Jij bent nu aan zet als <b>' + esc(cur.role) + '</b>. ' + (inv.steps.length > 1 ? 'Deze factuur doorloopt ' + inv.steps.length + ' stappen (bedrag-afhankelijk).' : 'Eén goedkeuringsstap voor dit bedrag.') + '</div>';
  }
  function footButtons(inv) {
    if (inv.status !== "te keuren") return '<button class="btn btn-ghost" data-action="close-modal">Sluiten</button>';
    return '<button class="btn btn-danger" data-action="reject-invoice" data-id="' + inv.id + '">Afkeuren</button><span class="spacer"></span><button class="btn btn-success" data-action="approve-invoice" data-id="' + inv.id + '">' + ic("check") + 'Goedkeuren</button>';
  }
  function approveInvoice(id) {
    var inv = S.purchaseInvoices.find(function (i) { return i.id === id; }); if (!inv) return;
    var cur = inv.steps.find(function (s) { return s.state === "pending"; }); if (cur) cur.state = "approved";
    var next = inv.steps.find(function (s) { return s.state === "waiting"; });
    if (next) { next.state = "pending"; $("#appr-timeline").innerHTML = apprTimeline(inv); toast("Stap goedgekeurd", "Doorgestuurd naar " + next.who + " (" + next.role + ").", "info"); }
    else { inv.status = "geboekt"; closeModal(); toast("Factuur " + inv.id + " goedgekeurd & geboekt", "Automatisch verwerkt op " + inv.account + ".", ""); afterPurchase(); }
  }
  function rejectInvoice(id) {
    var inv = S.purchaseInvoices.find(function (i) { return i.id === id; }); if (!inv) return;
    var cur = inv.steps.find(function (s) { return s.state === "pending"; }); if (cur) cur.state = "rejected";
    inv.status = "afgekeurd"; closeModal(); toast("Factuur " + inv.id + " afgekeurd", "Teruggestuurd naar de indiener.", "warn"); afterPurchase();
  }
  function afterPurchase() { if ($("#purchase-rows")) $("#purchase-rows").innerHTML = purchaseRows(); renderDashboard(); }

  /* ---------------- small dropdown menu ---------------- */
  function openMenu(anchor, items) {
    closeMenu();
    var r = anchor.getBoundingClientRect();
    var menu = el('<div id="float-menu" style="position:fixed;z-index:75;background:#fff;border:1px solid #e2e6ea;border-radius:8px;box-shadow:var(--shadow-pop);padding:6px;min-width:240px"></div>');
    items.forEach(function (it) {
      var b = el('<button style="display:block;width:100%;text-align:left;border:none;background:none;padding:9px 11px;border-radius:6px;font-size:13px;' + (it.dim ? "color:#8a97a1" : "color:#1b2b36") + '">' + esc(it.label) + '</button>');
      if (!it.dim) { b.addEventListener("mouseenter", function () { b.style.background = "#f6f8f9"; }); b.addEventListener("mouseleave", function () { b.style.background = "none"; }); b.addEventListener("click", function () { closeMenu(); it.action(); }); }
      menu.appendChild(b);
    });
    document.body.appendChild(menu);
    var top = r.bottom + 6, left = r.left;
    if (left + 250 > window.innerWidth) left = window.innerWidth - 260;
    menu.style.top = top + "px"; menu.style.left = left + "px";
    setTimeout(function () { document.addEventListener("click", closeMenuOnce, { once: true }); }, 0);
  }
  function closeMenuOnce() { closeMenu(); }
  function closeMenu() { var m = $("#float-menu"); if (m) m.remove(); }

  /* ---------------- EVENT DELEGATION ---------------- */
  document.addEventListener("click", function (e) {
    var navEl = e.target.closest("[data-nav]");
    if (navEl) { showView(navEl.getAttribute("data-nav")); markActivity(); return; }
    if (e.target.closest("#ham")) { openFlyout(); markActivity(); return; }
    if (e.target.closest("#flyout-backdrop")) { closeFlyout(); return; }
    var dim = e.target.closest("[data-dim]"); if (dim) { toast("Niet in deze demo", "Deze module zit in het volledige Visma Net. Vraag Consolit naar een persoonlijke demo.", "info"); return; }

    var a = e.target.closest("[data-action]"); if (!a) return;
    var act = a.getAttribute("data-action"), id = a.getAttribute("data-id");
    markActivity();
    switch (act) {
      case "new-order": openOrder(null); break;
      case "open-order": openOrder(id); break;
      case "order-cust": break;
      case "order-add-line": draft.lines.push({ sku: nextSku(), aantal: 1 }); $("#order-lines").innerHTML = orderLinesHtml(); updateOrderSummary(); break;
      case "order-ship": orderShip(); break;
      case "order-preview": if (draft.lines.length) previewDoc(); else toast("Geen regels", "Voeg eerst artikelen toe.", "warn"); break;
      case "order-acties": openMenu(a, [{ label: "Verzending aanmaken", action: orderShip }, { label: "Order kopiëren", dim: true }, { label: "Annuleren", dim: true }]); break;
      case "make-invoice": closeModal(); makeInvoice(id); break;
      case "inv-release": invRelease(id); break;
      case "inv-acties": invActies(id, a); break;
      case "send-peppol": sendPeppol(id); break;
      case "after-peppol": closeModal(); showView("sales"); break;
      case "open-invoice": openInvoice(id); break;
      case "approve-invoice": approveInvoice(id); break;
      case "reject-invoice": rejectInvoice(id); break;
      case "close-modal": closeModal(); break;
      case "reset-demo": resetDemo(); break;
      case "start-tour": startTour(); break;
      case "skip-tour": closeModal(); break;
      case "tour-next": tourStep(TOUR.i + 1); break;
      case "tour-back": tourStep(TOUR.i - 1); break;
      case "tour-end": endTour(); break;
      case "cta-open": window.open(CONFIG.ctaUrl, "_blank", "noopener"); closeModal(); break;
      case "cta-dismiss": closeModal(); break;
    }
    if (a.getAttribute("data-noop")) { /* decoratief */ }
  });
  document.addEventListener("click", function (e) { if (e.target.closest("[data-noop]") && !e.target.closest("[data-action]") && !e.target.closest("[data-nav]")) { /* stil */ } });
  document.addEventListener("change", function (e) {
    var a = e.target.closest("[data-action]"); if (!a) return; markActivity();
    if (a.getAttribute("data-action") === "order-cust") { draft.code = a.value; updateOrderSummary(); }
    if (a.getAttribute("data-action") === "line-sku") { draft.lines[+a.getAttribute("data-i")].sku = a.value; $("#order-lines").innerHTML = orderLinesHtml(); updateOrderSummary(); }
  });
  document.addEventListener("input", function (e) {
    var a = e.target.closest('[data-action="line-qty"]'); if (!a) return; markActivity();
    var i = +a.getAttribute("data-i"), q = Math.max(1, parseInt(a.value || "1", 10)); draft.lines[i].aantal = q;
    var row = a.closest("tr"), p = product(draft.lines[i].sku);
    if (row && p) { row.children[9].textContent = money(p.price * q); row.children[11].textContent = money(p.price * q); }
    updateOrderSummary();
  });
  function nextSku() { var used = draft.lines.map(function (l) { return l.sku; }); var free = S.products.find(function (p) { return used.indexOf(p.sku) === -1; }); return (free || S.products[0]).sku; }
  function previewDoc() {
    var t = orderTotals(); var o = { code: draft.code, name: (customer(draft.code) || {}).name, lines: draft.lines, total: t.total, net: t.net, date: DEMO_TODAY, verz: draft.shipment };
    var m = el('<div class="modal"></div>');
    m.innerHTML = '<div class="modal-head"><h2>Voorbeeldweergave</h2><button class="x" data-action="close-modal">&times;</button></div><div class="modal-body">' + docHtml(o, "ORDERBEVESTIGING", true) + '</div><div class="modal-foot"><span class="spacer"></span><button class="btn btn-secondary" data-action="close-modal">Sluiten</button></div>';
    openModal(m);
  }

  /* ---------------- GUIDED TOUR ---------------- */
  var TOUR = { i: 0, steps: [
    { sel: '[data-tour="dash"]', view: "dashboard", title: "Realtime dashboard", body: "Bij binnenkomst zie je meteen hoe het bedrijf ervoor staat: omzet, cash, openstaande posten en werk dat op je wacht. Sturen in plaats van reageren." },
    { sel: '[data-tour="ham"]', view: "dashboard", title: "Het menu", body: "Via dit menu bereik je alle modules — net als in het echte Visma Net — met een zoekfunctie (Ctrl+O). We bekijken nu Verkoop." },
    { sel: '[data-tour="new-order"]', view: "sales", title: "Nieuwe verkooporder", body: "Hier maak je een order. Je kiest een debiteur en artikelen; voorraad én marge rekenen live mee en er is geen dubbele invoer." },
    { sel: '[data-tour="add-line"]', view: "order", title: "Order-to-cash", body: "Voeg regels toe met +. Rond af met ‘Verzending aanmaken’ → de factuur stroomt door en gaat via AutoInvoice (Peppol) naar de klant." },
    { sel: '[data-tour="ham"]', view: "purchase", title: "Inkoop & goedkeuren", body: "Aan de inkoopkant komen e-facturen automatisch binnen, worden herkend (SmartScan) en doorlopen een goedkeuringsworkflow. Speel gerust zelf verder!" }
  ] };
  function startTour() { closeModal(); TOUR.i = 0; tourStep(0); }
  function tourStep(i) {
    if (i < 0) i = 0; if (i >= TOUR.steps.length) { endTour(); return; }
    TOUR.i = i; var st = TOUR.steps[i];
    if (st.view === "order") { if (!draft) openOrder(null); else showView("order"); } else if (st.view) showView(st.view);
    setTimeout(function () { placeTour(st, i); }, 80);
  }
  function placeTour(st, i) {
    var target = $(st.sel), spot = $("#tour-spot"), pop = $("#tour-pop");
    if (!target || window.innerWidth <= 680) { spot.style.display = "none"; }
    else { var r = target.getBoundingClientRect(), pad = 5; spot.style.display = "block"; spot.style.left = (r.left - pad) + "px"; spot.style.top = (r.top - pad) + "px"; spot.style.width = (r.width + pad * 2) + "px"; spot.style.height = (r.height + pad * 2) + "px"; }
    pop.style.display = "block";
    pop.innerHTML = '<h4>' + esc(st.title) + '</h4><p>' + esc(st.body) + '</p><div class="foot"><span class="cnt">' + (i + 1) + ' / ' + TOUR.steps.length + '</span><span class="spacer"></span>' + (i > 0 ? '<button class="btn btn-ghost btn-sm" data-action="tour-back">Terug</button>' : "") + '<button class="btn btn-primary btn-sm" data-action="' + (i === TOUR.steps.length - 1 ? "tour-end" : "tour-next") + '">' + (i === TOUR.steps.length - 1 ? "Zelf verder" : "Volgende") + '</button></div>';
    var pr = pop.getBoundingClientRect();
    if (target && window.innerWidth > 680) {
      var r2 = target.getBoundingClientRect(), top = r2.bottom + 12, left = r2.left;
      if (top + pr.height > window.innerHeight - 10) top = Math.max(10, r2.top - pr.height - 12);
      if (left + 320 > window.innerWidth - 10) left = window.innerWidth - 330;
      pop.style.transform = "none"; pop.style.top = top + "px"; pop.style.left = left + "px";
    } else { pop.style.top = "50%"; pop.style.left = "50%"; pop.style.transform = "translate(-50%,-50%)"; }
  }
  function endTour() { $("#tour-spot").style.display = "none"; $("#tour-pop").style.display = "none"; }
  window.addEventListener("resize", function () { if ($("#tour-pop").style.display === "block") placeTour(TOUR.steps[TOUR.i], TOUR.i); });

  /* ---------------- CTA (lead) ---------------- */
  var activeSeconds = 0, ctaShown = false, lastActivity = Date.now();
  function markActivity() { lastActivity = Date.now(); }
  setInterval(function () {
    if (ctaShown) return;
    if (Date.now() - lastActivity < 30000) activeSeconds++;
    if (activeSeconds >= CONFIG.ctaAfterSeconds) showCTA();
  }, 1000);
  function showCTA() {
    if (ctaShown) return;
    if ($("#overlay").classList.contains("open")) { activeSeconds = CONFIG.ctaAfterSeconds - 15; return; }
    ctaShown = true;
    var m = el('<div class="modal cta-modal"></div>');
    m.innerHTML = '<div class="cb"><div class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="#ff8e05" stroke-width="2" style="width:28px;height:28px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>' +
      '<h2>Enthousiast over wat je ziet?</h2><p>Je bent al even aan het spelen met de basis. Wil je Visma Net met je <b>eigen</b> processen en cijfers zien? Consolit laat het je vrijblijvend zien.</p>' +
      '<div class="ca"><button class="btn btn-primary" data-action="cta-open" style="height:44px">Plan een persoonlijke demo</button><button class="btn btn-ghost" data-action="cta-dismiss">Nee, ik speel nog even verder</button></div>' +
      '<div class="cmini">Je kunt daarna gewoon doorgaan in de demo.</div></div>';
    openModal(m);
  }

  /* ---------------- WELCOME ---------------- */
  function offerTour() {
    var m = el('<div class="modal welcome"></div>');
    m.innerHTML = '<div class="wb"><svg class="wi" viewBox="0 0 288 288"><path fill="#ff8e05" d="M223.43,111.861c-.48,4.63-3.21,8.96-7.45,11.38l-45.47,26.39c-8.11-4.68-27.819-15.97-27.819-15.97-5.15-3.25-8.44-8.93-8.44-15.21v-49.989c0-3.2,1.7-6.2,4.5-7.5,1.9-1.1,4.3-1.2,6.4,0l68.428,39.469c3.98,2.3,6.09,5.15,6.26,9.2Z"/><path fill="#003253" d="M153.809,164.121v54.485c0,6.864-7.294,11.161-13.299,7.724l-68.428-39.467c-4.5-2.8-7.29-5.79-7.51-10.72.22-4.94,3.01-9.66,7.51-12.24l45.47-26.38c9.66,5.58,25.53,14.59,31.32,18.03,3,1.71,4.93,4.93,4.93,8.57Z"/><path fill="#003253" d="M64.6,176.489c.3-5.01,3.04-9.54,7.48-12.16l45.5-26.49,30.03-17.38c5.36-3.22,8.8-9.01,8.8-15.44v-49.989c0-3.21-1.72-6.22-4.51-7.72-2.57-1.51-6.01-1.51-8.8,0l-68.429,39.479c-4.71,2.78-7.51,7.71-7.51,13.08v74.448z"/></svg>' +
      '<h2>Welkom bij de Visma Net demo</h2><p>Dit is een <b>vrijblijvende sandbox</b> met voorbeeldgegevens van het fictieve bedrijf <b>Noordzee Outdoor B.V.</b> — nagebouwd zoals het echte Visma Net eruitziet en werkt. Je kunt niets kapotmaken.</p>' +
      '<div class="wa"><button class="btn btn-secondary" data-action="skip-tour">Ik kijk zelf rond</button><button class="btn btn-primary" data-action="start-tour">Geef me een korte rondleiding</button></div></div>';
    openModal(m);
  }

  function resetDemo() { S = seedData(); endTour(); showView("dashboard"); toast("Demo gereset", "Alle voorbeeldgegevens staan weer op de beginstand.", "info"); }

  /* ---------------- INIT ---------------- */
  function init() {
    $all("[data-cta-link]").forEach(function (x) { x.setAttribute("href", CONFIG.ctaUrl); });
    renderMenu();
    showView("dashboard");
    if (CONFIG.offerTourOnLoad) setTimeout(offerTour, 450);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
