import React, { Component } from "react";
import "./SearchCard.css";
import { Link, withRouter } from "react-router-dom"
import { base, subUrl, prodUrl } from "./../../config/environment"
import { config } from "./../../utils/auth";
import PropTypes from "prop-types";
import axios from 'axios';

/**
 * Music card component which render and display the playlist card of a specific category 
 * 
 * @author Abdallah Hemdan
 * 
 * @component
 * 
 */

class SearchCard extends Component {
  /**
   * @constructor
   * 
   * @param {object} props - get musicItem (playlist date and props from the MusicItems component)
   * @param {string} _id - The _id of the playlist
   * @param {string} name - The name of the playlist
   * @param {string} owner - The owner of the playlist
   * @param {boolean} collaborative - Variable to check if the owner allows other users to modify the playlist.
   * @param {string} description - The description of the playlist
   * @param {string} isPublic - The playlist’s public/private status: true the playlist is public, false the playlist is private
   * @param {string} image - The image of the playlist
   * @param {string} type - The type of the playlist
   */
  constructor(props) {
    super(props)
    const { id, name, image, type } = this.props;
    // console.log("Props in Search Card", this.props)
    this.state = {
      id,
      name,
      image,
      type,
      playBtn: this.props.playBtn,
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
    if (base === prodUrl) { // in production mode
      console.log("Congratulations, All is done");
      const requestUrl = `${base}/me/search/recent`;
      const recentSearchedData = {
        id: this.state.id,
        type: this.state.type
      };
      axios.put(requestUrl, recentSearchedData, config)
        .then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err);
        });
    }
    this.props.history.push(`${this.state.type}/${this.state.id}`);
  }

  /**
   * Function to handle playing music on clicking on
   * play icon the music card
   * 
   * @function
   * 
   * @param {object} event - an event to use it in
   * disabling the default of the propagation 
   * 
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
    const subPath = (base === prodUrl) ? subUrl : "";
    const cardClass = (this.state.isHidden) ? "hidden-card" : "card"
    return (
      <div
        className="card-container"
        data-testid="card-container"
      >
        <div className={cardClass}
          data-testid={cardClass}
        >
          <div
            className="overlayer"
            onClick={this.handlePlaylistClick}
            data-testid="overlayer"
          >
            {
              this.state.playBtn ?
                < button
                  className="play-btn"
                  onClick={this.handlePlayClick}
                  data-testid="play-btn"
                >
                  <i
                    className="fa fa-play-circle play-circle"
                    data-testid="play-circle"
                  >
                  </i>
                </button>
                :
                null
            }
          </div>
          <img
            src={`${subPath}${this.state.image}`}
            alt="playlist cover"
            data-testid="playlist-image"
          />
          <div
            className="title"
            data-testid="playlist-title"
          >
            <Link
              to={`${this.state.type}/${this.state.id}`}
              className="playlist-link"
              data-testid="playlist-link"
            >{this.state.name}</Link>
          </div>
        </div>
      </div >
    );
  }
}

SearchCard.propTypes = {
  item: PropTypes.object
}

export default withRouter(SearchCard);
