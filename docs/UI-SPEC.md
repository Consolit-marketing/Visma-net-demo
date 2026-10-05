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

## 6. Inkoopfactuur beoordelen via APPROVAL (uit schermopname)

De goedkeuring loopt **niet** in een modal op het AP-window, maar via de **Approval**-module.
Placeholders hieronder; geen echte namen/bedrijven overnemen in de demo.

### 6a. Approval-takenscherm — `Services / Approval / Mijn taken`
Dit is wat de goedkeurder ziet en waar hij goed-/afkeurt.
- **Kop**: terug-pijl, titel `Factuur - <leverancier> → <bedrijf>`, subtitel "Ontvangen van Visma Net".
  Rechts: **Goedkeuren…** (primair, donker), **Afwijzen…**, **Andere acties… ▾**, en **Taak 1 / 1** met ‹ ›.
- **Links – "Workflowgegevens"**: horizontale stappen-balk:
  - ✓ (groen) **Goedkeuring gestart** — "<naam> geactiveerd via Visma Net" — tijdstempel.
  - ⧗ (blauw) **<stapnaam>** — "Wacht op goedkeuring door <namen>".
  - Daaronder: **Huidige stap in workflow – <stap> ›** en **Workflowgeschiedenis ›**.
- **Links-onder – "Opmerkingen (n)"**: leeg = "Voorlopig geen commentaar". Invoer: avatar + tekstveld
  ("Concepten worden automatisch opgeslagen.") + knop **Opmerking**.
- **Midden – "Factuur-gegevens"**: Omschrijving, Vestiging, Naam crediteur, Nummer crediteur,
  Factuurnummer, Referentie crediteur, Document (nr), Factuurdatum, Vervaldatum, Bedrag (… EUR),
  **Dimensies** (Kostenplaats / Productgroep / Regio).
- **Rechts – "Titel bijlage" / "Alles downloaden"**: PDF-viewer van de factuur (zoom, pagina "1 van 1",
  print, download, zoek). Er is ook een inline "Externe editor geleverd door Visma Net" met de
  regel(s) van de factuur ("Alleen mijn regels weergeven").
- **Andere acties…**: Uitstellen · Doorsturen (F) · Controleer (dim) · Controle aanvragen (V) ·
  E-mail (M) · Bijlage toevoegen · Volgende taak (X) · Vorige taak (Z).

### 6b. De factuur in het AP301000-window (vanuit "Facturen goedkeuren (Approval)")
Opent als popup. Zelfde window-paradigma als AR301000, met deze inkoop-specifieke punten:
- Toolbar: Opslaan en sluiten · undo · + · 🗑 · recordnav · **Voorl. boeken** · **Vrijgeven** (grijs tot
  goedgekeurd) · **Acties ▾** · **Analyses ▾** · **Rapporten ▾** · **Appr. annuleren** · **Afb. verbergen**.
  Rechtsboven: Notities · Activiteiten · **Bestanden (n)** · Meldingen.
- Kop-velden: Soort `Factuur` · Referentienr. · **Goedkeuringsst… `Wachtend`** · Documentstatus `In balans`
  · ☐ Blokkeren · Datum · Periode · Ref. crediteur · Omschrijving · Ref. inkooporder | Crediteur
  `<nr> - <naam>` · Locatie `PRIMAIR - Hoofdlocatie` · Valuta `EUR 1,00 Basis` · Voorwaarden `30 - 30 dagen`
  · Betalingsref. · ☐ G-rekening toepassen · Vervaldat. · Datum bet.korting · Status AutoPay | Totalen:
  Totaal · Factuurkorting · Belastbaar bedrag · Vrijgesteld bedrag · Btw-bedrag · Ingehouden btw · Saldo
  · Afrondingsver. · Betalingskorting.
- Tabs: Documentgegevens · Financiële gegevens · Btw-gegevens · Betalingen · Kortingsgegevens ·
  **Goedkeuringsgegevens**. Grid-acties: Transitoriaschema · Inkoopontvangst toevoegen ·
  Ontvangstregel toevoegen · Inkoop toevoegen. Kolommen: Vestiging · Artikel · Omschrijving transactie ·
  Aantal · Eenh · Kostprijs · Rekening · Korting · Handm. korting · Subrekening · Project.
- **Analyses ▾**: Crediteurkaart · Historiegegevens van het goedkeuringsdocument ·
  Regelhistoriegegevens van het goedkeuringsdocument.
- Rechts een **PDF-viewer** (bv. "Testfactuur.pdf").

### 6c. Statussen
- **Goedkeuringsstatus**: `Wachtend` → `Goedgekeurd` / `Afgewezen`.
- **Documentstatus**: `In balans` → (na Vrijgeven) `Open` → (betaald) `Gesloten`.
- Menu-route naar de goedkeurlijst: **Crediteuren → Verwerking → Facturen goedkeuren (Approval)**.

### 6d. Dashboard-aanvullingen (uit opname)
Het echte "Dashboard financieel" heeft naast gekleurde KPI-tegels ook: een **live valuta-grafiek**
(Dollar–Euro, candlestick), **Open verkooporders** (tabel), **Deb.saldo (vervallen)** (staaf) en
**Voorraad beschikbaar per locatie** (taart). Twee menu-generaties bestaan naast elkaar (klassiek
"Werkbladen" + nieuw hamburgermenu, toggle "Nieuwe menuweergave").
