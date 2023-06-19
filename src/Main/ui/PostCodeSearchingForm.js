import React from "react";
import styled from "styled-components";
import { Buttons, Forms } from "../../components";
import { Link } from "react-router-dom";
import cn from "classnames";

const PostCodeSearchingFormBlock = styled.div`
  width: 400px;
  display: flex;
  .form__wrapper {
    position: relative;
  }
  .recommended_codes {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background-color: white;
    border: 1px solid #333;
    margin: 0;
    display: none;
    height: 0;
    overflow-y: hidden;
    &.is-active {
      max-height: 100px;
      overflow-y: scroll;
      height: auto;
      display: block;
    }
    > li {
      cursor: pointer;
      list-style: none;
      height: 20px;
    }
    > li:hover {
      background-color: #f9f8f9;
    }
  }
`;

function PostCodeSearchingForm({
  postCodeFieldId,
  postCodeValue,
  onChange,
  onClickSubmit,
  onReset,
  recommendedPostcodes,
}) {
  const renderRecomendedPostcodes = () => {
    return recommendedPostcodes.recommendation.map((postcode, i) => {
      return (
        <li key={i}>
          <Link to={`/${postcode}`}>{postcode}</Link>
        </li>
      );
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onReset();
      if (onClickSubmit) onClickSubmit();
    }
  };
  return (
    <PostCodeSearchingFormBlock>
      <div className="form__wrapper">
        <Forms.TextInput
          placeholder="Type in the postcodes you want to fetch"
          onReset={onReset}
          name={postCodeFieldId}
          value={postCodeValue}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        {recommendedPostcodes.recommendation.length > 0 && (
          <ul
            className={cn([
              "recommended_codes",
              "clearfix",
              recommendedPostcodes.active && "is-active",
            ])}
          >
            {renderRecomendedPostcodes()}
          </ul>
        )}
      </div>
      <Buttons.Button onClick={onClickSubmit}>Submit</Buttons.Button>
    </PostCodeSearchingFormBlock>
  );
}

export default PostCodeSearchingForm;
