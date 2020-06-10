import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from './../../../utils/index';
import {MemoryRouter} from 'react-router-dom';
import Signin from './signin.js';

const setup = (props = {}) => {
  const component = shallow(<Signin {...props} />);
  return component;
};

describe('Signin component', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('Render the login-email text box ', () => {
    const wrapper = findByTestAttr(component, 'login-email');
    expect(wrapper.length).toBe(1);
  });
  it('Render the login-password text box ', () => {
    const wrapper = findByTestAttr(component, 'login-password');
    expect(wrapper.length).toBe(1);
  });
  it('Render the login-button text box ', () => {
    const wrapper = findByTestAttr(component, 'login-button');
    expect(wrapper.length).toBe(1);
  });
  it('Render the Forget password text box ', () => {
    const wrapper = findByTestAttr(component, 'Forgetpass');
    expect(wrapper.length).toBe(1);
  });
  it('Render the SignInBtns text box ', () => {
    const wrapper = findByTestAttr(component, 'SignInBtns');
    expect(wrapper.length).toBe(1);
  });
  it('Render the SignUpBtntext box ', () => {
    const wrapper = findByTestAttr(component, 'SignUpBtn');
    expect(wrapper.length).toBe(1);
  });
  describe('Snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(<Signin />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
