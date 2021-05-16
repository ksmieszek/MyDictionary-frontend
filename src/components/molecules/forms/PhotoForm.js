import React from "react";
import { connect } from "react-redux";
import { addPhoto, editPhoto } from "actions/index";
import routes from "routes/index";
import Compressor from "compressorjs";
import styled from "styled-components";
import FormTemplate from "templates/FormTemplate";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import InputFile from "components/atoms/InputFile";
import Textarea from "components/atoms/Textarea";

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

class PhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  state = {
    photoId: "",
    photoSource: {},
    title: "",
    description: "",
    photoName: "",
  };

  componentDidMount() {
    if (this.props.edit) {
      const { id, photoSource, title, description, photoName } = this.props.edit;
      this.setState({
        photoId: id,
        photoSource: btoa(photoSource),
        title,
        description,
        photoName,
      });
    }
    this.fileInput.current.focus();
  }

  handleFileChange = () => {
    if (this.fileInput.current.files[0].type.includes("image")) {
      const photoName = this.fileInput.current.files[0].name;
      const _this = this;

      new Compressor(this.fileInput.current.files[0], {
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
            _this.setState({
              photoSource: encodedPhotoSource,
              photoName,
            });
          };
        },
        error(err) {
          console.log(err.message);
        },
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
    const { addPhotoAction, editPhotoAction } = this.props;
    const { photoSource, title, description, photoId, photoName } = this.state;
    if (this.props.edit) {
      editPhotoAction({
        photoId,
        photoSource,
        title,
        description,
        photoName,
      });
      window.location.href = routes.photos;
    } else {
      addPhotoAction({
        photoSource,
        title,
        description,
      });
    }

    this.setState({
      photoId: "",
      photoSource: {},
      title: "",
      description: "",
      photoName: "",
    });
  };

  render() {
    const { photoName, title, description } = this.state;

    return (
      <FormTemplate onSubmit={(e) => this.handleSubmit(e)}>
        <StyledFileWrapper>
          <InputFile ref={this.fileInput} handleFileChange={this.handleFileChange} />
          <StyledButton>Wybierz zdjęcie</StyledButton>
          <p>{photoName}</p>
        </StyledFileWrapper>
        <StyledInput name="title" value={title} onChange={(e) => this.handleTextChange(e)} placeholder="Tytuł" />
        <Textarea name="description" value={description} onChange={(e) => this.handleTextChange(e)} placeholder="Opis"></Textarea>
        <Button save>zapisz</Button>
      </FormTemplate>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPhotoAction: (photo) => dispatch(addPhoto(photo)),
  editPhotoAction: (photo) => dispatch(editPhoto(photo)),
});

export default connect(null, mapDispatchToProps)(PhotoForm);
