import React, { Component } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  handleClickOnSearch = () => {
    this.props.history.replace("search");
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };
  handleGoForward = () => {
    this.props.history.goForward();
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <form className="form-inline">
            <div className="back-forward">
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
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse login-signup"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav mr-auto"></ul>
            <form className="form-inline my-2 my-lg-0">
              <button
                className="btn oud-btn my-2 my-sm-0 mr-3 login-signup-btn"
                type="submit"
              >
                Login
              </button>
              <button
                className="btn oud-btn my-2 my-sm-0 mr-3 login-signup-btn"
                type="submit"
              >
                Signup
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
