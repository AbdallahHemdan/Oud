import React, { Component } from 'react'
import axios from 'axios'
import { config } from '../../../../utils/auth'
import { base } from '../../../../config/environment'
import LoadingSnipper from '../../../LoadingSnipper/LoadingSnipper';
import CategoryBody from '../../../CategoryBody/CategoryBody'

/**
 * @classdesc this is a component that renders users favourite and created playlists
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @property {object} state carries the state of the component
 * @property {boolean} state.recieved it is false when the playlists are fetched successfully Otherwise, it carries the decode id 
 * @property {object} state.playlists carries the users favourite and created playlists
 * @returns {
 *       <div>
 *        <h1></h1> Followed Playlists </h1>
 *       
 *           {this.state.recieved?
 *           <CategoryBody  playlists={this.state.playlists}/>
 *           :<LoadingSnipper/>
 *           }
 *       </div>
 */
export class Playlists extends Component {
    constructor(){
        super()
        this.state = { playlists:[] , recieved:false}
    }
    componentDidMount() {
        axios
          .get(`${base}/me/playlists/`,false ,config)
          .then((response) => {
            this.setState({recieved:true});
            this.setState({ playlists: response.data.items});
            
          })
          .catch((error) => {
            console.log(error.response);
          });
        }
        
    render() {
        return (
        <div data-testid='playlists'>
          <h1 data-testid='title'> Followed Playlists </h1>
        
            {this.state.recieved?
            <CategoryBody  playlists={this.state.playlists} data-testid='categoryBody'/>
            :<LoadingSnipper data-testid='loading'/>
            }
        </div>
        )
    }
}

export default Playlists
