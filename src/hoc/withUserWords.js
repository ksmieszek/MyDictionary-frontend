import React, { Component } from "react";
import { fetchWords } from "../actions/index";
import { connect } from "react-redux";

const withUserWords = (ChildComponent, props) => {
  class HOC extends Component {
    componentDidMount() {
      if (this.props.words.length === 0) {
        const { fetchWordsAction } = this.props;
        fetchWordsAction();
      }
    }

    render() {
      const { words } = this.props;
      return <ChildComponent {...props} {...{ words }} />;
    }
  }

  HOC.defaultProps = {
    words: [],
  };

  const mapStateToProps = ({ words }) => {
    return { words };
  };

  const mapDispatchToProps = (dispatch) => ({
    fetchWordsAction: () => dispatch(fetchWords()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default withUserWords;
