import './ProfilePage.css';
import BookCard from '../../components/BookCard/BookCard';

export default function ProfilePage({ user }) {
  return (
    <div className="container">
      <div className="user-info-box">
        <img
          style={{ borderRadius: '50%' }}
          src="https://placehold.co/100"
          alt="user image"
        />
        <h1>{user.name}</h1>
        <div className="user-subdetails">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Birthday:</strong> {user.birthday || 'Not Provided'}
          </p>
          <button>Edit User Details</button>
        </div>
      </div>
      <div className="recent-reads">
        <h2>Recently Read</h2>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
      <div className="lists">
        <h2>Book Lists</h2>
        <div className="list">
          <h3>Reading</h3>
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
        <div className="list">
          <h3>Next Up</h3>
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
        <div className="list">
          <h3>Favorites</h3>
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
        <div className="list">
          <h3>Never Again</h3>
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </div>
  );
}
