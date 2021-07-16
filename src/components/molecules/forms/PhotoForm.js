import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addPhoto, editPhoto } from "actions/index";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import routes from "routes/index";
import Compressor from "compressorjs";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import InputFile from "components/atoms/InputFile";
import Textarea from "components/atoms/Textarea";
import ErrorMessageWrapper from "components/atoms/ErrorMessageWrapper";

const StyledFieldWrapper = styled.div`
  width: 90%;
`;

const StyledFileWrapper = styled(StyledFieldWrapper)`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

const schema = yup.object().shape({
  photoId: yup.string(),
  photoSource: yup.string().required(),
  photoName: yup.string().required(),
  title: yup.string().max(40, "tytuł nie powinien przekraczać 40 znaków").trim().required("tytuł jest wymagany"),
  description: yup.string().max(200, "opis nie powinien przekraczać 200 znaków").required("opis jest wymagany"),
});

const PhotoForm = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      photoId: props.edit?.id || "",
      photoSource: btoa(props.edit?.photoSource),
      photoName: props.edit?.photoName || "",
      title: props.edit?.title || "",
      description: props.edit?.description || "",
    },
  });
  let history = useHistory();
  const watchFileChange = watch("picture");

  useEffect(() => {
    if (watchFileChange !== undefined && watchFileChange.length === 1 && watchFileChange[0].type.includes("image")) {
      const photoName = watchFileChange[0].name;
      new Compressor(watchFileChange[0], {
        convertSize: 1,
        quality: 0.6,
        maxWidth: 600,
        maxHeight: 400,
        success(result) {
          const CompressedphotoSource = result;
          const reader = new FileReader();
          reader.readAsDataURL(CompressedphotoSource);
          reader.onload = () => {
            const encodedPhotoSource = btoa(reader.result);
            setValue("photoName", photoName);
            setValue("photoSource", encodedPhotoSource);
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  }, [watchFileChange, setValue]);

  const onSubmit = (data) => {
    const { addPhotoAction, editPhotoAction } = props;
    const { photoSource, title, description, photoId, photoName } = data;

    if (props.edit) {
      editPhotoAction({
        photoId,
        photoSource,
        photoName,
        title,
        description,
      });
      props.closeModal();
      history.push(routes.photos);
    } else {
      addPhotoAction({
        photoSource,
        photoName,
        title,
        description,
      });
      props.closeModal();
    }
  };

  return (
    <FormTemplate onSubmit={handleSubmit(onSubmit)}>
      <StyledFileWrapper>
        <InputFile {...register("picture")} />
        <StyledButton>Wybierz zdjęcie</StyledButton>
        {watchFileChange === undefined || watchFileChange?.length === 0 ? <p>{getValues("photoName")}</p> : <p>{watchFileChange[0]?.name}</p>}
        {errors.photoName && watchFileChange?.length === 0 && getValues("photoName") === "" && (
          <ErrorMessageWrapper>zdjęcie jest wymagane</ErrorMessageWrapper>
        )}
      </StyledFileWrapper>
      <StyledFieldWrapper>
        <Input {...register("title")} placeholder="Tytuł" />
        {errors.title && <ErrorMessageWrapper>{errors.title?.message}</ErrorMessageWrapper>}
      </StyledFieldWrapper>
      <StyledFieldWrapper>
        <Textarea {...register("description")} placeholder="Opis" />
        {errors.description && <ErrorMessageWrapper>{errors.description?.message}</ErrorMessageWrapper>}
      </StyledFieldWrapper>
      <Button save type="submit">
        zapisz
      </Button>
    </FormTemplate>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addPhotoAction: (photo) => dispatch(addPhoto(photo)),
  editPhotoAction: (photo) => dispatch(editPhoto(photo)),
});

export default connect(null, mapDispatchToProps)(PhotoForm);
