import React, {Component} from 'react';
import '../signup/signup.css';
import MainBrand from '../MainBrand';
import axios from 'axios';
import {Redirect, withRouter, Link} from 'react-router-dom';
import Validator from './../validate';

/** the forget password section  
 * @auther abdallah abu sedo
*/
class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * the new password var
       */
      Password: '',
      /**
       * the new confirm password
       */
      ConfirmPassword: '',
      showText: 'show',
      /**
       * the error messages forms
       */ formErrors: {
        PasswordError: '',
        ConfirmPasswordError: '',
      },
    };
  }
  /**
   * Password checker
   * (here check if the entered password is correct under some restricts)
   * 1)if it under 8 latter's
   * 2)if it more than 30 latter's
   * 3)if it is valid
   * 4)then it is correct
   * @function
   * @param {object} event - the entered password
   * @returns {string} -change the error massages
   *  */
  PasswordHandel = (event) => {
    this.setState({Password: event.target.value});
    Validator.validatePassword(event.target.value, this);
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
    Validator.validateConfirmPassword(event.target.value, this);
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
  /**
   * this function activate when we click the submit button
   * it's check if the password and the confirm password are the same
   * then it send a request with all the data
   * @function
   * @param {object} e
   * @returns {void}
   */
  handelSubmit = (e) => {
    // It prevents a submit button from submitting a form
    e.preventDefault();
    let errorMassage = '';
    let toSent = {
      password: this.state.Password,
      passwordConfirm: this.state.ConfirmPassword,
    };
    if (this.hasSamePassword() === true) {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: '',
        },
      });
      let restToken = this.props.match.params.token;

      axios
        .patch(
          `https://oud-zerobase.me/api/v1/users/resetPassword/${restToken}`,
          toSent
        )
        .then((response) => {
          const authToken = response.data.token;
          localStorage.setItem('accessToken', authToken);
          console.log(response);
          window.location = '/signin';
        })
        .catch((error) => {
          errorMassage = error.response.data.message;
          if (error.response.data.message !== '') {
            errorMassage = 'invalid';
          }
          this.setState((prev) => {
            prev.formErrors.PasswordError = errorMassage;
            return prev;
          });
          console.log(error.req);
        });
    } else if (this.hasSamePassword() === false) {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: 'Invalid  ,Password not matched',
        },
      });
    }
  };

  /**
   * here i render the text box and the submit button
   * @function
   * @function {JSX}
   */
  render() {
    return (
      <div className="container main-center forgetPage SignUpForm">
        <MainBrand />
        <section className="main-form container SignUpForm">
          <h2 className="pass-reset" data-testid="restPasswordText">
            Password Reset
          </h2>
          <h6 className="hint pass-massage" data-testid="restPasswordText">
            Enter your new password
          </h6>
          <section className="main-form container">
            <form onSubmit={this.handelSubmit}>
              <div className="form-group sm-8">
                {this.Password()}
                <h6
                  className="hint pass-massage"
                  data-testid="restPasswordText"
                >
                  Confirm your password
                </h6>
                {this.confirmPassword()}
                <button
                  type="button"
                  data-testid="testIdOfButton"
                  className="btn SignUpSubmit btn-block"
                  onClick={this.handelSubmit}
                >
                  Reset password
                </button>
                <Link to="/signin">
                  <button
                    type="button"
                    data-testid="testIdOfButton"
                    className="btn SignUpSubmit btn-block"
                  >
                    Back to Login
                  </button>
                </Link>
              </div>
              <section className="or-seperator-2"></section>
              <section className="container main-center">
                <h6 className="hint" data-testid="restPasswordText">
                  If you still need help, contact Oud team at
                  <button type="button" className="btn btn-outline-link">
                    <a
                      href={'mailto:oudteam.sup@gmail.com'}
                      className="EmailtoHelp"
                    >
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
   * @description confirm password text box
   * @function
   * @returns {JSX}
   */
  confirmPassword() {
    return (
      <div className="form-group">
        <div className="input-group">
          <input
            data-testid="registerPassword"
            type={this.state.PasswordType}
            className="form-control FormElement"
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
            data-testid="registerPassword"
            type={this.state.PasswordType}
            className="form-control FormElement"
            placeholder={'Password'}
            onChange={(this.handleChange, this.PasswordHandel)}
            name="Password"
          />
          <button
            className="btn btn-outline-dark showText"
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

export default withRouter(ResetPassword);
