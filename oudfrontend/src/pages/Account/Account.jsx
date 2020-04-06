import React from "react";

import HiddenSideBar from "./../../components/Account/Components/HiddenSideBar/HiddenSideBar";
import MainContainer from "./../../components/Account/Components/MainContainer/MainContainer";

import "./Account.css";

/**
 * Footer
 * @type {Function}
 * @returns {HTMLElement} Dummy Footer
 */
function Footer() {
  return (
    <footer>
      <div className="Dummy">
        <h1>Dummy Footer</h1>
      </div>
    </footer>
  );
}

/**
 * Navigation Bar
 * @type {Function}
 * @returns {HTMLElement} Dummy Navigation Bar
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
 * @returns {HTMLElement} Account Component
 *
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
