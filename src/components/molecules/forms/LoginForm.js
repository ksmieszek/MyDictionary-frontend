import React from "react";
import { connect } from "react-redux";
import { login } from "actions/index";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm, StyledButton, StyledFieldWrapper } from "templates/AuthorizationTemplate";
import ErrorMessageWrapper from "components/atoms/ErrorMessageWrapper";
import Input from "components/atoms/Input";

const schema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().trim().required(),
});

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { username, password } = data;
    const { loginAction } = props;
    await loginAction(username, password);
    setError("username");
    setError("password");
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledFieldWrapper>
        <Input placeholder="Nazwa użytkownika" {...register("username")} />
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <Input type="password" placeholder="Hasło" {...register("password")} />
        {(errors.password || errors.username) && <ErrorMessageWrapper>Nazwa użytkownika lub hasło jest nieprawidłowe</ErrorMessageWrapper>}
      </StyledFieldWrapper>
      <StyledButton>Zaloguj</StyledButton>
    </StyledForm>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginAction: (username, password) => dispatch(login(username, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
