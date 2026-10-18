import Link from "next/link";
import Image from "next/image";
import portfolioSource from "@/lib/portfolio-data.json";
import MoreProjects, { type MoreProject } from "@/components/portfolio/MoreProjects";
import detailStyles from "@/components/portfolio/Detail.module.css";
import HeroWave from "@/components/HeroWave";
import styles from "./HomePortfolioShowcase.module.css";

type PortfolioSourceItem = (typeof portfolioSource)[number];

const items = portfolioSource as PortfolioSourceItem[];

const tabs = [
  { key: "software" as const, label: "نرم افزار" },
  { key: "website" as const, label: "سایت" },
];

function toProject(item: PortfolioSourceItem): MoreProject {
  return {
    href: item.caseStudySlug ? `/portfolio/${item.caseStudySlug}` : item.productHref ?? "/portfolio",
    title: item.title,
    category: item.category,
    image: item.desktopImg ?? item.img,
    color: item.cardColor,
    website: item.kind === "website",
  };
}

export default function HomePortfolioShowcase() {
  return <Showcase />;
}

function Showcase() {
  const softwareProjects = items.filter((item) => item.kind === "software" && !item.hideOnHome).map(toProject);
  const websiteProjects = items.filter((item) => item.kind === "website" && !item.hideOnHome).map(toProject);

  return (
    <section className={`${detailStyles.page} ${styles.section}`} aria-labelledby="home-portfolio-title">
      <HeroWave className={styles.waveTop} background="#050033" />
      <div className={styles.surface}>
        <input className={styles.tabInput} type="radio" name="home-portfolio-kind" id="home-portfolio-software" defaultChecked />
        <input className={styles.tabInput} type="radio" name="home-portfolio-kind" id="home-portfolio-website" />
        <div className={styles.inner}>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>پروژه‌های تحویل‌شده نواتیک</p>
              <h2 id="home-portfolio-title">نمونه‌کارهای <span>بیشتر</span></h2>
              <p className={styles.description}>
                بخشی از سامانه‌ها و وب‌سایت‌هایی که برای کسب‌وکارهای مختلف طراحی و اجرا کرده‌ایم.
              </p>
            </div>
            <div className={styles.tabs} role="tablist" aria-label="دسته‌بندی نمونه‌کارها">
              {tabs.map((tab) => (
                <label
                  key={tab.key}
                  role="tab"
                  htmlFor={`home-portfolio-${tab.key}`}
                >
                  {tab.label}
                </label>
              ))}
            </div>
          </header>

          <div id="home-portfolio-projects" aria-live="polite">
            <div className={`${styles.projectPanel} ${styles.softwarePanel}`}>
              <MoreProjects items={softwareProjects} />
            </div>
            <div className={`${styles.projectPanel} ${styles.websitePanel}`}>
              <MoreProjects items={websiteProjects} />
            </div>
          </div>

          <div className={styles.footer}>
            <Link href="/portfolio">مشاهده همه نمونه‌کارها <span aria-hidden="true">←</span></Link>
          </div>
        </div>
        <span className={styles.logo} aria-hidden="true">
          <Image src="/images/brand/novatech-mark-navy.webp" alt="" width={256} height={256} sizes="40px" />
        </span>
        <HeroWave className={styles.waveBottom} background="#ffffff" />
      </div>
    </section>
  );
}
