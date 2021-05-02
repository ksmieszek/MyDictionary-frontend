import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import routes from "routes/index";
import AuthorizationTemplate from "templates/AuthorizationTemplate";
import { StyledLogo, StyledHeading, StyledForm, StyledInput, StyledButton } from "templates/AuthorizationTemplate";
import Paragraph from "components/atoms/Paragraph";
import Hyperlink from "components/atoms/Hyperlink";

class SignUpPage extends React.Component {
  state = {
    redirect: false,
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    axios
      .post("http://localhost:9000/api/user/register", {
        username,
        password,
      })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password, redirect } = this.state;
    const { userID } = this.props;

    if (redirect) return <Redirect to={routes.login} />;
    if (userID) return <Redirect to={routes.words} />;

    return (
      <AuthorizationTemplate>
        <StyledLogo />
        <StyledHeading>Zarejestruj się</StyledHeading>
        <StyledForm onSubmit={(e) => this.handleSubmit(e)}>
          <StyledInput placeholder="username" name="username" value={username} onChange={(e) => this.handleChange(e)} />
          <StyledInput placeholder="password" name="password" type="password" value={password} onChange={(e) => this.handleChange(e)} />
          <StyledButton>Zarejestruj</StyledButton>
        </StyledForm>
        <Paragraph>
          Posiadasz już konto? <Hyperlink href={routes.login}>Zaloguj się</Hyperlink>
        </Paragraph>
      </AuthorizationTemplate>
    );
  }
}

const mapStateToProps = ({ userID }) => {
  return { userID };
};

export default connect(mapStateToProps)(SignUpPage);
