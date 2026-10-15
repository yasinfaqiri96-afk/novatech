import MashalFlow from "@/components/mashal/MashalFlow";
import MashalImage from "@/components/mashal/MashalImage";
import { mashalCaseStudy, mashalCaseStudyPath } from "@/lib/mashal-case-study";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  mashalCanonicalPath,
  mashalEnglishPath,
  mashalLanguageAlternates,
  mashalPashtoPath,
  mashalScreens,
} from "@/lib/mashal";
import { breadcrumbSchema, faqSchema, graph, softwareApplicationSchema, webPageSchema } from "@/lib/seo";
import styles from "@/components/MashalProductPage.module.css";

const introduction = "MASHAL is oil and gas trading management software for Afghanistan, developed by NOVATECH Technology Solutions. It connects contracts, loading, transport, tanks, sales, partner accounts and profit reports in one system.";

const title = "Mashal Oil & Gas ERP Afghanistan | NOVATECH";
const description = "Mashal is NOVATECH’s oil and gas ERP for contracts, tanker logistics, tank inventory, sales, multi-currency finance and profitability in Afghanistan.";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Mashal Oil & Gas ERP", path: mashalEnglishPath },
];

export const metadata = buildMetadata({
  fullTitle: title,
  title: "Mashal Oil & Gas ERP Afghanistan",
  description,
  path: mashalEnglishPath,
  image: mashalScreens[0].src,
  imageAlt: "Mashal oil and gas ERP dashboard for petroleum operations in Afghanistan",
  imageWidth: mashalScreens[0].width,
  imageHeight: mashalScreens[0].height,
  languages: mashalLanguageAlternates,
  locale: "en_AF",
});

const modules = [
  ["Contracts & purchasing", "Supplier terms, partner participation, pricing, Platts references, FX and contract execution."],
  ["Loading & receipts", "Origin quantities, purchase receipts, documentation and allocations linked to the contract."],
  ["Tanker logistics", "Vehicle, driver, route, direct transport, staged delivery and goods in transit."],
  ["Tank inventory", "Storage tanks, transfers, shortages, losses and source-aware inventory movements."],
  ["Sales", "Direct or tank sales, credit sales, customer balances and delivery."],
  ["Multi-currency finance", "Receipts, payments, expenses, cash or bank activity, FX and ledger records."],
  ["Partners", "Shares, funding, balances and settlement tied back to operational documents."],
  ["Management reporting", "Contract profitability, inventory, transit, receivables, payables and profit & loss."],
] as const;

const questions = [
  ["What is Mashal?", "MASHAL is a NOVATECH Technology Solutions product for managing oil and gas trading in Afghanistan. It connects contracts, cargo, tanks, sales, partner accounts and profit reports."],
  ["Who is it built for?", "It is designed for petroleum importers, distributors and trading companies that manage contracts, tankers, tanks, credit sales, multiple currencies or partners."],
  ["How is it different from general accounting software?", "General accounting records the financial document. Mashal also preserves the operational source: the contract, cargo, transport, tank movement or sale behind that document."],
  ["Does Mashal support USD and AFN?", "Yes. USD and AFN amounts and balances remain distinct, with exchange-rate context attached to the relevant operation."],
  ["Can it report profit by contract or cargo?", "Yes. Realized sales, source cost and linked expenses can be reviewed together without presenting unsold inventory as realized profit."],
  ["How are landed cost, losses and goods in transit tracked?", "Purchase cost, freight, customs and expenses stay linked to the cargo and contract. Loaded and delivered quantities and shortages are recorded at each stage; transport status and goods-in-transit inventory can also be tracked."],
  ["How can we request a Mashal demo?", "Use the demo request form on the Dari product page with your name, company, phone number and business area, or contact NOVATECH. The demo is prepared around your company’s workflow."],
] as const;

