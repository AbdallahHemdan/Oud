import React from 'react';
import MainBrand from '../../components/MainBrand';
import SocialIcons from '../../components/SocialIcons';
import Signin from '../../components/signin/signin';

export default () => (
  <div className="container main-center">
    <MainBrand />
    <section className="social-form">
      <SocialIcons />
      <Signin />
    </section>
  </div>
);
