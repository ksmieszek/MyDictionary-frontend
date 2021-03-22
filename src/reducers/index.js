import {
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
} from "../actions/index";

const initialState = {
  words: [],
  languages: [],
  activeLanguageFirst: {},
  activeLanguageSecond: {},
  photos: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default rootReducer;
