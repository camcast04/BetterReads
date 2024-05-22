// better-reads/src/pages/BookDetailsPage/BookDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import sendRequest from '../../utilities/send-request';

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{bookDetails.title}</h1>
      {bookDetails.coverImage && <img src={bookDetails.coverImage} alt={`${bookDetails.title} cover`} />}
      <p><strong>Authors:</strong> {bookDetails.authors.join(', ')}</p>
      <p><strong>Publisher:</strong> {bookDetails.publisher}</p>
      <p><strong>Published Date:</strong> {bookDetails.publishedDate}</p>
      <p>{bookDetails.description}</p>
    </div>
  );
}
