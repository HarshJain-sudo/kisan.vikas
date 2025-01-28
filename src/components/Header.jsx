import React from 'react';
import './HeroSection.css'; // Ensure to create and import corresponding CSS

function HeroSection() {
    return (
        <div className="hero-section text-center">
            <div className="hero-overlay">
                <div className="floating-elements">
                    {/* Floating elements with varying animation delays */}
                    <div className="floating-element leaf" style={{ animationDelay: '0s' }}></div>
                    <div className="floating-element leaf" style={{ animationDelay: '5s' }}></div>
                    <div className="floating-element leaf" style={{ animationDelay: '10s' }}></div>
                    <div className="floating-element tractor" style={{ animationDelay: '0s' }}></div>
                    <div className="floating-element tractor" style={{ animationDelay: '8s' }}></div>
                    <div className="floating-element wheat" style={{ animationDelay: '3s' }}></div>
                    <div className="floating-element wheat" style={{ animationDelay: '7s' }}></div>
                    <div className="floating-element wheat" style={{ animationDelay: '12s' }}></div>
                </div>
            </div>
            <div className="container hero-text">
                <div className="hero-badge">Welcome to</div>
                <h1 className="mb-4">KisanVikas <span className="highlight">Hub</span></h1>
                <p className="lead">Growing Tomorrow Food Today</p>
                <div className="hero-buttons">
                    <a href="#services" className="btn btn-primary btn-lg explore-btn">Explore Services</a>
                    <a href="#contact" className="btn btn-outline-light btn-lg contact-btn">Contact Us</a>
                </div>
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">10K+</span>
                        <span className="stat-label">Farmers</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Districts</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">Support</span>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <div className="arrow"></div>
            </div>
        </div>
    );
}

export default HeroSection;
