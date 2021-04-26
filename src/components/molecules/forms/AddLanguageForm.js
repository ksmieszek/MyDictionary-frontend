import React from "react";
import { connect } from "react-redux";
import { addLanguage } from "actions/index";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import Form from "components/molecules/forms/Form";

const StyledInput = styled(Input)`
  width: 60%;
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { addLanguageAction } = this.props;

    this.setState({
      newLanguageName: "",
    });

    addLanguageAction({
      name: this.state.newLanguageName,
    });
  };

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <StyledInput name="newLanguageName" value={this.state.newLanguageName} onChange={(e) => this.handleChange(e)} />
        <Button save>zapisz</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLanguageAction: (newLanguage) => dispatch(addLanguage(newLanguage)),
});

export default connect(null, mapDispatchToProps)(AddLanguageForm);
