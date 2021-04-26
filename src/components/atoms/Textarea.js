import styled from "styled-components";

const Textarea = styled.textarea`
  width: 90%;
  height: 120px;
  padding: 8px 13px;
  border: 1px solid #3c434a;
  border-radius: 4px;
  outline: none;
  background-color: #282c34;
  color: white;
  font-size: 1.5rem;
  line-height: 1.5;
  font-family: "Rubik", sans-serif;
  resize: none;

  :focus {
    border: 1px solid white;
  }

  @media (min-width: 1024px) {
    height: 150px;
    font-size: 1.8rem;
  }
`;

export default Textarea;
