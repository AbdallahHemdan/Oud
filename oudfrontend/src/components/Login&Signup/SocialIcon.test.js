import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from './../../utils/index';
import SocialIcons from './SocialIcons';

const setup = (props = {}) => {
  const component = shallow(<SocialIcons {...props} />);
  return component;
};
describe('test the SocialIcons', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('Render the SocialText text box ', () => {
    const wrapper = findByTestAttr(component, 'SocialText');
    expect(wrapper.length).toBe(1);
  });
  it('Render the GoogleButtonImage text box ', () => {
    const wrapper = findByTestAttr(component, 'GoogleButtonImage');
    expect(wrapper.length).toBe(1);
  });
  it('Render the FacebookButton text box ', () => {
    const wrapper = findByTestAttr(component, 'FacebookButton');
    expect(wrapper.length).toBe(1);
  });
  describe('Snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(<SocialIcons />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
