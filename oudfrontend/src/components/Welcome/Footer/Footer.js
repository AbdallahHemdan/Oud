import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../../assets/images/Logoc.png';
import './../welcome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
/**
 * the footer function
 * @function
 * @returns {JSX}
 */
function Footer() {
  return (
    <div>
      <footer className="main-footer">
        <div className="footer-middle Ffooter-middle">
          <div className="container">
            <div className="row">
              {/* Column 1 */}
              <div className="col-md-3 col-sm-6">
                <Link to="/welcomeUser">
                  <img
                    data-testid="logoImage"
                    className="img-responsive img-resp "
                    src={logo}
                    alt="Oud logo"
                  />
                </Link>
              </div>
              {/* Column 2 */}
              <div className="col-md-3 col-sm-6">
                <h5
                  data-testid="Company"
                  className="font-weight-bold text-uppercase mt-3 mb-4"
                >
                  Company
                </h5>
                <ul className="list-unstyled ListMain hovergold ">
                  <li className="ListItem">
                    <Link data-testid="About" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="ListItem">
                    <Link data-testid="Features" to="/features">
                      Features
                    </Link>
                  </li>
                  <li className="ListItem">
                    <Link data-testid="Help" to="/help">
                      Help
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Column 3 */}
              <div className="col-md-3 col-sm-6">
                <h5
                  data-testid="Others"
                  className="font-weight-bold text-uppercase mt-3 mb-4"
                >
                  Others
                </h5>

                <ul className="list-unstyled ListMain hovergold">
                  <li className="ListItem">
                    <Link data-testid="Artists" to="/forartists">
                      For Artists
                    </Link>
                  </li>
                  <li className="ListItem">
                    <Link data-testid="contact_us" to="/contactus">
                      contact us
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Column 4 */}
              <div className="col-md-3 col-sm-6">
                <h5
                  data-testid="Links"
                  className="font-weight-bold text-uppercase mt-3 mb-4"
                >
                  Links
                </h5>

                <ul className="list-unstyled ListMain hovergold">
                  <li className="ListItem">
                    <Link data-testid="WePlayer" to="/">
                      Web Player
                    </Link>
                  </li>
                  <li className="ListItem">
                    <Link data-testid="MobileApp" to="/android">
                      Free Mobile App
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Column 5 */}
              <div className="col-md-3 col-sm-6 ml-auto">
                <ul className="list-unstyled ListMain list-inline text-center">
                  <li
                    data-testid="faFacebook"
                    className="list-inline-item fa-2x "
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </li>
                  <li
                    data-testid="faTwitter"
                    className="list-inline-item fa-2x"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </li>
                  <li
                    data-testid="faInstagram"
                    className="list-inline-item fa-2x"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </li>
                  <li
                    data-testid="faYoutube"
                    className="list-inline-item fa-2x"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </li>
                </ul>
              </div>
            </div>
            {/* Footer Bottom */}
            <div className="footer-bottom Ffooter-bottom">
              <p className="text-xs-center">
                &copy;{new Date().getFullYear()} Oud - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>

      <div></div>
    </div>
  );
}
export default Footer;
