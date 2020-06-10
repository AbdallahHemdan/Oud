import React, {Component} from "react";
import { Redirect, BrowserRouter} from "react-router-dom";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";
import {config} from '../../../utils/auth'
import {base} from '../../../config/environment'
import axios from 'axios'
/**
 * this is a component that renders the bottom of the body of playlists, albums, likedSongs
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @func
 * @param {number} length the number of songs in the playlists, albums, likedSongs
 * @param {func} playClicked a function that is called when the playButtoon is clicked to add the playlists, albums, likedSongs to queue
 * @param {boolean} playing means that the playlist is playing used to conditionaly render the text of playButton with 'play' or 'pause'
 * @returns {<div>
 * <button></button>
 * <button></button>
 * <p></p>
 * </div>}
 */
let history = createBrowserHistory();
class HeaderBody extends Component{
  constructor(props){
    super(props);
    this.state = {
      redirect:null,
      displayName:'',
      id:'',
      start:false
    }
  }
  redirect(route){
    this.setState({redirect:route})
  }
  componentDidMount(){
    axios.get(`${base}/me/`, config)
        .then((response) => {
            const user = response.data;
            this.setState({displayName:user.displayName, id:user.id});
        })
        .catch((error) => {
            console.log(error);
        });
  }
  handlePlayClick = e => {
    e.stopPropagation();
    if (!this.state.start) this.setState({ start: true });
    let uris = [];
    this.props.tracks.forEach(track => {
      uris.push(`oud:track:${track.id}`);
    });
    this.props.webPlayer.current.playContext(
      null,
      uris,
      this.props.clickedItemId,
      0,
      true,
      this.state.start
    );
    this.props.playClicked();
  };
  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
  return (
    <BrowserRouter>
    <div data-testid="HeaderBody">
      <h2 data-testid="title" className="gray-text likedSongsTitle">
        Liked Songs
      </h2>
      <button
        data-testid="owner"
        className="playlistAnchor songButton block"
        onClick={() => {
          this.redirect(`/profile/${this.state.id}`)
        }}
      >
      {this.state.displayName}
      </button>
      <button
        onClick={()=>this.handlePlayClick}
        data-testid="playButton"
        className="playButton"
        variant="outline-success"
      >
        {this.props.playing ? "PAUSE" : "PLAY"}
      </button>
      <p className="likedSongsTitle gray-text">
        <span data-testid="songsNumber">{this.props.length} </span>
        <span data-testid="songsLiteral">{this.props.length > 1 ? "songs" : "song"}</span>
      </p>
    </div>
    </BrowserRouter>
  );
      
}
}
HeaderBody.propTypes = {
  length: PropTypes.number,
  playing: PropTypes.bool,
  playClicked: PropTypes.func
};

export default HeaderBody;
