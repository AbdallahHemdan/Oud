import React, {Component} from 'react';
import Facebook from './Facebook';

import axios from 'axios';
/**the social button section */
class SocialIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FacebookToken: '',
    };
  }
  /**
   * the request sender function
   * @function
   * @returns {void}
   */
  handelClickFace() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, this.state.FacebookToken)
      .then((req) => {
        this.setState({FacebookToken: req.data.accessToken});
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
        <h6 className="hint-text">Sign In with your social media account</h6>
        <div className="social-icons">
          <button className="google_button" href="#">
            <img
              alt=""
              src="http://pngimg.com/uploads/google/google_PNG19630.png"
              className="googlepic"
            ></img>{' '}
            continue with Google
          </button>
          <Facebook
            onClick={this.handelClickFace}
            data-testid="FacebookButton"
          />
        </div>
        <section className="or-seperator">
          <i>OR</i>
          <h6 className="hint-text">Sign In with your email address</h6>
        </section>
      </React.Fragment>
    );
  }
}

export default SocialIcons;
