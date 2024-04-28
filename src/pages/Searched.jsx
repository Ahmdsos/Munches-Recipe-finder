import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        try {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${name}&ignorePantry=true&number=60&ranking=2&number=100`
            );
            if (!data.ok) {
                throw new Error('Failed to fetch data from API');
            }
            const recipes = await data.json();
            setSearchedRecipes(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        if (params.search) {
            getSearched(params.search);
        }
    }, [params.search]);

    const categorizedRecipes = {
        canMake: [],
        oneOrTwoMissing: [],
        moreThanTwoMissing: []
    };

    searchedRecipes.forEach(item => {
        if (item.missedIngredientCount === 0) {
            categorizedRecipes.canMake.push(item);
        } else if (item.missedIngredientCount > 0 && item.missedIngredientCount <= 2) {
            categorizedRecipes.oneOrTwoMissing.push(item);
        } else {
            categorizedRecipes.moreThanTwoMissing.push(item);
        }
    });

    return (
        <Wrapper>
            {categorizedRecipes.canMake.length > 0 && (
                <Section>
                    <Heading>You can make this with your ingredients:</Heading>
                    <Grid>
                        {categorizedRecipes.canMake.map(item => (
                            <Card key={item.id}>
                                <CardLink to={`/recipe/${item.id}`}>
                                    <RecipeImage src={item.image} alt={item.title} />
                                    <Title>{item.title}</Title>
                                </CardLink>
                            </Card>
                        ))}
                    </Grid>
                </Section>
            )}

            {categorizedRecipes.oneOrTwoMissing.length > 0 && (
                <Section>
                    <Heading>You can make this but you missed these<Red>ingredients:</Red></Heading>
                    <Grid>
                        {categorizedRecipes.oneOrTwoMissing.map(item => (
                            <Card key={item.id}>
                                <CardLink to={`/recipe/${item.id}`}>
                                    <RecipeImage src={item.image} alt={item.title} />
                                    <Title>{item.title}</Title>
                                    <IngredientList>
                                        {item.missedIngredients.map((ing, index) => (
                                            <span key={index}>{ing.name}{index < item.missedIngredients.length - 1 ? ', ' : ''}</span>
                                        ))}
                                    </IngredientList>
                                </CardLink>
                            </Card>
                        ))}
                    </Grid>
                </Section>
            )}

            {categorizedRecipes.moreThanTwoMissing.length > 0 && (
                <Section>
                    <Heading>You need more than 2 ingredients to make this recipe:</Heading>
                    <Grid>
                        {categorizedRecipes.moreThanTwoMissing.map(item => (
                            <Card key={item.id}>
                                <CardLink to={`/recipe/${item.id}`}>
                                    <RecipeImage src={item.image} alt={item.title} />
                                    <Title>{item.title}</Title>
                                </CardLink>
                            </Card>
                        ))}
                    </Grid>
                </Section>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;
const Red = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: red;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Title = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  text-align: center;
  margin: 10px 0;
  text-decoration: none;
`;

const IngredientList = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
  padding: 0.5rem;
`;

export default Searched;
