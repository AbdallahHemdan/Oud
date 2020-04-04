import React, { Fragment } from "react";
import { Route } from "react-router";
import Help from "../dummy/help";
import About from "../dummy/About";
import Features from "../dummy/Features";

function NavbarRouter() {
  return (
    <Fragment>
      <Route path="/about" component={About} />
      <Route path="/help" component={Help} />
      <Route path="/features" component={Features} />
    </Fragment>
  );
}

export default NavbarRouter;
