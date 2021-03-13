import React, { Component } from "react";
import { connect } from "react-redux";
import { addLanguage } from "../../actions/index";
import styled from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
`;

class AddLanguageForm extends Component {
  state = {
    newLanguageName: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { addLanguageAction } = this.props;

    return (
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({
            newLanguageName: "",
          });
          addLanguageAction({
            name: this.state.newLanguageName,
          });
        }}
      >
        <Input name="newLanguageName" value={this.state.newLanguageName} onChange={(e) => this.handleChange(e)} />
        <Button>add</Button>
      </StyledForm>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLanguageAction: (newLanguage) => dispatch(addLanguage(newLanguage)),
});

export default connect(null, mapDispatchToProps)(AddLanguageForm);
