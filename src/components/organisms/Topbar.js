import React from "react";
import { connect } from "react-redux";
import { logout } from "actions/index";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import routes from "routes/index";
import Logo from "components/atoms/Logo";

const StyledWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0a0722;
  color: white;
  z-index: 9999;

  @media (min-width: 1024px) {
    height: 70px;
  }
`;

const StyledNav = styled.div`
  position: relative;
  width: 100%;
  max-width: 1600px;
  padding: 10px 20px;

  @media (min-width: 1440px) {
    display: flex;
    align-items: center;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledListWrapper = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  transform: translateX(100%);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  background-color: #0a0733;
  opacity: 0;

  ${(props) =>
    props.expanded &&
    css`
      transform: translateX(0%);
      opacity: 1;
    `}

  @media (min-width: 1440px) {
    position: static;
    transform: translateX(0%);
    height: auto;
    margin-left: 50px;
    flex-direction: row;
    background-color: transparent;
    opacity: 1;
  }
`;

const StyledLogo = styled(Logo)`
  width: 40px;
  height: 40px;

  @media (min-width: 1024px) {
    width: 50px;
    height: 50px;
  }
`;

const StyledNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const StyledNavItemLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  color: white;
  font-size: 1.6rem;
  text-decoration: none;
  user-select: none;

  @media (min-width: 1024px) {
    padding: 30px 0;
    font-size: 2rem;
  }

  @media (min-width: 1440px) {
    padding: 20px 20px;
  }

  ${(props) =>
    props.last &&
    css`
      position: absolute;
      bottom: 0;

      @media (min-width: 1024px) {
        font-size: 1.8rem;
      }

      @media (min-width: 1440px) {
        right: 0;
        width: auto;
      }
    `}
`;

const StyledHamburger = styled.div`
  display: flex;
  align-items: center;
  width: 35px;
  height: 35px;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 1024px) {
    width: 40px;
    height: 40px;
  }

  @media (min-width: 1440px) {
    display: none;
  }
`;

const StyledHamburgerLine = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: white;

  ::before,
  ::after {
    position: absolute;
    width: 100%;
    height: 2px;
    display: block;
    content: "";
    background-color: white;
    transition: all 0.3s ease;

    @media (min-width: 1024px) {
      height: 3px;
    }
  }
  ::before {
    transform: translateY(-7px);

    @media (min-width: 1024px) {
      transform: translateY(-9px);
      height: 3px;
    }
  }
  ::after {
    transform: translateY(7px);

    @media (min-width: 1024px) {
      transform: translateY(9px);
      height: 3px;
    }
  }

  ${(props) =>
    props.expanded &&
    css`
      background-color: transparent;
      ::before {
        transform: translateY(0) rotate(-45deg);
      }
      ::after {
        transform: translateY(0) rotate(45deg);
      }
    `}

  @media (min-width: 1024px) {
    height: 3px;
  }
`;

class Header extends React.Component {
  state = {
    expanded: false,
  };

  handleMenu = (e) => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));

    if (this.state.expanded) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  render() {
    const { logoutAction } = this.props;
    const { expanded } = this.state;

    return (
      <StyledWrapper>
        <StyledNav>
          <StyledHeader>
            <StyledLogo />
            <StyledHamburger onClick={this.handleMenu}>
              <StyledHamburgerLine expanded={expanded} />
            </StyledHamburger>
          </StyledHeader>
          <StyledListWrapper expanded={expanded} onClick={this.handleMenu}>
            <StyledNavItem>
              <StyledNavItemLink to={routes.words}>Słówka</StyledNavItemLink>
            </StyledNavItem>
            <StyledNavItem>
              <StyledNavItemLink to={routes.texts}>Teksty</StyledNavItemLink>
            </StyledNavItem>
            <StyledNavItem>
              <StyledNavItemLink to={routes.photos}>Zdjęcia</StyledNavItemLink>
            </StyledNavItem>
            <StyledNavItem>
              <StyledNavItemLink to={routes.languages}>Języki</StyledNavItemLink>
            </StyledNavItem>
            {/* <StyledNavItem>
              <StyledNavItemLink to={routes.quizWords}>Vocabulary quiz</StyledNavItemLink>
            </StyledNavItem> */}
            <StyledNavItem>
              <StyledNavItemLink onClick={logoutAction} to={routes.login} last="true">
                Wyloguj
              </StyledNavItemLink>
            </StyledNavItem>
          </StyledListWrapper>
        </StyledNav>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Header);
