import React, {Component} from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import './library.css'
import PropTypes from 'prop-types';

class Library extends Component{

render(){
    return(
        <div className="dummyParent">
            <Sidebar />
            <Navbar isLoggedIn={true} />
            <div className="myLibrary">
                <h1>ويجز الونش هيرفعكم كلكم بنش</h1>
            </div>
        </div>
    );
}
}

export default Library;