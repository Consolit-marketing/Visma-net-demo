# Commerciële analyse Visma Net & onderbouwing demo-USP's

*Opgesteld als basis voor de interactieve demo-sandbox. Markt: NL/Benelux. Bronnen: Visma-eigen
content, Visma-partners (Consolit, AccountOne/Peple), Visma Community, reviewsites. Prijs- en
reviewclaims zijn met terughoudendheid gebruikt — zie de waarschuwingen onderaan.*

---

## 1. Wat is Visma Net (commercieel kader)

Visma.net ERP ("Visma Net" / "Visma Net Financials") is een **100% cloud-native SaaS-ERP** van het
Noorse Visma. Modulair rond een financiële kern (grootboek, debiteuren, crediteuren, vaste activa,
cash, btw/ICP), uitbreidbaar naar **Logistics** (inkoop/verkoop/voorraad), **Project**,
**Approval**, **AutoInvoice** (e-facturatie/Peppol), **Expense**, **HRM/Payroll** en **CRM**.

- **Doelgroep:** groeiend MKB tot mid-market (± 20–2.000 medewerkers), vaak meerdere
  entiteiten/vestigingen; handel/groothandel, industrie, projectorganisaties. Bedrijven die
  "ontgroeid" zijn aan een los boekhoudpakket, maar geen zwaar traditioneel ERP willen.
- **Beslissers:** CFO / controller / financieel manager + IT.
- **Positie:** marktleider in de Nordics; in NL/Benelux een uitdager via partners (o.a. Consolit).

## 2. USP's, gerangschikt op overtuigingskracht

1. **AutoInvoice + Peppol** — sterkste harde claim: in-/uitgaande e-facturatie automatisch via het
   Europese Peppol-netwerk. *"Factuurverwerking van ~10 minuten naar < 1 minuut."*
2. **Alles in één datamodel** — van order tot factuur, inkoop tot grootboek; geen dubbele invoer.
3. **Realtime sturen** — KPI-dashboards, actuele cijfers. *"Sturen in plaats van reageren."*
4. **Echte cloud/SaaS** — geen server/VPN, automatische updates, overal toegang.
5. **Automatisering** — bankmatching, auto-afschrijvingen, automatische aanmaningen.
6. **Approval & functiescheiding** — rolgebaseerd, bedrag-afhankelijk, ook mobiel.
7. **Multi-company/consolidatie** — meerdere entiteiten uit één omgeving, auto-intercompany.
8. **Open API & schaalbaarheid** — webshop/BI/branche-integraties; "groeit mee".
9. **Onbegrensd gebruikers (prijsmodel)** — differentiator t.o.v. per-user-modellen.

## 3. Koopmotieven & concurrentie

**Pijnpunten die het oplost:** einde aan lokale servers/migraties; één bron i.p.v. losse
spreadsheets; minder handwerk in facturatie/inkoop; geen dubbele invoer; realtime inzicht;
consolidatie zonder handmatig intercompany-werk; mobiel declareren/goedkeuren.

**NL-concurrenten in het hoofd van de lead:** Exact (Online), AFAS, Twinfield, Microsoft Dynamics
365 Business Central (+ zwaarder: SAP B1, NetSuite). Onderscheidende hoek Visma Net: echte SaaS +
Peppol-automatisering + onbegrensd-gebruikers-model + één datamodel van financieel t/m
logistiek/projecten/HR.

## 4. Welke USP's zijn werkbaar in een vereenvoudigde sandbox

Beoordeeld op **demo-waarde** × **simuleerbaarheid** zonder live backend (dummy-data, browser-only):

| USP-flow | Demo-waarde | Simuleerbaar | Besluit |
|----------|:-----------:|:------------:|---------|
| KPI-dashboard als startscherm | ★★★ | ★★★ | **In demo (anker)** |
| Order-to-cash (order → voorraad → pakbon → factuur) | ★★★ | ★★★ | **In demo (hoofdflow)** |
| Inkoopfactuur → herkenning → approval | ★★★ | ★★☆ | **In demo (hoofdflow)** |
| AutoInvoice/Peppol "verzenden" | ★★★ | ★★☆ | **In demo** (gekoppeld aan order-to-cash) |
| Bankmatching / aanmaningen | ★★☆ | ★★★ | Optioneel (later uit te breiden) |
| Declaratie + SmartScan | ★★☆ | ★★☆ | Optioneel |
| Multi-company/consolidatie | ★★★ | ★☆☆ | Buiten scope ("basics") |
| HRM/Payroll | ★★☆ | ★☆☆ | Buiten scope |

**Leidend principe (uit de research):** één end-to-end flow helemaal doorlopen verkoopt de
integratie-USP sterker dan tien losse schermen. Daarom: diepte in 3 flows i.p.v. breedte.

## 5. Gekozen opzet voor de demo (v1)

- **Fictief bedrijf:** Noordzee Outdoor B.V. (groothandel outdoor/kamperen) — past bij de
  handels-doelgroep.
- **Flows:** Dashboard · Order-to-cash (incl. Peppol-verzending) · Inkoopfactuur + approval.
- **Interactie:** hybride — vrij klikken + optionele rondleiding.
- **Lead capture:** geen drempel vooraf; CTA-pop-up na ± 3 min actief gebruik, wegklikbaar.
- **Branding:** authentiek Visma Net (Gaia design system) + "aangeboden door Consolit" en CTA.

## 6. Tone of voice (NL)

"Sturen in plaats van reageren" · "Grip op je cijfers" · "Geen dubbele invoer" · "Altijd en
overal actueel inzicht" · "Alles in één systeem" · "Van order tot factuur zonder handmatig werk".
Jij-vorm, resultaat- en controle-gericht.

## ⚠️ Waarschuwingen voor marketinggebruik

- **Prijzen spreken elkaar tegen tussen bronnen** (o.a. €239/user, €550/mnd, Nordic
  onbegrensd-model). Zet **geen prijs** in demo of pitch zonder verificatie bij Visma / de
  partnerportal.
- **Reviewbasis is dun** (Capterra/GetApp: 1 review). Gebruik geen "sociale bewijslast"-sterren.
- **Veel diepe productdetails komen van partnersites**, niet van Visma zelf. Voor harde
  specs/compliance-claims: Visma-eigen documentatie of de Visma Community aanhouden.
- **Naamgeving:** "Visma eAccounting" is een apart, lichter product (kleine ondernemers) — niet
  verwarren met Visma.net ERP in de pitch.
