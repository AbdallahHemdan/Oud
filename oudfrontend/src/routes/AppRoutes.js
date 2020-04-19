import React from 'react';
import {Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import WelcomeUser from '../pages/WelcomePage/welcomeUser';
import WelcomeGuest from '../pages/WelcomePage/welcomeGuest';
import Download from '../pages/RoutingPages/download';
import Help from '../pages/RoutingPages/help';
import Premium from '../pages/RoutingPages/premium';
import Overview from '../pages/RoutingPages/OverView';
import SignUp from '../pages/SignUpPage/index';
import SignIn from '../pages/LoginPage/loginPage';
import ForgotPassword from '../components/Login&Signup/ForgetPassword/ForgotPassword';
import ResetPassword from '../components/Login&Signup/ForgetPassword/resetPassword';
import Entered from '../components/Login&Signup/logined/entered';
import Islinked from '../components/Login&Signup/linkisSent';
function AppRoute() {
  return (
    <React.Fragment>
      <Route exact path="/">
        <WelcomeGuest />
      </Route>
      <Route exact path="/WelcomeGuest">
        <WelcomeGuest />
      </Route>
      <Route exact path="/welcomeUser">
        <WelcomeUser />
      </Route>
      <Route exact path="/log-in">
        <SignIn />
      </Route>
      <Route exact path="/SignUp">
        <SignUp />
      </Route>
      <Route exact path="/download">
        <Download />
      </Route>
      <Route exact path="/help">
        <Help />
      </Route>
      <Route exact path="/premium">
        <Premium />
      </Route>
      <Route exact path="/overview">
        <Overview />
      </Route>
      <Route exact path="/ForgotPassword">
        <ForgotPassword />
      </Route>
      <Route exact path="/resetPassword">
        <ResetPassword />
      </Route>
      <Route exact path="/Entered">
        <Entered />
      </Route>
      <Route exact path="/Islanded">
        <Islinked />
      </Route>
    </React.Fragment>
  );
}

export default AppRoute;
