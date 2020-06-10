import React from 'react';
import BrowseAll from './BrowseAll';
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from "./../../utils/index";
import checkPropTypes from 'check-prop-types'


const item = {
  items: [
    {
      id: "1",
      name: "Fitness Araby",
      owner: "Hemdan",
      collaborative: true,
      description: "Workout fitness music",
      public: true,
      image:
        "https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg",
      type: "playlist"
    }
  ]
};

const setup = (props = {}) => {
  const component = shallow(
    <BrowseAll {...props} />
  )
  return component;
}

describe('Browse all component', () => {
  let component;
  beforeEach(() => {
    const props = item;
    component = setup(props);
  })

  it('Should render the music content in right way', () => {
    const wrapper = findByTestAttr(component, "music-content");
    expect(wrapper.length).toBe(1);
  });

  it('Should render the browse all container in right way', () => {
    const wrapper = findByTestAttr(component, "browse-all");
    expect(wrapper.length).toBe(1);
  });

  it('Should render the browse all header in right way', () => {
    const wrapper = findByTestAttr(component, "browse-all-header");
    expect(wrapper.length).toBe(1);
  });
  it('Should render the browse all header in right way', () => {
    const wrapper = findByTestAttr(component, "browse-all-content");
    expect(wrapper.length).toBe(1);
  });


  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(
        <BrowseAll {...item} />
      )
      expect(wrapper).toMatchSnapshot()
    });
  });


  describe('testing prop types', () => {
    it('should pass true props', () => {
      const result = checkPropTypes(BrowseAll.propTypes, { ...item }, 'prop', BrowseAll.name);
      expect(result).toBeUndefined();
    });
    it('should pass true props', () => {
      const result = checkPropTypes(BrowseAll.propTypes, { item: [15] }, 'prop', BrowseAll.name);
      expect(result).toBeUndefined();
    });
  })

});