import React from "react";
import { connect } from "react-redux";
import { addTexts } from "actions/index";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import Textarea from "components/atoms/Textarea";
import Form from "components/molecules/forms/Form";

const StyledInput = styled(Input)`
  width: 90%;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 20px;
`;

class AddTextForm extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = React.createRef();
  }

  state = {
    firstText: "",
    secondText: "",
    title: "",
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
    const { addTextsAction, activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstText, secondText, title } = this.state;

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
  };

  render() {
    const { activeLanguageFirst, activeLanguageSecond } = this.props;
    const { firstText, secondText, title } = this.state;

    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <StyledInput name="title" value={title} onChange={(e) => this.handleChange(e)} placeholder="Tytuł" ref={this.focusInput} />
        <StyledTextarea name="firstText" value={firstText} onChange={(e) => this.handleChange(e)} placeholder={activeLanguageFirst.name} />
        <StyledTextarea name="secondText" value={secondText} onChange={(e) => this.handleChange(e)} placeholder={activeLanguageSecond.name} />
        <Button save>zapisz</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTextsAction: (words) => dispatch(addTexts(words)),
});

export default connect(null, mapDispatchToProps)(AddTextForm);
