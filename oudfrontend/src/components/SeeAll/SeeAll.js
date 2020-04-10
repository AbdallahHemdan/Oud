import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from "axios"
import qs from "qs"

import MusicCard from "../MusicCard/MusicCard"
import Sidebar from "../Sidebar/Sidebar"
import Navbar from "../Navbar/Navbar"

class SeeAll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id,
      name: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).name,
      playlists: []
    }
  }
  handleStoringPlaylists = ({ items, limit, offset, total }) => {
    this.setState({ playlists: items, limit, offset, total });
  }
  componentDidMount() {
    let fetchPlaylistsUrlMocking = `http://localhost:2022/browse/categories/${this.state.id}/playlists`
    axios.get(fetchPlaylistsUrlMocking)
      .then((result) => {
        this.handleStoringPlaylists(result.data);
      }).catch((err) => {
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
                >{this.state.name.split('-').join(' ')}</h1>
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
                      this.state.playlists.map(playlist => {
                        return (
                          <MusicCard
                            item={playlist}
                            key={playlist.id}
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

export default withRouter(SeeAll)
