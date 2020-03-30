import React, { Component} from 'react';
import './song.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios'
class Song extends Component{
    
    constructor(props){
        super(props);
        this.state={
            hover : false,
            track:this.props.track,
            albumName:'',
            playing:false
        };
    }

    hover = ()=> this.setState({hover : true});
    notHover = ()=> this.setState({hover:false});

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
    playSongClicked(){
        if(this.state.playing === true){
            axios.post('http://localhost:3000/player/pause/',)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({playing:false})
        }
        else{

        }
    }
    render(){
        
        return(
            <Router>
                <div className="song row" id='song' onMouseEnter={this.hover} onMouseLeave={this.notHover}>
                    
                        <div  className='songIcon col-1'>
                            <button className='songButton' onClick={this.playSongClicked}>
                            <img src={this.state.hover? require('./play.png'):require('./musicIcon.png')}
                             width='12' height='14' 
                             alt='play music icon'/>
                             </button>
                        </div>

                        <div className='songInfo col-8'>    
                            <span className='whiteText'>{this.state.track.name}</span>
                            <p>
                        <span>{
                            this.state.track.artists.map((artist)=>{
                                return(<span>
                                    <Link to={`/artist/${artist.id}`} className='playlistAnchor'>{artist.name}</Link>
                                    <span>, </span>
                                    </span>
                                    );
                                })}

                            </span>
                            <Link to={`/albums/${this.state.track.albumId}`}className='playlistAnchor'>{this.state.albumName}</Link>
                            </p>
                        </div>

                        <div  className='col-1'>
                            {this.state.hover?
                                <button className="dropdown-toggle songButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <h2>...</h2>
                                </button>
                                :<span></span>}
                        </div>

                        <div className='col-2'>
                            <p>{this.state.track.songTime}3:34</p>
                        </div>
                    </div>
            </Router>

        );
    }
}

export default Song;