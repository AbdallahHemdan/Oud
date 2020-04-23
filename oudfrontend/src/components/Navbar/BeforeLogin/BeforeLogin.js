import React from 'react';
import { Link } from 'react-router-dom'

/**
 * Function to render rhe right part of the navbar if the use in guest mode (not logged in)
 * 
 * @function
 * 
 * @param {object} props 
 * 
 * @returns {JSX}
 */
function BeforeLogin(props) {
    return (
        <form
            className="form-inline my-2 my-lg-0"
            data-testid="before-login"
        >
            <Link
                to="/signin"
                className="signup-signin-link"
                data-testid="login-link"
            >
                <button
                    className="btn oud-btn my-2 my-sm-0 mr-3 login-signup-btn signin"
                    type="submit"
                    data-testid="login-btn"
                >
                    Sign in
                </button>
            </Link>
            <Link
                to="/signup"
                className="signup-signin-link"
                data-testid="signup-link"
            >
                <button
                    className="btn oud-btn my-2 my-sm-0 mr-3 login-signup-btn signup"
                    type="submit"
                    data-testid="signup-btn"
                >
                    Sign up
                </button>
            </Link>
        </form >
    )
}

export { BeforeLogin }