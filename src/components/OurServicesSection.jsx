import React, { useEffect } from 'react';
import './OurServicesSection.css'; // Ensure CSS file exists for styles

function OurServicesSection() {
  useEffect(() => {
    // Intersection Observer for Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate'); // Add animation class
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => observer.observe(card));

    // Mouse Hover Effect
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // Card Click Navigation
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        window.location.href = '/coming-soon'; // Redirect to another page
      });
    });

    return () => {
      // Cleanup event listeners
      cards.forEach((card) => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="container my-5" id="services">
      <div className="services-header text-center">
        <h2>Our Services</h2>
        <p className="lead text-muted">Discover how we can help you grow</p>
      </div>
      <div className="row row-gap-4">
        {/* Crop Advisory */}
        <div className="col-md-4">
          <div className="service-card card h-100">
            <div className="card-body text-center">
              <i className="service-icon fas fa-seedling"></i>
              <h3 className="card-title">Crop Advisory</h3>
              <p className="card-text">Get expert advice on crop selection and management</p>
            </div>
          </div>
        </div>

        {/* Market Prices */}
        <div className="col-md-4">
          <div className="service-card card h-100">
            <div className="card-body text-center">
              <i className="service-icon fas fa-chart-line"></i>
              <h3 className="card-title">Market Prices</h3>
              <p className="card-text">Real-time market prices and trends</p>
            </div>
          </div>
        </div>

        {/* Weather Updates */}
        <div className="col-md-4">
          <div className="service-card card h-100">
            <div className="card-body text-center">
              <i className="service-icon fas fa-cloud-sun"></i>
              <h3 className="card-title">Weather Updates</h3>
              <p className="card-text">Accurate weather forecasts for better planning</p>
            </div>
          </div>
        </div>

        {/* Equipment Rental */}
        <div className="col-md-4">
          <div className="service-card card h-100">
            <div className="card-body text-center">
              <i className="service-icon fas fa-tractor"></i>
              <h3 className="card-title">Equipment Rental</h3>
              <p className="card-text">Rent modern farming equipment</p>
            </div>
          </div>
        </div>

        {/* Training Programs */}
        <div className="col-md-4">
          <div className="service-card card h-100">
            <div className="card-body text-center">
              <i className="service-icon fas fa-chalkboard-teacher"></i>
              <h3 className="card-title">Training Programs</h3>
              <p className="card-text">Learn modern farming techniques</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="col-md-4">
          <div className="service-card card h-100">
            <div className="card-body text-center">
              <i className="service-icon fas fa-headset"></i>
              <h3 className="card-title">24/7 Support</h3>
              <p className="card-text">Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServicesSection;
