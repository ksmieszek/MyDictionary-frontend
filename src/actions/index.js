import axios from "axios";
import action from "utilities/ReduxActionNames";

export const signUp = (username, password) => (dispatch) => {
  dispatch({ type: action.SIGNUP_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/user/register", {
      username,
      password,
    })
    .then((payload) => {
      dispatch({ type: action.SIGNUP_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.SIGNUP_FAILURE });
    });
};

export const login = (username, password) => (dispatch) => {
  dispatch({ type: action.LOGIN_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/user/login", {
      username,
      password,
    })
    .then((payload) => {
      dispatch({ type: action.LOGIN_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.LOGIN_FAILURE });
    });
};

export const logout = () => (dispatch) => {
  return dispatch({ type: action.LOGOUT_SUCCESS, undefined });
};

export const addWords = (words) => (dispatch, getState) => {
  dispatch({ type: action.ADD_WORDS_REQUEST });

  const { firstWord, secondWord, firstLanguage, secondLanguage } = words;
  return axios
    .post("https://mydictionarystrapi.herokuapp.com/add/words", {
      firstWord,
      secondWord,
      firstLanguage,
      secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.ADD_WORDS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.ADD_WORDS_FAILURE });
    });
};

export const fetchWords = (firstLanguage, secondLanguage) => (dispatch, getState) => {
  dispatch({ type: action.FETCH_WORDS_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/show/words", {
      firstLanguage,
      secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.FETCH_WORDS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: action.FETCH_WORDS_FAILURE });
    });
};

export const editWords =
  ({ wordsId, firstWord, secondWord, firstLanguage, secondLanguage }) =>
  (dispatch, getState) => {
    dispatch({ type: action.UPDATE_WORDS_REQUEST });

    return axios
      .put(`https://mydictionarystrapi.herokuapp.com/edit/words/${wordsId}`, {
        _id: wordsId,
        firstWord,
        secondWord,
        firstLanguage,
        secondLanguage,
        userID: getState().userID,
      })
      .then(({ data }) => {
        dispatch({
          type: action.UPDATE_WORDS_SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: action.UPDATE_WORDS_FAILURE });
      });
  };

export const deleteWords = (wordsId) => (dispatch) => {
  dispatch({ type: action.DELETE_WORDS_REQUEST });

  return axios
    .delete(`https://mydictionarystrapi.herokuapp.com/delete/words/${wordsId}`)
    .then(() => {
      dispatch({
        type: action.DELETE_WORDS_SUCCESS,
        payload: {
          wordsId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.DELETE_WORDS_FAILURE });
    });
};

export const addLanguage =
  ({ name }) =>
  (dispatch, getState) => {
    dispatch({ type: action.ADD_LANGUAGE_REQUEST });

    return axios
      .post("https://mydictionarystrapi.herokuapp.com/add/language", {
        name,
        userID: getState().userID,
      })
      .then(({ data }) => {
        dispatch({
          type: action.ADD_LANGUAGE_SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: action.ADD_LANGUAGE_FAILURE });
      });
  };

export const fetchLanguages = () => (dispatch, getState) => {
  dispatch({ type: action.FETCH_LANGUAGES_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/show/languages", {
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.FETCH_LANGUAGES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.FETCH_LANGUAGES_FAILURE });
    });
};

export const editLanguage = (name, languageId) => (dispatch, getState) => {
  dispatch({ type: action.UPDATE_LANGUAGE_REQUEST });

  return axios
    .put(`https://mydictionarystrapi.herokuapp.com/edit/language/${languageId}`, {
      _id: languageId,
      name,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.UPDATE_LANGUAGE_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.UPDATE_LANGUAGE_FAILURE });
    });
};

export const deleteLanguage = (languageId) => (dispatch) => {
  dispatch({ type: action.DELETE_LANGUAGE_REQUEST });

  return axios
    .delete(`https://mydictionarystrapi.herokuapp.com/delete/language/${languageId}`)
    .then(() => {
      dispatch({
        type: action.DELETE_LANGUAGE_SUCCESS,
        payload: {
          languageId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.DELETE_LANGUAGE_FAILURE });
    });
};

export const addActiveLanguages = (newActiveLanguage) => (dispatch, getState) => {
  const { _id: languageId, name, chosen } = newActiveLanguage;

  dispatch({ type: action.ADD_ACTIVE_LANGUAGE_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/add/active/language", {
      languageId,
      name,
      chosen,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.ADD_ACTIVE_LANGUAGE_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.ADD_ACTIVE_LANGUAGE_FAILURE });
    });
};

export const fetchActiveLanguages = () => (dispatch, getState) => {
  dispatch({ type: action.FETCH_ACTIVE_LANGUAGES_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/show/active/languages", {
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.FETCH_ACTIVE_LANGUAGES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.FETCH_ACTIVE_LANGUAGES_FAILURE });
    });
};

