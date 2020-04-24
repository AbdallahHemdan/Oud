import React, {Component} from 'react';
import adele from '../../../../assets/images/adeleImg.png';
import {CardList} from './cardlist/cardlist';
import '../../welcome.css';
import axios from 'axios';
import {base, subUrl, prodUrl} from './../../config/environment';
import {config} from './../../utils/auth';
const fetchUserInfo2 = `${base}/artists/${this.state.artist.id}/top-tracks`;
class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      artist: [],
    };
    // axios
    //   .get(`${base}/artists/some`, config)
    //   .then((result) => {
    //     console.log('result', result.data);
    //     this.setState({artists: result.data});
    //   })
    //   .catch((err) => {
    //     console.log('error111', err.result);
    //   });
    // console.log(this.state.artist);
  }
  componentDidMount() {
    // axios
    //   .get(`${base}/artists/${this.state.artist.id}/top-tracks`, config)
    //   .then((response) => {
    //     console.log('result', response.data);
    //     this.setState({tracks: response.data});
    //   })
    //   .catch((error) => {
    //     console.log('error', error.response);
    //   });
    // console.log('traks', this.state.tracks);
  }
  render() {
    return (
      <div className="container">
        <div className="MusicCard">
          <CardList MusicCard={this.state.tracks}></CardList>
        </div>
      </div>
    );
  }
}
export default MusicCard;
