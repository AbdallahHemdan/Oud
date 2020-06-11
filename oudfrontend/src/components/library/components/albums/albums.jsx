import React, { Component } from 'react'
import axios from 'axios'
import { config } from '../../../../utils/auth'
import { base } from '../../../../config/environment'
import MusicCard from '../../../MusicCard/MusicCard'
import LoadingSnipper from '../../../LoadingSnipper/LoadingSnipper';

/**
 * @classdesc this is a component that renders users favourite and created albums
 * @author Ahmed Walid <ahmedwa1999@gmail.com>
 * @class
 * @property {object} state carries the state of the component
 * @property {boolean} state.recieved it is false when the playlists are fetched successfully Otherwise, it carries the decode id 
 * @property {object} state.albums carries the users favourite and created albums
 * @returns {
 *       <div>
 *        <h1>Saved ALBUMS</h1>
 *       
 *           {this.state.recieved?
 *           <CategoryBody  playlists={this.state.albums}/>
 *           :<LoadingSnipper/>
 *           }
 *       </div>
 */
export class Albums extends Component {
    constructor(){
        super()
        this.state = { albums:[],recieved:false}
    }
    componentDidMount() {
        axios
          .get(`${base}/me/albums`, config)
          .then((response) => {
            this.setState({recieved:true})
            this.setState({ albums: response.data.items });
            
          })
          .catch((error) => {
            console.log(error.response);
          });
        }
    render() {
        return (

            <div data-testid='albums' >
                <h1 data-testid='title'>Saved ALBUMS</h1>
                {(this.state.recieved)? <div
                className="wrapper"
                data-testid="first-wrapper">
                <div className="wrapper_section_2"
                  data-testid="second-wrapper"
                >
                  <div className="cards"
                    data-testid="cards-wrapper"
                  >
                    {this.state.albums.map(item =>{
                      return(<MusicCard item={item.album}
                        key={item._id}
                        playBtn={true}
                        data-testid='cards'
                        />)
                  })}
                  
                  </div>
                </div>
              </div>: (
                    <LoadingSnipper data-testid='loading'/>
                    )} 
            </div>
        )
    }
}

export default Albums
