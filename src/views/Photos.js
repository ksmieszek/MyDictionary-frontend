import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "actions/index";
import UserPageTemplate from "templates/UserPageTemplate";
import styled from "styled-components";
import AddPhotoForm from "components/molecules/forms/AddPhotoForm";
import PhotosList from "components/molecules/lists/PhotosList";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

class Photos extends Component {
  componentDidMount() {
    const { fetchPhotosAction, photos } = this.props;
    if (photos.length === 0) fetchPhotosAction();
  }

  render() {
    const { photos } = this.props;

    return (
      <UserPageTemplate>
        <StydedWrapper>
          <h3>Add Photo</h3>
          <AddPhotoForm />
          <h3>All Photos</h3>
          <PhotosList photos={photos} />
        </StydedWrapper>
      </UserPageTemplate>
    );
  }
}

const mapStateToProps = ({ photos }) => {
  return { photos };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPhotosAction: () => dispatch(fetchPhotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
