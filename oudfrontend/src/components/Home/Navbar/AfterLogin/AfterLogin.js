import React from 'react';
import { Link } from 'react-router-dom'


/**
 * Function to render the right part of the navbar if the user is logged in
 * 
 * @function
 * 
 * @param {object} props
 * 
 * @returns {JSX}
 * 
 */
function AfterLogin(props) {
    return (
        <form
            className="form-inline my-2 my-lg-0"
            data-testid="after-login"
        >
            <button
                className="btn oud-btn my-2 my-sm-0 mr-3 upgrade"
                type="submit"
                data-testid="upgrade-btn"
            >
                <Link
                    to="/signin"
                    className="signup-signin-link upgrade"
                    data-testid="upgrade-link"
                >
                    UPGRADE
                </Link>
            </button>
            <div className="dropdown show droppy"
                data-testid="dropdown-wrapper"
            >
                <a href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    data-testid="profile-dropdown-link"
                >
                    <img
                        src="https://avatars0.githubusercontent.com/u/40190772?s=400&u=292f4666b670438f7e38da19371cfe4292bde577&v=4"
                        className="profile"
                        alt="user"
                        data-testid="profile-img"
                    />
                </a>
                <div className="dropdown-menu dropdown-me" aria-labelledby="dropdownMenuLink"
                    data-testid="profile-dropdown">
                    <Link
                        className="dropdown-item element"
                        to="/account"
                        data-testid="account-dropdown-element"
                    >Account</Link>
                    <Link
                        className="dropdown-item element"
                        to="logout"
                        data-testid="logout-dropdown-element"
                    >Log out</Link>
                </div>
            </div>
            <h1 className="username" data-testid="username">Hemdan</h1>
        </form>
    )
}

export { AfterLogin }