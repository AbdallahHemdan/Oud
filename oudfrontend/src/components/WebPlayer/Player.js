import React, { Component } from "react";
import Next from "../../assets/images/icons/next.png";
import Pause from "../../assets/images/icons/pause.png";
import Play from "../../assets/images/icons/play.png";
import Previous from "../../assets/images/icons/previous.png";
import Repeat from "../../assets/images/icons/repeat.png";
import RepeatEnabled from "../../assets/images/icons/repeat-enable.png";
import Shuffle from "../../assets/images/icons/shuffle.png";
import ShuffleEnabled from "../../assets/images/icons/shuffle-enable.png";
import Volume from "../../assets/images/icons/volume.png";
import VolumeMuted from "../../assets/images/icons/volume-mute.png";
import "./Player.css";
class WebPlayer extends Component {
  state = {};
  render() {
    return (
      <div className="now-playing-bar-container">
        <div className="now-playing-bar">
          <div className="now-playing-bar-left"></div>
          <div className="now-playing-bar-center">
            <div className="content player-controls">
              <div className="control-buttons">
                <button className="control-button shuffle" title="Shuffle">
                  <img src={Shuffle} alt="Shuffle" />
                </button>
                <button className="control-button previous" title="Previous">
                  <img src={Previous} alt="Previous" />
                </button>
                <button className="control-button play" title="Play">
                  <img src={Play} alt="Play" />
                </button>
                <button
                  className="control-button pause"
                  title="Pause"
                  style={{ display: "none" }}
                >
                  <img src={Pause} alt="Pause" />
                </button>
                <button className="control-button next" title="Next">
                  <img src={Next} alt="Next" />
                </button>
                <button className="control-button repeat" title="Repeat">
                  <img src={Repeat} alt="Repeat" />
                </button>
              </div>
            </div>
          </div>
          <div className="now-playing-bar-right"></div>
        </div>
      </div>
    );
  }
}

export default WebPlayer;
