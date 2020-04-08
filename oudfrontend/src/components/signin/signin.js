import React, {Component} from 'react';
import '../signup/signup.css';
import {Link, Redirect} from 'react-router-dom';

import axios from 'axios';
import Validator from '../validate';
import {token} from '../../utils/auth';
/**the sign up section  */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      email: '',
      password: '',
      passwordType: 'password',
      showText: 'show',
      rememberMe: false,
      redirect: false,
      formErrors: {
        EmailError: '',
        PasswordError: '',
      },
    };
  }
  /**
   * Email validation
   * (check if the email is valid)
   * @function
   * @param {object} event -the entered email
   * @returns {boolean} - return true if the email is valid
   */
  EmailHandel = (event) => {
    this.setState({email: event.target.value});
    Validator.validateEmail(event.target.value, this);
  };
  /**
   * this function is for the show password button that check if i want it to be
   * a password or to be a text input
   * @function
   * @param {object} e
   * @returns {boolean} - if the the button is clicked it is check if i want to show the type is a password or as a text
   */
  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState({
      passwordType: this.state.passwordType === 'text' ? 'password' : 'text',
      showText: this.state.showText === 'show' ? 'hide' : 'show',
    });
    return false;
  };
  /**
   * Password checker
   * (here check if the entered password is correct under some restricts)
   * 1)if it dose not enter any thing
   * 2)if it under 8 latter's
   * 3)if it more than 30 latter's
   * 5)if it is valid
   * 6)then it is correct
   * @function
   * @param {object} event - the entered password
   * @returns {string} -change the error massages
   *  */
  PasswordHandel = (event) => {
    this.setState({password: event.target.value});
    Validator.validatePassword(event.target.value, this);
  };
  validateAll = () => {
    let valid = true;
    valid &= Validator.validateEmail(this.state.email, this);
    valid &= Validator.validatePassword(this.state.password, this);
    return valid;
  };
  /**
   * on submit send the email and password to back end to check it on the db
   * @function
   * @param {object} e
   * @returns {void}
   *   */
  handelSubmit = (e) => {
    e.preventDefault();
    console.log('tokeeen', token);

    let errorMassage = '';
    let tosent = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(this.checkPassword ? true : false);
    if (this.validateAll()) {
      axios
        .post('http://oud-zerobase.me/api/v1/users/login', tosent)
        .then((response) => {
          if (response.status === 200) {
            /**redirect to home  * ****************************************************************************************************/
            const authToken = response.data.token;
            localStorage.setItem('accessToken', authToken);
            console.log('local', localStorage.getItem('accessToken'));

            console.log('token', authToken);
            console.log(response);
            /**redirect to home */
          } else if (response.status === 400) {
            errorMassage = response.massage;
          } else if (response.status === 429) {
            /**Unauthorized */
            errorMassage = response.massage;
          }
          this.setState((prevState) => {
            prevState.formErrors.mainError = errorMassage;
            return prevState;
          });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  /**
   * the remember me check box
   * @function
   * @param {object} e
   * @returns {void}
   */
  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState({[name]: value});
  };
  /**
   * here i render the page
   * @function
   * @returns {void}
   */
  render() {
    return (
      <div className="container main-center LoginPage ">
        <section className="social-form">
          <section className="main-form container SignUpForm">
            <form onSubmit={this.handelSubmit} noValidate>
              <div className="form-group sm-8">
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control FormElement"
                  placeholder="email@address.com"
                  onChange={(this.handleChange, this.EmailHandel)}
                  data-testid="login-email"
                />
                {this.state.formErrors.EmailError.length > 0 && (
                  <span className="error" htmlFor="register-email">
                    {this.state.formErrors.EmailError}
                  </span>
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    required
                    name="password"
                    type={this.state.passwordType}
                    className="form-control FormElement"
                    placeholder={'password'}
                    onChange={(this.handleChange, this.PasswordHandel)}
                    data-testid="login-password"
                  />

                  <button
                    className="btn btn-outline-secondary showText "
                    onClick={this.handleShowPassword}
                    data-testid="login-button"
                  >
                    {this.state.showText}
                  </button>
                </div>
                {this.state.formErrors.PasswordError.length > 0 && (
                  <span className="error" htmlFor="register-password">
                    {this.state.formErrors.PasswordError}
                  </span>
                )}
              </div>
              <div className="form-group">
                <div className="pretty p-svg p-curve container">
                  <input
                    type="checkbox"
                    data-testid="gridCheck"
                    id="gridCheck"
                    className="form-check-input"
                    name="rememberMe"
                    onChange={this.handleChange}
                  />
                  <div className="state p-success">
                    <svg className="svg svg-icon" viewBox="0 0 20 20">
                      <path
                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style={{stroke: 'white', fill: 'white'}}
                      ></path>
                    </svg>
                    <label htmlFor="gridCheck">Remember me</label>
                  </div>
                </div>
              </div>
              <section className="container main-center forgetLink">
                <h6 className="hint-text-forgot">
                  <button
                    type="button"
                    className="btn btn-outline-link forgetBtn"
                    data-testid="Forgetpass"
                    onClick={this.handelSubmit}
                  >
                    <Link className="forget" to="/ForgotPassword">
                      Forgot your password?
                    </Link>
                  </button>
                </h6>
              </section>
              <button
                type="submit"
                className="btn SignUpSubmit btn-block"
                data-testid="SignInBtn"
              >
                Sign In
              </button>
              <section className="or-seperator-2"></section>
              <section className="container main-center forgetLink ">
                <span>
                  <h6 className="hint">
                    Don't have an account?
                    <br />
                  </h6>
                  <Link to="/SignUp" className="btn-style">
                    <button
                      data-testid="SignUpBtn"
                      type="button"
                      className="btn SignUpSubmit btn-style btn-block"
                    >
                      SIGN UP
                    </button>
                  </Link>
                </span>
              </section>
            </form>
          </section>
        </section>
      </div>
    );
  }
}

export default SignIn;
