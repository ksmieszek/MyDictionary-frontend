import React from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Logo from "components/atoms/Logo";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const StyledLogo = styled(Logo)`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

export const StyledHeading = styled.h2`
  margin-bottom: 30px;
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
`;

export const StyledFieldWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  margin-top: 10px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  max-width: 320px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const AuthorizationTemplate = ({ children }) => (
  <StyledWrapper>
    <StyledLogo />
    {children}
  </StyledWrapper>
);

export default AuthorizationTemplate;
