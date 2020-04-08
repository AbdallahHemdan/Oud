import React from 'react';
import MainBrand from '../../components/MainBrand';
import SocialIcons from '../../components/SocialIcons';
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
