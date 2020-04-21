import React from 'react';
import { Link, Redirect } from 'react-router-dom';
// import NavbarRouter from '../../../routes/NavbarRouter';
import logo from '../../../../assets/images/Logoc.png';
import '../../welcome.css';
/**nav bar if the user is not logged in */
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      redirect: false,
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  toUserHomepage = () => {
    if (this.state.redirect) {
      return <Redirect to="/welcome-user" />;
    }
  };
  /**
   * set the logged in to true
   * @function
   * @returns {void}
   */
  doLogIn = () => this.setState({ loggedIn: true });
  /**
   * set the logged in to true
   * @function
   * @returns {void}
   */
  doLogOut = () => this.setState({ loggedIn: false });
  /**
   * just to see what is the status that in the real time
   * @function
   * @returns {boolean}
   */
  handleStatus = () =>
    this.props.status
      ? this.setState({ loggedIn: true })
      : this.setState({ loggedIn: false });
  /**
   * the render function that have the element inside
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom NavBarStyle_bg-custom NavBarStyle_navbar-brand NavBarStyle_navbar-expand-lg">
          <Link to="/welcome-guest" className="navbar-brand">
            <img
              className="img-responsive oudLogo"
              src={logo}
              alt="Oud logo"
              data-testid="oudlogo"
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
            <ul className="navbar-nav ml-auto nav-items font-weight-bold NavBarStyle_nav-items">
              <li className="nav-item">
                <Link data-testid="Premium" to="/premium" className="nav-link">
                  Premium
                </Link>
              </li>
              <li className="nav-item">
                <Link data-testid="Help" to="/help" className="nav-link">
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
              <li className="block NavBarStyle_block nav-item">{'|'}</li>
              <li className="nav-item">
                <Link data-testid="SignUP" to="/signup" className="nav-link">
                  Sign up
                </Link>
              </li>
              {this.toUserHomepage()}
              <li className="nav-item">
                <Link
                  data-testid="Login"
                  onClick={this.setRedirect}
                  className="nav-link"
                  to="/signin"
                >
                  Log in
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
