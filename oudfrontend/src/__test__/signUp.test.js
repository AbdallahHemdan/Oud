import React, {Component} from 'react';
import {shallow} from 'enzyme';
// import FindByTestAtrr from '../testutilts';

import Signup from '../components/signup/signup';
import MainBrand from '../components/signup/MainBrand';

const setUP = (props = {}) => {
  const component = shallow(<MainBrand {...props} />);
  return component;
};


describe('Sign up must be rendered', () => {
  let component;
  beforeEach(() => {
    component = setUP();
  });

  it('logo must be rendered', () => {
    const logo = component.find(`[(data-test = '$${atrr}')]`);
    expect(logo.lenght).toBe(1);
  });
});
