import React, { Component } from "react";
import EditProfileTextElement from "../EditProfileTextElement/EditProfileTextElement";
import UserExperinceForm from "../UserExperinceForm/UserExperinceForm";
import axios from "axios";
import { config } from "./../../../../utils/auth"
import "./ChangePassword.css";



/**
 * just have a dummy password and should be changed
 * @type{object}
 *
 */
let ProfileInfo = {
  oldPassword: "",
  repeatPassword: "",
  newpassword: "",
  password: "7_DummyPassword_5" //this should not sotred in the db you should change this
};

/**
 * @type {Function}
 * @param {*} form errors
 * @returns {boolean} valid or not valid
 */

function formValid({ formErrors, ...rest }) {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
}
/**
 * @type {Function}
 * @param {password} password
 * @returns {boolean} valid password or not
 */
function checkPassword(password) {
  let [isUppercase, isLowercase, isSpecialChar, isNumber] = [
    false,
    false,
    false,
    false
  ];

  let str = password + "0";
  let patt1 = /[0-9]/g;
  isNumber = str.match(patt1).length > 1;

  patt1 = /[!@#$%^&*(),.?":{}_|<>]/g;
  str = password + "@";
  isSpecialChar = str.match(patt1).length > 1;

  for (let i = 0; i < password.length; i++) {
    if (password[i] === password[i].toUpperCase()) {
      isUppercase = true;
    } else if (password[i] === password[i].toLowerCase()) {
      isLowercase = true;
    }
  }
  return isSpecialChar && isNumber && isUppercase && isLowercase;
}

/**
 * @type {Class}
 * @returns {jsx} change Password Page
 */

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formNotValid: "",
      formSaved: "",
      formErrors: {
        passwordErorr: "",
        repeatPasswordErorr: "",
        oldPasswordError: ""
      },

      oldPassword: "",
      password: "",
      repeatPassword: ""
    };
    this.oldPasswordHandelChange = this.oldPasswordHandelChange.bind(this);
    this.passwordHandelChange = this.passwordHandelChange.bind(this);
    this.repeatPasswordHandelChange = this.repeatPasswordHandelChange.bind(
      this
    );
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handleCancle = this.handleCancle.bind(this);
  }

  oldPasswordHandelChange(event) {
    this.setState({ oldPassword: event.target.value });
  }
  /**
   * submit change password form to be edited (make patch req to change password)
   * @type {Function}
   * @param {*} event
   */
  handelSubmit(event) {
    event.preventDefault();

    if (formValid(this.state)) {
      //make a request
      axios
        .patch(
          "https://oud-zerobase.me/api/v1/me/updatePassword",
          {
            currentPassword: this.state.oldPassword,
            password: this.state.password,
            passwordConfirm: this.state.repeatPassword
          },
          config
        )
        .then(response => {
          this.setState({
            formNotValid: "",
            formSaved: "Password changed successfully"
          });
        })
        .catch(error => {
          console.log(error.response);
          this.setState({
            formNotValid: error.response.data.message,
            formSaved: ""
          });
        });
    }
  }
  /**
   * this function checks the new password format
   * @this {Function}
   * @param {*} event
   */
  passwordHandelChange(event) {
    this.setState({ password: event.target.value });
    let formErrors = { ...this.state.formErrors };

    if (event.target.value < 8) {
      formErrors.passwordErorr = "minimum 8 characaters required";
      this.setState({ formErrors });
    } else if (event.target.value > 30) {
      formErrors.passwordErorr = "maximum 30 characaters";
      this.setState({ formErrors });
    } else if (!checkPassword(event.target.value)) {
      formErrors.passwordErorr =
        "password should contain uppercase,lowercase,special character and a number";
      this.setState({ formErrors });
    } else {
      formErrors.passwordErorr = "";
      this.setState({ formErrors });
    }
  }
  /**
   * this function checks that confirm password matches the new password
   * @this {Function}
   * @param {*} event
   */
  repeatPasswordHandelChange(event) {
    this.setState({ repeatPassword: event.target.value });
    let formErrors = { ...this.state.formErrors };
    formErrors.repeatPasswordErorr =
      event.target.value !== this.state.password
        ? "Invallid  ,password not matched"
        : "";
    this.setState({ formErrors });
  }
  /**
   * this function cancel changes in the change password
   * @this {Function}
   * @param {*} event
   */
  handleCancle(event) {
    this.setState({
      formNotValid: "",
      formSaved: "",
      formErrors: {
        passwordErorr: "",
        repeatPasswordErorr: "",
        oldPasswordError: ""
      },

      oldPassword: "",
      password: "",
      repeatPassword: ""
    });
  }
  /**
   * @returns {
   *  <ChangePassword/>
   * }
   */
  render() {
    return (
      <div className="accountContainer" data-test="ChangePassword">
        <h2 className="settingTitle"> Change password </h2>
        <div className="accountCard" data-test="ChangePassword-Card">
          <form className="editProfileElement" onSubmit={this.handelSubmit}>
            {this.state.formNotValid.length > 0 && (
              <div className="formSubmitErorr">{this.state.formNotValid}</div>
            )}
            {this.state.formSaved.length > 0 && (
              <div className="formSubmitSaved">{this.state.formSaved}</div>
            )}

            <EditProfileTextElement
              id="current password"
              data-test="current-password"
              metaData="Current password"
              class="editInput"
              type="password"
              handeler={this.oldPasswordHandelChange}
              value={this.state.oldPassword}
            />
            {this.state.formErrors.oldPasswordError.length > 0 && (
              <span className="error">
                {this.state.formErrors.oldPasswordError}
              </span>
            )}
            <EditProfileTextElement
              id="new password"
              data-test="new-password"
              metaData="New password"
              class="editInput"
              type="password"
              handeler={this.passwordHandelChange}
              value={this.state.password}
            />
            {this.state.formErrors.passwordErorr.length > 0 && (
              <span className="error">
                {this.state.formErrors.passwordErorr}
              </span>
            )}
            <EditProfileTextElement
              id="repeat new password"
              data-test="repeat-new-password"
              metaData="Repeat new password"
              class="editInput"
              type="password"
              handeler={this.repeatPasswordHandelChange}
              value={this.state.repeatPassword}
            />
            {this.state.formErrors.repeatPasswordErorr.length > 0 && (
              <span className="error">
                {this.state.formErrors.repeatPasswordErorr}
              </span>
            )}
            <div style={{ height: "45px" }}></div>
            <div className="rightSaveProfile">
              <button
                id="cancle"
                type="button"
                className="btn btn-light cancle"
                data-test="cancle"
                onClick={this.handleCancle}
              >
                Cancle
              </button>
              <input
                id="set new password"
                className="btn btn-warning submit"
                type="submit"
                value="Set new password"
                data-test="submit"
              />
            </div>
          </form>
        </div>
        <UserExperinceForm data-test="UserExperinceForm" />
      </div>
    );
  }
}
export default ChangePassword;
