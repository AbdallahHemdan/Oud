import React, { Component} from 'react';
import './song.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios'
import PropTypes from 'prop-types';
import { getDefaultNormalizer } from '@testing-library/react';


/**
 * @classdesc this is a component that renders playlist page
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @param {string} key the Id of the playlist
 * @param {string} clickedId the Id of the clicked song
 * @param {func} handleClick  called when the user click on the song
 * @param {func} handlePlay called when the user click on the play button
 * 
 * @property {object} state carries the state of the component
 * @param {object} track song object
 * @property {boolean} state.hover true if the mouse is on the song false otherwise
 * @property {string} state.albumName name of the album
 * @property {object} state.playlist carries all the information of the playlist
 * @property {Array.<track>} state.tracks array of all the songs in the playlist
 * @property {boolean} state.playing true when the song is playing. Otherwise, it is false
 * @property {boolean} state.queued true when the song is added to queue. Otherwise, it is false
 * @property {boolean} state.cliked true when the song is focused
 * @property {boolean} state.displayDropdown true when the song optopns are visible
 * @property {boolean} state.saved true when the song is saved to likedSongs
 * 
 * @returns {
 *              <div>
 *               <div classname="playlistHeader">
 *                  <div classname="imageContainer">
 *                      <img/>
 *                  </div>
 * 
 *                  <div classname="playlistHeaderBody">
 *                      <HeaderBodyTop/>
 *                      <HeaderBodyBottom/>
 *                  </div>
 *                  <SongList/>
 *               </div>
 *              </div>
 *          
 *          }
 */
class Song extends Component{
    /**
     * 
     * @constructor 
     */
    constructor(props){
        super(props);
        this.state={
            hover : false,
            track:this.props.track,
            albumName:'',
            playing:false,
            displayDropdown:false,
            saved:false,
            queued:false,
            clicked:false
        };
    }
    /**
     * sets state.hover to true and called onMouseEnter
     * @returns {void}
     */
    hover = ()=> this.setState({hover : true});
    /**
     * sets state.hover to false and called onMouseLeave
     * @returns {void}
     */
    notHover = ()=> this.setState({hover:false});
    /**
     *gets the name of the album of the song
     * @returns {void}
     */
    componentDidMount(){
        axios.get(`http://localhost:3000/albums/${this.state.track.albumId}/`)
        .then((response)=> {
            const albumName = response.data.name
            this.setState({albumName:albumName})
        })
        .catch((error)=> {
            console.log(error);
        }); 
    }
    /**
     *if the recieved props is changed it sets state.clicked to true or 
     *false and calls hh() 
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.clickedId !== this.props.clickedId){
            this.setState({clicked:(nextProps.clickedId === this.props.track.id)?true:false})    
            this.hh();
        }  
    }
    /**
     * called when the play button of the song is clicked and it calls the passed function from parent
     * @param {void} 
     */
    playSongClicked(){

        this.props.handlePlay(this.state.track.id)
    }
    /**
     * saves the song to liked songs
     * @param {void} 
     */
    handleSaving(){
        this.toggleDropdown()
        if(this.state.saved === false){
            axios.post('http://localhost:3000/likedSongs/',this.state.track)
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({saved:true})

        }
        else{
            axios.delete(`http://localhost:3000/likedSongs/${this.state.track.id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({saved:false})

        }
    }
    /**
     * Adds the song to the queue
     * @param {void} 
     */
    handleQueue(){
        this.toggleDropdown()
        if(this.state.queued === false){
            axios.post('http://localhost:3000/queue/',this.state.track)
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({queued:true})

        }
        else{
            axios.delete(`http://localhost:3000/queue/${this.state.track.id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({queued:false})

        }
    }
    /**
     * called when state.clicked changes
     * it sets state.displayDropdown to false if clicked is true
     * @param {void} 
     */
    hh(){
        if(this.state.clicked === true)
        {
            this.setState({displayDropdown:false})
        }
    }
    /**
     * called when the options button is clicked to toggle state.displayDropdown
     * @param {void} 
     */
    toggleDropdown(){
        this.setState({displayDropdown:!this.state.displayDropdown})
        console.log("click -->" + this.state.clicked)
        console.log("display -->" + this.state.displayDropdown)

    }
    render(){
        var date = new Date();
        return(
            <Router>
                <button onClick={()=>{this.props.handleClick(this.state.track.id)}} data-testId='song' className="song row" id='song' onMouseEnter={this.hover} onMouseLeave={this.notHover}>
                    
                        <div className='songIcon col-1'>
                            <button data-testId='playButton' className='songButton' onClick={this.playSongClicked.bind(this)}>
                            <img data-testId='playButtonImage' src={(this.state.hover||this.state.clicked)? require('./play.png'):require('./musicIcon.png')}
                             width='12' height='14' 
                             alt='play music icon'/>
                             </button>
                        </div>

                        <div className='songInfo col-8'>    
                            <span data-testId='songName' className='whiteText'>{this.state.track.name}</span>
                            <p data-testId='aristsNames'>
                        <span>{
                            this.state.track.artists.map((artist)=>{
                                return(<span key={date.getTime()}>
                                    <Link data-testId='artistName' to={`/artist/${artist.id}`} className='playlistAnchor'>{artist.name}</Link>
                                    <span data-testId='comma'>, </span>
                                    </span>
                                    );
                                })}

                            </span>
                            <Link data-testId='albumName' to={`/albums/${this.state.track.albumId}`}className='playlistAnchor'>{this.state.albumName}</Link>
                            </p>
                        </div>

                        <div  className='col-1'>
                            
                                <div data-testId='dropdown' className="dropdown">
                                    <button 
                                        data-testId='dropdownButton'
                                        onClick={this.toggleDropdown.bind(this)}
                                        className="songButton" 
                                        id='songDropdownButton'>
                                        <h3 className='whiteText' 
                                        style={(this.state.hover||this.state.clicked)?{display:'block'}:{display:'none'}}>
                                        ...</h3>
                                     </button>

                                    <div
                                        data-testId='dropdownList' 
                                        style={this.state.displayDropdown && this.state.clicked?{display: "block"}:{display: 'none'}}
                                        className="dropdownContent" id="dropdownContent">

                                        <Link data-testId='dropdownItem' onClick={this.handleSaving.bind(this)} className="SongDropdownItem">
                                        {this.state.saved?'Remove From Your Liked Songs':'Save to your Liked Songs'}</Link>

                                        <Link data-testId='dropdownItem' onClick={this.handleQueue.bind(this)}
                                        className="SongDropdownItem">
                                        {this.state.queued?'Remove From Queue':'Add to Queue'}</Link>

                                        <Link data-testId='dropdownItem' className="SongDropdownItem">Add to Playlist</Link>
                                    </div>
                                </div> 
                        </div>

                        <div className='col-2'>
                            <p data-testId='songTime' className='whiteText'>{this.state.track.songTime}3:34</p>
                        </div>
                    </button>
            </Router>

        );
    }
}
Song.propTypes = {
    clickedId: PropTypes.string,
    handleClick:PropTypes.func,
    handlePlay: PropTypes.func,
    track: PropTypes.object
}
export default Song;