import React from 'react';
import { Link } from 'react-router-dom'


function BeforeLogin(props) {
    return (
        <form className="form-inline my-2 my-lg-0" >
            <button
                className="btn oud-btn my-2 my-sm-0 mr-3 login-signup-btn signin"
                type="submit"
            >
                <Link to="/signin" className="signup-signin-link">Sign in</Link>
            </button>
            <button
                className="btn oud-btn my-2 my-sm-0 mr-3 login-signup-btn signup"
                type="submit"
            >
                <Link to="/signup" className="signup-signin-link">Sign up</Link>
            </button>
        </form>
    )
}

function AfterLogin(props) {
    return (<form className="form-inline my-2 my-lg-0">
        <button
            className="btn oud-btn my-2 my-sm-0 mr-3 upgrade"
            type="submit"
        >
            <Link to="/signin" className="signup-signin-link upgrade">UPGRADE</Link>
        </button>
        <div className="dropdown show droppy">
            <a href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img
                    src="https://avatars0.githubusercontent.com/u/40190772?s=400&u=292f4666b670438f7e38da19371cfe4292bde577&v=4"
                    className="profile"
                    alt="user"
                />
            </a>
            <div className="dropdown-menu dropdown-me" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item element" to="/account">Account</Link>
                <Link className="dropdown-item element" to="logout">Log out</Link>
            </div>
        </div>
        <h1 className="username">Hemdan</h1>
    </form>
    )
}

export { BeforeLogin, AfterLogin }