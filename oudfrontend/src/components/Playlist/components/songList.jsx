import React from 'react';
import Song from '../../song/song'
import PropTypes from 'prop-types';

/**
 * this is a component that renders the list of songs in playlists, albums, likedSongs or a "loading" animation if the songs are not recieved
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @func
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


function SongList(props){
    const {recieved, tracks} = props;
    return(
        <div data-testid="songsList" className='col-xs-8 col-md-6 col-lg-8 col-xl-8'>
            {recieved?
                tracks.map((track) => {return <Song data-testid='songElement' track={track}/>})
                :<h1 data-testid='loading'>LOADING ...</h1>
            }
                
        </div>
    );
}
SongList.propTypes={
    recieved : PropTypes.bool,
    tracks : PropTypes.array
}
export default SongList;