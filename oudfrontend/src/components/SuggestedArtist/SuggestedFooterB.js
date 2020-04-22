import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './suggestedArtist.css';

class SuggestedFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {choo: true};
  }
  render() {
    return (
      <div className="SuggFooter">
        <footer className="page-footer font-small unique-color-dark pt-4">
          <div className="container">
            <button className="FinishBtn">Finish</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default SuggestedFooter;
