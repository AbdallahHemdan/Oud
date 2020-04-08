import React, {Component} from 'react';
import '../signup/signup.css';
import MainBrand from '../MainBrand';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

function getTheCode() {
  let code;
  axios.get(`${process.env.REACT_APP_API_URL}/code`).then((req) => {
    code = {
      code: this.setState.code,
    };
  });
  return code;
}

/** the forget password section  */
class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      savedCode: '123456',
      redirect: false,
      formErrors: {
        CodeError: '',
      },
    };
  }
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
   * on create the page must be sent a code to it  and assign this value to code
   * @function
   * @returns {object}
   */
  componentDidMount = () => {
    getTheCode();
  };

  /**
   * check if the codes are the same
   * @function
   * @returns {boolean}
   */
  hasSameCode = () => {
    if (this.state.code !== this.state.savedCode) {
      console.log(this.code);

      return false;
    } else {
      return true;
    }
  };

  /**
   * this is the function that have the path of the page that i want to go
   * @function
   * @returns {void}
   */
  toResetPassword = () => {
    if (this.state.redirect) {
      return <Redirect to="/resetPassword" />;
    }
  };
  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  handelSubmit = (e) => {
    // It prevents a submit button from submitting a form
    e.preventDefault();
    if (this.hasSameCode() === true) {
      this.setState({
        formErrors: {
          CodeError: '',
        },
      });

      this.setRedirect();
    } else if (this.hasSameCode() === false) {
      this.setState({
        formErrors: {
          CodeError: 'Invalid code , the code is not correct',
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
      <div>
        <MainBrand />
        <section className="container main-center forgetPage SignUpForm">
          <h2 className="pass-reset">Reset Code</h2>
          <h6 className="hint pass-massage">
            We sent a code to your email write the code here
          </h6>
          <section className="main-form container">
            <form onSubmit={this.handelSubmit}>
              <div className="form-group sm-8">
                <input
                  data-testid="register-email"
                  type="text"
                  name="code"
                  className="form-control   FormElement"
                  placeholder="enter your code "
                  onChange={this.handleChange}
                />
                {this.state.formErrors.CodeError.length > 0 && (
                  <span className="error" htmlFor="register-email">
                    {this.state.formErrors.CodeError}
                  </span>
                )}
                {this.toResetPassword()}
                <button
                  type="button"
                  className="btn SignUpSubmit btn-block"
                  onClick={this.handelSubmit}
                >
                  Verify code
                </button>
              </div>
              <section className="or-seperator-2"></section>
              <section className="container main-center">
                <h6 className="hint">
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

export default Code;
