import React from "react";
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import { findByTestAttr } from "./../../utils/index"
import GenreCard from './GenreCard';
import checkPropTypes from 'check-prop-types'
import { MemoryRouter } from "react-router-dom"
const setup = (props = {}) => {
  const component = shallow(
    <GenreCard.WrappedComponent {...props} />
  )
  return component;
}
const item = {
  _id: "1",
  name: "Hemdan",
  icon: "https://avatars0.githubusercontent.com/u/40190772?s=400&u=292f4666b670438f7e38da19371cfe4292bde577&v=4"
}

describe('Genre Card Component', () => {
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
    component.setState({ name: "Hemdan" })
    const wrapper = findByTestAttr(component, "playlist-link");
    expect(wrapper.text()).toBe(item.name);
  });
  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = mount(
        <MemoryRouter>
          <GenreCard.WrappedComponent item={item} />
        </MemoryRouter >
      )
      expect(wrapper).toMatchSnapshot()
    });
  });
  describe('testing prop types', () => {
    it('should pass true props', () => {
      const result = checkPropTypes(GenreCard.WrappedComponent.propTypes, { ...item }, 'prop', GenreCard.WrappedComponent.name);
      expect(result).toBeUndefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(GenreCard.WrappedComponent.propTypes, { item: 0 }, 'prop', GenreCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(GenreCard.WrappedComponent.propTypes, { item: true }, 'prop', GenreCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(GenreCard.WrappedComponent.propTypes, { item: jest.fn }, 'prop', GenreCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(GenreCard.WrappedComponent.propTypes, { item: [15] }, 'prop', GenreCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(GenreCard.WrappedComponent.propTypes, { item: "" }, 'prop', GenreCard.WrappedComponent.name);
      expect(result).toBeDefined();
    });
  })
});