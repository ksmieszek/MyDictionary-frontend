import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthorizationTemplate = ({ children }) => (
  <StyledWrapper>
    <StyledFormWrapper>{children}</StyledFormWrapper>
  </StyledWrapper>
);

export default AuthorizationTemplate;
