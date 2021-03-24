import React from "react";
import withReduxState from "hoc/withReduxState";
import UserPageTemplate from "templates/UserPageTemplate";
import styled from "styled-components";
import SelectLanguages from "components/molecules/SelectLanguages";
import AddWordForm from "components/molecules/forms/AddWordForm";
import WordList from "components/molecules/lists/WordList";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Words = ({ activeLanguageFirst, activeLanguageSecond, languages, words }) => (
  <UserPageTemplate>
    <StydedWrapper>
      {languages.length > 1 && Object.keys(activeLanguageFirst).length !== 0 && Object.keys(activeLanguageSecond).length !== 0 ? (
        <>
          <SelectLanguages />
          <h3>Add Words</h3>
          <AddWordForm languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} />
          <h3>All Words</h3>
          <WordList languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} words={words} />
        </>
      ) : (
        <h3>add languages first</h3>
      )}
    </StydedWrapper>
  </UserPageTemplate>
);

export default withReduxState(Words);
