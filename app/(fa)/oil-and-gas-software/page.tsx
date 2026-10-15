import MashalProductPage from "@/components/MashalProductPage";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  mashalCanonicalPath,
  mashalFaq,
  mashalIntroduction,
  mashalLanguageAlternates,
  mashalScreens,
} from "@/lib/mashal";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/seo";

const title = "مشعل | نرم افزار نفت و گاز افغانستان | سیستم مدیریت شرکت نفتی";
const description =
  "مشعل نرم افزار و سیستم مدیریت نفت و گاز برای شرکت‌های نفتی افغانستان است؛ دیتابیس یکپارچه قرارداد، بار، تانک، فروش، حسابداری، شرکا و سود و زیان.";

export const metadata = buildMetadata({
  fullTitle: title,
  title: "مشعل؛ نرم افزار و سیستم نفت و گاز",
  description,
  path: mashalCanonicalPath,
  image: mashalScreens[0].src,
  imageAlt: mashalScreens[0].alt,
  imageWidth: mashalScreens[0].width,
  imageHeight: mashalScreens[0].height,
  languages: mashalLanguageAlternates,
});

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "مشعل؛ نرم افزار نفت و گاز", path: mashalCanonicalPath },
];

export default function OilAndGasSoftwarePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: mashalCanonicalPath,
            name: title,
            description,
            breadcrumb: breadcrumbs,
          }),
          breadcrumbSchema(breadcrumbs),
          softwareApplicationSchema({
            path: mashalCanonicalPath,
            name: "Mashal",
            alternateName: "مشعل؛ نرم افزار نفت و گاز",
            description: mashalIntroduction,
            images: mashalScreens.map((screen) => screen.src),
          }),
          faqSchema([...mashalFaq]),
        )}
      />
      <MashalProductPage />
    </>
  );
}
