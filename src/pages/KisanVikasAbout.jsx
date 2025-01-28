import React, { useEffect } from "react";
import "./KisanVikasAbout.css";

const KisanVikasAbout = () => {
  useEffect(() => {
    // Fade-in animation for sections
    const sections = document.querySelectorAll(".about-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Floating text animation
    const floatingTexts = document.querySelectorAll(".floating-text");
    floatingTexts.forEach((text, index) => {
      setTimeout(() => {
        text.classList.add("float");
      }, index * 500);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1 className="floating-text">Welcome to KisanVikas</h1>
        <p className="floating-text">
          {/* Empowering Farmers with Technology and Innovation */}
        </p>
      </header>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At KisanVikas, we strive to revolutionize agriculture by providing
          farmers with the tools, knowledge, and technology they need to thrive
          in today’s competitive environment.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We envision a future where farmers make confident, data-driven
          decisions, agriculture is resilient to climate change, and rural
          communities flourish with opportunities.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Advanced Technology: AI-powered advisory and smart farming tools</li>
          <li>Holistic Solutions: End-to-end support from crop to market</li>
          <li>Community Support: A growing network of farmers and experts</li>
        </ul>
      </section>

      <footer className="about-footer">
        <h3>Join the KisanVikas Movement</h3>
        <p>
          Ready to transform your farming journey? Join us and be part of the
          agricultural revolution.
        </p>
      </footer>
    </div>
  );
};

export default KisanVikasAbout;