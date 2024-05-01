import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaPizzaSlice, FaHamburger, FaHome , FaHeart } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";

function Category() {
  // Function to handle changes in category selection
  const handleCategoryChange = (e) => {
    // Extract the value of the selected category from the event object
    const selectedCategory = e.target.value;

    // Check if a category has been selected
    if (selectedCategory) {
      // Redirect the browser to the specific category page using window.location.href
      window.location.href = `/cuisine/${selectedCategory}`;
    }
  };
  return (
    <>
      <List>
      <SLinkHome to={"/"} activeclassname="active">
          <FaHome />
          <h4>Home</h4>
        </SLinkHome>
        <SLink to={"/cuisine/American"} activeclassname="active">
          <FaHamburger />
          <h4>American</h4>
        </SLink>
        <SLink to={"/cuisine/italian"} activeclassname="active">
          <FaPizzaSlice />
          <h4>Italian</h4>
        </SLink>

        <SLink to={"/cuisine/Japanese"} activeclassname="active">
          <GiChopsticks />
          <h4>Japanese</h4>
        </SLink>
        <SLink to={"/cuisine/thai"} activeclassname="active">
          <GiNoodles />
          <h4>Thai</h4>
        </SLink>
        <SLinkfav to={"/favorites"} activeclassname="active"> 
          <FaHeart />
          <h4>Favorites</h4>
        </SLinkfav>
      </List>
      {/* Select dropdown for other cuisines */}
      <List>
        <CategorySelect onChange={handleCategoryChange}>
          <option value="">Another Cuisines</option>
          {/* List of available cuisines */}
          <option value="African" >African</option>
          <option value="Asian">Asian</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Cajun">Cajun</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Chinese">Chinese</option>
          <option value="Eastern European">Eastern European</option>
          <option value="European">European</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Greek">Greek</option>
          <option value="Indian">Indian</option>
          <option value="Irish">Irish</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="Latin American">Latin American</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Nordic">Nordic</option>
          <option value="Southern">Southern</option>
          <option value="Spanish">Spanish</option>
          <option value="Thai">Thai</option>
          <option value="Vietnamese">Vietnamese</option>
        </CategorySelect>
      </List>
    </>
  );
}

// Styled components for Category component
const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  flex-wrap: wrap;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0.5rem;
  text-decoration: none;
  background: linear-gradient(145deg, #757575, #bdbdbd);
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h4 {
    color: #fff;
    font-size: 0.85rem;
    margin-top: 4px;
    font-weight: 500;
  }

  svg {
    color: #fff;
    font-size: 24px;
    margin-bottom: 4px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &.active {
    background: linear-gradient(145deg, rgb(246 178 69), #db7c25);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  }
`;

const SLinkHome = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0.5rem;
  text-decoration: none;
  background: linear-gradient(145deg, #757575, #bdbdbd);
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h4 {
    color: #fff;
    font-size: 0.85rem;
    margin-top: 4px;
    font-weight: 500;
  }

  svg {
    color: #fff;
    font-size: 24px;
    margin-bottom: 4px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &.active {
    background: linear-gradient(145deg, rgb(45 208 107), rgb(7 121 79));
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  }
`;
const SLinkfav = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0.5rem;
  text-decoration: none;
  background: linear-gradient(145deg, #757575, #bdbdbd);
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h4 {
    color: #fff;
    font-size: 0.85rem;
    margin-top: 4px;
    font-weight: 500;
  }

  svg {
    color: #fff;
    font-size: 24px;
    margin-bottom: 4px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &.active {
    background: linear-gradient(145deg, rgb(233 122 122), rgb(228 43 43));
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  }
`;
const CategorySelect = styled.select`
  padding: 8px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export default Category;
