import React from 'react';
import MainBrand from '../../components/Login&Signup/MainBrand';
import SocialIcons from '../../components/Login&Signup/SocialIcons';
import Signup from '../../components/Login&Signup/signup/signup';

export default () => (
  <div className="container main-center">
    <MainBrand />
    <section className="social-form">
      <SocialIcons />
      <Signup />
    </section>
  </div>
);
