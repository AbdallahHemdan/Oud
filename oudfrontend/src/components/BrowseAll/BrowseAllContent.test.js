import React from 'react';
import BrowseAllContent from './BrowseAllContent';
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from "./../../utils/index";
import checkPropTypes from 'check-prop-types';



const setup = (props = {}) => {
  const component = shallow(
    <BrowseAllContent {...props} />
  )
  return component;
}

let items = {
  items: [
    {
      _id: 1,
      name: "Recently played",
      icon: "https://previews.123rf.com/images/aratehortua/aratehortua2001/aratehortua200100022/138417489-vector-cartoon-low-poly-man-with-headphones-character.jpg"
    },
    {
      _id: 2,
      "name": "Recommended playlists",
      icon: "https://previews.123rf.com/images/belchonock/belchonock1801/belchonock180143844/94540927-musical-instruments-on-wooden-background.jpg"
    },
    {
      _id: 3,
      name: "New releases",
      icon: "https://media.altphotos.com/cache/images/2017/08/08/09/752/trumpet-outdoors-man.jpg"
    }
  ]
};

describe('Browse all content component', () => {
  let component;
  beforeEach(() => {
    component = setup(items);
  })

  it('Should render first wrapper in right way', () => {
    const wrapper = findByTestAttr(component, "first-wrapper");
    expect(wrapper.length).toBe(1);
  });

  it('Should render second wrapper in right way', () => {
    const wrapper = findByTestAttr(component, "second-wrapper");
    expect(wrapper.length).toBe(1);
  });

  it('Should render genres card wrapper in right way', () => {
    const wrapper = findByTestAttr(component, "cards-wrapper");
    expect(wrapper.length).toBe(1);
  });


  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(
        <BrowseAllContent items={items.items} />
      )
      expect(wrapper).toMatchSnapshot()
    });
  });

});