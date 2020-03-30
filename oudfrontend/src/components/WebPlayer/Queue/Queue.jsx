import React, { Component } from "react";
import Extend from "../../../assets/images/icons/extend.png";
import TrackContainer from "./TrackContainer";
import { arrayMove } from "react-sortable-hoc";
import "./Queue.css";

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "0%",
      tracks: ["1", "2", "3", "4", "5", "6", "7", "8"]
    };
  }

  fetchQueue = () => {};

  /* Open */
  openQueue = () => {
    this.setState({
      height: "60%"
    });
  };

  /* Close */
  closeQueue = () => {
    this.setState({
      height: "0%"
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({ tracks: arrayMove(this.state.tracks, oldIndex, newIndex) });
  };
  render() {
    return (
      <div className="queue-container">
        <div className="overlay" style={{ height: this.state.height }}>
          <button className="close-btn" onClick={this.closeQueue}>
            <img src={Extend} alt="Close Queue" />
          </button>
          <TrackContainer
            tracks={this.state.tracks}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
          />
        </div>
      </div>
    );
  }
}

export default Queue;
