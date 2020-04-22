import React, { Component } from "react";
import Country from "../../General/Country";
import UserExperinceForm from "../UserExperinceForm/UserExperinceForm";
import EditProfileTextElement from "../EditProfileTextElement/EditProfileTextElement";
import axios from "axios";
import { config } from "./../../../../utils/auth"
import "./EditProfile.css";


/**
 * @type {object}
 * @property {string} email
 * @property {string} birthDate
 * @property {string} country
 * @property {string} gender
 * @property {string} displayName
 */
let ProfileInfo = {
  email: "",
  birthDate: "",
  country: "",
  gender: "",
  displayName: ""
};
/**
 * @type {Function}
 * @param {*} props
 * @returns {HTMLElement} Edit country feild
 */
function EditCountry(props) {
  return (
    <div id={props.id} className="EditProfileDropElement">
      <p className="editMetaData">Country</p>
      <Country
        class={props.class}
        default={props.default}
        handeler={props.handeler}
      />
    </div>
  );
}
/**
 * @type {Function}
 * @param {*} props
 * @returns {jsx} Edit gender feild
 */
function EditGendr(props) {
  return (
    <div className="EditProfileDropElement">
      <p className="editMetaData">{props.metaData}</p>
      <select
        id={props.id}
        className={props.class}
        value={props.value}
        onChange={props.handeler}
      >
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
    </div>
  );
}
/**
 * check if the form is valid
 * @type {Function}
 * @returns {boolean} valid or not
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
 * Edit Profile
 * @type {Class}
 * @returns {HTMLElement} Edit Profile Page
 */

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      gender: "",
      dateOfBirth: "",
      country: "",
      displayName: "",
      password: "",
      formNotValid: "",
      formSaved: "",
      formErrors: {
        emailError: "",
        displayNameError: "",
        passwordErorr: ""
      }
    };

    this.emailHandelChange = this.emailHandelChange.bind(this);
    this.genderHandelChange = this.genderHandelChange.bind(this);
    this.dateOfBirthHandelChange = this.dateOfBirthHandelChange.bind(this);
    this.countryHandelChange = this.countryHandelChange.bind(this);
    this.displayNameHandelChange = this.displayNameHandelChange.bind(this);
    this.passwordHandelChange = this.passwordHandelChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * make get req to display the user Info to be edites
   */
  componentDidMount() {
    axios
      .get("https://oud-zerobase.me/api/v1/me", config)
      .then(response => {
        ProfileInfo.displayName = response.data.displayName;
        ProfileInfo.email = response.data.email;
        ProfileInfo.gender = response.data.gender;
        ProfileInfo.birthDate = response.data.birthDate.substr(0, 10);
        ProfileInfo.country = response.data.country;

        this.setState({
          email: response.data.email,
          gender: response.data.gender,
          dateOfBirth: response.data.birthDate.substr(0, 10),
          displayName: response.data.displayName,
          country: response.data.country
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  /**
   * handle change in email and validate the formate of the email
   * @type {Function}
   * @param {*} event
   */
  emailHandelChange(event) {
    this.setState({ email: event.target.value });
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    let formErrors = { ...this.state.formErrors };
    formErrors.emailError = emailRegex.test(event.target.value)
      ? ""
      : "invalid email address";
    this.setState({ formErrors });
  }
  /**
   * set gender
   * @type {Function}
   * @param {*} event
   */
  genderHandelChange(event) {
    this.setState({ gender: event.target.value });
  }
  /**
   * set date of birth
   * @type {Function}
   * @param {*} event
   */
  dateOfBirthHandelChange(event) {
    this.setState({ dateOfBirth: event.target.value });
  }
  /**
   * set Country
   * @type {Function}
   * @param {*} event
   */
  countryHandelChange(event) {
    this.setState({ country: event.target.value });
  }
  /**
   * set DisplayName
   * @type {Function}
   * @param {*} event
   */
  displayNameHandelChange(event) {
    this.setState({ displayName: event.target.value });
    let formErrors = { ...this.state.formErrors };
    formErrors.displayNameError =
      event.target.value.length < 3 ? "minimum 3 characaters required" : "";
    this.setState({ formErrors });
  }
  /**
   * set Password
   * @type {Function}
   * @param {*} event
   */
  passwordHandelChange(event) {
    this.setState({ password: event.target.value });
  }
  /**
   * submit the profile inf to be edited (make put req to edit profile Info)
   * @type {Function}
   * @param {*} event
   */
  handelSubmit(event) {
    event.preventDefault();

    const disablePassword =
      ProfileInfo.email === this.state.email &&
      ProfileInfo.Gender === this.state.gender &&
      ProfileInfo.displayName === this.state.displayName &&
      ProfileInfo.country === this.state.country &&
      ProfileInfo.birthDate === this.state.dateOfBirth;

    if (disablePassword) {
      this.setState({ formValid: "", password: "" });
    } else if (formValid(this.state)) {
      //make a update request

      axios
        .put(
          "https://oud-zerobase.me/api/v1/me/profile",
          {
            email: this.state.email,
            passwordConfirm: this.state.password,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            country: this.state.country,
            displayName: this.state.displayName
          },
          config
        )
        .then(response => {
          this.setState({
            formNotValid: "",
            formSaved: "Profile saved successfully"
          });
        })
        .catch(error => {
          console.log(error.response);
          this.setState({
            formNotValid: error.response.data.message,
            formSaved: ""
          });
        });
    } else {
      this.setState({
        formNotValid: "please , check the required feilds",
        formSaved: ""
      });
    }
  }
  /**
   * cancle any edit in the profile Info and set it to default
   * @type {Function}
   * @param {*} event
   */
  handleCancel(event) {
    this.setState({
      email: ProfileInfo.email,
      gender: ProfileInfo.gender,
      dateOfBirth: ProfileInfo.birthDate,
      displayName: ProfileInfo.displayName,
      country: ProfileInfo.country,
      password: ""
    });
  }
  /**
   * @returns {<EditPassword/>} which contain
   *
   */
  render() {
    const disablePassword =
      ProfileInfo.email === this.state.email &&
      ProfileInfo.gender === this.state.gender &&
      ProfileInfo.displayName === this.state.displayName &&
      ProfileInfo.country === this.state.country &&
      ProfileInfo.birthDate === this.state.dateOfBirth;
    return (
      <div className="accountContainer" data-test="EditProfile">
        <h2 className="settingTitle"> Edit profile </h2>

        <div className="accountCard" data-test="EditProfile-accountCard">
          <form className="editProfileElement" onSubmit={this.handelSubmit}>
            {this.state.formNotValid.length > 0 && (
              <div className="formSubmitErorr">{this.state.formNotValid}</div>
            )}
            {this.state.formSaved.length > 0 && (
              <div className="formSubmitSaved">{this.state.formSaved}</div>
            )}
            <EditProfileTextElement
              id="displayName"
              data-test="displyName"
              metaData="Display Name"
              value={this.state.displayName}
              class="editInput"
              type="text"
              handeler={this.displayNameHandelChange}
            />
            {this.state.formErrors.displayNameError.length > 0 && (
              <span className="error">
                {this.state.formErrors.displayNameError}
              </span>
            )}
            <EditProfileTextElement
              id="email"
              data-test="email"
              metaData="Email"
              value={this.state.email}
              class="editInput"
              type="text"
              handeler={this.emailHandelChange}
            />
            {this.state.formErrors.emailError.length > 0 && (
              <span className="error">{this.state.formErrors.emailError}</span>
            )}
            <EditGendr
              id="gender"
              data-test="gender"
              metaData="Gender"
              value={this.state.gender}
              class="editInput"
              handeler={this.genderHandelChange}
            />
            <EditProfileTextElement
              id="dateOfBirth"
              data-test="dateOfBirth"
              metaData="Date of birth"
              value={this.state.dateOfBirth}
              class="editInput"
              type="date"
              handeler={this.dateOfBirthHandelChange}
            />
            <EditCountry
              id="editCountrty"
              data-test="country"
              class="editInput"
              default={this.state.country}
              handeler={this.countryHandelChange}
            />
            <EditProfileTextElement
              id="confirimPassword"
              data-test="password"
              metaData="Confirm password"
              class="editInput"
              type="password"
              disable={disablePassword}
              handeler={this.passwordHandelChange}
            />
            {this.state.formErrors.passwordErorr.length > 0 &&
              !disablePassword && (
                <span className="error">
                  {this.state.formErrors.passwordErorr}
                </span>
              )}
            <p style={{ marginTop: "30px" }}>
              Oud keeps your information alawys secret !
            </p>
            <div className="rightSaveProfile">
              <button
                id="cancle"
                type="button"
                className="btn btn-light cancle"
                data-test="cancle"
                onClick={this.handleCancel}
              >
                CANCLE
              </button>
              <input
                id="save profile"
                className="btn btn-warning submit"
                type="submit"
                value="SAVE PROFILE"
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

export default EditProfile;
