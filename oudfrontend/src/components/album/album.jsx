import React from "react";
import axios from "axios";
import HeaderBodyBottom from "../commonComponents/headerBodyBottom";
import HeaderBodyTop from "./components/headerBodyTop";
import SongList from "../commonComponents/songList";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import CreateAlbum from "../CreateAlbum/CreateAlbum";
import { deleteRequest } from "../../utils/requester";
import Swal from "sweetalert2";
import { isArtist } from "./../../utils/auth";
import { createBrowserHistory } from "history";
import SongInfo from "./../SongInfo/SongInfo";
import AddToPlaylist from "../commonComponents/addToPlaylist/addToPlaylist"
import PropTypes from 'prop-types';
import { base, subUrl, prodUrl } from "./../../config/environment"
import {config, isLoggedIn} from "../../utils/auth"
import {withRouter} from 'react-router-dom'
let history = createBrowserHistory();


/**
 * @classdesc this is a component that renders album page
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @param {string} id the Id of the album
 * @property {object} state carries the state of the component
 * @property {boolean} state.recived true if the data of the album is fetched correctly false otherwise
 * @property {boolean} state.liked true if the album is liked by the user (i.e the album is in the likedAlbums table in the database)
 * @property {object} state.album carries all the information of the album
 * @property {Array.<track>} state.tracks array of all the songs in the album
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
class Album extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    // const history = useHistory();
    this.state = {
      tracks: [],
      artists: [],
      recieved: false,
      album: {},
      liked: false,
      playing: false,
      queued: false,
      clickID: "0",
      displayAdd: false,
      toBeAdded:[],
      updateAlbum: false,
      isArtist: false,
      addSong: false
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
    //all the three requests should be put requests
    this.setState({ playing: !this.state.playing });
    
  }
  /**
   * Called Whenever the user clicked on the like button and it adds the playlist to the likedPlaylists
   * if it is not already there otherwise it removes it from there by a delete request
   * @func
   * @returns {void}
   */
  likeButtonClicked(){
    if (this.state.liked === false) {
      this.setState({ liked: true });
      axios
        .put(`${base}/me/albums/${this.props.id}`, config)
        .then(function (response) {
        })
        .catch(function(error) {
        });
    } else {
      this.setState({ liked: false });

      axios
        .delete(`${base}/me/albums/${this.props.id}`, config)
        .then(function (response) {
        })
        .catch(function(error) {
        });
    }
  }
  /**
   * It fetches the data of the album from the database and checks if it exists in the likedAlbums table
   * @func
   * @returns {void}
   */
  fetchAlbumTracks = () => {
    axios
      .get(`${base}/albums/${this.props.id}`, config)
      .then(response => {
        const album = response.data;
        this.setState({ 
          tracks: album.tracks.items,
          artists: album.artists,
          album: album,
          recieved: true 
        });
      })
      .catch(error => {
      });
  };
  componentDidMount() {
    this.fetchAlbumTracks();
    axios
      .get(`${base}/me/albums/contains/${this.props.id}`, config)
      .then(response => {
        const isFound = response.data;
        this.setState({ liked: isFound });
      })
      .catch((error) => {
      });
      if(this.props.songId !== null)
        this.playOnLoading()
  }
  playOnLoading(){
    let body ={
      contextUri: `oud:album:${this.props.id}`,
      offset: {"uri":`oud:track:${this.props.songId}`}
    }
    console.log('playing')
    axios
      .put(`${base}/me/player/play/`, body,config)
      .then((response) => {
      
      })
      .catch((error) => {
      });
    this.checkArtist();
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
  changeEditAlbumState = () => {
    this.setState({
      updateAlbum: !this.state.updateAlbum
    });
  };
  delelteAlbum = () => {
    deleteRequest(`${base}/me/artists/albums/${this.props.id}`)
      .then(response => {
        Swal.fire({
          title: "Done!",
          text: "Album Deleted Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        });
        history.goBack();
      })
      .catch(error => {
      });
  };
  checkArtist = () => {
    isArtist()
      .then(res => {
        this.setState({ isArtist: res });
      })
      .catch(error => {
      });
  };
  addSong = () => {
    this.setState({
      addSong: true
    });
  };
  closeAddSong = () => {
    this.setState({
      addSong: false
    });
  };
  render() {
    const subPath = (base === prodUrl) ? subUrl : "";
    return (
      <div data-testid="BigWrapper">
        {this.state.displayAdd ? (
          <AddToPlaylist
            track = {this.state.toBeAdded}
            display={this.state.displayAdd}
            close={this.closeAddToPlaylist.bind(this)}
            data-testid="addTo"
          />
        ) : this.state.updateAlbum ? (
          <CreateAlbum
            endpoint={`${base}/me/artists/albums/${this.props.id}`}
            title="Edit Album"
            update={true}
            onClose={this.changeEditAlbumState}
          />
        ) : this.state.addSong ? (
          <SongInfo
            closeAddSong={this.closeAddSong}
            newSong={true}
            albumId={this.props.id}
          />
        ) : (
          <div className="dummyParent">
            <Sidebar data-testid="sidebar"/>
            <Navbar isLoggedIn={isLoggedIn()} data-testid="navBar"/>
            <div className="profile-user">
              <div data-testid="album" className="playlist">
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
                        src={`${subPath}${this.state.album.image}`}
                        className="playlistImage"
                        alt="album img"
                      />
                    </div>
                    <div
                      data-testid="playlistHeaderBody"
                      className="playlistHeaderBody col col-lg-12 col-md-8 col-sm-8 col-xs-8"
                    >
                      <HeaderBodyTop
                        data-testid="HeaderBodyTop"
                        title={this.state.album.name}
                        artists={this.state.artists}
                      />

                      <HeaderBodyBottom
                        data-testid="HeaderBodyBottom"
                        length={this.state.tracks.length}
                        playClicked={this.playButtonClicked}
                        likeClicked={this.likeButtonClicked}
                        liked={this.state.liked}
                        playing={this.state.playing}
                        releaseDate={this.state.album.release_date}
                        recieved={this.state.recieved}
                        album={true}
                        isArtist={this.state.isArtist}
                        changeEditAlbumState={this.changeEditAlbumState}
                        delelteAlbum={this.delelteAlbum}
                        addSong={this.addSong}
                        contextId={this.props.id}
                        context={`oud:album:${this.props.id}`}
                        webPlayer={this.props.webPlayer}
                      />
                    </div>
                  </div>
                  <SongList
                    data-testid="songList"
                    recieved={this.state.recieved}
                    tracks={this.state.tracks}
                    clickedItemId={this.state.clickID}
                    className="col-xs-12 col-md-12 col-lg-8 col-xl-8"
                    addToPlaylist={this.addToPlaylist}
                    fetchContext={this.fetchAlbumTracks}
                    contextId={this.props.id}
                    contextType="album"
                    webPlayer={this.props.webPlayer}
                    album={true}
                    albumId={this.props.id}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
Album.propTypes = {
  id: PropTypes.string
};
export default withRouter(Album);
