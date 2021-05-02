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

export const DELETE_LANGUAGE_REQUEST = "DELETE_LANGUAGE_REQUEST";
export const DELETE_LANGUAGE_SUCCESS = "DELETE_LANGUAGE_SUCCESS";
export const DELETE_LANGUAGE_FAILURE = "DELETE_LANGUAGE_FAILURE";

export const FETCH_ACTIVE_LANGUAGES_REQUEST = "FETCH_ACTIVE_LANGUAGES_REQUEST";
export const FETCH_ACTIVE_LANGUAGES_SUCCESS = "FETCH_ACTIVE_LANGUAGES_SUCCESS";
export const FETCH_ACTIVE_LANGUAGES_FAILURE = "FETCH_ACTIVE_LANGUAGES_FAILURE";

export const ADD_ACTIVE_LANGUAGE_REQUEST = "ADD_ACTIVE_LANGUAGE_REQUEST";
export const ADD_ACTIVE_LANGUAGE_SUCCESS = "ADD_ACTIVE_LANGUAGE_SUCCESS";
export const ADD_ACTIVE_LANGUAGE_FAILURE = "ADD_ACTIVE_LANGUAGE_FAILURE";

export const UPDATE_ACTIVE_LANGUAGES_REQUEST = "UPDATE_ACTIVE_LANGUAGES_REQUEST";
export const UPDATE_ACTIVE_LANGUAGES_SUCCESS = "UPDATE_ACTIVE_LANGUAGES_SUCCESS";
export const UPDATE_ACTIVE_LANGUAGES_FAILURE = "UPDATE_ACTIVE_LANGUAGES_FAILURE";

export const DELETE_ACTIVE_LANGUAGES_REQUEST = "DELETE_ACTIVE_LANGUAGES_REQUEST";
export const DELETE_ACTIVE_LANGUAGES_SUCCESS = "DELETE_ACTIVE_LANGUAGES_SUCCESS";
export const DELETE_ACTIVE_LANGUAGES_FAILURE = "DELETE_ACTIVE_LANGUAGES_FAILURE";

export const ADD_PHOTO_REQUEST = "ADD_PHOTO_REQUEST";
export const ADD_PHOTO_SUCCESS = "ADD_PHOTO_SUCCESS";
export const ADD_PHOTO_FAILURE = "ADD_PHOTO_FAILURE";

export const FETCH_PHOTOS_REQUEST = "FETCH_PHOTOS_REQUEST";
export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
export const FETCH_PHOTOS_FAILURE = "FETCH_PHOTOS_FAILURE";

export const DELETE_PHOTO_REQUEST = "DELETE_PHOTO_REQUEST";
export const DELETE_PHOTO_SUCCESS = "DELETE_PHOTO_SUCCESS";
export const DELETE_PHOTO_FAILURE = "DELETE_PHOTO_FAILURE";

export const ADD_TEXTS_REQUEST = "ADD_TEXTS_REQUEST";
export const ADD_TEXTS_SUCCESS = "ADD_TEXTS_SUCCESS";
export const ADD_TEXTS_FAILURE = "ADD_TEXTS_FAILURE";

export const FETCH_TEXTS_REQUEST = "FETCH_TEXTS_REQUEST";
export const FETCH_TEXTS_SUCCESS = "FETCH_TEXTS_SUCCESS";
export const FETCH_TEXTS_FAILURE = "FETCH_TEXTS_FAILURE";

export const DELETE_TEXTS_REQUEST = "DELETE_TEXTS_REQUEST";
export const DELETE_TEXTS_SUCCESS = "DELETE_TEXTS_SUCCESS";
export const DELETE_TEXTS_FAILURE = "DELETE_TEXTS_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const login = (username, password) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return axios
    .post("http://localhost:9000/api/user/login", {
      username,
      password,
    })
    .then((payload) => {
      dispatch({ type: LOGIN_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const logout = () => (dispatch) => {
  return dispatch({ type: LOGOUT_SUCCESS, undefined });
};

export const addWords = (words) => (dispatch, getState) => {
  dispatch({ type: ADD_WORDS_REQUEST });

  const { firstWord, secondWord, firstLanguage, secondLanguage } = words;
  return axios
    .post("http://localhost:9000/api/add/words", {
      firstWord,
      secondWord,
      firstLanguage,
      secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: ADD_WORDS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_WORDS_FAILURE });
    });
};

export const fetchWords = (firstLanguage, secondLanguage) => (dispatch, getState) => {
  dispatch({ type: FETCH_WORDS_REQUEST });

  return axios
    .post("http://localhost:9000/api/show/words", {
      firstLanguage: firstLanguage,
      secondLanguage: secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_WORDS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: FETCH_WORDS_FAILURE });
    });
};

export const deleteWords = (wordsId) => (dispatch) => {
  dispatch({ type: DELETE_WORDS_REQUEST });

  return axios
    .delete(`http://localhost:9000/api/delete/words/${wordsId}`)
    .then(() => {
      dispatch({
        type: DELETE_WORDS_SUCCESS,
        payload: {
          wordsId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_WORDS_FAILURE });
    });
};

export const addLanguage = ({ name }) => (dispatch, getState) => {
  dispatch({ type: ADD_LANGUAGE_REQUEST });

  return axios
    .post("http://localhost:9000/api/add/language", {
      name,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: ADD_LANGUAGE_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_LANGUAGE_FAILURE });
    });
};

