import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import SuggestedArtistPage from './pages/SuggestedArtistPage/SuggestedArtist';
function App() {
  return (
    <Router>
      <div className="App">
        <Router path="/">
          <SuggestedArtistPage />
        </Router>
      </div>
    </Router>
  );
}

export default App;
