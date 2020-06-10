import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import About from "./About";
import Popular from "./Popular";
import Albums from "./Albums";
import RelatedArtists from "./RelatedArtists";
import PropTypes from "prop-types";
import Statistics from './../../Statistics/Statistics';

/**
 * A function component to render the lower part of the artist page. Popular, Albums, Singles, Compilation, and Appears On
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <LowerContainer artistId={"1"} bio={"artist bio example."}/>
 * )
 */
function LowerContainer(props) {
  return (
    <div className="LowerContainer" data-testid="LowerContainer">
      <Switch>
        <Route
          data-testid="about-artist-lower"
          exact
          path={`/artist/:artistId/about`}
          render={(prop) => (
            <About {...prop} artistId={props.artistId} bio={props.bio} />
          )}
        />
        {[`/artist/:artistId`, `/artist/:artistId/overview`].map(
          (path, index) => (
            <Route
              data-testid="test-artist-lower"
              exact
              path={path}
              key={index}
              render={(prop) => (
                <Fragment>
                  <Popular
                    {...prop}
                    artistId={props.artistId}
                    addToPlaylist={props.addToPlaylist}
                    data-testid="test-artist-lower"
                  />
                  <Albums
                    {...prop}
                    artistId={props.artistId}
                    type={0}
                    data-testid="test-artist-albums"
                  />
                  <div className="artist-singles">
                    <Albums
                      {...prop}
                      artistId={props.artistId}
                      type={1}
                      data-testid="test-artist-singles"
                    />
                  </div>
                  <div className="artist-compilation">
                    <Albums
                      {...prop}
                      artistId={props.artistId}
                      type={2}
                      data-testid="test-artist-compilations"
                    />
                  </div>
                  <div className="artist-appears-on">
                    <Albums
                      {...prop}
                      artistId={props.artistId}
                      type={3}
                      data-testid="test-artist-appears-on"
                    />
                  </div>
                </Fragment>
              )}
            />
          )
        )}

        <Route
          data-testid="related-artist-lower"
          exact
          path={`/artist/:artistId/related`}
          render={(prop) => (
            <RelatedArtists {...prop} artistId={props.artistId} />
          )}
        />
        <Route
          data-testid="statistics-lower"
          exact
          path={`/artist/:artistId/statistics`}
          render={(prop) => (
            <Statistics
              {...prop}
              artistId={props.artistId}
              username={props.username}
              img={props.img}
            />
          )}
        />
      </Switch>
    </div>
  );
}
LowerContainer.propTypes = {
  /**
   * The unique idetifier of the author
   */
  artistId: PropTypes.string.isRequired,
  /**
   * The author biography
   */
  bio: PropTypes.string.isRequired,
};
export default LowerContainer;
