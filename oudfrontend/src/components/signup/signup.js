import React, {Component} from 'react';
import './signup.css';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import MainBrand from './MainBrand';
import SocialIcons from './SocialIcons';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      year: '',
      month: '',
      day: '',
      roll: 'free',
      passwordType: 'password',
      showText: 'show',
      isVerified: true,
      agreeTerms: true,
    };
  }
  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState({
      passwordType: this.state.passwordType === 'text' ? 'password' : 'text',
      showText: this.state.showText === 'show' ? 'hide' : 'show',
    });
    return false;
  };
  hasSamePassword = () => {
    if (this.state.password === this.state.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };
  handelSubmit = (e) => {
    e.preventDefault();
    if (this.state.isVerified && this.hasSamePassword() === true) {
      let birth =
        this.state.day + '-' + this.state.month + '-' + this.state.year;
      console.log(birth);
      console.log(this.state);
    } else if (this.hasSamePassword() === false) {
      alert('the two passwords should be the same');
    } else {
      console.log('check that you are human');
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, this.state)
      .then((req) => {})
      .catch((error) => {
        console.log(error);
      });
    console.dir(e.target);
  };

  callback = () => {
    console.log('yaaaaaaaa, captha is loaded');
  };

  verifyCallback = (action) => {
    if (action) {
      this.setState({isVerified: true});
    }
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

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

  signupForm() {
    return (
      <section className="main-form container">
        <form onSubmit={this.handelSubmit} className="was-validated ">
          {this.userName()}
          {this.emailAddress()}
          {this.password()}
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

  signUp() {
    return (
      <React.Fragment>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <section className="or-seperator-2"></section>
        <section className="container main-center">
          <h6 className="hint-text">
            Already registered?
            <button type="button" className="btn btn-link">
              <Link to="/log-in">SIGN IN</Link>
            </button>
          </h6>
        </section>
      </React.Fragment>
    );
  }

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

  conditionsAndTerms() {
    return (
      <div className="form-group">
        <div className="pretty p-svg p-curve container">
          <input
            required
            type="checkbox"
            id="gridCheck"
            className="form-check-input"
          />
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

  birthDate() {
    return (
      <div className="form-row">
        {this.year()}
        {this.month()}
        {this.day()}
      </div>
    );
  }

  day() {
    return (
      <div className="form-group col-md-4">
        <select
          id="inputDay"
          className="form-control form-col custom-select"
          defaultValue="Day"
          name="day"
          onChange={this.handleChange}
          required
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

  month() {
    return (
      <div className="form-group col-md-4">
        <select
          id="inputMonth"
          className="form-control form-col custom-select"
          defaultValue="Month"
          name="month"
          onChange={this.handleChange}
          required
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

  year() {
    return (
      <div className="form-group col-md-4">
        <select
          id="inputYear"
          className="form-control form-col custom-select"
          defaultValue="Year"
          name="year"
          onChange={this.handleChange}
          required
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

  gender() {
    return (
      <div className="form-group">
        <select
          id="inputGender"
          className="form-control form-col custom-select"
          required
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

  confirmPassword() {
    return (
      <div className="form-group">
        <div className="input-group">
          <input
            required
            type={this.state.passwordType}
            className="form-control"
            placeholder={'confirm password'}
            onChange={this.handleChange}
            name="confirmPassword"
          />
        </div>
        {this.hasSamePassword() === false ? (
          <div className="invalid-feedback">
            Example invalid custom select feedback
          </div>
        ) : null}
      </div>
    );
  }

  password() {
    return (
      <div className="form-group">
        <div className="input-group">
          <input
            required
            type={this.state.passwordType}
            className="form-control"
            placeholder={'password'}
            onChange={this.handleChange}
            name="password"
          />
          <button
            className="btn btn-outline-dark"
            onClick={this.handleShowPassword}
          >
            {this.state.showText}
          </button>
        </div>
      </div>
    );
  }

  emailAddress() {
    return (
      <div className="form-group">
        <input
          required
          type="email"
          className="form-control custom-select"
          placeholder="email@address.com"
          onChange={this.handleChange}
          name="email"
        />
      </div>
    );
  }

  userName() {
    return (
      <div className="form-group sm-8">
        <input
          required
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

export default signup;
