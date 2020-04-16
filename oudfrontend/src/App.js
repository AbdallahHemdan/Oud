import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <AppRoutes />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
