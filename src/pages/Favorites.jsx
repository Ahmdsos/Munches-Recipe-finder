import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db, auth } from '../firebase-config'; // Adjust the import path as needed
import { doc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom'; // Import Link for navigation

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]); // To store favorite recipes' details
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "favorites", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const recipeIds = docSnap.data().recipeIds;
          fetchRecipeDetails(recipeIds);
        } else {
          console.log("No favorites document found!");
          setIsLoading(false); // Set loading to false if no favorites found
        }
      } else {
        console.log("User not logged in");
        setIsLoading(false); // Set loading to false if user not logged in
      }
    };

    fetchFavorites();
  }, []);

  // Function to fetch recipe details based on IDs
  const fetchRecipeDetails = async (recipeIds) => {
    try {
      const recipes = await Promise.all(
        recipeIds.map(async id => {
          const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
          const recipeData = await response.json();
          return recipeData; // Return the entire recipe data
        })
      );
      setFavorites(recipes);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching details
    }
  };

  return (
    <FavoritesWrapper>
      {isLoading ? (
        <p>Loading favorites...</p>
      ) : (
        <div>
          <Heading>Your Favorite Recipes</Heading>
          <Grid>
            {favorites.length > 0 ? (
              favorites.map((recipe) => (
                <Card key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`}> {/* Link to individual recipe */}
                    <RecipeImage src={recipe.image} alt={recipe.title} /> {/* Display image */}
                    <Overlay>
                      <Title>{recipe.title}</Title> {/* Display title */}
                    </Overlay>
                  </Link>
                </Card>
              ))
            ) : (
              <p>No favorites added yet.</p>
            )}
          </Grid>
        </div>
      )}
    </FavoritesWrapper>
  );
};

// Styled components (unchanged)
const FavoritesWrapper = styled.div`
  margin: 4rem 0rem;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
`;

const Title = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
`;

export default FavoritesPage;
