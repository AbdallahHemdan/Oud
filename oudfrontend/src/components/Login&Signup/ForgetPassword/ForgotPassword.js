import React, {Component} from 'react';
import MainBrand from '../MainBrand';
import axios from 'axios';
import validator from '../validate';
import '../signup/signup.css';
/** the forget password section
 * @author abdallah abu sedo
 */
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * @description the email the we will send the code to it
       */
      email: '',
      /**
       * @description the error messages forms
       */
      formErrors: {
        /**
         *@description the email error message
         */
        EmailError: '',
        /**
         * @description the error that comes from backend
         */
        mainError: '',
      },
    };
  }
  /**
   * @description on submit send the email to back end to send the code
   * @function
   * @param {object} e
   * @returns {void}
   */
  handelSubmit = (e) => {
    e.preventDefault();
    let errorMassage = '';
    if (this.state.formErrors.EmailError === '' && this.validation()) {
      axios
        .post('https://oud-zerobase.me/api/v1/users/forgotPassword', {
          email: this.state.email,
        })
        .then((response) => {
          if (response.status === 200) {
            window.location = '/welcome';
          }
        })
        .catch((error) => {
          errorMassage = error.response.data.message;
          console.log('eroror', error.response.data.message);
          this.setState((prevState) => {
            prevState.formErrors.mainError = errorMassage;
            return prevState;
          });
          console.log(error.res);
        });
    }
  };
  /**
   * @description Email validation
   * (check if the email is valid)
   * @function
   * @param {object} event -the entered email
   * @returns {boolean} - return true if the email is valid
   */
  EmailHandel = (event) => {
    this.setState({email: event.target.value});
    validator.validateEmail(event.target.value, this);
  };
  /**
   * @description Validation function check if all validation return true
   * @function
   * @returns {boolean}
   */
  validation = () => {
    let valid = true;
    valid &= validator.validateEmail(this.state.email, this);
    return valid;
  };
  /**
   * @description this function activate on change
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
   * @description here i render the text box and the submit button
   * @function
   * @function {JSX}
   */
  render() {
    return (
      <div className="container main-center forgetPage SignUpForm ">
        <MainBrand />
        <section className="social-form">
          <h2 className="pass-reset" data-testid="forgetPasswordText">
            Password Reset
          </h2>
          <h6 className="hint pass-massage" data-testid="forgetPasswordText">
            Enter your email address that you used to register. We'll send you
            an email to reset your password.
          </h6>
          <div>
            {this.state.formErrors.mainError && (
              <span
                className="hint error"
                data-testid="forgetPasswordErrorMessage"
              >
                {this.state.formErrors.mainError}
              </span>
            )}
          </div>
          <section className="main-form container ">
            <form onSubmit={this.handelSubmit}>
              <div className="form-group sm-8">
                <input
                  required
                  data-testid="forgetPassword-email"
                  type="email"
                  name="email"
                  className="form-control  FormElement"
                  placeholder="enter your email "
                  onChange={(this.handleChange, this.EmailHandel)}
                />
                {this.state.formErrors.EmailError.length > 0 && (
                  <span
                    className="error"
                    htmlFor="register-email"
                    
                  >
                    {this.state.formErrors.EmailError}
                  </span>
                )}
                <button
                  type="button"
                  className="btn SignUpSubmit btn-block"
                  onClick={this.handelSubmit}
                  data-testid="SendCodeBtn"
                >
                  Send code
                </button>
              </div>
              <section className="or-seperator-2"></section>
              <section className="container main-center">
                <h6 className="hint" data-testid="forgetPasswordText">
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

export default ForgotPassword;
