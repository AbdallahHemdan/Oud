import React from "react";
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import { findByTestAttr } from "./../../utils/index"
import RecentSearchCard from './RecentSearchCard';
import checkPropTypes from 'check-prop-types'
import { MemoryRouter } from "react-router-dom"
const setup = (props = {}) => {
  const component = shallow(
    <RecentSearchCard.WrappedComponent {...props} />
  )
  return component;
}
const item = {
  _id: 1,
  displayName: "Recently played",
  type: "Artist",
  images: [
    "https://previews.123rf.com/images/aratehortua/aratehortua2001/aratehortua200100022/138417489-vector-cartoon-low-poly-man-with-headphones-character.jpg"
  ]
}
describe('RecentSearch Card component', () => {
  let component;
  beforeEach(() => {
    const props = {
      item
    }
    component = setup(props);
  })
  it('Should render card-container in right way', () => {
    const wrapper = findByTestAttr(component, "card-container");
    expect(wrapper.length).toBe(1);
  });
  it('Should render card-container in right way', () => {
    const wrapper = findByTestAttr(component, "card");
    expect(wrapper.length).toBe(1);
  });
  it('Should render over layer in right way', () => {
    const wrapper = findByTestAttr(component, "overlayer");
    expect(wrapper.length).toBe(1);
  });
  it('Should render play btn in right way', () => {
    const wrapper = findByTestAttr(component, "play-btn");
    expect(wrapper.length).toBe(1);
  });
  it('Should render play circle in right way', () => {
    const wrapper = findByTestAttr(component, "play-circle");
    expect(wrapper.length).toBe(1);
  });
  it('Should render playlist image in right way', () => {
    const wrapper = findByTestAttr(component, "playlist-image");
    expect(wrapper.length).toBe(1);
  });
  it('Should render playlist title in right way', () => {
    const wrapper = findByTestAttr(component, "playlist-title");
    expect(wrapper.length).toBe(1);
  });
  it('Should render playlist link in right way', () => {
    const wrapper = findByTestAttr(component, "playlist-link");
    expect(wrapper.length).toBe(1);
  });
  it('Should render playlist inner text in right way', () => {
    const wrapper = findByTestAttr(component, "playlist-link");
    expect(wrapper.text()).toBe(item.displayName);
  });
  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = mount(
        <MemoryRouter>
          <RecentSearchCard.WrappedComponent item={item} />
        </MemoryRouter >
      )
      expect(wrapper).toMatchSnapshot()
    });
  });
  describe('testing prop types', () => {
    it('should pass true props', () => {
      const result = checkPropTypes(RecentSearchCard.WrappedComponent.propTypes, { ...item }, 'prop', RecentSearchCard.WrappedComponent.name);
      expect(result).toBeUndefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(RecentSearchCard.WrappedComponent.propTypes, { item: 0 }, 'prop', RecentSearchCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(RecentSearchCard.WrappedComponent.propTypes, { item: true }, 'prop', RecentSearchCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(RecentSearchCard.WrappedComponent.propTypes, { item: jest.fn }, 'prop', RecentSearchCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(RecentSearchCard.WrappedComponent.propTypes, { item: [15] }, 'prop', RecentSearchCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(RecentSearchCard.WrappedComponent.propTypes, { item: "" }, 'prop', RecentSearchCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
  })
});