import React, { Component } from 'react'
import GenreCard from "./../GenreCard/GenreCard"
import RecentSearchCard from "./../RecentSearchCard/RecentSearchCard"
import LoadingSnipper from './../LoadingSnipper/LoadingSnipper';
import axios from "axios"
import { config } from "./../../utils/auth"
import { base, prodUrl } from "./../../config/environment"
import { Link } from 'react-router-dom';
// import "./RecentSearch.css"

/**
 * fetch url of all recent searches
 * @type {String}
 */
const fetchRecentSearchesUrl = (base === prodUrl) ? `${base}/me/search/recent` : `${base}/recentsearch`;

/**
 * Recent Search component
 *
 * @author Abdallah Hemdan
 *
 * @component
 *
 */
class RecentSearch extends Component {
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
    super(props)
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
      isLoading: true
    }
  }
  /**
   * Function to handle storing data received from the props in the state
   * @function
   *
   * @return {void}
   *
   */
  handleStoringRecent = ({ items, limit, offset, total }) => {
    this.setState({ items, limit, offset, total });
  }

  /**
   * Fetching Current user recent search items
   *
   * @function
   * 
   * @returns {void} - nothing to return, it just fetch data and set it in the state
  */
  componentDidMount() {
    axios.get(fetchRecentSearchesUrl, config)
      .then((result) => {
        console.log("Data fetched on Recent search", result);
        this.handleStoringRecent(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, preState) {
    if (preState.items !== this.state.items) {
      this.setState({ isLoading: false });
    }
  }
  /**
   * @function
   * @name render
   * @description Render all the recent search components
   *
   * @returns {JSX} Component for Home
  */
  render() {
    console.log("Recent Search State", this.state.items);
    return (
      <React.Fragment>
        {
          (this.state.isLoading && this.state.items.length) ?
            (
              <LoadingSnipper
                data-testid="loading"
              />
            )
            :
            (this.state.items.length) ?
              (
                <div className="module">
                  <div className="row"
                    data-testid="category-header"
                  >
                    <h1
                      className="gray-white item-name"
                      data-testid="category-title"
                    >Recent Search</h1>
                    {
                      (this.state.items.length >= 6) ?
                        <Link to={`/recent-search`}>
                          <div className="see-more"
                            data-testid="category-see-all"
                          >See All</div>
                        </Link> : null
                    }
                  </div>
                  <div
                    className="wrapper"
                    data-testid="first-wrapper">
                    <div className="wrapper_section_2"
                      data-testid="second-wrapper"
                    >
                      <div className="cards"
                        data-testid="cards-wrapper"
                      >
                        {
                          (this.state.items) ?
                            (this.state.items.splice(0, 6).map((item, index) => {
                              return (
                                <RecentSearchCard
                                  item={item}
                                  key={index}
                                  data-testid="recent-search-card"
                                />
                              )
                            })) : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
        }
      </React.Fragment>
    )
  }
}

export default RecentSearch