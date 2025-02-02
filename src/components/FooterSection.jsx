import React, { useEffect, useRef } from 'react';
import './FooterSection.css'; // Ensure you have the styles here

function FooterSection() {
  const footerRef = useRef(null);

  useEffect(() => {
    // Scroll to Top Functionality
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    // Fade-in animation on scroll
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => observer.observe(element));

    // Back to top button functionality
    const backToTopButton = document.querySelector('.foot-panel1');
    if (backToTopButton) {
      backToTopButton.addEventListener('click', scrollToTop);
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        if (backToTopButton) backToTopButton.style.opacity = '1';
      } else {
        if (backToTopButton) backToTopButton.style.opacity = '0.5';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
      window.removeEventListener('scroll', handleScroll);
      fadeElements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <footer id="contact" className="footer" aria-label="Footer containing agriculture marketplace information and contact details">
      <div className="foot-panel1" style={{ cursor: 'pointer' }} role="button" aria-label="Scroll to top of page">
        <span className="floating-leaf">🌾</span> Back to Top <span className="floating-leaf">🌾</span>
      </div>
      <div className="foot-panel2">
        <ul className="fade-in">
          <h2>Kisan Vikas</h2>
          <div className="icon" aria-label="Social media links">
            <a href="#!" aria-label="Follow us on Facebook">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#!" aria-label="Follow us on Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>  
            <a href="#!" aria-label="Connect with us on LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </ul>
        <nav aria-label="Agricultural Services" className="fade-in">
          <ul>
            <h2>Farming Services</h2>
            <a href="#!"><span className="floating-leaf">🌱</span> Sustainable Farming</a>
            <a href="#!"><span className="floating-leaf">🌾</span> Crop Solutions</a>
            <a href="#!"><span className="floating-leaf">🚜</span> Equipment Rental</a>
            <a href="#!"><span className="floating-leaf">👨‍🌾</span> Expert Network</a>
          </ul>
        </nav>
        <nav aria-label="Quick Links" className="fade-in">
          <ul>
            <h2>Quick Links</h2>
            <a href="#about">About KisanVikas</a>
            <a href="#services">Our Services</a>
            <a href="#faq">Farmer FAQ</a>
            <a href="#blog">Agri-News</a>
          </ul>
        </nav>
        <address aria-label="Contact Information" className="fade-in">
          <ul>
            <h2>Contact Us</h2>
            <a href="#!" title="Visit our location">
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              <span>Kisan Vikas, India</span>
            </a>
            <a href="tel:+917467885047" title="Call our farmer support">
              <i className="fa-solid fa-phone" aria-hidden="true"></i>
              <span>+91-7467885047</span>
            </a>
            <a href="mailto:support@kisanvikas.in" title="Email our agricultural support team">
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              <span>support@kisanvikas.in</span>
            </a>
          </ul>
        </address>
      </div>
      <div className="foot-panel3"></div>
      <div className="foot-panel4">
        <nav className="pages" aria-label="Legal Information">
          <a href="#!">Terms of Service</a>
          <a href="#!">Privacy Policy</a>
          <a href="#!">Farmer Data Protection</a>
        </nav>
        <div className="copyright">
          <p>© {new Date().getFullYear()} Kisan Vikas - India's Premier Agricultural Marketplace. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
