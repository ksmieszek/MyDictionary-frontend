import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "components/atoms/DeleteIcon";
import ModalTemplate from "templates/ModalTemplate";
import Button from "components/atoms/Button";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 5px;
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

const WordsPill = ({ id, firstWord, secondWord, deleteWordsAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledFirstWord>{firstWord}</StyledFirstWord>
      <StyledSeparator>
        <DeleteIcon onClick={() => setIsOpen(true)} />
      </StyledSeparator>
      <StyledSecondWord>{secondWord}</StyledSecondWord>
      <ModalTemplate open={isOpen} close={() => setIsOpen(false)} title={`Usunąć te słowa?`}>
        <StyledParagraph>Czy na pewno chcesz usunąć parę słów:</StyledParagraph>
        <StyledSecondParagraph>
          {firstWord} - {secondWord}
        </StyledSecondParagraph>
        <StyledButton delete onClick={() => deleteWordsAction(id)}>
          usuń
        </StyledButton>
      </ModalTemplate>
    </StyledWrapper>
  );
};

export default WordsPill;
