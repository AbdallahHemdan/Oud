import React, { Component } from "react";
import "./createPlaylist.css";
import axios from "axios";
import getUserId from "../Profile/General/getUserId";
import { base } from "../../config/environment";
import { config } from "../../utils/auth";

/**
 * it is an overlay that is used to create a new playlist
 * @class
 * @param {boolean} display true ifthe component is to be visible
 * @property {boolean} display true when the component is visible
 * @property {string} name name of the new playlist
 */
class CreatePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      name: ""
    };
  }
  /**
   * if the component recieved new props it sets the display property to it
   * @param {object} nextProps new props
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.display !== this.state.display) {
      this.setState({ display: nextProps.display });
    }
  }
  /**
   * updates the state to the contents of the textbox
   * @param {event} e the event of changing the text
   * @returns {void}
   */
  updateName(e) {
    const name = e.target.value;
    this.setState({ name: name });
  }
  /**
   * creates a playlist object and sends to the database
   * @returns {void}
   */
  createPlaylist() {
    let playlist = {
      name: this.state.name,
      public: true,
      collaborative: false,
      description: "",
      "image/png": ""
    };
    let id = getUserId();
    axios
      .post(`${base}/users/${id}/playlists`, playlist, config)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  /**
   * closes the window by making state.display false
   * @returns {void}
   */
  close() {
    this.setState({ display: false });
  }
  render() {
    return (
      <div
        className={
          this.state.display ? "createPlaylist" : "createPlaylist hide"
        }
      >
        <button onClick={this.close.bind(this)} className="closeButton">
          <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <title>close</title>
            <path
              d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
              fill="#fff"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
        <h1 id="createPlaylistTitle">Create new playlist</h1>

        <div id="createPlaylistBigField">
          <div id="createPlaylistContainer">
            <p className="gray-text">Playlist Name</p>
            <input
              id="cretePLaylistName"
              type="text"
              onChange={this.updateName.bind(this)}
              placeholder="New Playlist"
            />
          </div>
        </div>
        <button id="cancelCreation" onClick={this.close.bind(this)}>
          CANCEL
        </button>
        <button
          className="playButton"
          id="ceatePlaylistBtn"
          onClick={this.createPlaylist.bind(this)}
        >
          CREATE
        </button>
      </div>
    );
  }
}

export default CreatePlaylist;
