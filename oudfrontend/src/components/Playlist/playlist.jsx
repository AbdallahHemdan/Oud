import React from 'react';
import './playlist.css';
import axios from 'axios';
import HeaderBodyBottom from '../commonComponents/headerBodyBottom'
import HeaderBodyTop from './components/headerBodyTop'
import SongList from '../commonComponents/songList'
import AddToPlaylist from "../commonComponents/addToPlaylist/addToPlaylist"
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import PropTypes from 'prop-types';
import { resume, pause, addToQueue } from '../commonComponents/utils'


/**
 * @classdesc this is a component that renders playlist page
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @param {string} id the Id of the playlist
 * @property {object} state carries the state of the component
 * @property {boolean} state.recived true if the data of the playlist is fetched correctly false otherwise
 * @property {boolean} state.liked true if the playlists is liked by the user (i.e the playlist is in the likedPlaylists table in the database)
 * @property {object} state.playlist carries all the information of the playlist
 * @property {Array.<track>} state.tracks array of all the songs in the playlist
 * @property {boolean} playing true when the playist is playing. Otherwise, it is false
 * @property {boolean} queued true when the playist is added to queue. Otherwise, it is false
 * @property {string} clikedID this is used to mark all songs as unclicked
 * @returns {
 *              <div>
 *               <div classname="playlistHeader">
 *                  <div classname="imageContainer">
 *                      <img/>
 *                  </div>
 * 
 *                  <div classname="playlistHeaderBody">
 *                      <HeaderBodyTop/>
 *                      <HeaderBodyBottom/>
 *                  </div>
 *                  <SongList/>
 *               </div>
 *              </div>
 *          
 *          }
 */
class Playlist extends React.Component {

    /** 
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            recieved: false,
            playlist: {},
            liked: false,
            playing: false,
            queued: false,
            clickID: '0',
            displayAdd: false
        };
        this.addToQueue = this.addToQueue.bind(this)
        this.resume = this.resume.bind(this)
        this.pause = this.pause.bind(this)
        this.playButtonClicked = this.playButtonClicked.bind(this)
        this.likeButtonClicked = this.likeButtonClicked.bind(this)

    }
    /**
     * add the tracks to queue and resume the player
     * @param {Array.<track>} tracks 
     * @param {number} length 
     * @returns {void}
     */
    addToQueue(tracks, length) {
        this.setState({ queued: true })
        addToQueue(tracks, length)
        this.resume()
    }
    /**
     * Called Whenever the user clicked on the PLAY button and it adds all the songs of the playlist to the queue by a post request
     * @func
     * @returns {void}
     */
    playButtonClicked() {
        //all the three requests should be put requests
        if (this.state.queued === false) {
            const tracks = this.state.tracks
            const length = this.state.tracks.length
            this.addToQueue(tracks, length)
        }
        if (this.state.playing === true) {
            this.pause()
        }
        else {
            this.resume()
        }
    }
    /**
     * pauses the player
     * @returns {void}
     */
    pause() {
        pause()
        this.setState({ playing: false })
    }
    /**
     * resumes the player
     * @returns {void}
     * 
     */
    resume() {
        resume()
        this.setState({ playing: true })
    }

    /**
     * Called Whenever the user clicked on the like button and it adds the playlist to the likedPlaylists 
     * if it is not already there otherwise it removes it from there by a delete request
     * @func
     * @returns {void}
     */
    likeButtonClicked() {
        const likedPlaylist = this.state.playlist
        if (this.state.liked === false) {
            this.setState({ liked: true })

        }
        else {
            this.setState({ liked: false })

            axios.delete(`http://localhost:2022/likedPlaylists/${this.props.id.id}`)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        axios.post('http://localhost:2022/likedPlaylists/', likedPlaylist)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    /**
     * It fetches the data of the playlist from the database and checks if it exists in the likedPlaylists table
     * @func
     * @returns {void}
     */
    componentDidMount() {
        axios.get(`http://localhost:2022/playlist/${this.props.id.id}`)
            .then((response) => {
                const playlist = response.data;
                this.setState({ tracks: playlist.tracks });
                this.setState({ recieved: true })
                this.setState({ playlist: playlist })
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`http://localhost:2022/me/playlist/contains/${this.props.id}`)
            .then((response) => {
                console.log(response);
                const isFound = response.data
                this.setState({ liked: isFound })
            })
            .catch((error) => {
                console.log(error);
            });
        /*axios.get(`http://localhost:2022/likedPlaylists/${this.props.id.id}`)
        .then((response) => {
            console.log(response);
            this.setState({ liked: true })
        })
        .catch((error) => {
            console.log(error);
        });*/
    }
    /**
     * it changes the state so that all song will be marked as unclicked
     * @returns {void}
     */
    markAllUnclicked() {
        this.setState({ clickID: '0' })

    }
    addToPlaylist() {
        this.setState({ displayAdd: true })
    }
    closeAddToPlaylist() {
        this.setState({ displayAdd: false })

    }
    render() {
        return (
            <div>
                {this.state.displayAdd ? <AddToPlaylist
                    display={this.state.displayAdd}
                    close={this.closeAddToPlaylist.bind(this)}
                /> :
                    <div className="dummyParent">
                        <Sidebar />
                        <Navbar isLoggedIn={true} />
                        <div className='profile-user'>
                            <div data-testid='playlist' className='playlist'>
                                <div className='row'>
                                    <div data-testid="playlistHeader" onClick={this.markAllUnclicked.bind(this)}
                                        className='playlistHeader row col-xs-12 col-md-12 col-lg-4 col-xl-4'>
                                        <div data-testid="playlistIamgeContainer" className='playlistImageContainer col col-lg-12 col-md-4 col-sm-4 col-xs-4'>
                                            <img data-testid="playlistIamge" src={this.state.playlist.image} className='playlistImage' alt='playlist img' />
                                        </div>
                                        <div data-testid="playlistHeaderBody" className='playlistHeaderBody col col-lg-12 col-md-8 col-sm-8 col-xs-8'>
                                            <HeaderBodyTop
                                                data-testid="HeaderBodyTop"
                                                title={this.state.playlist.name}
                                                owner={this.state.playlist.owner}
                                            />
                                            <HeaderBodyBottom
                                                data-testid="HeaderBodyBottom"
                                                length={this.state.tracks.length}
                                                playClicked={this.playButtonClicked}
                                                likeClicked={this.likeButtonClicked}
                                                liked={this.state.liked}
                                                playing={this.state.playing}
                                                album={false}

                                            />
                                        </div>
                                    </div>
                                    <SongList
                                        data-testid="songList"
                                        recieved={this.state.recieved}
                                        tracks={this.state.tracks}
                                        pause={this.pause}
                                        resume={this.resume}
                                        addToQueue={this.addToQueue}
                                        clickedItemId={this.state.clickID}
                                        className="col-xs-12 col-md-12 col-lg-8 col-xl-8"
                                        addToPlaylist={this.addToPlaylist.bind(this)}

                                    />

                                </div>
                            </div>
                        </div>
                    </div>}
            </div>

        );
    }
}
Playlist.propTypes = {
    id: PropTypes.objectOf(PropTypes.string)
};
export default Playlist;