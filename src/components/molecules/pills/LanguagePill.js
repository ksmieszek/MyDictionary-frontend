import React, { useState } from "react";
import styled, { css } from "styled-components";
import ModalTemplate from "templates/ModalTemplate";
import Button from "components/atoms/Button";
import LanguageForm from "components/molecules/forms/LanguageForm";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const StyledLanguageName = styled.h2`
  max-width: 50%;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 400;
  word-wrap: break-word;
  transition: all 0.1s ease;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }

  ${(props) =>
    props.actionName !== undefined &&
    css`
      &:hover {
        transform: scale(1.1);
        background-color: #17126a;
        cursor: pointer;
      }
    `}
`;

const StyledParagraph = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const LanguagePill = ({ id, name, handleDeleteLanguage, actionName, actionEnabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledLanguageName actionName={actionName} onClick={() => actionEnabled && setIsOpen(true)}>
        {name}
      </StyledLanguageName>

      {isOpen && actionName === "edit" && (
        <ModalTemplate open={isOpen} closeModal={() => setIsOpen(false)} title={`Edytuj język ${name}`}>
          <LanguageForm edit={{ name, id }} />
        </ModalTemplate>
      )}
      {isOpen && actionName === "delete" && (
        <ModalTemplate open={isOpen} closeModal={() => setIsOpen(false)} title={`Usunąć język ${name}?`}>
          <>
            <StyledParagraph>Usuwając język, usuwasz również wszystkie dane (słowa, teksty) z nim powiązane.</StyledParagraph>
            <StyledButton delete onClick={() => handleDeleteLanguage(id)}>
              usuń
            </StyledButton>
          </>
        </ModalTemplate>
      )}
    </StyledWrapper>
  );
};

export default LanguagePill;
