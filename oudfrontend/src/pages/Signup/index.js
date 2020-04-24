import React, { Component } from 'react'
import MainBrand from '../../components/Login&Signup/MainBrand';
import SocialIcons from '../../components/Login&Signup/SocialIcons';
import Signup from '../../components/Login&Signup/signup/signup';
import { isLoggedIn } from "../../utils/auth"

class SignUp extends Component {
  render() {
    if (isLoggedIn()) {
      window.location = "/";
      return (<div></div>)
    }
    return (
      <div className="container main-center">
        <MainBrand />
        <section className="social-form">
          <SocialIcons />
          <Signup />
        </section>
      </div>
    )
  }
}

export default SignUp
