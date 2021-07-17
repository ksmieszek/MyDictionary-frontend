import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.figure`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 10px 30px -10px hsl(0deg 0% 0% / 50%);
  overflow: hidden;

  @media (min-width: 1440px) {
    margin: 0;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const StyledTitle = styled.figcaption`
  width: 100%;
  padding: 13px 15px;
  background-color: #17126a;
  /* background-color: #1a237e; */
  text-align: center;
  font-size: 1.8rem;
  font-weight: 400;
  word-wrap: break-word;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 600px;
  max-height: 400px;
  user-select: none;
`;

class PhotoPill extends React.Component {
  state = {
    redirect: false,
  };

  showPhotoDetails = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { id, photoSource, title } = this.props;
    const decodedPhotoSource = atob(photoSource);
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`photo/details/${id}`} />;
    }

    return (
      <StyledWrapper onClick={this.showPhotoDetails}>
        <StyledTitle>{title}</StyledTitle>
        <StyledImage src={decodedPhotoSource} alt="" />
      </StyledWrapper>
    );
  }
}

export default PhotoPill;
