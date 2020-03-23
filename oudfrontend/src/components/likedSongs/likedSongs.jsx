import React from 'react';
import './playlist.css';
import Song from '../song/song'
import axios from 'axios';
class LikedSongs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tracks : [],
            recieved:false,
            playlist:{}
            
        };
        
    }


    componentDidMount(){
        const url = `http://localhost:3000/${this.props.id.id}`; 
         axios.get(`${url}`)
        .then((response)=> {
            const playlist = response.data;
            this.setState({tracks:playlist.tracks});
            this.setState({recieved:true})
            this.setState({playlist:playlist})
            console.log(this.props.id);
        })
        .catch((error)=> {
            console.log(error);
            console.log(this.props.id);

        });


        
    }


    render(){
        return(
            <div className='playlist'>
                <div>
                    <div className='row'>
                        <div className='playlistHeader row col-xs-4 col-md-6 col-lg-4 col-xl-4'>
                            <div className='playlistImageContainer col col-lg-12 col-md-12 col-sm-4 col-xs-4'>
                                <img src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' className='playlistImage' alt='playlist img'/>
                                <div className='overlayer'>
                                    
                                   <i className="fa fa-play-circle"></i>  {/*Not Working Favicon*/}
                                </div>
                            </div>            
                            <div className='playlistHeaderBody col col-lg-12 col-md-12 col-sm-8 col-xs-8'>
    
                                <div className='playlistHeaderBodyTop'>
                                    <h2 className='whiteText'>Today's Top Egyptian Hits</h2>
                                    <a className='playlistAnchor' href='www.facebook.com'>{this.state.playlist.owner}</a>
                                </div>
                                
                                <div className='playlistHeaderBodyBottom'>
                                    <button className="playButton" variant="outline-success">
                                            PLAY
                                    </button>
                                    <p>{this.state.tracks.length} {this.state.tracks.length > 1? 'songs':'song'}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-8 col-md-6 col-lg-8 col-xl-8'>
                            {this.state.recieved?
                                
                                this.state.tracks.map((track) => {
                                return(
                                        <Song
                                            track={track}
                                        />
                                    );
                                }):<h1>LOADING</h1>
                            }
                                
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Playlist;