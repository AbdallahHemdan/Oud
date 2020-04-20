import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import About from "./About";
import Popular from "./Popular";
import Albums from "./Albums";
import RelatedArtists from "./RelatedArtists";
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
        {[`/artist/:artistId`, `/artist/:artistId/overview`].map(
          (path, index) => (
            <Route
              data-test="popular-artist-lower"
              exact
              path={path}
              key={index}
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
          )
        )}

        <Route
          data-test="related-artist-lower"
          exact
          path={`/artist/:artistId/related`}
          render={(prop) => (
            <RelatedArtists {...prop} artistId={props.artistId} />
          )}
        />
      </Switch>
    </div>
  );
}
export default LowerContainer;
