import styled from "styled-components";
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Search component for entering ingredients
function Search() {
    const [input, setInput] = useState(""); // State for input value
    const navigate = useNavigate(); // Navigation hook

    // Function to handle form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        navigate('/searched/' + input); // Navigate to search results page
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            {/* Search input container */}
            <SearchContainer>
                {/* Search input field */}
                <SearchInput
                    placeholder="Enter ingredients separated by comma (,)"
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                />
                {/* Search icon */}
                <SearchButton type="submit">
                    <FaSearchIcon />
                </SearchButton>
            </SearchContainer>
            {/* Hint for entering ingredients */}
            <Hint>
                Hint: flour, sugar, butter, eggs, egg whites, baking powder, vanilla, milk, chocolate, strawberries
            </Hint>
        </FormStyle>
    );
}

// Styled components
const FormStyle = styled.form`
    margin: 0 auto;
    text-align: center;
    width: 100%;
    max-width: 600px;
    padding: 20px;
    background: #FFF; 
    border-radius: 8px;
    box-shadow: 0 19px 18px rgba(0,0,0,0.2);
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background: #f5f5f5; // Light gray for subtle contrast
    border-radius: 50px;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
`;

const SearchButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    right: 20px;
    cursor: pointer;
    color: #333; // Dark color for contrast
`;

const FaSearchIcon = styled(FaSearch)`
    font-size: 24px;
`;

const SearchInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    font-size: 16px;
    padding: 15px 20px 15px 20px;
    border-radius: 50px;
    outline: none;
    color: #333;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.5); 
        border-radius: 50px;
    }
`;

const Hint = styled.div`
    font-size: 12px;
    color: #666;
    margin-top: 10px;
    padding: 0 20px; 
    text-align: left;
`;

export default Search;
