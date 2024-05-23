import React, { useState } from 'react';
import './ProfilePage.css';
import BookCard from '../../components/BookCard/BookCard';
import Modal from '../../components/Modal/Modal';
import * as usersService from '../../utilities/users-service';

export default function ProfilePage({ user }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [error, setError] = useState(null);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'avatar') setAvatar(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...user, name, email, avatar };
      await usersService.updateUser(updatedUser);
      toggleEditModal();
    } catch (err) {
      setError('Failed to update user details');
    }
  };

  return (
    <div className="container">
      <div className="user-info-box">
        <img
          style={{ borderRadius: '50%' }}
          src={avatar || 'https://via.placeholder.com/150'}
          alt={`${user.name}'s avatar`}
        />
        <h1>{user.name}</h1>
        <div className="user-subdetails">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Birthday:</strong> {user.birthday || 'Not Provided'}
          </p>
          <button onClick={toggleEditModal}>Edit User Details</button>
        </div>
      </div>
      <div className="recent-reads">
        <h2>Recently Read</h2>
      </div>
      <div className="lists">
        <h2>Book Lists</h2>
        <div className="list">
          <h3>Reading</h3>
          <BookCard />
        </div>
        <div className="list">
          <h3>Next Up</h3>
          <BookCard />
        </div>
        <div className="list">
          <h3>Favorites</h3>
          <BookCard />
        </div>
        <div className="list">
          <h3>Never Again</h3>
          <BookCard />
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={toggleEditModal}>
        <h2>Edit User Details</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label>Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={avatar}
            onChange={handleChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
    </div>
  );
}
