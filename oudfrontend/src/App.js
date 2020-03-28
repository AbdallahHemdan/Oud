import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from './components/playlist/playlist';
import LikedSongs from './components/likedSongs/likedSongs';
import { BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';


function App() {
  
  const playlistUrl = '/playlist';
  return (
    <Router>
      <div className="App">  
        <Switch>
          <Route path={`${playlistUrl}/:id`} Component={<Playlist/>}>
            <PlaylistRender/>
          </Route> 
          <Route path='/likedSongs/'>
            <LikedSongs/>
          </Route> 
        </Switch> 
      </div>
    </Router>
  );
}

export default App;

function PlaylistRender(){
  let id = useParams();
  return(
  <Playlist id={id}/>
  );
}