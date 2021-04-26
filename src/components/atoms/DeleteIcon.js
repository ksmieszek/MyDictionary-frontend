import styled from "styled-components";

const DeleteIcon = styled.div`
  position: relative;
  height: 20px;
  padding: 5px;
  cursor: pointer;

  ::before,
  ::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 3px;
    display: block;
    border-radius: 50px;
    background-color: #d50000;
    content: "";
    transition: all 0.3s ease;
  }
  ::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  ::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

export default DeleteIcon;
