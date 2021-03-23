import React from "react";
import withReduxState from "hoc/withReduxState";
import styled from "styled-components";
import AddLanguageForm from "components/molecules/forms/AddLanguageForm";
import LanguagesList from "components/molecules/lists/LanguagesList";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Languages = ({ languages, activeLanguageFirst, activeLanguageSecond, words }) => (
  <StydedWrapper>
    <h3>Add Language</h3>
    <AddLanguageForm languages={languages} />
    <h3>All Languages</h3>
    <LanguagesList languages={languages} activeLanguageFirst={activeLanguageFirst} activeLanguageSecond={activeLanguageSecond} words={words} />
  </StydedWrapper>
);

export default withReduxState(Languages);
