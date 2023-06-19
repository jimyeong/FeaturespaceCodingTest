import React, { useEffect, useReducer } from "react";

export const TYPE_LOAD = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RETRY: "RETRY",
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case TYPE_LOAD.IDLE:
      return {
        ...state,
        status: TYPE_LOAD.IDLE,
      };
    case TYPE_LOAD.LOADING:
      return {
        ...state,
        status: TYPE_LOAD.LOADING,
      };
    case TYPE_LOAD.SUCCESS:
      return {
        ...state,
        status: TYPE_LOAD.SUCCESS,
        data: action.payload,
      };
    case TYPE_LOAD.ERROR:
      return {
        ...state,
        status: TYPE_LOAD.ERROR,
      };
    case TYPE_LOAD.RETRY:
      return {
        ...state,
        status: TYPE_LOAD.RETRY,
      };
    default:
      return state;
  }
};
const initialState = {
  status: TYPE_LOAD.IDLE,
  data: null,
};
export default function useAsync(callback, depth = []) {
  const [asyncState, asyncDispatch] = useReducer(asyncReducer, initialState);

  const fetch = async () => {
    asyncDispatch({ type: TYPE_LOAD.LOADING });
    try {
      const result = await callback();
      asyncDispatch({ type: TYPE_LOAD.SUCCESS, payload: result.data });
    } catch (error) {
      asyncDispatch({ type: TYPE_LOAD.ERROR });
    }
  };

  useEffect(() => {
    fetch();
    return () => {};
  }, depth);

  return { asyncState, asyncDispatch };
}
