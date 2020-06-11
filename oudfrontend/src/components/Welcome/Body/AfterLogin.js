import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { CardList } from "./../item/cardlist/cardlist";
import Back from "./../../../assets/images/2685063.jpg";
import oud from "./../../../assets/images/oud.png";
import axios from "axios";
import { base, subUrl, prodUrl } from "./../../../config/environment";
import { config } from "./../../../utils/auth";
const getArtistLink = `${base}/artists/some`;
class AfterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [], artists: [], ids: [] };
  }
  /**
   * handel store artist */

  handleStoringArtists = artists => {
    this.setState({ artists });
    let ids = [];
    this.state.artists.map(artist => {
      ids.push(artist.id);
    });
    this.setState({ ids });
  };
  /**
   * handel store tracks
   */
  handleStoringTracks = tracks => {
    this.setState({ tracks });
    let track = [];
    this.state.tracks.map(tracks => {
      track.push(tracks);
      console.log(this.state.tracks);
    });
    this.setState({ track });
  };
  /**
   * request the artist and tracks
   */
  componentDidMount() {
    axios
      .get(getArtistLink, config)
      .then(result => {
        this.handleStoringArtists(result.data);
      })
      .catch(error => {
        console.log("error111", error.response);
      });
    axios
      .get(`${base}/artists/${this.state.id}/top-tracks`, config)
      .then(response => {
        this.handleStoringTracks(response.data);
      })
      .catch(error => {
        console.log("error", error.response);
      });
  }

  render() {
    return (
      <div className="BodyStyle">
        <img
          src={Back}
          data-testid="background"
          className="backGround"
          alt="background"
        />
        <div className="welcomeTextUser">
          <img src={oud} alt="oud" className="oudLogoBody" />
          <h1 data-testid="firstText">Music for everyone.</h1>
          <h6 data-testid="firstText">
            Millions of songs. No credit card needed.
          </h6>
          <Link className="LinkStyle" to="/goPremium">
            <button className="getOudBtn" data-testid="getOudBtn">
              Get Oud Premium
            </button>
          </Link>
        </div>
        <div className="container">
          <div className="bottom">
            <h1>Looking for music?</h1>
            <h5>Start listening to the best new releases.</h5>
            <Link className="LinkStyle" to="/">
              <button data-testid="getOudBtn2" className="getOudBtn2">
                LAUNCH WEB PLAYER
              </button>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="MusicCard">
            <CardList Artists={this.state.artists}></CardList>
          </div>
        </div>
      </div>
    );
  }
}

export default AfterLogin;
