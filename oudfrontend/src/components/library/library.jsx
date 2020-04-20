import React, {Component} from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import {Link , Switch , Route} from 'react-router-dom'
import './library.css'
import PropTypes from 'prop-types';
import Albums from './components/albums/albums';
import { Playlists } from './components/playlists/playlists';
import { Auth } from '../../utils/auth';



class Library extends Component{
constructor(){
    super();
   /* if(Auth())
        console.log("Authnticated")
    else
        window.location = '/login'*/
}
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