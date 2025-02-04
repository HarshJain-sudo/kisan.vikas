import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './NewsletterSection.css'; // Ensure to create a corresponding CSS file for styles

// Initialize EmailJS with your public key
emailjs.init("bPHmY4jvBITqMgCVW"); // Replace with your actual public key from EmailJS

function NewsletterSection() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

        // Prepare template parameters
        const templateParams = {
            to_name: "Admin",
            from_name: email,
            message: `New subscription from: ${email}`,
            reply_to: email,
        };

        try {
            await emailjs.send(
                'service_xxxxxxx', // Replace with your Service ID
                'template_xxxxxxx', // Replace with your Template ID
                templateParams,
                'YOUR_PUBLIC_KEY'  // Replace with your Public Key
            );

            setIsSubscribed(true);
            setEmail('');
            
            // Reset subscription status after 3 seconds
            setTimeout(() => {
                setIsSubscribed(false);
            }, 3000);

        } catch (err) {
            console.error('EmailJS Error:', err);
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="newsletter-section" id="newsletter">
            <div className="container">
                <div className="newsletter-wrapper">
                    <div className="newsletter-content">
                        <h2 className="animate-text">Stay Updated with KisanVikas</h2>
                        <p className="animate-text">
                            Get the latest farming tips, market prices, and agricultural news directly in your inbox!
                        </p>
                        <div className="form-wrapper">
                            {!isSubscribed ? (
                                <form className="newsletter-form" onSubmit={handleSubscribe}>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                    <span>Thank you for subscribing! Check your email for confirmation.</span>
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
