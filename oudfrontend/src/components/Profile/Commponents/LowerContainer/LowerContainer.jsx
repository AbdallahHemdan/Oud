import React from "react";
import { Switch, Route } from "react-router-dom";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import Overview from "../Overview/Overview";
import PublicPlaylists from "../PublicPlaylists/PublicPlaylists";
import Oud from "./../../../../assets/images/Oud2.png";

import "./LowerContainer.css";

/**
 * @type {Function}
 * @returns {JSX} this the default page for current user "/profile/{userId}"  (❁´◡`❁)
 */
/**
 * @type {Function}
 * @returns {JSX} this returns one of the following
 *
 * @1)user's followers list
 * @2)user's following list
 * @3)user's public playlists
 * @4)user's profile overview
 * @5)defaul user route
 */

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
          component={Overview}
        />
      </Switch>
    </div>
  );
}
export default LowerContainer;
