import React from 'react';
import axios from 'axios';
import HeaderBodyBottom from '../commonComponents/headerBodyBottom'
import HeaderBodyTop from './components/headerBodyTop'
import SongList from '../commonComponents/songList'
import PropTypes from 'prop-types';



/**
 * @classdesc this is a component that renders album page
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @param {string} id the Id of the album
 * @property {object} state carries the state of the component
 * @property {boolean} state.recived true if the data of the album is fetched correctly false otherwise
 * @property {boolean} state.liked true if the album is liked by the user (i.e the album is in the likedAlbums table in the database)
 * @property {object} state.album carries all the information of the album
 * @property {Array.<track>} state.tracks array of all the songs in the album
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
class Album extends React.Component{

    /** 
     * @constructor
     */ 
    constructor(props){
        super(props);
        this.state = {
            tracks : [],
            artists : [],
            recieved:false,
            album:{},
            liked:false,
            playing:false,
            queued:false,
            
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
            axios.post('http://localhost:3000/player/pause/',)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        if(this.state.playing === true){
            axios.post('http://localhost:3000/player/play/',)
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
    likeButtonClicked(){
        const likedAlbum = this.state.album
        if(this.state.liked === false){
            this.setState({liked:true})
            axios.post('http://localhost:3000/likedAlbums/', likedAlbum)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            this.setState({liked:false})

            axios.delete(`http://localhost:3000/likedAlbums/${this.props.id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }
    /**
     * It fetches the data of the album from the database and checks if it exists in the likedAlbums table
     * @func
     * @returns {void}
     */
    componentDidMount(){
        axios.get(`http://localhost:3000/albums/${this.props.id}`)
        .then((response)=> {
            const album = response.data;
            this.setState({tracks:album.tracks.items});
            this.setState({artists:album.artists})
            this.setState({album:album})   
            this.setState({recieved:true})

        })
        .catch((error)=> {
            console.log(error);
        });  
        
        axios.get(`http://localhost:3000/likedAlbums/${this.props.id}`)
        .then((response)=> {
            console.log(response);
            this.setState({liked:true})
        })
        .catch((error)=> {
            console.log(error);
        });
    }
    render(){
        return(
            <div data-testid='playlist' className='playlist'>
                
                <div className='row'>
                    <div data-testid="playlistHeader" className='playlistHeader row col-xs-4 col-md-6 col-lg-4 col-xl-4'>
                        <div data-testid="playlistIamgeContainer" className='playlistImageContainer col col-lg-12 col-md-12 col-sm-4 col-xs-4'>
                            <img data-testid="playlistIamge" src={this.state.album.image} className='playlistImage' alt='album img'/>
                        </div>            
                        <div data-testid="playlistHeaderBody" className='playlistHeaderBody col col-lg-12 col-md-12 col-sm-8 col-xs-8'>
                            <HeaderBodyTop 
                                data-testid="HeaderBodyTop"
                                title={this.state.album.name}
                                artists={this.state.artists}
                              />
                              
                            <HeaderBodyBottom 
                                data-testid = "HeaderBodyBottom" 
                                length = {this.state.tracks.length} 
                                playClicked = {this.playButtonClicked.bind(this)}
                                likeClicked = {this.likeButtonClicked.bind(this)}
                                liked = {this.state.liked}
                                playing = {this.state.playing}
                                releaseDate = {this.state.album.release_date}
                                recieved = {this.state.recieved}
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
Album.propTypes={
    id : PropTypes.string
};
export default Album;