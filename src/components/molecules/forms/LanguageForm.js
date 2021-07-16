import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addLanguage, editLanguage, editActiveLanguage } from "actions/index";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import ErrorMessageWrapper from "components/atoms/ErrorMessageWrapper";

const StyledFieldWrapper = styled.div`
  width: 60%;
`;

const schema = yup.object().shape({
  languageId: yup.string(),
  languageName: yup.string().max(20, "nazwa nie powinna przekraczać 20 znaków").trim().required("nazwa języka jest wymagana"),
});

const LanguageForm = (props) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      languageId: props.edit?.id || "",
      languageName: props.edit?.name || "",
    },
  });

  useEffect(() => {
    setFocus("languageName");
  }, [setFocus]);

  const onSubmit = (data) => {
    const { addLanguageAction, editLanguageAction, activeLanguageFirst, activeLanguageSecond, editActiveLanguageAction } = props;
    const { languageName, languageId } = data;

    if (props.edit) {
      editLanguageAction(languageName, languageId);

      [activeLanguageFirst, activeLanguageSecond].forEach((item) => {
        if (item.languageId === languageId) {
          const newActiveLanguage = { ...item, ...{ name: languageName } };
          editActiveLanguageAction(newActiveLanguage, newActiveLanguage._id);
        }
      });
    } else {
      addLanguageAction({
        name: languageName,
      });
    }
    props.closeModal();
  };

  return (
    <FormTemplate onSubmit={handleSubmit(onSubmit)}>
      <StyledFieldWrapper>
        <Input {...register("languageName")} />
        {errors.languageName && <ErrorMessageWrapper>{errors.languageName?.message}</ErrorMessageWrapper>}
      </StyledFieldWrapper>
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
  addLanguageAction: (newLanguage) => dispatch(addLanguage(newLanguage)),
  editLanguageAction: (name, id) => dispatch(editLanguage(name, id)),
  editActiveLanguageAction: (newActiveLanguage, activeLanguageId) => dispatch(editActiveLanguage(newActiveLanguage, activeLanguageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageForm);
