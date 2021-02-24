import axios from "axios";

export const addWords = (words) => (dispatch) => {
  dispatch({ type: "ADD_WORDS_REQUEST" });

  const { english, polish } = words;
  return axios
    .post("http://localhost:9000/api/add/words", {
      type: "words",
      english,
      polish,
      userID: "603374222f0e88098125a900",
    })
    .then(({ data }) => {
      dispatch({
        type: "ADD_WORDS_SUCCESS",
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "ADD_WORDS_FAILURE" });
    });
};

export const fetchWords = () => (dispatch) => {
  dispatch({ type: "FETCH_WORDS_REQUEST" });

  return axios
    .post("http://localhost:9000/api/show/words", {
      userID: "603374222f0e88098125a900",
    })
    .then(({ data }) => {
      dispatch({
        type: "FETCH_WORDS_SUCCESS",
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: "FETCH_FAILURE" });
    });
};

export const deleteWords = (wordsId) => (dispatch) => {
  dispatch({ type: "DELETE_WORDS_REQUEST" });

  return axios
    .delete(`http://localhost:9000/api/delete/words/${wordsId}`)
    .then(() => {
      dispatch({
        type: "DELETE_WORDS_SUCCESS",
        payload: {
          wordsId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "DELETE_WORDS_FAILURE" });
    });
};
