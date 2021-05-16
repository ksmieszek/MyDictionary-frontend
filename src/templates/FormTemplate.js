import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  font-size: 1.8rem;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export default Form;
