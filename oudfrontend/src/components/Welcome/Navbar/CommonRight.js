import React, { Component } from "react";
import { Link } from "react-router-dom";

class CommonRight extends Component {
  render() {
    return (
      <React.Fragment>
        <li className="nav-item">
          <Link data-testid="Premium" to="/goPremium" className="nav-link">
            Premium
          </Link>
        </li>
        <li className="nav-item">
          <Link data-testid="Help" to="/help" className="nav-link">
            Help
          </Link>
        </li>
      </React.Fragment>
    );
  }
}

export default CommonRight;
