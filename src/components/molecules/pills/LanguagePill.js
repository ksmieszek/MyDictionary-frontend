import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "components/atoms/DeleteIcon";
import ModalTemplate from "templates/ModalTemplate";
import Button from "components/atoms/Button";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const StyledLanguageName = styled.h2`
  max-width: 50%;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 400;
  word-wrap: break-word;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const StyledDeleteIconWrapper = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
`;

const StyledParagraph = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const LanguagePill = ({ id, name, handleDeleteLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledLanguageName>{name}</StyledLanguageName>
      <StyledDeleteIconWrapper>
        <DeleteIcon onClick={() => setIsOpen(true)} />
      </StyledDeleteIconWrapper>
      <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title={`Usunąć język ${name}?`}>
        <StyledParagraph>Usuwając język, usuwasz również wszystkie dane(słowa, teksty) z nim powiązane.</StyledParagraph>
        <StyledButton delete onClick={() => handleDeleteLanguage(id)}>
          usuń
        </StyledButton>
      </ModalTemplate>
    </StyledWrapper>
  );
};

export default LanguagePill;
