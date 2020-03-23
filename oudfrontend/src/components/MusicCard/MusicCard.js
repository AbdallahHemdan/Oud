import React, { Component } from "react";
import "./MusicCard.css";
import { Link } from "react-router-dom"
class MusicCard extends Component {
  render() {
    return (
      <div className="card-container">
        {/* <Link to="playlist"> */}
        <div className="card">
          <Link to="playlist">
            <div className="overlayer">
              <button className="play-btn"><i className="fa fa-play-circle play-circle"></i></button>
            </div>
          </Link>
          <img src={this.props.img} alt="" />
          <div className="title">
            <Link to="playlist" className="playlist-link">Amr Diab</Link>
          </div>
        </div>
        {/* </Link> */}
      </div >
    );
  }
}

export default MusicCard;
