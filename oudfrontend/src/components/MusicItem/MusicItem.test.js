import React from "react";
import { shallow } from "enzyme";
import MusicItem from "./MusicItem";
import { findByTestAttr } from "../../utils/index";

const setup = (props = {}) => {
  const component = shallow(<MusicItem {...props} />);
  return component;
};


const item = {
  item: {
    _id: 1,
    name: "Recently played",
    icon: "http://lorempixel.com/640/480/cats",
  },
};

describe("Music Item component", () => {
  let component;
  beforeEach(() => {
    const props = item;
    component = setup(props);
  });

  it('Should the category header in right way', () => {
    const wrapper = findByTestAttr(component, "category-header");
    expect(wrapper.length).toBe(1);
  });
  it('Should the category body in right way', () => {
    const wrapper = findByTestAttr(component, "category-body");
    expect(wrapper.length).toBe(1);
  });
  it('Should the music item container in right way', () => {
    const wrapper = findByTestAttr(component, "music-item-container");
    expect(wrapper.length).toBe(1);
  });

  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(
        <MusicItem item={item} />
      )
      expect(wrapper).toMatchSnapshot()
    });
  });

});
