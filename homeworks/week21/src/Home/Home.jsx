import React from "react";
import styled from "styled-components";
import GlobalStyle from "../constants/GlobalStyle";
import {
  MEDIA_QUERY_S,
  MEDIA_QUERY_M,
  MEDIA_QUERY_L,
} from "../constants/Breakpoint";

const Main = styled.main`
  font-size: 20px;
  margin: 0;
  min-height: 450px;
  width: 100%;
  padding-top: 100px;
  ${MEDIA_QUERY_S} {
    margin: 30px auto 0;
    max-width: 90%;
  }
  ${MEDIA_QUERY_M} {
    margin: 40px auto 0;
    max-width: 80%;
  }
  ${MEDIA_QUERY_L} {
    margin: 60px auto 0;
    max-width: 1080px;
  }
`;

const CenteredTitle = styled.div`
  font-size: 68px;
  font-weight: bold;
  margin: auto;
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Main>
        <CenteredTitle>JUST REACT</CenteredTitle>
      </Main>
    </div>
  );
}

export default App;
