import React, { Fragment } from "react";
import "./Progress.css";
function Progress(props) {
  // let res = {};
  // let getWidth = e => {
  //   const offsetX = e.offsetX;
  //   const offsetWidth = e.target.offsetWidth;
  //   res = {
  //     offsetX: offsetX,
  //     offsetWidth: offsetWidth
  //   };
  // };

  // let addEvent = () => {
  //   let progressBar = document.getElementsByClassName("progress")[0];
  //   progressBar.addEventListener("click", getWidth);
  //   return res;
  // };
  let playback = (
    <div className="playback-bar">
      <span className="progress-time current">{props.current}</span>
      <div className="progress-bar">
        <div className="progress-bar-bg">
          <div
            className="progress"
            style={{ width: props.progress + "%" }}
          ></div>
        </div>
      </div>
      <span className="progress-time remaining">{props.duration}</span>
    </div>
  );

  let volume = (
    <div className="progress-bar" style={{ width: "125px" }}>
      <div className="progress-bar-bg">
        <div className="progress"></div>
      </div>
    </div>
  );
  return <Fragment>{props.volume ? volume : playback}</Fragment>;
}

export default Progress;
