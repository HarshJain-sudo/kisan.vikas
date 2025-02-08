import React, { useEffect, useState } from "react";
import "./ComingSoon.css";

const ComingSoon = () => {
  const [countdown, setCountdown] = useState("00:00:00");
  const [formData, setFormData] = useState({ farmName: "", email: "", cropType: "" });
  const [formError, setFormError] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // State for animated stats
  const [yieldImprovement, setYieldImprovement] = useState(0);
  const [waterSaved, setWaterSaved] = useState(0);
  const [farmersOnboard, setFarmersOnboard] = useState(0);

  useEffect(() => {
    const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("EXPIRED");
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Add this effect to handle visibility
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Modify the animation effect to depend on isVisible
  useEffect(() => {
    if (!isVisible) return; // Only run when component is visible

    const incrementCounter = (targetValue, setState) => {
      let count = 0;
      const increment = targetValue / 100;
      const interval = setInterval(() => {
        if (count < targetValue) {
          count += increment;
          setState(Math.floor(count));
        } else {
          clearInterval(interval);
          setState(targetValue);
        }
      }, 10);

      // Clean up interval on unmount
      return () => clearInterval(interval);
    };

    const cleanup1 = incrementCounter(85, setYieldImprovement);
    const cleanup2 = incrementCounter(40, setWaterSaved);
    const cleanup3 = incrementCounter(1000, setFarmersOnboard);

    // Clean up all intervals
    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
    };
  }, [isVisible]); // Depend on isVisible state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { farmName, email, cropType } = formData;
    let hasError = false;

    const inputs = document.querySelectorAll(".coming-soon-input");
    inputs.forEach((input) => {
      if (!formData[input.name]) {
        hasError = true;
        input.classList.add("input-error", "shake");
        setTimeout(() => {
          input.classList.remove("shake");
        }, 500); // Animation duration
      } else {
        input.classList.remove("input-error");
      }
    });

    if (hasError) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setFormError("");
    setShowSuccessOverlay(true);

    setTimeout(() => {
      setShowSuccessOverlay(false);
      setFormData({ farmName: "", email: "", cropType: "" });
    }, 3000);
  };

  return (
    <div className="coming-soon">
      <main className={`fade-in ${isVisible ? 'visible' : ''}`}>
        <h1>Smart Farming Solutions Coming Soon!</h1>
        <p>We're revolutionizing agriculture with AI-powered advisory services. Get ready for data-driven farming decisions!</p>

        <div className="coming-soon-stats-container">
          <div className="coming-soon-stat-item">
            <div className="coming-soon-stat-number">{yieldImprovement}%</div>
            <div>Yield Improvement</div>
          </div>
          <div className="coming-soon-stat-item">
            <div className="coming-soon-stat-number">{waterSaved}%</div>
            <div>Water Saved</div>
          </div>
          <div className="coming-soon-stat-item">
            <div className="coming-soon-stat-number">{farmersOnboard}+</div>
            <div>Farmers Onboard</div>
          </div>
        </div>

        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-cloud-sun"></i>
            </div>
            <h3>Weather Insights</h3>
            <p>Real-time weather forecasting and crop-specific recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-seedling"></i>
            </div>
            <h3>Crop Health</h3>
            <p>AI-powered disease detection and treatment suggestions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-tint"></i>
            </div>
            <h3>Smart Irrigation</h3>
            <p>Optimize water usage with soil moisture sensors</p>
          </div>
        </div>

        <div className="countdown">
          <p>Launch in:</p>
          <span id="countdown-timer">{countdown}</span>
        </div>

        <div className="subscribe">
          <p>Join our community of innovative farmers!</p>
          <form onSubmit={handleSubmit}>
            <input
              className="coming-soon-input"
              type="text"
              name="farmName"
              placeholder="Farm Name"
              value={formData.farmName}
              onChange={handleInputChange}
            />
            <input
              className="coming-soon-input"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <select
              className="coming-soon-input"
              name="cropType"
              value={formData.cropType}
              onChange={handleInputChange}
            >
              <option value="">Select Crop Type</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="soybean">Soybean</option>
            </select>
            <button type="submit">
              Join Waitlist <i className="fas fa-check checkmark"></i>
            </button>
          </form>
          {formError && <div className="validation-message">{formError}</div>}
        </div>
      </main>

      {showSuccessOverlay && (
        <div className="success-overlay show">
          <div className="success-content">
            <div className="success-icon">
              <i className="fas fa-check"></i>
            </div>
            <div className="success-message">Successfully Joined!</div>
            <div className="success-submessage">Welcome to our farming community</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComingSoon;
