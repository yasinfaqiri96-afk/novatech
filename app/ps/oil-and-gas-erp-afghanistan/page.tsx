import MashalFlow from "@/components/mashal/MashalFlow";
import MashalImage from "@/components/mashal/MashalImage";
import { mashalCaseStudy, mashalCaseStudyPath } from "@/lib/mashal-case-study";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import styles from "@/components/MashalProductPage.module.css";
import { buildMetadata } from "@/lib/metadata";
import {
  mashalCanonicalPath,
  mashalEnglishPath,
  mashalLanguageAlternates,
  mashalPashtoPath,
  mashalScreen,
  mashalScreens,
} from "@/lib/mashal";
import { companyInfo } from "@/lib/site-content";
import { breadcrumbSchema, faqSchema, graph, softwareApplicationSchema, webPageSchema } from "@/lib/seo";

const introduction = "مشعل (MASHAL) د افغانستان د تېلو او ګازو د سوداګرۍ د مدیریت نرم\u200cافزار او د نواتیک (Novatech Technology Solutions) محصول دی. قراردادونه، بارګیري، لېږد، ټانکونه، پلور، د شریکانو حسابونه او د ګټې راپورونه په یوه سیستم کې سره نښلوي.";

const title = "مشعل | د افغانستان د تېلو او ګازو ERP | نواتیک";
const description = "مشعل د افغانستان د نفتي شرکتونو لپاره ERP دی؛ قراردادونه، بارګیري، ټانکرونه، زېرمتون، پلور، مالي چارې، شریکان او ګټه په یوه لړۍ کې اداره کوي.";

const breadcrumbs = [
  { name: "کور", path: "/" },
  { name: "مشعل؛ د تېلو او ګازو ERP", path: mashalPashtoPath },
];

const workflow = [
  ["قرارداد", "اندازه، بیه، عرضه کوونکی او د شریکانو جوړښت"],
  ["بارګیري", "د سرچینې اندازه، اسناد، Platts او د اسعارو نرخ"],
  ["لېږد", "ټانکر، چلوونکی، لاره او په مسیر کې مال"],
  ["تخلیه", "د مقصد اندازه او د کسر ثبت په هماغه پړاو کې"],
  ["زېرمتون", "ورود، انتقال او د محصول له مخې موجودي"],
  ["پلور", "مستقیم یا له زېرمتونه پلور او د پېرودونکي حساب"],
  ["لګښت او مالي", "کرایه، ګمرک، رسید او څو اسعارو تادیات"],
  ["ګټه او زیان", "د واقعي پلور او تړلو لګښتونو پر بنسټ راپور"],
] as const;

const modules = [
  ["قراردادونه او پېرود", "د عرضه کوونکي شرایط، اندازه، نرخ، شریکان او د قرارداد د اجرا حالت."],
  ["بارګیري", "د بارګیرۍ رسید، اندازه، اسناد او له اصلي قرارداد سره روښانه اړیکه."],
  ["ټانکر او لوجستیک", "موټر، چلوونکی، لاره، مستقیم لېږد او په مسیر کې مالونه."],
  ["ټانکونه او موجودي", "ورود، خروج، انتقال، کسر او د هر حرکت د سرچینې تعقیب."],
  ["پلور او تحویلي", "نغدي یا پور پلور، له ټانکه یا مستقیم تحویلي او د پېرودونکي پاتې حساب."],
  ["مالي او حساب", "رسید، تادیه، لګښت، صندوق، بانک او د ډالر او افغانۍ جلا مانده."],
  ["شریکان", "ونډه، تمویل، تادیات، مانده او تصفیه د اړوندو اسنادو له مخې."],
  ["مدیریتي راپورونه", "د قرارداد او محمولې ګټه، موجودي، طلب، پور او ګټه او زیان."],
] as const;

const pashtoScreens = [
  {
    ...mashalScreen("contract"),
    alt: "په مشعل کې د پېرود قرارداد لنډیز او چرخه",
    caption: "د قرارداد لنډیز؛ له مقدار او ارزښت څخه تر بارګیرۍ، پلور، تادیاتو، ګټې او زیان او د شریکانو ونډې پورې.",
  },
  {
    ...mashalScreen("loading"),
    alt: "په مشعل کې د ډیزلو د بارګیرۍ جزئیات",
    caption: "د بارګیرۍ جزئیات؛ د بارګیرۍ اندازه، رسید، کسر او پاتې، له فی ټن بیې او ارزښت سره.",
  },
  {
    ...mashalScreen("transport"),
    alt: "په مشعل کې د نفتي توکو د لېږد جزئیات",
    caption: "د لېږد جزئیات؛ له بارګیرۍ تر تخلیې لاره، سپارل شوې اندازه، کسر او عملیاتي لګښتونه.",
  },
  {
    ...mashalScreen("tanks"),
    alt: "په مشعل کې د نفتي توکو د زېرمو ټانکونه",
    caption: "د زېرمو ټانکونه؛ ټول ظرفیت، فعال ټانکونه، دفتري او اوسنۍ موجودي.",
  },
] as const;

