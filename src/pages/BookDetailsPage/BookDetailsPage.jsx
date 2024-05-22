// better-reads/src/pages/BookDetailsPage/BookDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import './BookDetailsPage.css';

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [relatedBooks, setRelatedBooks] = useState([]);
  // eslint-disable-next-line
  const [listId, setListId] = useState(''); 
  const [selectedList, setSelectedList] = useState('Favorites');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await sendRequest(`/api/books/details/${bookId}`);
        setBookDetails(data);
        setRelatedBooks(data.relatedBooks || []);
        setReviews(data.reviews || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddReview = async () => {
    try {
      const data = await sendRequest(`/api/books/details/${bookId}/reviews`, 'POST', { review: newReview, rating });
      setReviews([...reviews, data]);
      setNewReview('');
      setRating(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddToList = async () => {
    try {
      await sendRequest(`/api/users/me/lists/${selectedList}/books`, 'POST', { bookId });
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
        {/* Dropdown to select list */}
        <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
          <option value="Favorites">Favorites</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Did Not Finish">Did Not Finish</option>
          <option value="To Read">To Read</option>
        </select>
        <button onClick={handleAddToList}>Add to List</button>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.user}</strong>: {review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
        <div className="add-review">
          <h3>Add a Review</h3>
          <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Write your review" />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            max={5}
            min={0}
            placeholder="Rating"
          />
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>

      <div className="related-books">
        <h2>Related Books</h2>
        <div className="related-books-list">
          {relatedBooks.map((book, index) => (
            <div key={index} className="related-book-card">
              <img src={book.coverImage} alt={`${book.title} cover`} />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
