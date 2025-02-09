import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CropDeseaseDetection.css';
import { FaCloudUploadAlt, FaLeaf, FaChartLine, FaHistory, FaInfoCircle, FaBug, FaArrowLeft } from 'react-icons/fa';
import { MdPestControl, MdWaterDrop } from 'react-icons/md';
import { GiPlantRoots } from 'react-icons/gi';

const MOCK_RESPONSES = [
  {
    disease: "Early Blight",
    confidence: "95%",
    severity: "Moderate",
    precautions: [
      "Regular inspection of crops",
      "Proper irrigation management",
      "Use of resistant varieties",
      "Maintain proper plant spacing"
    ],
    treatment: "Apply copper-based fungicide every 7-10 days",
    environmentalFactors: {
      temperature: "20-25°C",
      humidity: "60-65%",
      soilPH: "6.0-6.5"
    },
    impactLevel: "Medium",
    spreadRate: "Moderate",
    economicImpact: "₹2000-3000 per acre if untreated"
  },
  {
    disease: "Bacterial Leaf Spot",
    confidence: "92%",
    severity: "High",
    precautions: [
      "Remove infected plant debris",
      "Avoid overhead irrigation",
      "Crop rotation with non-host plants",
      "Use disease-free seeds"
    ],
    treatment: "Apply streptomycin sulfate spray at 7-day intervals",
    environmentalFactors: {
      temperature: "25-30°C",
      humidity: "70-80%",
      soilPH: "5.5-6.5"
    },
    impactLevel: "High",
    spreadRate: "Fast",
    economicImpact: "₹4000-5000 per acre if untreated"
  },
  {
    disease: "Powdery Mildew",
    confidence: "88%",
    severity: "Low",
    precautions: [
      "Improve air circulation",
      "Avoid excessive nitrogen",
      "Plant resistant varieties",
      "Monitor humidity levels"
    ],
    treatment: "Apply sulfur-based fungicide at first sign of infection",
    environmentalFactors: {
      temperature: "18-22°C",
      humidity: "50-55%",
      soilPH: "6.5-7.0"
    },
    impactLevel: "Low",
    spreadRate: "Slow",
    economicImpact: "₹1000-1500 per acre if untreated"
  },
  {
    disease: "Root Rot",
    confidence: "90%",
    severity: "High",
    precautions: [
      "Improve soil drainage",
      "Avoid overwatering",
      "Use raised beds",
      "Sterilize garden tools"
    ],
    treatment: "Apply fungicidal drench and improve drainage immediately",
    environmentalFactors: {
      temperature: "15-20°C",
      humidity: "75-85%",
      soilPH: "5.8-6.2"
    },
    impactLevel: "High",
    spreadRate: "Moderate",
    economicImpact: "₹5000-6000 per acre if untreated"
  }
];

const IMAGES = {
  hero: "https://img.freepik.com/free-vector/smart-farming-abstract-concept-illustration_335657-3723.jpg",
  upload: "https://img.freepik.com/free-vector/upload-concept-illustration_114360-1136.jpg",
  scanning: "https://img.freepik.com/free-vector/scanning-fingerprint-concept-illustration_114360-7896.jpg",
  result: "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8013.jpg",
  emptyState: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg",
  guide: "https://img.freepik.com/free-vector/online-tutorials-concept_23-2148529257.jpg"
};

// Alternative image set (in case any of the above don't work):
const BACKUP_IMAGES = {
  hero: "https://raw.githubusercontent.com/saurabhnative/demoAssets/main/smartfarming1.png",
  upload: "https://raw.githubusercontent.com/saurabhnative/demoAssets/main/upload.png",
  scanning: "https://raw.githubusercontent.com/saurabhnative/demoAssets/main/scanning.png",
  result: "https://raw.githubusercontent.com/saurabhnative/demoAssets/main/result.png",
  emptyState: "https://raw.githubusercontent.com/saurabhnative/demoAssets/main/empty.png",
  guide: "https://raw.githubusercontent.com/saurabhnative/demoAssets/main/guide.png"
};

