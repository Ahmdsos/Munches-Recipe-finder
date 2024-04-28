import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <Wrapper>
      <Heading>Popular Recipes</Heading>
      <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: 'free',
        gap: '2rem',
        breakpoints: {
          768: {
            perPage: 2
          },
          576: {
            perPage: 1
          }
        }
      }}>
        {popular.map(recipe => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={'/recipe/' + recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <Overlay>
                  <Title>{recipe.title}</Title>
                </Overlay>
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
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

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
  }

  &:hover img {
    transform: scale(1.1);
  }
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
