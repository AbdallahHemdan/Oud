import React from 'react';
import MainBrand from '../../components/signup/MainBrand';
import SocialIcons from '../../components/signup/SocialIcons';
import Signup from '../../components/signup/signup';

export default () => (
  <div className="container main-center">
    <MainBrand />
    <section className="social-form">
      <SocialIcons />
      <Signup />
    </section>
  </div>
);
