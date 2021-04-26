import styled, { keyframes } from "styled-components";

const AnimateOpacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
  padding: 30px;
  padding-bottom: 20px;
  border-radius: 4px;
  background-color: #17126a;
  text-align: center;
  font-size: 1.8rem;
  line-height: 1.5;
  opacity: 0;
  animation: 0.2s linear 3s forwards ${AnimateOpacity};
`;
export default StyledInfo;
