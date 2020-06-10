import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
/**
 * this is a component that renders the bottom of the body of playlists, albums, likedSongs
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @func
 * @param {number} length the number of songs in the playlists, albums, likedSongs
 * @param {func} playClicked a function that is called when the playButtoon is clicked to add the playlists, albums, likedSongs to queue
 * @param {func} likeClicked a function that is called when the likeButtoon is clicked to add the playlists, albums to library
 * @param {boolean} liked used to indicate the state of like icon it is true when the playlist or album is in the library and false otherwise
 * @param {boolean} playing means that the playlist is playing used to conditionaly render the text of playButton with 'play' or 'pause'
 * @param {boolean} recieved true if the data is retrieved successfuly at parent
 * @param {boolean} album true if the parent is album
 * @param {string} releaseDate the release date of the album
 * @returns {<div>
 * <button></button>
 * <button></button>
 * <p></p>
 * </div>}
 */
// function checkArtist(){
//   isArtist().then(artist)
// }
class HeaderBodyBottom extends Component {
  constructor(props) {
    super(props);
    this.state = { start: false };
  }
  handlePlayClick = e => {
    e.stopPropagation();
    if (!this.state.start) this.setState({ start: true });
    this.props.webPlayer.current.playContext(
      this.props.context,
      [],
      0,
      0,
      false,
      this.state.start
    );
    this.props.playClicked();
  };
  render() {
    return (
      <div data-testid="HeaderBodyBottom" class="playlistHeaderBodyBottom">
        <button
          onClick={this.handlePlayClick}
          data-testid="playButton"
          className="playButton"
          variant="outline-success"
        >
          {this.props.playing ? "PAUSE" : "PLAY"}
        </button>

        <button
          data-testid="likeIcon"
          className="likeIcon"
          onClick={this.props.likeClicked}
        >
          {this.props.liked ? (
            <i className="fa fa-heart"></i>
          ) : (
            <i class="far fa-heart"></i>
          )}
        </button>
        {this.props.album ? (
          <Fragment>
            {this.props.isArtist && (
              <Fragment>
                <button className="likeIcon" onClick={this.props.addSong}>
                  <i class="fa fa-plus"></i>
                </button>
                <button
                  className="likeIcon"
                  onClick={this.props.changeEditAlbumState}
                >
                  <i class="fa fa-pencil-square-o"></i>
                </button>
                <button className="likeIcon" onClick={this.props.delelteAlbum}>
                  <i class="fa fa-trash-alt"></i>
                </button>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <span></span>
        )}
        <p>
          <span data-testid="releaseDate" className="gray-text">
            {this.props.recieved ? this.props.releaseDate.slice(0, 4) : ""}
            <h2 data-testid="separatingDot" className="inline">
              {this.props.album ? "." : ""}
            </h2>
          </span>
          <span data-testid="songsNumber" className="gray-text">
            {this.props.length}{" "}
          </span>
          <span data-testid="songsLiteral" className="gray-text">
            {this.props.length > 1 ? "songs" : "song"}
          </span>
        </p>
      </div>
    );
  }
}

HeaderBodyBottom.propTypes = {
  length: PropTypes.number,
  liked: PropTypes.bool,
  playing: PropTypes.bool,
  likeClicked: PropTypes.func,
  playClicked: PropTypes.func,
  releaseDate: PropTypes.string,
  recieved: PropTypes.bool,
  album: PropTypes.bool
};

export default HeaderBodyBottom;
