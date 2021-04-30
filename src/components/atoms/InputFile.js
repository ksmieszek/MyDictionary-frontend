import React from "react";
import styled from "styled-components";

const StyledInputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const InputFile = React.forwardRef((props, ref) => <StyledInputFile type="file" accept="image/*" ref={ref} onChange={props.handleFileChange} />);

export default InputFile;
