import React, {Component} from 'react';
import Facebook from '../signin/Facebook';
import axios from 'axios';

/**the social button section */
class SocialIcons extends Component {
  /**
   * the request sender function
   * @function
   * @returns {void}
   */
  handelClickFace() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, this.state.Facebook_token)
      .then((req) => {
        this.setState({Facebook_token: req.data.accessToken});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /**
   * render and call the buttons
   * @function
   * @returns {void}
   */
  render() {
    return (
      <React.Fragment>
        <h6 className="hint-text hint">
          Sign Up with your social media account
        </h6>
        <section className="social-icons icons">
          <button className="google_button " href="#">
            <img
              alt=""
              src="http://pngimg.com/uploads/google/google_PNG19630.png"
              className="googlepic"
            ></img>{' '}
            continue with Google
          </button>
          <Facebook
            data-testid="FacebookButton"
            onClick={this.handelClickFace}
          />
        </section>
        <section className="or-seperator OR">
          <i>OR</i>
          <h6 className="hint-text">Sign up with your email address</h6>
        </section>
      </React.Fragment>
    );
  }
}

export default SocialIcons;
