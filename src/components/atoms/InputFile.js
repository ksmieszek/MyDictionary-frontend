import React from "react";
import styled from "styled-components";

const StyledInputFile = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const InputFile = (props) => <StyledInputFile type="file" accept="image/*" onChange={(e) => props.handleFileChange(e)}></StyledInputFile>;

export default InputFile;
