import React, { Component } from "react";
import "./GenreCard.css";
import { Link, withRouter } from "react-router-dom"

/**
 * Music card component which render and display the playlist card of a specific category 
 * 
 * @author Abdallah Hemdan
 * 
 * @component
 * 
 */

class GenreCard extends Component {
  /**
   * @constructor
   * 
   * @param {object} props - get musicItem (playlist date and props from the MusicItems component)
   * @param {string} id - The id of the playlist
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
    const
      {
        id,
        name
      } = this.props.item;

    this.state = {

      /**
       * The id of the playlist
       * 
       * @type {string}
       */
      id: id,

      /**
       * The name of the playlist
       * 
       * @type {string}
       */
      name: name,
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
  handleGenreClick = () => {
    this.props.history.push(`genre/${this.state.name.split(' ').join('-')}?id=${this.state.id}&name=${this.state.name.split(' ').join('-')}`);
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
      <div
        className="genre-card-container"
        data-testid="genre-card-container"
        onClick={this.handleGenreClick}
      >
        <div className="genre-card"
          data-testid="genre-card"
        >
          {this.state.name}
        </div>
      </div >
    );
  }
}

export default withRouter(GenreCard);
