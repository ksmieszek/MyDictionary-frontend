import React from "react";
import { connect } from "react-redux";
import { deletePhoto } from "actions/index";
import { Redirect } from "react-router-dom";
import routes from "routes/index";
import styled from "styled-components";
import DetailsTemplate from "templates/DetailsTemplate";
import PreformattedText from "components/atoms/PreformattedText";

const StydedImage = styled.img`
  max-width: 90%;
  height: auto;
  margin-top: 20px;
  user-select: none;
`;

const StydedDescription = styled(PreformattedText)`
  margin-top: 30px;
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

    const { title, photoSource, description } = this.state;

    return (
      <DetailsTemplate title={title} handleDelete={this.handleDelete} route={routes.photos}>
        <StydedImage src={photoSource} alt="" />
        <StydedDescription>{description}</StydedDescription>
      </DetailsTemplate>
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
