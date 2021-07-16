import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import routes from "routes/index";
import AuthorizationTemplate, { StyledHeading } from "templates/AuthorizationTemplate";
import LoginForm from "components/molecules/forms/LoginForm";
import Paragraph from "components/atoms/Paragraph";
import Hyperlink from "components/atoms/Hyperlink";

const LoginPage = (props) => {
  return props.userID ? (
    <Redirect to={routes.words} />
  ) : (
    <AuthorizationTemplate>
      <StyledHeading>Zaloguj się</StyledHeading>
      <LoginForm />
      <Paragraph>
        Nie masz konta? <Hyperlink href={routes.signup}>Zarejestruj się</Hyperlink>
      </Paragraph>
    </AuthorizationTemplate>
  );
};

const mapStateToProps = ({ userID }) => {
  return { userID };
};

export default connect(mapStateToProps)(LoginPage);
