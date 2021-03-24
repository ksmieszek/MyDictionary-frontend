import React from "react";
import withReduxState from "../hoc/withReduxState";
import UserPageTemplate from "templates/UserPageTemplate";
import styled from "styled-components";
import SelectLanguages from "components/molecules/SelectLanguages";
import AddTextForm from "components/molecules/forms/AddTextForm";
import TextsList from "components/molecules/lists/TextsList";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Texts = ({ activeLanguageFirst, activeLanguageSecond, languages, texts }) => (
  <UserPageTemplate>
    <StydedWrapper>
      {languages.length > 1 && Object.keys(activeLanguageFirst).length !== 0 && Object.keys(activeLanguageSecond).length !== 0 ? (
        <>
          <SelectLanguages />
          <h3>Add Texts</h3>
          <AddTextForm languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} />
          <h3>All Texts</h3>
          <TextsList languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} texts={texts} />
        </>
      ) : (
        <h3>add texts first</h3>
      )}
    </StydedWrapper>
  </UserPageTemplate>
);

export default withReduxState(Texts);
