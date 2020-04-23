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
  }

  componentDidMount = () => {
    // `${base}/SuggestedArtist`;
    axios
      .get(fetchUserInfo, config)
      .then((result) => {
        console.log('result', result.data);
        this.setState({artists: result.data});
      })
      .catch((err) => {
        console.log('error', err.result);
      });
    console.log('state ', this.state.artists);
  };
  render() {
    return (
      <div className="MainArtistC">
        <div className="spacc"></div>
        <ArtistC artists={this.state.artists}></ArtistC>
        <div className="spaceeee"></div>
      </div>
    );
  }
}
export default MainArtistC;
