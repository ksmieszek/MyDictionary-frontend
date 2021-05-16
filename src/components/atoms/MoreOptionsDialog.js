import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as MoreIcon } from "assets/icons/more.svg";

const fadeOut = keyframes`
  0% {
    border-color:  #606060;
  }
  100% {
     border-color: transparent;
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledMoreIcon = styled(MoreIcon)`
  position: relative;
  width: 40px;
  height: 40px;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 50%;
  fill: #c0c0c0;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    fill: #fff;
  }

  &:active {
    background-color: #606060;
  }

  ${(props) =>
    props.animateborder &&
    css`
      animation: 0.2s linear ${fadeOut};
    `}
`;

const StyledContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 9999px;
  transform: translateY(calc(-50% + 20px));
  padding: 5px;
  border-radius: 4px;
  background-color: white;
  color: black;
  font-size: 1.6rem;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${(props) =>
    props.visible &&
    css`
      right: 50px;
      opacity: 1;
    `}
`;

const StyledArrowRight = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(calc(-50% - 20px));
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid white;
`;

const MoreOptionsDialog = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateBorder, setAnimateBorder] = useState(false);

  const handleBorderAnimation = () => {
    setAnimateBorder(true);
    setTimeout(() => {
      setAnimateBorder(false);
    }, 200);
  };

  return (
    <StyledWrapper>
      <StyledMoreIcon
        onClick={() => {
          setIsVisible(!isVisible);
          handleBorderAnimation();
        }}
        animateborder={animateBorder ? 1 : 0}
      />
      <StyledContentWrapper visible={isVisible}>
        <StyledArrowRight />
        {children}
      </StyledContentWrapper>
    </StyledWrapper>
  );
};

export default MoreOptionsDialog;
