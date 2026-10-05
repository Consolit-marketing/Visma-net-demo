/* ============================================================
   Visma Net — Interactieve demo (sandbox)
   Volledig client-side. Geen backend, geen echte data.
   Alle gegevens hieronder zijn VERZONNEN (dummy).
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     CONFIG — pas deze aan voor jouw website
     ---------------------------------------------------------- */
  var CONFIG = {
    // Waar de CTA-knoppen naartoe linken (jullie demo-aanvraag / contactpagina):
    ctaUrl: "https://www.consolit.nl/contact",
    // Na hoeveel seconden ACTIEF gebruik verschijnt de lead-pop-up (180 = 3 min):
    ctaAfterSeconds: 180,
    // Toon de welkom/rondleiding-vraag bij het openen:
    offerTourOnLoad: true
  };

  /* ----------------------------------------------------------
     DUMMY DATA (fictief bedrijf: Noordzee Outdoor B.V.)
     ---------------------------------------------------------- */
  function seedData() {
    return {
      company: { name: "Noordzee Outdoor B.V.", year: 2025, currency: "EUR" },

      products: [
        { sku: "TNT-4P",   name: "Familietent Fjord 4",       group: "Tenten",       price: 349.00, stock: 42,  vat: 21 },
        { sku: "SLP-COMF", name: "Slaapzak Comfort -5°",      group: "Slaapzakken",  price: 79.95,  stock: 180, vat: 21 },
        { sku: "STL-ALU",  name: "Campingstoel Aluxe",        group: "Meubilair",    price: 44.50,  stock: 320, vat: 21 },
        { sku: "KKR-2P",   name: "Kookset Trangia 2-pers.",   group: "Koken",        price: 64.90,  stock: 95,  vat: 21 },
        { sku: "LMP-LED",  name: "LED Campinglamp Solar",     group: "Verlichting",  price: 24.95,  stock: 6,   vat: 21 },
        { sku: "MAT-SI",   name: "Slaapmat Self-Inflating",   group: "Slaapcomfort", price: 54.00,  stock: 140, vat: 21 },
        { sku: "KBX-45",   name: "Koelbox Arctic 45L",        group: "Koelen",       price: 129.00, stock: 28,  vat: 21 },
        { sku: "TBL-VOU",  name: "Vouwtafel Compact",         group: "Meubilair",    price: 69.00,  stock: 60,  vat: 21 }
      ],

      customers: [
        { id: "KL-1001", name: "De Kampeervriend",             city: "Utrecht",   terms: "30 dagen" },
        { id: "KL-1002", name: "Outdoor World Rotterdam",       city: "Rotterdam", terms: "30 dagen" },
        { id: "KL-1003", name: "Buitensport Jansen",            city: "Zwolle",    terms: "14 dagen" },
        { id: "KL-1004", name: "Camping De Duinrand",           city: "Noordwijk", terms: "30 dagen" },
        { id: "KL-1005", name: "Avontuur Retail B.V.",          city: "Eindhoven", terms: "60 dagen" },
        { id: "KL-1006", name: "Recreatie Groothandel Noord",   city: "Groningen", terms: "30 dagen" }
      ],

      salesOrders: [
        { id: "VO-20481", customer: "Outdoor World Rotterdam", date: "02-10-2025", status: "verzonden", invoiceNo: "VF-30109",
          lines: [ { sku: "TNT-4P", qty: 8 }, { sku: "STL-ALU", qty: 12 } ] },
        { id: "VO-20482", customer: "De Kampeervriend", date: "03-10-2025", status: "pakbon",
          lines: [ { sku: "SLP-COMF", qty: 10 }, { sku: "MAT-SI", qty: 6 } ] },
        { id: "VO-20483", customer: "Buitensport Jansen", date: "03-10-2025", status: "open",
          lines: [ { sku: "KKR-2P", qty: 6 }, { sku: "LMP-LED", qty: 4 } ] }
      ],

      purchaseInvoices: [
        {
          id: "IF-90231", supplier: "Tentpoint Supplies B.V.", date: "01-10-2025",
          channel: "Peppol (e-factuur)", net: 7000.00, vat: 1470.00, total: 8470.00,
          glAccount: "7000 · Inkoopwaarde handelsgoederen",
          status: "te keuren",
          steps: [
            { role: "Inkoop", who: "Mark de Vries", state: "pending" },
            { role: "Financieel manager (> € 5.000)", who: "Sandra Bos", state: "waiting" }
          ]
        },
        {
          id: "IF-90232", supplier: "Fjordtex Fabrics", date: "02-10-2025",
          channel: "Peppol (e-factuur)", net: 2100.00, vat: 441.00, total: 2541.00,
          glAccount: "7000 · Inkoopwaarde handelsgoederen",
          status: "te keuren",
          steps: [ { role: "Inkoop", who: "Mark de Vries", state: "pending" } ]
        },
        {
          id: "IF-90233", supplier: "Logistiek Partner Zuid", date: "02-10-2025",
          channel: "E-mail (PDF, via SmartScan)", net: 800.00, vat: 168.00, total: 968.00,
          glAccount: "4210 · Vrachtkosten",
          status: "te keuren",
          steps: [ { role: "Inkoop", who: "Mark de Vries", state: "pending" } ]
        }
      ],

      // Dashboard cijfers
      kpi: {
        revenueYTD: 1284500,   // omzet YTD (excl. btw)
        receivables: 186400,   // openstaand debiteuren (incl. btw)
        cash: 342900           // cashpositie
      },
      revenueByMonth: [86, 92, 104, 98, 112, 121, 134, 128, 141, 136, 0, 0], // x1000, nov/dec leeg (lopend jaar)
      topCustomers: [
        { name: "Outdoor World Rotterdam", amount: 214300 },
        { name: "Avontuur Retail B.V.",    amount: 178900 },
        { name: "Recreatie Groothandel Noord", amount: 141200 },
        { name: "De Kampeervriend",        amount: 98600 },
        { name: "Camping De Duinrand",     amount: 72400 }
      ],
      counters: { nextOrder: 20484, nextInvoice: 30112 }
    };
  }

  function computeTotals(products, lines) {
    var net = 0, vat = 0;
    (lines || []).forEach(function (l) {
      var p = products.find(function (x) { return x.sku === l.sku; }); if (!p) return;
      var ln = p.price * l.qty; net += ln; vat += ln * p.vat / 100;
    });
    return { net: net, vat: vat, total: net + vat };
  }
  function normalizeOrders(d) {
    d.salesOrders.forEach(function (o) { var t = computeTotals(d.products, o.lines); o.net = t.net; o.vat = t.vat; o.total = t.total; });
  }

  var S = seedData(); normalizeOrders(S);
  var PALETTE = ["#3a837e", "#bb5822", "#366af6", "#448548", "#591ab5", "#cc453e", "#377ea0", "#e1b402"];

  /* ----------------------------------------------------------
     HELPERS
     ---------------------------------------------------------- */
  var eur0 = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var eur2 = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
  function money(n) { return eur2.format(n); }
  function money0(n) { return eur0.format(n); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function product(sku) { return S.products.find(function (p) { return p.sku === sku; }); }
  function pendingCount() { return S.purchaseInvoices.filter(function (i) { return i.status === "te keuren"; }).length; }

  /* ----------------------------------------------------------
     TOASTS
     ---------------------------------------------------------- */
  function toast(title, body, kind) {
    var t = el('<div class="toast ' + (kind || "") + '"><div class="tt">' + esc(title) + '</div>' +
      (body ? '<div class="tb">' + esc(body) + '</div>' : '') + '</div>');
    $("#toasts").appendChild(t);
    setTimeout(function () { t.style.transition = "opacity .3s"; t.style.opacity = "0"; setTimeout(function () { t.remove(); }, 300); }, 4200);
  }

  /* ----------------------------------------------------------
     MODAL
     ---------------------------------------------------------- */
  function openModal(node) {
    var host = $("#overlay-content"); host.innerHTML = ""; host.appendChild(node);
    $("#overlay").classList.add("open");
  }
  function closeModal() { $("#overlay").classList.remove("open"); $("#overlay-content").innerHTML = ""; }

  /* ----------------------------------------------------------
     SVG CHARTS
     ---------------------------------------------------------- */
  function barChart(values, labels) {
    var W = 560, H = 220, padL = 42, padB = 26, padT = 10, padR = 8;
    var max = Math.max.apply(null, values.concat([1]));
    var niceMax = Math.ceil(max / 20) * 20;
    var cw = (W - padL - padR) / values.length;
    var bars = "", grid = "", xlabels = "";
    for (var g = 0; g <= 4; g++) {
      var gy = padT + (H - padT - padB) * (g / 4);
      var gv = Math.round(niceMax * (1 - g / 4));
      grid += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="#e2e4e9" stroke-dasharray="3 3"/>';
      grid += '<text x="' + (padL - 7) + '" y="' + (gy + 3) + '" text-anchor="end" font-size="10" fill="#8f95a4">' + gv + '</text>';
    }
    values.forEach(function (v, i) {
      var bh = (H - padT - padB) * (v / niceMax);
      var x = padL + i * cw + cw * 0.18;
      var bw = cw * 0.64;
      var y = H - padB - bh;
      var isCurrent = (v === 0);
      bars += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(bh, 0).toFixed(1) +
        '" rx="3" fill="' + (isCurrent ? "#e2e4e9" : "#1f4e66") + '"><title>' + labels[i] + ': ' + money0(v * 1000) + '</title></rect>';
      xlabels += '<text x="' + (padL + i * cw + cw / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="10" fill="#8f95a4">' + labels[i] + '</text>';
    });
    return '<div class="chart-wrap"><svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Omzet per maand">' +
      grid + bars + xlabels + '</svg></div>';
  }

  function hbarChart(rows) {
    var W = 520, rowH = 34, padL = 4, padR = 8, W2 = 300;
    var H = rows.length * rowH + 8;
    var max = Math.max.apply(null, rows.map(function (r) { return r.amount; }).concat([1]));
    var out = "";
    rows.forEach(function (r, i) {
      var y = i * rowH + 6;
      var bw = (W2) * (r.amount / max);
      out += '<text x="' + padL + '" y="' + (y + 12) + '" font-size="12" fill="#133445" font-weight="500">' + esc(r.name) + '</text>';
      out += '<rect x="' + padL + '" y="' + (y + 18) + '" width="' + bw.toFixed(1) + '" height="9" rx="4" fill="' + PALETTE[i % PALETTE.length] + '"/>';
      out += '<text x="' + (W - padR) + '" y="' + (y + 12) + '" text-anchor="end" font-size="12" fill="#6f7687" font-weight="600">' + money0(r.amount) + '</text>';
    });
    return '<div class="chart-wrap"><svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Top klanten">' + out + '</svg></div>';
  }

  /* ----------------------------------------------------------
     VIEW: DASHBOARD
     ---------------------------------------------------------- */
  var MONTHS = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  function renderDashboard() {
    var k = S.kpi;
    var html = '' +
      '<div class="page-head"><div class="row"><div>' +
        '<h1>Dashboard</h1><p>Realtime overzicht van je onderneming — sturen in plaats van reageren.</p>' +
      '</div><div class="spacer"></div>' +
        '<button class="btn btn-secondary btn-sm" data-action="reset-demo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>Demo resetten</button>' +
      '</div></div>' +

      '<div class="grid kpi-grid" data-tour="kpi" style="margin-bottom:16px">' +
        kpiTile("Omzet YTD", money0(k.revenueYTD), "+8,4% t.o.v. vorig jaar", "up", "#1f4e66", "revenueYTD") +
        kpiTile("Openstaand (debiteuren)", money0(k.receivables), "12 openstaande facturen", "neutral", "#366af6", "receivables") +
        kpiTile("Cashpositie", money0(k.cash), "+" + money0(18200) + " deze maand", "up", "#448548", "cash") +
        kpiTile("Te keuren inkoopfacturen", String(pendingCount()), "wacht op goedkeuring", "neutral", "#bb5822", "pending") +
      '</div>' +

      '<div class="grid cols-3" style="margin-bottom:16px">' +
        '<div class="card"><div class="card-head"><h3>Omzet per maand</h3><span class="sub">2025 · x € 1.000 · excl. btw</span></div>' +
          '<div class="card-pad">' + barChart(S.revenueByMonth, MONTHS) + '</div></div>' +
        '<div class="card"><div class="card-head"><h3>Top 5 klanten</h3><span class="sub">omzet YTD</span></div>' +
          '<div class="card-pad">' + hbarChart(S.topCustomers) + '</div></div>' +
      '</div>' +

      '<div class="grid cols-2">' +
        '<div class="card"><div class="card-head"><h3>Openstaande acties</h3><span class="spacer"></span></div>' +
          '<div style="padding:6px 0">' +
            actionRow("purchase", "bell", "" + pendingCount() + " inkoopfacturen wachten op goedkeuring", "Naar inkoopfacturen") +
            actionRow("sales", "cart", S.salesOrders.filter(function(o){return o.status!=='factuur' && o.status!=='verzonden';}).length + " verkooporders nog te factureren", "Naar verkooporders") +
            actionRow("sales", "plus", "Nieuwe verkooporder aanmaken (order-to-cash)", "Nieuwe order") +
          '</div></div>' +
        '<div class="card"><div class="card-head"><h3>Laatste verkooporders</h3></div>' +
          '<table class="tbl"><thead><tr><th>Order</th><th>Klant</th><th class="num">Bedrag</th><th>Status</th></tr></thead><tbody>' +
            S.salesOrders.slice().reverse().map(function (o) {
              return '<tr class="clickable" data-action="goto" data-view="sales"><td class="row-strong">' + o.id + '</td><td>' + esc(o.customer) + '</td>' +
                '<td class="num">' + money(o.total) + '</td><td>' + orderPill(o.status) + '</td></tr>';
            }).join("") +
          '</tbody></table></div>' +
      '</div>';
    $("#view-dashboard").innerHTML = html;
  }
  function kpiTile(label, value, delta, dir, accent, id) {
    var arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "•";
    return '<div class="kpi" style="--kpi-accent:' + accent + '"><div class="label">' + label + '</div>' +
      '<div class="value" data-kpi="' + id + '">' + value + '</div>' +
      '<div class="delta ' + dir + '">' + arrow + ' ' + delta + '</div></div>';
  }
  function actionRow(view, icon, text, cta) {
    var icons = {
      bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
      cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 3h2l2.4 12.3a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L23 7H6"/>',
      plus: '<path d="M12 5v14M5 12h14"/>'
    };
    return '<div style="display:flex;align-items:center;gap:12px;padding:11px 16px;border-bottom:1px solid #f2f3f5">' +
      '<span style="width:30px;height:30px;border-radius:8px;background:#f2f3f5;display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="#1f4e66" stroke-width="2" style="width:16px;height:16px">' + icons[icon] + '</svg></span>' +
      '<span style="font-size:13.5px">' + esc(text) + '</span>' +
      '<button class="btn btn-ghost btn-sm" style="margin-left:auto" data-action="' + (icon === "plus" ? "open-order" : "goto") + '" data-view="' + view + '">' + cta + ' →</button></div>';
  }
  function orderPill(status) {
    var map = {
      open:    ['st-open', 'Open'],
      pakbon:  ['st-wait', 'Pakbon gemaakt'],
      factuur: ['st-ok', 'Gefactureerd'],
      verzonden: ['st-ok', 'Verzonden (Peppol)']
    };
    var m = map[status] || ['st-muted', status];
    return '<span class="pill-status ' + m[0] + '"><span class="d"></span>' + m[1] + '</span>';
  }

  /* ----------------------------------------------------------
     VIEW: SALES (verkooporders + order-to-cash)
     ---------------------------------------------------------- */
  function renderSales() {
    var html = '' +
      '<div class="page-head"><div class="row"><div>' +
        '<h1>Verkooporders</h1><p>Van order tot factuur — zonder overtypen. De voorraad werkt automatisch bij.</p>' +
      '</div><div class="spacer"></div>' +
        '<button class="btn btn-primary" data-action="open-order" data-tour="new-order"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Nieuwe verkooporder</button>' +
      '</div></div>' +
      '<div class="card"><table class="tbl"><thead><tr>' +
        '<th>Ordernr.</th><th>Klant</th><th>Datum</th><th class="num">Totaal (incl. btw)</th><th>Status</th><th></th>' +
      '</tr></thead><tbody id="sales-rows">' + salesRows() + '</tbody></table></div>';
    $("#view-sales").innerHTML = html;
  }
  function salesRows() {
    return S.salesOrders.slice().reverse().map(function (o) {
      var action = o.status === "open"
        ? '<button class="btn btn-secondary btn-sm" data-action="make-pakbon" data-id="' + o.id + '">Pakbon maken</button>'
        : o.status === "pakbon"
          ? '<button class="btn btn-primary btn-sm" data-action="make-invoice" data-id="' + o.id + '">Factureren</button>'
          : (o.status === "factuur" || o.status === "verzonden")
            ? '<button class="btn btn-ghost btn-sm" data-action="view-invoice-doc" data-id="' + o.id + '">Bekijk factuur</button>'
            : '';
      return '<tr><td class="row-strong">' + o.id + '</td><td>' + esc(o.customer) + '</td><td class="muted">' + o.date + '</td>' +
        '<td class="num">' + money(o.total) + '</td><td>' + orderPill(o.status) + '</td><td style="text-align:right">' + action + '</td></tr>';
    }).join("");
  }

  /* ---- Order wizard ---- */
  var wiz = null;
  function openOrderWizard() {
    wiz = { step: 1, customerId: S.customers[0].id, lines: [{ sku: S.products[0].sku, qty: 4 }] };
    renderWizard();
  }
  function renderWizard() {
    var m = el('<div class="modal wide"></div>');
    m.innerHTML =
      '<div class="modal-head"><h2>Nieuwe verkooporder</h2><span class="sub">' + S.company.name + '</span>' +
        '<button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body" id="wiz-body"></div>' +
      '<div class="modal-foot" id="wiz-foot"></div>';
    openModal(m);
    paintWizard();
  }
  function stepper() {
    var steps = ["Klant & regels", "Voorraad & controle", "Pakbon & factuur"];
    return '<div class="stepper">' + steps.map(function (s, i) {
      var n = i + 1, cls = n < wiz.step ? "done" : n === wiz.step ? "active" : "";
      var dot = n < wiz.step ? "✓" : n;
      return '<div class="step ' + cls + '"><span class="n">' + dot + '</span>' + s + '</div>' +
        (i < steps.length - 1 ? '<div class="bar ' + (n < wiz.step ? "done" : "") + '"></div>' : "");
    }).join("") + '</div>';
  }
  function orderTotals() { return computeTotals(S.products, wiz.lines); }
  function paintWizard() {
    var body = $("#wiz-body"), foot = $("#wiz-foot");
    if (wiz.step === 1) {
      body.innerHTML = stepper() +
        '<div class="field" style="max-width:360px"><label>Klant</label><select class="input" data-action="wiz-customer">' +
          S.customers.map(function (c) { return '<option value="' + c.id + '"' + (c.id === wiz.customerId ? " selected" : "") + '>' + esc(c.name) + ' · ' + c.city + '</option>'; }).join("") +
        '</select></div>' +
        '<div style="margin:18px 0 8px;font-weight:600;font-size:13px">Orderregels</div>' +
        '<div class="li-row head"><div>Artikel</div><div class="num">Aantal</div><div class="num">Stuksprijs</div><div class="num">Regeltotaal</div><div></div></div>' +
        '<div id="wiz-lines">' + wiz.lines.map(lineRow).join("") + '</div>' +
        '<button class="btn btn-secondary btn-sm" data-action="wiz-add-line" style="margin-top:6px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Regel toevoegen</button>';
      foot.innerHTML = '<button class="btn btn-ghost" data-action="close-modal">Annuleren</button><span class="spacer"></span>' +
        '<button class="btn btn-primary" data-action="wiz-next">Volgende: controle →</button>';
    } else if (wiz.step === 2) {
      var t = orderTotals();
      body.innerHTML = stepper() +
        '<p style="color:#6f7687;font-size:13px;margin:0 0 14px">Controleer de order. Zodra je bevestigt, wordt de <b>voorraad automatisch afgeboekt</b> — in dezelfde handeling, geen dubbele invoer.</p>' +
        '<div class="card" style="box-shadow:none"><table class="tbl"><thead><tr><th>Artikel</th><th class="num">Aantal</th><th class="num">Voorraad nu</th><th class="num">Na order</th><th class="num">Regeltotaal</th></tr></thead><tbody>' +
          wiz.lines.map(function (l) {
            var p = product(l.sku); if (!p) return "";
            var after = p.stock - l.qty;
            var warn = after < 10;
            return '<tr><td class="row-strong">' + esc(p.name) + '<div class="muted" style="font-size:11px">' + p.sku + '</div></td>' +
              '<td class="num">' + l.qty + '</td><td class="num">' + p.stock + '</td>' +
              '<td class="num" style="' + (warn ? "color:#cc453e;font-weight:600" : "") + '">' + after + (warn ? " ⚠" : "") + '</td>' +
              '<td class="num">' + money(p.price * l.qty) + '</td></tr>';
          }).join("") +
        '</tbody></table></div>' +
        '<div class="totals"><div class="tr"><span>Subtotaal (excl. btw)</span><span>' + money(t.net) + '</span></div>' +
          '<div class="tr"><span>Btw 21%</span><span>' + money(t.vat) + '</span></div>' +
          '<div class="tr grand"><span>Totaal</span><span>' + money(t.total) + '</span></div></div>';
      foot.innerHTML = '<button class="btn btn-ghost" data-action="wiz-back">← Terug</button><span class="spacer"></span>' +
        '<button class="btn btn-primary" data-action="wiz-confirm">Order bevestigen &amp; voorraad afboeken</button>';
    }
  }
  function lineRow(l, i) {
    var p = product(l.sku);
    var low = p && (p.stock - l.qty) < 10;
    return '<div class="li-row" data-line="' + i + '">' +
      '<div><select class="input" data-action="wiz-sku" data-i="' + i + '">' +
        S.products.map(function (pp) { return '<option value="' + pp.sku + '"' + (pp.sku === l.sku ? " selected" : "") + '>' + esc(pp.name) + '</option>'; }).join("") +
      '</select><div class="stock-hint ' + (low ? "low" : "") + '">Op voorraad: <b>' + (p ? p.stock : 0) + '</b>' + (low ? " — laag!" : "") + '</div></div>' +
      '<div><input class="input num" type="number" min="1" value="' + l.qty + '" data-action="wiz-qty" data-i="' + i + '"></div>' +
      '<div class="num li-vat" style="padding-top:9px">' + (p ? money(p.price) : "-") + '</div>' +
      '<div class="num" style="padding-top:9px;font-weight:600">' + (p ? money(p.price * l.qty) : "-") + '</div>' +
      '<div class="li-del">' + (wiz.lines.length > 1 ? '<button class="btn btn-ghost btn-sm" data-action="wiz-del" data-i="' + i + '">✕</button>' : "") + '</div>' +
    '</div>';
  }
  function confirmOrder() {
    var t = orderTotals();
    var cust = S.customers.find(function (c) { return c.id === wiz.customerId; });
    // voorraad afboeken
    wiz.lines.forEach(function (l) { var p = product(l.sku); if (p) p.stock = Math.max(0, p.stock - l.qty); });
    var id = "VO-" + (S.counters.nextOrder++);
    var order = { id: id, customer: cust.name, date: today(), total: t.total, status: "open", lines: wiz.lines.slice(), net: t.net, vat: t.vat };
    S.salesOrders.push(order);
    closeModal();
    toast("Verkooporder " + id + " aangemaakt", "Voorraad is automatisch afgeboekt.", "");
    showView("sales");
    // direct doorstromen: pakbon aanbieden
    setTimeout(function () { makePakbon(id); }, 500);
  }
  // Vaste "vandaag" zodat de demo consistent blijft met het boekjaar van de voorbeeldgegevens
  // (en niet meedrijft met de echte systeemklok). Pas aan als je de dataset ververst.
  var DEMO_TODAY = "06-10-2025";
  function today() { return DEMO_TODAY; }

  /* ---- pakbon / factuur / peppol ---- */
  function findOrder(id) { return S.salesOrders.find(function (o) { return o.id === id; }); }
  function makePakbon(id) {
    var o = findOrder(id); if (!o) return;
    o.status = "pakbon";
    var m = el('<div class="modal"></div>');
    m.innerHTML = '<div class="modal-head"><h2>Pakbon ' + o.id + '</h2><span class="sub">automatisch gegenereerd uit de order</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body">' + docHtml(o, "PAKBON", false) + '</div>' +
      '<div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal">Sluiten</button><span class="spacer"></span>' +
      '<button class="btn btn-primary" data-action="make-invoice" data-id="' + o.id + '">Order factureren →</button></div>';
    openModal(m);
    refreshSales();
  }
  function makeInvoice(id) {
    var o = findOrder(id); if (!o) return;
    if (!o.invoiceNo) o.invoiceNo = "VF-" + (S.counters.nextInvoice++);
    if (o.status !== "verzonden") o.status = "factuur";
    var m = el('<div class="modal"></div>');
    m.innerHTML = '<div class="modal-head"><h2>Verkoopfactuur ' + o.invoiceNo + '</h2><span class="sub">uit order ' + o.id + ' · geen overtypen</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body">' + docHtml(o, "FACTUUR", true) + '</div>' +
      '<div class="modal-foot"><button class="btn btn-ghost" data-action="close-modal">Later</button><span class="spacer"></span>' +
      '<button class="btn btn-primary" data-action="send-peppol" data-id="' + o.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Verzenden via AutoInvoice (Peppol)</button></div>';
    openModal(m);
    refreshSales();
  }
  function docHtml(o, title, withTotals) {
    var cust = S.customers.find(function (c) { return c.name === o.customer; }) || { name: o.customer, city: "", terms: "30 dagen" };
    var lines = (o.lines || []).map(function (l) {
      var p = product(l.sku); if (!p) return "";
      return '<tr><td>' + esc(p.name) + '<br><span style="color:#8f95a4;font-size:11px">' + p.sku + '</span></td><td class="r">' + l.qty + '</td>' +
        '<td class="r">' + money(p.price) + '</td><td class="r">' + money(p.price * l.qty) + '</td></tr>';
    }).join("");
    var totals = "";
    if (withTotals) {
      totals = '<div style="margin-top:14px;margin-left:auto;width:230px">' +
        '<div style="display:flex;justify-content:space-between;padding:3px 0;font-size:12.5px"><span>Subtotaal</span><span>' + money(o.net) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:3px 0;font-size:12.5px"><span>Btw 21%</span><span>' + money(o.vat) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0 0;border-top:1px solid #e2e4e9;font-weight:700"><span>Te voldoen</span><span>' + money(o.total) + '</span></div></div>';
    }
    return '<div class="doc"><div class="doc-top"><div><div class="doc-title">' + title + '</div><div style="margin-top:8px;font-weight:600">' + esc(S.company.name) + '</div>' +
      '<div style="color:#6f7687;font-size:12px">Havenweg 12 · 2201 Noordwijk</div></div>' +
      '<div class="doc-meta">' + (title === "FACTUUR" ? "Factuurnr. " + (o.invoiceNo || "") : "Order " + o.id) + '<br>Datum: ' + (o.date || today()) + '<br>Betaaltermijn: ' + cust.terms + '</div></div>' +
      '<div style="font-size:12px;color:#6f7687">Aan</div><div style="font-weight:600;margin-bottom:6px">' + esc(cust.name) + (cust.city ? ' · ' + cust.city : "") + '</div>' +
      '<table><thead><tr><th>Artikel</th><th class="r">Aantal</th><th class="r">Prijs</th><th class="r">Totaal</th></tr></thead><tbody>' + lines + '</tbody></table>' +
      totals + '</div>';
  }
  function sendPeppol(id) {
    var o = findOrder(id); if (!o) return;
    var m = el('<div class="modal"></div>');
    m.innerHTML = '<div class="modal-head"><h2>AutoInvoice</h2><span class="sub">e-factuur via het Peppol-netwerk</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body"><div class="sending" id="send-area">' +
        '<div class="spin"></div><h3>Factuur ' + (o.invoiceNo || "") + ' wordt verzonden…</h3><p>Visma Net kiest automatisch het juiste kanaal op basis van de klantgegevens.</p>' +
        '<div class="send-steps" id="send-steps">' +
          sendStep("Factuur omgezet naar e-factuur (UBL)") +
          sendStep("Ontvanger opgezocht in Peppol-register") +
          sendStep("Verzonden via het Peppol-netwerk") +
        '</div></div></div>';
    openModal(m);
    var steps = $all("#send-steps .ss");
    var i = 0;
    var iv = setInterval(function () {
      if (i < steps.length) { steps[i].classList.add("done"); steps[i].querySelector(".mk").innerHTML = checkSvg(); i++; }
      else {
        clearInterval(iv);
        o.status = "verzonden";
        $("#send-area").innerHTML = '<div class="check">' + checkSvg("#448548", 30) + '</div>' +
          '<h3>Verzonden via Peppol ✓</h3><p>De klant ontvangt de e-factuur direct in zijn eigen boekhouding. Verwerkingstijd: <b>minder dan 1 minuut</b> in plaats van ~10 minuten handmatig.</p>' +
          '<div style="margin-top:18px"><button class="btn btn-primary" data-action="close-modal">Klaar</button></div>';
        refreshSales();
        toast("Factuur verzonden via Peppol", "Order " + o.id + " is volledig afgerond (order → factuur → verzonden).", "");
      }
    }, 650);
  }
  function sendStep(txt) { return '<div class="ss"><span class="mk"></span>' + esc(txt) + '</div>'; }
  function checkSvg(color, size) { color = color || "#448548"; size = size || 16; return '<svg viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="2.5" style="width:' + size + 'px;height:' + size + 'px"><path d="M20 6L9 17l-5-5"/></svg>'; }

  function refreshSales() { if ($("#sales-rows")) $("#sales-rows").innerHTML = salesRows(); }

  /* ----------------------------------------------------------
     VIEW: PURCHASE (inkoopfacturen + approval)
     ---------------------------------------------------------- */
  function renderPurchase() {
    var html = '' +
      '<div class="page-head"><div class="row"><div>' +
        '<h1>Inkoopfacturen</h1><p>E-facturen komen automatisch binnen en worden herkend. Jij keurt alleen nog goed.</p>' +
      '</div></div></div>' +
      '<div class="card"><table class="tbl"><thead><tr>' +
        '<th>Factuurnr.</th><th>Leverancier</th><th>Binnengekomen via</th><th class="num">Bedrag (incl. btw)</th><th>Status</th><th></th>' +
      '</tr></thead><tbody id="purchase-rows">' + purchaseRows() + '</tbody></table></div>';
    $("#view-purchase").innerHTML = html;
  }
  function purchaseRows() {
    return S.purchaseInvoices.map(function (inv) {
      var st = inv.status === "te keuren" ? '<span class="pill-status st-wait"><span class="d"></span>Te keuren</span>'
        : inv.status === "geboekt" ? '<span class="pill-status st-ok"><span class="d"></span>Goedgekeurd &amp; geboekt</span>'
        : '<span class="pill-status st-no"><span class="d"></span>Afgekeurd</span>';
      var btn = inv.status === "te keuren"
        ? '<button class="btn btn-primary btn-sm" data-action="open-invoice" data-id="' + inv.id + '">Beoordelen</button>'
        : '<button class="btn btn-ghost btn-sm" data-action="open-invoice" data-id="' + inv.id + '">Bekijken</button>';
      return '<tr><td class="row-strong">' + inv.id + '</td><td>' + esc(inv.supplier) + '</td>' +
        '<td class="muted">' + esc(inv.channel) + '</td><td class="num">' + money(inv.total) + '</td>' +
        '<td>' + st + '</td><td style="text-align:right">' + btn + '</td></tr>';
    }).join("");
  }
  function openInvoice(id) {
    var inv = S.purchaseInvoices.find(function (i) { return i.id === id; }); if (!inv) return;
    var m = el('<div class="modal wide"></div>');
    m.innerHTML =
      '<div class="modal-head"><h2>Inkoopfactuur ' + inv.id + '</h2><span class="sub">' + esc(inv.channel) + '</span><button class="x" data-action="close-modal">&times;</button></div>' +
      '<div class="modal-body"><div class="grid cols-2" style="align-items:start">' +
        // left: recognized fields
        '<div><div style="font-weight:600;font-size:13px;margin-bottom:10px">Automatisch herkend <span class="recog-tag">SmartScan</span></div>' +
          field2("Leverancier", esc(inv.supplier)) +
          field2("Factuurdatum", inv.date) +
          field2("Grootboekrekening (voorstel)", esc(inv.glAccount)) +
          '<div class="grid cols-2" style="gap:10px">' + field2("Bedrag excl. btw", money(inv.net)) + field2("Btw", money(inv.vat)) + '</div>' +
          field2("Totaal incl. btw", '<b style="font-size:15px">' + money(inv.total) + '</b>') +
        '</div>' +
        // right: approval
        '<div><div style="font-weight:600;font-size:13px;margin-bottom:12px">Goedkeuringsworkflow</div>' +
          '<ul class="timeline" id="appr-timeline">' + approvalTimeline(inv) + '</ul>' +
          (inv.status === "te keuren" ? approvalHint(inv) : "") +
        '</div>' +
      '</div></div>' +
      '<div class="modal-foot">' + footButtons(inv) + '</div>';
    openModal(m);
    // SmartScan highlight
    setTimeout(function () { $all(".recognized").forEach(function (n) { n.classList.add("animate"); }); }, 80);
  }
  function field2(label, val) {
    return '<div class="field recognized"><label>' + label + '</label><div class="input" style="display:flex;align-items:center;background:#fafbfc">' + val + '</div></div>';
  }
  function approvalTimeline(inv) {
    return inv.steps.map(function (s, i) {
      var cls = s.state === "approved" ? "done" : s.state === "pending" ? "active" : s.state === "rejected" ? "rejected" : "";
      var dot = s.state === "approved" ? checkSvg("#fff", 14) : s.state === "rejected" ? "✕" : (i + 1);
      var sub = s.state === "approved" ? "Goedgekeurd door " + esc(s.who)
        : s.state === "rejected" ? "Afgekeurd door " + esc(s.who)
        : s.state === "pending" ? "Wacht op " + esc(s.who)
        : "Daarna: " + esc(s.who);
      return '<li class="' + cls + '"><span class="tl-dot">' + dot + '</span><div class="tl-body"><div class="t">' + esc(s.role) + '</div><div class="s">' + sub + '</div></div></li>';
    }).join("");
  }
  function approvalHint(inv) {
    var cur = inv.steps.find(function (s) { return s.state === "pending"; });
    if (!cur) return "";
    return '<div style="margin-top:6px;padding:11px 13px;background:#edf4fe;border-radius:8px;font-size:12.5px;color:#1f4e66">' +
      'Jij bent nu aan zet als <b>' + esc(cur.role) + '</b>. ' +
      (inv.steps.length > 1 ? 'Deze factuur doorloopt ' + inv.steps.length + ' stappen (bedrag-afhankelijk).' : 'Eén goedkeuringsstap voor dit bedrag.') + '</div>';
  }
  function footButtons(inv) {
    if (inv.status !== "te keuren") {
      return '<button class="btn btn-ghost" data-action="close-modal">Sluiten</button>';
    }
    return '<button class="btn btn-danger" data-action="reject-invoice" data-id="' + inv.id + '">Afkeuren</button>' +
      '<span class="spacer"></span>' +
      '<button class="btn btn-success" data-action="approve-invoice" data-id="' + inv.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>Goedkeuren</button>';
  }
  function approveInvoice(id) {
    var inv = S.purchaseInvoices.find(function (i) { return i.id === id; }); if (!inv) return;
    var cur = inv.steps.find(function (s) { return s.state === "pending"; });
    if (cur) cur.state = "approved";
    var next = inv.steps.find(function (s) { return s.state === "waiting"; });
    if (next) {
      next.state = "pending";
      $("#appr-timeline").innerHTML = approvalTimeline(inv);
      toast("Stap goedgekeurd", "Doorgestuurd naar " + next.who + " (" + next.role + ").", "info");
    } else {
      inv.status = "geboekt";
      closeModal();
      toast("Factuur " + inv.id + " goedgekeurd & geboekt", "Automatisch verwerkt op " + inv.glAccount + ".", "");
      refreshAfterPurchase();
    }
  }
  function rejectInvoice(id) {
    var inv = S.purchaseInvoices.find(function (i) { return i.id === id; }); if (!inv) return;
    var cur = inv.steps.find(function (s) { return s.state === "pending"; });
    if (cur) cur.state = "rejected";
    inv.status = "afgekeurd";
    closeModal();
    toast("Factuur " + inv.id + " afgekeurd", "Teruggestuurd naar de leverancier/indiener.", "warn");
    refreshAfterPurchase();
  }
  function refreshAfterPurchase() {
    if ($("#purchase-rows")) $("#purchase-rows").innerHTML = purchaseRows();
    updateNavBadge();
    renderDashboard(); // KPI 'te keuren' bijwerken
  }

  /* ----------------------------------------------------------
     NAV / ROUTER
     ---------------------------------------------------------- */
  var CRUMB = { dashboard: "Dashboard", sales: "Verkoop · Verkooporders", purchase: "Inkoop · Inkoopfacturen" };
  function showView(name) {
    $all(".view").forEach(function (v) { v.classList.remove("active"); });
    var v = $("#view-" + name); if (v) v.classList.add("active");
    $all(".nav-item[data-view]").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-view") === name); });
    $("#crumbs").innerHTML = "<b>" + (CRUMB[name] || name) + "</b>";
    $("#main").scrollTop = 0;
    if (name === "dashboard") renderDashboard();
    if (name === "sales") renderSales();
    if (name === "purchase") renderPurchase();
  }
  function updateNavBadge() {
    var c = pendingCount();
    var b = $("#nav-approve-count");
    if (b) { b.textContent = c; b.style.display = c ? "flex" : "none"; }
  }

  /* ----------------------------------------------------------
     EVENT DELEGATION
     ---------------------------------------------------------- */
  document.addEventListener("click", function (e) {
    var navItem = e.target.closest(".nav-item[data-view]");
    if (navItem && !navItem.classList.contains("disabled")) { showView(navItem.getAttribute("data-view")); markActivity(); return; }

    var a = e.target.closest("[data-action]");
    if (!a) return;
    var act = a.getAttribute("data-action"), id = a.getAttribute("data-id"), view = a.getAttribute("data-view");
    markActivity();
    switch (act) {
      case "goto": showView(view); break;
      case "open-order": showView("sales"); openOrderWizard(); break;
      case "close-modal": closeModal(); break;
      case "reset-demo": resetDemo(); break;
      case "wiz-next": wiz.step = 2; paintWizard(); break;
      case "wiz-back": wiz.step = 1; paintWizard(); break;
      case "wiz-add-line": wiz.lines.push({ sku: nextUnusedSku(), qty: 1 }); refreshWizLines(); break;
      case "wiz-del": wiz.lines.splice(+a.getAttribute("data-i"), 1); refreshWizLines(); break;
      case "wiz-confirm": confirmOrder(); break;
      case "make-pakbon": makePakbon(id); break;
      case "make-invoice": makeInvoice(id); break;
      case "view-invoice-doc": makeInvoice(id); break;
      case "send-peppol": sendPeppol(id); break;
      case "open-invoice": openInvoice(id); break;
      case "approve-invoice": approveInvoice(id); break;
      case "reject-invoice": rejectInvoice(id); break;
      case "start-tour": startTour(); break;
      case "skip-tour": closeModal(); break;
      case "tour-next": tourStep(TOUR.i + 1); break;
      case "tour-back": tourStep(TOUR.i - 1); break;
      case "tour-end": endTour(); break;
      case "cta-open": window.open(CONFIG.ctaUrl, "_blank", "noopener"); closeModal(); break;
      case "cta-dismiss": closeModal(); break;
    }
  });
  document.addEventListener("change", function (e) {
    var a = e.target.closest("[data-action]"); if (!a) return;
    markActivity();
    if (a.getAttribute("data-action") === "wiz-customer") wiz.customerId = a.value;
    if (a.getAttribute("data-action") === "wiz-sku") { wiz.lines[+a.getAttribute("data-i")].sku = a.value; refreshWizLines(); }
  });
  document.addEventListener("input", function (e) {
    var a = e.target.closest('[data-action="wiz-qty"]'); if (!a) return;
    var i = +a.getAttribute("data-i"); var q = Math.max(1, parseInt(a.value || "1", 10)); wiz.lines[i].qty = q;
    // Update deze regel in-place (NIET herrenderen → focus blijft in het invoerveld)
    var row = a.closest(".li-row"); var p = product(wiz.lines[i].sku);
    if (row && p) {
      row.children[3].textContent = money(p.price * q);
      var hint = row.querySelector(".stock-hint");
      var low = (p.stock - q) < 10;
      hint.className = "stock-hint" + (low ? " low" : "");
      hint.innerHTML = "Op voorraad: <b>" + p.stock + "</b>" + (low ? " — laag!" : "");
    }
  });
  function nextUnusedSku() {
    var used = wiz.lines.map(function (l) { return l.sku; });
    var free = S.products.find(function (p) { return used.indexOf(p.sku) === -1; });
    return (free || S.products[0]).sku;
  }
  function refreshWizLines() { var host = $("#wiz-lines"); if (host) host.innerHTML = wiz.lines.map(lineRow).join(""); }

  /* ----------------------------------------------------------
     GUIDED TOUR
     ---------------------------------------------------------- */
  var TOUR = {
    i: 0,
    steps: [
      { sel: '[data-tour="kpi"]', view: "dashboard", title: "Realtime dashboard", body: "Bij binnenkomst zie je direct hoe je bedrijf ervoor staat: omzet, openstaande posten, cash en werk dat op je wacht. Sturen in plaats van reageren." },
      { sel: '[data-tour="nav-sales"]', view: "dashboard", title: "Order-to-cash", body: "We lopen één flow helemaal door: van verkooporder tot verzonden factuur. Klik hier om naar Verkoop te gaan." },
      { sel: '[data-tour="new-order"]', view: "sales", title: "Nieuwe order", body: "Maak een verkooporder aan. Je kiest een klant en artikelen — de voorraad wordt in dezelfde handeling automatisch bijgewerkt. Geen overtypen." },
      { sel: '[data-tour="nav-purchase"]', view: "sales", title: "Inkoop & goedkeuren", body: "Aan de inkoopkant komen e-facturen automatisch binnen via Peppol. Ze worden herkend en doorlopen een goedkeuringsworkflow. Klik hier om te bekijken." },
      { sel: '[data-tour="nav-dashboard"]', view: "purchase", title: "Alles in één systeem", body: "Alles wat je doet werkt automatisch door naar het dashboard en de grootboekadministratie. Dat is de kracht van één geïntegreerd platform. Speel gerust zelf verder!" }
    ]
  };
  function startTour() { closeModal(); TOUR.i = 0; tourStep(0); }
  function tourStep(i) {
    if (i < 0) i = 0;
    if (i >= TOUR.steps.length) { endTour(); return; }
    TOUR.i = i;
    var st = TOUR.steps[i];
    if (st.view) showView(st.view);
    setTimeout(function () { placeTour(st, i); }, 60);
  }
  function placeTour(st, i) {
    var target = $(st.sel);
    var spot = $("#tour-spot"), pop = $("#tour-pop");
    if (!target || window.innerWidth <= 860) { // fallback: center popup, no spotlight
      spot.style.display = "none";
    } else {
      var r = target.getBoundingClientRect();
      var pad = 6;
      spot.style.display = "block";
      spot.style.left = (r.left - pad) + "px"; spot.style.top = (r.top - pad) + "px";
      spot.style.width = (r.width + pad * 2) + "px"; spot.style.height = (r.height + pad * 2) + "px";
    }
    pop.style.display = "block";
    pop.innerHTML = '<h4>' + esc(st.title) + '</h4><p>' + esc(st.body) + '</p>' +
      '<div class="tp-foot"><span class="tp-count">' + (i + 1) + ' / ' + TOUR.steps.length + '</span><span class="spacer"></span>' +
      (i > 0 ? '<button class="btn btn-ghost btn-sm" data-action="tour-back">Terug</button>' : '') +
      '<button class="btn btn-primary btn-sm" data-action="' + (i === TOUR.steps.length - 1 ? "tour-end" : "tour-next") + '">' +
      (i === TOUR.steps.length - 1 ? "Zelf verder" : "Volgende") + '</button></div>';
    // position popup near target
    var pr = pop.getBoundingClientRect();
    if (target && window.innerWidth > 860) {
      var r2 = target.getBoundingClientRect();
      var top = r2.bottom + 12, left = r2.left;
      if (top + pr.height > window.innerHeight - 10) top = Math.max(10, r2.top - pr.height - 12);
      if (left + 300 > window.innerWidth - 10) left = window.innerWidth - 310;
      pop.style.transform = "none";
      pop.style.top = top + "px"; pop.style.left = left + "px";
    } else {
      pop.style.top = "50%"; pop.style.left = "50%"; pop.style.transform = "translate(-50%,-50%)";
    }
  }
  function endTour() { $("#tour-spot").style.display = "none"; $("#tour-pop").style.display = "none"; }
  window.addEventListener("resize", function () { if ($("#tour-pop").style.display === "block") placeTour(TOUR.steps[TOUR.i], TOUR.i); });

  /* ----------------------------------------------------------
     CTA — lead capture na X seconden ACTIEF gebruik
     ---------------------------------------------------------- */
  var activeSeconds = 0, ctaShown = false, lastActivity = Date.now();
  function markActivity() { lastActivity = Date.now(); }
  setInterval(function () {
    if (ctaShown) return;
    // tel alleen als er in de laatste 30s interactie was (ACTIEF gebruik)
    if (Date.now() - lastActivity < 30000) activeSeconds++;
    if (activeSeconds >= CONFIG.ctaAfterSeconds) { showCTA(); }
  }, 1000);
  function showCTA() {
    if (ctaShown) return; ctaShown = true;
    if ($("#overlay").classList.contains("open")) { /* niet bovenop een andere modal; wacht even */ ctaShown = false; activeSeconds = CONFIG.ctaAfterSeconds - 15; return; }
    var m = el('<div class="modal cta-modal"></div>');
    m.innerHTML = '<div class="cta-body">' +
      '<div class="cta-ico"><svg viewBox="0 0 24 24" fill="none" stroke="#ff8e05" stroke-width="2" style="width:28px;height:28px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>' +
      '<h2>Enthousiast over wat je ziet?</h2>' +
      '<p>Je bent nu even aan het spelen met de basis. Wil je Visma Net met je <b>eigen</b> processen en cijfers zien? Consolit laat het je vrijblijvend zien.</p>' +
      '<div class="cta-actions">' +
        '<button class="btn btn-primary" data-action="cta-open" style="height:42px">Plan een persoonlijke demo</button>' +
        '<button class="btn btn-ghost" data-action="cta-dismiss">Nee, ik speel nog even verder</button>' +
      '</div>' +
      '<div class="cta-mini">Je kunt daarna gewoon doorgaan in de demo.</div>' +
    '</div>';
    openModal(m);
  }

  /* ----------------------------------------------------------
     WELCOME / TOUR OFFER
     ---------------------------------------------------------- */
  function offerTour() {
    var m = el('<div class="modal welcome"></div>');
    m.innerHTML = '<div class="w-body">' +
      '<svg class="w-ico" viewBox="0 0 288 288"><path fill="#ff8e05" d="M223.43,111.861c-.01.29-.03.57-.06.85-.48,4.63-3.21,8.96-7.45,11.38,0,0-22.739,13.3-42.899,24.879-.86.43-1.72,1.08-2.57,1.51-8.11-4.68-20.589-11.78-27.819-15.97-5.15-3.25-8.44-8.93-8.44-15.21v-49.989c0-.16,0-.31.02-.47,0-.14.01-.27.03-.41.01-.15.03-.31.06-.46.02-.16.05-.31.08-.46.02-.15.06-.29.1-.44.65-2.49,2.32-4.46,4.44-5.59.98-.51,2.05-.84,3.16-.97.86-.09,1.75-.06,2.63.11.94.19,1.87.53,2.78,1.05l68.428,39.469c.8.5,1.54,1,2.23,1.52,3.18,2.4,5.11,5.15,5.28,9.2Z"/><path fill="#003253" d="M153.809,164.121v54.485c0,6.864-7.294,11.161-13.299,7.724l-68.428-39.467c-4.501-2.793-7.294-5.79-7.509-10.721.215-4.941,3.008-9.657,7.509-12.235,0,0,22.741-13.299,42.904-24.879.859-.43,1.719-1.074,2.568-1.504,9.657,5.575,25.534,14.588,31.324,18.025,2.997,1.708,4.931,4.931,4.931,8.573Z"/><path fill="#003253" d="M64.6,176.489c.3-5.01,3.04-9.54,7.48-12.16,0,0,22.739-13.09,42.909-24.669,1.05-.61,2.09-1.22,3.12-1.82,14.56-8.45,26.909-15.56,26.909-15.56,5.36-3.22,8.8-9.01,8.8-15.44v-49.989c0-3.21-1.72-6.22-4.51-7.72-2.57-1.51-6.01-1.51-8.8,0l-16.51,9.44-51.919,30.039c-4.71,2.78-7.51,7.71-7.51,13.08v74.448l.03.35Z"/><path fill="#ff8e05" d="M223.399,111.471c-.28,5.03-3.02,9.57-7.48,12.2,0,0-22.739,13.09-42.899,24.669-1.05.61-2.09,1.22-3.12,1.82-14.57,8.45-26.919,15.56-26.919,15.56-7.52,4.54-8.8,5.39-8.8,15.44v49.989c0,3.21,1.72,6.22,4.51,7.72,2.57,1.51,6.01,1.51,8.8,0l16.51-9.44,51.919-30.039c4.72-2.78,7.51-7.71,7.51-13.08v-74.448l-.03-.39Z"/></svg>' +
      '<h2>Welkom bij de Visma Net demo</h2>' +
      '<p>Dit is een <b>vrijblijvende sandbox</b> met voorbeeldgegevens van het fictieve bedrijf <b>Noordzee Outdoor B.V.</b> Probeer de basis zelf uit — je kunt niets kapotmaken.</p>' +
      '<div class="w-actions">' +
        '<button class="btn btn-secondary" data-action="skip-tour">Ik kijk zelf rond</button>' +
        '<button class="btn btn-primary" data-action="start-tour">Geef me een korte rondleiding</button>' +
      '</div></div>';
    openModal(m);
  }

  /* ----------------------------------------------------------
     RESET
     ---------------------------------------------------------- */
  function resetDemo() {
    S = seedData(); normalizeOrders(S);
    endTour();
    showView("dashboard");
    updateNavBadge();
    toast("Demo gereset", "Alle voorbeeldgegevens staan weer op de beginstand.", "info");
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  function init() {
    // CTA links invullen
    $all("[data-cta-link]").forEach(function (a) { a.setAttribute("href", CONFIG.ctaUrl); });
    renderDashboard();
    updateNavBadge();
    if (CONFIG.offerTourOnLoad) setTimeout(offerTour, 450);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
