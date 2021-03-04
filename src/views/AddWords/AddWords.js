import React from "react";
import withReduxState from "../../hoc/withReduxState";
import { connect } from "react-redux";
import { addWords } from "../../actions/index";
import styles from "./AddWords.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

class AddWords extends React.Component {
  state = {
    firstWord: "",
    secondWord: "",
    newLanguageName: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { addWordsAction, activeLanguageFirst, activeLanguageSecond, changeActiveLanguage } = this.props;
    return (
      <div className={styles.wrapper}>
        <h3>Add Words</h3>
        {this.props.languages.length > 1 ? (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              this.setState({
                firstWord: "",
                secondWord: "",
              });
              addWordsAction({
                firstWord: this.state.firstWord,
                secondWord: this.state.secondWord,
                firstLanguage: activeLanguageFirst.name,
                secondLanguage: activeLanguageSecond.name,
              });
            }}
          >
            <div className={styles.keys}>
              <div className={styles.key}>
                <select className="chooseLanguage" id="activeLanguageFirst" onChange={changeActiveLanguage}></select>
              </div>
              <div className={styles.key}>
                <select className="chooseLanguage" id="activeLanguageSecond" onChange={changeActiveLanguage}></select>
              </div>
            </div>
            <div className={styles.values}>
              <div className={styles.value}>
                <Input name="firstWord" value={this.state.firstWord} onChange={(e) => this.handleChange(e)} />
              </div>
              <div className={styles.value}>
                <Input name="secondWord" value={this.state.secondWord} onChange={(e) => this.handleChange(e)} />
              </div>
            </div>
            <Button>add</Button>
          </form>
        ) : (
          <h2>add languages first</h2>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addWordsAction: (words) => dispatch(addWords(words)),
});

export default withReduxState(connect(null, mapDispatchToProps)(AddWords));
