import React from 'react';
import {Route} from 'react-router-dom';
import SignUp from '../components/signup/signup';
import SignIn from '../components/signin/signin';
import ForgotPassword from '../components/signin/ForgotPassword';
import IsEntered from '../components/logined/entered';
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
      <Route path="/Facebookislogined">
        <IsEntered />
      </Route>
    </React.Fragment>
  );
}

export default SignRoute;
