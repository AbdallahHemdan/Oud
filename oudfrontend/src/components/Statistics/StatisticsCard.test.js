import React from "react";
import { shallow } from 'enzyme';
import { findByTestAttr } from "./../../utils/index"
import renderer from 'react-test-renderer';
import StatisticsCard from './StatisticsCard';


const setup = (props = {}) => {
  const component = shallow(
    <StatisticsCard {...props} />
  )
  return component;
};

let data = {
  img: "Hemdan",
  name: "Hemdan",
  listeners: 1521,
  likes: 1521,
  listenersPerDay: 1521,
  listenersPerWeek: 1521,
  listenersPerMonth: 1521,
  likesPerDay: 1521,
  likesPerWeek: 1521,
  likesPerMonth: 1521
}
describe('StatisticsCard page Component', () => {
  let component;
  beforeEach(() => {
    component = setup({ data });
  })

  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "item-name");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "item-image");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "statistics-data-container");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "listeners");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "likes");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "listeners-per-day");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "listeners-per-week");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "listeners-per-month");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "likes-per-day");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "likes-per-week");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "likes-per-month");
    expect(wrapper.length).toBe(1);
  });

  describe('snapshot test', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<StatisticsCard data={data} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});