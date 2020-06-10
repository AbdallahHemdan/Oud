import React, { Component } from "react";
import "./MusicCard.css";
import { Link, withRouter } from "react-router-dom";
import { base, subUrl, prodUrl } from "./../../config/environment";

/**
 * Music card component which render and display the playlist card of a specific category
 *
 * @author Abdallah Hemdan
 *
 * @component
 *
 */

class MusicCard extends Component {
  /**
   * @constructor
   *
   * @param {object} props - get musicItem (playlist date and props from the MusicItems component)
   * @param {string} _id - The _id of the playlist
   * @param {string} name - The name of the playlist
   * @param {string} owner - The owner of the playlist
   * @param {boolean} collaborative - Variable to check if the owner allows other users to modify the playlist.
   * @param {string} description - The description of the playlist
   * @param {string} isPublic - The playlist’s public/private status: true the playlist is public, false the playlist is private
   * @param {string} image - The image of the playlist
   * @param {string} type - The type of the playlist
   */
  constructor(props) {
    super(props);
    const {
      _id,
      name,
      owner,
      collaborative,
      description,
      isPublic,
      type,
      image,
    } = this.props.item;
    this.state = {
      /**
       * The _id of the playlist
       *
       * @type {string}
       */
      _id: _id,

      /**
       * The name of the playlist
       *
       * @type {string}
       */
      name: name,

      /**
       * The owner of the playlist
       *
       * @type {string}
       */
      owner: owner,

      /**
       * Variable to check if the owner allows other users to modify the playlist.
       *
       * @type {boolean}
       */
      collaborative: collaborative,

      /**
       * The description of the playlist
       *
       * @type {string}
       */
      description: description,

      /**
       * The playlist’s public/private status: true the playlist is public,
       * false the playlist is private
       *
       * @type {boolean}
       */
      public: isPublic,

      /**
       * The image of the playlist
       *
       * @type {string}
       */
      image: image,

      /**
       * 	The object type: “playlist”
       *
       * @type {string}
       */
      type: type,
      /**
       * Variable to determine show or hide play button
       * @type {Boolean}
       */
      playBtn: this.props.playBtn,
      isHidden: this.props.isHidden,
    };
  }

  /**
   * Function to handle navigation to the playlist page
   * on clicking on the music card
   *
   * @function
   *
   * @return {void}
   *
   */
  handlePlaylistClick = () => {
    this.props.history.push(`${this.state.type}/${this.state._id}`);
  };

  /**
   * Function to handle playing music on clicking on
   * play icon the music card
   *
   * @function
   *
   * @param {object} event - an event to use it in
   * disabling the default of the propagation
   */
  handlePlayClick = e => {
    e.stopPropagation();

    //after everything is this id should be variable
    const playlistId = "5e6dea511e17a305285ba616",
      contextUri = `oud:playlist:${playlistId}`;
    // {
    //   context_uri: `oud:playlist:${playlistId}`,
    // };
    this.props.webPlayer.current.playContext(contextUri, [], 0, 0);
    console.log("🎵 music is playing now");
  };

  /**
   * @function
   *
   * @name render
   *
   * @description Render Music card components..
   *
   * @returns {JSX} Component for App
   */
  render() {
    const subPath = base === prodUrl ? subUrl : "";
    const cardClass = this.state.isHidden ? "hidden-card" : "card";
    return (
      <div className="card-container" data-testid="card-container">
        <div className={cardClass} data-testid={cardClass}>
          <div
            className="overlayer"
            onClick={ this.props.handleClickOutside ?  this.props.handleClickOutside : this.handlePlaylistClick}
          
            data-testid="overlay"
          >
            {this.state.playBtn ? (
              <button
                className="play-btn"
                onClick={this.handlePlayClick}
                data-testid="play-btn"
              >
                <i
                  className="fa fa-play-circle play-circle"
                  data-testid="play-circle"
                ></i>
              </button>
            ) : null}
          </div>
          <img
            src={`${subPath}${this.state.image}`}
            alt="playlist cover"
            data-testid="playlist-image"
          />
          <div className="title" data-testid="playlist-title">
            <Link
              to={`${this.state.type}/${this.state._id}`}
              className="playlist-link"
              data-testid="playlist-link"
            >
              {this.state.name}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MusicCard);
