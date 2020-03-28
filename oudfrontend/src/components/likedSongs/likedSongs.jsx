import React from 'react';
import SongList from '../songList/songList'
import HeaderBody from './components/headerBody'
import axios from 'axios';
import './likedSongs.css'

class LikedSongs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tracks : [],
            recieved:false,
            items:[],
            playing:false,
            queued:false
        };
    }
    /**
     * Called Whenever the user clicked on the PLAY button and it adds all the songs of the playlist to the queue by a post request
     * @func
     * @returns {void}
     */
    playButtonClicked(){
        //all the three requests should be put requests
        this.setState({playing:!this.state.playing})
        if(this.state.queued === false){
            this.setState({queued:true});
            const tracks = this.state.tracks
            const length = this.state.tracks.length
            axios.post('http://localhost:3000/queue/', {
                tracks : tracks,
                total : length
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        if(this.state.playing === false){
            axios.post('http://localhost:3000/player/pause',)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        if(this.state.playing === true){
            axios.post('http://localhost:3000/player/play',)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

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
    

    render(){
        return(
            <div data-testid='likedSongs' className='playlist'>
                
                <div className='row'>
                    <div data-testid="playlistHeader" className='playlistHeader row col-xs-4 col-md-6 col-lg-4 col-xl-4'>
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
                        className="col-xs-8 col-md-6 col-lg-8 col-xl-8"
                    />
                    
                </div>
            </div>
        );
    }
}
export default LikedSongs;