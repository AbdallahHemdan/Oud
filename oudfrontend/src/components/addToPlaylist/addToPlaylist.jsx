import React, {Component} from 'react'
import CreatePlaylist from '../CreatePlaylist/createPlaylist'
import axios from 'axios';
class addToPlaylist extends Component{
    constructor(props){
        super(props);
        this.state={
            display:true,
            createPlaylist:false
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3000/playlists/')
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
    createPlaylist(){
        this.setState({createPlaylist:true})
    }
    render(){
        return(
            <div style={this.state.display?{}:{display:"none"}} className="createPlaylist">
            <CreatePlaylist display={this.state.createPlaylist}/>
                <button onClick={this.close.bind(this)} className='closeButton'>
                    <svg width='32' height='32' xmlns="http://www.w3.org/2000/svg">
                        <title>close</title>
                        <path d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
                        fill="#fff" fillRule="evenodd"></path>
                    </svg>
                </button>

                <h1 id="createPlaylistTitle">Add To playlist</h1>
                <button style={{width:"200px"}} className='playButton' onClick={this.createPlaylist.bind(this)}>NEW PLAYLIST</button>

                <div id="createPlaylistBigField">
                    <div id="createPlaylistContainer">
                    </div>
                </div>
            </div>
        );
    }

}

export default addToPlaylist;