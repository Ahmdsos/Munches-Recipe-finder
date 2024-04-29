import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Category from "./components/category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import { Link } from "react-router-dom";
import logo from "./logo.png";

function App() {
  return (
    <div className="App">
      {/* BrowserRouter for handling routing */}
      <BrowserRouter>
        {/* Navigation bar */}
        <Nav>
          {/* Logo linking to the home page */}
          <Logo to={"/"}>
            <img src={logo} alt="Munches logo" />
          </Logo>
        </Nav>
        {/* Search component */}
        <Search />
        {/* Category component for displaying cuisine categories */}
        <Category />
        {/* Pages component for routing */}
        <Pages />
      </BrowserRouter>
    </div>
  );
}

// Styled components for App component
const Logo = styled(Link)`
  width: 60cm;
  height: 6cm;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default App;
