import React from 'react';
import MainBrand from '../../components/signin/MainBrand';
import SocialIcons from '../../components/signin/SocialIcons';
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
