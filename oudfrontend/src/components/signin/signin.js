import React, {Component} from 'react';
import './signin.css';
import {Link, Redirect} from 'react-router-dom';
import MainBrand from './MainBrand';
import SocialIcons from './SocialIcons';
import axios from 'axios';

class signup extends Component {
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
        EmailErorr: '',
      },
    };
  }
  EmailHandel = (event) => {
    this.setState({email: event.target.value});
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/
    );
    let formErrors = {...this.state.formErrors};
    formErrors.EmailErorr = emailRegex.test(event.target.value)
      ? ''
      : 'invalid email address';
    this.setState({formErrors});
  };

  componentDidMount() {
    console.log(process.env);
  }

  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState({
      passwordType: this.state.passwordType === 'text' ? 'password' : 'text',
      showText: this.state.showText === 'show' ? 'hide' : 'show',
    });
    return false;
  };
  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  toSignUp = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, {
        password: this.state.password,
        email: this.state.email,
      })
      .then((res) => {
        console.log(res.data);
      });
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
      if (res.status === '200') {
        this.setState.islogin = true;
      } else if (res.status === '400' || res.status === '429') {
        this.setState({errors: res.data});
      }
      console.log(res.status);
      console.log(this.state);
    });
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState({[name]: value});
  };

  render() {
    return (
      <div className="container main-center">
        <MainBrand />
        <section className="social-form">
          <SocialIcons />
          <section className="main-form container">
            <form onSubmit={this.handelSubmit}>
              <div className="form-group sm-8">
                {/* {this.state.errors.email && <p>{this.state.errors.email}</p>} */}
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="email@address.com"
                  onChange={(this.handleChange, this.EmailHandel)}
                />
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    required
                    name="password"
                    type={this.state.passwordType}
                    className="form-control"
                    placeholder={'password'}
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={this.handleShowPassword}
                  >
                    {this.state.showText}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <div className="pretty p-svg p-curve container">
                  <input
                    type="checkbox"
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
              <section className="container main-center">
                <h6 className="hint-text-forgot">
                  <button type="button" className="btn btn-outline-link">
                    <Link to="/password-reset">Forgot your password?</Link>
                  </button>
                </h6>
              </section>
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
              <section className="or-seperator-2"></section>
              <section className="container main-center">
                <span>
                  {this.toSignUp()}
                  <h6 className="hint-text">
                    Don't have an account?
                    <br />
                    <button
                      type="button"
                      className="btn btn-outline-links"
                      onClick={this.setRedirect}
                    >
                      SIGN UP
                    </button>
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

export default signup;
