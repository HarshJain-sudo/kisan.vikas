import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OurServicesSection.css'; // Ensure CSS file exists for styles
import axios from 'axios';

function OurServicesSection() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://kv-backend-beta-vercel.vercel.app/api/kv_services/services/v1/');
        setServices(response.data.results || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();

    // Intersection Observer for Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Wait for cards to be rendered before observing
    setTimeout(() => {
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card) => {
        observer.observe(card);
        
        // Mouse Hover Effect
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Card Click Navigation
        card.addEventListener('click', () => {
          const status = card.dataset.status;
          const route = card.dataset.route;
          if (status === 'ready' && route) {
            if (route.startsWith('http://') || route.startsWith('https://')) {
              window.location.href = route;
            } else {
              navigate(route);
            }
          } else if (status === 'coming-soon') {
            navigate('/coming-soon');
          }
        });
      });
    }, 100);

    return () => {
      // Cleanup event listeners
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card) => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('click', () => {});
      });
    };
  }, [isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5" id="services">
      <div className="services-header text-center">
        <h2>Our Solutions for Farmers</h2>
        <p className="lead text-muted">Empowering Farmers with Innovative Tools and Expert Support</p>
      </div>
      <div className="row row-gap-4">
        {Array.isArray(services) && services.map((service) => (
          <div className="col-md-4" key={service.title}>
            <div 
              className="service-card card h-100" 
              data-status={service.status}
              data-route={service.route}
            >
              <div className="card-body text-center">
                <i className={`service-icon ${service.icon_class}`} />
                <h3 className="card-title">{service.title}</h3>
                <p className="card-text">
                  {service.emoji} {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServicesSection;
