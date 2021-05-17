import React, { useState } from "react";
import { connect } from "react-redux";
import {
  deleteLanguage,
  fetchActiveLanguages,
  addActiveLanguages,
  deleteActiveLanguage,
  fetchWords,
  deleteWords,
  fetchTexts,
  deleteTexts,
} from "actions/index";
import styled from "styled-components";
import LanguagePill from "components/molecules/pills/LanguagePill";
import { useStore } from "react-redux";
import OptionsMenu from "components/molecules/OptionsMenu";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  margin-top: 35px;
`;

const LanguagesList = (props) => {
  const [actionName, setActionName] = useState(undefined);
  const [actionEnabled, setActionEnabled] = useState(false);
  const store = useStore();

  const handleDeleteLanguage = async (deletedLanguageId) => {
    const { deleteLanguageAction, deleteActiveLanguageAction, activeLanguageFirst, activeLanguageSecond } = props;
    if (activeLanguageFirst.languageId === deletedLanguageId) await deleteActiveLanguageAction(activeLanguageFirst._id);
    else if (activeLanguageSecond.languageId === deletedLanguageId) await deleteActiveLanguageAction(activeLanguageSecond._id);
    await deleteLanguageAction(deletedLanguageId);
    await deleteConnectedDataToLanguage(deletedLanguageId);
  };

  const deleteConnectedDataToLanguage = async (deletedLanguageId) => {
    const { languages, fetchWordsAction, deleteWordsAction, fetchTextsAction, deleteTextsAction } = props;
    await Promise.all(
      languages.map(async (item) => {
        if (item._id === deletedLanguageId) return;
        await fetchWordsAction(deletedLanguageId, item._id);
        await fetchWordsAction(item._id, deletedLanguageId);
        await fetchTextsAction(deletedLanguageId, item._id);
        await fetchTextsAction(item._id, deletedLanguageId);
      })
    );

    store.getState().words.forEach((item) => {
      if (item.firstLanguage === deletedLanguageId || item.secondLanguage === deletedLanguageId) deleteWordsAction(item._id);
    });
    store.getState().texts.forEach((item) => {
      if (item.firstLanguage === deletedLanguageId || item.secondLanguage === deletedLanguageId) deleteTextsAction(item._id);
    });
  };

  return (
    <StyledWrapper>
      {props.languages.length !== 0 && <OptionsMenu actionName={actionName} setActionEnabled={setActionEnabled} setActionName={setActionName} />}
      {props.languages.map(({ _id: id, name }) => (
        <LanguagePill
          key={id}
          id={id}
          name={name}
          handleDeleteLanguage={handleDeleteLanguage}
          actionEnabled={actionEnabled}
          actionName={actionName}
        />
      ))}
    </StyledWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteLanguageAction: (languageId) => dispatch(deleteLanguage(languageId)),
  fetchActiveLanguagesAction: () => dispatch(fetchActiveLanguages()),
  addActiveLanguagesAction: (newSelectedLanguage) => dispatch(addActiveLanguages(newSelectedLanguage)),
  deleteActiveLanguageAction: (activeLanguageId) => dispatch(deleteActiveLanguage(activeLanguageId)),
  fetchWordsAction: (firstLanguage, secondLanguage) => dispatch(fetchWords(firstLanguage, secondLanguage)),
  deleteWordsAction: (wordsId) => dispatch(deleteWords(wordsId)),
  fetchTextsAction: (firstLanguage, secondLanguage) => dispatch(fetchTexts(firstLanguage, secondLanguage)),
  deleteTextsAction: (textsId) => dispatch(deleteTexts(textsId)),
});

export default connect(null, mapDispatchToProps)(LanguagesList);
