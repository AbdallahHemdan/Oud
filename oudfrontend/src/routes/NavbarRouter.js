import React, {Fragment} from 'react';
import {Route} from 'react-router';
import Download from '../dummy/download';
import Help from '../dummy/help';
import Premium from '../dummy/premium';
import SignUP from '../dummy/SignUp';
import Login from '../dummy/Login';
function NavbarRouter() {
  return (
    <Fragment>
      <Route path="/download" component={Download} />
      <Route path="/help" component={Help} />
      <Route path="/premium" component={Premium} />
      <Route path="/SignUP" component={SignUP} />
      <Route path="/Login" component={Login} />
    </Fragment>
  );
}

export default NavbarRouter;
