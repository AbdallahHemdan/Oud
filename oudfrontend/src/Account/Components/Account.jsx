import React from "react";

import HiddenSideBar from "./HiddenSideBar";
import MainContainer from "./MainContainer";

import "../CssFiles/Account.css";

function Footer() {
  return (
    <footer>
      <div className="Dummy">
        <h1>Dummy Footer</h1>
      </div>
    </footer>
  );
}

function NavBar() {
  return (
    <header>
      <div className="Dummy">
        <h2>Dummy NavBar</h2>
      </div>
    </header>
  );
}

function Account() {
  return (
    <div className="account">
      <NavBar />
      <HiddenSideBar />
      <MainContainer />
      <Footer />
    </div>
  );
}
export default Account;
