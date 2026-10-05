# UI-spec: het échte Visma Net nabouwen (Acumatica-paradigma)

Deze spec legt vast hoe de echte Visma Net-interface is opgebouwd, zodat de demo qua
**look & besturing** zo dicht mogelijk bij het product zit. Gebaseerd op screenshots van de
live-omgeving (alleen als **layout-referentie** gebruikt — geen echte data overgenomen).

> Let op: dit vervangt op punten de generieke "Gaia" canvas-richtlijn. Waar de echte schermen
> afwijken (bv. felgekleurde dashboard-tegels), volgt de demo de **screenshots**.

## 1. Globale app-chrome

### Bovenbalk (wit, ~52px, dunne onderrand)
Van links naar rechts:
- **Hamburger** — donkere afgeronde vierkante knop (donker slate/navy), witte lijnen. Opent flyout-menu.
- **Home** — huis-outline icoon.
- **Breadcrumb** — `Services / Visma Net / <Module> / <Categorie> / <Scherm>`. Items zijn
  teal links (klikbaar), gescheiden door `/`; laatste item **vet, donker**.
- Rechts: **bedrijfswisselaar-pill** (📄-achtig icoon + "De Campingspecialist B.V. - Geleen",
  dunne rand, afgerond) · **Feedback** (bordered button) · **AI-sparkle** icoonknop ·
  **Help "?"** icoonknop.

### Flyout-menu (vanuit hamburger, links, wit paneel ~330px)
- Kop: **"Visma Net"** + up/down-chevron (productwisselaar).
- **Zoekveld** "Zoeken" met shortcut-badge `Ctrl+O` rechts.
- **Modulelijst** met uitklap-chevrons `›`: Eigen menu, Dashboards, Crediteuren, Debiteuren,
  Bank/kas, Grootboek, Valuta, Verkoop, Inkoop, Voorraad, Beveiliging (regelniveau),
  Meer onderdelen (→ Financieel, …). Verticale scrollbar.
- Onderaan: **"Menu bewerken"** (potlood) + **gebruikersprofiel** (avatar met initialen,
  naam + e-mail, chevron).

### Startpagina (home)
- Centrale knop "Ga naar de Visma.net ERP Community →" (donker teal).
- Witte kaarten: **Laatste nieuws / Laatste tips / Training / Laatste discussies** (titel-links +
  "Door <naam> - <datum>" grijze subtitel, "Meer … →").
- Rechts: donker-teal kaart **"Hulp nodig?"** (chat-icoon, "Vind hulp"-knop) + **System Status**
  (groen vinkje "Operational →").
- Rechtsboven in content: "Gebruikerskopie maken" (bordered).

## 2. Dashboard-scherm ("Financiële gebruiker")

- Titel + ☆ (favoriet). Rechtsboven "Gebruikerskopie maken".
- **Felgekleurde KPI-tegels** in een raster (grote getallen, label eronder, "Meer gegevens →"
  linksonder). Kleuren uit de echte UI:
  - teal `#1aa3bf`, rood `#d9534f`, groen `#5aa75a`, oranje `#e8923a`.
  - Voorbeelden van tegels: "Liq.behoefte 30/60 dgn", cash (groen, bank-icoon),
    "Verw.ontvangst 30 dgn", "Verk.fact. (vervallen)", "Vervallen 90+", "Kredietstop",
    "Crediteur betalingen (vervallen)", "Geblokkeerd voor bet.".
  - Eén tegel kan het **bedrijfslogo** tonen.
- Rechts twee grafieken: **"Liquiditeit (per maand)"** (blauwe lijn + markers) en
  **"Deb.saldo (vervallen)"** (horizontale blauwe staven per klant). Grafiek-blauw ~ `#2f7ed8`.

## 3. Transactie-"window" (bv. Verkoopfacturen / Debiteurbetalingen / Journaaltransacties)

Dit is het kernpatroon dat op bijna elk invoerscherm terugkomt.

### Kop
- **Scherm-titel** + ☆. Rechtsboven: **Notities · Activiteiten · Bestanden · Meldingen**
  (icoon + label).

