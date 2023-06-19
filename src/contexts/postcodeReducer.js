export const initialState = {};

export const TYPE_UPDATE = {
  RATING: "RATING",
  SAVE: "SAVE",
  DELETE: "DELETE",
};
export const postcodeReducer = (action, state = initialState) => {
  switch (action.type) {
    // ...
    case TYPE_UPDATE.RATING:
      return state;
    default:
      return state;
  }
};
