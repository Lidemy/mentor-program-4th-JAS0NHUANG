import React from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../Home";
import T0D0 from "../T0D0";
import Gomoku from "../Gomoku";
import Form from "../Form";
import {
  MEDIA_QUERY_S,
  MEDIA_QUERY_M,
  MEDIA_QUERY_L,
} from "../constants/Breakpoint";

const RouterHeader = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: auto;
  padding: 10px;
  font-size: 20px;
  font-family: Courier, Monospace;
  a {
    margin: 5px 20px;
    padding: 10px;
    text-decoration: none;
    color: #122223;
    background: #efefef;
    border-radius: 5px;
  }
  ${MEDIA_QUERY_M} {
    display: flex;
    justify-content: space-between;
    align-items: middle;
  }
`;

const Title = styled.h1`
  min-width: 220px;
`;

const RouterNav = styled.nav`
  flex: 1;
  margin: 20px auto;
  ${MEDIA_QUERY_M} {
    text-align: right;
  }
`;

function SiteRouter() {
  return (
    <Router>
      <RouterHeader>
        <Title>
          <Link to="/">JUST REACT</Link>
        </Title>
        <RouterNav>
          <Link to="/T0D0">#T0D0</Link>
          <span>
            <b>+</b>
          </span>
          <Link to="/Gomoku">Gomoku</Link>
          <span>
            <b>+</b>
          </span>
          <Link to="/Form">Form</Link>
        </RouterNav>
      </RouterHeader>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/T0D0">
          <T0D0 />
        </Route>
        <Route path="/Gomoku">
          <Gomoku />
        </Route>
        <Route path="/Form">
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default SiteRouter;
