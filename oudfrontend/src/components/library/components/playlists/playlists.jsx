import React, { Component } from 'react'
import axios from 'axios'
import { config } from '../../../../utils/auth'
import { base } from '../../../../config/environment'
import MusicCard from '../../../MusicCard/MusicCard'
import LoadingSnipper from '../../../LoadingSnipper/LoadingSnipper';


export class Playlists extends Component {
    constructor(){
        super()
        this.state = { playlists:[] , recieved:false}
    }
    componentDidMount() {
        console.log(base);
        axios
          .get(`${base}/me/playlists`, config)
          .then((response) => {
            this.setState({ playlists: response.data.items });
            this.setState({recieved:true});
          })
          .catch((error) => {
            console.log(error.response);
          });
        }
        
    render() {
        console.log(this.state);
        return (
            <div>
                 <h1> Followed Playlists </h1>
               
               {(this.state.recieved)?this.state.playlists.map(item =>{
                   return(<MusicCard item={item}
                    key={item._id}
                    playBtn={true}
                    />)
               }): <LoadingSnipper/>}
            </div>
        )
    }
}

export default Playlists
