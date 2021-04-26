import React from "react";
import GlobalStyle from "theme/GlobalStyle";
import LoadingScreen from "components/atoms/LoadingScreen";
import styled from "styled-components";

const StyledWrapper = styled.div`
  /* background-color: #0a0722; */
  /* background-color: #f5f5f5; */
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #0a0733;
`;

const MainTemplate = ({ children }) => (
  <>
    <GlobalStyle />
    <StyledWrapper>{children}</StyledWrapper>
    <LoadingScreen />
  </>
);

export default MainTemplate;
