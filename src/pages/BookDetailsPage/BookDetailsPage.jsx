//*

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import './BookDetailsPage.css';

export default function BookDetailsPage({ user }) {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState('Favorites');
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      console.log('Fetching book details for bookId:', bookId);
      try {
        const data = await sendRequest(`/api/books/details/${bookId}`);
        console.log('Book details fetched:', data);
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError(error.message);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  useEffect(() => {
    const fetchLists = async () => {
      console.log('Fetching user lists');
      try {
        const data = await sendRequest('/api/users/me/lists');
        console.log('User lists fetched:', data);
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
        setError(error.message);
      }
    };

    fetchLists();
  }, []);

  const handleAddToList = async () => {
    console.log('Adding book to list:', selectedList);
    try {
      const updatedList = await sendRequest(
        `/api/users/me/lists/${selectedList}/books`,
        'POST',
        { bookId }
      );
      console.log('Response from server:', updatedList);
      alert('Book added to list!');

      console.log('Updated list contains:', updatedList.books);

      setLists(
        lists.map((list) => (list._id === updatedList._id ? updatedList : list))
      );
    } catch (error) {
      console.error('Error adding book to list:', error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const cleanDescription = stripHtmlTags(bookDetails.description);

  return (
//     <div className="book-details-page">
//       <div className="book-card book-info">
//         {bookDetails.coverImage && (
//           <img
//             src={bookDetails.coverImage}
//             alt={`${bookDetails.title} cover`}
//           />
//         )}
//         <div className="book-card-content">
//           <h1>{bookDetails.title}</h1>
//           <p><strong>Authors:</strong> {bookDetails.authors.join(', ')}</p>
//           <p><strong>Publisher:</strong> {bookDetails.publisher}</p>
//           <p><strong>Published Date:</strong> {bookDetails.publishedDate}</p>
//           <p className="description">{cleanDescription}</p>
//           <select
//             value={selectedList}
//             onChange={(e) => setSelectedList(e.target.value)}
//           >
//             {lists.map((list) => (
//               <option key={list._id} value={list.listName}>
//                 {list.listName}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleAddToList}>Add to List</button>
//         </div>
//       </div>
//     </div>
//   );
//

<div className="book-details-page">
  <div className="book-info">
    <h1>{bookDetails.title}</h1>
    {bookDetails.coverImage && (
      <img
        src={bookDetails.coverImage}
        alt={`${bookDetails.title} cover`}
      />
    )}
    <p>
      <strong>Authors:</strong> {bookDetails.authors.join(', ')}
    </p>
    <p>
      <strong>Publisher:</strong> {bookDetails.publisher}
    </p>
    <p>
      <strong>Published Date:</strong> {bookDetails.publishedDate}
    </p>
    <p>{cleanDescription}</p>
    <select
      value={selectedList}
      onChange={(e) => setSelectedList(e.target.value)}
    >
      {lists.map((list) => (
        <option key={list._id} value={list.listName}>
          {list.listName}
        </option>
      ))}
    </select>
    <button onClick={handleAddToList}>Add to List</button>
  </div>
</div>
);
}
