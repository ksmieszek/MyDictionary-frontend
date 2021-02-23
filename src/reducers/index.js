// const initialState = {
//   words: [
//     { english: "kitchen", polish: "kuchnia" },
//     // { english: "plate", polish: "talerz" },
//     // { english: "knee", polish: "kolano" },
//     // { english: "bedroom", polish: "sypialnia" },
//     // { english: "random", polish: "losowy" },
//     // { english: "game", polish: "gra" },
//     // { english: "mom", polish: "mama" },
//     // { english: "car", polish: "auto" },
//     // { english: "eye", polish: "oko" },
//   ],
// };

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_WORDS_SUCCESS":
      return {
        ...state,
        words: [...state.words, action.payload.data],
      };
    case "FETCH_REQUEST":
      return {
        ...state,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        words: [...action.payload.data],
      };

    default:
      return state;
  }
};

export default rootReducer;
