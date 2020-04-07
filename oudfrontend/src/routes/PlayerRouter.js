import React, { Fragment } from "react";
import { Router, Route } from "react-router";
import Player from "../components/WebPlayer/Player";

function PlayerRouter() {
  return (
    <Router>
      <Route path="/" component={Player} />
    </Router>
  );
}

export default PlayerRouter;
