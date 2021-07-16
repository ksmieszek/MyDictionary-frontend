import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: none;
`;

const InputFile = React.forwardRef((props, ref) => (
  <>
    <StyledLabel htmlFor="file-upload"></StyledLabel>
    <StyledInput {...props} ref={ref} id="file-upload" type="file" accept="image/*" />
  </>
));

export default InputFile;
