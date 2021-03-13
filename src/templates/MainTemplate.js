import React from "react";
import GlobalStyle from "../theme/GlobalStyle";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
`;

const MainTemplate = ({ children }) => (
  <>
    <GlobalStyle />
    <StyledWrapper>{children}</StyledWrapper>
  </>
);

export default MainTemplate;
