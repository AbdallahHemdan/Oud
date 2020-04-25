import React, {Component} from 'react';
import axios from 'axios';
import oud from './../../../assets/images/Oud.ico';
import './../signup/signup.css';

class IsEntered extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    let restToken = this.props.match.params.token;
    axios
      .patch(`https://oud-zerobase.me/api/v1/users/verify/${restToken}`)
      .then((req) => {
        const authToken = req.data.token;
        localStorage.setItem('accessToken', authToken);
        window.location = '/';
        console.log(req);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  render() {
    return (
      <div>
        <img alt="oud" src={oud} className="LogoOfVerify" />
        <div className="container">
          <p className="e404">404</p>
          <p className="pagenotfound">PAGE NOT FOUND </p>
        </div>
      </div>
    );
  }
}
export default IsEntered;
