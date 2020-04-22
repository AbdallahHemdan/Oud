import React from "react";
import PropTypes from "prop-types";
// import art from "../../assets/images/icons/album.jpg";
import extend from "../../../assets/images/icons/extend.png";
import pause from "../../../assets/images/icons/pause.png";
import play from "../../../assets/images/icons/play.png";
import previous from "../../../assets/images/icons/previous.png";
import next from "../../../assets/images/icons/next.png";
import placeHolder from "../../../assets/images/icons/placeholderdark.png";

/**
 * Component for controling the left part of the player: artist link, and previous, play/pause, and next buttons
 * @author Ahmed Ashraf
 * @component
 */
function PlayingBarLeft(props) {
  return (
    <div className="now-playing-bar-left">
      <div className="content">
        <div className="ablum-link" style={{ display: props.display }}>
          <img
            src={props.art}
            className="album-art-work"
            alt="Album Art"
            data-testid="album-link-img"
          />
          <button
            className="extended-card-button"
            title="Extend"
            onClick={props.openThumb}
            data-testid="album-link-btn"
          >
            <img src={extend} alt="Extend" className="extend-img" />
          </button>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button
              className="control-button previous"
              title="Previous"
              onClick={props.handlePrev}
              data-testid="previous-btn"
            >
              <img src={previous} alt="Previous" />
            </button>

            {props.playing ? (
              <button
                className="control-button pause"
                title="Pause"
                onClick={props.handlePlayPause}
                data-testid="pause-btn"
              >
                <img src={pause} alt="Pause" />
              </button>
            ) : (
              <button
                className="control-button play"
                title="Play"
                onClick={props.handlePlayPause}
                data-testid="play-btn"
              >
                <img src={play} alt="Play" />
              </button>
            )}

            <button
              className="control-button next"
              title="Next"
              onClick={props.handleNext}
              data-testid="next-btn"
            >
              <img src={next} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

PlayingBarLeft.propTypes = {
  playing: PropTypes.bool.isRequired,
  /**
   * Handle previos action function
   */
  handlePrev: PropTypes.func.isRequired,
  /**
   * Handle play/pause actions function
   */
  handlePlayPause: PropTypes.func.isRequired,
  /**
   * Handle next action function
   */
  handleNext: PropTypes.func.isRequired,
};

export default PlayingBarLeft;
