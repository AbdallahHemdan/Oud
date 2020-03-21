import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from './components/Playlist/playlist';
import { BrowserRouter as Router, Route, Switch, useParams, Link,useRouteMatch } from 'react-router-dom';


function App() {
  
  const url = '/playlist';
  
  return (
    <Router>
      <div className="App">
        <body>
        
        
        <Switch>
          <Route path={`${url}/:id`} component={<Playlist/>}>
            <PlaylistRender/>
          </Route>
          
        </Switch>
        </body>
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