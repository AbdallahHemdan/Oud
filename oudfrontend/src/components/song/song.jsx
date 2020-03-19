import React, { Component} from 'react';
import './song.css';
class Song extends Component{
    
    constructor(props){
        super(props);
        this.state={
            hover : false,
            track:this.props.track
        };
        
        

    }
    hover = ()=> this.setState({hover : true});
    notHover = ()=> this.setState({hover:false});
    render(){
        
        return(
            <div className="song" onMouseEnter={this.hover} onMouseLeave={this.notHover}>
            <div className='row'>
                <div  className='songIcon col-1'>
                    <img src={this.state.hover? require('./play.png'):require('./musicIcon.png')} width='12' height='14' alt='play music icon'/>
                </div>

                <div className='songInfo col-8'>    
                    <span className='whiteText'>{this.state.track.name}</span>
                    <p>
                   <span>{
                       this.state.track.artists.map((artist)=>{
                        return(<span>
                            <a className='playlistAnchor' href="">{artist.name}</a>
                            <span>, </span>
                            </span>
                            
                        );
                   
                    }
                   )
                   }
                    </span>
                    
                    <a className='playlistAnchor' href=''>hvjh{}</a>
                    </p>
                </div>

                <div  className='songOptions col-1'>
                    {this.state.hover?<h2>...</h2>:<span></span>}
                </div>

                <div className='songTime col-2'>
                    <p>{this.props.songTime}3:34</p>
                </div>
                
            </div>    

            </div>
        );
    }
}

export default Song;