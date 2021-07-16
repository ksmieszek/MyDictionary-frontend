import React from "react";
import { connect } from "react-redux";
import { signUp } from "actions/index";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import routes from "routes/index";
import { StyledForm, StyledButton, StyledFieldWrapper } from "templates/AuthorizationTemplate";
import ErrorMessageWrapper from "components/atoms/ErrorMessageWrapper";
import Input from "components/atoms/Input";

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("wprowadź nazwę użytkownika")
    .min(3, "nazwa powinna mieć 3 - 15 znaków")
    .max(15, "nazwa powinna mieć 3 - 15 znaków"),
  password: yup
    .string()
    .trim()
    .required("hasło jest wymagane")
    .min(3, "hasło powinno mieć 3 - 15 znaków")
    .max(15, "hasło powinno mieć 3 - 15 znaków"),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

const SignUpForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  let history = useHistory();

  const onSubmit = async (data) => {
    const { username, password } = data;
    const { signUpAction } = props;
    await signUpAction(username, password);
    history.push(routes.login);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledFieldWrapper>
        <Input placeholder="Nazwa użytkownika" {...register("username")} />
        {errors.username && <ErrorMessageWrapper>{errors.username?.message}</ErrorMessageWrapper>}
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <Input type="password" placeholder="Hasło" {...register("password")} />
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <Input type="password" placeholder="Powtórz hasło" {...register("confirmPassword")} />
        {(errors.password || errors.confirmPassword) && (
          <ErrorMessageWrapper>
            {errors.password && errors.password?.message}
            {errors.confirmPassword && "hasła powinny być takie same"}
          </ErrorMessageWrapper>
        )}
      </StyledFieldWrapper>
      <StyledButton>Zarejestruj</StyledButton>
    </StyledForm>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpAction: (username, password) => dispatch(signUp(username, password)),
});

export default connect(null, mapDispatchToProps)(SignUpForm);
