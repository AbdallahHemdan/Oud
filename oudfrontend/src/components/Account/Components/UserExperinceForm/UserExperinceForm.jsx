import React, { Component } from "react";
import "./UserExperienceForm.css";

/**
 * @type {Function}
 * @param {*} props
 * @returns {HTMLElement} Help us form
 */
function HelpUs(props) {
  return (
    <div>
      <h2>Help us improve your account experience.</h2>
      <p>Did you find what you were looking for?</p>
      <div className="helpUs">
        <span className="yesOrNo" onClick={props.handeler}>
          <i className="far fa-circle"></i>
        </span>
        <p className="yesOrNo">Yes</p>
      </div>
      <div className="helpUs">
        <span className="yesOrNo" onClick={props.handeler}>
          <i className="far fa-circle"></i>
        </span>
        <p className="yesOrNo">No</p>
      </div>
    </div>
  );
}
/**
 * @type {Function}
 * @param {*} props
 * @returns {HTMLElement} thank you let us know more form
 */
function ThankYou(props) {
  return (
    <div>
      <h2>Thanks! Let us know more.</h2>
      <p>What were you trying to do in your account?</p>
      <textarea rows="4"></textarea>
      <div className="centerSubmit">
        <button
          type="button"
          className="btn btn-warning submit "
          onClick={props.handeler}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
/**
 * @type {Function}
 * @returns {HTMLElement} Thanks for your feedback!
 */
function FeedBack() {
  return (
    <div className="feedBack">
      <h2>Thanks for your feedback!</h2>
    </div>
  );
}
/**
 * @type {Function}
 * @returns {HTMLElement} User Experience Form
 * @property 0-help us
 * @property 1-let us know more
 * @property 2-thanks for your feedback
 */
class UserExperienceForm extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };

    this.handelChange = this.handelChange.bind(this);
  }

  handelChange() {
    this.setState({ count: (this.state.count + 1) % 3 });
  }

  render() {
    const isClicked = this.state.count;
    let theForm;
    if (isClicked === 0) {
      theForm = <HelpUs handeler={this.handelChange} data-test="theForm" />;
    } else if (isClicked === 1) {
      theForm = <ThankYou handeler={this.handelChange} data-test="theForm" />;
    } else if (isClicked === 2) {
      theForm = <FeedBack data-test="theForm" />;
    }
    return <div className="accountCard">{theForm} </div>;
  }
}

export default UserExperienceForm;
