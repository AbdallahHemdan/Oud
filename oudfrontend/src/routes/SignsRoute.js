import React from "react";
import { Route } from "react-router-dom";
import SignUp from "../components/signup/signup";
import SignIn from "../components/signin/signin";
import ForgotPassword from "../components/signin/ForgotPassword";

function SignRoute() {
  return (
    <React.Fragment>
      <Route exact path="/">
        <SignUp />
      </Route>
      <Route path="/log-in">
        <SignIn />
      </Route>
      <Route path="/password-reset">
        <ForgotPassword />
      </Route>
    </React.Fragment>
  );
}

export default SignRoute;
