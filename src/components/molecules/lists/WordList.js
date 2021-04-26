import React from "react";
import { connect } from "react-redux";
import { deleteWords } from "actions/index";
import styled from "styled-components";
import WordsPill from "components/molecules/pills/WordsPill";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  margin-top: 50px;
`;

const WordList = ({ deleteWordsAction, activeLanguageFirst, activeLanguageSecond, words }) => (
  <StyledWrapper>
    {words
      .map(({ _id: id, firstLanguage, firstWord, secondLanguage, secondWord }) => {
        if (
          (activeLanguageFirst.name === firstLanguage || activeLanguageFirst.name === secondLanguage) &&
          (activeLanguageSecond.name === firstLanguage || activeLanguageSecond.name === secondLanguage)
        )
          return (
            <WordsPill
              key={id}
              id={id}
              firstLanguage={firstLanguage}
              firstWord={firstWord}
              secondLanguage={secondLanguage}
              secondWord={secondWord}
              deleteWordsAction={deleteWordsAction}
            />
          );
        else return null;
      })
      .reverse()}
  </StyledWrapper>
);

const mapDispatchToProps = (dispatch) => ({
  deleteWordsAction: (wordsId) => dispatch(deleteWords(wordsId)),
});

export default connect(null, mapDispatchToProps)(WordList);
