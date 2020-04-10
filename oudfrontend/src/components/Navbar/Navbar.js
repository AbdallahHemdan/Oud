import React, { Component } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import { BeforeLogin } from "./BeforeLogin/BeforeLogin"
import { AfterLogin } from "./AfterLogin/AfterLogin"

/**
 * Component to render all the stuff in Home page
 *
 *
 * @author Abdallah Hemdan
 *
 * @component
 *
 */

class Navbar extends Component {
  /**
   * @constructor
   *
   * @param {object} props - get props from higher components
   * @param {boolean} isLoggedIn - bool to indicate wether a use is logged in or not
   */

  constructor(props) {
    super(props)
    this.state = {
      /**
       * A variable to check if the user is logged or not to use it in enabling or disabling some data and navbar view
       * 
       * @property {boolean} 
       * 
       */
      isLoggedIn: this.props.isLoggedIn
    }
  }

  /**
   * A function to handle switch current route to search route on clicking in search bar
   *
   * @function
   *
   * @param {string} newRoute - new route to change to it
   * 
   * @returns {void} returns nothing, it just handle changing the routes
   */
  handleClickOnSearch = (newRoute) => {
    this.props.history.replace(`/${newRoute}`);
  }

  /**
   * A function to handle going back to last route we were used
   * 
   * @function
   * 
   * @returns {void} returns nothing, it just handle changing the routes to last one back
   * 
   */
  handleGoBack = () => {
    this.props.history.goBack();
  }

  /**
   * A function to handle going forward to the last route we were used
   * 
   * @function
   * 
   * @returns {void } returns nothing, it just handle changing the routes to last one forward
   */
  handleGoForward = () => {
    this.props.history.goForward();
  }

  componentDidMount() {
    if (this.props.isSearch) {
      this.nameInput.focus();
    }
  }
  /**
   * @function
   * @name render
   * @description Render all Navbar components
   * @returns {JSX} Component for Home
   */
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-darky fixed-top oud-nav"
          data-testid="home-nav"
        >
          <form
            className="form-inline"
            data-testid="left-part"
          >
            <div
              className="back-forward nav-back-forward"
              data-testid="nav-back-forward"
            >
              <div
                className="navbar-brand"
                onClick={this.handleGoBack}
                data-testid="back-switch"
              >
                <i className="fa fa-angle-left fa-lg left-arrow"></i>
              </div>
              <div
                className="navbar-brand"
                onClick={this.handleGoForward}
                data-testid="forward-switch">
                <i className="fa fa-angle-right fa-lg right-arrow"></i>
              </div>
            </div>
            <input
              type="search"
              className="search-input empty"
              id="iconified"
              ref={(input) => { this.nameInput = input; }}
              placeholder="&#xF002; Search for Artists, Songs"
              aria-label="Search"
              onClick={() => this.handleClickOnSearch('search')}
              data-testid="search-input"
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
            data-testid="toggle-btn"
          >
            <span className="navbar-toggler-icon toggler"></span>
          </button>

          <div
            className="collapse navbar-collapse login-signup"
            id="navbarSupportedContent"
            data-testid="right-part"
          >
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav mr-auto"></ul>
            {
              (this.state.isLoggedIn) ?
                <AfterLogin data-testid="right-after-login" /> :
                <BeforeLogin data-testid="right-before-login" />
            }
          </div>
        </nav>
      </div >
    );
  }
}


export default withRouter(Navbar);

