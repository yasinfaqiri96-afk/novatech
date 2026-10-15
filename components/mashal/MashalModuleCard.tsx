import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import MashalImage from "./MashalImage";
import styles from "./MashalModuleCard.module.css";

export type MashalModuleCardData = {
  slug: string;
  title: string;
  text: string;
  href: string;
  link: string;
  icon: LucideIcon;
  image: { src: string; alt: string; width: number; height: number; caption: string };
};

export default function MashalModuleCard({ module: { slug, title, text, href, link, image } }: { module: MashalModuleCardData }) {
  return (
    <article className={styles.card} data-mashal-module={slug}>
      <figure className={styles.figure}>
        <MashalImage {...image} sizes="(min-width: 1240px) 568px, (min-width: 561px) 46vw, 92vw" />
        <figcaption>{image.caption}</figcaption>
      </figure>
      <div className={styles.body}>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link className={styles.link} href={href}>{link}<ArrowLeft size={17} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
