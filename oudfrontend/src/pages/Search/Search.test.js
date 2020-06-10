import React from "react";
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import { findByTestAttr } from "./../../utils/index"
import Search from "./Search"

const setup = (props = {}) => {
  const component = shallow(
    <Search {...props} />
  )
  return component;
}

describe('Search Page Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  })
  it('Should render sidebar in right way', () => {
    const wrapper = findByTestAttr(component, "sidebar");
    expect(wrapper.length).toBe(1);
  });
  it('Should render navbar in right way', () => {
    const wrapper = findByTestAttr(component, "navbar");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading snipper in case of loading', () => {
    component.setState({ isLoading: true })
    const wrapper = findByTestAttr(component, "loading-snipper");
    expect(component.state().isLoading).toBeTruthy()
    expect(wrapper.length).toBe(1);
  });
  it('Should render search item in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "main-content");
    expect(component.state().isLoading).toBeFalsy()
    expect(wrapper.length).toBe(1);
  });
  it('Should render search item in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "music-content");
    expect(component.state().isLoading).toBeFalsy()
    expect(wrapper.length).toBe(1);
  });
  it('should render search after typing in right way', () => {
    component.setState({ search: "Amr", isLoading: false })
    const wrapper = findByTestAttr(component, "search-after-typing");
    expect(component.state().search).toBe("Amr");
    expect(wrapper.length).toBe(1);
  });
  it('should render search before typing in right way', () => {
    component.setState({ search: '', isLoading: false })
    const wrapper = findByTestAttr(component, "search-before-typing");
    expect(component.state().search).toBe("");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
  it('should render browse all in case of not typing', () => {
    component.setState({ search: '', isLoading: false })
    const wrapper = findByTestAttr(component, "browse-all");
    expect(component.state().search).toBe("");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
  it('should render browse all in case of not typing', () => {
    component.setState({ search: '', isLoading: false, isLoggedIn: true })
    const wrapper = findByTestAttr(component, "recent-search");
    expect(component.state().search).toBe("");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
});

