import styled from "styled-components";
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input);
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <SearchContainer>
                <SearchInput
                    placeholder="Enter ingredients separated by comma (,)"
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                />
                <SearchIcon />
            </SearchContainer>
            <Hint>
            Hint: flour, sugar, butter, eggs, eggs whites, baking powder, vanilla, milk, chocolate, strawberries
            </Hint>
        </FormStyle>
    );
}

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

const SearchIcon = styled(FaSearch)`
    position: absolute;
    right: 20px;
    color: #333; // Dark color for contrast
    font-size: 24px;
    cursor: pointer;

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
        box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.5); // Focus ring in orange
            border-radius: 50px;
    }
`;

const Hint = styled.div`
    font-size: 12px;
    color: #666;
    margin-top: 10px;
    padding: 0 20px; // Padding for better text alignment
    text-align: left; // Left align for easier readability
`;

export default Search;
