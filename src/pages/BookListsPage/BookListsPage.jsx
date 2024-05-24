//betterreads/src/pages/BookListsPage/BookListsPage.jsx **

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
          <div className="books-row"> {/* Using flex container here */}
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
        </div>
      ))}
    </div>
  );
}

function BookListItem({ book, listName, setLists, lists }) {
  const handleRemoveFromList = async () => {
    try {
      const updatedList = await sendRequest(
        `/api/users/me/lists/${listName}/books/${book._id}`,
        'DELETE'
      );
      alert('Book removed from list!');

      setLists(
        lists.map((list) => (list._id === updatedList._id ? updatedList : list))
      );
    } catch (error) {
      alert(`Failed to remove book from list: ${error.message}`);
    }
  };

  return (
    <div className="book-item">
      <img src={book.coverImage} alt={book.title} />
      <div className="book-card-content">
        <h1>{book.title}</h1>
        <p>{book.authors.join(', ')}</p>
        <button onClick={handleRemoveFromList}>Remove from List</button>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
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
//       {lists.map((list) => (
//         <div key={list._id} className="book-list">
//           <h2>{list.listName}</h2>
//           {list.books.map((book) => (
//             <BookListItem
//               key={book._id}
//               book={book}
//               listName={list.listName}
//               setLists={setLists}
//               lists={lists}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// function BookListItem({ book, listName, setLists, lists }) {
//   const handleRemoveFromList = async () => {
//     try {
//       const updatedList = await sendRequest(
//         `/api/users/me/lists/${listName}/books/${book._id}`,
//         'DELETE'
//       );
//       alert('Book removed from list!');

//       setLists(
//         lists.map((list) => (list._id === updatedList._id ? updatedList : list))
//       );
//     } catch (error) {
//       alert(`Failed to remove book from list: ${error.message}`);
//     }
//   };

//   return (
//     <div className="book-card">
//       <img src={book.coverImage} alt={book.title} />
//       <div className="book-card-content">
//         <h1>{book.title}</h1>
//         <p>{book.authors.join(', ')}</p>
//         <button onClick={handleRemoveFromList}>Remove from List</button>
//       </div>
//     </div>
//   );
// }
