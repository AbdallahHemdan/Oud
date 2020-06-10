import React, { Component } from "react";
import Song from "./song/song";
import PropTypes from "prop-types";
import axios from "axios";
import { base } from "../../config/environment";
import { config } from "../../utils/auth";
import LoadingSnipper from "../LoadingSnipper/LoadingSnipper";

/**
 * this is a component that renders the list of songs in playlists, albums, likedSongs or a "loading" animation if the songs are not recieved
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @param {boolean} recieved the number of songs in the playlists, albums, likedSongs
 * @param {object} track song object
 * @param {string} track._id track id
 * @param {string} track.name track title
 * @param {string} track.albumId the id of the track's album
 * @param {string} track.type the type of music that the track belongs to
 * @param {string} track.audioUrl the URL of the track
 * @param {string} artist._id the Id of the singer
 * @param {string} artist.name name of the singer
 * @param {string} artist.type the type of music that the artist produces
 * @param {string} artist.image Image of the artist
 * @param {Array.<artist>} track.artists the artists that produced the track
 * @param {Array.<track>} tracks array of songs to be rendered
 * @param {func} pause pauses the player
 * @param {func} resume resumes the player
 * @param {func} addToQueue adds array of tracks to queue
 * @param {string} clickedItemId used to mark all songs as unclicked
 *
 * @returns {
 *              <div>
 *                  <Song></Song>
 *                  .
 *                  .
 *                  .              number of songs in the tracks array
 *                  .
 *                  .
 *              </div>
 *          }
 */

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItemId: "0",
      playing: false,
      playingItemId: "0"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }
  /**
   * it sets the state tothe new ID so it is sent to all the songs
   * @param {string} id the id of the calling song
   */
  handleClick(id) {
    this.setState({ clickedItemId: id });
  }
  /**
   *if the recieved props is changed it sets the state to the new props
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.clickedItemId !== this.state.clickedItemId) {
      this.setState({ clickedItemId: nextProps.clickedItemId });
    }
    console.log(this.props.recieved)
  }
  /**
   * if the calling song is playing it pauses/resums the player
   * @param {sttring} id the id of the calling song
   */
  handlePlay(id) {
    if (
      this.props.contextType === "album" ||
      this.props.contextType === "playlist"
    ) {
      const contextUri = `oud:${this.props.contextType}:${this.props.contextId}`;
      this.props.webPlayer.current.playContext(
        contextUri,
        [],
        this.props.clickedItemId,
        0
      );
    } else {
      let uris = [];
      this.props.tracks.forEach(track => {
        uris.push(`oud:track:${track.id}`);
      });
      this.props.webPlayer.current.playContext(
        null,
        uris,
        this.props.clickedItemId,
        0,
        true
      );
    }
    this.setState({
      playing: !this.state.playing
    });
  }
  render() {
    return (
      <div
        data-testid="songsList"
        className="col-xs-8 col-md-6 col-lg-8 col-xl-8"
      >
        {this.props.recieved ? (
          this.props.tracks.map((track, index) => {
            return (
              <Song
                data-testid="songElement"
                key={track.id}
                ownerId = {this.props.ownerId}
                track={track}
                index={index}
                clickedId={this.state.clickedItemId}
                playingItemId={this.state.playingItemId}
                handlePlay={this.handlePlay}
                addToPlaylist={this.props.addToPlaylist}
                album={this.props.album}
                albumId={this.props.albumId}
                fetchContext={this.props.fetchContext}
                handleClick={this.handleClick}
              />
            );
          }))
        : (
          <LoadingSnipper data-testid="loading"/>
        )}
      </div>
    );
  }
}
SongList.propTypes = {
  recieved: PropTypes.bool,
  tracks: PropTypes.array,
  pause: PropTypes.func,
  resume: PropTypes.func,
  addToQueue: PropTypes.func,
  clickedItemId: PropTypes.string
};
export default SongList;
