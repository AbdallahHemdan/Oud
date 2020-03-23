import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from './components/playlist/playlist';
import { BrowserRouter as Router, Route, Switch, useParams, Link,useRouteMatch } from 'react-router-dom';


function App() {
  
  const url = '/playlist';
  
  return (
    <Router>
      <div className="App">  
        <Switch>
          <Route path={`${url}/:id`} Component={<Playlist/>}>
            <PlaylistRender/>
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