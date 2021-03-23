import React from "react";
import { connect } from "react-redux";
import { addTexts } from "actions/index";
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

class AddTextForm extends React.Component {
  state = {
    firstText: "",
    secondText: "",
    title: "",
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { addTextsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstText, secondText, title } = this.state;

    return (
      <StyledWrapper>
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({
              firstText: "",
              secondText: "",
              title: "",
            });
            addTextsAction({
              title: title,
              firstText: firstText,
              secondText: secondText,
              firstLanguage: activeLanguageFirst.name,
              secondLanguage: activeLanguageSecond.name,
            });
          }}
        >
          <StyledValues>
            <Input name="title" value={title} onChange={(e) => this.handleChange(e)} />
            <StyledValue>
              <textarea name="firstText" rows="5" cols="33" value={firstText} onChange={(e) => this.handleChange(e)} />
            </StyledValue>
            <StyledValue>
              <textarea name="secondText" rows="5" cols="33" value={secondText} onChange={(e) => this.handleChange(e)} />
            </StyledValue>
          </StyledValues>
          <Button>add</Button>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTextsAction: (words) => dispatch(addTexts(words)),
});

export default connect(null, mapDispatchToProps)(AddTextForm);
