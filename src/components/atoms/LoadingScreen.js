import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${(props) => (props.loadingElements === 0 ? "none" : "block")};
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const RotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoadingIndicator = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 80px;
  height: 80px;

  ::after {
    width: 64px;
    height: 64px;
    margin: 8px;
    display: block;
    border: 6px solid #fff;
    border-radius: 50%;
    border-color: #fff transparent #fff transparent;
    content: " ";
    animation: ${RotateAnimation} 1.2s linear infinite;
  }
`;

const LoadingScreen = ({ loadingElements }) => {
  return (
    <StyledWrapper loadingElements={loadingElements}>
      <StyledLoadingIndicator />
    </StyledWrapper>
  );
};

const mapStateToProps = ({ loadingElements }) => {
  return { loadingElements };
};

export default connect(mapStateToProps)(LoadingScreen);
