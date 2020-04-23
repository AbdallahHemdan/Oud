import React, { Component } from 'react'
import Sidebar from './../Sidebar/Sidebar';
import Navbar from './../Navbar/Navbar';
import RecentSearchCard from "./../RecentSearchCard/RecentSearchCard"
import axios from "axios"
import { config } from "./../../utils/auth"
import { base, prodUrl } from "./../../config/environment"
const fetchRecentSearchesUrl = (base === prodUrl) ? `${base}/me/search/recent` : `${base}/recentsearch`;

class SeeAllRecentSearches extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      limit: 0,
      offset: 0,
      total: 0,
      isLoading: true
    }
  }
  handleStoringRecent = ({ items, limit, offset, total }) => {
    this.setState({ items, limit, offset, total, isLoading: false });
    console.log("Recent Search state", this.state)
  }
  componentDidMount() {
    axios.get(fetchRecentSearchesUrl, config)
      .then((result) => {
        this.handleStoringRecent(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Navbar isLoggedIn={true} />
        <section
          className="main-content"
          data-testid="main-content"
        >
          <section
            className="music-component main"
            data-testid="music-content"
          >
            <div className="module">
              <div className="row"
                data-testid="category-header"
              >
                <h1 className="gray-white item-name"
                  data-testid="category-title"
                >Recent Search</h1>
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
                      this.state.items.map((playlist, index) => {
                        return (
                          <RecentSearchCard
                            item={playlist}
                            key={index}
                          />
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </React.Fragment>
    )
  }
}

export default SeeAllRecentSearches
