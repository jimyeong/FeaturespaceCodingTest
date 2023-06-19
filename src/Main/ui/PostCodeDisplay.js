import React from "react";
import styled from "styled-components";
import { useMatch } from "react-router-dom";

const PostCodeDisplayBlock = styled.div`
  & + & {
    margin-top: 32px;
  }
`;

function PostCodeDisplay({ postcodeItem, role }) {
  return (
    <PostCodeDisplayBlock role={role}>
      <p>
        <span>postcode: </span>
        {postcodeItem.postcode}
      </p>
      <p>
        <span>country: </span>
        {postcodeItem.country}
      </p>
      <p>
        <span>region: </span>
        {postcodeItem.region}
      </p>
    </PostCodeDisplayBlock>
  );
}

export default PostCodeDisplay;
