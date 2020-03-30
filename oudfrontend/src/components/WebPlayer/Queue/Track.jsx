import React from "react";
import { sortableHandle } from "react-sortable-hoc";
import art from "../../../assets/images/icons/album.jpg";
import ellipsis from "../../../assets/images/icons/ellipsis.png";
import handler from "../../../assets/images/icons/handler.png";
import play from "../../../assets/images/icons/play.png";
import pause from "../../../assets/images/icons/pause.png";
const DragHandle = sortableHandle(() => (
  <span className="handler">
    <img src={handler} alt="Handler" />
  </span>
));
const Track = props => {
  return (
    <div className="track">
      <DragHandle />
      <div className="content">
        <div className="play-art">
          <div
            className="track-art-work"
            style={{ backgroundImage: `url(${art})` }}
          ></div>
          <button className="play-pause">
            <img src={play} alt="Play" />
          </button>
        </div>

        <div className="track-name">
          <text title="Somthing Just Like This">
            <a href="https://www.facebook.com/">Somthing Just Like This</a>
          </text>
        </div>

        <div className="artist-name">
          <text title="The Chainsmokers & Coldplay">
            <a href="https://www.facebook.com/">The Chainsmokers & Coldplay</a>
          </text>
        </div>

        <div className="duration">
          <text>3:21</text>
        </div>

        <div className="ellipsis-container">
          <button className="ellipsis-icon">
            <img src={ellipsis} alt="Show More" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Track;
