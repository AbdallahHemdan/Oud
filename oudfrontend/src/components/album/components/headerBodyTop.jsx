import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from "react-router-dom";

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
function  HeaderBodyTop(props)
{
        const title = props.title
        var artists= Array.isArray(props.artists)?props.artists:[]
        let history = useHistory()
        let flag = false
        function withComma(artist){
            return(
            <span>, <button
             data-testid="artist" 
             onClick={()=>{history.push(`/artist/${artist.id}`)}}
             className='playlistAnchor songButton'>{artist.name}</button></span>
            );}
        function withoutComma(artist){
            flag= true;
            return(<span><button
             onClick={()=>{history.push(`/artist/${artist.id}`)}}
             data-testid="artist"
              className='playlistAnchor songButton'>{artist.name}</button></span>
            );}
        
        return(
            <div data-testid="HeaderBodyTop" className='playlistHeaderBodyTop'>
                <h2 data-testid="title" className='gray-text'>{title}</h2>
                <span data-testid="credits" className="whiteText">By </span>
                {
                    artists.map((artist)=>{
                        return(
                        flag ? withComma(artist):withoutComma(artist)
                        )}
                        )}
            </div>
        );
    //}
}

HeaderBodyTop.propTypes = {
    title: PropTypes.string,
    artists:PropTypes.array
}

export default HeaderBodyTop;
