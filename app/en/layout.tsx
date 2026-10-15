import SiteDocument from "@/components/SiteDocument";
export { metadata } from "@/components/SiteDocument";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument language="en-AF">{children}</SiteDocument>;
}
