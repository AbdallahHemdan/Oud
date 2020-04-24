import React, {Component} from 'react';
import adele from './../../assets/images/adeleImg.png';
import ArtistC from './Artistc';
import './suggestedArtist.css';
import axios from 'axios';
import {base, subUrl, prodUrl} from './../../config/environment';
import {config} from './../../utils/auth';

const fetchUserInfo = `${base}/artists/some`;
class MainArtistC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
    };
    axios
      .get(fetchUserInfo, config)
      .then((result) => {
        console.log('result', result.data);
        this.setState({artists: result.data});
      })
      .catch((err) => {
        console.log('error', err.result);
      });
  }
  check = (rA, relatedArtist) => {
    console.log(rA.id !== relatedArtist.id);
    return rA.id !== relatedArtist.id;
  };

  handleRelated = (id) => {
    axios
      .get(`${base}/artists/${id}/related-artists`)
      .then((response) => {
        let relatedArtists = response.data.artists;
        let toBeDeleted = [];
        relatedArtists.forEach((relatedArtist) => {
          this.state.artists.forEach((artist) => {
            if (artist.id === relatedArtist.id) {
              toBeDeleted.push(relatedArtist);
            }
          });
        });
        relatedArtists = relatedArtists.filter(
          (a) => toBeDeleted.indexOf(a) === -1
        );
        // let cutIndex = 0;
        // for (let i = 0; i < this.state.artists.length; i++) {
        //   if (this.state.artists[i].id === id) {
        //     cutIndex = i;
        //     break;
        //   }
        // }
        // let artists = this.state.artists;
        // let after = artists.splice(cutIndex + 1);
        // console.log(cutIndex, artists, after);
        this.setState({
          artists: this.state.artists.concat(relatedArtists),
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  render() {
    return (
      <div className="MainArtistC">
        <div className="spacc"></div>
        <ArtistC
          artists={this.state.artists}
          handleSelect={this.props.handleSelect}
          handleRelated={this.handleRelated}
        ></ArtistC>
        <div className="spaceeee"></div>
      </div>
    );
  }
}
export default MainArtistC;
