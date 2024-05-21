import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import BookDetailsPage from '../BookDetailsPage/BookDetailsPage';
import BookListsPage from '../BookListsPage/BookListsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import LandingPage from '../LandingPage/LandingPage';
import BookSearch from '../../components/BookSearch/BookSearch';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [books, setBooks] = useState([]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/book/:bookId" element={<BookDetailsPage />} />
            <Route path="/book-list/:listId" element={<BookListsPage />} />
            <Route
              path="/search"
              element={<BookSearch setBooks={setBooks} />}
            />
          </Routes>
          <div>
            {books && books.length > 0 ? (
              books.map((book) => (
                <div key={book.id}>
                  <h2>{book.volumeInfo.title}</h2>
                  <p>
                    {book.volumeInfo.authors &&
                      book.volumeInfo.authors.join(', ')}
                  </p>
                  <p>{book.volumeInfo.description}</p>
                </div>
              ))
            ) : (
              <p>No books found</p>
            )}
          </div>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
