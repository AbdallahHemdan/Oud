import React, { Component } from "react";
import "./Player.css";
class WebPlayer extends Component {
  state = {};
  render() {
    return (
      <div className="now-playing-bar-container">
        <div className="now-playing-bar">
          <div className="now-playing-bar-left"></div>
          <div className="now-playing-bar-center"></div>
          <div className="now-playing-bar-right"></div>
        </div>
      </div>
    );
  }
}

export default WebPlayer;
