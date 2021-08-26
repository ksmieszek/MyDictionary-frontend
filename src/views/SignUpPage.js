import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import routes from "routes/index";
import AuthorizationTemplate, { StyledHeading } from "templates/AuthorizationTemplate";
import SignUpForm from "components/molecules/forms/SignUpForm";
import Paragraph from "components/atoms/Paragraph";
import Hyperlink from "components/atoms/Hyperlink";

const SignUpPage = (props) => {
  return props.userID ? (
    <Redirect to={routes.words} />
  ) : (
    <AuthorizationTemplate>
      <StyledHeading>Zarejestruj się</StyledHeading>
      <SignUpForm />
      <Paragraph>
        Posiadasz już konto? <Hyperlink to={routes.login}>Zaloguj się</Hyperlink>
      </Paragraph>
    </AuthorizationTemplate>
  );
};

const mapStateToProps = ({ userID }) => {
  return { userID };
};

export default connect(mapStateToProps)(SignUpPage);
