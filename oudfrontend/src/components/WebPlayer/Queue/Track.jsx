import React, { Component } from "react";
import { sortableHandle } from "react-sortable-hoc";
import ellipsis from "../../../assets/images/icons/ellipsis.png";
import handler from "../../../assets/images/icons/handler.png";
import play from "../../../assets/images/icons/play.png";
import pause from "../../../assets/images/icons/pause.png";
import axios from "axios";
import PropTypes from "prop-types";
const DragHandle = sortableHandle(() => (
  <span className="handler">
    <img src={handler} alt="Handler" />
  </span>
));
/**
 * The basic component in the Queue. I contains all the actions you can do for a track in the queue.
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <Track />
 * )
 */
class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      trackName: "",
      artistName: "",
      duration: "",
      playing: false,
      thumb: play,
    };
  }
  componentDidMount() {
    this.fetchTrackInfo();
  }
  /**
   * Fetching all the needing information to display a track to the user
   * @function
   * @returns {void}
   */
  fetchTrackInfo = () => {
    axios
      .get("http://localhost:3000/tracks/" + this.props.id)
      .then((response) => {
        const track = response["data"];
        this.setState({
          image: track["artists"][0]["image"],
          trackName: track["name"],
          artistName: track["artists"][0]["name"],
          duration: Number(track["duartion"] / 60000).toFixed(2),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**
   * Handling the action on click on the play/pause button. It uses the player to handle it.
   * @function
   * @returns {void}
   */
  handlePlayButton = () => {
    const playing = !this.state.playing;
    const thumb = this.props.playing ? pause : play;
    this.setState({
      playing: playing,
      thumb: thumb,
    });
    this.props.playTrack.current.handlePlayPause(this.props.id, this.props.idx);
  };
  /**
   * Handling the opening/closing the dropdown list to make an action to the selected track.
   * @function
   * @returns {void}
   */
  handleDropdown = () => {
    this.props.toggleDropdown(this.props.idx, this.props.id);
  };
  render() {
    return (
      <div className="track">
        <DragHandle data-testid="handler-control" />
        <div className="content">
          <div className="play-art">
            <div
              className="track-art-work"
              style={{ backgroundImage: `url(${this.state.image})` }}
            ></div>

            <button
              className="play-pause"
              onClick={this.handlePlayButton}
              data-testid="queue-play-btn"
            >
              <img src={this.state.thumb} alt="Pause" />
            </button>
          </div>

          <div className="track-name" data-testid="queue-track-name">
            <text title="Somthing Just Like This">
              <a href="https://www.facebook.com/">{this.state.trackName}</a>
            </text>
          </div>

          <div className="artist-name" data-testid="queue-artist-name">
            <text title="The Chainsmokers & Coldplay">
              <a href="https://www.facebook.com/">{this.state.artistName}</a>
            </text>
          </div>

          <div className="duration">
            <text>{this.state.duration}</text>
          </div>

          <div className="ellipsis-container">
            <button
              className="ellipsis-icon"
              onClick={this.handleDropdown}
              data-testid="open-option-menu"
            >
              <img src={ellipsis} alt="Show More" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Track.propTypes = {
  /**
   * The index of the  track
   */
  idx: PropTypes.number.isRequired,
  /**
   * The unique id of the track
   */
  id: PropTypes.string.isRequired,
  /**
   * A function to handle playing a track from the queue
   */
  playTrack: PropTypes.func.isRequired,
  /**
   * The playing state of the parent component
   */
  playing: PropTypes.bool.isRequired,
  /**
   * Open/Close the dropdown menu function.
   */
  toggleDropdown: PropTypes.func.isRequired,
};
export default Track;
