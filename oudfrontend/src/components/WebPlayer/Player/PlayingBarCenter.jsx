import React from "react";
import { Router, Link } from "react-router-dom";
import PropTypes from "prop-types";
const history = require("history").createBrowserHistory();
/**
 * Component for controling the middle part of the player: progress bar, artist name, track name, remaining time, the total track time.
 * @author Ahmed Ashraf
 * @component
 */
function PlayingBarCenter(props) {
  return (
    <div className="now-playing-bar-center">
      <div className="content player-controls">
        <div className="track-controls">
          <div className="track-info">
            <Router history={history}>
              <Link to={props.constructLink(false)}>
                <strong className="track-name" data-testid="track-name-link">
                  {props.trackName}
                </strong>
              </Link>
              <Link to={props.constructLink(true)}>
                <strong className="artist-name" data-testid="artist-name-link">
                  {props.artistName}
                </strong>
              </Link>
            </Router>
          </div>

          <div className="control-buttons"></div>
        </div>

        <div className="playback-bar">
          <span className="progress-time current" data-testid="current-time">
            {props.current}
          </span>
          <div
            className="progress-bar"
            id="progress-width"
            data-testid="progress-click"
            onMouseDown={props.setMouseDown}
            onMouseMove={props.onProgressClick}
            onMouseUp={props.mouseUp}
          >
            <div className="progress-bar-bg">
              <div
                className="progress"
                style={{ width: props.progress + "%" }}
              ></div>
            </div>
          </div>
          <span className="progress-time remaining" data-testid="duration-time">
            {props.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

PlayingBarCenter.propTypes = {
  /**
   * the name of the currently/recently played track
   */
  trackName: PropTypes.string.isRequired,
  /**
   * the name of the artist of the currently/recently played track
   */
  artistName: PropTypes.string.isRequired,
  /**
   * the current time in the track in minutes and seconds
   */
  current: PropTypes.string.isRequired,
  /**
   * the percentage of played duration of the track
   */
  progress: PropTypes.any.isRequired,
  /**
   * total time of the track
   */
  duration: PropTypes.any.isRequired,
  /**
   * function to check if the mouse clicked or not
   */
  setMouseDown: PropTypes.func.isRequired,
  /**
   * function to handle click on the progress bar
   */
  onProgressClick: PropTypes.func.isRequired,
  /**
   * function to handle whan the mouse is up and click has ended
   */
  mouseUp: PropTypes.func.isRequired,
};

export default PlayingBarCenter;
