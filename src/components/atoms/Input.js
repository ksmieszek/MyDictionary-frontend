import styled from "styled-components";

const Input = styled.input`
  background-color: #282c34;
  outline: none;
  border: 1px solid white;
  padding: 7px 10px;
  font-family: "Rubik", sans-serif;
  color: white;
  font-size: 16px;
  border-radius: 5px;

  :focus,
  :active {
    border: 1px solid rgb(47, 47, 251);
  }
`;

export default Input;
