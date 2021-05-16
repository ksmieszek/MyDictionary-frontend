import React from "react";
import { connect } from "react-redux";
import { addLanguage, editLanguage, editActiveLanguage } from "actions/index";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const StyledInput = styled(Input)`
  width: 60%;
`;

class LanguageForm extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = React.createRef();
  }

  state = {
    languageId: "",
    languageName: "",
  };

  componentDidMount() {
    if (this.props.edit) {
      this.setState({
        languageName: this.props.edit.name,
        languageId: this.props.edit.id,
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
    const { addLanguageAction, editLanguageAction, activeLanguageFirst, activeLanguageSecond, editActiveLanguageAction } = this.props;
    const { languageId, languageName } = this.state;

    if (this.props.edit) {
      editLanguageAction(languageName, languageId);

      [activeLanguageFirst, activeLanguageSecond].forEach((item) => {
        if (item.languageId === languageId) {
          const newActiveLanguage = { ...item, ...{ name: languageName } };
          editActiveLanguageAction(newActiveLanguage, newActiveLanguage._id);
        }
      });
    } else {
      addLanguageAction({
        name: this.state.languageName,
      });
    }

    this.setState({
      languageName: "",
    });
  };

  render() {
    return (
      <FormTemplate onSubmit={(e) => this.handleSubmit(e)}>
        <StyledInput name="languageName" value={this.state.languageName} onChange={(e) => this.handleChange(e)} ref={this.focusInput} />
        <Button save>zapisz</Button>
      </FormTemplate>
    );
  }
}

const mapStateToProps = ({ activeLanguageFirst, activeLanguageSecond }) => {
  return { activeLanguageFirst, activeLanguageSecond };
};

const mapDispatchToProps = (dispatch) => ({
  addLanguageAction: (newLanguage) => dispatch(addLanguage(newLanguage)),
  editLanguageAction: (name, id) => dispatch(editLanguage(name, id)),
  editActiveLanguageAction: (newActiveLanguage, activeLanguageId) => dispatch(editActiveLanguage(newActiveLanguage, activeLanguageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageForm);
