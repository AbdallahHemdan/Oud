import React, { Component } from 'react'
import axios from 'axios'
import { config } from '../../../../utils/auth'
import { base } from '../../../../config/environment'
import MusicCard from '../../../MusicCard/MusicCard'
import LoadingSnipper from '../../../LoadingSnipper/LoadingSnipper';

export class Albums extends Component {
    constructor(){
        super()
        this.state = { albums:[],recieved:false}
    }
    componentDidMount() {
        console.log(base);
        axios
          .get(`${base}/me/albums`, config)
          .then((response) => {
            this.setState({ albums: response.data.items });
            this.setState({recieved:true})
          })
          .catch((error) => {
            console.log(error.response);
          });
        }
    render() {
        return (

            <div>
                <h1>Saved ALBUMS</h1>
                {
                (this.state.recieved)?this.state.albums.map(item =>{
                   return(<MusicCard item={item.album}
                    key={item._id}
                    playBtn={true}
                    />)
               }): (
                <LoadingSnipper/>
                )
               }
            </div>
        )
    }
}

export default Albums
