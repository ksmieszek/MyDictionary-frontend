import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
      <StydedWrapper onClick={this.showPhotoDetails}>
        <h4>{title}</h4>
        <img src={decodedPhotoSource} alt="" />
      </StydedWrapper>
    );
  }
}

export default PhotoPill;
