import React from "react";
import Search from "./pages/Search/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "./pages/Account/Account";
import RedirectPage from "./components/Account/General/RedirectPage";
import Profile from "./pages/Profile/Profile";

import Home from "./pages/Home/Home";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route path="/profile/:userId" component={Profile} />
        <Route path="/account" component={Account} />
        <Route path="/RedirectPage" component={RedirectPage} />
      </Switch>
    </Router>
  );
}

export default App;
