import React from 'react';
import './playlist.css';
import Song from '../song/song'
import axios from 'axios';
class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tracks : [],
            recieved:false,
            numerOfSongs:0
        };
    }


    componentDidMount(){
         axios.get(`http://localhost:3000/tracks`)
        .then((response)=> {
            const tracks = response.data;
            this.setState({tracks:tracks});
            this.setState({recieved:true})
            this.setState({numberOfSongs:tracks.length})
            console.log(this.state.tracks);
        })
        .catch((error)=> {
            console.log(error);
        });
    }


    render(){
        return(
            <div className='playlist'>
                <div>
                    <div className='row'>
                        <div className='playlistHeader row col-xs-4 col-md-6 col-lg-4 col-xl-4'>
                            <div className='playlistImageContainer col col-lg-12 col-md-12 col-sm-4 col-xs-4'>
                                <img src={this.props.image} className='playlistImage' alt='play'/>
                                <div className='overlayer'>
                                   <h2>ahmed</h2> 
                                   <i class="fa fa-play-circle"></i>  {/*Not Working Favicon*/}
                                </div>
                            </div>            
                            <div className='playlistHeaderBody col col-lg-12 col-md-12 col-sm-8 col-xs-8'>
    
                                <div className='playlistHeaderBodyTop'>
                                    <h2 className='whiteText'>Today's Top Egyptian Hits</h2>
                                    <a className='playlistAnchor' href='www.facebook.com'>{this.props.Creator}Spotify</a>
                                </div>
                                
                                <div className='playlistHeaderBodyBottom'>
                                    <button className="playButton" variant="outline-success">
                                            PLAY
                                    </button>
                                    <p>{this.state.numberOfSongs} {this.state.numberOfSongs > 1? 'songs':'song'}</p>
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