export default function MashalEnglishPage() {
  return (
    <article className={styles.page}>
      <JsonLd data={graph(
        webPageSchema({ path: mashalEnglishPath, name: title, description, inLanguage: "en-AF", breadcrumb: breadcrumbs }),
        breadcrumbSchema(breadcrumbs),
        softwareApplicationSchema({ path: mashalEnglishPath, name: "Mashal", alternateName: "مشعل", description: introduction, images: mashalScreens.map((screen) => screen.src), inLanguage: "en-AF" }),
        faqSchema(questions.map(([question, answer]) => ({ question, answer }))),
      )} />

      <header className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>Purpose-built petroleum operations software</p>
            <h1 className={styles.title}>Oil &amp; Gas ERP Built for Petroleum Trading in Afghanistan</h1>
            <p className={styles.lede}>{introduction}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href={`${mashalCanonicalPath}#mashal-demo`}>Request a Mashal Demo <ArrowRight size={17} aria-hidden="true" /></Link>
              <a className={styles.secondaryAction} href="#english-modules">Explore the Modules</a>
            </div>
            <nav className={styles.languageLinks} aria-label="Mashal language versions">
              <Link href={mashalCanonicalPath} lang="fa-AF" dir="rtl">دری</Link>
              <Link href={mashalPashtoPath} lang="ps-AF" dir="rtl">پښتو</Link>
            </nav>
          </div>
          <figure className={styles.heroVisual}>
            <figcaption className={styles.screenLabel}><span className={styles.liveDot}>Real Mashal dashboard</span><span>Mashal ERP</span></figcaption>
            <div className={styles.screenFrame}><MashalImage src={mashalScreens[0].src} alt="Mashal oil and gas ERP dashboard in Afghanistan" width={mashalScreens[0].width} height={mashalScreens[0].height} sizes="(min-width: 900px) 54vw, 94vw" priority language="en" aspectRatio={`${mashalScreens[0].width} / ${mashalScreens[0].height}`} /></div>
          </figure>
        </div>
      </header>
      <div className={styles.shell}><MashalFlow language="en" /></div>

      <section id="english-modules" className={styles.section} aria-labelledby="english-modules-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeader}><p className={styles.kicker}>One operational chain</p><h2 id="english-modules-title" className={styles.heading}>From petroleum contract to realized profit</h2><p className={styles.sectionIntro}>Each area remains understandable on its own, while its quantities and financial records keep the source relationship required for management reporting.</p></div>
          <div className={styles.moduleGrid}>
            {modules.map(([module, text]) => <section key={module} className={styles.moduleCard}><h3>{module}</h3><p>{text}</p></section>)}
          </div>
        </div>
      </section>

      <section className={styles.sectionSoft} aria-labelledby="english-proof-title">
        <div className={`${styles.shell} ${styles.twoColumn}`}>
          <div><p className={styles.kicker}>Built around Afghan petroleum operations</p><h2 id="english-proof-title" className={styles.heading}>Why a petroleum-specific ERP matters</h2><p className={styles.sectionIntro}>A cargo changes context as it moves: contract execution, origin loading, transport, discharge, tank stock, delivery, expenses and settlement. Mashal keeps those events connected instead of rebuilding the relationship in spreadsheets at month end.</p></div>
          <ul className={styles.bulletList}>
            {["Contract-level traceability", "Goods-in-transit visibility", "Direct transport from loading", "Fuel quantity variance by stage", "USD and AFN finance", "Partner funding and settlement", "Realized contract and cargo profitability", "Local implementation, training and support in Afghanistan"].map((item) => <li key={item}><Check size={17} color="#158979" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className={styles.sectionSoft} aria-labelledby="customer-case-title">
        <div className={styles.shell}>
          <h2 id="customer-case-title" className={styles.heading}>{mashalCaseStudy.en.title}</h2>
          <p className={styles.sectionIntro}>{mashalCaseStudy.en.text}</p>
          <Link className={styles.secondaryAction} href={mashalCaseStudyPath}>{mashalCaseStudy.en.link}</Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="english-faq-title">
        <div className={styles.shell}><div className={styles.sectionHeader}><p className={styles.kicker}>Direct answers</p><h2 id="english-faq-title" className={styles.heading}>Mashal Oil &amp; Gas ERP FAQ</h2></div><div className={styles.faqList}>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div>
      </section>
    </article>
  );
}
