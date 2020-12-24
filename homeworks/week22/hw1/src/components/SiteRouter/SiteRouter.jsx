import React from 'react';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from '../pages/Home';
import Post from '../pages/Post';
import About from '../pages/About';
import Category from '../pages/Category';
import Login from '../pages/Login';
import NewPost from '../pages/NewPost';
import Register from '../pages/Register';
import Header from '../Header';
import Footer from '../Footer';

function SiteRouter() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/post/:id">
            <Post />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Category">
            <Category />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/NewPost">
            <NewPost />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default SiteRouter;
