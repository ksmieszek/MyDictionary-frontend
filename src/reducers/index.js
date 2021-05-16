import {
  // LOGIN_REQUEST,
  LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  // LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  // LOGOUT_FAILURE,
  // FETCH_WORDS_REQUEST,
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
  // FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  // FETCH_PHOTOS_FAILURE,
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
  // UPDATE_LANGUAGE_REQUEST,
  UPDATE_LANGUAGE_SUCCESS,
  // UPDATE_LANGUAGE_FAILURE,
  // UPDATE_WORDS_REQUEST,
  UPDATE_WORDS_SUCCESS,
  // UPDATE_WORDS_FAILURE,
  // UPDATE_PHOTO_REQUEST,
  UPDATE_PHOTO_SUCCESS,
  // UPDATE_PHOTO_FAILURE,
  // UPDATE_TEXTS_REQUEST,
  UPDATE_TEXTS_SUCCESS,
  // UPDATE_TEXTS_FAILURE,
} from "actions/index";

const initialState = {
  userID: localStorage.getItem("userID") || "",
  words: [],
  languages: [],
  activeLanguageFirst: {},
  activeLanguageSecond: {},
  photos: [],
  texts: [],
  loadingElements: 0,
};

const rootReducer = (state = initialState, action) => {
  if (action.type.includes("REQUEST")) {
    state = { ...state, loadingElements: state.loadingElements + 1 };
  }
  if (action.type.includes("SUCCESS") || action.type.includes("FAILURE")) {
    state = { ...state, loadingElements: state.loadingElements - 1 };
  }

  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("userID", `${action.payload.data._id}`);
      state = {
        ...state,
        userID: action.payload.data._id,
      };
      break;

    case LOGOUT_SUCCESS:
      localStorage.removeItem("userID");
      state = {
        userID: "",
        words: [],
        languages: [],
        activeLanguageFirst: {},
        activeLanguageSecond: {},
        photos: [],
        texts: [],
        loadingElements: 0,
      };
      break;

    case ADD_WORDS_SUCCESS:
      state = {
        ...state,
        words: [...state.words, action.payload.data],
      };
      break;

    case FETCH_WORDS_SUCCESS:
      const wordsAlreadyInState = state.words.find((item) => item._id === action.payload.data[0]._id);
      if (wordsAlreadyInState !== undefined)
        state = {
          ...state,
        };
      else {
        state = {
          ...state,
          words: [...state.words, ...action.payload.data],
        };
      }
      break;

    case UPDATE_WORDS_SUCCESS:
      state = {
        ...state,
        words: [
          ...state.words.map((item) => {
            if (item._id !== action.payload.data._id) return item;
            else return action.payload.data;
          }),
        ],
      };
      break;

    case DELETE_WORDS_SUCCESS:
      state = {
        ...state,
        words: [...state.words.filter((item) => item._id !== action.payload.wordsId)],
      };
      break;

    case ADD_LANGUAGE_SUCCESS:
      state = {
        ...state,
        languages: [...state.languages, action.payload.data],
      };
      break;

    case FETCH_LANGUAGES_SUCCESS:
      state = {
        ...state,
        languages: [...action.payload.data],
      };
      break;

    case UPDATE_LANGUAGE_SUCCESS:
      state = {
        ...state,
        languages: [
          ...state.languages.map((item) => {
            if (item._id !== action.payload.data._id) return item;
            else return action.payload.data;
          }),
        ],
      };
      break;

    case DELETE_LANGUAGE_SUCCESS:
      state = {
        ...state,
        languages: [...state.languages.filter((item) => item._id !== action.payload.languageId)],
      };
      break;

    case ADD_ACTIVE_LANGUAGE_SUCCESS:
      if ("activeLanguageFirst" === action.payload.data.chosen)
        state = {
          ...state,
          activeLanguageFirst: action.payload.data,
        };
      else if ("activeLanguageSecond" === action.payload.data.chosen)
        state = {
          ...state,
          activeLanguageSecond: action.payload.data,
        };
      else
        state = {
          ...state,
        };
      break;

    case FETCH_ACTIVE_LANGUAGES_SUCCESS:
      const firstActive = action.payload.data.find((item) => item.chosen === "activeLanguageFirst");
      const secondActive = action.payload.data.find((item) => item.chosen === "activeLanguageSecond");
      state = {
        ...state,
        activeLanguageFirst: firstActive !== undefined ? firstActive : {},
        activeLanguageSecond: secondActive !== undefined ? secondActive : {},
      };
      break;

    case UPDATE_ACTIVE_LANGUAGES_SUCCESS:
      state = {
        ...state,
        activeLanguageFirst: state.activeLanguageFirst.chosen === action.payload.data.chosen ? action.payload.data : state.activeLanguageFirst,
        activeLanguageSecond: state.activeLanguageSecond.chosen === action.payload.data.chosen ? action.payload.data : state.activeLanguageSecond,
      };
      break;

    case DELETE_ACTIVE_LANGUAGES_SUCCESS:
      if (state.activeLanguageFirst._id === action.payload.activeLanguageId)
        state = {
          ...state,
          activeLanguageFirst: {},
        };
      else if (state.activeLanguageSecond._id === action.payload.activeLanguageId)
        state = {
          ...state,
          activeLanguageSecond: {},
        };
      else
        state = {
          ...state,
        };
      break;

    case ADD_PHOTO_SUCCESS:
      state = {
        ...state,
        photos: [...state.photos, action.payload.data],
      };
      break;

    case FETCH_PHOTOS_SUCCESS:
      state = {
        ...state,
        photos: [...action.payload.data],
      };
      break;

    case UPDATE_PHOTO_SUCCESS:
      state = {
        ...state,
        photos: [
          ...state.photos.map((item) => {
            if (item._id !== action.payload.data._id) return item;
            else return action.payload.data;
          }),
        ],
      };
      break;

    case DELETE_PHOTO_SUCCESS:
      state = {
        ...state,
        photos: [...state.photos.filter((item) => item._id !== action.payload.photoId)],
      };
      break;

    case ADD_TEXTS_SUCCESS:
      state = {
        ...state,
        texts: [...state.texts, action.payload.data],
      };
      break;

    case FETCH_TEXTS_SUCCESS:
      const textAlreadyInState = state.texts.find((item) => item._id === action.payload.data[0]._id);
      if (textAlreadyInState !== undefined)
        state = {
          ...state,
        };
      else {
        state = {
          ...state,
          texts: [...state.texts, ...action.payload.data],
        };
      }
      break;

    case UPDATE_TEXTS_SUCCESS:
      state = {
        ...state,
        texts: [
          ...state.texts.map((item) => {
            if (item._id !== action.payload.data._id) return item;
            else return action.payload.data;
          }),
        ],
      };
      break;

    case DELETE_TEXTS_SUCCESS:
      state = {
        ...state,
        texts: [...state.texts.filter((item) => item._id !== action.payload.textsId)],
      };
      break;

    default:
      return state;
  }
  return state;
};

export default rootReducer;
