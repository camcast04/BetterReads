import './BookCard.css';

export default function BookCard() {
  return (
    <div className="book-card">
      <img src="https://placehold.co/100x120" alt="Book cover" />
      <div className="book-card-content">
        <h1>Book Title</h1>
        <button>Learn More</button>
      </div>
    </div>
  );
}
