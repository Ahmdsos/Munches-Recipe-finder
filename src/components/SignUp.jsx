import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config';  
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMailOutline, IoKeyOutline, IoLogoGoogle } from 'react-icons/io5';

// Functional component for handling the sign-up process
const SignUp = () => {
  // State hooks for managing email, password, error messages, and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle the sign-up process with email and password
  const handleSignUp = async () => {
    if (!email.includes('@')) { // Validate email format
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) { // Ensure password is at least 8 characters long
      setError('Password must be at least 8 characters long.');
      return;
    }
    setLoading(true); // Set loading state to true during the authentication process
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Navigate to home page on successful sign up
    } catch (error) {
      setError('Failed to create account. Please try again.'); // Handle errors like email already in use
      setLoading(false); // Reset loading state
    }
  };

  // Function for handling sign-up using Google authentication
  const googleSignIn = async () => {
    setLoading(true); // Set loading state
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Navigate to home page on successful sign up
    } catch (error) {
      setError('Google sign-in failed. Please try again.'); // Handle errors
      setLoading(false); // Reset loading state
    }
  };

  return (
    <AuthContainer> 
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputGroup> 
        <Icon><IoMailOutline size="1.5em" /></Icon>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" disabled={loading} />
      </InputGroup>
      <InputGroup> 
        <Icon><IoKeyOutline size="1.5em" /></Icon> 
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" disabled={loading} />
      </InputGroup>
      <SignUpButton onClick={handleSignUp} disabled={loading}>Sign Up</SignUpButton>  
      <GoogleButton onClick={googleSignIn} disabled={loading}> 
        <IoLogoGoogle size="1.5em" />
        Sign Up with Google
      </GoogleButton>
    </AuthContainer>
  );
};

// Styled components definitions for various UI elements used in the SignUp component

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: fit-content;
  margin: auto;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 15px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 12px;
  width: 250px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #007BFF;
  }
`;

const SignUpButton = styled.button`
  margin-top: 20px;
  padding: 12px 25px;
  cursor: pointer;
  background-color: rgb(23, 205, 89);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(17, 174, 75);
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 12px 25px;
  cursor: pointer;
  background-color: #D32F2F;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #C62828;
  }
`;

const ErrorMessage = styled.div`
  color: #D32F2F;
  background-color: #FFF0F0;
  border: 1px solid #D32F2F;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

export default SignUp;
