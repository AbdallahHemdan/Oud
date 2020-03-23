import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
      </Switch>
    </Router >
  );
}

export default App;
