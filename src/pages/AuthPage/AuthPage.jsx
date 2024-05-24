import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Modal from '../../components/Modal/Modal';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);

  return (
    <main>
      <h1>AuthPage</h1>
      <button
        onClick={() => {
          setShowSignUp(false);
          setModalOpen(true);
        }}
      >
        Log In
      </button>
      <button
        onClick={() => {
          setShowSignUp(true);
          setModalOpen(true);
        }}
      >
        Sign Up
      </button>
      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        {showSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </Modal>
    </main>
  );
}
