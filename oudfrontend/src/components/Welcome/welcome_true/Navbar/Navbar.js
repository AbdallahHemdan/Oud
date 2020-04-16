import React, {Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';
// import NavbarRouter from '../../../routes/NavbarRouter';
import logo from '../../../../assets/images/Logo.png';
import mask from '../../../../assets/images/mask.png';
import '../../welcome.css';
/**nav bar if the user is logged in */
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }
  /**
   * set the logged in to true
   * @function
   * @returns {void}
   */
  doLogIn = () => this.setState({loggedIn: true});
  /**
   * set the logged in to true
   * @function
   * @returns {void}
   */
  doLogOut = () => this.setState({loggedIn: false});
  /**
   * just to see what is the status that in the real time
   * @function
   * @returns {boolean}
   */
  handleStatus = () =>
    this.props.status
      ? this.setState({loggedIn: true})
      : this.setState({loggedIn: false});
  /**
   * the render function that have the element inside
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom  NavBarStyle_navbar-expand-lg NavBarStyle_navbar-dark">
          <Link
            to="/welcomeUser"
            className="navbar-brand NavBarStyle_navbar-brand"
          >
            <img
              className="img-responsive oudLogo"
              src={logo}
              alt="Oud logo"
              data-testid="oudlogo"
              to="/welcomeUser"
            />
          </Link>
          <button
            data-testid="button"
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto nav-items NavBarStyle_nav-items font-weight-bold">
              <li className="nav-item">
                <Link data-testid="Premium" to="/premium" className="nav-link">
                  Premium
                </Link>
              </li>
              <li data-testid="Help" className="nav-item">
                <Link to="/help" className="nav-link">
                  Help
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  data-testid="Download"
                  to="/download"
                  className="nav-link"
                >
                  Download
                </Link>
              </li>
              <li className=" NavBarStyle_block nav-item">{'|'}</li>
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  to="/"
                >
                  <img
                    className="img-responsive"
                    src={mask}
                    alt="Profile Icon"
                    data-testid="profImage"
                  />
                  <span>&nbsp;&nbsp;</span>Profile
                </Link>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    data-testid="Account"
                    to="/overview"
                    class="dropdown-item"
                  >
                    Account
                  </Link>
                  <Link
                    data-testid="LogOut"
                    to="/welcomeGuest"
                    class="dropdown-item"
                    onClick={() => this.doLogOut()}
                  >
                    Log Out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div>{/* <NavbarRouter /> */}</div>
      </div>
    );
  }
}
export default Navbar;
