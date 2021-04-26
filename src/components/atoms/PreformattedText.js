import styled from "styled-components";

const PreformattedText = styled.pre`
  width: 80%;
  margin-top: 10px;
  padding: 20px;
  background-color: #0a0722;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: "Rubik", sans-serif;
  font-size: 1.6rem;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export default PreformattedText;
