import React from "react";
import { connect } from "react-redux";
import { addWords, editWords } from "actions/index";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const StyledValues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = React.createRef();
  }

  state = {
    wordsId: "",
    firstWord: "",
    secondWord: "",
  };

  componentDidMount() {
    if (this.props.edit) {
      this.setState({
        firstWord: this.props.edit.firstWord,
        secondWord: this.props.edit.secondWord,
        wordsId: this.props.edit.id,
      });
    }
    this.focusInput.current.focus();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addWordsAction, editWordsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstWord, secondWord, wordsId } = this.state;

    if (this.props.edit) {
      editWordsAction({ firstWord, secondWord, wordsId });
    } else {
      addWordsAction({
        firstWord: firstWord,
        secondWord: secondWord,
        firstLanguage: activeLanguageFirst.languageId,
        secondLanguage: activeLanguageSecond.languageId,
      });
    }

    this.setState({
      wordsId: "",
      firstWord: "",
      secondWord: "",
    });
  };

  render() {
    const { activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstWord, secondWord } = this.state;

    return (
      <FormTemplate onSubmit={(e) => this.handleSubmit(e)}>
        <StyledValues>
          <Input
            name="firstWord"
            value={firstWord}
            onChange={(e) => this.handleChange(e)}
            placeholder={activeLanguageFirst.name}
            ref={this.focusInput}
          />
          <Input name="secondWord" value={secondWord} onChange={(e) => this.handleChange(e)} placeholder={activeLanguageSecond.name} />
        </StyledValues>
        <Button save>zapisz</Button>
      </FormTemplate>
    );
  }
}

const mapStateToProps = ({ activeLanguageFirst, activeLanguageSecond }) => {
  return { activeLanguageFirst, activeLanguageSecond };
};

const mapDispatchToProps = (dispatch) => ({
  addWordsAction: (words) => dispatch(addWords(words)),
  editWordsAction: (words) => dispatch(editWords(words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
