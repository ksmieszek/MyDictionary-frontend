import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin: 30px 40px 100px 40px;
`;
const StyledListWrapper = styled.ul`
  display: flex;
  margin-left: 90px;
`;

const StyledLogo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
`;

const StyledNav = styled.div`
  display: flex;
`;

const StyledNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin-right: 10px;
`;

const StyledNavItemLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 0.8em;
  padding: 10px 15px;
`;

const Header = () => (
  <StyledWrapper>
    <StyledNav>
      <StyledLogo to="/">YOUr dictionary</StyledLogo>
      <StyledListWrapper>
        <StyledNavItem>
          <StyledNavItemLink to="/words">Words</StyledNavItemLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavItemLink to="/languages">Languages</StyledNavItemLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavItemLink to="/quiz/words">Guess word</StyledNavItemLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavItemLink to="/photos">Photos</StyledNavItemLink>
        </StyledNavItem>
      </StyledListWrapper>
    </StyledNav>
  </StyledWrapper>
);

export default Header;
