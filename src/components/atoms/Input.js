import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 8px 13px;
  border: 1px solid #3c434a;
  border-radius: 4px;
  outline: none;
  background-color: #282c34;
  color: white;
  font-size: 1.6rem;
  font-family: "Rubik", sans-serif;

  :focus,
  :active {
    border: 1px solid #4489ff;
  }

  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export default Input;
