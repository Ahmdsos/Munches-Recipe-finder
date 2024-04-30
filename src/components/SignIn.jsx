import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config';  // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMailOutline, IoKeyOutline, IoLogoGoogle } from 'react-icons/io5';

// SignIn component handles user sign-in functionality including Google sign-in
const SignIn = () => {
  // State hooks for managing email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Hook to navigate programmatically after successful sign-in
  const navigate = useNavigate();

  // Function to handle sign-in with email and password
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');  // Navigate to home page after successful sign-in
    } catch (error) {
      console.error('Error during sign in:', error.message);  // Log error if sign-in fails
    }
  };

  // Function to handle sign-in using Google authentication
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');  // Navigate to home page after successful Google sign-in
    } catch (error) {
      console.error('Error during Google sign in:', error);  // Log error if Google sign-in fails
    }
  };

  // Component layout using styled-components for styling
  return (
    <AuthContainer>
      <InputGroup>
        <Icon><IoMailOutline size="1.5em" /></Icon>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </InputGroup>
      <InputGroup>
        <Icon><IoKeyOutline size="1.5em" /></Icon>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </InputGroup>
      <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
      <GoogleButton onClick={googleSignIn}>
        <IoLogoGoogle size="1.5em" />
        Sign In with Google
      </GoogleButton>
    </AuthContainer>
  );
};

// Styled-components for styling the sign-in form and its elements
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
    border-color: #007BFF;  // Highlight the input border on focus
  }
`;

const SignInButton = styled.button`
  margin-top: 20px;
  padding: 12px 25px;
  cursor: pointer;
  background-color: rgb(252, 145, 1);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(242, 127, 0);  // Darken button on hover
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
    background-color: #C62828;  // Darken button on hover
  }
`;

export default SignIn;
