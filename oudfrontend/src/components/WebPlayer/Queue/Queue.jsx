import React, { Component } from "react";
import Extend from "../../../assets/images/icons/extend.png";
import TrackContainer from "./TrackContainer";
import { arrayMove } from "react-sortable-hoc";
import PropTypes from "prop-types";
import "./Queue.css";
/**
 * Component for Queue the track of the currently context.
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <Queue />
 * )
 */
class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "0%",
      tracks: [],
      dropdown: "none",
      topIdx: 1,
      trackIdx: 0,
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
  /**
   * Handling the opening of the queue.
   * @function
   * @returns {void}
   */
  openQueue = () => {
    this.setState({
      height: "60%",
    });
  };
  /**
   * Handling the closing of the queue.
   * @function
   * @returns {void}
   */
  closeQueue = () => {
    this.setState({
      height: "0%",
    });
  };
  /**
   * Handling the change in the order of the track in the UI then do the same thing in the backend
   * @function
   * @param {number} oldIndex the old index of the dragged track
   * @param {number} newIndex the new index of the dragged track
   * @returns {void}
   */
  onSortEnd = ({ oldIndex, newIndex }) => {
    const tracks = arrayMove(this.state.tracks, oldIndex, newIndex);
    this.setState({ tracks: tracks });
    this.props.onChangeQueueOrder(tracks);
  };
  /**
   * Open/Close the dropdown menu function.
   * @function
   * @param {number} id The unique id of the track
   * @param {number} idx The index of the currently playing track
   * @returns {void}
   */
  toggleDropdown = (idx, id) => {
    let dropdown = this.state.dropdown === "none" ? "block" : "none";
    if (idx !== this.state.trackIdx) dropdown = "block";
    const topIdx = (idx + 1) * 5;
    console.log("top: " + topIdx);
    this.setState({
      dropdown: dropdown,
      trackIdx: idx,
      trackId: id,
      topIdx: topIdx,
    });
  };
  /**
   * Handling the removing a track from the queue
   * @function
   * @returns {void}
   */
  removeTrack = () => {
    this.props.removeTrack(this.state.trackIdx, this.state.trackId);
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
            data-testid="tracks-container"
          />
          <div
            className="menu"
            style={{
              display: this.state.dropdown,
              top: this.state.topIdx + "em",
            }}
          >
            <div className="dropdown-menu">
              <button
                className="dropdown-btn"
                onClick={this.removeTrack}
                data-testid="delete-option"
              >
                Delete
              </button>
              <button
                className="dropdown-btn"
                data-testid="add-to-playlist-option"
              >
                Add to Playlist
              </button>
              <button className="dropdown-btn" data-testid="copy-option">
                Copy Song Link
              </button>
              <button className="dropdown-btn" data-testid="like-option">
                Save to your Liked Songs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Queue.propTypes = {
  /**
   * An array of the tracks on the queue
   */
  tracks: PropTypes.array.isRequired,
  /**
   * The unique id of the track
   */
  trackId: PropTypes.string.isRequired,
  /**
   * The index of the currently playing track
   */
  trackIdx: PropTypes.number.isRequired,
  /**
   * The id of the device of the user
   */
  deviceId: PropTypes.string.isRequired,
  /**
   * A function to handle the change in the order of the tracks.
   */
  onChangeQueueOrder: PropTypes.func.isRequired,
  /**
   * A reference to the player
   */
  player: PropTypes.func.isRequired,
  /**
   * The playing state of the parent component
   */
  playing: PropTypes.bool.isRequired,
  /**
   * A function to make a DELETE request to remove a track from the current queue.
   */
  removeTrack: PropTypes.func.isRequired,
};
export default Queue;
