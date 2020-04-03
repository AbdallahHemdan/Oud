import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import repeat from "../../assets/images/icons/repeat.png";
import repeatEnabled from "../../assets/images/icons/repeat-enable.png";
import shuffle from "../../assets/images/icons/shuffle.png";
import shuffleEnabled from "../../assets/images/icons/shuffle-enable.png";
import volume from "../../assets/images/icons/volume.png";
import volumeMuted from "../../assets/images/icons/volume-mute.png";
import queue from "../../assets/images/icons/queue.png";
import queueActivated from "../../assets/images/icons/queueActivated.png";
/**
 * Component for controling the right part of the player: shuffle, repeat, and mute buttons and clicking on the volume bar
 * @author Ahmed Ashraf
 * @component
 */
class PlayingBarRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queueOpened: false
    };
  }
  openQueue = () => {
    if (this.state.queueOpened) {
      this.props.queueElement.current.closeQueue();
    } else {
      this.props.queueElement.current.openQueue();
    }
    this.setState({
      queueOpened: !this.state.queueOpened
    });
  };
  render() {
    return (
      <Fragment>
        <div className="now-playing-bar-right">
          <div className="volume-bar">
            <button
              className="control-button queue"
              title="Queue"
              data-testid="queue-btn"
              onClick={this.openQueue}
            >
              <img
                src={this.state.queueOpened ? queueActivated : queue}
                alt="Queue"
              />
            </button>
            <button
              className="control-button shuffle"
              title="Shuffle"
              onClick={this.props.handleShuffleState}
              data-testid="shuffle-btn"
            >
              <img
                src={this.props.shuffleState ? shuffleEnabled : shuffle}
                alt="Shuffle"
              />
            </button>
            <button
              className="control-button repeat"
              title="Repeat"
              onClick={this.props.handleRepeatState}
              data-testid="repeat-btn"
            >
              <img
                src={this.props.repeatState ? repeatEnabled : repeat}
                alt="Repeat"
              />
            </button>
            <button
              className="control-button volume"
              title="Volume"
              onClick={this.props.handleMuteState}
              data-testid="volume-btn"
            >
              <img
                src={this.props.volumeState ? volumeMuted : volume}
                alt="Volume"
              />
            </button>

            <div
              className="progress-bar"
              id="volume-width"
              style={{ width: "125px" }}
              onMouseDown={this.props.setMouseDown}
              onMouseMove={this.props.onVolumeClick}
              onMouseUp={this.props.mouseUp}
              data-testid="volume-click"
            >
              <div className="progress-bar-bg">
                <div
                  className="progress"
                  style={{ width: this.props.volume + "%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
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
