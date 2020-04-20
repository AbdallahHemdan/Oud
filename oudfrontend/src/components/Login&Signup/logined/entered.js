import React, {Component} from 'react';
import axios from 'axios';
var qs = require('qs');

class IsEntered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: '',
    };
  }
  componentDidMount = () => {
    let errorMassage = '';
    let restToken = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).token;
    axios
      .patch(`https://oud-zerobase.me/api/v1/users/verify/${restToken}`)
      .then((req) => {
        if (req.status === 200) {
          window.location = '/home';
        }
      })
      .catch((error) => {
        errorMassage = error.req.data.message;
        this.setState((prev) => {
          prev.formErrors = errorMassage;
          return prev;
        });
        console.log(error.req);
      });
  };
  render() {
    return (
      <div>
        {this.state.formErrors && (
          <span className="error">{this.state.formErrors}</span>
        )}
      </div>
    );
  }
}
export default IsEntered;
