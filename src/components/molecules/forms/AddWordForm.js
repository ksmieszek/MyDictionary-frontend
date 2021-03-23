import React from "react";
import { connect } from "react-redux";
import { addWords } from "actions/index";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
`;

const StyledValues = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledValue = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

class AddWordForm extends React.Component {
  state = {
    firstWord: "",
    secondWord: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { addWordsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstWord, secondWord } = this.state;

    return (
      <StyledWrapper>
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
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
          }}
        >
          <StyledValues>
            <StyledValue>
              <Input name="firstWord" value={firstWord} onChange={(e) => this.handleChange(e)} />
            </StyledValue>
            <StyledValue>
              <Input name="secondWord" value={secondWord} onChange={(e) => this.handleChange(e)} />
            </StyledValue>
          </StyledValues>
          <Button>add</Button>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addWordsAction: (words) => dispatch(addWords(words)),
});

export default connect(null, mapDispatchToProps)(AddWordForm);
