import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config'; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMailOutline, IoKeyOutline, IoLogoGoogle } from 'react-icons/io5';

const SignIn = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for managing error messages
  const [loading, setLoading] = useState(false); // State to handle loading during API call
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true); // Start loading before API call
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Navigate to home page after successful sign-in
    } catch (error) {
      setError('Email or password not correct'); // Set error message on failure
      setLoading(false); // Stop loading when API call fails
    }
  };

  const googleSignIn = async () => {
    setLoading(true); // Start loading before API call
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Navigate to home page after successful Google sign-in
    } catch (error) {
      setError('Email or password not correct'); // Set error message on failure
      setLoading(false); // Stop loading when API call fails
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
      <SignInButton onClick={handleSignIn} disabled={loading}>Sign In</SignInButton>
      <GoogleButton onClick={googleSignIn} disabled={loading}>
        <IoLogoGoogle size="1.5em" />
        Sign In with Google
      </GoogleButton>
    </AuthContainer>
  );
};

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
    background-color: rgb(242, 127, 0);
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

export default SignIn;
