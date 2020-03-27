import React, { Component } from "react";
import "./MusicCard.css";
import { Link, withRouter } from "react-router-dom"


/**
 * Music card component which render and display the playlist card of a specific category 
 * 
 * @author Abdallah Hemdan
 * 
 * @component
 * 
 */

class MusicCard extends Component {
  /**
   * @constructor
   * 
   * @param {object} props - get musicItem (playlist date and props from the MusicItems component)
   */
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  /**
   * Function to handle navigation to the playlist page
   * on clicking on the music card
   * 
   * @function
   * 
   * @return {void}
   * 
   */
  handlePlaylistClick = () => {
    this.props.history.push('playlist');
  }

  /**
   * Function to handle playing music on clicking on
   * play icon the music card
   * 
   * @function
   * 
   * @param {object} event - an event to use it in
   * disabling the default of the propagation 
   */
  handlePlayClick = (e) => {
    e.stopPropagation();
    console.log("🎵 music is playing now");
  }

  /**
   * @function
   * 
   * @name render
   * 
   * @description Render Music card components..
   * 
   * @returns {JSX} Component for App
   */
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
