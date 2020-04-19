import React from "react";
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

function HeaderBodyBottom(props) {
  const {
    length,
    playClicked,
    likeClicked,
    liked,
    playing,
    releaseDate,
    recieved,
    album,
    addToPlaylist,
  } = props;

  return (
    <div data-testid="HeaderBodyBottom" class="playlistHeaderBodyBottom">
      <button
        onClick={playClicked}
        data-testid="playButton"
        className="playButton"
        variant="outline-success"
      >
        {playing ? "PAUSE" : "PLAY"}
      </button>

      <button data-testid="likeIcon" className="likeIcon" onClick={likeClicked}>
        {liked ? <i className="far fa-heart"></i> : <i class="fa fa-heart"></i>}
      </button>
      {album ? (
        <button className="likeIcon" onClick={addToPlaylist}>
          <i class="fa fa-plus"></i>
        </button>
      ) : (
        <span></span>
      )}
      <p>
        <span data-testid="releaseDate" className="gray-text">
          {recieved ? releaseDate.slice(0, 4) : ""}
          <h2 data-testid="separatingDot" className="inline">
            {album ? "." : ""}
          </h2>
        </span>
        <span data-testid="songsNumber" className="gray-text">
          {length}{" "}
        </span>
        <span data-testid="songsLiteral" className="gray-text">
          {length > 1 ? "songs" : "song"}
        </span>
      </p>
    </div>
  );
}

HeaderBodyBottom.propTypes = {
  length: PropTypes.number,
  liked: PropTypes.bool,
  playing: PropTypes.bool,
  likeClicked: PropTypes.func,
  playClicked: PropTypes.func,
  releaseDate: PropTypes.string,
  recieved: PropTypes.bool,
  album: PropTypes.bool,
};

export default HeaderBodyBottom;
