import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextsPill from "components/molecules/pills/TextsPill";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TextsList = ({ activeLanguageFirst, activeLanguageSecond, texts }) =>
  texts.length > 0 ? (
    <StyledWrapper>
      {texts.map(({ _id: id, title, firstLanguage, secondLanguage }) => {
        if (
          (activeLanguageFirst.name === firstLanguage || activeLanguageFirst.name === secondLanguage) &&
          (activeLanguageSecond.name === firstLanguage || activeLanguageSecond.name === secondLanguage)
        )
          return <TextsPill key={id} id={id} title={title} />;
        else return null;
      })}
    </StyledWrapper>
  ) : (
    <h3>add texts first</h3>
  );

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(TextsList);
