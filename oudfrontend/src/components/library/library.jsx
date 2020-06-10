import React, {Component} from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import {Link , Switch , Route ,withRouter} from 'react-router-dom'
import './library.css'
import Albums from './components/albums/albums';
import { Playlists } from './components/playlists/playlists';
import { Auth } from '../../utils/auth';

/**
 * @classdesc this is a component that renders libray page
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @property {object} state carries the state of the component
 * @property {int} state.signedIn it is null when the user is not signed in. Otherwise, it carries the decode id 
 * @returns {
*              <div>
*               <Sidebar />
*               <Navbar/>
*               <div>
*                   <div  className = "library-links" >
*                       <Link to={'/collection/albums'}> ALBUMS </Link>
*                       <Link to={'/collection/playlists'}> PLAYLISTS </Link>
*                   </div>
*                  
*               </div>
*                   <Switch>
*                           <Route path='/collection/albums' component={Albums}/>
*                           <Route path='/collection/playlists' component={Playlists}/>
*                   </Switch>
 *           </div>
 *          }
 */

class Library extends Component{
constructor(){
    super();
    this.state={
        signedIn:Auth()
    }
}
componentDidMount(){
    if(Auth()){
    this.props.history.replace('/collection/albums')
    }
    else
    window.location = '/login'
}
render(){
    if(this.state.signedIn)
        {
        return(
            
            <div className="myLibrary" data-testid='myLibrary'>
                <Sidebar />
                <Navbar isLoggedIn={true} />
                <div className="upperContainer" >
                    <div  className = "library-links" data-testid='linkContainer'>
                        <Link to={'/collection/albums'} data-testid='albumLink'> ALBUMS </Link>
                        <Link to={'/collection/playlists'} data-testid='playlistLink'> PLAYLISTS </Link>
                    </div>
                   
                </div>
                    <Switch data-testid='links'>
                            <Route path='/collection/albums' component={Albums} data-testid='Albums'/>
                            <Route path='/collection/playlists' component={Playlists} data-testid='playlists'/>
                    </Switch>
            </div>
        );
        }
}
}

export default withRouter(Library);
