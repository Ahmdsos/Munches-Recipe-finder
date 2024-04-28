import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();

  const getCuisine = async (name) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=100`
      );
      const recipes = await response.json();
      setCuisine(recipes.results);
    } catch (error) {
      console.error('Error fetching cuisine:', error);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Wrapper>
      <Heading>{params.type} Cuisine</Heading>
      <Grid>
        {cuisine.map((item) => (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <RecipeImage src={item.image} alt={item.title} />
              <Overlay>
                <Title>{item.title}</Title>
              </Overlay>
            </Link>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Heading = styled.h3`
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Set to display 3 cards in a row */
  grid-gap: 2rem;
  padding: 1rem;

  @media (max-width: 1024px) { /* Adjust for medium-sized screens */
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) { /* Adjust for small screens */
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

export default Cuisine;
