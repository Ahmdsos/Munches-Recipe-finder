import Category from "./components/category";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "./logo.png"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <Logo to={"/"}>
        <img src={logo} alt="Munches logo" />
        </Logo>
      </Nav>
      <Search />
      <Category />
     <Pages/>
     </BrowserRouter>
    </div>
  );
}
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

`
export default App;