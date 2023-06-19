import React from "react";
import styled from "styled-components";
import PostCodeDisplay from "./PostCodeDisplay";
import { TYPE_LOAD } from "../../hooks/useAsync";

const PostCodesResultPanelBlock = styled.div``;

function PostCodesResultPanel({ singlePostCodeData, nearestPostCodesData }) {
  const renderNearestPostcodes = () => {
    if (nearestPostCodesData.data)
      return nearestPostCodesData.data.result.map((postcodeItem, i) => (
        <PostCodeDisplay
          key={i}
          postcodeItem={postcodeItem}
          role="items_display"
        />
      ));
    return null;
  };
  return (
    <PostCodesResultPanelBlock>
      <div className="SinglePost">
        <h3 className="SinglePost__tit">Result</h3>
        <PostCodeDisplay
          postcodeItem={singlePostCodeData.data.result}
          role="item_display"
        />
      </div>

      <div className="NearestPostCodes">
        <h3 className="SinglePost__tit">Nearest Postcodes</h3>

        {nearestPostCodesData.status == TYPE_LOAD.LOADING && (
          <div>Loading...</div>
        )}
        {nearestPostCodesData.status == TYPE_LOAD.ERROR && (
          <div>Failed to fetch nearest postcodes data</div>
        )}

        {nearestPostCodesData.status == TYPE_LOAD.SUCCESS &&
          renderNearestPostcodes()}
      </div>
    </PostCodesResultPanelBlock>
  );
}

export default PostCodesResultPanel;
