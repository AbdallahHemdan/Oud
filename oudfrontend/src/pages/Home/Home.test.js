import React from "react";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import { findByTestAttr } from "./../../utils/index"
import Home from './Home';
import checkPropTypes from 'check-prop-types'


const setup = (props = {}) => {
  const component = shallow(
    <Home {...props} />
  )
  return component;
}

describe('Home Page Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  })

  it('should sidebar in right way', () => {
    const wrapper = findByTestAttr(component, "sidebar");
    expect(wrapper.length).toBe(1);
  });

  it('should navbar in right way', () => {
    const wrapper = findByTestAttr(component, "navbar");
    expect(wrapper.length).toBe(1);
  });

  it('should loading in right way', () => {
    component.setState({ isLoading: true })
    const wrapper = findByTestAttr(component, "loading");
    expect(wrapper.length).toBe(1);
  });
  it('should music content in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "music-content");
    expect(wrapper.length).toBe(1);
  });
});