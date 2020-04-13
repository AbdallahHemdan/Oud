import React, { Component } from "react";
import "./MusicItem.css";

import CategoryHeader from './../CategoryHeader/CategoryHeader';
import CategoryBody from './../CategoryBody/CategoryBody';
import axios from "axios"

/**
 * component to render all the Category stuff which is a list of playlist associated with this category
 * 
 * @author Abdallah Hemdan
 * 
 * @component
 * 
 */
class MusicItem extends Component {
  /**
   * @constructor
   * 
   * @param {object} props - get props from higher components (Home)
   * @param {object} item - get item from higher component (Home)
   * @param {object} id - get id of an item from higher component (Home)
   * @param {object} name - get name of an item from higher component (Home)
   * @param {object} icon - get icon of an item from higher component (Home)
   */
  constructor(props) {
    super(props)

    // destructuring item props
    const { id, name, icon } = this.props.item;

    this.state = {
      /**
       * id of the category
       * 
       * @type {string} 
       */

      id: id,

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
      icon: icon,
      /**
       * List of playlists of category
       * 
       * @type {Array<object>}
       */
      playlists: []
    }
  }

  handleStoringPlaylists = ({ items, limit, offset, total }) => {
    this.setState({ playlists: items, limit, offset, total });
  }

  /**
   * Fetching category playlists data immediately after the component has been mount to the DOM tree
   * 
   * @returns {void} - nothing to return, it just fetch data and set it in the state
   */
  componentDidMount() {
    let fetchPlaylistsUrlMocking = `http://localhost:2022/browse/categories/${this.state.id}/playlists`
    axios.get(fetchPlaylistsUrlMocking)
      .then((result) => {
        this.handleStoringPlaylists(result.data);
      }).catch((err) => {

      });
  }

  /**
     * @function
     * @name render
     * @description Render all the playlists of a specific category which it's defined by its id 
     * 
     * @returns {JSX} Component for Home
     */
  render() {
    return (
      <div className="module">
        <CategoryHeader
          name={this.state.name}
          id={this.state.id}
        />
        <CategoryBody
          playlists={this.state.playlists}
        />
      </div>
    );
  }
}

export default MusicItem;



