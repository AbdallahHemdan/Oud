import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/Logoc.png';
import './suggestedArtist.css';
/**
 * @class
 */
class SuggestedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', () => {
      const isTop = window.scrollY < 80;
      if (isTop !== true) {
        this.setState({scrolled: true});
      } else this.setState({scrolled: false});
    });
  };

  render() {
    return (
      <div className={`SuggNav ${this.state.scrolled ? 'navbarco' : ''}`}>
        <nav className=" navbar navbar-expand-lg  bg-custom NavBarStyle_bg-custom navtree">
          <div className="  navbar-nav ml-auto  font-weight-bold ">
            <div className="FText">
              <Link to="/welcome" className="navbar-brand ">
                <img
                  className={`img-responsive SuggLogo ${
                    this.state.scrolled ? 'hideLogo dis' : 'show'
                  }`}
                  src={logo}
                  alt="Oud logo"
                  data-testid="oudlogoNvaBarSugg"
                  id="oudlogo"
                />
              </Link>
              <p
                data-testid="TextNvaBarSugg"
                className={`CenterText  ${
                  this.state.scrolled ? 'textTop' : 'show'
                }`}
              >
                Let's get to know each other!
              </p>
              <p data-testid="TextNvaBarSugg" className="subText container">
                What are your favorite artists? The more you select, the better
                your recommendations!
              </p>
              {/* <form className="form-inline container">
                <input
                  className="form-control SearchInp"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default SuggestedNavBar;
