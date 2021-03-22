import React, { Component } from "react";
import { connect } from "react-redux";
import { addPhoto } from "../../actions/index";
import styled from "styled-components";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import InputFile from "../atoms/InputFile";
import Compressor from "compressorjs";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
`;

const StyledFileWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const StyledFakeButton = styled.div`
  position: relative;
  width: 175px;
  padding: 10px;
  background-color: blue;
`;

class AddPhotoForm extends Component {
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
      [e.target.id]: e.target.value,
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
      <StyledForm as="form" onSubmit={(e) => this.handleSubmit(e)}>
        <StyledFileWrapper>
          <StyledFakeButton>
            Wybierz zdjęcie
            <InputFile handleFileChange={this.handleFileChange} />
          </StyledFakeButton>
          {photoName}
        </StyledFileWrapper>
        <Input id="title" value={title} onChange={(e) => this.handleTextChange(e)} />
        <textarea id="description" rows="5" cols="33" value={description} onChange={(e) => this.handleTextChange(e)}></textarea>
        <Button>add</Button>
      </StyledForm>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPhotoAction: (newLanguage) => dispatch(addPhoto(newLanguage)),
});

export default connect(null, mapDispatchToProps)(AddPhotoForm);
