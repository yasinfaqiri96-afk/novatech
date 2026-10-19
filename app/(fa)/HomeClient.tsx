import HomeHero from "@/components/HomeHero";
import HomeServicesScroll from "@/components/HomeServicesScroll";
import MotionShowcase from "@/components/motion-showcase/MotionShowcaseSection";
import HomeTeamScroll from "@/components/HomeTeamScroll";
import HomeExpertise from "@/components/HomeExpertise";
import ClientLogosSlider from "@/components/ClientLogosSlider";
import HomePortfolioShowcase from "@/components/HomePortfolioShowcase";
import WebDesignHero from "@/components/web-design/WebDesignHero";
import webDesignStyles from "@/components/web-design/CorporateDesign.module.css";

// A server component: the static sections (hero, portfolio, about) render to
// HTML only, and just the interactive ones they contain ship JavaScript.
export default function HomeClient() {
  return (
    <>
      <div className="w-full overflow-x-clip">
      <HomeHero />
      <ClientLogosSlider />
      <MotionShowcase />
      <HomeServicesScroll />
      <HomePortfolioShowcase />
      <div className={webDesignStyles.page}>
        <WebDesignHero homepage />
      </div>
      <HomeTeamScroll />
      <HomeExpertise />
      </div>

    </>
  );
}
