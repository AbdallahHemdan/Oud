import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from './components/playlist/playlist';
import LikedSongs from './components/likedSongs/likedSongs';
import Album from './components/album/album'
import CreatePlaylist from './components/CreatePlaylist/createPlaylist'
import AddToPlaylist from './components/addToPlaylist/addToPlaylist'
import { BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';


function App() {
  
  return (
    <Router>
      <div className="App">  
        <AddToPlaylist/>
        <Switch>
          <Route path={`/playlist/:id`} Component={<Playlist/>}>
            <PlaylistRender/>
          </Route> 

          <Route path='/likedSongs/'>
            <LikedSongs/>
          </Route> 

          <Route path="/albums/:id" Component={<Album/>}>
            <AlbumRender/>
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
function AlbumRender(){
  let id = useParams().id;
  return(
  <Album id={id}/>
  );
}