/**
 * The posters shown in the cinematic showcase. Each card is one delivered
 * system, drawn from lib/case-studies.ts, so a system can never appear here
 * and nowhere else — the href is its case-study page. The artwork is the
 * system's own product poster; those are portrait, which is the shape the card
 * frame already uses.
 */
import { caseStudyBySlug } from "@/lib/case-studies";
import { tankTilPoster } from "@/lib/portfolio";

export type Poster = {
  key: string;
  href: string;
  /** Poster title. Short on purpose: a poster is not a service card. */
  title: string;
  /** One tiny line above the title. Never a sentence. */
  kicker: string;
  image: string;
  alt: string;
  /** Barely visible colour cast that keeps the eight posters from looking identical. */
  tint: string;
};

/**
 * Order alternates domains so two neighbouring posters never read as the same
 * subject while they cross the focal line.
 */
const artwork: {
  slug: string;
  title: string;
  kicker: string;
  tint: string;
  /** Poster that is not a case study: its own artwork, alt text and target. */
  standalone?: { image: string; alt: string; href: string };
}[] = [
  {
    slug: "logistics-management-system",
    title: "نرم افزار کارگو",
    kicker: "لجستیک",
    tint: "29 129 128",
  },
  {
    slug: "restaurant-pos",
    title: "نرم افزار رستورانت",
    kicker: "فروش",
    tint: "56 120 150",
  },
  {
    slug: "warehouse-management-system",
    title: "مدیریت گدام",
    kicker: "انبار",
    tint: "42 116 132",
  },
  {
    // The original blue Tank Til poster. Mashal keeps its own product pages
    // and case study; this card shows the pump-station product instead.
    slug: "tank-til",
    title: "نرم افزار تانک تیل",
    kicker: "پمپ استیشن",
    tint: "40 84 160",
    standalone: {
      image: tankTilPoster.img,
      alt: tankTilPoster.imageAlt,
      href: "/portfolio#software-systems",
    },
  },
  {
    slug: "supermarket-management-system",
    title: "نرم افزار سوپرمارکت",
    kicker: "خرده فروشی",
    tint: "34 124 118",
  },
  {
    slug: "attendance-system",
    title: "حضور و غیاب",
    kicker: "اداری",
    tint: "38 122 126",
  },
  {
    slug: "travel-agency-system",
    title: "شرکت های سیاحتی",
    kicker: "سفر",
    tint: "60 108 142",
  },
  {
    slug: "tailoring-management-system",
    title: "کارگاه خیاطی",
    kicker: "تولید",
    tint: "70 118 128",
  },
];

export const posters: Poster[] = artwork.map((entry) => {
  if (entry.standalone) {
    return {
      key: entry.slug,
      href: entry.standalone.href,
      title: entry.title,
      kicker: entry.kicker,
      image: entry.standalone.image,
      alt: entry.standalone.alt,
      tint: entry.tint,
    };
  }

  const study = caseStudyBySlug[entry.slug];

  return {
    key: entry.slug,
    href: `/portfolio/${entry.slug}`,
    title: entry.title,
    kicker: entry.kicker,
    image: study.desktopImage as string,
    alt: study.desktopImageAlt ?? study.title,
    tint: entry.tint,
  };
});
