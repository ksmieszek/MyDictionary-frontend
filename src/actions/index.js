import axios from "axios";

export const FETCH_WORDS_REQUEST = "FETCH_WORDS_REQUEST";
export const FETCH_WORDS_SUCCESS = "FETCH_WORDS_SUCCESS";
export const FETCH_WORDS_FAILURE = "FETCH_WORDS_FAILURE";

export const ADD_WORDS_REQUEST = "ADD_WORDS_REQUEST";
export const ADD_WORDS_SUCCESS = "ADD_WORDS_SUCCESS";
export const ADD_WORDS_FAILURE = "ADD_WORDS_FAILURE";

export const DELETE_WORDS_REQUEST = "DELETE_WORDS_REQUEST";
export const DELETE_WORDS_SUCCESS = "DELETE_WORDS_SUCCESS";
export const DELETE_WORDS_FAILURE = "DELETE_WORDS_FAILURE";

export const FETCH_LANGUAGES_REQUEST = "FETCH_LANGUAGES_REQUEST";
export const FETCH_LANGUAGES_SUCCESS = "FETCH_LANGUAGES_SUCCESS";
export const FETCH_LANGUAGES_FAILURE = "FETCH_LANGUAGES_FAILURE";

export const ADD_LANGUAGE_REQUEST = "ADD_LANGUAGE_REQUEST";
export const ADD_LANGUAGE_SUCCESS = "ADD_LANGUAGE_SUCCESS";
export const ADD_LANGUAGE_FAILURE = "ADD_LANGUAGE_FAILURE";

export const FETCH_ACTIVE_LANGUAGES_REQUEST = "FETCH_ACTIVE_LANGUAGES_REQUEST";
export const FETCH_ACTIVE_LANGUAGES_SUCCESS = "FETCH_ACTIVE_LANGUAGES_SUCCESS";
export const FETCH_ACTIVE_LANGUAGES_FAILURE = "FETCH_ACTIVE_LANGUAGES_FAILURE";

export const ADD_ACTIVE_LANGUAGE_REQUEST = "ADD_ACTIVE_LANGUAGE_REQUEST";
export const ADD_ACTIVE_LANGUAGE_SUCCESS = "ADD_ACTIVE_LANGUAGE_SUCCESS";
export const ADD_ACTIVE_LANGUAGE_FAILURE = "ADD_ACTIVE_LANGUAGE_FAILURE";

export const UPDATE_ACTIVE_LANGUAGES_REQUEST = "UPDATE_ACTIVE_LANGUAGES_REQUEST";
export const UPDATE_ACTIVE_LANGUAGES_SUCCESS = "UPDATE_ACTIVE_LANGUAGES_SUCCESS";
export const UPDATE_ACTIVE_LANGUAGES_FAILURE = "UPDATE_ACTIVE_LANGUAGES_FAILURE";

export const addWords = (words) => (dispatch) => {
  dispatch({ type: "ADD_WORDS_REQUEST" });

  const { firstWord, secondWord, firstLanguage, secondLanguage } = words;
  return axios
    .post("http://localhost:9000/api/add/words", {
      firstWord,
      secondWord,
      firstLanguage,
      secondLanguage,
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

export const fetchWords = (firstLanguage, secondLanguage) => (dispatch) => {
  dispatch({ type: "FETCH_WORDS_REQUEST" });

  return axios
    .post("http://localhost:9000/api/show/words", {
      firstLanguage: firstLanguage,
      secondLanguage: secondLanguage,
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
      dispatch({ type: "FETCH_WORDS_FAILURE" });
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

export const addLanguage = (newLanguage) => (dispatch) => {
  dispatch({ type: "ADD_LANGUAGE_REQUEST" });

  const { name } = newLanguage;
  return axios
    .post("http://localhost:9000/api/add/language", {
      name,
      userID: "603374222f0e88098125a900",
    })
    .then(({ data }) => {
      dispatch({
        type: "ADD_LANGUAGE_SUCCESS",
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "ADD_LANGUAGE_FAILURE" });
    });
};

export const fetchLanguages = () => (dispatch) => {
  dispatch({ type: "FETCH_LANGUAGES_REQUEST" });

  return axios
    .post("http://localhost:9000/api/show/languages", {
      userID: "603374222f0e88098125a900",
    })
    .then(({ data }) => {
      dispatch({
        type: "FETCH_LANGUAGES_SUCCESS",
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: "FETCH_LANGUAGES_FAILURE" });
    });
};

export const fetchActiveLanguages = () => (dispatch) => {
  dispatch({ type: "FETCH_ACTIVE_LANGUAGES_REQUEST" });

  return axios
    .post("http://localhost:9000/api/show/active/languages", {
      userID: "603374222f0e88098125a900",
    })
    .then(({ data }) => {
      dispatch({
        type: "FETCH_ACTIVE_LANGUAGES_SUCCESS",
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: "FETCH_ACTIVE_LANGUAGES_FAILURE" });
    });
};

export const addToActiveLanguages = (newActiveLanguage) => (dispatch) => {
  dispatch({ type: "ADD_ACTIVE_LANGUAGE_REQUEST" });

  const { _id: languageId, name, chosen } = newActiveLanguage;
  return axios
    .post("http://localhost:9000/api/add/active/language", {
      languageId,
      name,
      chosen,
      userID: "603374222f0e88098125a900",
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: "ADD_ACTIVE_LANGUAGE_SUCCESS",
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "ADD_ACTIVE_LANGUAGE_FAILURE" });
    });
};

export const updateActiveLanguage = (newActiveLanguage, activeLanguageId) => (dispatch) => {
  dispatch({ type: "UPDATE_ACTIVE_LANGUAGES_REQUEST" });

  const { _id: languageId, name, chosen } = newActiveLanguage;
  return axios
    .put(`http://localhost:9000/api/edit/active/language/${activeLanguageId}`, {
      languageId: languageId,
      name: name,
      chosen: chosen,
    })
    .then(({ data }) => {
      dispatch({
        type: "UPDATE_ACTIVE_LANGUAGES_SUCCESS",
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_ACTIVE_LANGUAGES_FAILURE" });
    });
};
