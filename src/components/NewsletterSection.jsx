import React, { useState, useEffect } from 'react';
import './NewsletterSection.css'; // Ensure to create a corresponding CSS file for styles

function NewsletterSection() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        whatsappNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('https://kv-backend-beta-vercel.vercel.app/api/newsletter_service/subscribe/v1/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    whatsapp_number: formData.whatsappNumber,
                    name: formData.name
                })
            });

            const data = await response.json();
            console.log(data); // For debugging

            if (!response.ok) {
                throw new Error(data.response || 'Subscription failed');
            }

            setIsSubscribed(true);
            setSuccessMessage(data.response || 'Subscription successful!');
            setFormData({ name: '', whatsappNumber: '' });
            
            // Reset subscription status after 3 seconds
            setTimeout(() => {
                setIsSubscribed(false);
                setSuccessMessage('');
            }, 3000);

        } catch (err) {
            console.error('API Error:', err);
            setError(err.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className="newsletter-section" id="newsletter">
            <div className="container">
                <div className="newsletter-wrapper">
                    <div className="newsletter-content">
                        <h2 className="animate-text">Stay Updated with KisanVikas</h2>
                        <p className="animate-text">
                            Get the latest farming tips, market prices, and agricultural news directly on WhatsApp!
                        </p>
                        <div className="form-wrapper">
                            {!isSubscribed ? (
                                <form className="newsletter-form" onSubmit={handleSubscribe}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        />
                                        <input
                                            type="tel"
                                            name="whatsappNumber"
                                            pattern="[0-9]{10}"
                                            className="form-control"
                                            placeholder="Enter your WhatsApp number"
                                            value={formData.whatsappNumber}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        />
                                        <button 
                                            type="submit" 
                                            className={`subscribe-btn ${loading ? 'loading' : ''}`}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="spinner"></div>
                                            ) : (
                                                <>
                                                    Subscribe
                                                    <span className="btn-particles"></span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {error && <div className="error-message">{error}</div>}
                                </form>
                            ) : (
                                <div className="success-message">
                                    <i className="fas fa-check-circle"></i>
                                    <span>{successMessage}</span>
                                </div>
                            )}

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
