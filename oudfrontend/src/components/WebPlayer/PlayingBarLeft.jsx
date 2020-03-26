import React from "react";

function PlayingBarLeft(props) {
  return (
    <div className="now-playing-bar-left">
      <div className="content">
        <div className="ablum-link">
          <img
            src={props.art}
            className="album-art-work"
            alt="Album Art"
            data-testid="album-link-img"
          />
          <button
            className="extended-card-button"
            title="Extend"
            data-testid="album-link-btn"
          >
            <img src={props.extend} alt="Extend" className="extend-img" />
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
              <img src={props.prev} alt="Previous" />
            </button>

            {props.playing ? (
              <button
                className="control-button pause"
                title="Pause"
                onClick={props.handlePlayPause}
                data-testid="pause-btn"
              >
                <img src={props.pause} alt="Pause" />
              </button>
            ) : (
              <button
                className="control-button play"
                title="Play"
                onClick={props.handlePlayPause}
                data-testid="play-btn"
              >
                <img src={props.play} alt="Play" />
              </button>
            )}

            <button
              className="control-button next"
              title="Next"
              onClick={props.handleNext}
              data-testid="next-btn"
            >
              <img src={props.next} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlayingBarLeft;
