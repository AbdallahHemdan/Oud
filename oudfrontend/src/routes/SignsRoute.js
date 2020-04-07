import React from 'react';
import {Route} from 'react-router-dom';
import SignUp from '../pages/SignUpPage/index';
import SignIn from '../pages/LoginPage/loginPage';
import ForgotPassword from '../components/ForgetPassword/ForgotPassword';
import IsEntered from '../components/logined/entered';
import Code from '../components/ForgetPassword/code';
import ResetPassword from '../components/ForgetPassword/resetPassword';
import Entered from '../components/logined/entered';
function SignRoute() {
  return (
    <React.Fragment>
      <Route exact path="/SignUp">
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
      <Route path='/Enterd'>
        <Entered />
      </Route>
    </React.Fragment>
  );
}

export default SignRoute;
