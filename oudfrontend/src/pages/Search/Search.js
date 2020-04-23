import React, { Component } from 'react'
import axios from "axios"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import BrowseAll from "./../../components/BrowseAll/BrowseAll"
import RecentSearch from './../../components/RecentSearch/RecentSearch';
import { base } from "./../../config/environment"
import LoadingSnipper from './../../components/LoadingSnipper/LoadingSnipper';
import { isLoggedIn } from '../../utils/auth'
import SearchAfterTyping from "./../../components/SearchAfterTyping/SearchAfterTyping"
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
      isLoading: true,
      search: "",
      canSend: false,
      typingTimeout: 0,
      isLoggedIn: isLoggedIn()
    }
  }

  handleStoringPlaylists = ({ items, limit, offset, total }) => {
    this.setState({ items, limit, offset, total, isLoading: false });
  }

  handleInput = (e) => {
    console.log("Handle Input", e.target.value);
    let search = e.target.value;
    this.setState(prevState => {
      return { ...prevState, search }
    });
  }

  handleStoringCanSend = () => {
    this.setState({ canSend: true });
  }
  handleKeyUp = () => {
    clearTimeout(this.state.typingTimeout);
    this.setState({
      typingTimeout: setTimeout(
        this.handleStoringCanSend
        , 500)
    });
  }
  handleKeyDown = () => {
    this.setState({ canSend: false });
  }
  handleSubmit = (e) => {
    e.preventDefault();
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
        <Navbar
          isLoggedIn={isLoggedIn()}
          isSearch={true}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          value={this.state.search}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
        />
        {
          this.state.isLoading ?
            <LoadingSnipper /> :
            <section
              className="main-content"
              data-testid="main-content"
            >
              <section
                className="music-component main"
                data-testid="music-content"
              >
                {
                  this.state.search ?
                    <SearchAfterTyping
                      search={this.state.search}
                      canSend={this.state.canSend}
                    />
                    :
                    <React.Fragment>
                      {
                        this.state.isLoggedIn ?
                          <RecentSearch /> : null
                      }
                      <BrowseAll items={this.state.items} />
                    </React.Fragment>
                }
              </section>
            </section>
        }
      </React.Fragment>
    );
  }
}

export default Search
