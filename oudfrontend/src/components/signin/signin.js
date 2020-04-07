import React, {Component} from 'react';
import './signin.css';
import {Link, Redirect} from 'react-router-dom';
import MainBrand from './MainBrand';
import SocialIcons from './SocialIcons';
import axios from 'axios';
/**
 * the password validation
 * (check if the password is valid)
 * @function
 * @param {String} Password -user password
 * @returns {boolean} - returns if the password is valid
 * */
function checkPassword(Password) {
  let [isUppercase, isLowercase, isSpecialChar, isNumber] = [
    false,
    false,
    false,
    false,
  ];
  let str = Password + '0';
  let patt1 = /[0-9]/g;
  isNumber = str.match(patt1).length > 1;

  patt1 = /[!@#$%^&*(),.?":{}_|<>]/g;
  str = Password + '@';
  isSpecialChar = str.match(patt1).length > 1;

  for (let i = 0; i < Password.length; i++) {
    if (Password[i] === Password[i].toUpperCase()) {
      isUppercase = true;
    } else if (Password[i] === Password[i].toLowerCase()) {
      isLowercase = true;
    }
  }
  return isSpecialChar || (isNumber && isUppercase && isLowercase);
}
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
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/
    );
    let formErrors = {...this.state.formErrors};
    formErrors.EmailError = emailRegex.test(event.target.value)
      ? ''
      : 'invalid email address';
    this.setState({formErrors});
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
    if (this.state.password.length < 8) {
      this.setState({
        formErrors: {
          PasswordError: 'minimum 8 characaters required',
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else if (this.state.password.length > 30) {
      this.setState({
        formErrors: {
          PasswordError: 'maximum 30 characaters',
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else if (!checkPassword(this.state.password)) {
      this.setState({
        formErrors: {
          PasswordError:
            'Password should contain uppercase,lowercase and a number ',
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else {
      this.setState({
        formErrors: {
          PasswordError: '',
          EmailError: this.state.formErrors.EmailError,
        },
      });
    }
  };
  /**
   * on submit send the email and password to back end to check it on the db
   * @function
   * @param {object} e
   * @returns {void}
   *   */
  handelSubmit = (e) => {
    e.preventDefault();
    let tosent = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(this.checkPassword ? true : false);
    if (checkPassword(this.state.password)) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, tosent)
        .then((res) => {
          console.log(res);
          console.log(res.data);
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
      <div className="container main-center LoginPage">
        <MainBrand />
        <section className="social-form">
          <SocialIcons />
          <section className="main-form container LoginForm">
            <form onSubmit={this.handelSubmit}>
              <div className="form-group sm-8">
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
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
                    className="form-control"
                    placeholder={'password'}
                    onChange={(this.handleChange, this.PasswordHandel)}
                    data-testid="login-password"
                  />

                  <button
                    className="btn btn-outline-secondary showText"
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
                    <Link to="/ForgotPassword">Forgot your password?</Link>
                  </button>
                </h6>
              </section>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                data-testid="SignInBtn"
              >
                Sign In
              </button>
              <section className="or-seperator-2"></section>
              <section className="container main-center forgetLink">
                <span>
                  <h6 className="hint-text">
                    Don't have an account?
                    <br />
                    <Link to="/SignUp">
                      <button
                        data-testid="SignUpBtn"
                        type="button"
                        className="btn btn-outline-links signUpBtn"
                      >
                        SIGN UP
                      </button>
                    </Link>
                  </h6>
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
