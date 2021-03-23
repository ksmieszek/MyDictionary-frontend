import React from "react";
import { connect } from "react-redux";
import { addLanguage } from "actions/index";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
`;

class AddLanguageForm extends React.Component {
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
