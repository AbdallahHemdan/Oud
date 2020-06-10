import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import Validator from '../validate';
import './signup.css';
const countryList = require('iso-3166-country-list');
/**
 * this class that have all function
 * @author Abdallah Zaher abu sedo
 */
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * display Name of the new user
       * @type {String}
       */
      displayName: '',
      /**
       * User Name of the new user
       * @type {String}
       */
      name: '',
      /**
       * Email of the new user
       * @type {String}
       */
      email: '',
      /**
       * Gender of the new user
       * @type {String}
       */
      gender: '',
      /**
       * var the add the year + month + day vars
       * @type {String}
       */
      birthdata: '',
      /**
       * the year of the user
       * @type {String}
       */
      year: '',
      /**
       * the month of the user
       * @type {String}
       */
      month: '',
      /**
       * hte day birth day the user
       * @type {String}
       */
      day: '',
      /**
       * the type of the sign up if free or premium or artist
       * by default free
       * @type {String}
       */
      roll: 'free',
      /**
       * var that control the password text box type if type password or text
       * @type {String}
       */
      PasswordType: 'Password',
      /**
       * show text button state
       * @type {String}
       */
      showText: 'show',
      /**
       * if the user verified the signup up in the website
       * @type {String}
       */
      isVerified: true,
      /**
       * the password of the user
       * @type {String}
       */
      Password: '',
      /**
       * confirm password of the user
       * @type {String}
       */
      ConfirmPassword: '',
      /**
       * country of the user
       * @type {String}
       */
      selectedCountry: '',
      /**
       * the type of the sign up if free or premium or artist
       * @type {String}
       */
      userType: '',
      /**
       * the error massages that appear
       * @type {String}
       */
      formErrors: {
        displayNameError: '',
        mainError: '',
        userNameError: '',
        EmailError: '',
        ConfirmPasswordError: '',
        PasswordError: '',
        GenderError: '',
        BirthdataError: '',
        TermsError: '',
        countryError: '',
      },
      redirect: false,
    };
  }
  /**
   * UserName validation
   * (check if the UserName is valid)
   * @function
   * @param {object} event -the entered UserName
   * @returns {boolean} - return true if the UserName is valid
   */
  userNameHandel = (event) => {
    this.setState({name: event.target.value});
    Validator.validateUserName(event.target.value, this);
  };
  /**
   * Displayname validation
   * (check if the Displayname is valid)
   * @function
   * @param {object} event -the entered Displayname
   * @returns {boolean} - return true if the Displayname is valid
   */
  DisplaynameHandel = (event) => {
    this.setState({displayName: event.target.value});
    Validator.validateDisplayName(event.target.value, this);
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
    Validator.validateEmail(event.target.value, this);
  };
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
   * Gender validation
   * (check if the Gender is valid)
   * @function
   * @param {object} event -the entered Gender
   * @returns {boolean} - return true if the Gender is valid
   */
  genderHandel = (event) => {
    this.setState({gender: event.target.value});
    Validator.validateGender(event.target.value, this);
  };
  /**
   * country validation
   * (check if the country is valid)
   * @function
   * @param {object} event -the entered country
   * @returns {boolean} - return true if the country is valid
   */
  countryHandel = (event) => {
    this.setState({selectedCountry: event.target.value});
    Validator.validateCountry(event.target.value, this);
  };
  /**
   * birthdata validation
   * (check if the birthdata is valid)
   * @function
   * @param {object} event -the entered birthdata
   * @returns {boolean} - return true if the birthdata is valid
   */
  birthdataHandel = (event) => {
    this.setState({birthdata: event.target.value});
    Validator.validateBirthdata(
      this.state.year,
      this.state.month,
      this.state.day,
      this
    );
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
   * validateAll function that have all the booleans from other validations function and chick if its true
   * @function
   * @returns {boolean}
   */
  validateAll = () => {
    let value = true;
    value &= Validator.validateUserName(this.state.name, this);
    value &= Validator.validateEmail(this.state.email, this);
    value &= Validator.validatePassword(this.state.Password, this);
    value &= Validator.validateConfirmPassword(
      this.state.ConfirmPassword,
      this
    );
    value |= Validator.validateGender(this.state.gender, this);
    value |= Validator.validateBirthdata(
      this.state.year,
      this.state.month,
      this.state.day,
      this
    );
    value &= Validator.validateDisplayName(this.state.displayName, this);
    value &= Validator.validateCountry(this.state.selectedCountry, this);
    return value;
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
    let birth =
      this.state.year +
      '-' +
      this.state.month +
      '-' +
      (this.state.day.length === 1 ? '0' : '') +
      this.state.day;
    let gen;
    if (this.state.gender === '1') {
      gen = 'M';
    } else if (this.state.gender === '2') {
      gen = 'F';
    }
    let usersType;
    if (this.state.userType === '01') {
      usersType = 'free';
    } else if (this.state.userType === '02') {
      usersType = 'premium';
    } else if (this.state.userType === '03') {
      usersType = 'artist';
    }

    let toSent = {
      username: this.state.name,
      birthDate: birth,
      email: this.state.email,
      password: this.state.Password,
      passwordConfirm: this.state.ConfirmPassword,
      displayName: this.state.displayName,
      role: usersType,
      country: countryList.code(this.state.selectedCountry),
      gender: gen,
    };
    console.log(toSent);

    let errorMassage = '';
    if (
      this.state.isVerified &&
      this.hasSamePassword() === true &&
      this.validateAll()
    ) {
      axios
        .post('https://oud-zerobase.me/api/v1/users/signup', toSent)
        .then((response) => {
          if (response.status === 200) {
            const authToken = response.data.token;
            localStorage.setItem('accessToken', authToken);
            console.log('token', authToken);
            console.log(response);
            window.location = '/SuggestedArtist';
          }
        })
        .catch((error) => {
          errorMassage = error.response.data.message;
          if (error.response.data.message !== '') {
            errorMassage =
              'this email or username is used Please use another Email';
          }
          console.log('error', error.response.data.message);
          this.setState((prevState) => {
            prevState.formErrors.mainError = errorMassage;
            return prevState;
          });
        });
      console.log('state', this.state);
    }
    this.setState((prevState) => {
      prevState.formErrors.ConfirmPasswordError = errorMassage;
      return prevState;
    });
  };

  /**
   * this function is for the show password button that check if i want it to be
   * a password or to be a text input
   * @function
   * @param {object} e
   * @returns {boolean} - if the the button is clicked it is check if i want to show the type is a password or as a text
   */
  handleShowPassword = () => {
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
  callback = () => {};
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
   * @param {object} e
   * @returns {void}
   */
  handleChange = (e) => {
    console.log(this.state.agreeTerms);

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
    return <div>{this.signupForm()}</div>;
  }
  /**
   * here i call all the form functions
   * @function
   * @returns {JSX}
   */
  signupForm() {
    return (
      <section className="main-form container SignUpForm">
        <form onSubmit={this.handelSubmit} noValidate>
          <div>
            {this.state.formErrors.mainError && (
              <span className="hint error">
                {this.state.formErrors.mainError}
              </span>
            )}
          </div>
          {this.displayName()}
          {this.userName()}
          {this.emailAddress()}
          {this.Password()}
          {this.confirmPassword()}
          {this.gender()}
          {this.country()}
          {this.birthDate()}
          {this.UserType()}
          {this.signUp()}
        </form>
      </section>
    );
  }
  /**
   * country component
   * @returns {JSX}
   */
  country() {
    return (
      <div className="form-group">
        <select
          data-testid="register-country"
          className="form-control FormElement  form-col custom-select"
          defaultValue="selecteCountry"
          name="selectedCountry"
          onChange={(this.handleChange, this.countryHandel)}
        >
          <option value="">Select your country</option>
          {countryList.names.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <div>
          {this.state.formErrors.countryError && (
            <span className="error" htmlFor="register-country">
              {this.state.formErrors.countryError}
            </span>
          )}
        </div>
      </div>
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
      return <Redirect to="/signin" />;
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
        <button
          type="submit"
          className="btn btn-block SignUpSubmit"
          data-testid="SignUp-btn"
        >
          Sign Up
        </button>
        <section className="or-seperator-2 OR-2"></section>
        <section>
          {this.toSignIN()}
          <h6 className="hint-text hint ">Already registered?</h6>

          <button
            data-testid="SignIN-btn"
            type="button"
            className="btn btn-block SignUpSubmit"
            onClick={this.setRedirect}
          >
            SignIn
          </button>
        </section>
      </React.Fragment>
    );
  }
  /**
   * user type function that select if the user want to be a free user or premium or artist
   * @function
   * @returns {JSX}
   */
  UserType() {
    return (
      <div className="form-group">
        <select
          data-testid="register-user-test"
          className="form-control FormElement  form-col custom-select"
          defaultValue="userType"
          name="userType"
          onChange={this.handleChange}
        >
          <option value="01">Free</option>
          <option value="02">premium</option>
          <option value="03">Artist</option>
        </select>
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
      <div className="form-row" onSubmit={this.birthdataHandel}>
        {this.year()}
        {this.month()}
        {this.day()}
        <div>
          {this.state.formErrors.BirthdataError && (
            <span className="error" data-testid="BirthDateTest">
              {this.state.formErrors.BirthdataError}
            </span>
          )}
        </div>
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
          className="form-control FormElement  form-col custom-select"
          defaultValue="Day"
          name="day"
          onChange={this.handleChange}
        >
          <option value="">Day</option>
          {_.range(
            1,
            (this.state.year % 400 === 0 ||
              (this.state.year % 4 === 0 && this.state.year % 100 !== 0)) &&
              this.state.month === '02'
              ? 30
              : this.state.month === '02'
              ? 29
              : this.state.month === '04' ||
                this.state.month === '06' ||
                this.state.month === '09' ||
                this.state.month === '11'
              ? 31
              : 32
          ).map((value) => (
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
          className="form-control FormElement  form-col custom-select"
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
          className="form-control FormElement  form-col custom-select"
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
          required
          data-testid="register-male"
          id="inputGender"
          className="form-control FormElement  form-col custom-select"
          onChange={(this.handleChange, this.genderHandel)}
          name="gender"
        >
          <option value="">Gender</option>
          <option value="1" defaultValue>
            Male
          </option>
          <option value="2">Female</option>
        </select>
        <div>
          {this.state.formErrors.GenderError && (
            <span className="error" htmlFor="register-male">
              {this.state.formErrors.GenderError}
            </span>
          )}
        </div>
      </div>
    );
  }
  /**
   * confirm password text box
   * @function
   * @returns {JSX}
   */
  confirmPassword() {
    let same = this.hasSamePassword();
    return (
      <div className="form-group">
        <div className="input-group">
          <input
            required
            data-testid="register-confirmPassword"
            type={this.state.PasswordType}
            className="form-control FormElement"
            placeholder={'confirm Password'}
            onChange={(this.handleChange, this.ConfirmPasswordHandel)}
            name="confirmPassword"
            value={this.setState.ConfirmPassword}
          />
        </div>
        {same === false
          ? this.state.formErrors.ConfirmPasswordError && (
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
            required
            data-testid="register-password"
            type={this.state.PasswordType}
            className="form-control FormElement"
            placeholder={'Password'}
            onChange={(this.handleChange, this.PasswordHandel)}
            name="Password"
            value={this.setState.Password}
          />
        </div>
        {this.state.formErrors.PasswordError && (
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
      <div className="form-group" data-testid="email">
        <input
          required
          data-testid="register-email"
          type="email"
          className="form-control FormElement"
          placeholder="email@address.com"
          onChange={(this.handleChange, this.EmailHandel)}
          name="email"
        />
        {this.state.formErrors.EmailError && (
          <span
            className="error"
            htmlFor="register-email"
            data-testid="EmailError"
          >
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
          required
          data-testid="register-username"
          value={this.state.name}
          label="name"
          type="text"
          className="form-control FormElement"
          id="validationTextarea"
          placeholder="Enter Username"
          onChange={(this.handleChange, this.userNameHandel)}
          name="name"
        />
        <div>
          {this.state.formErrors.userNameError && (
            <span className="error" htmlFor="register-username">
              {this.state.formErrors.userNameError}
            </span>
          )}
        </div>
      </div>
    );
  }
  /**
   * displayName text box
   * @function
   * @returns {JSX}
   */
  displayName() {
    return (
      <div className="form-group sm-8">
        <input
          required
          data-testid="register-displayname"
          value={this.state.displayname}
          label="display name"
          type="text"
          className="form-control FormElement"
          placeholder="What should we call you?"
          onChange={(this.handleChange, this.DisplaynameHandel)}
          name="name"
        />
        <div>
          {this.state.formErrors.displayNameError && (
            <span className="error" htmlFor="register-displayname">
              {this.state.formErrors.displayNameError}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Signup;
