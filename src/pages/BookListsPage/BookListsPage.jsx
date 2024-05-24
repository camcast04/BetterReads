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
            <BookListItem 
              key={book._id} 
              book={book} 
              listName={list.listName} 
              setLists={setLists} 
              lists={lists} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function BookListItem({ book, listName, setLists, lists }) {
  const handleRemoveFromList = async () => {
    try {
      const updatedList = await sendRequest(`/api/users/me/lists/${listName}/books/${book._id}`, 'DELETE');
      alert('Book removed from list!');
      
      // Update lists with the updated list
      setLists(lists.map(list => list._id === updatedList._id ? updatedList : list));
    } catch (error) {
      alert(`Failed to remove book from list: ${error.message}`);
    }
  };

  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} />
      <div className="book-card-content">
        <h1>{book.title}</h1>
        <p>{book.authors.join(', ')}</p>
        <button onClick={handleRemoveFromList}>Remove from List</button>
      </div>
    </div>
  );
}

// ------------------ Commented-out Code for Reference ------------------

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

// ------------------ Commented-out Code for Reference ------------------

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
