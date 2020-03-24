import React from "react";
import SideBar from "./SideBar";
import AccountOverview from "./AccountOverview";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";

import "../CssFiles/PageContainer.css";

/*this ids the container of the sideBar and the content this should be devided into two compnents */
/*you may change the li to a separte component*/
function PageContainer() {
  let { url, path } = useRouteMatch();

  return (
    <div className="pageContainer">
      <SideBar />

      <div className="content">
        <Switch>
          <Route
            exact
            path={`${path}/accountOverview`}
            component={AccountOverview}
          />
          <Route exact path={`${path}/editProfile`} component={EditProfile} />
          <Route
            exact
            path={`${path}/changePassword`}
            component={ChangePassword}
          />
          <Route path="/account" component={AccountOverview}></Route>
        </Switch>
      </div>
    </div>
  );
}
export default PageContainer;
