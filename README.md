# Visma Net — interactieve demo (iframe-sandbox)

Een vereenvoudigde, vrijblijvende **sandbox** waarmee bezoekers de basis van Visma Net zelf
kunnen uitproberen — met **dummy-gegevens** van het fictieve bedrijf *Noordzee Outdoor B.V.* —
zonder je website te verlaten. Bedoeld als lead-tool voor nieuwe-business-leads.

De schermen, navigatie en bediening zijn **nagebouwd op basis van screenshots van het échte
Visma Net** (zie `docs/UI-SPEC.md`): de bovenbalk met breadcrumb en hamburger-menu, het
dashboard met gekleurde KPI-tegels, de orderlijst als grid, het moderne orderscherm met
marge-donut, het klassieke factuur-window (AR301000) met AutoInvoice/Peppol, en de
inkoopfactuur met SmartScan-herkenning en goedkeuringsworkflow.

> ⚠️ **Geen echte data.** Alle gegevens in deze demo zijn verzonnen. Er is geen koppeling met
> een live Visma Net-omgeving; alles draait volledig in de browser van de bezoeker. Zo loop je
> geen enkel privacy-/AVG-risico wanneer je dit publiek op je site plaatst.

## Wat zit erin

De demo bevat de drie flows die een nieuwe lead het sterkste beeld geven (zie
`docs/ANALYSE-VISMA-NET.md` voor de onderbouwing):

1. **Dashboard** — realtime KPI's (omzet, debiteuren, cash, te keuren facturen) + grafieken.
2. **Order-to-cash** — verkooporder → voorraad werkt automatisch bij → pakbon → verkoopfactuur →
   *verzenden via AutoInvoice (Peppol)*. Verkoopt de integratie-USP ("geen dubbele invoer").
3. **Inkoopfactuur + approval** — e-factuur komt binnen, wordt herkend (SmartScan) en doorloopt
   een (bedrag-afhankelijke) goedkeuringsworkflow → boeking naar het grootboek.

Verder: een **optionele rondleiding** (hybride: vrij klikken óf begeleid), een **demo-reset**, en
een **CTA-pop-up** die pas na ± 3 minuten *actief* gebruik verschijnt en weg te klikken is.

## Zo plaats je het op je website

Host de bestanden (de hele map) op je webserver of CDN en embed de `index.html` in een iframe:

```html
<iframe
  src="https://jouw-domein.nl/visma-net-demo/index.html"
  title="Visma Net interactieve demo"
  style="width:100%;height:820px;border:0;border-radius:12px;overflow:hidden"
  loading="lazy">
</iframe>
```

Tips:
- Geef het iframe voldoende hoogte (± 800–860px op desktop). De demo is responsive en schaalt
  mee op smallere schermen.
- Plaats de map zoals hij is — `index.html` verwijst relatief naar `assets/app.css` en
  `assets/app.js`.

## Configuratie

Alle instellingen staan bovenaan `assets/app.js` in het `CONFIG`-blok:

| Instelling        | Betekenis |
|-------------------|-----------|
| `ctaUrl`          | Waar de CTA-knoppen naartoe linken (jullie demo-aanvraag-/contactpagina). |
| `ctaAfterSeconds` | Na hoeveel seconden *actief* gebruik de lead-pop-up verschijnt (`180` = 3 min). |
| `offerTourOnLoad` | `true`/`false` — toon bij openen de vraag "wil je een rondleiding?". |

## Lead capture koppelen (HubSpot)

De CTA-pop-up linkt nu naar `CONFIG.ctaUrl`. Voor échte leadregistratie zijn er twee routes:

- **Eenvoudig:** zet `ctaUrl` op een HubSpot-landingspagina met formulier. Je houdt dan alle
  leaddata in HubSpot.
- **Ingebed formulier:** vervang in `assets/app.js` in de functie `showCTA()` de twee knoppen door
  je HubSpot-formulier-embedcode (`//js.hsforms.net/forms/embed/...`). Let op: client-side
  embedden betekent dat je HubSpot-portal-ID/form-ID in de broncode staat — gebruik daarom een
  regulier HubSpot-webformulier (geen API-sleutels in de demo).

## Je eigen content

- **Dummy-data** (producten, klanten, orders, inkoopfacturen, KPI's) staat in `assets/app.js`
  in de functie `seedData()`. Pas vrij aan naar een branche die bij je doelgroep past.
- **Demodatum** staat in `DEMO_TODAY` (`assets/app.js`) zodat nieuwe orders consistent blijven
  met het boekjaar van de dataset.
- **Consolit-logo:** in de footer staat nu een tekst-wordmark (`.consolit-logo` in
  `assets/app.css` / `index.html`). Vervang die door jullie eigen SVG-logo voor de echte huisstijl.
- **Visma Net-uiterlijk** is gebaseerd op het officiële "Gaia" design system (kleuren, Inter-font,
  logo). Zie de tokens bovenin `assets/app.css`.

## Techniek

- 100% client-side: HTML + CSS + vanilla JavaScript. Geen build-stap, geen backend, geen
  externe frameworks.
- Enige externe resource: het **Inter**-lettertype van Google Fonts (valt terug op een
  systeemfont als dat niet laadt).
- Getest in Chromium; werkt op desktop en mobiel.

## Bestanden

```
index.html                  App-structuur (top bar, breadcrumb, hamburger-flyout, hosts)
assets/app.css              Styling nagebouwd op de echte Visma Net-schermen
assets/app.js               Dummy-data, schermen, flows, rondleiding, CTA
docs/ANALYSE-VISMA-NET.md   Commerciële analyse + onderbouwing van de gekozen USP's
docs/UI-SPEC.md             Nauwkeurige UI-opbouw van het echte product (referentie)
```
