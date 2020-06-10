import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from './../../../utils/index';
import ForgotPassword from './ForgotPassword';

const setup = (props = {}) => {
  const component = shallow(<ForgotPassword {...props} />);
  return component;
};

describe('test the ForgotPassword', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('Render the forgetPasswordText text box ', () => {
    const wrapper = findByTestAttr(component, 'forgetPasswordText');
    expect(wrapper.length).toBe(3);
  });

  it('Render the forgetPassword-email text box ', () => {
    const wrapper = findByTestAttr(component, 'forgetPassword-email');
    expect(wrapper.length).toBe(1);
  });
  it('Render the SendCodeBtn text box ', () => {
    const wrapper = findByTestAttr(component, 'SendCodeBtn');
    expect(wrapper.length).toBe(1);
  });
  describe('Snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(<ForgotPassword />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
