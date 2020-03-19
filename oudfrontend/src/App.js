import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import SignRoute from "./routes/SignsRoute";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <SignRoute />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
