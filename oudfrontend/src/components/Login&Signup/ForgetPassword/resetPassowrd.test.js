import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from './../../../utils/index';
import ResetPassword from './resetPassword.js';
import {MemoryRouter} from 'react-router-dom';
const setup = (props = {}) => {
  const component = shallow(<ResetPassword.WrappedComponent {...props} />);
  return component;
};
describe('test for restpassword ', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('Render the restPasswordText text box ', () => {
    const wrapper = findByTestAttr(component, 'restPasswordText');
    expect(wrapper.length).toBe(4);
  });
  it('Render the testIdOfButton text box ', () => {
    const wrapper = findByTestAttr(component, 'testIdOfButton');
    expect(wrapper.length).toBe(2);
  });
  it('Render the registerPassword text box ', () => {
    const wrapper = findByTestAttr(component, 'registerPassword');
    expect(wrapper.length).toBe(2);
  });
  describe('Snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(<ResetPassword />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
