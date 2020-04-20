import React from "react";
import SideBar from "../SideBar/SideBar";
import AccountOverview from "../AccountOverview/AccountOverview";
import EditProfile from "../EditProfile/EditProfile";
import ChangePassword from "../ChangePassword/ChangePassword";
import { Route, Switch } from "react-router-dom";

import "./PageContainer.css";
/**
 * @type {Function}
 * @returns {jsx} one of this routes [account Overview , edit Profile , change Password]
 * <PageContainer/>
 */
function PageContainer() {
  return (
    <div className="pageContainer" data-test="pageContainer">
      <SideBar />

      <div className="content" data-test="content">
        <Switch>
          <Route
            exact
            path={`/account/accountOverview`}
            component={AccountOverview}
            data-test="accountOverview"
          />
          <Route
            exact
            path={`/account/editProfile`}
            component={EditProfile}
            data-test="EditPassword"
          />
          <Route
            exact
            path={`/account/changePassword`}
            component={ChangePassword}
            data-test="changePassword"
          />
          <Route
            path="/account"
            component={AccountOverview}
            data-test="account"
          ></Route>
        </Switch>
      </div>
    </div>
  );
}
export default PageContainer;
