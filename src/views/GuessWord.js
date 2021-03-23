import React from "react";
import withReduxState from "hoc/withReduxState";
import { randomNumber } from "utilities/Utilities";
import styled from "styled-components";
import SelectLanguages from "components/molecules/SelectLanguages";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";

const StyledWrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledRow = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.2em;

  > * {
    width: 33%;
    display: flex;
    justify-content: center;
  }
`;

class GuessWords extends React.Component {
  state = {
    inputValue: "",
    isCorrect: false,
    activeLanguageWords: [],
    index: 0,
  };

  componentDidMount() {
    this.addActiveLanguageWords();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.words) !== JSON.stringify(this.props.words)) {
      this.addActiveLanguageWords();
    }
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  changeNumber = () => {
    this.setState({
      index: randomNumber(0, this.state.activeLanguageWords.length),
    });
  };

  isAnswerCorrect = (e) => {
    e.preventDefault();
    if (this.state.isCorrect === true) {
      this.setState({
        isCorrect: false,
        inputValue: "",
      });
      this.changeNumber();
      return;
    }
    const { activeLanguageWords, index, inputValue } = this.state;
    if (activeLanguageWords[index].secondWord === inputValue) {
      this.setState({
        isCorrect: true,
      });
    }
  };

  addActiveLanguageWords() {
    const { activeLanguageFirst, activeLanguageSecond, words } = this.props;
    const WordsToGuess = [];
    words.forEach((item) => {
      if (
        (activeLanguageFirst.name === item.firstLanguage || activeLanguageFirst.name === item.secondLanguage) &&
        (activeLanguageSecond.name === item.firstLanguage || activeLanguageSecond.name === item.secondLanguage)
      )
        WordsToGuess.push(item);
    });

    this.setState({
      activeLanguageWords: WordsToGuess,
      index: randomNumber(0, WordsToGuess.length),
    });
  }

  render() {
    const { languages, activeLanguageFirst, activeLanguageSecond } = this.props;
    const { index, inputValue, isCorrect, activeLanguageWords } = this.state;

    return (
      <StyledWrapper>
        {languages.length > 1 && Object.keys(activeLanguageFirst).length !== 0 && Object.keys(activeLanguageSecond).length !== 0 ? (
          <>
            <SelectLanguages />
            {activeLanguageWords.length > 0 ? (
              <StyledForm autoComplete="off" onSubmit={(e) => this.isAnswerCorrect(e)}>
                <StyledRow>
                  <div>{activeLanguageWords[index].firstWord}</div>
                  <div>-</div>
                  <Input placeholder="enter word" value={inputValue} onChange={this.handleChange} />
                </StyledRow>
                <Button>{isCorrect ? "next" : "check"}</Button>
              </StyledForm>
            ) : (
              <h3>add words first</h3>
            )}
          </>
        ) : (
          <h3>add languages first</h3>
        )}
      </StyledWrapper>
    );
  }
}

export default withReduxState(GuessWords);
