import React from "react";
import styled from "styled-components";
import PhotoPill from "components/molecules/pills/PhotoPill";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PhotosList = (props) => {
  return (
    <StydedWrapper>
      {props.photos.map(({ _id: id, photoSource, title }) => (
        <PhotoPill id={id} photoSource={photoSource} title={title} key={id} />
      ))}
    </StydedWrapper>
  );
};

export default PhotosList;
