import React from "react";
import { connect } from "react-redux";
import { deleteLanguage, deleteActiveLanguage, addToActiveLanguages, fetchActiveLanguages, deleteWords, fetchWords } from "../../../actions/index";
import LanguagePill from "components/molecules/pills/LanguagePill";

const LanguagesList = (props) => {
  const handleDeleteLanguage = async (languageId) => {
    const { deleteLanguageAction, deleteActiveLanguageAction, activeLanguageFirst, activeLanguageSecond } = props;
    await deleteConnectedWordsToLanguage(languageId);
    if (activeLanguageFirst.languageId === languageId) await deleteActiveLanguageAction(activeLanguageFirst._id);
    else if (activeLanguageSecond.languageId === languageId) await deleteActiveLanguageAction(activeLanguageSecond._id);
    await deleteLanguageAction(languageId);
  };

  const deleteConnectedWordsToLanguage = async (languageId) => {
    const { languages, deleteWordsAction, fetchWordsAction } = props;
    const deletedLanguage = languages.find((item) => item._id === languageId);

    await Promise.all(
      languages.map(async (item) => {
        if (item.name === deletedLanguage.name) return;
        await fetchWordsAction(deletedLanguage.name, item.name);
        await fetchWordsAction(item.name, deletedLanguage.name);
      })
    );

    props.words.forEach((item) => {
      if (item.firstLanguage === deletedLanguage.name || item.secondLanguage === deletedLanguage.name) deleteWordsAction(item._id);
    });
  };

  return props.languages.map(({ _id: id, name }) => <LanguagePill key={id} id={id} name={name} handleDeleteLanguage={handleDeleteLanguage} />);
};

const mapDispatchToProps = (dispatch) => ({
  deleteLanguageAction: (languageId) => dispatch(deleteLanguage(languageId)),
  fetchActiveLanguagesAction: () => dispatch(fetchActiveLanguages()),
  addToActiveLanguagesAction: (newSelectedLanguage) => dispatch(addToActiveLanguages(newSelectedLanguage)),
  deleteActiveLanguageAction: (activeLanguageId) => dispatch(deleteActiveLanguage(activeLanguageId)),
  fetchWordsAction: (firstLanguage, secondLanguage) => dispatch(fetchWords(firstLanguage, secondLanguage)),
  deleteWordsAction: (wordsId) => dispatch(deleteWords(wordsId)),
});

export default connect(null, mapDispatchToProps)(LanguagesList);
