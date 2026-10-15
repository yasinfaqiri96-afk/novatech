import { notFound } from "next/navigation";

import MashalIntentPage from "@/components/MashalIntentPage";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  mashalCanonicalPath,
  mashalIntentPageBySlug,
  mashalIntentPages,
} from "@/lib/mashal";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return mashalIntentPages.map((page) => ({ topic: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { topic } = await params;
  const page = mashalIntentPageBySlug[topic];
  if (!page) return buildMetadata({ title: "صفحه یافت نشد", description: "این راهنمای مشعل وجود ندارد.", path: `${mashalCanonicalPath}/${topic}`, noIndex: true });
  return buildMetadata({
    fullTitle: page.metaTitle,
    title: page.navLabel,
    description: page.description,
    path: `${mashalCanonicalPath}/${page.slug}`,
    image: page.image,
    imageAlt: page.imageAlt,
    imageWidth: 1600,
    imageHeight: 1000,
  });
}

export default async function MashalTopicPage({ params }: Props) {
  const { topic } = await params;
  const page = mashalIntentPageBySlug[topic];
  if (!page) notFound();

  const path = `${mashalCanonicalPath}/${page.slug}`;
  const breadcrumbs = [
    { name: "صفحه اصلی", path: "/" },
    { name: "مشعل؛ ERP نفت و گاز", path: mashalCanonicalPath },
    { name: page.navLabel, path },
  ];

  return (
    <>
      <JsonLd data={graph(
        webPageSchema({ path, name: page.metaTitle, description: page.description, breadcrumb: breadcrumbs }),
        breadcrumbSchema(breadcrumbs),
        faqSchema(page.faq),
      )} />
      <MashalIntentPage page={page} />
    </>
  );
}
