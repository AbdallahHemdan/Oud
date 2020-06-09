import React, { Component } from 'react'
import axios from "axios";
import { base, prodUrl } from "./../../config/environment"
import SearchCategory from './../SearchCategory/SearchCategory';
import PropTypes from "prop-types";

/**
 *  component to render all the search results for specific search value
 *
 * @author Abdallah Hemdan
 *
 * @component
 *
 */
class SearchAfterTyping extends Component {
  /**
   * @constructor
   *
   * @param {object} props - get props from higher components (Search)
   * @param {Array<Object>} tracks - List of tracks for search value
   * @param {Array<Object>} albums - List of albums for search value
   * @param {Array<Object>} artists - List of artists for search value
   * @param {Array<Object>} users - List of users for search value
   * @param {Array<Object>} playlists - List of playlists for search value
   * @param {Number} limit - The maximum number of categories to get.
   * @param {Number} offset - The index of the first categories to get.
   * @param {Number} total - The total number of categories available to get.
   * @param {String} search - The search value that user type
   * @param {Boolean} isLoading - variable to check if the data is loaded or not
   */
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 
       * List of tracks for search value
       * 
       * @@type {Array<Object>}
       */
      tracks: [],
      /**
       *
       * List of albums for search value
       *
       * @@type {Array<Object>}
       */
      albums: [],
      /**
       *
       * List of artists for search value
       *
       * @@type {Array<Object>}
       */
      artists: [],
      /**
       *
       * List of users for search value
       *
       * @@type {Array<Object>}
       */
      users: [],
      /**
       *
       * List of playlists for search value
       *
       * @@type {Array<Object>}
       */
      playlists: [],
      /**
       * The maximum number of categories to get.
       *
       * @type {number}
       */
      limit: 0,

      /**
       * The index of the first categories to get.
       *
       * @type {number}
       */
      offset: 0,
      /**
       * The total number of categories available to get.
       *
       * @type {number}
      */
      total: 0,
      /**
       * the value of the search that the user has type
       * @type {String}
       */
      search: "",
      /**
       * Check if the data loaded from the backend or not
       * @type {Boolean}
       */
      isLoading: true
    }
  }
  /**
   * Function to handle store search value that user type in the state..
   *
   * @function
   *
   * @returns {void}
   */
  handleStoringData = ({ tracks, albums, artists, users, playlists, limit, offset, total }) => {
    this.setState({ tracks, albums, artists, users, playlists, limit, offset, total, isLoading: false });
  }

  /**
   * Function to fetch search items of specific search value that user type
   * 
   * @function
   *
   * @returns {void}
  */
  componentDidUpdate() {
    if (this.props.canSend) {
      const fetchAllUrl = (base === prodUrl) ? `${base}/search/?q=${this.props.search}` : `${base}/search`;
      if (this.state.search !== this.props.search) {
        axios.get(fetchAllUrl)
          .then((result) => {
            this.handleStoringData(result.data);
          }).catch((err) => {
            console.log(err)
          });
        this.setState({ search: this.props.search });
      }
    }
  }

  /**
     * @function
     * @name render
     * @description Render all the Search fetched items for specific search value that user type
     *
     * @returns {JSX} Component for Home
    */
  render() {
    return (
      <React.Fragment>
        {
          (this.state.isLoading) ?
            (<h1 data-testid="loading">Loading..</h1>) :
            (
              <div
                data-testid="search-results"
              >
                {
                  (this.state.tracks.tracks.length) ?
                    <SearchCategory
                      search={this.state.search}
                      propsSearch={this.props.search}
                      name={"Tracks"}
                      items={this.state.tracks}
                      type="albums"
                      data-testid="search-tracks"
                    /> : null
                }

                {
                  (this.state.artists.artists.length) ?
                    <SearchCategory
                      search={this.state.search}
                      propsSearch={this.props.search}
                      name={"Artists"}
                      items={this.state.artists}
                      type="artist"
                      data-testid="search-artists"
                    /> : null
                }

                {
                  (this.state.albums.albums.length) ?
                    <SearchCategory
                      search={this.state.search}
                      propsSearch={this.props.search}
                      name={"Albums"}
                      items={this.state.albums}
                      type="albums"
                      data-testid="search-albums"
                    /> : null
                }
                {
                  (this.state.playlists.playlists.length) ?
                    < SearchCategory
                      search={this.state.search}
                      propsSearch={this.props.search}
                      name={"Playlists"}
                      items={this.state.playlists}
                      type="playlist"
                      data-testid="search-playlists"
                    /> : null
                }
                {
                  (this.state.users.users.length) ?
                    <SearchCategory
                      search={this.state.search}
                      propsSearch={this.props.search}
                      name={"Users"}
                      items={this.state.users}
                      type="profile"
                      data-testid="search-users"
                    /> : null
                }
              </div>
            )
        }
      </React.Fragment>
    )
  }
}

SearchAfterTyping.propTypes = {
  search: PropTypes.string,
  canSend: PropTypes.bool
}

export default SearchAfterTyping
