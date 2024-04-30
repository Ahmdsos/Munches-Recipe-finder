import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import Category from "./components/category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from './auth'; // Ensure this path is correct
import logo from "./logo.png";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>; // Consider a styled loading component here
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
            <Logo to="/">
              <img src={logo} alt="Munches logo" />
            </Logo>
          <NavLinks>
            {!user ? (
              <>
                <StyledLink to="/sign-in">Sign In</StyledLink>
                <StyledLink2 to="/sign-up">Sign Up</StyledLink2>
              </>
            ) : (
              <>
                <StyledButton onClick={logout}>Logout</StyledButton>
              </>
            )}
          </NavLinks>
          </Nav>
        {user && (
          <>
            <Search />
            <Category />
          </>
        )}
        <Routes>
          {user ? (
            <Route path="/" element={<Pages />} />
          ) : (
            <>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
`;


const Logo = styled(Link)`
  img {
    width: 250px; /* Adjust as needed */
    height: auto;
    object-fit: contain;
  }
`;

const NavLinks = styled.div`
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

const StyledButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  &:hover {
    background-color:rgb(186 77 57);
  }
`;

export default App;
