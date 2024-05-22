// better-reads/src/components/BookCard/BookCard.jsx

import { Link } from 'react-router-dom';
import './BookCard.css';

export default function BookCard({ book }) {
  if (!book) {
    return null;
  }

  const { id, title, authors, coverImage } = book;

  return (
    <div className="book-card">
      <img src={book.coverImage || "https://placehold.co/100x120"} alt={`${book.title} cover`} />
      <div className="book-card-content">
        <h1>{book.title}</h1>
        <p>{book.authors.join(', ')}</p>
        <Link to={`/book/${id}`}>
          <button>Learn More</button>
        </Link>
      </div>
    </div>
  );
}


// export default function BookCard() {
//   return (
//     <div className="book-card">
//       <img src="https://placehold.co/100x120" alt="Book cover" />
//       <div className="book-card-content">
//         <h1>Book Title</h1>
//         <button>Learn More</button>
//       </div>
//     </div>
//   );
// }
