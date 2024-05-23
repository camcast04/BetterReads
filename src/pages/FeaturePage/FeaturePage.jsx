// better-reads/src/pages/FeaturePage/FeaturePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturePage.css';
import SidePanel from '../../components/SidePanel/SidePanel';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import LandingPageNavBar from '../LandingPage/LandingPageNavBar';

const authors = [
  {
    name: 'Ocean Vuong',
    photo: '/images/ocean-vuong.jpg',
    books: [
      { id: '1', title: 'On Earth We\'re Briefly Gorgeous', cover: '/images/on-earth-briefly-gorgeous.jpg' },
      { id: '2', title: 'Night Sky with Exit Wounds', cover: '/images/night-sky-with-exit-wounds.jpg' },
      { id: '3', title: 'Time is a Mother', cover: '/images/time-is-a-mother.jpg' },
      { id: '4', title: 'The Best We Could Do', cover: '/images/the-best-we-could-do.jpg' },
    ],
  },
  {
    name: 'Amy Tan',
    photo: '/images/amy-tan.jpg',
    books: [
      { id: '5', title: 'The Joy Luck Club', cover: '/images/the-joy-luck-club.jpg' },
      { id: '6', title: 'The Bonesetter\'s Daughter', cover: '/images/the-bonesetters-daughter.jpg' },
      { id: '7', title: 'The Kitchen God\'s Wife', cover: '/images/the-kitchen-gods-wife.jpg' },
      { id: '8', title: 'Saving Fish from Drowning', cover: '/images/saving-fish-from-drowning.jpg' },
    ],
  },
  {
    name: 'Jhumpa Lahiri',
    photo: '/images/jhumpa-lahiri.jpg',
    books: [
      { id: '9', title: 'Interpreter of Maladies', cover: '/images/interpreter-of-maladies.jpg' },
      { id: '10', title: 'The Namesake', cover: '/images/the-namesake.jpg' },
      { id: '11', title: 'Unaccustomed Earth', cover: '/images/unaccustomed-earth.jpg' },
      { id: '12', title: 'The Lowland', cover: '/images/the-lowland.jpg' },
    ],
  },
];

export default function FeaturePage() {
  const user = getUser();

  return (
    <div className="feature-page">
      {user ? <NavBar user={user} setUser={null} /> : <LandingPageNavBar />}
      <div className="content">
        {user && <SidePanel />}
        <div className="main-content">
          <div className="hero-section">
            <img src="/images/FeatureHero.jpg" alt="Feature Hero" className="hero-image" />
          </div>
          <div className="authors-section">
            {authors.map(author => (
              <div key={author.name} className="author-card">
                <img src={author.photo} alt={author.name} className="author-photo" />
                <h2>{author.name}</h2>
                <div className="books-carousel">
                  {author.books.map(book => (
                    <Link key={book.id} to={`/book/${book.id}`} className="book-link">
                      <img src={book.cover} alt={book.title} className="book-cover" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

