import React, {Component} from 'react';
import Navbar from '../../components/Welcome/welcome_true/Navbar/Navbar';
import Body from '../../components/Welcome/welcome_true/Body/Body';
import Items from '../../components/Welcome/welcome_true/item/MusicCard';
import Footer from '../../components/Welcome/welcome_true/Footer/Footer';

class WelcomeUser extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Body />
        <Items />
        <Footer />
      </div>
    );
  }
}

export default WelcomeUser;
