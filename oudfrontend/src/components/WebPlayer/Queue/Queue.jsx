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
      tracks: [],
      dropdown: "none",
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tracks !== prevState.tracks) {
      return {
        tracks: nextProps.tracks,
      };
    }
    return null;
  }

  /* Open */
  openQueue = () => {
    this.setState({
      height: "60%",
    });
  };

  /* Close */
  closeQueue = () => {
    this.setState({
      height: "0%",
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const tracks = arrayMove(this.state.tracks, oldIndex, newIndex);
    this.setState({ tracks: tracks });
    this.props.onChangeQueueOrder(tracks);
  };

  toggleDropdown = () => {
    const dropdown = this.state.dropdown === "none" ? "block" : "none";
    this.setState({
      dropdown: dropdown,
    });
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
            playTrack={this.props.player}
            playing={this.props.playing}
            toggleDropdown={this.toggleDropdown}
          />
          <div className="menu" style={{ display: this.state.dropdown }}>
            <div className="dropdown-menu">
              <a href="/">Delete</a>
              <a href="/">Add to Playlist</a>
              <a href="/">Copy Song Link</a>
              <a href="/">Save to your Liked Songs</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Queue;
