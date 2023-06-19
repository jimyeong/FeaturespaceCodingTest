import React from "react";
import styled from "styled-components";

const PageWrapperBlock = styled.div``;

function PageWrapper({ children }) {
  return <PageWrapperBlock>{children}</PageWrapperBlock>;
}

export default PageWrapper;