const questions = [
  ["مشعل څه شی دی؟", "مشعل (MASHAL) د افغانستان د تېلو او ګازو د سوداګرۍ د مدیریت لپاره د نواتیک (Novatech Technology Solutions) محصول دی؛ قراردادونه، بار، ټانکونه، پلور، د شریکانو حسابونه او د ګټې راپورونه سره نښلوي."],
  ["مشعل د کومو شرکتونو لپاره مناسب دی؟", "د هغو واردوونکو، عمده پلورونکو او توزیع کوونکو لپاره چې قراردادونه، ټانکرونه، ټانکونه، پور پلور، څو اسعار یا شریکان لري."],
  ["له عمومي حسابدارۍ سره یې توپیر څه دی؟", "عمومي حسابداري مالي سند ثبتوي؛ مشعل هغه قرارداد، محموله، لېږد، د زېرمتون حرکت یا پلور هم ورسره تړلی ساتي چې سند ترې جوړ شوی."],
  ["ډالر او افغانۍ جلا اداره کوي؟", "هو. د هر اسعار مبلغ او مانده جلا پاتې کېږي او د تبدیلۍ نرخ له اړوند عملیاتو سره ثبتېږي."],
  ["د قرارداد یا محمولې ګټه ښيي؟", "هو. واقعي پلور، د سرچینې لګښت او اړوند مصارف یوځای ارزول کېږي، څو نا پلورل شوې موجودي قطعي ګټه ونه ګڼل شي."],
  ["تمام‌شوی لګښت، ضایعات او په لاره کې بارونه څنګه تعقیبېږي؟", "د پېرود بیه، کرایه، ګمرک او لګښتونه له اړوند بار او قرارداد سره تړل کېږي. د بارګیرۍ او سپارلو اندازه او کسر په هر پړاو کې ثبتېږي؛ د لېږد حالت او په لاره کې د مال موجودي هم تعقیبېږي."],
  ["د مشعل ډیمو څنګه وغواړو؟", "د محصول په دري پاڼه کې د ډیمو غوښتنې فورمه د نوم، شرکت، د اړیکې شمېرې او کاري برخې په معلوماتو ډکه کړئ، یا له نواتیک سره اړیکه ونیسئ. ډیمو ستاسو د شرکت له کاري بهیر سره سم چمتو کېږي."],
] as const;

export const metadata = buildMetadata({
  fullTitle: title,
  title: "مشعل؛ د افغانستان د تېلو او ګازو ERP",
  description,
  path: mashalPashtoPath,
  image: mashalScreens[0].src,
  imageAlt: "په افغانستان کې د نفتي شرکتونو لپاره د مشعل ERP ډشبورډ",
  imageWidth: mashalScreens[0].width,
  imageHeight: mashalScreens[0].height,
  languages: mashalLanguageAlternates,
  locale: "ps_AF",
});

