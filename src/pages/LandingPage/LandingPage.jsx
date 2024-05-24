//betterreads/src/pages/LandingPage/LandingPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Modal from '../../components/Modal/Modal';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function LandingPage({ setUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsSignUp(false);
    setModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="landing-container">
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
      <main className="landing-main">
        <section className="intro-section">
          <h1>
            Love reading and collecting books? This is the perfect place for
            you.
          </h1>
        </section>
        <section className="goodreads-section">
          <h2>
            Better<span>Reads</span> 📚
          </h2>
          <p>
            Your personalized library, community and book discovery platform,
            all in one place.
          </p>
          <button className="button" onClick={handleLoginClick}>
            Log In
          </button>
          <button className="button" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </section>
      </main>
      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        {isSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </Modal>
    </div>
  );
}
