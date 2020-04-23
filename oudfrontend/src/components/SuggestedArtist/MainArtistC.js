import React, {Component} from 'react';
import adele from './../../assets/images/adeleImg.png';
import ArtistC from './Artistc';
import './suggestedArtist.css';
import axios from 'axios';
import {base, subUrl, prodUrl} from './../../config/environment';
import {config} from './../../utils/auth';

const fetchUserInfo = `${base}/artists/random`;
class MainArtistC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(`${base}/SuggestedArtist`, config)
      .then((result) => {
        console.log(result.data);
        this.setState({artists: result.data});
      })
      .catch((err) => {
        console.log(err);
      });
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
