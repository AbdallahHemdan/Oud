import React, {Component} from 'react';
import Navbar from '../components/welcome_false/Navbar/Navbar';
import Body from '../components/welcome_false/Body/Body';
import Footer from '../components/welcome_false/Footer/Footer';

class WelcomeGuest extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default WelcomeGuest;
