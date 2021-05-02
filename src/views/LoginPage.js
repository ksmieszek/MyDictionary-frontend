import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "actions/index";
import routes from "routes/index";
import AuthorizationTemplate from "templates/AuthorizationTemplate";
import { StyledLogo, StyledHeading, StyledForm, StyledInput, StyledButton } from "templates/AuthorizationTemplate";
import Paragraph from "components/atoms/Paragraph";
import Hyperlink from "components/atoms/Hyperlink";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginAction } = this.props;
    loginAction(username, password);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;
    const { userID } = this.props;

    if (userID) return <Redirect to={routes.words} />;

    return (
      <AuthorizationTemplate>
        <StyledLogo />
        <StyledHeading>Zaloguj się</StyledHeading>
        <StyledForm onSubmit={(e) => this.handleSubmit(e)}>
          <StyledInput placeholder="username" name="username" value={username} onChange={(e) => this.handleChange(e)} />
          <StyledInput placeholder="password" name="password" type="password" value={password} onChange={(e) => this.handleChange(e)} />
          <StyledButton>Zaloguj</StyledButton>
        </StyledForm>
        <Paragraph>
          Nie masz konta? <Hyperlink href={routes.signup}>Zarejestruj się</Hyperlink>
        </Paragraph>
      </AuthorizationTemplate>
    );
  }
}

const mapStateToProps = ({ userID }) => {
  return { userID };
};

const mapDispatchToProps = (dispatch) => ({
  loginAction: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
