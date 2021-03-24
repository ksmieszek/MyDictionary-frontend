import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AuthorizationTemplate from "templates/AuthorizationTemplate";
import styled from "styled-components";
import routes from "routes/index";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

const StydedWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
`;

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
      .catch((err) => {
        console.log(err);
      });

    this.setState({ redirect: true });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password, redirect } = this.state;

    if (redirect) {
      return <Redirect to={routes.login} />;
    }
    if (localStorage.getItem("userID")) {
      return <Redirect to={routes.words} />;
    }

    return (
      <AuthorizationTemplate>
        <StydedWrapper>
          <h4>Zarejestruj się</h4>
          <StyledForm onSubmit={(e) => this.handleSubmit(e)}>
            <Input placeholder="username" name="username" value={username} onChange={(e) => this.handleChange(e)} />
            <Input placeholder="password" name="password" type="password" value={password} onChange={(e) => this.handleChange(e)} />
            <Button>Submit</Button>
          </StyledForm>
        </StydedWrapper>
      </AuthorizationTemplate>
    );
  }
}

export default SignUpPage;
