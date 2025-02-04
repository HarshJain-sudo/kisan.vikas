import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import lottie from 'lottie-web';
import './ExploreMarkets.css'; // Ensure this file contains styles for your component

const SCHEMES_PER_PAGE = 6; // Number of schemes to show initially

const ALL_SCHEMES = [
  {
    id: 1,
    title: "PM-KISAN Scheme",
    description: "Get direct income support of ₹6,000 per year in three equal installments. All small and marginal farmers with cultivable land are eligible.",
    category: "financial",
    link: "https://pmkisan.gov.in/",
    images: [
      "https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg",
      "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg"
    ]
  },
  {
    id: 2,
    title: "Kisan Credit Card (KCC)",
    description: "Access easy credit up to ₹3 lakh with minimal interest rate of 4%. Covers crop loans, term loans, and insurance against risks.",
    category: "financial",
    link: "https://www.nabard.org/content1.aspx?id=1720&catid=23&mid=23",
    images: [
      "https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg",
      "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg"
    ]
  },
  {
    id: 3,
    title: "PM Fasal Bima Yojana",
    description: "Comprehensive crop insurance with just 1.5-2% premium. Get full coverage against natural calamities with quick claim settlement.",
    category: "insurance",
    link: "https://pmfby.gov.in/",
    images: [
      "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg",
      "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg"
    ]
  },
  {
    id: 4,
    title: "eNAM (National Agriculture Market)",
    description: "Sell your produce online across India for better prices. Free registration and direct payment to your bank account.",
    category: "infrastructure",
    link: "https://enam.gov.in/web/",
    images: [
      "https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg",
      "https://images.pexels.com/photos/1508666/pexels-photo-1508666.jpeg"
    ]
  },
  {
    id: 5,
    title: "Soil Health Card Scheme",
    description: "Get free soil testing and personalized nutrient recommendations every 2 years. Reduce fertilizer costs and improve yield.",
    category: "infrastructure",
    link: "https://www.soilhealth.dac.gov.in/",
    images: [
      "https://images.pexels.com/photos/1461441/pexels-photo-1461441.jpeg",
      "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg"
    ]
  },
  {
    id: 6,
    title: "PM Krishi Sinchai Yojana",
    description: "Get up to 55% subsidy on micro-irrigation systems. Improve water efficiency with 'Per Drop More Crop' initiative.",
    category: "infrastructure",
    link: "https://pmksy.gov.in/",
    images: [
      "https://images.pexels.com/photos/2254030/pexels-photo-2254030.jpeg",
      "https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg"
    ]
  },
  {
    id: 7,
    title: "PM Kisan Maan Dhan Yojana",
    description: "Secure monthly pension of ₹3,000 after age 60. Small contribution of ₹55-200 per month based on age.",
    category: "financial",
    link: "https://pmkmy.gov.in/",
    images: [
      "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg",
      "https://images.pexels.com/photos/2886938/pexels-photo-2886938.jpeg"
    ]
  },
  {
    id: 8,
    title: "Agriculture Infrastructure Fund",
    description: "Get loans up to ₹2 crore with 3% interest subvention. Build storage, processing units, and other agri-infrastructure.",
    category: "infrastructure",
    link: "https://agriinfra.dac.gov.in/",
    images: [
      "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
      "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg"
    ]
  },
  {
    id: 9,
    title: "Livestock Insurance Scheme",
    description: "Protect your cattle with 50% premium subsidy. Covers death of animals due to diseases, accidents & natural calamities.",
    category: "insurance",
    link: "https://dahd.nic.in/",
    images: [
      "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg",
      "https://images.pexels.com/photos/162801/cows-dairy-cows-milk-dairy-farming-162801.jpeg"
    ]
  },
  {
    id: 10,
    title: "Weather Based Crop Insurance",
    description: "Get protection against adverse weather conditions. Automatic payouts based on weather parameters without claim filing.",
    category: "insurance",
    link: "https://pmfby.gov.in/",
    images: [
      "https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg",
      "https://images.pexels.com/photos/2254030/pexels-photo-2254030.jpeg"
    ]
  }
];

