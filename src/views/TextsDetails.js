import React from "react";
import { connect } from "react-redux";
import { deleteTexts } from "actions/index";
import { Redirect } from "react-router-dom";
import UserPageTemplate from "templates/UserPageTemplate";
import styled from "styled-components";
import routes from "routes/index";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

    const { firstText, secondText, firstLanguage, secondLanguage, title } = this.state;

    return (
      <UserPageTemplate>
        <StydedWrapper>
          Texts details
          <button onClick={this.handleDelete}>DELETE</button>
          <h2>{title}</h2>
          <div>{firstLanguage}</div>
          <pre>{firstText}</pre>
          <div>{secondLanguage}</div>
          <pre>{secondText}</pre>
        </StydedWrapper>
      </UserPageTemplate>
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
