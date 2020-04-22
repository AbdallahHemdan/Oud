import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/Logoc.png';
import './suggestedArtist.css';

class SuggestedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="SuggNav ">
        <nav className=" navbar navbar-expand-lg  bg-custom NavBarStyle_bg-custom navtree">
          <div className="  navbar-nav ml-auto  font-weight-bold ">
            <div className="FText ">
              <Link to="/welcome" className="navbar-brand ">
                <img
                  className="img-responsive SuggLogo"
                  src={logo}
                  alt="Oud logo"
                  data-testid="oudlogo"
                />
              </Link>
              <p className="CenterText">Let's get to know each other!</p>
              <p className="subText container">
                What are your favorite artists? The more you select, the better
                your recommendations!
              </p>
              <form class="form-inline container">
                <input
                  class="form-control SearchInp"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default SuggestedNavBar;