### Window-toolbar (één rij, lichte onderrand)
`←`  ·  **Opslaan en sluiten** (disk-icoon)  ·  `↶` undo  ·  `+` (blauw, nieuw)  ·
`🗑` verwijderen  ·  `⧉▾` kopiëren/plakken  ·  `|◄ ◄ ► ►|` record-navigatie  ·
**Vrijgeven** · **Annuleren** (soms grijs) · **Acties ▾** · **Analyses ▾** · **Rapporten ▾** ·
`🔍 Zaak weergeven`.

### Formulier-kopblok (lichtgrijs/wit, 3 kolommen)
- **Links (document-meta):** `Soort ▾`, `Referentienr. [NIEUW 🔍]`, `Status: In balans` +
  `☐ Blokkeren`, `*Datum ▾`, `*Periode 🔍`, + scherm-specifieke velden
  (bv. Debiteurorder, Externe ref., *Project, Factuurtekst).
- **Midden (entiteit):** `*Debiteur 🔍 ✎`, `Subdebiteur`, `*Locatie 🔍`, `Contactpersoon`,
  `Valuta [EUR 🔍][1,00 ▾][Basis]`, `*Voorwaarden`, `*Vervaldat. ▾`, …
- **Rechts (bedragen, rechts uitgelijnd):** Totaal, Factuurkorting, Belastbaar bedr., Btw-bedrag,
  Saldo, … (read-only 0,00).
- **Verplichte velden**: rode `*` vóór het label. Labels rechts-uitgelijnd, grijs.
  Inputs: witte box, dunne rand `#c4ced6`, met **vergrootglas-lookup** en soms **potlood**.
- Formulier inklapbaar via chevron `▲` rechtsboven het kopblok.

### Tabbladen
Rij onderstreepte tabs, bv.: **Documentgegevens** (actief), Financiële gegevens, Factuuradres,
Btw-gegevens, Verkoopprovisie, Kortingsgegevens, Betalingen, Bijlagen.

### Grid (regels)
- **Grid-toolbar:** `↻` refresh, `+`, `✎`, `✕`, (scherm-acties bv. "Transitoriaschema" /
  "Documenten ophalen"), fit-icoon, **export ▾** (Excel), upload.
- **Kolomkoppen** (lichtgrijs, `*` voor verplicht), veel kolommen met horizontale scrollbar.
  Verkoopfactuur-regels bv.: *Vestiging, Artikel, Omschrijving transactie, Aantal, Eenh,
  Artikelprijs, Bedrag, Kortings%, Korting, Bedrag na korting, *Rekening, Omschrijving,
  *Subrekening, Projecttaak, Verkoper, …
- **Record-navigatie** rechtsonder `|◄ ◄ ► ►|`.
- Rechterrand: ingeklapt zijpaneel (terug-pijl + paperclip).

## 4. Styling-tokens (benadering uit de screenshots)

| Rol | Kleur |
|-----|-------|
| Teal links / accent (breadcrumb, tabs-actief) | `#1f6b7d` – `#1f4e66` |
| Donker teal (knoppen/kaarten) | `#17566a` |
| Hamburger donker vlak | `#26323c` |
| Verplicht-sterretje | `#d0021b` |
| Veldrand | `#c4ced6` |
| Kopblok-achtergrond | `#f6f8f9` |
| Grid-kop achtergrond | `#eef1f3` |
| Dashboard-tegels | teal `#1aa3bf` · rood `#d9534f` · groen `#5aa75a` · oranje `#e8923a` |
| Grafiek-blauw | `#2f7ed8` |
| Tekst primair / secundair | `#1b2b36` / `#5a6b78` |
| Lettertype | Inter / system-ui |

## 5. Vertaling naar de (begeleide, vereenvoudigde) demo

- Chrome, window-anatomie, toolbars, tabs, grids, statussen en terminologie worden **nagebouwd**.
- De demo blijft **begeleid**: lege verplichte velden worden met realistische dummy-waarden
  voorgevuld in de flow, zodat een leek niet vastloopt, maar het scherm er echt uitziet.
- Order-to-cash en Inkoop/approval volgen batch 2 van de screenshots.
