// better-reads/src/components/BookSearch/BookSearch.jsx

import React, { useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const searchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`/api/books?q=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.items) {
        const bookData = response.data.items.map(book => ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || ['Unknown Author'],
          coverImage: book.volumeInfo.imageLinks?.thumbnail,
          description: book.volumeInfo.description
        }));
        setBooks(bookData);
      } else {
        setBooks([]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={searchBooks}>Search</button>
      {error && <p>Error: {error}</p>}
      <div>
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;





