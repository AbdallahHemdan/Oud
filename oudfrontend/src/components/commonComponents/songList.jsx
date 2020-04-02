import React, {useState, Component} from 'react';
import Song from '../song/song'
import PropTypes from 'prop-types';
import axios from 'axios'
/**
 * this is a component that renders the list of songs in playlists, albums, likedSongs or a "loading" animation if the songs are not recieved
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @func
 * @param {boolean} recieved the number of songs in the playlists, albums, likedSongs
 * @param {object} track song object
 * @param {string} track._id track id
 * @param {string} track.name track title
 * @param {string} track.albumId the id of the track's album
 * @param {string} track.type the type of music that the track belongs to
 * @param {string} track.audioUrl the URL of the track
 * @param {string} artist._id the Id of the singer
 * @param {string} artist.name name of the singer
 * @param {string} artist.type the type of music that the artist produces
 * @param {string} artist.image Image of the artist
 * @param {Array.<artist>} track.artists the artists that produced the track
 * @param {Array.<track>} tracks array of songs to be rendered
 * @returns {
 *              <div>
 *                  <Song></Song>
 *                  .
 *                  .
 *                  .              number of songs in the tracks array
 *                  .
 *                  .
 *              </div>
 *          }
 */


class SongList extends Component{
    constructor(props){
        super(props)
        this.state = {
            clickedItemId: '0',
            playing:false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.handleQueue = this.handleQueue.bind(this)
    }
    //const {recieved, tracks} = props;
   // const [clickedItemId, setClickedItemId] = useState('0');
    handleClick(id){
        this.setState({clickedItemId:id})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.clickedItemId !== this.state.clickedItemId){
            this.setState({clickedItemId:nextProps.clickedItemId})
        }
    }
    handleQueue(id){
        let flag = false
        let queue = []
        for(let i=0; i<this.props.tracks.length; i++){
            if(flag || this.props.tracks[i].id === id){
                flag = true
                queue.push(this.props.tracks[i])
            }
        }
        this.props.addToQueue(queue, queue.length)
    }
    handlePlay(id){
        let playingId;
        axios.get('http://localhost:3000/player/currently-playing')
        .then((response)=>{
            playingId = response.data.item.id
        })
        .catch((error)=> {
            console.log(error);
        });
        if(id === playingId){
            this.setState({playing:!this.state.playing})
            if(this.state.playing === true){
                this.props.play()
            }
            else{
                this.props.pause()
            }
        
        }
        else{
            this.handleQueue(id)
        }
        
    }

    render(){
    return(
        <div data-testid="songsList" className='col-xs-8 col-md-6 col-lg-8 col-xl-8'>
            {this.props.recieved?
                this.props.tracks.map((track) => {
                    return(
                     <Song data-testid='songElement'
                     key = {track.id} track={track}
                     clickedId = {this.state.clickedItemId} 
                     handleClick={this.handleClick}
                     handlePlay = {this.handlePlay}    
                     />);})
                :<h1 data-testid='loading'>LOADING ...</h1>
            }
                
        </div>
    );
        }
}
SongList.propTypes={
    recieved : PropTypes.bool,
    tracks : PropTypes.array
}
export default SongList;