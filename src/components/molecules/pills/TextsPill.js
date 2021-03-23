import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

class TextsPill extends React.Component {
  state = {
    redirect: false,
  };

  showTextsDetails = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { id, title } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`text/details/${id}`} />;
    }

    return (
      <StydedWrapper onClick={this.showTextsDetails}>
        <h4>{title}</h4>
      </StydedWrapper>
    );
  }
}

export default TextsPill;
