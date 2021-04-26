import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "actions/index";
import UserPageTemplate from "templates/UserPageTemplate";
import AddPhotoForm from "components/molecules/forms/AddPhotoForm";
import PhotosList from "components/molecules/lists/PhotosList";
import Button from "components/atoms/Button";
import ModalTemplate from "templates/ModalTemplate";

const Photos = ({ photos, fetchPhotosAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (photos.length === 0) fetchPhotosAction();
  }, []);

  return (
    <UserPageTemplate>
      <div>
        <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title="Nowe zdjęcie">
          <AddPhotoForm />
        </ModalTemplate>
        <Button add onClick={() => setIsOpen(true)} pulse={photos.length === 0}>
          Dodaj zdjęcie
        </Button>
        <PhotosList photos={photos} />
      </div>
    </UserPageTemplate>
  );
};

const mapStateToProps = ({ photos }) => {
  return { photos };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPhotosAction: () => dispatch(fetchPhotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
