import React, {Component} from 'react';
import axios from 'axios';

class IsEntered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: '',
    };
  }
  componentDidMount = () => {
    let errorMassage = '';
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
