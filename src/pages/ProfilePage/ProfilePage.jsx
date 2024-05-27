// betterreads/src/pages/ProfilePage/ProfilePage.jsx **

import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import BookCard from '../../components/BookCard/BookCard';
import Modal from '../../components/Modal/Modal';
import * as usersService from '../../utilities/users-service';
import { avatarPaths } from '../../constants/avatarPaths';

export default function ProfilePage({ user }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const updatedUser = await usersService.getUser();
        setName(updatedUser.name);
        setEmail(updatedUser.email);
        setAvatar(updatedUser.avatar);
      } catch (err) {
        setError('Failed to fetch user details');
      }
    }

    fetchUser();
  }, []);

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
      const updatedUser = await usersService.updateUser({
        name,
        email,
        avatar,
      });
      setName(updatedUser.user.name);
      setEmail(updatedUser.user.email);
      setAvatar(updatedUser.user.avatar);
      toggleEditModal();
      setError(null);
    } catch (err) {
      setError('Failed to update user details');
    }
  };

  return (
    <div style={{ marginTop: '100px' }} className="container">
      <div className="user-info-box">
        <img
          style={{ borderRadius: '50%' }}
          src={avatar || 'https://placehold.co/100x120'}
          alt={`${name}'s avatar`}
          className="avatar"
        />
        <h1>{name}</h1>
        <div className="user-subdetails">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
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
          <select name="avatar" value={avatar} onChange={handleChange}>
            {avatarPaths.map((path, index) => (
              <option key={index} value={path}>
                {index + 1}
              </option>
            ))}
          </select>
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
    </div>
  );
}
