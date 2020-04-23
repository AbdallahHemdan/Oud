import React, { Component } from "react";
import Extend from "../../../assets/images/icons/extend.png";
import TrackContainer from "./TrackContainer";
import PropTypes from "prop-types";
import "./Queue.css";
import { checkSavedTrack } from "../../../utils/Actions/Player";
import Swal from "sweetalert2";
import AddToPlaylist from "../../commonComponents/addToPlaylist/addToPlaylist";
const baseLink = "http://localhost:3000";
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
      trackId: "",
      likeOption: "Save to your Liked Songs",
      displayAdd: false,
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
    // const tracks = arrayMove(this.state.tracks, oldIndex, newIndex);
    // this.setState({ tracks: tracks });
    this.props.onChangeQueueOrder(oldIndex, newIndex);
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
    checkSavedTrack(id).then((isFound) => {
      let likeOption = "Save to your Liked Songs";
      if (isFound) likeOption = "Remove from your Liked Songs";
      this.setState({
        likeOption: likeOption,
      });
    });
    const topIdx = (idx + 1) * 5;
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
    this.setState({
      dropdown: "none",
    });
  };
  copyLink = () => {
    let link = `${baseLink}/track/${this.state.trackId}`;
    return navigator.clipboard.writeText(link).then(() => {
      this.setState({
        dropdown: "none",
      });
      Swal.fire({
        title: "Done!",
        text: "Song Link was copied to your Clipboard!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };
  likeSong = () => {
    this.props.likeSong(this.state.trackId);
    this.setState({
      likeOption: "Remove from your Liked Songs",
      dropdown: "none",
    });
  };
  unlikeSong = () => {
    this.props.unlikeSong(this.state.trackId);
    this.setState({
      likeOption: "Save to your Liked Songs",
      dropdown: "none",
    });
  };
  handleLikeOption = () => {
    if (this.state.likeOption === "Save to your Liked Songs") this.likeSong();
    else this.unlikeSong();
  };
  addToPlaylist() {
    this.setState({ displayAdd: true, dropdown: "none" });
  }
  closeAddToPlaylist() {
    this.setState({ displayAdd: false });
  }
  render() {
    return (
      <div className="queue-add-to-playlist">
        <AddToPlaylist
          data-testid="queue-add-to-playlist"
          display={this.state.displayAdd}
          close={this.closeAddToPlaylist.bind(this)}
        />
        <div className="queue-container" data-testid="queue-container">
          <div
            className="overlay"
            style={{ height: this.state.height }}
            data-testid="overlay"
          >
            <button
              className="close-btn"
              onClick={this.closeQueue}
              data-testid="close-btn"
            >
              <img src={Extend} alt="Close Queue" />
            </button>
            <TrackContainer
              tracks={this.state.tracks}
              onSortEnd={this.onSortEnd}
              useDragHandle={true}
              playTrack={this.props.player}
              playing={this.props.playing}
              changePlayingState={this.props.changePlayingState}
              toggleDropdown={this.toggleDropdown}
              data-testid="tracks-container"
            />
            <div
              data-testid="menu"
              className="menu"
              style={{
                display: this.state.dropdown,
                top: this.state.topIdx + "em",
              }}
            >
              <div className="dropdown-menu" data-testid="dropdown-menu">
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
                  onClick={() => this.addToPlaylist()}
                >
                  Add to Playlist
                </button>
                <button
                  className="dropdown-btn"
                  data-testid="copy-option"
                  onClick={this.copyLink}
                >
                  Copy Song Link
                </button>
                <button
                  className="dropdown-btn"
                  data-testid="like-option"
                  onClick={this.handleLikeOption}
                >
                  {this.state.likeOption}
                </button>
              </div>
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
   * A function to handle the change in the order of the tracks.
   */
  onChangeQueueOrder: PropTypes.func.isRequired,
  /**
   * A reference to the player
   */
  player: PropTypes.object.isRequired,
  /**
   * A function to make a DELETE request to remove a track from the current queue.
   */
  removeTrack: PropTypes.func.isRequired,
};
export default Queue;
