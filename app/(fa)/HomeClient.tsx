"use client";

import HomeHero from "@/components/HomeHero";
import HomeSlidersInit from "@/components/HomeSlidersInit";
import HomeServicesScroll from "@/components/HomeServicesScroll";
import MotionShowcase from "@/components/motion-showcase/MotionShowcase";
import HomeTeamScroll from "@/components/HomeTeamScroll";
import ClientLogosSlider from "@/components/ClientLogosSlider";
import HomePortfolioShowcase from "@/components/HomePortfolioShowcase";
import BannerScroll from "@/components/BannerScroll";
import WebDesignHero from "@/components/web-design/WebDesignHero";
import webDesignStyles from "@/components/web-design/CorporateDesign.module.css";

export default function HomeClient() {
  return (
    <>
      <div className="w-full overflow-x-clip">
      <HomeSlidersInit />
      <HomeHero />
      <ClientLogosSlider />
      <MotionShowcase />
      <HomeServicesScroll />
      <HomePortfolioShowcase />
      <div className={webDesignStyles.page}>
        <WebDesignHero homepage />
      </div>
      <BannerScroll />
        <HomeTeamScroll />
      </div>

    </>
  );
}
