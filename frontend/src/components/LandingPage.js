import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartRecycling = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <img src="/assets/images.png" alt="Smart Waste Management Logo" />
          <span>Smart Waste Management</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
      <section className="hero-section">
        <h1>Welcome to Smart Waste Management</h1>
        <p>Your technology partner for innovative and impactful waste recycling solutions.</p>
        <button onClick={handleStartRecycling}>Start Recycling</button>
      </section>
      <section className="company-section">
        <h2>Company</h2>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/education">Education</a></li>
          <li><a href="/news">Latest News</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </section>
      <footer className="footer">
        <p>© 2023 Smart Waste Management | All Rights Reserved</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-use">Terms of Use</a>
        </p>
        <div className="social-links">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/github.png" alt="GitHub"/>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/insta.png" alt="Instagram"/>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/x.png" alt="Twitter"/>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/linkedin.png" alt="LinkedIn"/>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;