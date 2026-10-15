# Mashal Phase 2 search-intent and competitor research

Research date: 2026-10-04 (SERP re-checked and competitor pages read on the same day)

No Search Console or Analytics account was available in the project or server
environment, so this document records observed SERP composition and competitor
page content only. It does not invent search volumes, clicks, positions or
ranking guarantees.

## 1. SERP composition

### `نرم افزار نفت و گاز افغانستان` / `ERP شرکت نفتی`

The result set is dominated by Iranian vendors and Wikipedia/informational
pages — Malek, Arpaco, Jahad Tehran, plus the reservoir-engineering cluster
(ECLIPSE, PETREL, OLGA). The only Afghan institutional result is `aogc.gov.af`,
which is a ministry/state body, not a software page.

Conclusion: no Afghan vendor currently owns a commercial product page for this
intent. The competing pages are either foreign-market financial software or
upstream engineering tools, neither of which answers an Afghan trading
company's question.

### `نرم افزار مدیریت دیپو / تانکر / مواد نفتی` (Dari, Afghanistan terms)

Entirely Iranian or informational: fuel-distribution software (Pishgaman Asia),
tanker-transport software (Nikavazeh), tank engineering tools (PHAST, "نرم افزار
tank"), plus the Wikipedia article on oil and gas in Afghanistan. The Afghan
operational vocabulary — بار، بارگیری، دیپو، گدام، تانکر، مفاد، راپور، گمرک —
is not served by any ranking commercial page.

### `petroleum trading ERP software Afghanistan` (English)

The results are Afghan petroleum **companies**, not software vendors: Afghan
National Petroleum, Afghan Petrol Group, Ghazanfar Group, Khafi Petroleum,
Solaimankhil, Anardarah Petroleum, plus the Logistics Cluster fuel brief. The
only software result is PakEnergy, a US upstream/energy-trading accounting
suite with no Afghanistan context.

Conclusion: the English query returns the audience itself. A page written for
that audience has no direct vendor competition on the SERP.

## 2. Competitors read directly

| Competitor | Market | What it is | Oil & gas depth | Language |
| --- | --- | --- | --- | --- |
| Octate ERP (`octate.ooo`) | Dubai, UAE; SME global | Cloud ERP: accounting, orders, procurement, inventory, warehouse, job costing, UAE e-invoicing, POS, BI | Lists "Oil & Gas" as one of seven industries, described only as financials, procurement, asset tracking and compliance. No loading, tanker, customs, depot, tank or cargo profitability. | English only |
| Fida Technologies (`fida.af`) | Kabul, Afghanistan | Enterprise software house: ERP/MIS, accounting, HRMIS and payroll, procurement, DMS, CRM, LIS, school ERP; products Realist ERP, Prime Sarafi, Darmal ERP, OGRAYI | No petroleum vertical at all; closest is a generic "Energy & Utilities" line. | English, Dari, Pashto |
| Alkharazmi (Herat) | Herat, Afghanistan | Software development company, 10–50 staff, web development (React/Vue) | No published petroleum product page. | — |
| PakEnergy Accounting | United States | Energy ERP for upstream operators and energy traders | Deep, but upstream/US-regulatory — wells, joint interest billing, US tax. Not import trading, not Afghan customs, not Dari. | English only |
| Iranian vendors (Malek, Arpaco, Pishgaman Asia) | Iran | Financial/fuel-distribution software | Iranian market, Iranian Persian, Iranian regulatory framing. | Persian (Iran) |

Competitors were read for gap analysis only. No competitor copy, structure or
wording was reproduced.

## 3. Gaps Mashal can fill with verified content

1. **The trading chain itself.** No ranking page documents contract → loading →
   tanker/transport → customs → depot/tank → sale → receipt → profit as one
   traceable flow. Mashal does this and it is verified in source.
2. **Shortage at the stage where it happens.** Nothing on the SERP addresses
   "کسری در کدام مرحله ایجاد شد" — origin quantity vs. destination receipt vs.
   tank movement. This is Mashal's strongest differentiator.
3. **Afghan customs as an operational record**, not a tax abstraction:
   اظهارنامه, جواز, مالک جواز, وزن, اقلام مصرف, ضمایم, تسویه. Absent from every
   competitor page read.
4. **Partner current accounts (حساب شرکا).** Afghan petroleum imports are
   commonly financed by several partners per cargo. No competitor page covers
   partner share, funding, settlement and balance.
5. **Real cost per litre/ton.** Freight, customs and operating expenses tied
   back to the specific contract or cargo. Octate's "job costing" is generic;
   it does not model cargo cost build-up.
6. **Afghan Dari vocabulary.** Every Persian-language competitor writes Iranian
   Persian. Pages written in Afghan Dari (مفاد, راپور, دیپو, بار, تحویل‌دهنده,
   صرافی) match how the buyer actually searches and speaks.
7. **Trilingual coverage with real equivalence.** Only Fida is trilingual, and
   it has no petroleum content to translate.

## 4. Ownership and page decisions

- `/oil-and-gas-software` is already indexed for the broad Afghanistan oil and
  gas software intent and remains the canonical hub. It was not moved.
- The tanker-logistics page is indexed for a clearly distinct transport intent
  and remains separate.
- New commercial pages were created only where Mashal has a distinct workflow
  **and** enough verified content: `loading`, `customs`, `sales`, `reports`,
  `security`. Each has an owner row in `docs/MASHAL-KEYWORD-MAP.md`.
- Quality inspection and asset maintenance stay as strong hub sections, not
  standalone pages: the Dari SERP for those phrases is informational and
  equipment-oriented, so a landing page would be thin and would compete with
  the hub.
- Existing NOVATECH blog content already owns the educational contract and
  multi-currency accounting questions. The new pages link to those articles
  instead of duplicating them.
- Afghanistan HRMIS/payroll is a real independent intent (Fida sells into it),
  but dedicated Mashal HR, attendance and payroll pages were withheld: the
  source snapshot verifies employee records and salary transactions, not the
  full attendance/leave/payroll lifecycle. See
  `docs/MASHAL-PHASE2-EVIDENCE.md`.

## 5. What this research does not claim

It does not claim a ranking position, a timeline to rank, or that Mashal is
"unrivalled". The observable facts are that the target SERPs currently contain
no Afghan petroleum-trading software page, and that Mashal has verified product
depth to publish one. Ranking remains dependent on crawling, links and
competition that may change.

## Sources consulted

- https://octate.ooo/
- https://fida.af/
- https://pakenergy.com/accounting
- https://www.malek-co.com/products/oil-gas-petrochemical-companies-software/
- https://lca.logcluster.org/31-afghanistan-fuel
- https://www.signalhire.com/companies/alkharazmi
