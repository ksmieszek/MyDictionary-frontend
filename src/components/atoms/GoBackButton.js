import { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import BackArrowIcon from "assets/icons/backArrow.svg";

const StyledGoBackButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 0px;
  font-size: 1.4rem;
  color: #ddd;
  cursor: pointer;
  user-select: none;
`;

const StyledBackArrowIcon = styled.div`
  width: 30px;
  height: 13px;
  background-image: url(${BackArrowIcon});
  background-repeat: no-repeat;
  background-size: 30px 13px;
`;

const GoBackButton = ({ route }) => {
  const [isRedirect, setIsRedirect] = useState(false);

  return isRedirect ? (
    <Redirect to={route} />
  ) : (
    <StyledGoBackButton onClick={() => setIsRedirect(true)}>
      <StyledBackArrowIcon /> powrót
    </StyledGoBackButton>
  );
};

export default GoBackButton;
