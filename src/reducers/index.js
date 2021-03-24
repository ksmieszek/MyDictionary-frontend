import {
  // LOGIN_REQUEST,
  LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  // LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  // LOGOUT_FAILURE,
  FETCH_WORDS_REQUEST,
  FETCH_WORDS_SUCCESS,
  // FETCH_WORDS_FAILURE,
  // ADD_WORDS_REQUEST,
  ADD_WORDS_SUCCESS,
  // ADD_WORDS_FAILURE,
  // DELETE_WORDS_REQUEST,
  DELETE_WORDS_SUCCESS,
  // DELETE_WORDS_FAILURE,
  // FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  // FETCH_LANGUAGES_FAILURE,
  // ADD_LANGUAGE_REQUEST,
  ADD_LANGUAGE_SUCCESS,
  // ADD_LANGUAGE_FAILURE,
  // FETCH_ACTIVE_LANGUAGES_REQUEST,
  // DELETE_LANGUAGE_REQUEST,
  DELETE_LANGUAGE_SUCCESS,
  // DELETE_LANGUAGE_FAILURE,
  FETCH_ACTIVE_LANGUAGES_SUCCESS,
  // FETCH_ACTIVE_LANGUAGES_FAILURE,
  // ADD_ACTIVE_LANGUAGE_REQUEST,
  ADD_ACTIVE_LANGUAGE_SUCCESS,
  // ADD_ACTIVE_LANGUAGE_FAILURE,
  // UPDATE_ACTIVE_LANGUAGES_REQUEST,
  UPDATE_ACTIVE_LANGUAGES_SUCCESS,
  // UPDATE_ACTIVE_LANGUAGES_FAILURE,
  // DELETE_ACTIVE_LANGUAGES_REQUEST,
  DELETE_ACTIVE_LANGUAGES_SUCCESS,
  // DELETE_ACTIVE_LANGUAGES_FAILURE,
  // ADD_PHOTO_REQUEST,
  ADD_PHOTO_SUCCESS,
  // ADD_PHOTO_FAILURE,
  // FETCH_PHOTO_REQUEST,
  FETCH_PHOTO_SUCCESS,
  // FETCH_PHOTO_FAILURE,
  // DELETE_PHOTO_REQUEST,
  DELETE_PHOTO_SUCCESS,
  // DELETE_PHOTO_FAILURE,
  // ADD_TEXTS_REQUEST,
  ADD_TEXTS_SUCCESS,
  // ADD_TEXTS_FAILURE,
  // FETCH_TEXTS_REQUEST,
  FETCH_TEXTS_SUCCESS,
  // FETCH_TEXTS_FAILURE,
  // DELETE_TEXTS_REQUEST,
  DELETE_TEXTS_SUCCESS,
  // DELETE_TEXTS_FAILURE,
} from "actions/index";

const initialState = {
  userID: localStorage.getItem("userID") || "",
  words: [],
  languages: [],
  activeLanguageFirst: {},
  activeLanguageSecond: {},
  photos: [],
  texts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("userID", `${action.payload.data._id}`);
      return {
        ...state,
        userID: action.payload.data._id,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("userID");
      return {
        userID: "",
        words: [],
        languages: [],
        activeLanguageFirst: {},
        activeLanguageSecond: {},
        photos: [],
        texts: [],
      };
    case FETCH_WORDS_REQUEST:
      return {
        ...state,
      };
    case ADD_WORDS_SUCCESS:
      return {
        ...state,
        words: [...state.words, action.payload.data],
      };
    case FETCH_WORDS_SUCCESS:
      const isAlreadyInState = state.words.find((item) => item._id === action.payload.data[0]._id);
      if (isAlreadyInState !== undefined)
        return {
          ...state,
        };

      return {
        ...state,
        words: [...state.words, ...action.payload.data],
      };
    case DELETE_WORDS_SUCCESS:
      return {
        ...state,
        words: [...state.words.filter((item) => item._id !== action.payload.wordsId)],
      };
    case ADD_LANGUAGE_SUCCESS:
      return {
        ...state,
        languages: [...state.languages, action.payload.data],
      };
    case FETCH_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: [...action.payload.data],
      };
    case DELETE_LANGUAGE_SUCCESS:
      return {
        ...state,
        languages: [...state.languages.filter((item) => item._id !== action.payload.languageId)],
      };
    case FETCH_ACTIVE_LANGUAGES_SUCCESS:
      const firstActive = action.payload.data.find((item) => item.chosen === "activeLanguageFirst");
      const secondActive = action.payload.data.find((item) => item.chosen === "activeLanguageSecond");
      return {
        ...state,
        activeLanguageFirst: firstActive !== undefined ? firstActive : {},
        activeLanguageSecond: secondActive !== undefined ? secondActive : {},
      };
    case ADD_ACTIVE_LANGUAGE_SUCCESS:
      if ("activeLanguageFirst" === action.payload.data.chosen)
        return {
          ...state,
          activeLanguageFirst: action.payload.data,
        };
      else if ("activeLanguageSecond" === action.payload.data.chosen)
        return {
          ...state,
          activeLanguageSecond: action.payload.data,
        };
      else
        return {
          ...state,
        };
    case UPDATE_ACTIVE_LANGUAGES_SUCCESS:
      return {
        ...state,
        activeLanguageFirst: state.activeLanguageFirst.chosen === action.payload.data.chosen ? action.payload.data : state.activeLanguageFirst,
        activeLanguageSecond: state.activeLanguageSecond.chosen === action.payload.data.chosen ? action.payload.data : state.activeLanguageSecond,
      };
    case DELETE_ACTIVE_LANGUAGES_SUCCESS:
      if (state.activeLanguageFirst._id === action.payload.activeLanguageId)
        return {
          ...state,
          activeLanguageFirst: {},
        };
      else if (state.activeLanguageSecond._id === action.payload.activeLanguageId)
        return {
          ...state,
          activeLanguageSecond: {},
        };
      else
        return {
          ...state,
        };
    case ADD_PHOTO_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, action.payload.data],
      };
    case FETCH_PHOTO_SUCCESS:
      return {
        ...state,
        photos: [...action.payload.data],
      };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        photos: [...state.photos.filter((item) => item._id !== action.payload.photoId)],
      };

    case ADD_TEXTS_SUCCESS:
      return {
        ...state,
        texts: [...state.texts, action.payload.data],
      };
    case FETCH_TEXTS_SUCCESS:
      const textAlreadyInState = state.texts.find((item) => item._id === action.payload.data[0]._id);
      if (textAlreadyInState !== undefined)
        return {
          ...state,
        };

      return {
        ...state,
        texts: [...state.texts, ...action.payload.data],
      };
    case DELETE_TEXTS_SUCCESS:
      return {
        ...state,
        texts: [...state.texts.filter((item) => item._id !== action.payload.textsId)],
      };

    default:
      return state;
  }
};

export default rootReducer;
