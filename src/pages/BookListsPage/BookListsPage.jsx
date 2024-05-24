// better-reads/src/pages/BookListsPage/BookListsPage.jsx

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import sendRequest from '../../utilities/send-request';
// import './BookListsPage.css';

// export default function BookListsPage() {
//   const [lists, setLists] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const data = await sendRequest('/api/users/me/lists');
//         setLists(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchLists();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="book-lists-page">
//       <h1>Your Book Lists</h1>
//       {lists.map(list => (
//         <div key={list._id} className="book-list">
//           <h2>{list.listName}</h2>
//           <Link to={`/lists/${list.listName}`}>View List</Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// better-reads/src/pages/BookListsPage/BookListsPage.jsx
import React, { useEffect, useState } from 'react';
import sendRequest from '../../utilities/send-request';
import './BookListsPage.css';

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

  return (
    <div className="book-lists-page">
      <h1>Your Book Lists</h1>
      {lists.map((list) => (
        <div key={list._id} className="book-list">
          <h2>{list.listName}</h2>
          {list.books.map((book) => (
            <BookListItem key={book._id} book={book} listName={list.listName} />
          ))}
        </div>
      ))}
    </div>
  );
}

function BookListItem({ book, listName }) {
  const handleAddToFavorites = async () => {
    try {
      await sendRequest(`/api/users/me/lists/Favorites/books`, 'POST', { bookId: book.googleBooksId });
      alert('Book added to favorites!');
    } catch (error) {
      alert(`Failed to add book to favorites: ${error.message}`);
    }
  };

  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p>{book.authors.join(', ')}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
}








// import React, { useEffect, useState } from 'react';
// import sendRequest from '../../utilities/send-request';
// // import './BookListsPage.css';

// export default function BookListsPage() {
//   const [lists, setLists] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const data = await sendRequest('/api/users/me/lists');
//         setLists(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchLists();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!lists.length) {
//     return <div>No lists available</div>;
//   }

//   return (
//     <div className="book-lists-page">
//       <h1>My Book Lists</h1>
//       {lists.map((list, index) => (
//         <div key={index} className="book-list">
//           <h2>{list.name}</h2>
//           {list.books.map((book, bookIndex) => (
//             <div key={bookIndex} className="book-item">
//               <p>{book.title}</p>
//               <img src={book.coverImage} alt={`${book.title} cover`} />
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