export default function MashalPashtoPage() {
  return (
    <article className={styles.page}>
      <JsonLd data={graph(
        webPageSchema({ path: mashalPashtoPath, name: title, description, inLanguage: "ps-AF", breadcrumb: breadcrumbs }),
        breadcrumbSchema(breadcrumbs),
        softwareApplicationSchema({ path: mashalPashtoPath, name: "Mashal", alternateName: "مشعل", description: introduction, images: mashalScreens.map((screen) => screen.src), inLanguage: "ps-AF" }),
        faqSchema(questions.map(([question, answer]) => ({ question, answer }))),
      )} />

      <header className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <Breadcrumbs items={breadcrumbs} />
            <p className={styles.eyebrow}>مشعل / تخصصي نفتي ERP</p>
            <h1 className={styles.title}>مشعل؛ د افغانستان د تېلو او ګازو تخصصي ERP</h1>
            <p className={styles.lede}>{introduction}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href={`${mashalCanonicalPath}#mashal-demo`}>د مشعل ډیمو وغواړئ<ArrowLeft size={17} aria-hidden="true" /></Link>
              <a className={styles.secondaryAction} href="#pashto-screens">د سیستم اصلي چاپېریال وګورئ</a>
            </div>
            <nav className={styles.languageLinks} aria-label="د مشعل ژبې">
              <Link href={mashalCanonicalPath} lang="fa-AF">دری</Link>
              <Link href={mashalEnglishPath} lang="en-AF" dir="ltr">English</Link>
            </nav>
          </div>
          <figure className={styles.heroVisual}>
            <figcaption className={styles.screenLabel}><span>د مشعل اصلي ډشبورډ</span><span lang="en" dir="ltr">Mashal ERP</span></figcaption>
            <div className={styles.screenFrame}><MashalImage src={mashalScreens[0].src} alt="په افغانستان کې د نفتي شرکتونو لپاره د مشعل ERP ډشبورډ" width={mashalScreens[0].width} height={mashalScreens[0].height} sizes="(min-width: 1200px) 58vw, (min-width: 900px) 54vw, 94vw" priority language="ps" aspectRatio={`${mashalScreens[0].width} / ${mashalScreens[0].height}`} /></div>
          </figure>
        </div>
      </header>
      <div className={styles.shell}><MashalFlow language="ps" /></div>

      <aside className={styles.trust} aria-label="د مشعل بنسټیز واقعیتونه"><ul className={`${styles.shell} ${styles.trustList}`}><li><span>01</span>د نفتي سوداګرۍ لپاره جوړ شوی</li><li><span>02</span>واقعي عملیاتي سیستم</li><li><span>03</span>په افغانستان کې پلي کول او ملاتړ</li></ul></aside>

      <section className={styles.workflowSection} aria-labelledby="pashto-workflow-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeader}><p className={styles.kicker}>یوه تړلې عملیاتي لړۍ</p><h2 id="pashto-workflow-title" className={styles.heading}>له قرارداد څخه تر ګټې او زیان پورې</h2><p className={styles.sectionIntro}>اندازه، سند او مالي اغېز د خپل اصلي قرارداد او محمولې اړیکه نه بایلي.</p></div>
          <ol className={styles.workflow}>{workflow.map(([step, text], index) => <li key={step}><span className={styles.workflowNumber}>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong><span>{text}</span></li>)}</ol>
        </div>
      </section>

      <section className={styles.sectionSoft} aria-labelledby="pashto-modules-title">
        <div className={styles.shell}><div className={styles.sectionHeader}><p className={styles.kicker}>اته تړلي کاري برخې</p><h2 id="pashto-modules-title" className={styles.heading}>د مشعل اصلي ماډیولونه</h2></div><div className={styles.moduleGrid}>{modules.map(([name, text]) => <section key={name} className={styles.moduleCard}><h3>{name}</h3><p>{text}</p></section>)}</div></div>
      </section>

      <section id="pashto-screens" className={styles.section} aria-labelledby="pashto-screens-title">
        <div className={styles.shell}><div className={styles.sectionHeader}><p className={styles.kicker}>واقعي محصول</p><h2 id="pashto-screens-title" className={styles.heading}>د پرېکړې تر مخه سیستم په خپله وګورئ</h2><p className={styles.sectionIntro}>دا انځورونه د مشعل له اصلي چاپېریال څخه دي؛ د اشخاصو او شرکتونو نومونه او د موټرو نمبرونه پټ شوي دي.</p></div><div className={styles.primaryGallery}>{pashtoScreens.map((screen, index) => <figure key={screen.key} className={index === 0 ? styles.featuredShot : styles.shot}><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes={index === 0 || index === pashtoScreens.length - 1 ? "(min-width: 1320px) 1220px, 94vw" : "(min-width: 900px) 600px, 94vw"} loading="lazy" /><figcaption>{screen.caption}</figcaption></figure>)}</div></div>
      </section>

      <section className={styles.sectionSoft} aria-labelledby="customer-case-title">
        <div className={styles.shell}>
          <h2 id="customer-case-title" className={styles.heading}>{mashalCaseStudy.ps.title}</h2>
          <p className={styles.sectionIntro}>{mashalCaseStudy.ps.text}</p>
          <Link className={styles.secondaryAction} href={mashalCaseStudyPath}>{mashalCaseStudy.ps.link}</Link>
        </div>
      </section>

      <section className={styles.sectionSoft} aria-labelledby="pashto-faq-title">
        <div className={`${styles.shell} ${styles.faqLayout}`}><div className={styles.sectionHeader}><p className={styles.kicker}>لنډ ځوابونه</p><h2 id="pashto-faq-title" className={styles.heading}>د مشعل په اړه عامې پوښتنې</h2></div><div className={styles.faqList}>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className={styles.finalCta} aria-labelledby="pashto-cta-title">
        <div className={`${styles.shell} ${styles.demoGrid}`}><div><p className={styles.kicker}>بل ګام</p><h2 id="pashto-cta-title" className={styles.heading}>مشعل د خپل شرکت له واقعي کاري بهیر سره وګورئ</h2></div><div className={styles.demoCopy}><p>د ډیمو او ستاسو د سوداګرۍ لپاره د مناسبې نسخې د ارزونې په موخه له نواتیک سره اړیکه ونیسئ.</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`${mashalCanonicalPath}#mashal-demo`}>د ډیمو غوښتنه</Link><a className={styles.secondaryAction} href={`tel:${companyInfo.primaryPhoneHref}`}>له نواتیک سره اړیکه</a></div></div></div>
      </section>
    </article>
  );
}
