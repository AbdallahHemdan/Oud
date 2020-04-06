import React from "react";
import { Switch, Route } from "react-router-dom";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import Overview from "../Overview/Overview";
import PublicPlaylists from "../PublicPlaylists/PublicPlaylists";
import Oud from "./../../../../assets/images/Oud2.png";

import "./LowerContainer.css";

function defaultProfile() {
  return (
    <div className="defaultProfile">
      {" "}
      <img className="defaultProfileImage" src={Oud} alt="Oud-logo"></img>{" "}
    </div>
  );
}

function LowerContainer(props) {
  return (
    <div className="LowerContainer" data-test="LowerContainer">
      <Switch>
        <Route
          data-test="profileOverview"
          exact
          path={`/profile/:userId/overview`}
          render={prop => <Overview {...prop} userId={props.userId} />}
        />

        <Route
          data-test="profilePublicPlaylists"
          exact
          path={`/profile/:userId/publicPlaylists`}
          render={prop => <PublicPlaylists {...prop} userId={props.userId} />}
        />

        <Route
          data-test="following"
          exact
          path={`/profile/:userId/following`}
          render={prop => <Following {...prop} userId={props.userId} />}
        />

        <Route
          data-test="followers"
          exact
          path={`/profile/:userId/followers`}
          render={prop => <Followers {...prop} userId={props.userId} />}
        />
        <Route
          data-test="defualt-profile-page"
          exact
          path={`/profile/:userId`}
          component={defaultProfile}
        />
      </Switch>
    </div>
  );
}
export default LowerContainer;
