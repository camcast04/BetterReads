// better-reads/src/pages/LandingPage/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <nav>
          <Link to="/about">About Us</Link>
          <Link to="/features">Features</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/auth">Log In</Link>
        </nav>
      </header>
      <main className="landing-main">
        <section className="intro-section">
          <h1>Love reading and collecting books? This is the perfect place for you.</h1>
        </section>
        <section className="goodreads-section">
          <h2>BetterReads</h2>
          <p>Your personalized library, community and book discovery platform, all in one place.</p>
          <Link to="/auth" className="button">Log In if you are already a member</Link>
          <Link to="/auth" className="button">Sign in</Link>
        </section>
      </main>
    </div>
  );
}