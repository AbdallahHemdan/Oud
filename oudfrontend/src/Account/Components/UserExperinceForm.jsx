import React, { Component } from "react";
import "../CssFiles/UserExperienceForm.css";

/*may be i will restructure it */
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
function FeedBack() {
  return (
    <div className="feedBack">
      <h2>Thanks for your feedback!</h2>
    </div>
  );
}

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
      theForm = <HelpUs handeler={this.handelChange} />;
    } else if (isClicked === 1) {
      theForm = <ThankYou handeler={this.handelChange} />;
    } else if (isClicked === 2) {
      theForm = <FeedBack />;
    }
    return <div className="accountCard">{theForm} </div>;
  }
}

export default UserExperienceForm;
