import React, { useEffect } from "react";
import styled from "styled-components";
import { axios } from "../../axios-util/axios-library-utility";
import { TYPE_LOAD } from "../../hooks/useAsync";
import { useMatch } from "react-router-dom";
import useAsync from "../../hooks/useAsync";
import PostCodesResultPanel from "../ui/PostCodesResultPanel";

const MainPostCodesContainerBlock = styled.div``;

function MainPostCodesContainer({ children, initForm }) {
  const match = useMatch("/:postcodeId");
  const postcode = match.params.postcodeId;
  // fetch post code CB4 0GF
  const getPostCode = async () => await axios.get(`/postcodes/${postcode}`);
  const {
    asyncState: singlePostCodeData,
    asyncDispatch: singlePostcodeDispatch,
  } = useAsync(getPostCode, [postcode]);

  const getNearestPostCodes = async () =>
    await axios.get(`/postcodes/${postcode}/nearest`);

  // nearest postcode fetch
  const {
    asyncState: nearestPostCodesData,
    asyncDispatch: nearestPostCodesDispatch,
  } = useAsync(getNearestPostCodes, [postcode]);

  useEffect(() => {
    initForm();
    return () => {};
  }, [postcode]);

  return (
    <MainPostCodesContainerBlock>
      {singlePostCodeData.status == TYPE_LOAD.LOADING && <div>Loading...</div>}
      {singlePostCodeData.status == TYPE_LOAD.ERROR && (
        <div>Failed to fetch data</div>
      )}
      {singlePostCodeData.status == TYPE_LOAD.SUCCESS && (
        <PostCodesResultPanel
          singlePostCodeData={singlePostCodeData}
          nearestPostCodesData={nearestPostCodesData}
        />
      )}
    </MainPostCodesContainerBlock>
  );
}

export default React.memo(MainPostCodesContainer);
