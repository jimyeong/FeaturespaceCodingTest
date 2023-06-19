import React, { useContext, createContext, useReducer } from "react";
import { postcodeReducer, initialState } from "./postcodeReducer";
import { useNavigate } from "react-router-dom";

const postcodeContext = createContext();
export const usePostcodeContext = () => {
  const contextValue = useContext(postcodeContext);
  if (!contextValue) {
    throw Error("this context is supposed to be used within PostcodeContext");
  }
  return contextValue;
};

export default function PostcodeContextProvider(props) {
  const navigate = useNavigate();
  const [postcodeContextState, postcodeContextDispatch] = useReducer(
    postcodeReducer,
    initialState
  );
  const updateContextState = (action) => {
    postcodeContextDispatch(action);
  };
  return (
    <postcodeContext.Provider
      value={{ postcodeContextState, updateContextState, navigate }}
      {...props}
    />
  );
}
