import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import Navbar from '../components/welcome_false/Navbar/Navbar.js';
import Footer from '../components/welcome_false/Footer/Footer';
import Body from '../components/welcome_false/Body/Body.js';
import Navbar2 from '../components/welcome_true/Navbar/Navbar';
import Body2 from '../components/welcome_true/Body/Body.js';
import Items2 from '../components/welcome_true/item/MusicCard.js';
import Footer2 from '../components/welcome_true/Footer/Footer';
class AppRoute extends Component {
  render() {
    const history = createHistory();
    return (
      <Router history={history}>
        <Route
          path="/"
          render={(props) => (
            <div>
              <Navbar guest={false} />
              <Body />
              <Footer />
            </div>
          )}
        />
        {/* <Route
          path="/HomePageUser"
          render={(props) => (
            <div>
              <Navbar2 />
              <Body2 />
              <Items2 />
              <Footer2 />
            </div>
          )}
        ></Route> */}
      </Router>
    );
  }
}

export default AppRoute;
