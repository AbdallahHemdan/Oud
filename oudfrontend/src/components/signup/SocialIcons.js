import React, {Component} from 'react';
import Facebook from '../signin/Facebook';

class SocialIcons extends Component {
  render() {
    return (
      <React.Fragment>
        <h6 className="hint-text">Sign Up with your social media account</h6>
        <section className="social-icons">
          <button className="google_button" href="#">
            <img
              alt=""
              src="http://pngimg.com/uploads/google/google_PNG19630.png"
              className="googlepic"
            ></img>{' '}
            continue with Google
          </button>
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
