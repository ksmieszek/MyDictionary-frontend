import React from "react";
import ListGridTemplate from "templates/ListGridTemplate";
import PhotoPill from "components/molecules/pills/PhotoPill";

const PhotosList = ({ photos }) => {
  return (
    <ListGridTemplate>
      {photos.map(({ _id: id, photoSource, title }) => <PhotoPill id={id} photoSource={photoSource} title={title} key={id} />).reverse()}
    </ListGridTemplate>
  );
};

export default PhotosList;
