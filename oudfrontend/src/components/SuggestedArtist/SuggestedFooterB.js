import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './suggestedArtist.css';
import Axios from 'axios';
import {base, subUrl, prodUrl} from './../../config/environment';
import {config} from './../../utils/auth';

const fetchUserInfo = `${base}/me/following ? type=artist`;

class SuggestedFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {choo: true, selectedIDS: []};
  }

  handelOnClick = () => {
    Axios.put(fetchUserInfo, config, this.state.selectedIDS)
      .then((response) => {
        window.location = '/';
      })
      .catch((error) => {});
  };

  render() {
    return (
      <div className="SuggFooter">
        <footer className="page-footer font-small unique-color-dark pt-4">
          <div className="container">
            <button
              data-testid="FooterBtn"
              className="FinishBtn"
              onClick={this.handelOnClick}
            >
              Finish
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default SuggestedFooter;
