import React, {Component} from 'react';
import './forgetPass.css';
import MainBrand from './MainBrand';
import axios from 'axios';
import validator from '../signup/validate';
import {Redirect} from 'react-router';
/** the forget password section  */
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      code: '',
      formErrors: {
        EmailError: '',
      },
    };
  }
  /**
   * on submit send the email to back end to send the code
   * @function
   * @param {object} e
   * @returns {void}
   */
  handelSubmit = (e) => {
    e.preventDefault();
    let toSend = {
      email: this.state.email,
    };
    let errorMassage = '';
    console.log(this.EmailHandel);
    if (this.state.formErrors.EmailError === '' && this.validation()) {
      axios
        .post('http://oud-zerobase.me/api/v1/users/forgotPassword', toSend)
        .then((res) => {
          if (res.status === 200) {
            return <Redirect to="/code"></Redirect>;
          } else if (res.status === 404) {
            errorMassage = res.massage;
          }
          console.log(res);
          this.setState((prevstate) => {
            prevstate.formErrors.EmailError = errorMassage;
            return prevstate;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log(this.state);
  };
  /**
   * Email validation
   * (check if the email is valid)
   * @function
   * @param {object} event -the entered email
   * @returns {boolean} - return true if the email is valid
   */
  EmailHandel = (event) => {
    this.setState({email: event.target.value});
    validator.validateEmail(event.target.value, this);
  };
  validation = () => {
    let valid = true;
    valid &= validator.validateEmail(this.state.email, this);
    return valid;
  };
  /**
   * this function activate on change
   * @function
   * @param {object} a
   * @returns {void}
   */
  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };
  /**
   * here i render the text box and the submit button
   * @function
   * @function {JSX}
   */
  render() {
    return (
      <div className="container main-center forgetForm">
        <MainBrand />
        <section className="social-form">
          <h2 className="pass-reset">Password Reset</h2>
          <h6 className="title-text">
            Enter your email address that you used to register. We'll send you
            an email to reset your password.
          </h6>
          <section className="main-form container">
            <form onSubmit={this.handelSubmit}>
              <div className="form-group sm-8">
                <input
                  required
                  data-testid="forgetPassword-email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="enter your email "
                  onChange={(this.handleChange, this.EmailHandel)}
                />
                {this.state.formErrors.EmailError.length > 0 && (
                  <span className="error" htmlFor="register-email">
                    {this.state.formErrors.EmailError}
                  </span>
                )}

                <button
                  type="button"
                  className="btn btn-outline-linkF"
                  onClick={this.handelSubmit}
                >
                  Send code
                </button>
              </div>
              <section className="or-seperator-2"></section>
              <section className="container main-center">
                <h6 className="hint-text">
                  If you still need help, contact Oud team at
                  <button type="button" className="btn btn-outline-link">
                    <a href={'mailto:oudteam.sup@gmail.com'}>
                      oudteam.sup@gmail.com
                    </a>
                  </button>
                </h6>
              </section>
            </form>
          </section>
        </section>
      </div>
    );
  }
}

export default ForgotPassword;
