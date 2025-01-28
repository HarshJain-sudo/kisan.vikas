import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import './ExploreMarkets.css'; // Ensure this file contains styles for your component

function ExploreMarkets() {
  useEffect(() => {
    // Intersection Observer for Animating Cards
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

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => observer.observe(card));

    // Mouse Movement Effect on Cards
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // Cleanup event listeners on unmount
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', () => {});
      });
    };
  }, []);

  useEffect(() => {
    // Floating Particles Animation
    const createParticles = () => {
      const wrapper = document.querySelector('.project-services-wrapper');
      if (!wrapper) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        wrapper.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  useEffect(() => {
    // Lottie Animation
    lottie.loadAnimation({
      container: document.getElementById('animation-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets2.lottiefiles.com/packages/lf20_4kx2q2vh.json', // Farmer character animation
    });
  }, []);

  return (
    <div className="animation-background">
      <div id="animation-container" className="lottie-animation"></div>
      <div className="project-services-wrapper">
        <section className="project-services">
          <div className="header">
            <span className="badge">Something for you</span>
            <h2 className="title">Explore Markets</h2>
          </div>
          <div className="card-container">
            {/* Card 1 */}
            <a href="#" className="card">
              <div className="card-image">
                <div className="slideshow-wrapper">
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Modern Tractor"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/5273094/pexels-photo-5273094.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Harvester"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/4439573/pexels-photo-4439573.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Farm Machinery"
                  />
                </div>
                <div className="card-overlay">
                  <div className="card-icon"><span></span></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Farm Equipment Store</h3>
                <p className="card-description">
                  Buy and rent modern farming equipment at competitive prices.
                </p>
              </div>
            </a>

            {/* Card 2 */}
            <a href="#" className="card">
              <div className="card-image">
                <div className="slideshow-wrapper">
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/7457176/pexels-photo-7457176.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Seeds"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/6231/marketing-color-colorful-shop.jpg?auto=compress&cs=tinysrgb&w=800"
                    alt="Seed Varieties"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/8989563/pexels-photo-8989563.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fertilizers"
                  />
                </div>
                <div className="card-overlay">
                  <div className="card-icon"><span></span></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Seeds & Fertilizers</h3>
                <p className="card-description">
                  Quality seeds, organic fertilizers, and agricultural supplies.
                </p>
              </div>
            </a>

            {/* Card 3 */}
            <a href="#" className="card">
              <div className="card-image">
                <div className="slideshow-wrapper">
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fresh Vegetables"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/1508666/pexels-photo-1508666.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Farmers Market"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fresh Fruits"
                  />
                </div>
                <div className="card-overlay">
                  <div className="card-icon"><span></span></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Fresh Produce Market</h3>
                <p className="card-description">
                  Buy and sell fresh farm produce directly from farmers.
                </p>
              </div>
            </a>
            <a href="#" className="card">
              <div className="card-image">
                <div className="slideshow-wrapper">
                <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fresh Fruits"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/1508666/pexels-photo-1508666.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Farmers Market"
                  />
                  <img
                    className="slideshow-img"
                    src="https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fresh Fruits"
                  />
                </div>
                <div className="card-overlay">
                  <div className="card-icon"><span></span></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Fresh Produce Market</h3>
                <p className="card-description">
                  Buy and sell fresh farm produce directly from farmers.
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExploreMarkets;
