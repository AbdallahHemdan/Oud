import React from 'react';
import {Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';

import WelcomeUser from '../pages/welcomeUser';
import WelcomeGuest from '../pages/welcomeGuest';
/**dummy imports will change in integration  */
import Login from '../pages/login';
import SignUP from '../pages/SignUp';
import Download from '../pages/download';
import Help from '../pages/help';
import Premium from '../pages/premium';
import Overview from '../pages/OverView';
function AppRoute() {
  // const history = require('history').createBrowserHistory;
  return (
    <React.Fragment>
      <Route exact path="/welcomeUser">
        <WelcomeUser />
      </Route>
      <Route path="/welcomeGuest">
        <WelcomeGuest />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      <Route path="/SignUP">
        <SignUP />
      </Route>
      <Route path="/download">
        <Download />
      </Route>
      <Route path="/help">
        <Help />
      </Route>
      <Route path="/premium">
        <Premium />
      </Route>
      <Route path="/overview">
        <Overview />
      </Route>
      <Route path="/webPlayer">
        <SignUP />
      </Route>
    </React.Fragment>
  );
}

export default AppRoute;
