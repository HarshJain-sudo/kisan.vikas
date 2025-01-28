import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import OurServicesSection from './components/OurServicesSection';
import ExploreMarkets from './components/ExploreMarkets';
import NewsletterSection from './components/NewsletterSection';
import FooterSection from './components/FooterSection';
import ComingSoonPage from './components/ComingSoon';
import KisanVikasAbout from './pages/KisanVikasAbout'; // Create this component
import ContactPage from './pages/ContactPage'; // Create this component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <OurServicesSection />
              <ExploreMarkets />
              <NewsletterSection />
              <FooterSection />
            </>
          }
        />

        {/* Other Pages */}
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/about" element={<KisanVikasAbout />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
