import React from "react";
import { connect } from "react-redux";
import { addWords } from "actions/index";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import Form from "components/molecules/forms/Form";

const StyledValues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

class AddWordForm extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = React.createRef();
  }

  state = {
    firstWord: "",
    secondWord: "",
  };

  componentDidMount() {
    this.focusInput.current.focus();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addWordsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstWord, secondWord } = this.state;

    this.setState({
      firstWord: "",
      secondWord: "",
    });
    addWordsAction({
      firstWord: firstWord,
      secondWord: secondWord,
      firstLanguage: activeLanguageFirst.name,
      secondLanguage: activeLanguageSecond.name,
    });
  };

  render() {
    const { activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstWord, secondWord } = this.state;

    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
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
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addWordsAction: (words) => dispatch(addWords(words)),
});

export default connect(null, mapDispatchToProps)(AddWordForm);
