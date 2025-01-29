import React from "react";
import HeroSection from "../components/HeroSection";
import OurServicesSection from "../components/OurServicesSection";
import ExploreMarkets from "../components/ExploreMarkets";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <OurServicesSection />
      <ExploreMarkets />
      <NewsletterSection />
      <FooterSection />
    </div>
  );
}

export default Home;
