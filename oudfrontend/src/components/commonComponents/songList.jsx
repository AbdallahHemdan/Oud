import React, { Component } from 'react';
import Song from './song/song'
import PropTypes from 'prop-types';
import axios from 'axios'
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
        super(props)
        this.state = {
            clickedItemId: '0',
            playing: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.handleQueue = this.handleQueue.bind(this)
    }
    /**
     * it sets the state tothe new ID so it is sent to all the songs 
     * @param {string} id the id of the calling song
     */
    handleClick(id) {
        this.setState({ clickedItemId: id })
    }
    /**
     *if the recieved props is changed it sets the state to the new props
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.clickedItemId !== this.state.clickedItemId) {
            this.setState({ clickedItemId: nextProps.clickedItemId })
        }
    }
    /**
     * it adds all the songs after the calling song to the queue
     * @param {string} id the id of the calling song
     */
    handleQueue(id) {
        let flag = false
        let queue = []
        for (let i = 0; i < this.props.tracks.length; i++) {
            if (flag || this.props.tracks[i].id === id) {
                flag = true
                queue.push(this.props.tracks[i])
            }
        }
        this.props.addToQueue(queue, queue.length)
    }
    /**
     * if the calling song is playing it pauses/resums the player
     * otherwise, it calls handleQueue
     * @param {sttring} id the id of the calling song 
     */
    handlePlay(id) {
        let playingId;
        axios.get('http://localhost:2022/player/currently-playing')
            .then((response) => {
                playingId = response.data.item.id
            })
            .catch((error) => {
                console.log(error);
            });
        if (id === playingId) {
            this.setState({ playing: !this.state.playing })
            if (this.state.playing === true) {
                this.props.play()
            }
            else {
                this.props.pause()
            }

        }
        else {
            this.handleQueue(id)
        }

    }

    render() {
        return (
            <div data-testid="songsList" className='col-xs-8 col-md-6 col-lg-8 col-xl-8'>
                {this.props.recieved ?
                    this.props.tracks.map((track) => {
                        return (
                            <Song data-testid='songElement'
                                key={track.id} track={track}
                                clickedId={this.state.clickedItemId}
                                handleClick={this.handleClick}
                                handlePlay={this.handlePlay}
                            />);
                    })
                    : <h1 data-testid='loading'>LOADING ...</h1>
                }

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
}
export default SongList;