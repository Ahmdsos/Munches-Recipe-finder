import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from '../firebase-config'; 
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importing heart icons from react-icons

function Recipe() {
  const { name } = useParams(); // Extract recipe name from the URL parameters
  const [details, setDetails] = useState({}); // State to store the detailed info of recipe
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [activeTab, setActiveTab] = useState('Instructions'); // State to manage which tab is active
  const [nutritionImage, setNutritionImage] = useState(null); // State to store the URL of the nutrition image
  const [ingredientImage, setIngredientImage] = useState(null); // State to store the URL of the ingredient image
  const [tasteImage, setTasteImage] = useState(null); // State to store the URL of the taste image
  const [equipmentImage, setEquipmentImage] = useState(null); // State to store the URL of the equipment image
  const [isFavorited, setIsFavorited] = useState(false); // State to track if the recipe is favorited

  useEffect(() => {
    // Function to fetch recipe details
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await response.json();
        setDetails(detailData);
        setIsLoading(false);
        checkFavoriteStatus(detailData.id);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  useEffect(() => {
    // Fetch image for the active tab
    const fetchImage = async (widgetType, setImage) => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${details.id}/${widgetType}?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const imageUrl = await response.url;
        setImage(imageUrl);
      } catch (error) {
        console.error(`Error fetching ${widgetType}:`, error);
      }
    };

    if (details.id && activeTab) {
      if (activeTab === 'Nutrition') {
        fetchImage('nutritionWidget.png', setNutritionImage);
      } else if (activeTab === 'Ingredients') {
        fetchImage('ingredientWidget.png', setIngredientImage);
      } else if (activeTab === 'Taste') {
        fetchImage('tasteWidget.png', setTasteImage);
      } else if (activeTab === 'Equipment') {
        fetchImage('equipmentWidget.png', setEquipmentImage);
      }
    }
  }, [details.id, activeTab]);

  const checkFavoriteStatus = async (recipeId) => {
    if (auth.currentUser) {
      const docRef = doc(db, "favorites", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().recipeIds.includes(recipeId)) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  };

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      alert("Please log in to use the favorite feature.");
      return;
    }
    const docRef = doc(db, "favorites", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let favoritesArray = docSnap.data().recipeIds;
      if (favoritesArray.includes(details.id)) {
        await updateDoc(docRef, {
          recipeIds: arrayRemove(details.id)
        });
        setIsFavorited(false);
      } else {
        await updateDoc(docRef, {
          recipeIds: arrayUnion(details.id)
        });
        setIsFavorited(true);
      }
    } else {
      await setDoc(docRef, {
        recipeIds: [details.id]
      });
      setIsFavorited(true);
    }
  };

  return (
    <DetailWrapper>
      {isLoading ? (
        <p>Recipe Loading...</p>
      ) : (
        <>
          <RecipeDetails>
            <RecipeTitle>{details.title}</RecipeTitle>
            <RecipeImage src={details.image} alt={details.title} />
            <FavoriteButton onClick={toggleFavorite} active={isFavorited}>
              {isFavorited ? <FaHeart  />  : <FaRegHeart />}
              
            </FavoriteButton>
          </RecipeDetails>
          <Tabs>
            <TabButton active={activeTab === 'Instructions'} onClick={() => setActiveTab('Instructions')}>Instructions</TabButton>
            <TabButton active={activeTab === 'Ingredients'} onClick={() => setActiveTab('Ingredients')}>Ingredients</TabButton>
            <TabButton active={activeTab === 'Nutrition'} onClick={() => setActiveTab('Nutrition')}>Nutrition</TabButton>
            <TabButton active={activeTab === 'Taste'} onClick={() => setActiveTab('Taste')}>Taste</TabButton>
            <TabButton active={activeTab === 'Equipment'} onClick={() => setActiveTab('Equipment')}>Equipment</TabButton>
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
            {activeTab === 'Ingredients' && <IngredientsWrapper><IngredientsImage src={ingredientImage} alt="Ingredients" /></IngredientsWrapper>}
            {activeTab === 'Nutrition' && <NutritionWrapper><NutritionImage src={nutritionImage} alt="Nutrition" /></NutritionWrapper>}
            {activeTab === 'Taste' && <TasteWrapper><TasteImage src={tasteImage} alt="Taste" /></TasteWrapper>}
            {activeTab === 'Equipment' && <EquipmentWrapper><EquipmentImage src={equipmentImage} alt="Equipment" /></EquipmentWrapper>}
          </TabContent>
        </>
      )}
    </DetailWrapper>
  );
}

// Styled components for UI
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

const FavoriteButton = styled.button`
  display: block;
  margin: 10px auto 0;
  padding: 8px 16px;
  background-color: ${props => props.active ? '#FF6347' : '#ccc'};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;

  &:hover {
    background-color: ${props => props.active ? '#FF4500' : '#FF6347'};
  }
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
  max-width: 500px;
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