export default function ExploreMarkets() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleSchemes, setVisibleSchemes] = useState(SCHEMES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Filter categories
  const FILTER_CATEGORIES = [
    { id: 'all', label: 'All Schemes' },
    { id: 'financial', label: 'Financial Support' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'insurance', label: 'Insurance' }
  ];

  // Filter schemes based on active category
  const filteredSchemes = ALL_SCHEMES.filter(scheme => 
    activeFilter === 'all' ? true : scheme.category === activeFilter
  );

  // Handle filter click
  const handleFilterClick = (categoryId) => {
    setActiveFilter(categoryId);
    setVisibleSchemes(SCHEMES_PER_PAGE); // Reset visible schemes when filter changes
  };

  const loadMoreSchemes = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleSchemes(prev => Math.min(prev + SCHEMES_PER_PAGE, filteredSchemes.length));
      setIsLoading(false);
    }, 800);
  };

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
    <>
      <Helmet>
        <title>Government Agricultural Schemes 2024 | Farmer Support Programs</title>
        <meta name="description" content="Explore top 10 government schemes for farmers including PM-KISAN, Fasal Bima Yojana, Kisan Credit Card. Get financial support, subsidies, and agricultural assistance." />
        <meta name="keywords" content="farmer schemes, agricultural schemes, PM-KISAN, Fasal Bima Yojana, Kisan Credit Card, farm subsidies, agricultural support, farmer benefits, government schemes for farmers" />
        <meta property="og:title" content="Government Agricultural Schemes 2024 | Farmer Support Programs" />
        <meta property="og:description" content="Access comprehensive information about government schemes for farmers. Get details about financial support, subsidies, and agricultural assistance programs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/agricultural-schemes" />
        <meta property="og:image" content="https://yourwebsite.com/images/schemes-overview.jpg" />
        <link rel="canonical" href="https://yourwebsite.com/agricultural-schemes" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Government Agricultural Schemes 2024",
              "description": "Comprehensive guide to government schemes for farmers including PM-KISAN, Fasal Bima Yojana, and more.",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "PM-KISAN Scheme",
                    "description": "Direct income support of ₹6,000 per year for farmers"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Kisan Credit Card",
                    "description": "Easy credit access for farmers with minimal interest rates"
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>

      <main className="animation-background" role="main">
        <div id="animation-container" className="lottie-animation" aria-hidden="true"></div>
        <div className="project-services-wrapper">
          <section className="project-services">
            <header className="header">
              <span className="badge" role="text">Government Schemes</span>
              <h1 className="title">Agricultural Support Programs 2024</h1>
              <p className="subtitle">
                Explore comprehensive government schemes designed to support farmers with financial aid, 
                subsidies, and agricultural assistance.
              </p>
            </header>

            <nav className="schemes-filter" aria-label="Schemes categories">
              <ul className="filter-list">
                {FILTER_CATEGORIES.map(category => (
                  <li key={category.id}>
                    <button
                      className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                      onClick={() => handleFilterClick(category.id)}
                      aria-pressed={activeFilter === category.id}
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="card-container" role="list">
              {filteredSchemes.slice(0, visibleSchemes).map((scheme) => (
                <article 
                  key={scheme.id} 
                  className="card" 
                  role="listitem"
                  itemScope 
                  itemType="https://schema.org/GovernmentService"
                >
                  <a 
                    href={scheme.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="card-link"
                    itemProp="url"
                  >
                    <div className="card-image">
                      <div className="slideshow-wrapper">
                        {scheme.images.map((img, index) => (
                          <img
                            key={index}
                            className="slideshow-img"
                            src={img}
                            alt={`${scheme.title} - Visual representation ${index + 1}`}
                            loading={index === 0 ? "eager" : "lazy"}
                            itemProp="image"
                          />
                        ))}
                      </div>
                      <div className="card-overlay">
                        <div className="card-icon"><span></span></div>
                      </div>
                    </div>
                    <div className="card-content">
                      <h2 className="card-title" itemProp="name">{scheme.title}</h2>
                      <p className="card-description" itemProp="description">{scheme.description}</p>
                      <span className="learn-more">Learn More →</span>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {visibleSchemes < filteredSchemes.length && (
              <div className="show-more-container">
                <button 
                  className={`show-more-button ${isLoading ? 'loading' : ''}`}
                  onClick={loadMoreSchemes}
                  disabled={isLoading}
                  aria-label="Load more schemes"
                >
                  {isLoading ? (
                    <div className="loader" role="status" aria-label="Loading..."></div>
                  ) : (
                    <>
                      Show More Schemes
                      <span className="remaining-count" aria-label={`${filteredSchemes.length - visibleSchemes} schemes remaining`}>
                        {filteredSchemes.length - visibleSchemes} more
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Help Section with Schema Markup */}
            <div className="help-section" itemScope itemType="https://schema.org/CustomerService">
              <div className="help-content">
                <div className="help-header">
                  <div className="pulse-ring"></div>
                  <h2 itemProp="name">Need Assistance? We're Here!</h2>
                </div>
                <p className="help-text" itemProp="description">
                  Having trouble understanding these schemes or need guidance with applications? 
                  Our experts are just a message away! 
                  <span className="highlight">24/7 Support Available</span>
                </p>
                <a 
                  href="https://wa.me/+917467885047?text=Hi,%20I%20need%20help%20with%20agricultural%20schemes." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                  itemProp="contactPoint"
                >
                  <div className="button-content">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png" 
                      alt="WhatsApp Icon" 
                      className="whatsapp-icon"
                      width="24"
                      height="24"
                    />
                    <span>Chat with Us on WhatsApp</span>
                    <div className="arrow">→</div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
