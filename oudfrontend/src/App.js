import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search"
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
    </Switch>
  );
}

export default App;
