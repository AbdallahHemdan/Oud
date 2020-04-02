import React from "react";
import { Switch, Route } from "react-router-dom";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import Overview from "../Overview/Overview";
import PublicPlaylists from "../PublicPlaylists/PublicPlaylists";

function LowerContainer() {
  return (
    <div>
      <Switch>
        <Route
          data-test="profileOverview"
          exact
          path={`/profile/overview`}
          component={Overview}
        />
        <Route
          data-test="profilePublicPlaylists"
          exact
          path={`/profile/publicPlaylists`}
          component={PublicPlaylists}
        />
        <Route
          data-test="following"
          exact
          path={`/profile/following`}
          component={Following}
        />
        <Route
          data-test="followers"
          exact
          path={`/profile/followers`}
          component={Followers}
        />
      </Switch>
    </div>
  );
}
export default LowerContainer;
