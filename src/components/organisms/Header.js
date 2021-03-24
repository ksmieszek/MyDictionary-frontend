import React from "react";
import { connect } from "react-redux";
import { logout } from "actions/index";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "routes/index";

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

const StyledNavLogoutButton = styled(Link)`
  align-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 0.8em;
  padding: 10px 15px;
  border: 1px solid white;
  border-radius: 5px;
`;

const Header = ({ logoutAction }) => (
  <StyledWrapper>
    <StyledNav>
      <StyledLogo to={routes.home}>YOUr dictionary</StyledLogo>
      <StyledListWrapper>
        <StyledNavItem>
          <StyledNavItemLink to={routes.words}>Words</StyledNavItemLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavItemLink to={routes.languages}>Languages</StyledNavItemLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavItemLink to={routes.quizWords}>Guess word</StyledNavItemLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavItemLink to={routes.photos}>Photos</StyledNavItemLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavItemLink to={routes.texts}>Texts</StyledNavItemLink>
        </StyledNavItem>
      </StyledListWrapper>
      <StyledNavLogoutButton onClick={logoutAction} to={routes.login}>
        Wyloguj
      </StyledNavLogoutButton>
    </StyledNav>
  </StyledWrapper>
);

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Header);
