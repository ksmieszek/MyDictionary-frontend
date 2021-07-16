import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addWords, editWords } from "actions/index";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import ErrorMessageWrapper from "components/atoms/ErrorMessageWrapper";

const StyledValues = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledFieldWrapper = styled.div`
  width: 45%;
`;

const schema = yup.object().shape({
  wordsId: yup.string(),
  firstWord: yup.string().max(30, "słowo nie powinno przekraczać 30 znaków").trim().required("słowo jest wymagane"),
  secondWord: yup.string().max(30, "słowo nie powinno przekraczać 30 znaków").trim().required("słowo jest wymagane"),
});

const WordForm = (props) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      wordsId: props.edit?.id || "",
      firstWord: props.edit?.firstWord || "",
      secondWord: props.edit?.secondWord || "",
      firstLanguage: props.activeLanguageFirst.languageId || "",
      secondLanguage: props.activeLanguageSecond.languageId || "",
    },
  });

  useEffect(() => {
    setFocus("firstWord");
  }, [setFocus]);

  const onSubmit = (data) => {
    const { addWordsAction, editWordsAction } = props;
    const { firstWord, secondWord, wordsId, firstLanguage, secondLanguage } = data;

    if (props.edit) {
      editWordsAction({
        wordsId,
        firstWord,
        secondWord,
        firstLanguage,
        secondLanguage,
      });
    } else {
      addWordsAction({
        firstWord,
        secondWord,
        firstLanguage,
        secondLanguage,
      });
    }
    props.closeModal();
  };

  const { activeLanguageFirst, activeLanguageSecond } = props;
  return (
    <FormTemplate onSubmit={handleSubmit(onSubmit)}>
      <StyledValues>
        <StyledFieldWrapper>
          <Input {...register("firstWord")} placeholder={activeLanguageFirst.name} />
          {errors.firstWord && <ErrorMessageWrapper>{errors.firstWord?.message}</ErrorMessageWrapper>}
        </StyledFieldWrapper>
        <StyledFieldWrapper>
          <Input {...register("secondWord")} placeholder={activeLanguageSecond.name} />
          {errors.secondWord && <ErrorMessageWrapper>{errors.secondWord?.message}</ErrorMessageWrapper>}
        </StyledFieldWrapper>
      </StyledValues>
      <Button save type="submit">
        zapisz
      </Button>
    </FormTemplate>
  );
};

const mapStateToProps = ({ activeLanguageFirst, activeLanguageSecond }) => {
  return { activeLanguageFirst, activeLanguageSecond };
};

const mapDispatchToProps = (dispatch) => ({
  addWordsAction: (words) => dispatch(addWords(words)),
  editWordsAction: (words) => dispatch(editWords(words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
