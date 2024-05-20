import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import BookDetailsPage from '../BookDetailsPage/BookDetailsPage';
import BookListsPage from '../BookListsPage';
import ProfilePage from '../ProfilePage';
import LandingPage from '../LandingPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const searchBooks = async () => {
    try {
      const response = await axios.get(`/api/books?q=${query}`);
      console.log('Response data:', response.data);
      if (response.data.items) {
        setBooks(response.data.items);
      } else {
        console.log('No items found in response');
        setBooks([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar
            user={user}
            setUser={setUser}
          />
          {
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/"
                element={<LandingPage />}
              />
              <Route
                path="/profile/:username"
                element={<ProfilePage />}
              />
              <Route
                path="/book/:bookId"
                element={<BookDetailsPage />}
              />
              <Route
                path="/book-list/:listId"
                element={<BookListsPage />}
              />
            </Routes>
          }
          <div>
            <h1>Book Search</h1>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books"
            />
            <button onClick={searchBooks}>Search</button>
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
          </div>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
