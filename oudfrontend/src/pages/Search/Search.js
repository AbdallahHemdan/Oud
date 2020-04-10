import React, { Component } from 'react'
import axios from "axios"
import MusicCard from "../../components/MusicCard/MusicCard"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import "./Search.css"


let fetchCategoriesUrl = "http://localhost:2022/genres";

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      limit: 0,
      offset: 0,
      total: 0
    }
  }
  handleStoringPlaylists = ({ items, limit, offset, total }) => {
    this.setState({ genres: items, limit, offset, total });
  }
  componentDidMount() {
    axios.get(fetchCategoriesUrl)
      .then((result) => {
        console.log("genres", result.data)
        this.handleStoringPlaylists(result.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Navbar isLoggedIn={false} />
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
                <div className="sub-header"
                  data-testid="category-title"
                >Browse all</div>
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
                      this.state.genres.map(genre => {
                        return (
                          <MusicCard
                            item={genre}
                            key={genre.id}
                            playBtn={false}
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
    );
  }
}

export default Search
