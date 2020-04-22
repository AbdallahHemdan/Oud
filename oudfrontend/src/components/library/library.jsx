import React, {Component} from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import {Link , Switch , Route ,withRouter} from 'react-router-dom'
import './library.css'
import Albums from './components/albums/albums';
import { Playlists } from './components/playlists/playlists';
import { Auth } from '../../utils/auth';



class Library extends Component{
constructor(){
    super();
}
componentDidMount(){
    if(Auth())
    this.props.history.replace('/collection/albums')
    else
    window.location = '/login'
}
render(){
    if (Auth())
    {
        return(
       
            <div className=" myLibrary " data-testid='myLibrary'>
                <Sidebar />
                <Navbar isLoggedIn={true} />
                <div className=" upperContainer" >
                    <div  className = "library-links" data-testid='linkContainer'>
                        <Link to={'/collection/albums'} data-testid='libLink'> ALBUMS </Link>
                        <Link to={'/collection/playlists'} data-testid='libLink'> PLAYLISTS </Link>
                    </div>
                   
                </div>
                    <Switch>
                            <Route path='/collection/albums' component={Albums}/>
                            <Route path='/collection/playlists' component={Playlists}/>
                    </Switch>
            </div>
        );
    }
    return (<div></div>)
    
}
}

export default withRouter(Library);
