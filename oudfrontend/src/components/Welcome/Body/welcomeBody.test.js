import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from './../../../utils/index';
import BeforeLogin from './BeforeLogin';
const setup = (props = {}) => {
  const component = shallow(<BeforeLogin {...props} />);
  return component;
};

describe('Before Login test ', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('test background in the before login component ', () => {
    const wrapper = findByTestAttr(component, 'background');
    expect(wrapper.length).toBe(1);
  });
  it('test firstText in the before login component ', () => {
    const wrapper = findByTestAttr(component, 'firstText');
    expect(wrapper.length).toBe(2);
  });
  it('test getOudBtn in the before login component ', () => {
    const wrapper = findByTestAttr(component, 'getOudBtn');
    expect(wrapper.length).toBe(1);
  });
  describe('Snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(<BeforeLogin />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
