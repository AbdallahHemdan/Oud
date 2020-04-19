import React, { Component } from 'react'
import axios from "axios"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import BrowseAll from "./../../components/BrowseAll/BrowseAll"
import RecentSearch from './../../components/RecentSearch/RecentSearch';
import { base } from "./../../config/environment"
import "./Search.css"

let fetchCategoriesUrl = `${base}/browse/categories`;

class Search extends Component {
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
       */
      isLoading: true
    }
  }
  handleStoringPlaylists = ({ items, limit, offset, total }) => {
    this.setState({ items, limit, offset, total });
  }
  componentDidMount() {
    axios.get(fetchCategoriesUrl)
      .then((result) => {
        this.handleStoringPlaylists(result.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Navbar isLoggedIn={false} isSearch={true} />
        <section
          className="main-content"
          data-testid="main-content"
        >
          <RecentSearch items={this.state.items} />
          <BrowseAll items={this.state.items} />
        </section>
      </React.Fragment>
    );
  }
}

export default Search
