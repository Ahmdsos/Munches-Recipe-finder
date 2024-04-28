import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";

function Recipe() {
  const { name } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Instructions'); 
  const [nutritionImage, setNutritionImage] = useState(null);
  const [ingredientImage, setIngredientImage] = useState(null);
  const [tasteImage, setTasteImage] = useState(null);
  const [equipmentImage, setEquipmentImage] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const detailData = await response.json();
        setDetails(detailData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setIsLoading(false);
      }
    };

    fetchDetails();

    return () => {
      // Cleanup function
      // You may want to add cleanup logic here if necessary
    };
  }, [name]);

  useEffect(() => {
    const fetchNutritionImage = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${name}/nutritionWidget.png?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch nutrition image');
        }
        const imageUrl = await response.url;
        setNutritionImage(imageUrl);
      } catch (error) {
        console.error('Error fetching nutrition image:', error);
      }
    };

    if (activeTab === 'Nutrition') {
      fetchNutritionImage();
    }
  }, [name, activeTab]);

  useEffect(() => {
    const fetchIngredientImage = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${name}/ingredientWidget.png?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch ingredient image');
        }
        const imageUrl = await response.url;
        setIngredientImage(imageUrl);
      } catch (error) {
        console.error('Error fetching ingredient image:', error);
      }
    };

    if (activeTab === 'Ingredients') {
      fetchIngredientImage();
    }
  }, [name, activeTab]);

  useEffect(() => {
    const fetchTasteImage = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${name}/tasteWidget.png?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch taste image');
        }
        const imageUrl = await response.url;
        setTasteImage(imageUrl);
      } catch (error) {
        console.error('Error fetching taste image:', error);
      }
    };

    if (activeTab === 'Taste') {
      fetchTasteImage();
    }
  }, [name, activeTab]);

  useEffect(() => {
    const fetchEquipmentImage = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${name}/equipmentWidget.png?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch equipment image');
        }
        const imageUrl = await response.url;
        setEquipmentImage(imageUrl);
      } catch (error) {
        console.error('Error fetching equipment image:', error);
      }
    };

    if (activeTab === 'Equipment') {
      fetchEquipmentImage();
    }
  }, [name, activeTab]);

  const handleNutritionClick = () => {
    setActiveTab('Nutrition');
  };

  const handleIngredientsClick = () => {
    setActiveTab('Ingredients');
  };

  const handleTasteClick = () => {
    setActiveTab('Taste');
  };

  const handleEquipmentClick = () => {
    setActiveTab('Equipment');
  };

  return (
    <DetailWrapper>
      {isLoading ? (
        <></>
      ) : (
        <>
          <RecipeDetails>
            <RecipeTitle>{details.title}</RecipeTitle>
            <RecipeImage src={details.image} alt={details.title} />
          </RecipeDetails>
          <Tabs>
            <TabButton 
              active={activeTab === 'Instructions'}
              onClick={() => setActiveTab('Instructions')}>
              Instructions
            </TabButton>
            <TabButton 
              active={activeTab === 'Ingredients'}
              onClick={handleIngredientsClick}>
              Ingredients
            </TabButton>
            <TabButton 
              active={activeTab === 'Nutrition'}
              onClick={handleNutritionClick}>
              Nutrition
            </TabButton>
            <TabButton 
              active={activeTab === 'Taste'}
              onClick={handleTasteClick}>
              Taste
            </TabButton>
            <TabButton 
              active={activeTab === 'Equipment'}
              onClick={handleEquipmentClick}>
              Equipment
            </TabButton>
          </Tabs>
          <TabContent>
            {activeTab === 'Instructions' && (
              <Instructions>
                <InstructionTitle>Instructions:</InstructionTitle>
                <InstructionText dangerouslySetInnerHTML={{__html:details.instructions}} />
                <br/><b><hr/></b>
                <InstructionTitle>Summary:</InstructionTitle>
                <InstructionSummary dangerouslySetInnerHTML={{__html:details.summary}} />
              </Instructions>
            )}
            {activeTab === 'Ingredients' && (
              <IngredientsWrapper>
                {ingredientImage && (
                  <IngredientsImage src={ingredientImage} alt="Ingredients" />
                )}
              </IngredientsWrapper>
            )}
            {activeTab === 'Nutrition' && nutritionImage && (
              <NutritionWrapper>
                <NutritionImage src={nutritionImage} alt="Nutrition" />
              </NutritionWrapper>
            )}
            {activeTab === 'Taste' && tasteImage && (
              <TasteWrapper>
                <TasteImage src={tasteImage} alt="Taste" />
              </TasteWrapper>
            )}
            {activeTab === 'Equipment' && equipmentImage && (
              <EquipmentWrapper>
                <EquipmentImage src={equipmentImage} alt="Equipment" />
              </EquipmentWrapper>
            )}
          </TabContent>
        </>
      )}
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const RecipeDetails = styled.div`
  text-align: center;
`;

const RecipeTitle = styled.h2`
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  color: #333;
  font-size: 2.5rem;
`;

const RecipeImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: ${props => props.active ? '#ff5722' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: 2px solid #ff5722;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s;

  &:hover {
    background-color: #ff5722;
    color: #fff;
  }
`;

const TabContent = styled.div`
  margin-top: 2rem;
`;

const Instructions = styled.div`
  padding: 1rem;
`;

const InstructionTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
`;

const InstructionText = styled.div`
  font-size: 1rem;
`;

const InstructionSummary = styled.div`
  font-weight: bold;
  padding-top: 1rem;
`;

const IngredientsWrapper = styled.div`
  text-align: center;
`;

const IngredientsImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 1rem;
  border-radius: 8px;
`;

const NutritionWrapper = styled.div`
  text-align: center;
`;

const NutritionImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 1rem;
  border-radius: 8px;
`;

const TasteWrapper = styled.div`
  text-align: center;
`;

const TasteImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 1rem;
  border-radius: 8px;
`;

const EquipmentWrapper = styled.div`
  text-align: center;
`;

const EquipmentImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 1rem;
  border-radius: 8px;
`;

export default Recipe;
