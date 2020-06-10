import React from "react";
import { shallow } from 'enzyme';
import { findByTestAttr } from "./../../utils/index"
import Statistics from './Statistics';
import renderer from 'react-test-renderer';


const setup = (props = {}) => {
  const component = shallow(
    <Statistics {...props} />
  )
  return component;
};

describe('Statistics page Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  })

  it('Should render Loading Snipper Wrapper', () => {
    const wrapper = findByTestAttr(component, "statistics-songs");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "statistics-header");
    expect(wrapper.length).toBe(2);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "statistics-cards");
    expect(wrapper.length).toBe(2);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "statistics-card");
    expect(wrapper.length).toBe(6);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "statistics-album");
    expect(wrapper.length).toBe(1);
  });

  describe('snapshot test', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<Statistics />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});