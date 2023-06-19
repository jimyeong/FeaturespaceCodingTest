import React, { useState, useReducer, useCallback } from "react";
import styled from "styled-components";
import { Wrapper, Forms } from "../components";
import useAsync, { TYPE_LOAD } from "../hooks/useAsync";
import useInputText from "../hooks/useInputText";
import PostCodeSearchingForm from "./ui/PostCodeSearchingForm";
import MainPostCodesContainer from "./container/MainPostCodesContainer";
import { usePostcodeContext } from "../contexts/PostcodeContext";
import { axios } from "../axios-util/axios-library-utility";
import _ from "lodash";
import {
  mainReducer,
  initialState,
  TYPE_MAIN_VALUES,
} from "./reducer/mainReducer";

const { TYPE_TYPING, TYPE_RESET } = TYPE_MAIN_VALUES;

function MainPage({ children, flag }) {
  const { navigate } = usePostcodeContext();

  const [mainValues, mainValuesDispatch] = useReducer(
    mainReducer,
    initialState
  );
  const updateContext = (updateType, data) => {
    mainValuesDispatch({ type: updateType, payload: data });
  };

  // use state doesnt' look proper here

  const [recommendedPostcodes, setRecommendedPostcodes] = useState({
    active: false,
    recommendation: [],
  });

  const onReset = () => {
    updateContext(TYPE_RESET, null);
  };
  // @@here
  const onChange = async (e) => {
    const { value: val, name } = e.target;
    const value = String(val).trim();

    let error;
    if (value != "") {
      _.debounce(async () => {
        try {
          const result = await axios.get(`/postcodes/${value}/autocomplete`);
          const { data } = result;
          setRecommendedPostcodes({
            active: true,
            recommendation: data.result ? data.result : [],
          });
        } catch (err) {
          setRecommendedPostcodes({
            active: false,
            recommendation: [],
          });
          error = err;
        }
      }, 200)();
    }
    if (value == "") {
      setRecommendedPostcodes({
        active: false,
        recommendation: [],
      });
    }
    updateContext(TYPE_TYPING, {
      [name]: value,
    });
  };

  const onSubmit = () => {
    const param = String(mainValues.searchingPostcode).trim();

    initForm();
    navigate(`/${param}`);
  };

  const initForm = useCallback(() => {
    onReset();
    setRecommendedPostcodes({
      active: false,
      recommendation: [],
    });
  }, [recommendedPostcodes]);

  return (
    <Wrapper.PageWrapper>
      <PostCodeSearchingForm
        postCodeFieldId={mainValues.inputFieldId}
        postCodeValue={mainValues.searchingPostcode}
        onClickSubmit={onSubmit}
        onReset={onReset}
        onChange={onChange}
        recommendedPostcodes={recommendedPostcodes}
      />

      {flag == "searching" && <MainPostCodesContainer initForm={initForm} />}
    </Wrapper.PageWrapper>
  );
}

export default MainPage;
