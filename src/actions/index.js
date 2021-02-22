export const addWords = (words) => {
  return {
    type: "ADD_WORDS",
    payload: {
      item: {
        ...words,
      },
    },
  };
};