// Add this mock history data
const MOCK_HISTORY = [
  {
    id: 1,
    date: "2024-03-15 10:30 AM",
    disease: "Early Blight",
    confidence: "95%",
    severity: "Moderate",
    image: IMAGES.result,
    treatment: "Apply copper-based fungicide"
  },
  {
    id: 2,
    date: "2024-03-14 3:45 PM",
    disease: "Bacterial Leaf Spot",
    confidence: "92%",
    severity: "High",
    image: IMAGES.result,
    treatment: "Use streptomycin sulfate spray"
  },
  {
    id: 3,
    date: "2024-03-13 2:15 PM",
    disease: "Powdery Mildew",
    confidence: "88%",
    severity: "Low",
    image: IMAGES.result,
    treatment: "Apply sulfur-based fungicide"
  },
  {
    id: 4,
    date: "2024-03-12 11:20 AM",
    disease: "Root Rot",
    confidence: "90%",
    severity: "High",
    image: IMAGES.result,
    treatment: "Improve drainage and apply fungicide"
  }
];

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [scanHistory, setScanHistory] = useState(MOCK_HISTORY);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('scanHistory');
    if (savedHistory) {
      setScanHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save scan result to history
  const saveToHistory = (scanResult) => {
    const newScan = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      disease: scanResult.disease,
      confidence: scanResult.confidence,
      severity: scanResult.severity,
      image: selectedImage,
    };

    const updatedHistory = [newScan, ...scanHistory].slice(0, 10); // Keep last 10 scans
    setScanHistory(updatedHistory);
    localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      
      // Simulate API delay and randomly select a mock response
      setTimeout(() => {
        const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
        setResult(randomResponse);
        saveToHistory(randomResponse); // Save to history when result is received
      }, 1500);
    }
  };

  const statsCards = [
    { icon: <FaChartLine />, title: "Success Rate", value: "98%" },
    { icon: <MdPestControl />, title: "Diseases Detected", value: "50+" },
    { icon: <GiPlantRoots />, title: "Crops Supported", value: "25+" },
    { icon: <MdWaterDrop />, title: "Accuracy", value: "95%" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const cardVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 },
      background: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)"
    }
  };

  const leafAnimation = {
    animate: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      color: ["#4caf50", "#66bb6a", "#4caf50"]
    },
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  const HistoryTab = () => (
    <motion.div className="history-section">
      <div className="history-grid">
        {scanHistory.map((scan) => (
          <motion.div 
            key={scan.id}
            className="history-card glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedHistoryItem(scan)}
          >
            <div className="history-card-header">
              <div className="header-left">
                <FaHistory className="history-icon" />
                <span className="scan-date">{scan.date}</span>
              </div>
              <span className={`severity-badge ${scan.severity.toLowerCase()}`}>
                {scan.severity}
              </span>
            </div>

            <div className="history-content">
              <h3 className="disease-name">
                <FaBug className="disease-icon" />
                {scan.disease}
              </h3>
              
              <div className="confidence-section">
                <div className="confidence-bar-container">
                  <motion.div 
                    className="confidence-bar"
                    initial={{ width: 0 }}
                    animate={{ width: scan.confidence }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="confidence-text">Confidence: {scan.confidence}</p>
              </div>

              <div className="treatment-section">
                <FaLeaf className="treatment-icon" />
                <p className="treatment-text">{scan.treatment}</p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedHistoryItem && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedHistoryItem(null)}
        >
          <motion.div 
            className="modal-content glass-effect"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title">
                <FaBug className="disease-icon" />
                <h2>{selectedHistoryItem.disease}</h2>
              </div>
              <button 
                className="close-button"
                onClick={() => setSelectedHistoryItem(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Scan Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span>Date</span>
                    <p>{selectedHistoryItem.date}</p>
                  </div>
                  <div className="detail-item">
                    <span>Confidence</span>
                    <p>{selectedHistoryItem.confidence}</p>
                  </div>
                  <div className="detail-item">
                    <span>Severity</span>
                    <p className={`severity-text ${selectedHistoryItem.severity.toLowerCase()}`}>
                      {selectedHistoryItem.severity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Treatment Plan</h3>
                <p className="treatment-detail">{selectedHistoryItem.treatment}</p>
              </div>

              <div className="detail-section">
                <h3>Preventive Measures</h3>
                <ul className="measures-list">
                  <li>Regular inspection of crops</li>
                  <li>Maintain proper plant spacing</li>
                  <li>Ensure good air circulation</li>
                  <li>Use disease-resistant varieties</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .history-section {
          padding: 2rem;
        }

        .history-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        .history-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(47, 133, 90, 0.1);
          cursor: pointer;
        }

        .history-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .history-icon {
          color: var(--primary-color);
          font-size: 1.2rem;
        }

        .scan-date {
          color: #666;
          font-size: 0.9rem;
        }

        .severity-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .severity-badge.high {
          background: #FEE2E2;
          color: #DC2626;
        }

        .severity-badge.moderate {
          background: #FEF3C7;
          color: #D97706;
        }

        .severity-badge.low {
          background: #DCFCE7;
          color: #16A34A;
        }

        .disease-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 0 1rem 0;
          font-size: 1.2rem;
          color: var(--primary-color);
        }

        .disease-icon {
          font-size: 1rem;
        }

        .confidence-section {
          margin-bottom: 1rem;
        }

        .confidence-bar-container {
          height: 8px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .confidence-bar {
          height: 100%;
          background: linear-gradient(
            90deg,
            var(--primary-color),
            var(--secondary-color)
          );
          border-radius: 4px;
        }

        .confidence-text {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }

        .treatment-section {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .treatment-icon {
          color: var(--primary-color);
          font-size: 1rem;
          margin-top: 0.25rem;
        }

        .treatment-text {
          margin: 0;
          font-size: 0.9rem;
          color: #4B5563;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .history-section {
            padding: 1rem;
          }

          .history-grid {
            grid-template-columns: 1fr;
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-title h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--primary-color);
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #666;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-button:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #333;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .detail-section {
          margin-bottom: 2rem;
        }

        .detail-section h3 {
          color: var(--primary-color);
          margin: 0 0 1rem 0;
          font-size: 1.2rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .detail-item {
          background: rgba(47, 133, 90, 0.05);
          padding: 1rem;
          border-radius: 8px;
        }

        .detail-item span {
          font-size: 0.875rem;
          color: #666;
        }

        .detail-item p {
          margin: 0.25rem 0 0 0;
          font-weight: 500;
          color: #333;
        }

        .severity-text {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.875rem;
        }

        .severity-text.high {
          background: #FEE2E2;
          color: #DC2626;
        }

        .severity-text.moderate {
          background: #FEF3C7;
          color: #D97706;
        }

        .severity-text.low {
          background: #DCFCE7;
          color: #16A34A;
        }

        .treatment-detail {
          background: rgba(47, 133, 90, 0.05);
          padding: 1rem;
          border-radius: 8px;
          margin: 0;
          line-height: 1.6;
        }

        .measures-list {
          margin: 0;
          padding-left: 1.5rem;
        }

        .measures-list li {
          margin-bottom: 0.5rem;
          color: #4B5563;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .modal-content {
            margin: 0;
            max-height: 100vh;
            border-radius: 0;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );

  // Add these CSS variables at the top level of your component
  const zIndexValues = {
    base: 1,
    header: 10,
    modal: 1000,
    modalOverlay: 999,
  };

  const UserGuideTab = () => {
    const [activeStep, setActiveStep] = useState(null);

    const guideSteps = [
      {
        id: 1,
        icon: <FaCloudUploadAlt />,
        title: "Upload Plant Image",
        description: "Take a clear photo of the affected plant part or upload an existing image",
        tips: [
          "Ensure good lighting",
          "Focus on the affected area",
          "Avoid blurry images",
          "Include both healthy and affected parts"
        ],
        animation: {
          icon: {
            y: [0, -8, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          },
          hover: {
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(47, 133, 90, 0.15)"
          }
        }
      },
      {
        id: 2,
        icon: <FaChartLine />,
        title: "Get Analysis",
        description: "Our AI system analyzes the image and detects potential diseases",
        tips: [
          "Wait for complete analysis",
          "Review confidence score",
          "Check severity level",
          "Multiple diseases may be detected"
        ],
        animation: {
          icon: {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          },
          hover: {
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(47, 133, 90, 0.15)"
          }
        }
      },
      {
        id: 3,
        icon: <MdPestControl />,
        title: "Treatment Plan",
        description: "Receive detailed treatment recommendations and preventive measures",
        tips: [
          "Follow treatment steps",
          "Note environmental factors",
          "Implement preventive measures",
          "Monitor progress"
        ],
        animation: {
          icon: {
            rotate: [0, 360],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }
          },
          hover: {
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(47, 133, 90, 0.15)"
          }
        }
      },
      {
        id: 4,
        icon: <FaHistory />,
        title: "Track History",
        description: "Access your scan history and monitor plant health over time",
        tips: [
          "Review past scans",
          "Track treatment effectiveness",
          "Monitor disease patterns",
          "Plan preventive care"
        ],
        animation: {
          icon: {
            scale: [1, 1.2, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          },
          hover: {
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(47, 133, 90, 0.15)"
          }
        }
      }
    ];

    return (
      <motion.div 
        className="guide-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="guide-header">
          <motion.img 
            src={IMAGES.guide} 
            alt="User Guide"
            className="guide-hero"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div 
            className="guide-intro"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2>How to Use Plant Disease Detection</h2>
            <p>Follow these simple steps to get the most out of our AI-powered plant disease detection system</p>
          </motion.div>
        </div>

        <div className="steps-container">
          {guideSteps.map((step, index) => (
            <motion.div 
              key={step.id}
              className={`guide-step glass-effect ${activeStep === step.id ? 'active' : ''}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={step.animation.hover}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            >
              <div className="step-header">
                <motion.div 
                  className="step-icon"
                  animate={step.animation.icon}
                >
                  {step.icon}
                </motion.div>
                <motion.div 
                  className="step-number"
                  whileHover={{
                    scale: 1.1,
                    color: "var(--secondary-color)"
                  }}
                >
                  Step {step.id}
                </motion.div>
              </div>
              
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                
                <motion.div 
                  className="tips-section"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ delay: 0.3 * index }}
                >
                  <h4>Tips:</h4>
                  <ul>
                    {step.tips.map((tip, tipIndex) => (
                      <motion.li 
                        key={tipIndex}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * tipIndex + 0.3 * index }}
                      >
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <style jsx>{`
          .guide-container {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .guide-header {
            text-align: center;
            margin-bottom: 3rem;
          }

          .guide-hero {
            width: 200px;
            height: auto;
            margin-bottom: 1.5rem;
          }

          .guide-intro h2 {
            color: var(--primary-color);
            font-size: 1.8rem;
            margin-bottom: 1rem;
          }

          .guide-intro p {
            color: #666;
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
          }

          .steps-container {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            max-width: 1200px;
            margin: 0 auto;
          }

          .guide-step {
            position: relative;
            cursor: pointer;
            padding: 2rem;
            margin-bottom: 1rem;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            display: flex;
            flex-direction: column;
          }

          .step-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            position: relative;
          }

          .step-icon {
            background: linear-gradient(
              145deg,
              var(--primary-color),
              var(--secondary-color)
            );
            width: 60px;
            height: 60px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: white;
            box-shadow: 0 4px 15px rgba(47, 133, 90, 0.2);
          }

          .step-number {
            background: rgba(47, 133, 90, 0.1);
            color: var(--primary-color);
            width: 80px;
            height: 32px;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            font-weight: 500;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }

          .guide-step.active {
            border-color: var(--primary-color);
            background: linear-gradient(
              145deg,
              rgba(47, 133, 90, 0.05),
              rgba(72, 187, 120, 0.1)
            );
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .steps-container {
              grid-template-columns: 1fr;
              gap: 1rem;
              padding: 1rem;
            }

            .guide-step {
              padding: 1.5rem;
            }

            .step-header {
              margin-bottom: 1rem;
            }

            .step-icon {
              width: 50px;
              height: 50px;
              font-size: 1.5rem;
            }

            .step-number {
              width: 70px;
              height: 28px;
              font-size: 0.85rem;
            }
          }

          /* Additional styles for better visual hierarchy */
          .step-content {
            margin-top: 0.5rem;
          }

          .step-content h3 {
            color: var(--primary-color);
            font-size: 1.3rem;
            margin: 0 0 1rem 0;
          }

          .step-content p {
            color: #4B5563;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
        `}</style>
      </motion.div>
    );
  };

  return (
    <motion.div className="crop-disease-container">
      <motion.div className="hero-section glass-effect">
        <div className="animated-background">
          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="circle circle1"></div>
        </div>
        
        <div className="hero-content">
          <motion.div 
            className="title-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="leaf-icon-wrapper"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1, 1],
                opacity: 1
              }}
              initial={{ opacity: 1 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                opacity: { duration: 0 }
              }}
            >
              <FaLeaf className="leaf-icon" />
            </motion.div>
            <div>
              <h1 className="title">Plant Health Assistant</h1>
              <motion.p 
                className="subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                AI-Powered Plant Disease Detection
              </motion.p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img src={IMAGES.hero} alt="Smart Farming Illustration" />
        </motion.div>
      </motion.div>

      <div className="main-content">
        <motion.div 
          className="tabs"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <button 
            className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Image
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button 
            className={`tab ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            User Guide
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'upload' && (
              <motion.div 
                className="upload-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="upload-container glass-effect">
                  <motion.div 
                    className="upload-content"
                    animate={{
                      scale: [1, 1.02, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <div className="upload-illustration">
                      <img src={IMAGES.upload} alt="Upload Illustration" />
                    </div>
                    
                    <div className="upload-box">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="image-upload"
                        className="hidden-input"
                      />
                      <label htmlFor="image-upload" className="upload-label">
                        <FaCloudUploadAlt className="upload-icon" />
                        <p>Click or drag image to upload</p>
                        <span className="supported-formats">Supports: JPG, PNG, WEBP</span>
                      </label>
                    </div>
                  </motion.div>
                </div>

                {selectedImage && !result && (
                  <motion.div 
                    className="scanning-container glass-effect"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.img 
                      src={IMAGES.scanning} 
                      alt="Scanning"
                      className="scanning-image"
                      animate={{
                        scale: [1, 1.05, 1],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    <motion.p 
                      className="scanning-text"
                      animate={{
                        opacity: [1, 0.6, 1],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      Analyzing your plant...
                    </motion.p>
                  </motion.div>
                )}

                {result && (
                  <motion.div 
                    className="result-container glass-effect"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="result-header">
                      <div className="header-content">
                        <button 
                          className="back-button"
                          onClick={() => {
                            setResult(null);
                            setSelectedImage(null);
                          }}
                        >
                          <FaArrowLeft className="back-icon" />
                          <span>Back to Plant Assistant</span>
                        </button>
                        
                        <div className="result-title">
                          <motion.div 
                            className="result-icon-wrapper"
                            animate={{
                              rotate: [0, 5, -5, 0],
                              transition: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          >
                            <FaChartLine className="result-icon" />
                          </motion.div>
                          <h2>Analysis Results</h2>
                        </div>
                      </div>
                    </div>

                    <div className="result-content">
                      <motion.div className="result-grid">
                        <motion.div className="result-card primary-info">
                          <h3>
                            <FaLeaf className="card-icon" /> Disease Detection
                          </h3>
                          <motion.div 
                            className="detection-details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <motion.div 
                              className="disease-info"
                              animate={{ 
                                scale: [1, 1.02, 1],
                                transition: { 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }
                              }}
                            >
                              <div className="disease-icon-wrapper">
                                <FaBug className="disease-icon" />
                              </div>
                              <div className="disease-text">
                                <h4 className="disease-name">{result.disease}</h4>
                                <div className="confidence-wrapper">
                                  <div className="confidence-bar-container">
                                    <motion.div 
                                      className="confidence-bar"
                                      initial={{ width: "0%" }}
                                      animate={{ width: result.confidence }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                  </div>
                                  <motion.p 
                                    className="confidence-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                  >
                                    Confidence: {result.confidence}
                                  </motion.p>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>

                        <motion.div className="result-card environmental-factors">
                          <h3>Environmental Conditions</h3>
                          <div className="factors-grid">
                            {Object.entries(result.environmentalFactors).map(([key, value]) => (
                              <div key={key} className="factor">
                                <span>{key}</span>
                                <p>{value}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div className="result-card precautions">
                          <h3>Precautions</h3>
                          <ul>
                            {result.precautions.map((precaution, index) => (
                              <li key={index}>{precaution}</li>
                            ))}
                          </ul>
                        </motion.div>

                        <motion.div className="result-card treatment">
                          <h3>Treatment Plan</h3>
                          <p>{result.treatment}</p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && <HistoryTab />}

            {activeTab === 'guide' && <UserGuideTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        .crop-disease-container {
          --primary-color: #2F855A;
          --secondary-color: #48BB78;
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #F7FDF6 0%,    /* Very light sage green */
            #EDF7ED 50%,   /* Light fresh green */
            #E8F5E9 100%   /* Soft mint green */
          );
          padding: 1rem;
          position: relative;
          z-index: ${zIndexValues.base};
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: inherit;
        }

        .hero-section {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
          min-height: 120px;
        }

        .animated-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        .leaf {
          position: absolute;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          opacity: 0.1;
          border-radius: 50% 5px;
          animation: floatLeaf 15s infinite linear;
        }

        .leaf1 {
          width: 60px;
          height: 60px;
          top: -20px;
          right: 10%;
        }

        .leaf2 {
          width: 40px;
          height: 40px;
          bottom: -10px;
          left: 20%;
          animation-delay: -5s;
        }

        .circle1 {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          opacity: 0.1;
          top: -50px;
          right: -50px;
          animation: pulse 10s infinite ease-in-out;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .title-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .leaf-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 166, 126, 0.2);
          flex-shrink: 0;
        }

        .leaf-icon {
          color: white;
          font-size: 1.25rem;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 0.875rem;
          color: #666;
          margin: 0.25rem 0 0 0;
        }

        .hero-image {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          display: none;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes floatLeaf {
          0% {
            transform: rotate(0deg) translate(0, 0);
          }
          100% {
            transform: rotate(360deg) translate(0, 0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.15;
          }
        }

        @media (min-width: 640px) {
          .hero-section {
            padding: 1.5rem 2rem;
          }

          .title {
            font-size: 1.75rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .hero-image {
            display: block;
          }
        }

        @media (min-width: 1024px) {
          .hero-section {
            padding: 2rem 3rem;
          }

          .title {
            font-size: 2rem;
          }

          .hero-image {
            width: 150px;
            height: 150px;
          }
        }

        .upload-section {
          margin: 1rem 0;
        }

        .upload-container {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .upload-illustration {
          width: 100%;
          max-width: 280px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-illustration img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .upload-box {
          width: 100%;
          max-width: 400px;
          border: 2px dashed var(--primary-color);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          background: rgba(0, 166, 126, 0.02);
        }

        .upload-box:hover {
          border-color: var(--secondary-color);
          background: rgba(0, 166, 126, 0.05);
        }

        .hidden-input {
          display: none;
        }

        .upload-label {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .upload-icon {
          font-size: 2.5rem;
          color: var(--primary-color);
        }

        .upload-label p {
          margin: 0;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .supported-formats {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        @media (min-width: 768px) {
          .upload-content {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 3rem;
          }

          .upload-illustration {
            max-width: 320px;
          }

          .upload-box {
            min-width: 320px;
          }
        }

        @media (min-width: 1024px) {
          .upload-container {
            padding: 2rem;
          }

          .upload-illustration {
            max-width: 380px;
          }

          .upload-box {
            min-width: 380px;
          }
        }

        .scanning-container {
          margin: 1.5rem 0;
          padding: 2rem;
          text-align: center;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .scanning-image {
          width: 100%;
          max-width: 200px;
          height: auto;
          margin-bottom: 1.5rem;
        }

        .scanning-text {
          font-size: 1.1rem;
          color: var(--primary-color);
          margin: 0;
        }

        .result-container {
          position: relative;
          z-index: ${zIndexValues.base};
        }

        .result-header {
          position: sticky;
          top: 0;
          background: white;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          z-index: ${zIndexValues.header};
        }

        .header-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--primary-color);
          font-size: 1rem;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 8px;
          align-self: flex-start;
        }

        .back-button:hover {
          background: rgba(47, 133, 90, 0.1);
          transform: translateX(-2px);
        }

        .back-icon {
          font-size: 1.2rem;
        }

        .result-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .result-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .result-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .result-title h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary-color);
        }

        .result-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .result-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(2, 1fr);
        }

        .result-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .result-card h3 {
          margin: 0 0 1rem 0;
          color: var(--primary-color);
          font-size: 1.1rem;
        }

        .primary-info {
          grid-column: 1 / -1;
          background: linear-gradient(145deg, 
            rgba(47, 133, 90, 0.08),
            rgba(72, 187, 120, 0.15)
          );
          border: 1px solid rgba(47, 133, 90, 0.2);
          padding: 2rem;
        }

        .card-icon {
          color: var(--primary-color);
          margin-right: 0.5rem;
          font-size: 1.2rem;
          vertical-align: middle;
        }

        .h3 {
          color: var(--primary-color);
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
        }

        .detection-details {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .disease-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .disease-icon-wrapper {
          background: var(--primary-color);
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(47, 133, 90, 0.2);
        }

        .disease-icon {
          color: white;
          font-size: 1.5rem;
        }

        .disease-text {
          flex: 1;
        }

        .disease-name {
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--primary-color);
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .confidence-wrapper {
          margin-top: 0.75rem;
        }

        .confidence-bar-container {
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(47, 133, 90, 0.2);
        }

        .confidence-bar {
          height: 100%;
          background: linear-gradient(
            90deg,
            var(--primary-color),
            var(--secondary-color)
          );
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(47, 133, 90, 0.2);
        }

        .confidence-text {
          margin: 0.5rem 0 0 0;
          font-size: 1.1rem;
          color: var(--primary-color);
          font-weight: 500;
        }

        .factors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }

        .factor {
          background: rgba(47, 133, 90, 0.05);
          padding: 0.75rem;
          border-radius: 8px;
        }

        .factor span {
          font-size: 0.875rem;
          color: #666;
        }

        .factor p {
          margin: 0.25rem 0 0 0;
          font-weight: 500;
          color: var(--primary-color);
        }

        .precautions ul {
          margin: 0;
          padding-left: 1.25rem;
        }

        .precautions li {
          margin-bottom: 0.5rem;
          color: #4a5568;
        }

        @media (max-width: 768px) {
          .result-grid {
            grid-template-columns: 1fr;
          }

          .result-container {
            padding: 1rem;
          }

          .result-content {
            padding: 0;
          }

          .result-title h2 {
            font-size: 1.25rem;
          }

          .primary-info {
            padding: 1.25rem;
          }

          .disease-info {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .disease-name {
            font-size: 1.4rem;
          }

          .confidence-text {
            font-size: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .detection-details {
            padding: 2rem;
          }

          .disease-icon-wrapper {
            width: 60px;
            height: 60px;
          }

          .disease-icon {
            font-size: 1.8rem;
          }
        }

        .history-section {
          position: relative;
          z-index: ${zIndexValues.base};
        }

        .history-card {
          position: relative;
          z-index: ${zIndexValues.base + 1};
          cursor: pointer;
        }

        .history-card:hover {
          z-index: ${zIndexValues.base + 2};
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          z-index: ${zIndexValues.modalOverlay};
        }

        .modal-content {
          position: relative;
          z-index: ${zIndexValues.modal};
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          position: sticky;
          top: 0;
          background: white;
          z-index: ${zIndexValues.modal + 1};
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-button {
          position: relative;
          z-index: ${zIndexValues.modal + 2};
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #666;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-button:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #333;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .detail-section {
          margin-bottom: 2rem;
        }

        .detail-section h3 {
          color: var(--primary-color);
          margin: 0 0 1rem 0;
          font-size: 1.2rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .detail-item {
          background: rgba(47, 133, 90, 0.05);
          padding: 1rem;
          border-radius: 8px;
        }

        .detail-item span {
          font-size: 0.875rem;
          color: #666;
        }

        .detail-item p {
          margin: 0.25rem 0 0 0;
          font-weight: 500;
          color: #333;
        }

        .severity-text {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.875rem;
        }

        .severity-text.high {
          background: #FEE2E2;
          color: #DC2626;
        }

        .severity-text.moderate {
          background: #FEF3C7;
          color: #D97706;
        }

        .severity-text.low {
          background: #DCFCE7;
          color: #16A34A;
        }

        .treatment-detail {
          background: rgba(47, 133, 90, 0.05);
          padding: 1rem;
          border-radius: 8px;
          margin: 0;
          line-height: 1.6;
        }

        .measures-list {
          margin: 0;
          padding-left: 1.5rem;
        }

        .measures-list li {
          margin-bottom: 0.5rem;
          color: #4B5563;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 0;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
          }

          .modal-header {
            padding: 1rem;
          }
        }

        .modal-overlay {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
      `}</style>
    </motion.div>
  );
};

export default CropDiseaseDetection;
