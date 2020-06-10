import React from "react";
import "./playlist.css";
import axios from "axios";
import HeaderBodyBottom from "../commonComponents/headerBodyBottom";
import HeaderBodyTop from "./components/headerBodyTop";
import SongList from "../commonComponents/songList";
import AddToPlaylist from "../commonComponents/addToPlaylist/addToPlaylist";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import LoadingSnipper from "../LoadingSnipper/LoadingSnipper";
import PropTypes from 'prop-types';
import { base, subUrl, prodUrl } from "./../../config/environment"
import { config, isLoggedIn } from "../../utils/auth"
import {withRouter} from 'react-router-dom'
import { deleteRequest } from "../../utils/requester";

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
      clickID: "0",
      displayAdd: false,
      ownerName:'',
      toBeAdded:[]
    };
    this.playButtonClicked = this.playButtonClicked.bind(this);
    this.likeButtonClicked = this.likeButtonClicked.bind(this);
    this.addToPlaylist=this.addToPlaylist.bind(this)
  }
  /**
   * Called Whenever the user clicked on the PLAY button 
   * @func
   * @returns {void}
   */
  playButtonClicked() {
    this.setState({playing:!this.state.playing})
  }
  /**
   * Called Whenever the user clicked on the like button and it adds the playlist to the likedPlaylists
   * if it is not already there otherwise it removes it from there by a delete request
   * @func
   * @returns {void}
   */
  likeButtonClicked() {
    if (this.state.liked === false) {
      this.setState({ liked: true });
    } else {
      this.setState({ liked: false });

      axios
        .delete(`${base}/me/playlists/${this.props.id.id}`, config)
        .then(function (response) {
        })
        .catch(function (error) {
        });
    }
    
    axios
      .post(`${base}/me/playlists/`, this.props.id.id, config)
      .then(function (response) {
      })
      .catch(function (error) {
      });
  }
  /**
   * It fetches the data of the playlist from the database and checks if it exists in the likedPlaylists table
   * @func
   * @returns {void}
   */
  fetchPlaylistTracks = () => {
    axios
      .get(`${base}/playlists/${this.props.id.id}`, config)
      .then(response => {
        const playlist = response.data;
        this.setState({ tracks: playlist.tracks });
        this.setState({ playlist: playlist });
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchPlaylistTracks();
    axios
      .get(`${base}/me/playlists/contains/${this.props.id.id}`, config)
      .then(response => {
        const isFound = response.data;
        this.setState({ liked: isFound });
      })
      .catch((error) => {
      });
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.recieved === false){
    axios.get(`${base}/users/`+this.state.playlist.owner, config)
      .then((response) => {
          this.setState({recieved:true})
          const user = response.data;
          this.setState({ownerName:user.displayName});     
      })
      .catch((error) => {
          console.log(error);
      });
    }
  }
  /**
   * it changes the state so that all song will be marked as unclicked
   * @returns {void}
   */
  markAllUnclicked() {
    this.setState({ clickID: "0" });
  }
  addToPlaylist(id, flag) {
    let trackId = []
    trackId.push(id)
    console.log('addToPlaylist')
    if(!flag){
      this.setState({ displayAdd: true, toBeAdded:trackId });
    }
    else{
      axios
      .delete(`${base}/playlists/${this.state.playlist.id}/${trackId}`, config)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error.response);
      });
    }
  }
  closeAddToPlaylist() {
    this.setState({ displayAdd: false });
  }
  render() {
    const subPath = (base === prodUrl) ? subUrl : "";
    return (
      <div data-testid='BigWrapper'>
      {this.state.recieved?
        this.state.displayAdd ? (
          <AddToPlaylist
            track = {this.state.toBeAdded}
            display={this.state.displayAdd}
            close={this.closeAddToPlaylist.bind(this)}
            data-testid='addTo'
          />
        ) : (
          <div className="dummyParent"> 
          <Sidebar data-testid="sidebar"/>
              <Navbar isLoggedIn={isLoggedIn()} data-testid="navBar"/>
            <div className="profile-user">
              <div data-testid="playlist" className="playlist">
                <div className="row">
                  <div
                    data-testid="playlistHeader"
                    onClick={this.markAllUnclicked.bind(this)}
                    className="playlistHeader row col-xs-12 col-md-12 col-lg-4 col-xl-4"
                  >
                    <div
                      data-testid="playlistIamgeContainer"
                      className="playlistImageContainer col col-lg-12 col-md-4 col-sm-4 col-xs-4"
                    >
                      <img
                        data-testid="playlistIamge"
                        src={`${subPath}${this.state.playlist.image}`}
                        className="playlistImage"
                        alt="playlist img"
                      />
                    </div>
                    <div
                      data-testid="playlistHeaderBody"
                      className="playlistHeaderBody col col-lg-12 col-md-8 col-sm-8 col-xs-8"
                    >
                      <HeaderBodyTop
                        data-testid="HeaderBodyTop"
                        title={this.state.playlist.name}
                        owner={this.state.ownerName}
                        ownerId = {this.state.playlist.owner}
                      />
                      <HeaderBodyBottom
                        data-testid="HeaderBodyBottom"
                        length={this.state.tracks.length}
                        playClicked={this.playButtonClicked}
                        likeClicked={this.likeButtonClicked}
                        liked={this.state.liked}
                        playing={this.state.playing}
                        album={false}
                        context={`oud:playlist:${this.props.id.id}`}
                        webPlayer={this.props.webPlayer}
                      />
                    </div>
                  </div>
                  <SongList
                    data-testid="songList"
                    recieved={true}
                    ownerId = {this.state.playlist.owner}
                    tracks={this.state.tracks}
                    clickedItemId={this.state.clickID}
                    className="col-xs-12 col-md-12 col-lg-8 col-xl-8"
                    addToPlaylist={this.addToPlaylist}
                    fetchContext={this.fetchPlaylistTracks}
                    contextId={this.props.id.id}
                    contextType="playlist"
                    webPlayer={this.props.webPlayer}
                  />
                </div>
              </div>
            </div>
          </div>
          
        ): (
          <LoadingSnipper data-testid='loading'/>
        )}
      </div>
    );
  }
}
Playlist.propTypes = {
  id: PropTypes.objectOf(PropTypes.string)
};
export default withRouter(Playlist);
