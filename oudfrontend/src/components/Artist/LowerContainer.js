import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import About from "./About";
import Popular from "./Popular";
import Albums from "./Albums";
import RelatedArtists from "./RelatedArtists";
import Oud from "./../../assets/images/Oud2.png";

function defaultArtist() {
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
          data-test="about-artist-lower"
          exact
          path={`/artist/:artistId/about`}
          render={(prop) => (
            <About {...prop} artistId={props.artistId} bio={props.bio} />
          )}
        />
        <Route
          data-test="popular-artist-lower"
          exact
          path={`/artist/:artistId/overview`}
          render={(prop) => (
            <Fragment>
              <Popular {...prop} artistId={props.artistId} />
              <Albums {...prop} artistId={props.artistId} type={0} />
              <div className="artist-singles">
                <Albums {...prop} artistId={props.artistId} type={1} />
              </div>
              <div className="artist-compilation">
                <Albums {...prop} artistId={props.artistId} type={2} />
              </div>
              <div className="artist-appears-on">
                <Albums {...prop} artistId={props.artistId} type={3} />
              </div>
            </Fragment>
          )}
        />
        <Route
          data-test="related-artist-lower"
          exact
          path={`/artist/:artistId/related`}
          render={(prop) => (
            <RelatedArtists {...prop} artistId={props.artistId} />
          )}
        />
        <Route
          data-test="defualt-artist-page"
          exact
          path={`/artist/:artistId`}
          component={defaultArtist}
        />
      </Switch>
    </div>
  );
}
export default LowerContainer;
