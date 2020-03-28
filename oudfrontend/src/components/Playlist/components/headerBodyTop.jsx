import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {BrowserRouter as Router,Link} from "react-router-dom";

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
function HeaderBodyTop(props)
{
    /**
     * ownerName is a state that carries the name of the owner of the playlist or album
     * @constant
     * @type {string}
     */
    const [ownerName, setOwnerName] = useState('')
    const {title, owner} = props;
    /**
     * fetching the owner name and setting state
     */
    const url = `http://localhost:3000/user/${owner}`; 
         axios.get(`${url}`)
        .then((response)=> {
            const user = response.data;
            setOwnerName(user.displayName);
            console.log(ownerName);
        })
        .catch((error)=> {
            console.log(error);
        });  
    return(
        <Router>
            <div data-testid="HeaderBodyTop" className='playlistHeaderBodyTop'>
                <h2 data-testid="title" className='whiteText'>{title}</h2>
                <span data-testid="credits" className="whiteText">Crerated By </span>
                <Link to={`/user/${owner}`} data-testid="owner" className='playlistAnchor'>{ownerName}</Link>
            </div>
        </Router>
    );
}

HeaderBodyTop.propTypes = {
    title: PropTypes.string,
    owner: PropTypes.string
}

export default HeaderBodyTop;