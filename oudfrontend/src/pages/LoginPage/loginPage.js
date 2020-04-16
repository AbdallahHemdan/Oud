import React from 'react';
import MainBrand from '../../components/Login&Signup/MainBrand';
import SocialIcons from '../../components/Login&Signup/SocialIcons';
import Signin from '../../components/Login&Signup/signin/signin';

export default () => (
  <div className="container main-center ">
    <MainBrand />
    <section className="social-form">
      <SocialIcons />
      <Signin />
    </section>
  </div>
);
