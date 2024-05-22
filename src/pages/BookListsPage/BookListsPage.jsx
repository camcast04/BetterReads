// better-reads/src/pages/BookListsPage/BookListsPage.jsx

import React, { useEffect, useState } from 'react';
import sendRequest from '../../utilities/send-request';
// import './BookListsPage.css';

export default function BookListsPage() {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await sendRequest('/api/users/me/lists');
        setLists(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLists();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lists.length) {
    return <div>No lists available</div>;
  }

  return (
    <div className="book-lists-page">
      <h1>My Book Lists</h1>
      {lists.map((list, index) => (
        <div key={index} className="book-list">
          <h2>{list.name}</h2>
          {list.books.map((book, bookIndex) => (
            <div key={bookIndex} className="book-item">
              <p>{book.title}</p>
              <img src={book.coverImage} alt={`${book.title} cover`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
