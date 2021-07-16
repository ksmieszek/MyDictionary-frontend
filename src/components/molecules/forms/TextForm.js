import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addTexts, editTexts } from "actions/index";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import routes from "routes/index";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import Textarea from "components/atoms/Textarea";
import ErrorMessageWrapper from "components/atoms/ErrorMessageWrapper";

const StyledFieldWrapper = styled.div`
  width: 90%;
`;

const schema = yup.object().shape({
  textsId: yup.string(),
  title: yup.string().max(30, "tytuł nie powinien przekraczać 30 znaków").trim().required("tytuł jest wymagany"),
  firstText: yup.string().max(200, "tekst nie powinien przekraczać 200 znaków").required("tekst jest wymagany"),
  secondText: yup.string().max(200, "tekst nie powinien przekraczać 200 znaków").required("tekst jest wymagany"),
});

const TextForm = (props) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      textsId: props.edit?.id || "",
      title: props.edit?.title || "",
      firstText: props.edit?.firstText || "",
      secondText: props.edit?.secondText || "",
      firstLanguage: props.activeLanguageFirst.languageId || "",
      secondLanguage: props.activeLanguageSecond.languageId || "",
    },
  });
  let history = useHistory();

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const onSubmit = (data) => {
    const { addTextsAction, editTextsAction } = props;
    const { textsId, title, firstText, secondText, firstLanguage, secondLanguage } = data;

    if (props.edit) {
      editTextsAction({
        textsId,
        title,
        firstText,
        secondText,
        firstLanguage,
        secondLanguage,
      });
      props.closeModal();
      history.push(routes.texts);
    } else {
      addTextsAction({
        title,
        firstText,
        secondText,
        firstLanguage,
        secondLanguage,
      });
      props.closeModal();
    }
  };

  const { activeLanguageFirst, activeLanguageSecond } = props;
  return (
    <FormTemplate onSubmit={handleSubmit(onSubmit)}>
      <StyledFieldWrapper>
        <Input {...register("title")} placeholder="Tytuł" />
        {errors.title && <ErrorMessageWrapper>{errors.title?.message}</ErrorMessageWrapper>}
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <Textarea {...register("firstText")} placeholder={activeLanguageFirst.name} />
        {errors.firstText && <ErrorMessageWrapper>{errors.firstText?.message}</ErrorMessageWrapper>}
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <Textarea {...register("secondText")} placeholder={activeLanguageSecond.name} />
        {errors.secondText && <ErrorMessageWrapper>{errors.secondText?.message}</ErrorMessageWrapper>}
      </StyledFieldWrapper>
      <Button save type="submit">
        zapisz
      </Button>
    </FormTemplate>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTextsAction: (texts) => dispatch(addTexts(texts)),
  editTextsAction: (texts) => dispatch(editTexts(texts)),
});

export default connect(null, mapDispatchToProps)(TextForm);
