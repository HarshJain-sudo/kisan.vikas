import React, { useEffect } from 'react';
import './FooterSection.css'; // Ensure you have the styles here

function FooterSection() {
  useEffect(() => {
    // Scroll to Top Functionality
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    // Attach event listener to Back to Top button
    const backToTopButton = document.querySelector('.foot-panel1');
    if (backToTopButton) {
      backToTopButton.addEventListener('click', scrollToTop);
    }

    // Show/Hide "Back to Top" Button on Scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1'; // Fully visible
      } else {
        backToTopButton.style.opacity = '0.7'; // Slightly faded
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listeners
    return () => {
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer id="contact">
      {/* Back to Top Panel */}
      <div className="foot-panel1">
        Back to Top
      </div>

      {/* Main Footer Content */}
      <div className="foot-panel2">
        {/* KisanVikas Info */}
        <ul>
          <p>KisanVikas</p>
          <div className="icon">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </ul>

        {/* Services */}
        <ul>
          <p>Services</p>
          <a href="#!">Success Steps Education</a>
          <a href="#!">Pathway to Progress</a>
          <a href="#!">Skills Builder Academy</a>
          <a href="#!">Academic Achievers</a>
        </ul>

        {/* Link Info */}
        <ul>
          <p>Link Info</p>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#faq">FAQ</a>
          <a href="#blog">Blog and News</a>
        </ul>

        {/* Contact Us */}
        <ul>
          <p>Contact Us</p>
          <a href="#!">
            <i className="fa-solid fa-location-dot"></i>
            HIG-1 NEHRU ENCLAVE, SHAMSHABAD ROAD, AGRA
          </a>
          <a href="tel:+918953438964">
            <i className="fa-solid fa-phone"></i>
            +91-8953438964
          </a>
          <a href="mailto:jainmuskan735@gmail.com">
            <i className="fa-solid fa-envelope"></i>
            jainmuskan735@gmail.com
          </a>
        </ul>
      </div>

      {/* Branding and Links */}
      <div className="foot-panel3">
        <div className="logo"></div>
      </div>
      <div className="foot-panel4">
        <div className="pages">
          <a href="#!">Conditions of Use</a>
          <a href="#!">Privacy Notice</a>
          <a href="#!">Your Ads Privacy Choices</a>
        </div>
        <div className="copyright">© 2025. All Rights Reserved</div>
      </div>
    </footer>
  );
}

export default FooterSection;
