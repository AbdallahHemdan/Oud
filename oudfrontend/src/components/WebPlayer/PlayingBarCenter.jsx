import React from "react";
import { Router, Link } from "react-router-dom";
const history = require("history").createBrowserHistory();
function PlayingBarCenter(props) {
  return (
    <div className="now-playing-bar-center">
      <div className="content player-controls">
        <div className="track-controls">
          <div className="track-info">
            <Router history={history}>
              <Link to="/">
                <strong className="track-name">{props.trackName}</strong>
              </Link>
              <Link to="/">
                <strong className="artist-name">{props.artistName}</strong>
              </Link>
            </Router>
          </div>

          <div className="control-buttons"></div>
        </div>

        <div
          className="playback-bar"
          // onClick={this.onProgressClick}
          onMouseDown={props.setMouseDown}
          onMouseMove={props.onProgressClick}
          onMouseUp={props.mouseUp}
        >
          <span className="progress-time current">{props.current}</span>
          <div className="progress-bar" id="progress-width">
            <div className="progress-bar-bg">
              <div
                className="progress"
                style={{ width: props.progress + "%" }}
              ></div>
            </div>
          </div>
          <span className="progress-time remaining">{props.duration}</span>
        </div>
      </div>
    </div>
  );
}
export default PlayingBarCenter;
