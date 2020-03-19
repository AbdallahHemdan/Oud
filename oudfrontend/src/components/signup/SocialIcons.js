import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SocialIcons extends Component {
  render() {
    return (
      <React.Fragment>
        <h6 className="hint-text">Sign Up with your social media account</h6>
        <section className="social-icons">
          <Link to="/">
            <img
              src="https://img.icons8.com/color/60/000000/google-logo.png"
              alt=""
            />
          </Link>
          {' | '}
          <Link to="/">
            <img
              src="https://img.icons8.com/color/60/000000/facebook-circled.png"
              alt=""
            />
          </Link>
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
