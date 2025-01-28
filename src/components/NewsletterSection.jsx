import React, { useEffect } from 'react';
import './NewsletterSection.css'; // Ensure to create a corresponding CSS file for styles

function NewsletterSection() {
    useEffect(() => {
        // Floating Elements Animation
        const floatingElements = document.querySelectorAll('.element');
      
        floatingElements.forEach((element, index) => {
          const duration = Math.random() * 3 + 6; // Random duration between 6s and 9s
          const delay = Math.random() * 2; // Random delay between 0s and 2s
      
          element.style.animationDuration = `${duration}s`;
          element.style.animationDelay = `${delay}s`;
      
          // Adding a slight random rotation for a natural effect
          element.style.animationTimingFunction = 'ease-in-out';
        });
      }, []);
      

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-wrapper">
          <div className="newsletter-content">
            <h2 className="animate-text">Stay Updated with KisanVikas</h2>
            <p className="animate-text">
              Get the latest farming tips, market prices, and agricultural news directly in your inbox!
            </p>
            <div className="form-wrapper">
              <form className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                  />
                  <button type="submit" className="subscribe-btn">
                    Subscribe
                    <span className="btn-particles"></span>
                  </button>
                </div>
              </form>
              <div className="newsletter-features">
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Weekly Updates</span>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Market Insights</span>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Farming Tips</span>
                </div>
              </div>
            </div>
          </div>
          <div className="newsletter-decoration">
            <div className="floating-elements">
              <i className="fas fa-leaf element"></i>
              <i className="fas fa-seedling element"></i>
              <i className="fas fa-tractor element"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
