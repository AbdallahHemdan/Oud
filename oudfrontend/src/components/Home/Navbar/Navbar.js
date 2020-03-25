import React, { Component } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import { BeforeLogin, AfterLogin } from "./BeforeAfterLogin"


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true
    }
  }

  handleClickOnSearch = () => {
    this.props.history.replace('search');
  }

  handleGoBack = () => {
    this.props.history.goBack();
  }

  handleGoForward = () => {
    this.props.history.goForward();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-darky fixed-top">
          <form className="form-inline">
            <div className="back-forward nav-back-forward">
              <div className="navbar-brand" onClick={this.handleGoBack}>
                <i className="fa fa-angle-left fa-2x left-arrow"></i>
              </div>
              <div className="navbar-brand" onClick={this.handleGoForward}>
                <i className="fa fa-angle-right fa-2x right-arrow"></i>
              </div>
            </div>
            <input
              type="search"
              className="search-input empty"
              id="iconified"
              placeholder="&#xF002; Search for Artists, Songs"
              aria-label="Search"
              onClick={this.handleClickOnSearch}
            />
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon toggler"></span>
          </button>

          <div className="collapse navbar-collapse login-signup" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav mr-auto"></ul>
            {
              (this.state.isLoggedIn) ? <AfterLogin /> : <BeforeLogin />
            }
          </div>
        </nav>
      </div >
    );
  }
}

export default withRouter(Navbar);

