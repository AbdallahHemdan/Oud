import React, { Component } from 'react'
import axios from "axios";
import { base, prodUrl } from "./../../config/environment"
import { Link } from 'react-router-dom';
import SearchCard from "./../SearchCard/SearchCard"
import { isLoggedIn } from "./../../config/environment"
import LoadingSnipper from './../LoadingSnipper/LoadingSnipper';
import SearchCategory from './../SearchCategory/SearchCategory';

class SearchAfterTyping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: [],
      albums: [],
      artists: [],
      users: [],
      playlists: [],
      limit: 0,
      offset: 0,
      total: 0,
      search: "",
      isLoading: true
    }
  }
  handleRefresh = () => {
    window.location.reload(false);
  }
  handleStoringData = ({ tracks, albums, artists, users, playlists, limit, offset, total }) => {
    this.setState({ tracks, albums, artists, users, playlists, limit, offset, total, isLoading: false });
  }
  componentDidUpdate() {
    if (this.props.canSend) {
      const fetchAllUrl = (base === prodUrl) ? `${base}/search/?q="${this.props.search}"` : `${base}/search`;
      if (this.state.search !== this.props.search) {
        axios.get(fetchAllUrl)
          .then((result) => {
            // console.log("Hi")
            // console.log(result.data);
            this.handleStoringData(result.data);
          }).catch((err) => {
            console.log(err)
          });
        // console.log("this.props.canSend", fetchAllUrl);
        // console.log("Search value", this.props.search);
        this.setState({ search: this.props.search });
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        {
          this.state.isLoading ?
            <h1>Loading..</h1> :
            // <LoadingSnipper /> :
            <React.Fragment>
              <SearchCategory
                search={this.state.search}
                propsSearch={this.props.search}
                name={"Artists"}
                items={this.state.artists}
                type="artist"
              />
              <SearchCategory
                search={this.state.search}
                propsSearch={this.props.search}
                name={"Albums"}
                items={this.state.albums}
                type="albums"
              />
              <SearchCategory
                search={this.state.search}
                propsSearch={this.props.search}
                name={"Playlists"}
                items={this.state.playlists}
                type="playlist"
              />
              <SearchCategory
                search={this.state.search}
                propsSearch={this.props.search}
                name={"Users"}
                items={this.state.users}
                type="profile"
              />
            </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default SearchAfterTyping
