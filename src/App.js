import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Category from "./components/category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from "./logo.png";

function App() {
  const [user, loading] = useAuthState(auth); // Check if user is authenticated

  if (loading) {
    return <p>Loading...</p>; // Show loading message while authentication state is loading
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          {/* Navigation bar */}
          <Logo to="/">
            <img src={logo} alt="Munches logo" />
          </Logo>
          {/* Show logout button if user is signed in, otherwise show sign-in/sign-up buttons */}
          {user ? (
            <LogoutButton onClick={() => auth.signOut()}>Logout</LogoutButton>
          ) : (
            <AuthButtons>
              <StyledLink to="/sign-in">Sign In</StyledLink>
              <StyledLink2 to="/sign-up">Sign Up</StyledLink2>
            </AuthButtons>
          )}
        </Nav>
        {user ? (
          // Render the app if the user is signed in
          <>
            <Search />
            <Category />
            <Pages />
          </>
        ) : (
          // Redirect to sign-in page if not signed in
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<SignIn />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

// Styled components for navigation
const Logo = styled(Link)`
  width: 700px;
  height: 250px;
  img {
    width: 100%;
    height: 120%;
    object-fit: contain;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e55347;
  }
`;

const AuthButtons = styled.div`
display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color:rgb(252 145 1);
  color: white;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(242, 127, 0);
  }
`;

const StyledLink2 = styled(Link)`
  margin-left: 10px;
  text-decoration: none;
  background-color: rgb(23 205 89);
  color: white;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(17, 174, 75);
  }
`;

export default App;
