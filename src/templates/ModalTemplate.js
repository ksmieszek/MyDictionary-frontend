import ReactDom from "react-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  animation: 0.1s ${fadeIn} linear;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  max-height: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: #17126a;
  /* background-color: #1a237e; */
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
    background: transparent;
  }

  @media (min-width: 1440px) {
    top: 20%;
    transform: translate(-50%, 0);
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
`;

const StyledParagraph = styled.p`
  font-size: 1.8rem;
`;

const StyledCloseIcon = styled.div`
  position: relative;
  align-self: flex-start;
  padding: 10px;
  cursor: pointer;

  ::before,
  ::after {
    position: absolute;
    top: 50%;
    left: 3px;
    width: 15px;
    height: 2px;
    display: block;
    border-radius: 25px;
    background-color: #ccc;
    content: "";
  }

  ::before {
    transform: rotate(-45deg);
  }
  ::after {
    transform: rotate(45deg);
  }
`;

const ModalTemplate = ({ children, open, close, title }) => {
  if (!open) {
    document.body.style.overflow = "unset";
    return null;
  }
  document.body.style.overflow = "hidden";

  return ReactDom.createPortal(
    <StyledOverlay id="overlay" onSubmit={close} onMouseDown={(e) => e.target.id === "overlay" && close()}>
      <StyledModal>
        <StyledHeader>
          <StyledParagraph>{title}</StyledParagraph>
          <StyledCloseIcon onClick={close} />
        </StyledHeader>
        {children}
      </StyledModal>
    </StyledOverlay>,
    document.getElementById("modal")
  );
};

export default ModalTemplate;
