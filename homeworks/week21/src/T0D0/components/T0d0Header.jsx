import React from "react";
import styled from "styled-components";
import {
  MEDIA_QUERY_S,
  MEDIA_QUERY_M,
  MEDIA_QUERY_L,
} from "../../constants/Breakpoint";

const T0d0HeaderWrapper = styled.div`
  border-bottom: solid 2px #121212;
  ${MEDIA_QUERY_S} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
`;

const T0d0Title = styled.div`
  height: 100%;
  min-width: 78px;
  font-weight: bold;
  font-size: 24px;
  ${MEDIA_QUERY_S} {
    margin-left: 20px;
  }
`;

const T0d0NavUl = styled.ul`
  align-items: center;
  padding: 0;
  ${MEDIA_QUERY_S} {
    display: flex;
  }
`;

const T0d0NavLi = styled.li`
  margin: 3px;
  display: inline-block;
  div {
    display: inline-block;
    cursor: pointer;
    border: 2px solid #222;
    padding: 3px;
    ${MEDIA_QUERY_M} {
      border: none;
    }
  }
  span {
    padding: 3px;
    background: #eee;
    color: #222;
    display: none;
    ${MEDIA_QUERY_M} {
      display: inline-block;
    }
  }
`;

const FocusedNavLi = styled(T0d0NavLi)`
  background: #999;
  color: #fff;
`;

function T0d0NavItem({
  content,
  isLast,
  handleFilter,
  handleClearDone,
  filter,
}) {
  function handler(event) {
    if (content === "CLEAR DONE") {
      handleClearDone();
    } else {
      handleFilter(event.target.innerText);
    }
  }

  let ReturnedNavLi;
  if (filter === content) {
    ReturnedNavLi = FocusedNavLi;
  } else {
    ReturnedNavLi = T0d0NavLi;
  }

  return (
    <ReturnedNavLi>
      <div onClick={handler}>{content}</div>
      {isLast ? "" : <span> | </span>}
    </ReturnedNavLi>
  );
}

export default function T0d0Header({
  children,
  handleFilter,
  handleClearDone,
  filter,
}) {
  return (
    <T0d0HeaderWrapper>
      <T0d0Title>#T0D0</T0d0Title>
      <nav>
        <T0d0NavUl>
          <T0d0NavItem
            isLast={false}
            content="ALL"
            handleFilter={handleFilter}
            filter={filter}
          />
          <T0d0NavItem
            isLast={false}
            content="ACTIVE"
            handleFilter={handleFilter}
            filter={filter}
          />
          <T0d0NavItem
            isLast={false}
            content="DONE"
            handleFilter={handleFilter}
            filter={filter}
          />
          <T0d0NavItem
            isLast={false}
            content="CLEAR DONE"
            handleClearDone={handleClearDone}
          />
          <T0d0NavItem isLast={true} content="SAVE" />
        </T0d0NavUl>
      </nav>
    </T0d0HeaderWrapper>
  );
}
