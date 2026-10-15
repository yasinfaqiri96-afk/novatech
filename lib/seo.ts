import { services } from "@/lib/services";
import { companyInfo, siteUrl } from "@/lib/site-content";
import { teamMembers } from "@/lib/team";

/**
 * Every JSON-LD node published by the site is built here so the business facts
 * can never drift between pages. Nothing in this file invents data: each field
 * is read from `companyInfo`, which is the single source of truth for the real
 * company name, address, coordinates, phone numbers and social profiles.
 *
 * Deliberately absent: aggregateRating, review, award, numberOfEmployees and
 * foundingDate. None of them is verifiable from the project, so none is claimed.
 */

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: companyInfo.addressStreet,
  addressLocality: companyInfo.addressCity,
  addressRegion: companyInfo.addressRegion,
  addressCountry: companyInfo.addressCountry,
};

/**
 * The eight service pages, restated as an offer catalog on the organization
 * itself. Every entry is read from `lib/services.ts`, which is the same source
 * the navigation, the sitemap and the per-page `Service` nodes read, so the
 * catalog can never list a service that has no page — or miss one that does.
 *
 * The point of publishing it here is entity-level: it tells a crawler which
 * services this specific organization provides, independently of which page it
 * happens to be reading.
 */
const organizationOfferCatalog = {
  "@type": "OfferCatalog",
  name: `خدمات ${companyInfo.brandName}`,
  itemListElement: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      "@id": `${siteUrl}${service.path}#service`,
      name: service.navLabel,
      serviceType: service.serviceType,
      url: `${siteUrl}${service.path}`,
    },
  })),
};

/**
 * Named staff, from `lib/team.ts`. Only the fields that file actually records
 * are published: no credentials, no biography, no social profile is invented.
 * `@id` is derived from the stable slug so the same person referenced from a
 * future author byline resolves to one node.
 */
const employeeNodes = teamMembers.map((member) => ({
  "@type": "Person",
  "@id": `${siteUrl}/about#${member.slug}`,
  name: member.name,
  jobTitle: member.role,
  image: `${siteUrl}${member.image}`,
  worksFor: { "@id": ORGANIZATION_ID },
}));

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: companyInfo.legalName,
  alternateName: [companyInfo.brandName, companyInfo.latinName, companyInfo.displayName],
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/novatech-logo-square.webp`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/images/novatech-logo-social-v2.webp`,
  email: companyInfo.email,
  description: companyInfo.shortDescription,
  telephone: [companyInfo.primaryPhoneHref, companyInfo.secondaryPhoneHref],
  address: postalAddress,
  areaServed: [
    { "@type": "Country", name: "Afghanistan" },
    { "@type": "City", name: "Herat" },
  ],
  knowsLanguage: ["fa-AF", "ps", "en"],
  sameAs: [companyInfo.instagramUrl],
  hasOfferCatalog: organizationOfferCatalog,
  employee: employeeNodes,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: companyInfo.primaryPhoneHref,
      email: companyInfo.email,
      contactType: "sales",
      areaServed: "AF",
      availableLanguage: ["fa-AF", "ps", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: companyInfo.secondaryPhoneHref,
      contactType: "customer support",
      areaServed: "AF",
      availableLanguage: ["fa-AF", "ps", "en"],
    },
  ],
};

/**
 * The Herat office is a real, staffed address that clients visit, so the
 * organization is additionally described as a `ProfessionalService`
 * LocalBusiness. It is published on the Herat and contact pages only — the
 * pages where the physical location is genuinely the subject.
 */
export const localBusinessSchema = {
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/herat#localbusiness`,
  name: `${companyInfo.legalName} — ${companyInfo.addressCity}`,
  alternateName: companyInfo.brandName,
  parentOrganization: { "@id": ORGANIZATION_ID },
  url: `${siteUrl}/herat`,
  image: `${siteUrl}/images/novatech-logo-social-v2.webp`,
  logo: `${siteUrl}/images/novatech-logo-square.webp`,
  telephone: companyInfo.primaryPhoneHref,
  email: companyInfo.email,
  address: postalAddress,
  geo: {
    "@type": "GeoCoordinates",
    latitude: companyInfo.geoLatitude,
    longitude: companyInfo.geoLongitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: companyInfo.openingHours.days,
      opens: companyInfo.openingHours.opens,
      closes: companyInfo.openingHours.closes,
    },
  ],
  areaServed: [
    { "@type": "City", name: "Herat" },
    { "@type": "Country", name: "Afghanistan" },
  ],
  sameAs: [companyInfo.instagramUrl],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteUrl,
  name: companyInfo.brandName,
  alternateName: companyInfo.legalName,
  inLanguage: "fa-AF",
  publisher: { "@id": ORGANIZATION_ID },
};

export type BreadcrumbEntry = { name: string; path: string };

export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: `${siteUrl}${entry.path}`,
    })),
  };
}

export function webPageSchema({
  path,
  name,
  description,
  breadcrumb,
  inLanguage = "fa-AF",
}: {
  path: string;
  name: string;
  description: string;
  breadcrumb?: BreadcrumbEntry[];
  inLanguage?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${siteUrl}${path}#webpage`,
    url: `${siteUrl}${path}`,
    name,
    description,
    inLanguage,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    ...(breadcrumb ? { breadcrumb: breadcrumbSchema(breadcrumb) } : {}),
  };
}

export function serviceSchema({
  path,
  name,
  description,
  serviceType,
  offerCatalog,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  offerCatalog?: string[];
}) {
  return {
    "@type": "Service",
    "@id": `${siteUrl}${path}#service`,
    name,
    description,
    serviceType,
    url: `${siteUrl}${path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "City", name: "Herat" },
      { "@type": "Country", name: "Afghanistan" },
    ],
    availableLanguage: ["fa-AF", "ps", "en"],
    ...(offerCatalog && offerCatalog.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name,
            itemListElement: offerCatalog.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          },
        }
      : {}),
  };
}

export function softwareApplicationSchema({
  path,
  name,
  alternateName,
  description,
  images,
  inLanguage = "fa-AF",
}: {
  path: string;
  name: string;
  alternateName: string;
  description: string;
  images: readonly string[];
  inLanguage?: string;
}) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}${path}#software`,
    name,
    alternateName,
    url: `${siteUrl}${path}`,
    description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Oil and gas enterprise resource planning",
    operatingSystem: "Web browser",
    inLanguage,
    creator: { "@id": ORGANIZATION_ID, name: companyInfo.displayName },
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Afghanistan" },
    image: images.map((image) => `${siteUrl}${image}`),
    featureList: [
      "Petroleum contract management",
      "Loading and purchase receipts",
      "Tanker logistics and goods in transit",
      "Customs declarations, documents and settlement",
      "Fuel tank inventory",
      "Petroleum sales",
      "Petroleum quality inspection records",
      "Multi-currency finance",
      "Partner settlement",
      "Contract and cargo profitability",
      "Operational asset and maintenance records",
      "Management reports",
      "Role-based access and operational period locks",
    ],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Wraps one or more schema nodes in a single `@graph` document. */
export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
