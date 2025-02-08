import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import OurServicesSection from "../components/OurServicesSection";
import ExploreMarkets from "../components/ExploreMarkets";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";
import SEOMetaTags from '../components/SEOMetaTags';
import axios from "axios";

const Home = () => {
  const seoData = {
    title: "KisanVikas - Smart Farming Solutions & Agricultural Technology | AgriTech Platform",
    description: "KisanVikas is India's leading agricultural technology platform offering smart farming solutions, crop advisory, market prices, and farming equipment. Join thousands of farmers in modern agriculture.",
    keywords: "agriculture technology, smart farming, kisanvikas, agricultural solutions, farming equipment, crop advisory, agritech, agricultural marketplace, modern farming, digital agriculture, farm management, agricultural innovation, farming technology, agricultural digitization, smart agriculture"
  };

  return (
    <>
      <SEOMetaTags {...seoData} />
      <div>
        <HeroSection />
        <OurServicesSection />
        <ExploreMarkets />
        <NewsletterSection />
        <FooterSection />
      </div>
    </>
  );
};

export default Home;