export const editActiveLanguage = (newActiveLanguage, activeLanguageId) => (dispatch) => {
  const { languageId, name, chosen } = newActiveLanguage;

  dispatch({ type: action.UPDATE_ACTIVE_LANGUAGES_REQUEST });

  return axios
    .put(`https://mydictionarystrapi.herokuapp.com/edit/active/language/${activeLanguageId}`, {
      languageId,
      name,
      chosen,
    })
    .then(({ data }) => {
      dispatch({
        type: action.UPDATE_ACTIVE_LANGUAGES_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.UPDATE_ACTIVE_LANGUAGES_FAILURE });
    });
};

export const deleteActiveLanguage = (activeLanguageId) => (dispatch) => {
  dispatch({ type: action.DELETE_ACTIVE_LANGUAGES_REQUEST });

  return axios
    .delete(`https://mydictionarystrapi.herokuapp.com/delete/active/language/${activeLanguageId}`)
    .then(() => {
      dispatch({
        type: action.DELETE_ACTIVE_LANGUAGES_SUCCESS,
        payload: {
          activeLanguageId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.DELETE_ACTIVE_LANGUAGES_FAILURE });
    });
};

export const addPhoto =
  ({ photoSource, photoName, title, description }) =>
  (dispatch, getState) => {
    dispatch({ type: action.ADD_PHOTO_REQUEST });

    return axios
      .post("https://mydictionarystrapi.herokuapp.com/add/photo", {
        photoSource,
        photoName,
        title,
        description,
        userID: getState().userID,
      })
      .then(({ data }) => {
        dispatch({
          type: action.ADD_PHOTO_SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: action.ADD_PHOTO_FAILURE });
      });
  };

export const fetchPhotos = () => (dispatch, getState) => {
  dispatch({ type: action.FETCH_PHOTOS_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/show/photos", {
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.FETCH_PHOTOS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.FETCH_PHOTOS_FAILURE });
    });
};

export const editPhoto =
  ({ photoId, photoSource, photoName, title, description }) =>
  (dispatch, getState) => {
    dispatch({ type: action.UPDATE_PHOTO_REQUEST });

    return axios
      .put(`https://mydictionarystrapi.herokuapp.com/edit/photo/${photoId}`, {
        _id: photoId,
        photoSource,
        photoName,
        title,
        description,
        userID: getState().userID,
      })
      .then(({ data }) => {
        dispatch({
          type: action.UPDATE_PHOTO_SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: action.UPDATE_PHOTO_FAILURE });
      });
  };

export const deletePhoto = (photoId) => (dispatch) => {
  dispatch({ type: action.DELETE_PHOTO_REQUEST });

  return axios
    .delete(`https://mydictionarystrapi.herokuapp.com/delete/photo/${photoId}`)
    .then(() => {
      dispatch({
        type: action.DELETE_PHOTO_SUCCESS,
        payload: {
          photoId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.DELETE_PHOTO_FAILURE });
    });
};

export const addTexts = (texts) => (dispatch, getState) => {
  dispatch({ type: action.ADD_TEXTS_REQUEST });

  const { title, firstText, secondText, firstLanguage, secondLanguage } = texts;
  return axios
    .post("https://mydictionarystrapi.herokuapp.com/add/texts", {
      title,
      firstText,
      secondText,
      firstLanguage,
      secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.ADD_TEXTS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.ADD_TEXTS_FAILURE });
    });
};

export const fetchTexts = (firstLanguage, secondLanguage) => (dispatch, getState) => {
  dispatch({ type: action.FETCH_TEXTS_REQUEST });

  return axios
    .post("https://mydictionarystrapi.herokuapp.com/show/texts", {
      firstLanguage,
      secondLanguage,
      userID: getState().userID,
    })
    .then(({ data }) => {
      dispatch({
        type: action.FETCH_TEXTS_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: action.FETCH_TEXTS_FAILURE });
    });
};

export const editTexts =
  ({ textsId, title, firstText, secondText, firstLanguage, secondLanguage }) =>
  (dispatch, getState) => {
    dispatch({ type: action.UPDATE_TEXTS_REQUEST });

    return axios
      .put(`https://mydictionarystrapi.herokuapp.com/edit/texts/${textsId}`, {
        _id: textsId,
        title,
        firstText,
        secondText,
        firstLanguage,
        secondLanguage,
        userID: getState().userID,
      })
      .then(({ data }) => {
        dispatch({
          type: action.UPDATE_TEXTS_SUCCESS,
          payload: {
            data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: action.UPDATE_TEXTS_FAILURE });
      });
  };

export const deleteTexts = (textsId) => (dispatch) => {
  dispatch({ type: action.DELETE_TEXTS_REQUEST });

  return axios
    .delete(`https://mydictionarystrapi.herokuapp.com/delete/texts/${textsId}`)
    .then(() => {
      dispatch({
        type: action.DELETE_TEXTS_SUCCESS,
        payload: {
          textsId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: action.DELETE_TEXTS_FAILURE });
    });
};
