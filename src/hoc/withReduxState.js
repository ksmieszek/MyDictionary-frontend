import React, { Component } from "react";
import { fetchWords, fetchLanguages, fetchActiveLanguages, updateActiveLanguage, addToActiveLanguages } from "../actions/index";
import { connect } from "react-redux";

const withReduxState = (ChildComponent, props) => {
  class HOC extends Component {
    async componentDidMount() {
      if (this.props.languages.length === 0) {
        const { fetchLanguagesAction, fetchActiveLanguagesAction } = this.props;
        await fetchActiveLanguagesAction();
        await fetchLanguagesAction();
        await this.AddActiveLanguagesIfMissing();
        this.fetchWordsToState();
      }
      await this.AddActiveLanguagesIfMissing();
      this.populateSelectList();
    }

    async componentDidUpdate() {
      this.populateSelectList();
    }

    populateSelectList = async () => {
      const { languages, activeLanguageFirst, activeLanguageSecond } = this.props;

      if (languages.length > 1) {
        if (Object.keys(activeLanguageFirst).length !== 0 && Object.keys(activeLanguageSecond).length !== 0) {
          document.querySelectorAll(".chooseLanguage").forEach((item) => {
            item.innerHTML = languages
              .map((language) => {
                const ChosenInFirstCollection = activeLanguageFirst.name === language.name ? "activeLanguageFirst" : false;
                const ChosenInSecondCollection = activeLanguageSecond.name === language.name ? "activeLanguageSecond" : false;

                if (ChosenInFirstCollection === item.id || ChosenInSecondCollection === item.id)
                  return `<option selected hidden>${language.name}</option>`;
                // cant choose the same language in two collections
                else if (ChosenInFirstCollection || ChosenInSecondCollection) return null;
                else return `<option>${language.name}</option>`;
              })
              .join("");
          });
        }
      }
    };

    AddActiveLanguagesIfMissing = async () => {
      const { languages, activeLanguageFirst, activeLanguageSecond } = this.props;
      //set two active languages if there is none
      if (languages.length > 1 && Object.keys(activeLanguageFirst).length === 0 && Object.keys(activeLanguageSecond).length === 0) {
        const { addToActiveLanguagesAction, fetchActiveLanguagesAction } = this.props;
        const newActiveLanguageFirst = Object.assign(languages[0], { chosen: "activeLanguageFirst" });
        const newActiveLanguageSecond = Object.assign(languages[1], { chosen: "activeLanguageSecond" });
        await addToActiveLanguagesAction(newActiveLanguageFirst);
        await addToActiveLanguagesAction(newActiveLanguageSecond);
        await fetchActiveLanguagesAction();
        // this.fetchWordsToState(); // it will not be necessary if we delete all words when we delete language
      }
    };

    fetchWordsToState = () => {
      const { fetchWordsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
      fetchWordsAction(activeLanguageFirst.name, activeLanguageSecond.name);
      fetchWordsAction(activeLanguageSecond.name, activeLanguageFirst.name);
    };

    changeActiveLanguage = async (e) => {
      const { languages, updateActiveLanguageAction, activeLanguageFirst, activeLanguageSecond } = this.props;
      const newActiveLanguage = languages.find((item) => item.name === e.target.value);
      const activeLanguageId = e.target.id === "activeLanguageFirst" ? activeLanguageFirst._id : activeLanguageSecond._id;
      const newValues = {
        chosen: e.target.id,
      };
      const finalObject = Object.assign(newActiveLanguage, newValues);
      await updateActiveLanguageAction(finalObject, activeLanguageId);
      this.fetchWordsToState();
    };

    render() {
      const { words, languages, activeLanguageFirst, activeLanguageSecond } = this.props;
      const changeActiveLanguage = this.changeActiveLanguage;

      return (
        <ChildComponent
          {...props}
          words={words}
          languages={languages}
          activeLanguageFirst={activeLanguageFirst}
          activeLanguageSecond={activeLanguageSecond}
          changeActiveLanguage={changeActiveLanguage}
        />
      );
    }
  }

  HOC.defaultProps = {
    words: [],
    languages: [],
    activeLanguageFirst: {},
    activeLanguageSecond: {},
  };

  const mapStateToProps = ({ words, languages, activeLanguageFirst, activeLanguageSecond }) => {
    return { words, languages, activeLanguageFirst, activeLanguageSecond };
  };

  const mapDispatchToProps = (dispatch) => ({
    fetchWordsAction: (firstLanguage, secondLanguage) => dispatch(fetchWords(firstLanguage, secondLanguage)),
    fetchLanguagesAction: () => dispatch(fetchLanguages()),
    fetchActiveLanguagesAction: () => dispatch(fetchActiveLanguages()),
    updateActiveLanguageAction: (newSelectedLanguage, selectedId) => dispatch(updateActiveLanguage(newSelectedLanguage, selectedId)),
    addToActiveLanguagesAction: (newSelectedLanguage) => dispatch(addToActiveLanguages(newSelectedLanguage)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default withReduxState;
