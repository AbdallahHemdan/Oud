import React, { Component } from "react";
import "./MusicCard.css";
import { Link, withRouter } from "react-router-dom"
class MusicCard extends Component {
  handlePlaylistClick = (e) => {
    this.props.history.push('playlist');
  }
  handlePlayClick = (e) => {
    e.stopPropagation();
    console.log("🎵 music is playing now");
  }
  render() {
    return (
      <div className="card-container">
        <div className="card">
          <div className="overlayer" onClick={this.handlePlaylistClick}>
            <button
              className="play-btn"
              onClick={this.handlePlayClick}>
              <i className="fa fa-play-circle play-circle">
              </i></button>
          </div>
          <img src={this.props.img} alt="" />
          <div className="title">
            <Link to="/playlist" className="playlist-link">Hamza Namira</Link>
          </div>
        </div>
      </div >
    );
  }
}

export default withRouter(MusicCard);
