import React, {Component} from 'react';
import './signin.css';
import {Link, Redirect} from 'react-router-dom';
import MainBrand from './MainBrand';
import SocialIcons from './SocialIcons';
import axios from 'axios';
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
  toSignUp = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
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
    axios.post(`${process.env.REACT_APP_API_URL}/login`, tosent).then((res) => {
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
                  data-testid="login-username"
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
                    data-testid="login-password"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={this.handleShowPassword}
                    data-testid="login-button"
                  >
                    {this.state.showText}
                  </button>
                </div>
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
              <section className="container main-center">
                <h6 className="hint-text-forgot">
                  <button
                    type="button"
                    className="btn btn-outline-link"
                    data-testid="Forgetpass"
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
              <section className="container main-center">
                <span>
                  {this.toSignUp()}
                  <h6 className="hint-text">
                    Don't have an account?
                    <br />
                    <button
                      data-testid="SignUpBtn"
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

export default SignIn;
