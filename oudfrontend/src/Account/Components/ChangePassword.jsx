import React, { Component } from "react";
import EditProfileTextElement from "./EditProfileTextElement";
import UserExperinceForm from "./UserExperinceForm";
import ProfileInfo from "../General/DummyMock";

import "../CssFiles/ChangePassword.css";

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
  }

  oldPasswordHandelChange(event) {
    this.setState({ oldPassword: event.target.value });
    let formErrors = { ...this.state.formErrors };
    formErrors.oldPasswordError =
      event.target.value !== ProfileInfo.password
        ? "Invallid password not matched"
        : "";
    this.setState({ formErrors });
  }

  handelSubmit(event) {
    event.preventDefault();

    if (formValid(this.state)) {
      //make a request
      this.setState({
        formNotValid: "",
        formSaved: "Password changed successfully"
      });
    } else {
      this.setState({
        formNotValid: "please , check the required feilds",
        formSaved: ""
      });
    }
  }

  passwordHandelChange(event) {
    this.setState({ password: event.target.value });
    let formErrors = { ...this.state.formErrors };

    if (this.state.password.length < 8) {
      formErrors.passwordErorr = "minimum 8 characaters required";
      this.setState({ formErrors });
    } else if (this.state.password.length > 30) {
      formErrors.passwordErorr = "maximum 30 characaters";
      this.setState({ formErrors });
    } else if (!checkPassword(this.state.password)) {
      formErrors.passwordErorr =
        "password should contain uppercase,lowercase,special character and a number";
      this.setState({ formErrors });
    } else {
      formErrors.passwordErorr = "";
      this.setState({ formErrors });
    }
  }
  repeatPasswordHandelChange(event) {
    this.setState({ repeatPassword: event.target.value });
    let formErrors = { ...this.state.formErrors };
    formErrors.repeatPasswordErorr =
      event.target.value !== this.state.password
        ? "Invallid  ,password not matched"
        : "";
    this.setState({ formErrors });
  }

  render() {
    return (
      <div className="accountContainer">
        <h2 className="settingTitle"> Change password </h2>
        <div className="accountCard">
          <form className="editProfileElement" onSubmit={this.handelSubmit}>
            {this.state.formNotValid.length > 0 && (
              <div className="formSubmitErorr">{this.state.formNotValid}</div>
            )}
            {this.state.formSaved.length > 0 && (
              <div className="formSubmitSaved">{this.state.formSaved}</div>
            )}

            <EditProfileTextElement
              id="current password"
              metaData="Current password"
              class="editInput"
              type="password"
              handeler={this.oldPasswordHandelChange}
            />
            {this.state.formErrors.oldPasswordError.length > 0 && (
              <span className="error">
                {this.state.formErrors.oldPasswordError}
              </span>
            )}
            <EditProfileTextElement
              id="new password"
              metaData="New password"
              class="editInput"
              type="password"
              handeler={this.passwordHandelChange}
            />
            {this.state.formErrors.passwordErorr.length > 0 && (
              <span className="error">
                {this.state.formErrors.passwordErorr}
              </span>
            )}
            <EditProfileTextElement
              id="repeat new password"
              metaData="Repeat new password"
              class="editInput"
              type="password"
              handeler={this.repeatPasswordHandelChange}
            />
            {this.state.formErrors.repeatPasswordErorr.length > 0 && (
              <span className="error">
                {this.state.formErrors.repeatPasswordErorr}
              </span>
            )}
            <div style={{ height: "45px" }}></div>
            <div className="rightSaveProfile">
              <button
                id="cancel"
                type="button"
                className="btn btn-light cancle"
              >
                Cancle
              </button>
              <input
                id="set new password"
                className="btn btn-warning submit"
                type="submit"
                value="Set new password"
              />
            </div>
          </form>
        </div>
        <UserExperinceForm />
      </div>
    );
  }
}
export default ChangePassword;
