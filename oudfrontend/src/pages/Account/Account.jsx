import React from "react";
import HiddenSideBar from "./../../components/Account/Components/HiddenSideBar/HiddenSideBar";
import MainContainer from "./../../components/Account/Components/MainContainer/MainContainer";
import Footer from './../../components/Welcome/welcome_false/Footer/Footer';
import { isLoggedIn } from "./../../utils/auth"

import "./Account.css";

/**
 * Footer
 * @type {Function}
 * @returns {jsx} Dummy Footer
 * <Footer/>
 * TODO : change this to the real one when they merge it
 *
 */


/**
 * Navigation Bar
 * @type {Function}
 * @returns {jsx} Dummy Navigation Bar
 * <NaveBar/>
 * TODO : change this to the real one when they merge it
 */

function NavBar() {
  return (
    <header>
      <div className="Dummy">
        <h2>Dummy NavBar</h2>
      </div>
    </header>
  );
}

/**
 * this is the account and this renders NavBar , Hidden sideBar , MainContainer , Footer
 * @type {Function}
 * @returns {jsx} Account Component
 * <Account/>
 */
/*do not forget to handel hiddenSidebar*/
function Account() {
  return (
    <div className="account" data-test="Account">
      <NavBar data-test="NavBar" />
      <HiddenSideBar data-test="HiddenSideBar" />
      <MainContainer data-test="MainContainer" />
      <Footer data-test="Footer" />
    </div>
  );
}

export default Account;
