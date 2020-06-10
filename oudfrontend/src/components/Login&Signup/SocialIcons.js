import React, {Component} from 'react';
import Facebook from './signin/Facebook';
import axios from 'axios';
import '../../components/Login&Signup/signup/signup.css';

/**the social button section
 * @author abdallah abu sedo
 */
class SocialIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * the request sender function
   * @function
   * @returns {void}
   */
  handelClickFace = () => {
    let toSent = {
      access_token: this.state.access_token,
    };
    axios
      .post('https://oud-zerobase.me/api/v1/auth/facebook', toSent)
      .then((response) => {
        console.log(response);

        window.location = '/';
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  /**
   * render and call the buttons
   * @function
   * @returns {void}
   */
  render() {
    return (
      <React.Fragment>
        <div className="SocialIconsPage container">
          <h6 className="hint-text hint" data-testid="SocialText">
            Sign Up with your social media account
          </h6>
          <button className="google_button" href="#">
            <img
              data-testid="GoogleButtonImage"
              alt=""
              src="http://pngimg.com/uploads/google/google_PNG19630.png"
              className="googlepic"
            ></img>
            continue with Google
          </button>
          <Facebook
            data-testid="FacebookButton"
            onClick={this.handelClickFace}
          />

          <section className="or-seperator OR">
            <i>OR</i>
            <h6 className="hint-text hint">Sign up with your email address</h6>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default SocialIcons;
