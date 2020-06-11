import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Oud from '../../assets/images/Logoc.png';
import '../../components/Login&Signup/signup/signup.css';
/** header class of the sign up 
 * @author abdallah abu sedo
*/
class MainBrand extends Component {
  /**
   * here i render the logo and the name of my website
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <div className="NavBarStyle">
        <div className="main-brand mainBrand barsection">
          <Link className="navbar navbar-dark bg-dark" to="/welcome">
            <img
              id="OudImage"
              data-testid="OudImage"
              src={Oud}
              className="d-inline-block align-top OudImage"
              alt="logo imag"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default MainBrand;
