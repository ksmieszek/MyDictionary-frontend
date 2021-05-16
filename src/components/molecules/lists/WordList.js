import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteWords } from "actions/index";
import styled from "styled-components";
import WordsPill from "components/molecules/pills/WordsPill";
import OptionsMenu from "components/molecules/OptionsMenu";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  margin-top: 50px;
`;

const WordList = ({ deleteWordsAction, activeLanguageFirst, activeLanguageSecond, words }) => {
  const [actionName, setActionName] = useState(undefined);
  const [actionEnabled, setActionEnabled] = useState(false);

  return (
    <StyledWrapper>
      <OptionsMenu setActionEnabled={setActionEnabled} actionName={actionName} setActionName={setActionName} />
      {words
        .map(({ _id: id, firstLanguage, firstWord, secondLanguage, secondWord }) => {
          if (
            (activeLanguageFirst.languageId === firstLanguage || activeLanguageFirst.languageId === secondLanguage) &&
            (activeLanguageSecond.languageId === firstLanguage || activeLanguageSecond.languageId === secondLanguage)
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
                actionEnabled={actionEnabled}
                actionName={actionName}
              />
            );
          else return null;
        })
        .reverse()}
    </StyledWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteWordsAction: (wordsId) => dispatch(deleteWords(wordsId)),
});

export default connect(null, mapDispatchToProps)(WordList);
