import React, { Component } from 'react'
import GenreCard from "./../GenreCard/GenreCard"
import RecentSearchCard from "./../RecentSearchCard/RecentSearchCard"
import LoadingSnipper from './../LoadingSnipper/LoadingSnipper';
import axios from "axios"
import { config } from "./../../utils/auth"
import { base, prodUrl } from "./../../config/environment"
import { Link } from 'react-router-dom';
// import "./RecentSearch.css"

const fetchRecentSearchesUrl = (base === prodUrl) ? `${base}/me/search/recent` : `${base}/recentsearch`;

class RecentSearch extends Component {
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
        {
          (this.state.isLoading) ?
            <LoadingSnipper />
            :
            <div className="module">
              <div className="row"
                data-testid="category-header "
              >
                <h1
                  className="gray-white item-name"
                  data-testid="category-title"
                >
                  Recent Search
                  </h1>

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
                      this.state.items.splice(0, 6).map((item, index) => {
                        return (
                          <RecentSearchCard
                            item={item}
                            key={index}
                          />
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
        }
      </React.Fragment>
    )
  }
}

export default RecentSearch
