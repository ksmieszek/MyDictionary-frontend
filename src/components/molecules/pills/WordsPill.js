import { useState } from "react";
import styled, { css } from "styled-components";
import ModalTemplate from "templates/ModalTemplate";
import Button from "components/atoms/Button";
import WordForm from "components/molecules/forms/WordForm";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 25px 5px 0 5px;
`;

const StyledWordsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.1s ease;

  ${(props) =>
    props.actionName !== undefined &&
    css`
      &:hover {
        transform: scale(1.1);
        background-color: #17126a;
        cursor: pointer;
      }
    `}

  @media (min-width: 768px) {
    max-width: 700px;
  }
`;

const StyledWord = styled.div`
  width: 40%;
  margin: auto 0;
  word-wrap: break-word;
  font-size: 1.8rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const StyledFirstWord = styled(StyledWord)`
  text-align: right;
`;

const StyledSecondWord = styled(StyledWord)`
  text-align: left;
`;

const StyledSeparator = styled.div`
  width: 40px;
  margin: auto;
  text-align: center;
`;

const StyledParagraph = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
`;
const StyledSecondParagraph = styled.p`
  margin-top: 20px;
  font-size: 1.8rem;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const WordsPill = ({ id, firstWord, secondWord, deleteWordsAction, actionName, actionEnabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledWordsRow actionName={actionName} onClick={() => actionEnabled && setIsOpen(true)}>
        <StyledFirstWord>{firstWord}</StyledFirstWord>
        <StyledSeparator>-</StyledSeparator>
        <StyledSecondWord>{secondWord}</StyledSecondWord>
      </StyledWordsRow>

      {isOpen && actionName === "edit" && (
        <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title={`Edytuj słowa ${firstWord} - ${secondWord}`}>
          <WordForm edit={{ firstWord, secondWord, id }} />
        </ModalTemplate>
      )}

      {isOpen && actionName === "delete" && (
        <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title={`Usunąć te słowa?`}>
          <StyledParagraph>Czy na pewno chcesz usunąć parę słów:</StyledParagraph>
          <StyledSecondParagraph>
            {firstWord} - {secondWord}
          </StyledSecondParagraph>
          <StyledButton delete onClick={() => deleteWordsAction(id)}>
            usuń
          </StyledButton>
        </ModalTemplate>
      )}
    </StyledWrapper>
  );
};

export default WordsPill;
