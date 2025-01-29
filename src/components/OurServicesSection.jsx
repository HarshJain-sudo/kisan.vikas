import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OurServicesSection.css'; // Ensure CSS file exists for styles

function OurServicesSection() {
  const navigate = useNavigate();
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
        const status = card.dataset.status;
        const route = card.dataset.route
        if (status === 'ready' && route) {
          if (route.startsWith('http://') || route.startsWith('https://')) {
            window.location.href = route; // Directly modify the window location for absolute URLs
          } else {
              navigate(route); // Use navigate for relative routes
          }
        }
        else if (status === 'coming-soon') {
          navigate('/coming-soon'); // Redirect to another page
        }
        
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
        <h2>Our Solutions for Farmers</h2>
        <p className="lead text-muted">Empowering Farmers with Innovative Tools and Expert Support</p>
      </div>
      <div className="row row-gap-4">
      {/* E Commerce */}
      <div className="col-md-4">
        <div className="service-card card h-100" data-status="ready" data-route="https://kisanvikas-agribazaar.vercel.app/">
          <div className="card-body text-center">
          <i className="service-icon fa-solid fa-cart-shopping" />
            <h3 className="card-title">AgriBazaar</h3>
            <p className="card-text">🛒 Buy & Sell Everything Agriculture – From Seeds to Equipment</p>
          </div>
        </div>
      </div>
  
      {/* Community Building*/}
      <div className="col-md-4">
          <div className="service-card card h-100" data-status="coming-soon">
            <div className="card-body text-center">
            <i className="service-icon fa-solid fa-users-line" />
              <h3 className="card-title">Farmer Connect</h3>
              <p className="card-text">👥 Building a Stronger Community for Every Farmer</p>
            </div>
          </div>
        </div>
      
        {/* Crop Advisory */}
        <div className="col-md-4">
          <div className="service-card card h-100" data-status="coming-soon">
            <div className="card-body text-center">
              <i className="service-icon fas fa-seedling"></i>
              <h3 className="card-title">Crop Advisory</h3>
              <p className="card-text">🌱 Get expert advice on crop selection, disease prevention, and soil health for maximum yield.</p>
            </div>
          </div>
        </div>

        {/* Market Prices */}
        <div className="col-md-4">
          <div className="service-card card h-100" data-status="coming-soon">
            <div className="card-body text-center">
              <i className="service-icon fas fa-chart-line"></i>
              <h3 className="card-title">Market Prices</h3>
              <p className="card-text">📊 Real-Time Market Trends and Crop Prices</p>
            </div>
          </div>
        </div>

        {/* Weather Updates */}
        <div className="col-md-4">
          <div className="service-card card h-100" data-status="coming-soon">
            <div className="card-body text-center">
              <i className="service-icon fas fa-cloud-sun"></i>
              <h3 className="card-title">Weather Updates</h3>
              <p className="card-text">☁️ Weather Forecasts to Boost Your Farming Success</p>
            </div>
          </div>
        </div>

        {/* Equipment Rental */}
        <div className="col-md-4">
          <div className="service-card card h-100" data-status="coming-soon">
            <div className="card-body text-center">
              <i className="service-icon fas fa-tractor"></i>
              <h3 className="card-title">FarmEquip Rentals</h3>
              <p className="card-text">🚜 Rent Modern Equipment for a Smarter Farm</p>
            </div>
          </div>
        </div>

        {/* Training Programs */}
        <div className="col-md-4">
          <div className="service-card card h-100" data-status="coming-soon">
            <div className="card-body text-center">
              <i className="service-icon fas fa-chalkboard-teacher"></i>
              <h3 className="card-title">AgriSkill Training</h3>
              <p className="card-text">🎓  Learn cutting-edge farming skills and techniques to increase productivity and sustainability.</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="col-md-4">
          <div className="service-card card h-100" data-status="coming-soon">
            <div className="card-body text-center">
              <i className="service-icon fas fa-headset"></i>
              <h3 className="card-title">24/7 Farmer Support</h3>
              <p className="card-text">🛠️ Get the help you need, when you need it, with our expert support team always ready to assist you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServicesSection;
