import React from "react";
import Topbar from "components/organisms/Topbar";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 20px;

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: 1440px) {
    margin-top: 150px;
  }
`;

const UserPageTemplate = ({ children }) => (
  <StyledWrapper>
    <Topbar />
    {children}
  </StyledWrapper>
);

export default UserPageTemplate;
