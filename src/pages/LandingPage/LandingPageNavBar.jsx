// betterreads/src/pages/LandingPage/LandingPageNavBar.jsx ***

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPageNavBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="landing-header">
      <nav>
        <img
          src="/images/Logo.png"
          alt="Logo"
          onClick={handleLogoClick}
          className="logo"
        />
        <div className="nav-links">
          <Link to="/about">About Us</Link>
          <Link to="/features">Features</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </nav>
    </header>
  );
}
