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
            playing:false,
            displayDropdown:false,
            saved:false,
            queued:false,
            clicked:false
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
    componentDidUpdate(){
        
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.clickedId !== this.props.clickedId){
            this.setState({clicked:(nextProps.clickedId === this.props.track.id)?true:false})    
            this.hh();
        }  
    }
    playSongClicked(){

        this.props.handlePlay(this.state.track.id)
    }
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
    hh(){
        if(this.state.clicked === true)
        {
            this.setState({displayDropdown:false})
        }
    }
    toggleDropdown(){
        this.setState({displayDropdown:!this.state.displayDropdown})
        console.log("click -->" + this.state.clicked)
        console.log("display -->" + this.state.displayDropdown)

    }
    render(){
        
        return(
            <Router>
                <button onClick={()=>{this.props.handleClick(this.state.track.id)}} className="song row" id='song' onMouseEnter={this.hover} onMouseLeave={this.notHover}>
                    
                        <div  className='songIcon col-1'>
                            <button className='songButton' onClick={this.playSongClicked.bind(this)}>
                            <img src={(this.state.hover||this.state.clicked)? require('./play.png'):require('./musicIcon.png')}
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
                            
                                <div className="dropdown">
                                    <button 
                                        onClick={this.toggleDropdown.bind(this)}
                                        className="songButton" 
                                        id='songDropdownButton'>
                                        <h3 className='whiteText' 
                                        style={(this.state.hover||this.state.clicked)?{display:'block'}:{display:'none'}}>
                                        ...</h3>
                                     </button>

                                    <div 
                                        style={this.state.displayDropdown && this.state.clicked?{display: "block"}:{display: 'none'}}
                                        className="dropdownContent" id="dropdownContent">

                                        <Link onClick={this.handleSaving.bind(this)} className="SongDropdownItem">
                                        {this.state.saved?'Remove From Your Liked Songs':'Save to your Liked Songs'}</Link>

                                        <Link onClick={this.handleQueue.bind(this)}
                                        className="SongDropdownItem">
                                        {this.state.queued?'Remove From Queue':'Add to Queue'}</Link>

                                        <Link className="SongDropdownItem">Add to Playlist</Link>
                                    </div>
                                </div> 
                        </div>

                        <div className='col-2'>
                            <p className='whiteText'>{this.state.track.songTime}3:34</p>
                        </div>
                    </button>
            </Router>

        );
    }
}

export default Song;