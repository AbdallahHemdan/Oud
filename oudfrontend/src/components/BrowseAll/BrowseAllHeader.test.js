import React from 'react';
import BrowseAllHeader from './BrowseAllHeader';
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from "./../../utils/index";
import checkPropTypes from 'check-prop-types'



const setup = (props = {}) => {
  const component = shallow(
    <BrowseAllHeader {...props} />
  )
  return component;
}


describe('Browse all header component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  })

  it('Should render category header in right way', () => {
    const wrapper = findByTestAttr(component, "category-header");
    expect(wrapper.length).toBe(1);
  });

  it('Should render category header title in right way', () => {
    const wrapper = findByTestAttr(component, "category-title");
    expect(wrapper.length).toBe(1);
  });

  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(
        <BrowseAllHeader />
      )
      expect(wrapper).toMatchSnapshot()
    });
  });

});