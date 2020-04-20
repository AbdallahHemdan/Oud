import React, {Component} from 'react';
import Navbar from '../../components/Welcome/welcome_false/Navbar/Navbar';
import Body from '../../components/Welcome/welcome_false/Body/Body';
import Footer from '../../components/Welcome/welcome_false/Footer/Footer';

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
