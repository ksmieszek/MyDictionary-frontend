import React from "react";
import { connect } from "react-redux";
import { addPhoto } from "actions/index";
import Compressor from "compressorjs";
import styled from "styled-components";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import InputFile from "components/atoms/InputFile";
import Textarea from "components/atoms/Textarea";
import Form from "components/molecules/forms/Form";

const StyledFileWrapper = styled.div`
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

const StyledInput = styled(Input)`
  width: 90%;
  margin-bottom: 20px;
`;

class AddPhotoForm extends React.Component {
  state = {
    photoSource: {},
    title: "",
    description: "",
    photoName: "",
  };

  handleFileChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        photoSource: e.target.files[0],
        photoName: e.target.files[0].name,
      });
    }
  };

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addPhotoAction } = this.props;
    const { photoSource, title, description } = this.state;
    new Compressor(photoSource, {
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
          addPhotoAction({
            photoSource: encodedPhotoSource,
            title,
            description,
          });
        };
      },
      error(err) {
        console.log(err.message);
      },
    });

    this.setState({
      photoSource: {},
      title: "",
      description: "",
      photoName: "",
    });
  };

  render() {
    const { photoName, title, description } = this.state;

    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <StyledFileWrapper>
          <InputFile handleFileChange={this.handleFileChange} />
          <StyledButton>Wybierz zdjęcie</StyledButton>
          <p>{photoName}</p>
        </StyledFileWrapper>
        <StyledInput name="title" value={title} onChange={(e) => this.handleTextChange(e)} placeholder="Tytuł" />
        <Textarea name="description" value={description} onChange={(e) => this.handleTextChange(e)} placeholder="Opis"></Textarea>
        <Button save>zapisz</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPhotoAction: (newLanguage) => dispatch(addPhoto(newLanguage)),
});

export default connect(null, mapDispatchToProps)(AddPhotoForm);
