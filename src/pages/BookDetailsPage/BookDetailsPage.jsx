// better-reads/src/pages/BookDetailsPage/BookDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import './BookDetailsPage.css';

export default function BookDetailsPage({ user }) {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState('Favorites');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await sendRequest(`/api/books/details/${bookId}`);
        setBookDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddToList = async () => {
    try {
      await sendRequest(`/api/users/${user._id}/lists/${selectedList}/books`, 'POST', { bookId });
      alert('Book added to list!');
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details-page">
      <div className="book-info">
        <h1>{bookDetails.title}</h1>
        {bookDetails.coverImage && <img src={bookDetails.coverImage} alt={`${bookDetails.title} cover`} />}
        <p><strong>Authors:</strong> {bookDetails.authors.join(', ')}</p>
        <p><strong>Publisher:</strong> {bookDetails.publisher}</p>
        <p><strong>Published Date:</strong> {bookDetails.publishedDate}</p>
        <p>{bookDetails.description}</p>
        <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
          <option value="Favorites">Favorites</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Did Not Finish">Did Not Finish</option>
          <option value="To Read">To Read</option>
        </select>
        <button onClick={handleAddToList}>Add to List</button>
      </div>
    </div>
  );
}
