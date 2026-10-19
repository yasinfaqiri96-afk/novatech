/**
 * Single source of truth for the Novatech team members shown on the home page.
 *
 * Only verified information lives here: name, role and the portrait file that
 * already exists in the repository. Optional fields (short description, social
 * links) are intentionally absent until real content is available.
 */

export type TeamMember = {
  /** Stable key, also used for the portrait file name. */
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Intrinsic size of the source file, so Next/Image reserves the right box. */
  width: number;
  height: number;
  alt: string;
  /** Where the 4:5 portrait crop centres, as a CSS object-position (keeps every face at the same height). */
  focus: string;
  /**
   * Personal profiles, published only when the handle plainly belongs to the
   * named person. A link is left out rather than guessed: a profile under
   * another name was removed in Phase 3 (see docs/phase3-release-readiness.md).
   */
  socialLinks: {
    instagram?: string;
    facebook?: string;
  };
};

export const teamMembers: TeamMember[] = [
  {
    slug: "yaser-faqiri",
    name: "یاسر فقیری",
    role: "توسعه دهنده وب",
    image: "/images/team/yaser.webp",
    width: 1086,
    height: 1448,
    alt: "یاسر فقیری، توسعه دهنده وب در نواتیک",
    focus: "50% 18%",
      socialLinks: {
        instagram: "https://www.instagram.com/haji_yaser_faqiri/",
        facebook: "https://www.facebook.com/yaser.faghery",
      },
  },
  {
    slug: "ali-ahmad-bakhtyari",
    name: "علی احمد بختیاری",
    role: "طراح دیتابیس",
    image: "/images/ali.webp",
    width: 1272,
    height: 1237,
    alt: "علی احمد بختیاری، طراح دیتابیس در نواتیک",
    focus: "55% 50%",
      socialLinks: {
        instagram: "https://www.instagram.com/aliahmadbakhtyari/",
        facebook: "https://www.facebook.com/aliJoO.2006",
      },
  },
  {
    slug: "sayed-mahdi-kazemi",
    name: "سید مهدی کاظمی",
    role: "طراح گرافیک",
    image: "/images/mahdi.webp",
    width: 1227,
    height: 1281,
    alt: "سید مهدی کاظمی، طراح گرافیک در نواتیک",
    focus: "58% 50%",
      socialLinks: {
        instagram: "https://www.instagram.com/mahdi_kazemi1212/",
        // Profile name differs from the handle; confirmed as his by the site owner (2026-10-19).
        facebook: "https://www.facebook.com/reza.kazemi.7583",
      },
  },
];

/** Persian-Indic numerals for the sequence indicator, e.g. ۰۱. */
export function toPersianIndex(value: number): string {
  return String(value)
    .padStart(2, "0")
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}
