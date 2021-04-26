import React from "react";
import { connect } from "react-redux";
import { deleteTexts } from "actions/index";
import { Redirect } from "react-router-dom";
import routes from "routes/index";
import styled from "styled-components";
import DetailsTemplate from "templates/DetailsTemplate";
import PreformattedText from "components/atoms/PreformattedText";

const StyledLanguage = styled.h2`
  max-width: 80%;
  margin-top: 40px;
  font-family: "Rubik", sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  word-wrap: break-word;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

class TextsDetails extends React.Component {
  state = {
    id: "",
    firstText: "",
    secondText: "",
    title: "",
    firstLanguage: "",
    secondLanguage: "",
  };

  componentDidMount() {
    if (this.props.texts) {
      const { _id: id, firstText, secondText, firstLanguage, secondLanguage, title } = this.props.texts;
      this.setState({ id, firstText, secondText, firstLanguage, secondLanguage, title });
    }
  }

  handleDelete = () => {
    const { deleteTextsAction } = this.props;
    const { id } = this.state;
    deleteTextsAction(id);
  };

  render() {
    if (!this.props.texts) {
      return <Redirect to={routes.texts} />;
    }

    const { title, firstLanguage, secondLanguage, firstText, secondText } = this.state;

    return (
      <DetailsTemplate title={title} handleDelete={this.handleDelete} route={routes.texts}>
        <StyledLanguage>{firstLanguage}</StyledLanguage>
        <PreformattedText>{firstText}</PreformattedText>
        <StyledLanguage>{secondLanguage}</StyledLanguage>
        <PreformattedText>{secondText}</PreformattedText>
      </DetailsTemplate>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    texts: state.texts.find((item) => item._id === ownProps.match.params.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteTextsAction: (textsId) => dispatch(deleteTexts(textsId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextsDetails);
