import React from "react";
import { connect } from "react-redux";
import {
  deleteLanguage,
  fetchActiveLanguages,
  addToActiveLanguages,
  deleteActiveLanguage,
  fetchWords,
  deleteWords,
  fetchTexts,
  deleteTexts,
} from "actions/index";
import styled from "styled-components";
import LanguagePill from "components/molecules/pills/LanguagePill";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  margin-top: 35px;
`;

const LanguagesList = (props) => {
  const handleDeleteLanguage = async (languageId) => {
    const { deleteLanguageAction, deleteActiveLanguageAction, activeLanguageFirst, activeLanguageSecond } = props;
    await deleteLanguageAction(languageId);
    if (activeLanguageFirst.languageId === languageId) await deleteActiveLanguageAction(activeLanguageFirst._id);
    else if (activeLanguageSecond.languageId === languageId) await deleteActiveLanguageAction(activeLanguageSecond._id);
    await deleteConnectedDataToLanguage(languageId);
  };

  const deleteConnectedDataToLanguage = async (languageId) => {
    const { languages, fetchWordsAction, deleteWordsAction, fetchTextsAction, deleteTextsAction } = props;
    const deletedLanguage = languages.find((item) => item._id === languageId);

    await Promise.all(
      languages.map(async (item) => {
        if (item.name === deletedLanguage.name) return;
        await fetchWordsAction(deletedLanguage.name, item.name);
        await fetchWordsAction(item.name, deletedLanguage.name);
        await fetchTextsAction(deletedLanguage.name, item.name);
        await fetchTextsAction(item.name, deletedLanguage.name);
      })
    );

    props.words.forEach((item) => {
      if (item.firstLanguage === deletedLanguage.name || item.secondLanguage === deletedLanguage.name) deleteWordsAction(item._id);
    });
    props.texts.forEach((item) => {
      if (item.firstLanguage === deletedLanguage.name || item.secondLanguage === deletedLanguage.name) deleteTextsAction(item._id);
    });
  };

  return (
    <StyledWrapper>
      {props.languages.map(({ _id: id, name }) => (
        <LanguagePill key={id} id={id} name={name} handleDeleteLanguage={handleDeleteLanguage} />
      ))}
    </StyledWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteLanguageAction: (languageId) => dispatch(deleteLanguage(languageId)),
  fetchActiveLanguagesAction: () => dispatch(fetchActiveLanguages()),
  addToActiveLanguagesAction: (newSelectedLanguage) => dispatch(addToActiveLanguages(newSelectedLanguage)),
  deleteActiveLanguageAction: (activeLanguageId) => dispatch(deleteActiveLanguage(activeLanguageId)),
  fetchWordsAction: (firstLanguage, secondLanguage) => dispatch(fetchWords(firstLanguage, secondLanguage)),
  deleteWordsAction: (wordsId) => dispatch(deleteWords(wordsId)),
  fetchTextsAction: (firstLanguage, secondLanguage) => dispatch(fetchTexts(firstLanguage, secondLanguage)),
  deleteTextsAction: (textsId) => dispatch(deleteTexts(textsId)),
});

export default connect(null, mapDispatchToProps)(LanguagesList);
