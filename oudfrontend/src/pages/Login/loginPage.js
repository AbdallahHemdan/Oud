import React, { Component } from 'react'
import MainBrand from '../../components/Login&Signup/MainBrand';
import SocialIcons from '../../components/Login&Signup/SocialIcons';
import Signin from '../../components/Login&Signup/signin/signin';
import { isLoggedIn } from "../../utils/auth"



export class SignIn extends Component {
  render() {
    if (isLoggedIn()) {
      window.location = "/"
      return (<div></div>)
    }
    return (
      <div className="container main-center">
        <MainBrand />
        <section className="social-form">
          <SocialIcons />
          <Signin />
        </section>
      </div>
    )
  }
}

export default SignIn
