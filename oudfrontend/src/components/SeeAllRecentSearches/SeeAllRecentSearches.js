import React, {Component} from 'react';
import Sidebar from './../Sidebar/Sidebar';
import Navbar from './../Navbar/Navbar';
import RecentSearchCard from './../RecentSearchCard/RecentSearchCard';
import axios from 'axios';
import {config} from './../../utils/auth';
import {base, prodUrl} from './../../config/environment';
const fetchRecentSearchesUrl =
  base === prodUrl ? `${base}/me/search/recent` : `${base}/recentsearch`;

/**
 * See all recent searches component which render all the recent search items of the current user
 *
 * @author Abdallah Hemdan
 *
 * @component
 *
 */

class SeeAllRecentSearches extends Component {
  /**
   * @constructor
   *
   * @param {object} props - all recent search items
   * @param {string} items - list of items of recent search
   * @param {string} limit - the number of recent search items to return
   * @param {string} offset - The index of the first item in the recent search items
   * @param {boolean} total - The maximum number of items available to return
   * @param {string} isLoading - Determine if the data is already loaded in the component or not
   */
  constructor(props) {
    super(props);
    this.state = {
      /**
       * An array of all recent search items of the current user
       *
       * @type {Array<object>}
       */
      items: [],
      /**
       * The maximum number of item to get.
       *
       * @type {number}
       */
      limit: 0,
      /**
       * The index of the first item to get.
       *
       * @type {number}
       */
      offset: 0,
      /**
       * The total number of items available to get.
       *
       * @type {number}
       */
      total: 0,
      /**
       * Check if the data loaded from the backend or not
       * @type {Boolean}
       */
      isLoading: true,
    };
  }
  /**
   * Function to handle storing data fetched of all the recent searched items by the current user
   * @function
   * @returns {VoidFunction}
   */
  handleStoringRecent = ({items, limit, offset, total}) => {
    this.setState({items, limit, offset, total, isLoading: false});
    console.log('Recent Search state', this.state);
  };
  /**
   * Function to fetch all the recent searched items of the current user
   * @function
   * @returns {VoidFunction}
   */
  componentDidMount() {
    axios
      .get(fetchRecentSearchesUrl, config)
      .then((result) => {
        this.handleStoringRecent(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /**
   * @function
   * @name render
   * @description Render all the Recent searched items
   *
   * @returns {JSX} Component for Home
   */
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Navbar isLoggedIn={true} />
        <section className="main-content" data-testid="main-content">
          <section className="music-component main" data-testid="music-content">
            <div className="module">
              <div className="row" data-testid="category-header">
                <h1
                  className="gray-white item-name"
                  data-testid="category-title"
                >
                  Recent Search
                </h1>
              </div>
              <div className="wrapper" data-testid="first-wrapper">
                <div className="wrapper_section_2" data-testid="second-wrapper">
                  <div className="cards" data-testid="cards-wrapper">
                    {this.state.items.map((playlist, index) => {
                      return <RecentSearchCard item={playlist} key={index} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default SeeAllRecentSearches;
