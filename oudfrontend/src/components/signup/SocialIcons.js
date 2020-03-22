import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Facebook from '../signin/Facebook';
import renderer from 'react-test-renderer';

class SocialIcons extends Component {
  render() {
    return (
      <React.Fragment>
        <h6 className="hint-text">Sign Up with your social media account</h6>
        <section className="social-icons">
          <Facebook />
        </section>
        <section className="or-seperator">
          <i>OR</i>
          <h6 className="hint-text">Sign up with your email address</h6>
        </section>
      </React.Fragment>
    );
  }
}

export default SocialIcons;
