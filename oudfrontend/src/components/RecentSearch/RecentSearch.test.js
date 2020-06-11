import React from "react";
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import { findByTestAttr } from "./../../utils/index"
import RecentSearch from './RecentSearch';
import checkPropTypes from 'check-prop-types'
import axios from "axios"

const setup = (props = {}) => {
  const component = shallow(
    <RecentSearch {...props} />
  )
  return component;
}

describe('Recent Search', () => {
  let component;
  beforeEach(() => {
    component = setup();
  })

  it('Should render category header in right way', () => {
    component.setState({ isLoading: false, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
    const wrapper = findByTestAttr(component, "category-header");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });

  it('Should render category header in right way', () => {
    component.setState({ isLoading: false, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
    const wrapper = findByTestAttr(component, "category-title");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });

  it('Should render recent search text in right way', () => {
    component.setState({ isLoading: false, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
    const wrapper = findByTestAttr(component, "category-title");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.text()).toBe('Recent Search');
  });

  it('Should render category see all in right way', () => {
    component.setState({ isLoading: false, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
    const wrapper = findByTestAttr(component, "category-see-all");
    expect(component.state().isLoading).toBeFalsy();
  });

  it('Should render first wrapper right way', () => {
    component.setState({ isLoading: false, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
    const wrapper = findByTestAttr(component, "first-wrapper");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });

  it('Should render second wrapper right way', () => {
    component.setState({ isLoading: false, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
    const wrapper = findByTestAttr(component, "second-wrapper");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });

  it('Should render Card wrapper in right way', () => {
    component.setState({ isLoading: false, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
    const wrapper = findByTestAttr(component, "cards-wrapper");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });

  it('Should render Recent search Cards in right way', () => {
    component.setState({ isLoading: false, items: [] })
    const wrapper = findByTestAttr(component, "Recent-search-card");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(component.state().items.splice(0, 6).length);
  });

  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const tree = renderer
        .create(<RecentSearch />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});