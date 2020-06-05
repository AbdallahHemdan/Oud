import React, { Component } from "react";
import "./GenreCard.css";
import { Link, withRouter } from "react-router-dom"
import { base, subUrl, prodUrl } from "./../../config/environment"
import PropTypes from "prop-types";

/**
 * Genre card component which render and display the playlist card of a specific category 
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
    * @param {object} props - get props from higher components (Home)
    * @param {object} item - get item from higher component (Home)
    * @param {object} _id - get _id of an item from higher component (Home)
    * @param {object} name - get name of an item from higher component (Home)
    * @param {object} icon - get icon of an item from higher component (Home)
    */
  constructor(props) {
    super(props)
    const { _id, name, icon } = this.props.item;
    this.state = {
      /**
       * _id of the category
       * 
       * @type {string} 
       */
      _id: _id,

      /**
       * name of the category
       *
       * @type {string}
       */
      name: name,

      /**
       * icon of the category
       *
       * @type {string}
       */
      icon: icon
    }
  }

  /**
   * Function to handle navigation to the playlist page
   * on clicking on the Genre card
   * 
   * @function
   * 
   * @return {void}
   * 
   */
  handlePlaylistClick = () => {
    this.props.history.push(`genre/${this.state._id}?name=${this.state.name}&_id=${this.state._id}`);
  }

  /**
   * @function
   * 
   * @name render
   * 
   * @description Render Genre card components..
   * 
   * @returns {JSX} Component for App
   */
  render() {
    const subPath = (base === prodUrl) ? subUrl : "";
    return (
      <div
        className="card-container"
        data-testid="card-container"
      >
        <div className="card"
          data-testid="card"
        >
          <div
            className="overlayer"
            onClick={this.handlePlaylistClick}
            data-testid="overlayer"
          >
          </div>
          <img
            src={`${subPath}${this.state.icon}`}
            alt="playlist cover"
            data-testid="playlist-image"
          />
          <div
            className="title"
            data-testid="playlist-title"
          >
            <Link
              to={`${this.state.type}/${this.state._id}`}
              className="playlist-link"
              data-testid="playlist-link"
            >{this.state.name}</Link>
          </div>
        </div >
      </div>
    );
  }
}

GenreCard.propTypes = {
  item: PropTypes.object
}
export default withRouter(GenreCard);
