import React, { Component } from 'react'
import Navbar from "../../components/Welcome/Navbar/Navbar"
import Footer from "../../components/Welcome/Footer/Footer"
import Body from "../../components/Welcome/Body/Body"

class Welcome extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Body />
        <Footer />
      </div>
    )
  }
}

export default Welcome
