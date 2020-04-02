import React from 'react';
import SongList from '../commonComponents/songList'
import HeaderBody from './components/headerBody'
import axios from 'axios';
import './likedSongs.css'
import {resume, pause, addToQueue} from '../commonComponents/utils'

/**
 * @classdesc this is a component that renders likedSongs page
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @property {object} state carries the state of the component
 * @property {boolean} state.recived true if the data of the playlist is fetched correctly false otherwise
 * @property {object} state.items carries all the information of the playlist
 * @property {Array.<track>} state.tracks array of all the songs in the playlist
 * @property {boolean} playing true when the playist is playing. Otherwise, it is false
 * @property {boolean} queued true when the playist is added to queue. Otherwise, it is false
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

class LikedSongs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tracks : [],
            recieved:false,
            items:[],
            playing:false,
            queued:false,
            clickID:'0'
        };
        this.addToQueue = this.addToQueue.bind(this)
        this.resume = this.resume.bind(this)
        this.pause = this.pause.bind(this)
        this.playButtonClicked = this.playButtonClicked.bind(this)
    }
    /**
     * Called Whenever the user clicked on the PLAY button and it adds all the songs of the playlist to the queue by a post request
     * @func
     * @returns {void}
     */

    addToQueue(tracks, length){
        this.setState({queued:true})
        addToQueue(tracks, length)
        this.resume()
    }
    playButtonClicked(){
        //all the three requests should be put requests
        if(this.state.queued === false){
            const tracks = this.state.tracks
            const length = this.state.tracks.length
            this.addToQueue(tracks, length)
        }
        if(this.state.playing === true){
            this.pause()
        }
        else{
            this.resume();
        }
    }
    pause(){
        pause()
        this.setState({playing:false})
    }
    resume(){
        resume()
        this.setState({playing:true})
    }

    /**
     * Called Whenever the user clicked on the like button and it adds the playlist to the likedPlaylists 
     * if it is not already there otherwise it removes it from there by a delete request
     * @func
     * @returns {void}
     */
    
    /**
     * It fetches the data of the playlist from the database and checks if it exists in the likedPlaylists table
     * @func
     * @returns {void}
     */
    componentDidMount(){
        axios.get(`http://localhost:3000/likedSongs/`)
        .then((response)=> {
            const items = response.data.items;
            this.setState({recieved:true})
            this.setState({items:items})   
            this.destructuring(items);
            console.log(items)
        })
        .catch((error)=> {
            console.log(error);
        }); 
    }
    destructuring(items){
        var tracks =[]
        items.map((item)=>{
            tracks.push(item.track);
        })
        console.log(tracks)
        this.setState({tracks:tracks})
    }
    markAllUnclicked(){
        this.setState({clickID:'0'})

    }

    render(){
        return(
            <div data-testid='likedSongs' className='playlist'>
                
                <div className='row'>
                    <div onClick={this.markAllUnclicked.bind(this)} data-testid="playlistHeader" className='playlistHeader row col-xs-4 col-md-6 col-lg-4 col-xl-4'>
                        <div data-testid="playlistIamgeContainer" className='playlistImageContainer col col-lg-12 col-md-12 col-sm-4 col-xs-4'>
                            <img 
                            data-testid="playlistIamge" 
                            src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' 
                            className='playlistImage' 
                            alt='playlist img'/>
                        </div>            
                        <div data-testid="playlistHeaderBody" className='playlistHeaderBody col col-lg-12 col-md-12 col-sm-8 col-xs-8'>
                      
                            <HeaderBody 
                                data-testid = "HeaderBodyBottom" 
                                length = {this.state.tracks.length} 
                                playClicked = {this.playButtonClicked.bind(this)}
                                playing = {this.state.playing}
                            />
                        </div>
                    </div>  
                    <SongList 
                        data-testid="songList"
                        recieved = {this.state.recieved}
                        tracks={this.state.tracks} 
                        pause = {this.pause}
                        resume = {this.resume}
                        addToQueue = {this.addToQueue}
                        clickedItemId = {this.state.clickID}
                        className="col-xs-8 col-md-6 col-lg-8 col-xl-8"
                    />
                    
                </div>
            </div>
        );
    }
}
export default LikedSongs;