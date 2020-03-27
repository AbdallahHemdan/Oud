import React from 'react';
import {Route} from 'react-router-dom';
import SignUp from '../components/signup/signup';
import SignIn from '../components/signin/signin';
import ForgotPassword from '../components/signin/ForgotPassword';
import IsEntered from '../components/logined/entered';
import Code from '../components/signin/code';
import ResetPassword from '../components/signin/resetPassword';
function SignRoute() {
  return (
    <React.Fragment>
      <Route exact path="/">
        <SignUp />
      </Route>
      <Route path="/log-in">
        <SignIn />
      </Route>
      <Route path="/ForgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/Facebookislogined">
        <IsEntered />
      </Route>
      <Route path="/code">
        <Code />
      </Route>
      <Route path="/resetPassword">
        <ResetPassword />
      </Route>
    </React.Fragment>
  );
}

export default SignRoute;
