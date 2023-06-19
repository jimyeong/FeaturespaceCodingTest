import React, { useEffect } from "react";
import { axios } from "./axios-util/axios-library-utility";

import MainPage from "./Main/MainPage";
import PostcodeContextProvider from "./contexts/PostcodeContext";
import { styled } from "styled-components";
import { Routes, Route } from "react-router-dom";
import PostCodeDisplay from "./Main/ui/PostCodeDisplay";

const FrameWrapper = styled.div`
  padding: 12px 16px;
`;

function App() {
  return (
    <FrameWrapper className="App">
      <PostcodeContextProvider>
        <Routes>
          <Route path="/" element={<MainPage flag="main" />} />
          {/**here */}
          <Route path="/:postcodeId" element={<MainPage flag="searching" />} />
        </Routes>
      </PostcodeContextProvider>
    </FrameWrapper>
  );
}

export default App;
