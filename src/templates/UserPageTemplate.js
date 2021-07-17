import React from "react";
import Topbar from "components/organisms/Topbar";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledContent = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 60px);
  margin-top: 60px;
  overflow-y: scroll;

  @media (min-width: 1024px) {
    height: calc(100vh - 70px);
    margin-top: 70px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;

    @media (min-width: 1440px) {
      margin-top: 80px;
      margin-bottom: 50px;
    }
  }
`;

const UserPageTemplate = ({ children }) => (
  <StyledWrapper>
    <Topbar />
    <StyledContent>{children}</StyledContent>
  </StyledWrapper>
);

export default UserPageTemplate;
