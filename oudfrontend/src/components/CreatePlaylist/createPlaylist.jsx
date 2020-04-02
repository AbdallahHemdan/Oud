import React, {Component} from 'react'
import './createPlaylist.css'
import axios from 'axios';
class CreatePlaylist extends Component{
    constructor(props){
        super(props);
        this.state={
            display:false,
            name:''
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.display !== this.state.display){
            this.setState({display:nextProps.display})
        }
        
    }
    updateName(e){
        const name = e.target.value
        this.setState({name:name})
    }
    createPlaylist(){
       let  playlist={
        "name": this.state.name,
        "public": true,
        "collaborative": false,
        "description": "",
        "image/png": ""
        }
        axios.post('http://localhost:3000/playlist/', playlist)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    close(){
        this.setState({display:false})
    }
    render(){
        return(
            <div style={this.state.display?{}:{display:"none"}} className="createPlaylist">
                <button onClick={this.close.bind(this)} className='closeButton'>
                    <svg width='32' height='32' xmlns="http://www.w3.org/2000/svg">
                        <title>close</title>
                        <path d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
                        fill="#fff" fillRule="evenodd"></path>
                    </svg>
                </button>
                <h1 id="createPlaylistTitle">Create new playlist</h1>

                <div id="createPlaylistBigField">
                    <div id="createPlaylistContainer">
                        <p>Playlist Name</p>
                        <input id='cretePLaylistName' type='text' onChange={this.updateName.bind(this)} placeholder='New Playlist'/>
                    </div>
                </div>
                <button className='playButton' onClick={this.createPlaylist.bind(this)}>CREATE</button>
            </div>
        );
    }

}

export default CreatePlaylist;