import React, {Component} from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import {Link , Switch , Route} from 'react-router-dom'
import './library.css'
import PropTypes from 'prop-types';
import Albums from './components/albums/albums';
import { Playlists } from './components/playlists/playlists';




class Library extends Component{

render(){
    return(
       
        <div className=" myLibrary ">
            <Sidebar />
            <Navbar isLoggedIn={true} />
            <div className=" upperContainer">
                <div  className = "library-links">
                    <Link to={'/collection/albums'}> ALBUMS </Link>
                    <Link to={'/collection/playlists'}> PLAYLISTS </Link>
                </div>
               
            </div>
                <Switch>
                        <Route path='/collection/albums' component={Albums}/>
                        <Route path='/collection/playlists' component={Playlists}/>
                </Switch>
        </div>
    );
}
}

export default Library;