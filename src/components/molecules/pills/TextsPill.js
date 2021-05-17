import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import articleIcon from "assets/icons/text.svg";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: #17126a;
  /* background-color: #1a237e; */
  border-radius: 50px;
  color: white;
  cursor: pointer;
  box-shadow: 0 10px 30px -10px hsl(0deg 0% 0% / 50%);

  @media (min-width: 1440px) {
    justify-self: center;
    height: 100px;
    width: 100%;
    max-width: 480px;
    border-radius: 20px;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const IconContainer = styled.div`
  min-width: 50px;
  height: 50px;
  margin-right: 20px;
  background-color: #0a0733;
  background-image: url(${articleIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 20px 30px;
  border-radius: 50%;

  @media (min-width: 1024px) {
    min-width: 70px;
    height: 70px;
    background-size: 30px 30px;
  }
`;

const StyledTitle = styled.h2`
  max-width: 65%;
  font-size: 1.8rem;
  font-weight: 400;
  word-wrap: break-word;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

class TextsPill extends React.Component {
  state = {
    redirect: false,
  };

  showTextsDetails = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { id, title } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`text/details/${id}`} />;
    }

    return (
      <StyledWrapper onClick={this.showTextsDetails}>
        <IconContainer />
        <StyledTitle>{title}</StyledTitle>
      </StyledWrapper>
    );
  }
}

export default TextsPill;
