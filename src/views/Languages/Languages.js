import React from "react";
import withReduxState from "../../hoc/withReduxState";
import { connect } from "react-redux";
import { addLanguage } from "../../actions/index";
import styles from "./Languages.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

class Languages extends React.Component {
  state = {
    newLanguageName: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { addLanguageAction } = this.props;
    return (
      <div className={styles.wrapper}>
        <h3>Add Language</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({
              newLanguageName: "",
            });
            addLanguageAction({
              name: this.state.newLanguageName,
            });
          }}
        >
          <Input name="newLanguageName" value={this.state.newLanguageName} onChange={(e) => this.handleChange(e)} />
          <Button>add</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLanguageAction: (newLanguage) => dispatch(addLanguage(newLanguage)),
});

export default withReduxState(connect(null, mapDispatchToProps)(Languages));
