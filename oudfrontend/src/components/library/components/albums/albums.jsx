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

            <div data-testid='albums'>
                <h1 data-testid='title'>Saved ALBUMS</h1>
                {
                (this.state.recieved)?this.state.albums.map(item =>{
                   return(<MusicCard item={item.album}
                    key={item._id}
                    playBtn={true}
                    data-testid='cards'
                    />)
               }): (
                <LoadingSnipper data-testid='loading'/>
                )
               }
            </div>
        )
    }
}

export default Albums
