import React from "react";
import withReduxState from "hoc/withReduxState";
import { connect } from "react-redux";
import { fetchWords, fetchTexts, updateActiveLanguage } from "actions/index";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 500px;
  margin-bottom: 30px;
`;

const StyledKey = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
  max-width: 160px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 6px;
  border: 1px solid #595959;
  outline: none;
  background: #323232;
  color: white;
  font-size: 1.4rem;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  @media (min-width: 1024px) {
    padding: 8px;
    font-size: 1.6rem;
  }
`;

class SelectLanguages extends React.Component {
  componentDidMount() {
    if (this.props.words.length === 0 && this.props.texts.length === 0) {
      this.fetchToState();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.languages.length !== prevProps.languages.length) {
      this.fetchToState();
    }
  }

  populateSelectList = (name) => {
    const { languages, activeLanguageFirst, activeLanguageSecond } = this.props;

    if (Object.keys(activeLanguageFirst).length !== 0 && Object.keys(activeLanguageSecond).length !== 0) {
      const collection = [];

      languages.forEach((language) => {
        const ChosenInFirstCollection = activeLanguageFirst.name === language.name ? "activeLanguageFirst" : false;
        const ChosenInSecondCollection = activeLanguageSecond.name === language.name ? "activeLanguageSecond" : false;

        if (ChosenInFirstCollection === name || ChosenInSecondCollection === name)
          collection.push(
            <option hidden key={language._id}>
              {language.name}
            </option>
          );
        // cant choose the same language in two collections
        else if (ChosenInFirstCollection || ChosenInSecondCollection) return;
        else collection.push(<option key={language._id}>{language.name}</option>);
      });
      return collection;
    }
  };

  changeActiveLanguage = async (e) => {
    const { languages, updateActiveLanguageAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    const newActiveLanguage = languages.find((item) => item.name === e.target.value);
    const activeLanguageId = e.target.name === "activeLanguageFirst" ? activeLanguageFirst._id : activeLanguageSecond._id;
    const newValues = {
      chosen: e.target.name,
    };
    const finalObject = Object.assign(newActiveLanguage, newValues);
    await updateActiveLanguageAction(finalObject, activeLanguageId);
    this.fetchToState();
  };

  fetchToState = () => {
    const { fetchWordsAction, fetchTextsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    fetchWordsAction(activeLanguageFirst.name, activeLanguageSecond.name);
    fetchWordsAction(activeLanguageSecond.name, activeLanguageFirst.name);
    fetchTextsAction(activeLanguageFirst.name, activeLanguageSecond.name);
    fetchTextsAction(activeLanguageSecond.name, activeLanguageFirst.name);
  };

  render() {
    const { activeLanguageFirst, activeLanguageSecond } = this.props;

    return (
      <StyledWrapper>
        <StyledKey>
          <StyledSelect name="activeLanguageFirst" onChange={this.changeActiveLanguage} value={activeLanguageFirst.name}>
            {this.populateSelectList("activeLanguageFirst")}
          </StyledSelect>
        </StyledKey>
        <StyledKey>
          <StyledSelect name="activeLanguageSecond" onChange={this.changeActiveLanguage} value={activeLanguageSecond.name}>
            {this.populateSelectList("activeLanguageSecond")}
          </StyledSelect>
        </StyledKey>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchWordsAction: (firstLanguage, secondLanguage) => dispatch(fetchWords(firstLanguage, secondLanguage)),
  fetchTextsAction: (firstLanguage, secondLanguage) => dispatch(fetchTexts(firstLanguage, secondLanguage)),
  updateActiveLanguageAction: (newSelectedLanguage, selectedId) => dispatch(updateActiveLanguage(newSelectedLanguage, selectedId)),
});

export default withReduxState(connect(null, mapDispatchToProps)(SelectLanguages));
