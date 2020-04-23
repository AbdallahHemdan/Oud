import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './suggestedArtist.css';
import Axios from 'axios';
import {base, subUrl, prodUrl} from './../../config/environment';
import {config} from './../../utils/auth';

const fetchUserInfo = `${base}/me/following`;

class SuggestedFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {choo: true};
  }

  handelOnClick = () => {
    let toSent = {
      type: 'artist ',
      ids: [],
    };
    Axios.put(fetchUserInfo, config, toSent)
      .then((response) => {})
      .catch((error) => {});
  };
  render() {
    return (
      <div className="SuggFooter">
        <footer className="page-footer font-small unique-color-dark pt-4">
          <div className="container">
            <button className="FinishBtn" onClick={this.handelOnClick}>
              Finish
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default SuggestedFooter;
