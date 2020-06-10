import React from 'react';
import {shallow, mount} from 'enzyme';

import {findByTestAttr} from './../../../utils/index';

import Signup from './signup.js';

const setup = (props = {}) => {
  const component = shallow(<Signup {...props} />);
  return component;
};

describe('Signup component', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('Render the display name text box ', () => {
    const wrapper = findByTestAttr(component, 'register-displayname');
    expect(wrapper.length).toBe(1);
    component.setState({displayName: 'Abdallah'});
    expect(component.state().displayName).toBe('Abdallah');
  });
  it('Render the username name text box ', () => {
    const wrapper = findByTestAttr(component, 'register-username');
    expect(wrapper.length).toBe(1);
    component.setState({name: 'Abdallah'});
    expect(component.state().name).toBe('Abdallah');
  });
  it('Render the email text box ', () => {
    const wrapper = findByTestAttr(component, 'register-email');
    expect(wrapper.length).toBe(1);
    component.setState({email: 'Abdallah@gmail.com'});
    expect(component.state().email).toBe('Abdallah@gmail.com');
  });
  it('Render the password text box ', () => {
    const wrapper = findByTestAttr(component, 'register-password');
    expect(wrapper.length).toBe(1);
    component.setState({Password: 'aaa111...'});
    expect(component.state().Password).toBe('aaa111...');
  });
  it('Render the confirmPassword text box ', () => {
    const wrapper = findByTestAttr(component, 'register-confirmPassword');
    expect(wrapper.length).toBe(1);
    component.setState({ConfirmPassword: 'aaa111...'});
    expect(component.state().ConfirmPassword).toBe('aaa111...');
  });
  it('Render the male text box ', () => {
    const wrapper = findByTestAttr(component, 'register-male');
    expect(wrapper.length).toBe(1);
    component.setState({gender: 'Male'});
    expect(component.state().gender).toBe('Male');
  });
  it('Render the year text box ', () => {
    const wrapper = findByTestAttr(component, 'register-dob-year');
    expect(wrapper.length).toBe(1);
    component.setState({year: '1999'});
    expect(component.state().year).toBe('1999');
  });
  it('Render the month text box ', () => {
    const wrapper = findByTestAttr(component, 'register-dob-month');
    expect(wrapper.length).toBe(1);
    component.setState({month: '01'});
    expect(component.state().month).toBe('01');
  });
  it('Render the day text box ', () => {
    const wrapper = findByTestAttr(component, 'register-dob-day');
    expect(wrapper.length).toBe(1);
    component.setState({day: '01'});
    expect(component.state().day).toBe('01');
  });
  it('Render the user test text box ', () => {
    const wrapper = findByTestAttr(component, 'register-user-test');
    expect(wrapper.length).toBe(1);
    component.setState({PasswordType: 'Password'});
    expect(component.state().PasswordType).toBe('Password');
  });
  it('Render the country text box ', () => {
    const wrapper = findByTestAttr(component, 'register-country');
    expect(wrapper.length).toBe(1);
    component.setState({selectedCountry: 'Palestine'});
    expect(component.state().selectedCountry).toBe('Palestine');
  });
  it('Render the SignUp btn text box ', () => {
    const wrapper = findByTestAttr(component, 'SignUp-btn');
    expect(wrapper.length).toBe(1);
  });
  describe('Snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(<Signup />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
