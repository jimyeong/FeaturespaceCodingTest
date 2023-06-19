import React from "react";

export const TYPE_MAIN_VALUES = {
  TYPE_TYPING: "TYPE_TYPING",
  TYPE_RESET: "TYPE_RESET",
};

export const initialState = {
  inputFieldId: "searchingPostcode",
  searchingPostcode: "",
};
const { TYPE_TYPING, TYPE_RESET } = TYPE_MAIN_VALUES;
export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_TYPING:
      return {
        ...state,
        inputFieldId: "searchingPostcode",
        searchingPostcode: action.payload.searchingPostcode,
      };
    case TYPE_RESET:
      return initialState;
    default:
      return state;
  }
};