export const fetchLanguages = () => (dispatch, getState) => {
  dispatch({ type: FETCH_LANGUAGES_REQUEST });

  return axios
    .post("http://localhost:9000/api/show/languages", {
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_LANGUAGES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_LANGUAGES_FAILURE });
    });
};

export const deleteLanguage = (languageId) => (dispatch) => {
  dispatch({ type: DELETE_LANGUAGE_REQUEST });

  return axios
    .delete(`http://localhost:9000/api/delete/language/${languageId}`)
    .then(() => {
      dispatch({
        type: DELETE_LANGUAGE_SUCCESS,
        payload: {
          languageId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_LANGUAGE_FAILURE });
    });
};

export const addToActiveLanguages = (newActiveLanguage) => (dispatch, getState) => {
  const { _id: languageId, name, chosen } = newActiveLanguage;

  dispatch({ type: ADD_ACTIVE_LANGUAGE_REQUEST });

  return axios
    .post("http://localhost:9000/api/add/active/language", {
      languageId,
      name,
      chosen,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: ADD_ACTIVE_LANGUAGE_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_ACTIVE_LANGUAGE_FAILURE });
    });
};

export const fetchActiveLanguages = () => (dispatch, getState) => {
  dispatch({ type: FETCH_ACTIVE_LANGUAGES_REQUEST });

  return axios
    .post("http://localhost:9000/api/show/active/languages", {
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_ACTIVE_LANGUAGES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_ACTIVE_LANGUAGES_FAILURE });
    });
};

export const deleteActiveLanguage = (activeLanguageId) => (dispatch) => {
  dispatch({ type: DELETE_ACTIVE_LANGUAGES_REQUEST });

  return axios
    .delete(`http://localhost:9000/api/delete/active/language/${activeLanguageId}`)
    .then(() => {
      dispatch({
        type: DELETE_ACTIVE_LANGUAGES_SUCCESS,
        payload: {
          activeLanguageId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_ACTIVE_LANGUAGES_FAILURE });
    });
};

export const updateActiveLanguage = (newActiveLanguage, activeLanguageId) => (dispatch) => {
  const { _id: languageId, name, chosen } = newActiveLanguage;

  dispatch({ type: UPDATE_ACTIVE_LANGUAGES_REQUEST });

  return axios
    .put(`http://localhost:9000/api/edit/active/language/${activeLanguageId}`, {
      languageId: languageId,
      name: name,
      chosen: chosen,
    })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_ACTIVE_LANGUAGES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: UPDATE_ACTIVE_LANGUAGES_FAILURE });
    });
};

export const addPhoto = ({ photoSource, title, description }) => (dispatch, getState) => {
  dispatch({ type: ADD_PHOTO_REQUEST });

  return axios
    .post("http://localhost:9000/api/add/photo", {
      photoSource,
      title,
      description,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: ADD_PHOTO_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_PHOTO_FAILURE });
    });
};

export const fetchPhotos = () => (dispatch, getState) => {
  dispatch({ type: FETCH_PHOTOS_REQUEST });

  return axios
    .post("http://localhost:9000/api/show/photos", {
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_PHOTOS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_PHOTOS_FAILURE });
    });
};

export const deletePhoto = (photoId) => (dispatch) => {
  dispatch({ type: DELETE_PHOTO_REQUEST });

  return axios
    .delete(`http://localhost:9000/api/delete/photo/${photoId}`)
    .then(() => {
      dispatch({
        type: DELETE_PHOTO_SUCCESS,
        payload: {
          photoId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_PHOTO_FAILURE });
    });
};

export const addTexts = (texts) => (dispatch, getState) => {
  dispatch({ type: ADD_TEXTS_REQUEST });

  const { title, firstText, secondText, firstLanguage, secondLanguage } = texts;
  return axios
    .post("http://localhost:9000/api/add/texts", {
      title,
      firstText,
      secondText,
      firstLanguage,
      secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: ADD_TEXTS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_TEXTS_FAILURE });
    });
};

export const fetchTexts = (firstLanguage, secondLanguage) => (dispatch, getState) => {
  dispatch({ type: FETCH_TEXTS_REQUEST });

  return axios
    .post("http://localhost:9000/api/show/texts", {
      firstLanguage: firstLanguage,
      secondLanguage: secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_TEXTS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: FETCH_TEXTS_FAILURE });
    });
};

export const deleteTexts = (textsId) => (dispatch) => {
  dispatch({ type: DELETE_TEXTS_REQUEST });

  return axios
    .delete(`http://localhost:9000/api/delete/texts/${textsId}`)
    .then(() => {
      dispatch({
        type: DELETE_TEXTS_SUCCESS,
        payload: {
          textsId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_TEXTS_FAILURE });
    });
};
