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
        axios
          .get(`${base}/me/playlists`, config)
          .then((response) => {
            this.setState({ playlists: response.data.items});
            this.setState({recieved:true});
          })
          .catch((error) => {
            console.log(error.response);
          });
        }
        
    render() {
        return (
            <div data-testid='playlists'>
                 <h1 data-testid='title'> Followed Playlists </h1>
               
               {(this.state.recieved)?this.state.playlists.map(item =>{
                   return(<MusicCard item={item}
                    key={item._id}
                    playBtn={true}
                    data-testid='cards'
                    />)
               }): <LoadingSnipper data-testid='loading'/>}
            </div>
        )
    }
}

export default Playlists
