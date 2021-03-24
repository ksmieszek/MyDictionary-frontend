import React from "react";
import { connect } from "react-redux";
import { deletePhoto } from "actions/index";
import { Redirect } from "react-router-dom";
import UserPageTemplate from "templates/UserPageTemplate";
import styled from "styled-components";
import routes from "routes/index";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

class PhotoDetails extends React.Component {
  state = {
    id: "",
    description: "",
    photoSource: "",
    title: "",
  };

  componentDidMount() {
    if (this.props.photo) {
      const { _id: id, description, photoSource, title } = this.props.photo;
      const decodedPhotoSource = atob(photoSource);
      this.setState({ id, description, photoSource: decodedPhotoSource, title });
    }
  }

  handleDelete = () => {
    const { deletePhotoAction } = this.props;
    const { id } = this.state;
    deletePhotoAction(id);
  };

  render() {
    if (!this.props.photo) {
      return <Redirect to={routes.photos} />;
    }

    const { description, photoSource, title } = this.state;

    return (
      <UserPageTemplate>
        <StydedWrapper>
          Photo details
          <button onClick={this.handleDelete}>DELETE</button>
          <h4>{title}</h4>
          <img src={photoSource} alt="" />
          <pre>{description}</pre>
        </StydedWrapper>
      </UserPageTemplate>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    photo: state.photos.find((item) => item._id === ownProps.match.params.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  deletePhotoAction: (photoId) => dispatch(deletePhoto(photoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetails);
