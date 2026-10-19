import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { homeFaq } from "@/components/HomeExpertise";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo";
import { companyInfo } from "@/lib/site-content";

/**
 * The home page is a server component so it can own its metadata and structured
 * data; the home sections are composed in `HomeClient`.
 */

const homeTitle = `${companyInfo.brandName} (${companyInfo.latinName}) | شرکت نرم افزاری و تکنالوژی در هرات، افغانستان`;

const homeDescription =
  "نواتیک، شرکت نرم افزاری در هرات افغانستان: نرم افزار حسابداری ناظر، ERP نفت و گاز مشعل، نرم افزار اختصاصی، طراحی دیتابیس، سیستم مدیریتی و طراحی سایت.";

export const metadata = buildMetadata({
  fullTitle: homeTitle,
  title: homeTitle,
  description: homeDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: homeTitle,
            description: homeDescription,
          }),
          breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }]),
          faqSchema(homeFaq),
        )}
      />
      <HomeClient />
    </>
  );
}
