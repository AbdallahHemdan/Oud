import React, {Component} from 'react';
import './signin.css';
import MainBrand from './MainBrand';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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
  return isSpecialChar && isNumber && isUppercase && isLowercase;
}
/** the forget password section  */
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: '',
      ConfirmPassword: '',
      showText: 'show',
      formErrors: {
        PasswordError: '',
        ConfirmPasswordError: '',
      },
    };
  }

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
    this.setState({Password: event.target.value});

    if (this.state.Password.length < 8) {
      this.setState({
        formErrors: {
          PasswordError: 'minimum 8 characters required',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
        },
      });
    } else if (this.state.Password.length > 30) {
      this.setState({
        formErrors: {
          PasswordError: 'maximum 30 characters',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
        },
      });
    } else if (!checkPassword(this.state.Password)) {
      this.setState({
        formErrors: {
          PasswordError:
            'Password should contain uppercase,lowercase and a number ',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
        },
      });
    } else {
      this.setState({
        formErrors: {
          PasswordError: '',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
        },
      });
    }
  };
  /**
   * Password Validation
   * its validate the input password to be a strong password
   * and match the two passwords
   * @function
   * @param {object} event -the confirm password
   * @returns {string}
   */
  ConfirmPasswordHandel = (event) => {
    this.setState({ConfirmPassword: event.target.value});

    if (event.target.value !== this.state.Password) {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: 'Invalid  ,Password not matched',
        },
      });
    } else {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: '',
        },
      });
    }
  };
  /**
   * check if the two passwords are the same
   * @function
   * @returns {boolean} -if the two passwords are the same return true
   */
  hasSamePassword = () => {
    if (this.state.Password !== this.state.ConfirmPassword) {
      return false;
    } else {
      return true;
    }
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
   * this function is for the show password button that check if i want it to be
   * a password or to be a text input
   * @function
   * @param {object} e
   * @returns {boolean} - if the the button is clicked it is check if i want to show the type is a password or as a text
   */
  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState({
      PasswordType: this.state.PasswordType === 'text' ? 'Password' : 'text',
      showText: this.state.showText === 'show' ? 'hide' : 'show',
    });
    return false;
  };

  handelSubmit = (e) => {
    // It prevents a submit button from submitting a form
    e.preventDefault();
    let toSent = {
      password: this.state.Password,
      confirmpassword: this.state.ConfirmPassword,
    };
    if (this.hasSamePassword() === true) {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: '',
        },
       
      });
      axios
        .put(`${process.env.REACT_APP_API_URL}/users`, toSent)
        .then((req) => {})
        .catch((error) => {
          console.log(error);
        });
        this.setRedirect();
    } else if (this.hasSamePassword() === false) {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: 'Invalid  ,Password not matched',
        },
      });
    }
  };
  toLogin = () => {
    if (this.state.redirect) {
      return <Redirect to="/log-in" />;
    }
  };
  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  /**
   * here i render the text box and the submit button
   * @function
   * @function {JSX}
   */
  render() {
    return (
      <div className="container main-center">
        <MainBrand />
        <section className="social-form">
          <h2 className="pass-reset">Password Reset</h2>
          <h6 className="title-text">Enter your new password</h6>
          <section className="main-form container">
            <form onSubmit={this.handelSubmit}>
              <div className="form-group sm-8">
                {this.Password()}

                <h6 className="title-text">Confirm your password</h6>
                {this.confirmPassword()}

                <button
                  type="button"
                  className="btn btn-outline-linkF"
                  onClick={this.handelSubmit}
                >
                  Reset password
                </button>
                {this.toLogin()}
                <button
                  type="button"
                  className="btn btn-outline-linkF"
                  onClick={this.handelSubmit}
                >
                  Back to Login
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
  /**
   * confirm password text box
   * @function
   * @returns {JSX}
   */
  confirmPassword() {
    return (
      <div className="form-group">
        <div className="input-group">
          <input
            data-testid="register-confirmPassword"
            type={this.state.PasswordType}
            className="form-control"
            placeholder={'confirm Password'}
            onChange={(this.handleChange, this.ConfirmPasswordHandel)}
            name="confirmPassword"
          />
        </div>
        {this.hasSamePassword() === false
          ? this.state.formErrors.ConfirmPasswordError.length > 0 && (
              <span className="error" htmlFor="register-confirmPassword">
                {this.state.formErrors.ConfirmPasswordError}
              </span>
            )
          : null}
      </div>
    );
  }
  /**
   * password text box
   * @function
   * @returns {JSX}
   */
  Password() {
    return (
      <div className="form-group">
        <div className="input-group">
          <input
            data-testid="register-password"
            type={this.state.PasswordType}
            className="form-control"
            placeholder={'Password'}
            onChange={(this.handleChange, this.PasswordHandel)}
            name="Password"
          />
          <button
            className="btn btn-outline-dark"
            onClick={this.handleShowPassword}
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
    );
  }
}

export default ResetPassword;
