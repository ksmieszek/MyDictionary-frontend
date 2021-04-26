import styled, { css, keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(68, 137, 255, 1);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(68, 137, 255, 0);
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4489ff;
  color: white;
  font-size: 1.6rem;
  font-family: "Rubik", sans-serif;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;

  :focus,
  :active,
  :hover {
    background-color: #2267dd;
  }

  ${(props) =>
    props.save &&
    css`
      margin-top: 35px;
      padding: 8px 20px;
      border-radius: 50px;
      background-color: #4caf50;

      :focus,
      :active,
      :hover {
        background-color: #43a047;
      }
    `};

  ${(props) =>
    props.add &&
    css`
      padding: 10px 20px;
      border-radius: 50px;

      @media (min-width: 1024px) {
        font-size: 1.8rem;
      }
    `};

  ${(props) =>
    props.delete &&
    css`
      padding: 10px 20px;
      border-radius: 50px;
      background-color: red;

      :focus,
      :active,
      :hover {
        background-color: #d50000;
      }

      @media (min-width: 1024px) {
        font-size: 1.8rem;
      }
    `};

  ${(props) =>
    props.pulse &&
    css`
      animation: ${pulse} 1s infinite 3s;
    `};

  ${(props) =>
    props.info &&
    css`
      margin-top: 40px;
      }
    `};
`;

export default Button;
