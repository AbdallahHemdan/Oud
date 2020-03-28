import React from "react";
import PropTypes from "prop-types";
const repeat = "../../assets/images/icons/repeat.png";
const repeatEnabled = "../../assets/images/icons/repeat-enable.png";
const shuffle = "../../assets/images/icons/shuffle.png";
const shuffleEnabled = "../../assets/images/icons/shuffle-enable.png";
const volume = "../../assets/images/icons/volume.png";
const volumeMuted = "../../assets/images/icons/volume-mute.png";
/**
 * Component for controling the right part of the player: shuffle, repeat, and mute buttons and clicking on the volume bar
 * @author Ahmed Ashraf
 * @component
 */
function PlayingBarRight(props) {
  return (
    <div className="now-playing-bar-right">
      <div className="volume-bar">
        <button
          className="control-button shuffle"
          title="Shuffle"
          onClick={props.handleShuffleState}
          data-testid="shuffle-btn"
        >
          <img
            src={props.shuffleState ? shuffleEnabled : shuffle}
            alt="Shuffle"
          />
        </button>
        <button
          className="control-button repeat"
          title="Repeat"
          onClick={props.handleRepeatState}
          data-testid="repeat-btn"
        >
          <img src={props.repeatState ? repeatEnabled : repeat} alt="Repeat" />
        </button>
        <button
          className="control-button volume"
          title="Volume"
          onClick={props.handleMuteState}
          data-testid="volume-btn"
        >
          <img src={props.volumeState ? volumeMuted : volume} alt="Volume" />
        </button>

        <div
          className="progress-bar"
          id="volume-width"
          style={{ width: "125px" }}
          onMouseDown={props.setMouseDown}
          onMouseMove={props.onVolumeClick}
          onMouseUp={props.mouseUp}
          data-testid="volume-click"
        >
          <div className="progress-bar-bg">
            <div
              className="progress"
              style={{ width: props.volume + "%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

PlayingBarRight.propTypes = {
  /**
   * Shuffle button state, enabled and disabled
   */
  shuffleState: PropTypes.bool.isRequired,
  /**
   * Repeat button state, enabled and disabled
   */
  repeatState: PropTypes.bool.isRequired,
  /**
   * Volume button state, enabled and disabled
   */
  volumeState: PropTypes.bool.isRequired,
  /**
   * volume percentage
   */
  volume: PropTypes.number.isRequired,
  /**
   * Handle shuffle action function
   */
  handleShuffleState: PropTypes.func.isRequired,
  /**
   * Handle repeat action function
   */
  handleRepeatState: PropTypes.func.isRequired,
  /**
   * Handle mute action function
   */
  handleMuteState: PropTypes.func.isRequired,
  /**
   * function to check if the mouse clicked or not
   */
  setMouseDown: PropTypes.func.isRequired,
  /**
   * function to handle click on the volume bar
   */
  onVolumeClick: PropTypes.func.isRequired,
  /**
   * function to handle whan the mouse is up and click has ended
   */
  mouseUp: PropTypes.func.isRequired
};

export default PlayingBarRight;
