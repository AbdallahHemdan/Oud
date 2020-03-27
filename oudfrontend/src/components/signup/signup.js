import React, {Component} from 'react';
import './signup.css';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import MainBrand from './MainBrand';
import SocialIcons from './SocialIcons';
import Recaptcha from 'react-recaptcha';
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
  return isSpecialChar && isNumber && isUppercase && isLowercase;
}
/**
 * this class that have all function
 */
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      gender: '',
      year: '',
      month: '',
      day: '',
      roll: 'free',
      PasswordType: 'Password',
      showText: 'show',
      isVerified: true,
      agreeTerms: true,
      Password: '',
      ConfirmPassword: '',
      formErrors: {
        ConfirmPasswordError: '',
        PasswordError: '',
        EmailError: '',
      },
      redirect: false,
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

    if (this.state.Password.length === 0) {
      this.setState({
        formErrors: {
          PasswordError: 'you must enter a password here',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else if (this.state.Password.length < 8) {
      this.setState({
        formErrors: {
          PasswordError: 'minimum 8 characaters required',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else if (this.state.Password.length > 30) {
      this.setState({
        formErrors: {
          PasswordError: 'maximum 30 characaters',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else if (!checkPassword(this.state.Password)) {
      this.setState({
        formErrors: {
          PasswordError:
            'Password should contain uppercase,lowercase and a number ',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else {
      this.setState({
        formErrors: {
          PasswordError: '',
          ConfirmPasswordError: this.state.formErrors.ConfirmPasswordError,
          EmailError: this.state.formErrors.EmailError,
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
          ConfirmPasswordError: 'Invallid  ,Password not matched',
          EmailError: this.state.formErrors.EmailError,
        },
      });
    } else {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: '',
          EmailError: this.state.formErrors.EmailError,
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
    let tosent = {
      username: this.state.name,
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      email: this.state.email,
      password: this.state.Password,
      confirmpassword: this.state.ConfirmPassword,
      displayname: this.state.name,
      role: this.state.roll,
      country: '',
      gender: this.state.gender,
    };
    if (this.state.isVerified && this.hasSamePassword() === true) {
      let birth =
        this.state.day + '-' + this.state.month + '-' + this.state.year;
      console.log(birth);
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: '',
          EmailError: this.state.formErrors.EmailError,
        },
      });
      axios
        .post(`${process.env.REACT_APP_API_URL}/users`, tosent)
        .then((req) => {})
        .catch((error) => {
          console.log(error);
        });
      console.log(this.state);
      console.dir(e.target);
    } else if (this.hasSamePassword() === false) {
      this.setState({
        formErrors: {
          PasswordError: this.state.formErrors.PasswordError,
          ConfirmPasswordError: 'Invallid  ,Password not matched',
          EmailError: this.state.formErrors.EmailError,
        },
      });
    }
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
   * this is a captcha
   * a function to call it
   * @function
   * @returns {void}
   */
  callback = () => {
    console.log('yaaaaaaaa, captha is loaded');
  };
  /**
   * this is a captcha
   * a function to call it
   * @function
   * @param {object} action
   * @returns {void}
   * it is change if the user is not a robot
   */
  verifyCallback = (action) => {
    if (action) {
      this.setState({isVerified: true});
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
   * the render function
   * here i call all the other component
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <div className="container main-center">
        <MainBrand />
        <section className="social-form">
          <SocialIcons />
          {this.signupForm()}
        </section>
      </div>
    );
  }
  /**
   * here i call all the form functions
   * @function
   * @returns {JSX}
   */
  signupForm() {
    return (
      <section className="main-form container">
        <form onSubmit={this.handelSubmit}>
          {this.userName()}
          {this.emailAddress()}
          {this.Password()}
          {this.confirmPassword()}
          {this.gender()}
          {this.birthDate()}
          {this.conditionsAndTerms()}
          {this.Recaptcha()}
          {this.signUp()}
        </form>
      </section>
    );
  }
  /**
   * this function is set the redirect to true the is allow me to go to anther page
   * if it false the button will not work
   * if true the button wil work and to the page
   * @function
   * @returns {void}
   */
  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  /**
   * this is the function that have the path of the page that i want to go
   * @function
   * @returns {void}
   */
  toSignIN = () => {
    if (this.state.redirect) {
      return <Redirect to="/log-in" />;
    }
  };
  /**
   * this part include (signup button ==> sign in button )
   * sign up button => the submission button
   * sign in button => the router to login page
   * @function
   * @returns {JSX}
   */
  signUp() {
    return (
      <React.Fragment>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <section className="or-seperator-2"></section>
        <section className="container main-center">
          <span>
            {this.toSignIN()}
            <h6 className="hint-text">
              Already registered?
              <button
                type="button"
                className="btn btn-outline-links"
                onClick={this.setRedirect}
              >
                SignIn
              </button>
            </h6>
          </span>
        </section>
      </React.Fragment>
    );
  }
  /**
   * the recatcha call part
   * @function
   * @returns {JSX}
   */
  Recaptcha() {
    return (
      <div className="rc-captcha container">
        <Recaptcha
          sitekey="6Ld5Ht8UAAAAADUJ6PLpOY_x5YSBfe9fRsYDEiVv"
          render="explicit"
          onloadCallback={this.callback}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
  /**
   * terms and conditions of use checkbox
   * @function
   * @returns {JSX}
   */
  conditionsAndTerms() {
    return (
      <div className="form-group">
        <div className="pretty p-svg p-curve container">
          <input type="checkbox" id="gridCheck" className="form-check-input" />
          <div className="state p-success">
            <svg className="svg svg-icon" viewBox="0 0 20 20">
              <path
                d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                style={{stroke: 'white', fill: 'white'}}
              ></path>
            </svg>
            <label htmlFor="gridCheck" className="form-check-label">
              <a href="/terms-conditions" target="_black">
                Accept terms & conditions of use
              </a>
            </label>
          </div>
        </div>
      </div>
    );
  }
  /**
   * Birth date
   * here i call the year , month and day select box
   * @function
   * @returns {JSx}
   */
  birthDate() {
    return (
      <div className="form-row">
        {this.year()}
        {this.month()}
        {this.day()}
      </div>
    );
  }
  /**
   * day select box
   * @function
   * @returns {JSX}
   */
  day() {
    return (
      <div className="form-group col-md-4">
        <select
          data-testid="register-dob-day"
          id="inputDay"
          className="form-control form-col custom-select"
          defaultValue="Day"
          name="day"
          onChange={this.handleChange}
        >
          <option value="">Day</option>
          {_.range(1, 32).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  }
  /**
   * month select box
   * @function
   * @returns {JSX}
   */
  month() {
    return (
      <div className="form-group col-md-4">
        <select
          data-testid="register-dob-month"
          id="inputMonth"
          className="form-control form-col custom-select"
          defaultValue="Month"
          name="month"
          onChange={this.handleChange}
        >
          <option value="">Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
    );
  }
  /**
   * year select box
   * @function
   * @returns {JSX}
   */
  year() {
    return (
      <div className="form-group col-md-4">
        <select
          data-testid="register-dob-year"
          id="inputYear"
          className="form-control form-col custom-select"
          defaultValue="Year"
          name="year"
          onChange={this.handleChange}
        >
          <option value="">Year</option>
          {_.range(2018, 1899).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  }
  /**
   * gender select box
   * @function
   * @returns {JSX}
   */
  gender() {
    return (
      <div className="form-group">
        <select
          data-testid="register-male"
          id="inputGender"
          className="form-control form-col custom-select"
          onChange={this.handleChange}
          name="gender"
        >
          <option value="">Gender</option>
          <option value="1" defaultValue>
            Male
          </option>
          <option value="2">Female</option>
        </select>
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
            value={this.setState.ConfirmPassword}
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
            value={this.setState.Password}
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
  /**
   * email text box
   * @function
   * @returns {JSX}
   */
  emailAddress() {
    return (
      <div className="form-group">
        <input
          data-testid="register-email"
          type="email"
          className="form-control custom-select"
          placeholder="email@address.com"
          onChange={(this.handleChange, this.EmailHandel)}
          name="email"
        />
        {this.state.formErrors.EmailError.length > 0 && (
          <span className="error" htmlFor="register-email">
            {this.state.formErrors.EmailError}
          </span>
        )}
      </div>
    );
  }
  /**
   * user name text box
   * @function
   * @returns {JSX}
   */
  userName() {
    return (
      <div className="form-group sm-8">
        <input
          data-testid="register-displayname"
          value={this.state.name}
          label="name"
          type="text"
          className="form-control custom-select"
          id="validationTextarea"
          placeholder="What should we call you?"
          onChange={this.handleChange}
          name="name"
        />
      </div>
    );
  }
}

export default Signup;
