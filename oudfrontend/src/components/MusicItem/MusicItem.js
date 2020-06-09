import React, { Component } from "react";
import "./MusicItem.css";
import { base } from "./../../config/environment";
import CategoryHeader from "./../CategoryHeader/CategoryHeader";
import CategoryBody from "./../CategoryBody/CategoryBody";
import axios from "axios";

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
   * @param {object} _id - get _id of an item from higher component (Home)
   * @param {object} name - get name of an item from higher component (Home)
   * @param {object} icon - get icon of an item from higher component (Home)
  */
  constructor(props) {
    super(props);

    // destructuring item props
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
      icon: icon,
      /**
       * List of playlists of category
       *
       * @type {Array<object>}
       */
      playlists: [],
    };
  }

  handleStoringPlaylists = ({ items, limit, offset, total }) => {
    this.setState({ playlists: items, limit, offset, total });
  };

  /**
   * Fetching category playlists data immediately after the component has been mount to the DOM tree
   *
   * @returns {void} - nothing to return, it just fetch data and set it in the state
  */
  componentDidMount() {
    let fetchPlaylistsUrlMocking = `${base}/browse/categories/${this.state._id}/playlists`;
    axios
      .get(fetchPlaylistsUrlMocking)
      .then((result) => {
        this.handleStoringPlaylists(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * @function
   * @name render
   * @description Render all the playlists of a specific category which it's defined by its _id
   *
   * @returns {JSX} Component for Home
   */
  render() {
    return (
      <div className="module" data-testid="music-item-container">
        <CategoryHeader
          name={this.state.name}
          _id={this.state._id}
          playlists={this.state.playlists}
          data-testid="category-header"
        />
        <CategoryBody
          webPlayer={this.props.webPlayer}
          playlists={this.state.playlists}
          data-testid="category-body"
        />
      </div>
    );
  }
}

export default MusicItem;
