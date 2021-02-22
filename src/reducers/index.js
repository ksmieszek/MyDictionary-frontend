const initialState = {
  words: [
    { english: "kitchen", polish: "kuchnia" },
    // { english: "plate", polish: "talerz" },
    // { english: "knee", polish: "kolano" },
    // { english: "bedroom", polish: "sypialnia" },
    // { english: "random", polish: "losowy" },
    // { english: "game", polish: "gra" },
    // { english: "mom", polish: "mama" },
    // { english: "car", polish: "auto" },
    // { english: "eye", polish: "oko" },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WORDS":
      return {
        ...state,
        words: [...state.words, action.payload.item],
      };
    default:
      return state;
  }
};

export default rootReducer;
