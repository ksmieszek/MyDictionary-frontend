import React from "react";
import { connect } from "react-redux";
import { addTexts, editTexts } from "actions/index";
import routes from "routes/index";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import Textarea from "components/atoms/Textarea";

const StyledInput = styled(Input)`
  width: 90%;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 20px;
`;

class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = React.createRef();
  }

  state = {
    textsId: "",
    firstText: "",
    secondText: "",
    title: "",
  };

  componentDidMount() {
    if (this.props.edit) {
      const { id, title, firstText, secondText } = this.props.edit;
      this.setState({
        textsId: id,
        title,
        firstText,
        secondText,
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
    const { addTextsAction, editTextsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    const { textsId, title, firstText, secondText } = this.state;

    if (this.props.edit) {
      editTextsAction({
        textsId,
        title,
        firstText,
        secondText,
        firstLanguage: activeLanguageFirst.languageId,
        secondLanguage: activeLanguageSecond.languageId,
      });
      window.location.href = routes.texts;
    } else {
      addTextsAction({
        title,
        firstText,
        secondText,
        firstLanguage: activeLanguageFirst.languageId,
        secondLanguage: activeLanguageSecond.languageId,
      });
    }

    this.setState({
      textsId: "",
      firstText: "",
      secondText: "",
      title: "",
    });
  };

  render() {
    const { activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstText, secondText, title } = this.state;

    return (
      <FormTemplate onSubmit={(e) => this.handleSubmit(e)}>
        <StyledInput name="title" value={title} onChange={(e) => this.handleChange(e)} placeholder="Tytuł" ref={this.focusInput} />
        <StyledTextarea name="firstText" value={firstText} onChange={(e) => this.handleChange(e)} placeholder={activeLanguageFirst.name} />
        <StyledTextarea name="secondText" value={secondText} onChange={(e) => this.handleChange(e)} placeholder={activeLanguageSecond.name} />
        <Button save>zapisz</Button>
      </FormTemplate>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTextsAction: (texts) => dispatch(addTexts(texts)),
  editTextsAction: (texts) => dispatch(editTexts(texts)),
});

export default connect(null, mapDispatchToProps)(TextForm);
