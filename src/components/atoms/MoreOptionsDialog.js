import { useState } from "react";
import styled, { css } from "styled-components";
import MoreIcon from "assets/icons/more.svg";

const StyledIcon = styled.div`
  position: relative;
  width: 10px;
  height: 20px;
  padding: 20px 10px;
  background-image: url(${MoreIcon});
  background-repeat: no-repeat;
  background-size: 10px 20px;
  background-position: 50% 50%;
  cursor: pointer;
`;

const StyledContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 9999px;
  transform: translateY(-50%);
  border-radius: 4px;
  background-color: white;
  color: black;
  font-size: 1.6rem;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${(props) =>
    props.visible &&
    css`
      right: 35px;
      opacity: 1;
    `}
`;

const StyledArrowRight = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid white;
`;

const MoreOptionsDialog = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <StyledIcon onClick={() => setIsVisible(!isVisible)}>
      <StyledContentWrapper visible={isVisible}>
        <StyledArrowRight />
        {children}
      </StyledContentWrapper>
    </StyledIcon>
  );
};

export default MoreOptionsDialog;
