import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
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
            redirect:null
        }
        this.redirect = this.redirect.bind(this)
    }
    /**
     * ownerName is a state that carries the name of the owner of the playlist or album
     * @constant
     * @type {string}
     */
    
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
            <button data-testid="owner" className='playlistAnchor songButton' onClick={()=>this.redirect(`/profile/${this.props.ownerId}`)}>{this.props.owner}</button>
        </div>
    );
}
}
HeaderBodyTop.propTypes = {
    title: PropTypes.string,
    owner: PropTypes.string
}

export default HeaderBodyTop;
