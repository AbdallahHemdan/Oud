import React, {Component} from 'react';
import Facebook from './Facebook';

import axios from 'axios';
class SocialIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Facebook_token: '',
      Google_token: '',
    };
  }

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

  render() {
    return (
      <React.Fragment>
        <h6 className="hint-text">Sign In with your social media account</h6>
        <div className="social-icons">
          <Facebook onClick={this.handelClickFace} />
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
