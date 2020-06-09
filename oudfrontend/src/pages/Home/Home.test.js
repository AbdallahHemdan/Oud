import React from "react";
import { shallow } from 'enzyme';
import { findByTestAttr } from "./../../utils/index"
import Home from './Home';


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

  it('Should render loading in case of loading data', () => {
    component.setState({ isLoading: true });
    const wrapper = findByTestAttr(component, "loading");
    expect(component.state().isLoading).toBeTruthy();
    expect(wrapper.length).toBe(1);
  });

  it('should music content in right way', () => {
    component.setState({ isLoading: false });
    const wrapper = findByTestAttr(component, "music-content");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });

  describe('snapshot test of Home', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(
        <Home />
      )
      expect(wrapper).toMatchSnapshot()
    });
  });
});