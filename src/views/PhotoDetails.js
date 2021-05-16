import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deletePhoto } from "actions/index";
import { Redirect } from "react-router-dom";
import routes from "routes/index";
import styled from "styled-components";
import DetailsTemplate from "templates/DetailsTemplate";
import ModalTemplate from "templates/ModalTemplate";
import PhotoForm from "components/molecules/forms/PhotoForm";
import PreformattedText from "components/atoms/PreformattedText";
import Button from "components/atoms/Button";

const StydedImage = styled.img`
  max-width: 90%;
  height: auto;
  margin-top: 20px;
  user-select: none;
`;

const StydedDescription = styled(PreformattedText)`
  margin-top: 30px;
`;

const StyledParagraph = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const PhotoDetails = (props) => {
  const [state, setState] = useState({});
  const [actionName, setActionName] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.photo) {
      const { _id: id, description, photoSource, title } = props.photo;
      const decodedPhotoSource = atob(photoSource);
      setState({ id, description, photoSource: decodedPhotoSource, title });
    }
  }, []);

  const handleDelete = () => {
    const { deletePhotoAction } = props;
    const { id } = state;
    deletePhotoAction(id);
  };

  if (!props.photo) {
    return <Redirect to={routes.photos} />;
  } else {
    const { title, photoSource, description, id } = state;
    return (
      <DetailsTemplate title={title} route={routes.photos} setActionName={setActionName} setIsOpen={setIsOpen}>
        <StydedImage src={photoSource} alt="" />
        <StydedDescription>{description}</StydedDescription>

        {actionName === "edit" && (
          <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title={`Edytuj zdjęcie`}>
            <PhotoForm edit={{ photoSource, title, description, id }} />
          </ModalTemplate>
        )}
        {actionName === "delete" && (
          <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title={`Usunąć zdjęcie?`}>
            <StyledParagraph>Nie będzie możliwości cofnięcia tej akcji</StyledParagraph>
            <StyledButton delete onClick={() => handleDelete()}>
              usuń
            </StyledButton>
          </ModalTemplate>
        )}
      </DetailsTemplate>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    photo: state.photos.find((item) => item._id === ownProps.match.params.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  deletePhotoAction: (photoId) => dispatch(deletePhoto(photoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetails);
