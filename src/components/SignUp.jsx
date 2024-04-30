import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMailOutline, IoKeyOutline, IoLogoGoogle } from 'react-icons/io5';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

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
      <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
      <GoogleButton onClick={googleSignIn}>
        <IoLogoGoogle size="1.5em" />
        Sign Up with Google
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

export default SignUp;
