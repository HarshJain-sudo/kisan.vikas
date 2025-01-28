import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ContactPage.css';  // Make sure this CSS file is set up

const ContactPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Handler for clicking the header
  const handleHeaderClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="contact-container">
      <header className="contact-header" onClick={handleHeaderClick} style={{ cursor: 'pointer' }}> {/* Add click handler and cursor style */}
        <h1>KisanVikas</h1>
        <p>Contact Us</p>
      </header>
      <div className="contact-form-container">
        <form className="contact-form">
          <div className="form-group">
            <input type="text" id="name" placeholder=" " required />
            <label htmlFor="name">Your Name</label>
          </div>
          <div className="form-group">
            <input type="email" id="email" placeholder=" " required />
            <label htmlFor="email">Your Email</label>
          </div>
          <div className="form-group">
            <textarea id="message" placeholder=" " required></textarea>
            <label htmlFor="message">Your Message</label>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="map-container">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.685712370515!2d78.3245882733189!3d17.426864101670326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a9865731ff%3A0xa251de4823e9d7f1!2sShanmukha%20Luxury%20Mens%20PG!5e0!3m2!1sen!2sin!4v1738090299703!5m2!1sen!2sin"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactPage;
