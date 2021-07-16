import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 1.6rem;
  color: red;
  position: relative;
  padding-left: 20px;

  &::before {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-53%);
    content: "⚠";
  }
`;

const ErrorMessageWrapper = ({ children }) => {
  return (
    <StyledWrapper>
      {Array.isArray(children) ? (
        children.map((item, index) => item !== undefined && <ErrorMessage key={index}>{item}</ErrorMessage>)
      ) : (
        <ErrorMessage>{children}</ErrorMessage>
      )}
    </StyledWrapper>
  );
};

export default ErrorMessageWrapper;
