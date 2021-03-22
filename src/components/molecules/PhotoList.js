import React from "react";
import PhotoPill from "../molecules/PhotoPill";
import styled from "styled-components";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PhotoList = (props) => {
  return (
    <StydedWrapper>
      {props.photos.map(({ _id: id, photoSource, title }) => (
        <PhotoPill id={id} photoSource={photoSource} title={title} key={id} />
      ))}
    </StydedWrapper>
  );
};

export default PhotoList;
