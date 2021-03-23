import React from "react";
import { fetchLanguages, fetchActiveLanguages, addToActiveLanguages, deleteActiveLanguage } from "actions/index";
import { connect } from "react-redux";

const withReduxState = (ChildComponent, props) => {
  class HOC extends React.Component {
    async componentDidMount() {
      if (this.props.languages.length === 0) {
        const { fetchLanguagesAction, fetchActiveLanguagesAction } = this.props;
        await fetchActiveLanguagesAction();
        await fetchLanguagesAction();
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.languages.length !== prevProps.languages.length && this.props.languages.length > 1) this.AddActiveLanguagesIfMissing();
    }

    AddActiveLanguagesIfMissing = async () => {
      const { activeLanguageFirst, activeLanguageSecond } = this.props;
      if (Object.keys(activeLanguageFirst).length === 0 || Object.keys(activeLanguageSecond).length === 0) {
        const { languages, addToActiveLanguagesAction, deleteActiveLanguageAction, fetchActiveLanguagesAction } = this.props;
        if (activeLanguageFirst._id !== undefined) await deleteActiveLanguageAction(activeLanguageFirst._id);
        if (activeLanguageSecond._id !== undefined) await deleteActiveLanguageAction(activeLanguageSecond._id);
        const newActiveLanguageFirst = Object.assign(languages[0], { chosen: "activeLanguageFirst" });
        const newActiveLanguageSecond = Object.assign(languages[1], { chosen: "activeLanguageSecond" });
        await addToActiveLanguagesAction(newActiveLanguageFirst);
        await addToActiveLanguagesAction(newActiveLanguageSecond);
        await fetchActiveLanguagesAction();
      }
    };

    render() {
      const { words, languages, activeLanguageFirst, activeLanguageSecond } = this.props;

      return (
        <ChildComponent
          {...props}
          words={words}
          languages={languages}
          activeLanguageFirst={activeLanguageFirst}
          activeLanguageSecond={activeLanguageSecond}
        />
      );
    }
  }

  const mapStateToProps = ({ words, languages, activeLanguageFirst, activeLanguageSecond }) => {
    return { words, languages, activeLanguageFirst, activeLanguageSecond };
  };

  const mapDispatchToProps = (dispatch) => ({
    fetchLanguagesAction: () => dispatch(fetchLanguages()),
    fetchActiveLanguagesAction: () => dispatch(fetchActiveLanguages()),
    addToActiveLanguagesAction: (newSelectedLanguage) => dispatch(addToActiveLanguages(newSelectedLanguage)),
    deleteActiveLanguageAction: (languageId) => dispatch(deleteActiveLanguage(languageId)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default withReduxState;
