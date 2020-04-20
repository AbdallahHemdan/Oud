import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {base} from "../../../config/environment"
import {config} from "../../../utils/auth"
/**
 * this is a component that renders the Top of the body of playlists, albums, likedSongs
 * on clicking the name of the owner it takes you to his/her profile
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @func
 * @param {string} title the title of playlists, albums
 * @param {string} owner the Id of the owner of playlists or albums. It is used to fetch his/her name from the database
 * 
 * @returns {
 *              <Router>
 *               <div>
 *                  <h2></h2>
 *                  <span></span>
 *                  <Link></Link> "A react router component"
 *               </div>
 *          </Router>
 *          }
 */
class HeaderBodyTop extends Component{
    constructor(props){
        super(props)
        this.state={
            ownerName:'', 
            redirect:null
        }
    }
    /**
     * ownerName is a state that carries the name of the owner of the playlist or album
     * @constant
     * @type {string}
     */
    /**
     * fetching the owner name and setting state
     */
    componentWillReceiveProps(nextProps){
        const owner = nextProps.owner
    axios.get(`${base}/users/`+owner, config)
        .then((response) => {
            const user = response.data;
            this.setState({ownerName:user.displayName});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    redirect(route){
        this.setState({redirect:route})
    }
render(){
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />;
      }
    return (
        
        <div data-testid="HeaderBodyTop" className='playlistHeaderBodyTop'>
            <h2 data-testid="title" className='gray-text'>{this.props.title}</h2>
            <span data-testid="credits" className="whiteText">By </span>
            <button data-testid="owner" className='playlistAnchor songButton' >{this.state.ownerName}</button>
        </div>
    );
}
}
HeaderBodyTop.propTypes = {
    title: PropTypes.string,
    owner: PropTypes.string
}

export default HeaderBodyTop;
