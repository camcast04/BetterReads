//*

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import BookCard from '../../components/BookCard/BookCard';

export default function BookListDetailsPage() {
  const { listName } = useParams();
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      console.log('Fetching list with name:', listName);
      try {
        const data = await sendRequest(`/api/users/me/lists/${listName}`);
        console.log('List fetched:', data);
        setList(data);
      } catch (error) {
        console.error('Error fetching list:', error);
        setError(error.message);
      }
    };

    fetchList();
  }, [listName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-list-details-page">
      <h1>{list.listName}</h1>
      <div className="book-cards-container">
        {list.books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
