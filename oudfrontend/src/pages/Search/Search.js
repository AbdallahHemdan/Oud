import React, {Component} from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import BrowseAll from './../../components/BrowseAll/BrowseAll';
import RecentSearch from './../../components/RecentSearch/RecentSearch';
import {base} from './../../config/environment';
import LoadingSnipper from './../../components/LoadingSnipper/LoadingSnipper';
import {isLoggedIn} from '../../utils/auth';
import SearchAfterTyping from './../../components/SearchAfterTyping/SearchAfterTyping';
import './Search.css';

/**
 * fetch url of the categories
 * @type {string}
 * @author Abdallah Hemdan
 */

const fetchCategoriesUrl = `${base}/browse/categories`;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * An array of all categories of the music to display it in home page
       *
       * @type {Array<object>}
       */
      items: [],

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
       * Check if the data loaded from the backend or not
       * @type {Boolean}
       */
      isLoading: true,
      /**
       * the value of the search that the user has type
       * @type {String}
       */
      search: '',
      /**
       * Variable to determine if the request to get what user type
       * @type {Boolean}
       */
      canSend: false,
      /**
       * Variable to store the time outed after last typed character to use it to determine if the request can be done now or not
       * @type {Number}
       */
      typingTimeout: 0,
      /**
       * Variable to check if the user is already logged in or not
       * @type {Boolean}
       */
      isLoggedIn: isLoggedIn(),
    };
  }
  /**
   * Function to handle storing fetched categories in the state
   *
   * @function
   *
   * @returns {void}
   *
   */
  handleStoringPlaylists = ({items, limit, offset, total}) => {
    this.setState({items, limit, offset, total, isLoading: false});
  };
  /**
   * Function to handle store search value that user type in the state..
   *
   * @function
   *
   * @returns {void}
   */
  handleInput = (e) => {
    let search = e.target.value;
    this.setState((prevState) => {
      return {...prevState, search};
    });
  };
  /**
   * Function to handle enable can send state of allowing perform the request
   * @function
   *
   * @return {void}
   *
   */
  handleStoringCanSend = () => {
    this.setState({canSend: true});
  };
  /**
   * Function to handle of setting the time out to delay half of second after the user stop typing to do our search
   * @function
   *
   * @return {void}
   *
   */
  handleKeyUp = () => {
    clearTimeout(this.state.typingTimeout);
    this.setState({
      typingTimeout: setTimeout(this.handleStoringCanSend, 500),
    });
  };
  /**
   * Function to handle setting canSent state to false while the user is still typing
   * @function
   *
   * @return {void}
   *
   */
  handleKeyDown = () => {
    this.setState({canSend: false});
  };
  /**
   * Function to prevent default behavior of the submit and disable the refreshing of the page
   * @function
   *
   * @return {void}
   *
   */
  handleSubmit = (e) => {
    e.preventDefault();
  };
  /**
   * Fetch all the Categories of Browse all and store it in the state
   *
   * @returns {void} - nothing to return, it just fetch data and set it in the state
   */
  componentDidMount() {
    axios
      .get(fetchCategoriesUrl)
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
   * @description Render all the search page components
   *
   * @returns {JSX} Component for Home
   */
  render() {
    return (
      <React.Fragment>
        <Sidebar data-testid="sidebar" />
        <Navbar
          isLoggedIn={isLoggedIn()}
          isSearch={true}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          value={this.state.search}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          data-testid="navbar"
        />
        {this.state.isLoading ? (
          <LoadingSnipper data-testid="loading-snipper" />
        ) : (
          <section className="main-content" data-testid="main-content">
            <section
              className="music-component main"
              data-testid="music-content"
            >
              {this.state.search !== '' ? (
                <SearchAfterTyping
                  data-testid="search-after-typing"
                  search={this.state.search}
                  canSend={this.state.canSend}
                />
              ) : (
                <div data-testid="search-before-typing">
                  {this.state.isLoggedIn ? (
                    <RecentSearch data-testid="recent-search" />
                  ) : null}
                  <BrowseAll
                    items={this.state.items}
                    data-testid="browse-all"
                  />
                </div>
              )}
            </section>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
