import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './suggestedArtist.css';
import Axios from 'axios';
import {base, subUrl, prodUrl} from '../../config/environment';
import {config} from '../../utils/auth';

const artist = `${base}/me/following?type=artist`;

class SuggestedFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedIDS: this.props.selectedIds};
  }

  handelOnClick = () => {
    let ids = this.state.selectedIDS;
    Axios.put(artist, {ids}, config)
      .then((response) => {
        console.log('res', response);
        window.location = '/';
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    return this.props.selected() ? (
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
    ) : (
      <div className="SuggFooter">
        <footer className="page-footer ">
          <div className="container TextFotter" data-testid="Footertext">
            <p>Select at least one artist or use the search bar.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default SuggestedFooter;
