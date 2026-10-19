import { mashalCanonicalPath, mashalIntentPages, mashalEnglishPath, mashalPashtoPath } from "@/lib/mashal";
const topic = (slug: string) => { const page = mashalIntentPages.find(item => item.slug === slug)!; return { href: `${mashalCanonicalPath}/${slug}`, label: page.navLabel }; };
export const mashalNavigationGroups = [
  { title: "شناخت مشعل", links: [
    { href: mashalCanonicalPath, label: "معرفی مشعل" },
    { href: `${mashalCanonicalPath}/features`, label: "امکانات کامل" },
    topic("database"), topic("specialized-erp-vs-accounting"),
    { href: mashalEnglishPath, label: "Mashal in English" },
    { href: mashalPashtoPath, label: "مشعل په پښتو" },
  ] },
  { title: "عملیات", links: [topic("contracts"), topic("loading"), topic("tanker-logistics"), topic("customs"), topic("tank-inventory"), topic("sales"), topic("petroleum-trading")] },
  { title: "مالی و مدیریت", links: [topic("accounting"), topic("partner-settlement"), topic("profit-loss"), topic("reports"), topic("security")] },
  { title: "بررسی و شروع", links: [
    { href: `${mashalCanonicalPath}#mashal-explorer`, label: "تصاویر واقعی سیستم" },
    { href: "/portfolio/oil-and-gas-management-system", label: "نمونهٔ فواد صدیقی" },
    { href: "/blog/oil-and-gas-software-guide", label: "راهنمای نرم‌افزار نفت و گاز" },
    { href: `${mashalCanonicalPath}#mashal-demo`, label: "درخواست دمو" },
  ] },
];
export { isMashalRoute } from "@/lib/mashal-paths";
