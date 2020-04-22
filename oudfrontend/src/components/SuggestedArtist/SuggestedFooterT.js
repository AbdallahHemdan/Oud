import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './suggestedArtist.css';

class SuggestedFooterT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choo: false,
    };
  }
  render() {
    return (
      <div className=" SuggFooter">
        <footer className="page-footer font-small unique-color-dark pt-4">
          <div className="container">
            <p>please chose at least 1 artist</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default SuggestedFooterT;
