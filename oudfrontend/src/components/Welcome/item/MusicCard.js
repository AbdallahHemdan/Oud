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
