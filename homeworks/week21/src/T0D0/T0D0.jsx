import React from "react";
import styled from "styled-components";
import GlobalStyle from "../constants/GlobalStyle";
import T0d0Header from "./components/T0d0Header";
import T0d0Item from "./components/T0d0Item";
import T0d0Form from "./components/T0d0Form";
import useT0d0 from "./hooks/useT0d0";
import {
  MEDIA_QUERY_S,
  MEDIA_QUERY_M,
  MEDIA_QUERY_L,
} from "../constants/Breakpoint";

const Main = styled.main`
  font-size: 20px;
  margin: 0;
  background: #eee;
  min-height: 450px;
  width: 100%;
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

function App() {
  const {
    t0d0s,
    handleDelete,
    handleClearDone,
    handleToggleIsDone,
    handleEditing,
    handleEditSubmit,
    handleSubmit,
    value,
    handleInput,
    filter,
    handleFilter,
  } = useT0d0();

  return (
    <div>
      <GlobalStyle />
      <Main>
        <T0d0Header
          handleFilter={handleFilter}
          handleClearDone={handleClearDone}
          filter={filter}
        ></T0d0Header>
        {t0d0s
          .filter((t0d0) => {
            if (filter === "DONE") return t0d0.isDone === true;
            if (filter === "ACTIVE") return t0d0.isDone === false;
            return true;
          })
          .map((t0d0) => (
            <T0d0Item
              key={t0d0.t0d0Id}
              t0d0={t0d0}
              handleDelete={handleDelete}
              handleToggleIsDone={handleToggleIsDone}
              handleEditing={handleEditing}
              handleEditSubmit={handleEditSubmit}
            />
          ))}
        <T0d0Form
          value={value}
          handleSubmit={handleSubmit}
          handleInput={handleInput}
        />
      </Main>
    </div>
  );
}

export default App;
