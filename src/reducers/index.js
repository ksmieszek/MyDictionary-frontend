import actionName from "utilities/ReduxActionNames";

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
    case actionName.LOGIN_SUCCESS:
      localStorage.setItem("userID", `${action.payload.data[0]._id}`);
      state = {
        ...state,
        userID: action.payload.data[0]._id,
      };
      break;

    case actionName.LOGOUT_SUCCESS:
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

    case actionName.ADD_WORDS_SUCCESS:
      state = {
        ...state,
        words: [...state.words, action.payload.data],
      };
      break;

    case actionName.FETCH_WORDS_SUCCESS:
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

    case actionName.UPDATE_WORDS_SUCCESS:
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

    case actionName.DELETE_WORDS_SUCCESS:
      state = {
        ...state,
        words: [...state.words.filter((item) => item._id !== action.payload.wordsId)],
      };
      break;

    case actionName.ADD_LANGUAGE_SUCCESS:
      state = {
        ...state,
        languages: [...state.languages, action.payload.data],
      };
      break;

    case actionName.FETCH_LANGUAGES_SUCCESS:
      state = {
        ...state,
        languages: [...action.payload.data],
      };
      break;

    case actionName.UPDATE_LANGUAGE_SUCCESS:
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

    case actionName.DELETE_LANGUAGE_SUCCESS:
      state = {
        ...state,
        languages: [...state.languages.filter((item) => item._id !== action.payload.languageId)],
      };
      break;

    case actionName.ADD_ACTIVE_LANGUAGE_SUCCESS:
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

    case actionName.FETCH_ACTIVE_LANGUAGES_SUCCESS:
      const firstActive = action.payload.data.find((item) => item.chosen === "activeLanguageFirst");
      const secondActive = action.payload.data.find((item) => item.chosen === "activeLanguageSecond");
      state = {
        ...state,
        activeLanguageFirst: firstActive !== undefined ? firstActive : {},
        activeLanguageSecond: secondActive !== undefined ? secondActive : {},
      };
      break;

    case actionName.UPDATE_ACTIVE_LANGUAGES_SUCCESS:
      state = {
        ...state,
        activeLanguageFirst: state.activeLanguageFirst.chosen === action.payload.data.chosen ? action.payload.data : state.activeLanguageFirst,
        activeLanguageSecond: state.activeLanguageSecond.chosen === action.payload.data.chosen ? action.payload.data : state.activeLanguageSecond,
      };
      break;

    case actionName.DELETE_ACTIVE_LANGUAGES_SUCCESS:
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

    case actionName.ADD_PHOTO_SUCCESS:
      state = {
        ...state,
        photos: [...state.photos, action.payload.data],
      };
      break;

    case actionName.FETCH_PHOTOS_SUCCESS:
      state = {
        ...state,
        photos: [...action.payload.data],
      };
      break;

    case actionName.UPDATE_PHOTO_SUCCESS:
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

    case actionName.DELETE_PHOTO_SUCCESS:
      state = {
        ...state,
        photos: [...state.photos.filter((item) => item._id !== action.payload.photoId)],
      };
      break;

    case actionName.ADD_TEXTS_SUCCESS:
      state = {
        ...state,
        texts: [...state.texts, action.payload.data],
      };
      break;

    case actionName.FETCH_TEXTS_SUCCESS:
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

    case actionName.UPDATE_TEXTS_SUCCESS:
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

    case actionName.DELETE_TEXTS_SUCCESS:
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
