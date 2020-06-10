import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import MusicCard from "./MusicCard.js";
import { findByTestAttr } from "./../../utils/index";

const setup = (props = {}) => {
  const component = shallow(<MusicCard.WrappedComponent {...props} />);
  return component;
};

describe("Music Card Component", () => {
  let component;
  beforeEach(() => {
    const item = {
      id: "1",
      name: "Fitness Araby",
      owner: "Hemdan",
      collaborative: true,
      description: "Workout fitness music",
      public: true,
      image:
        "https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg",
      type: "playlist"
    };
    const props = {
      item: item
    };
    component = setup(props);
  });

  it("Should render Card container in right way", () => {
    const wrapper = findByTestAttr(component, "card-container");
    expect(wrapper.length).toBe(1);
  });

  it("Should render play-circle icon in right way", () => {
    component.setState({ playBtn: true });
    const wrapper = findByTestAttr(component, "play-circle");
    expect(component.state().playBtn).toBeTruthy();
    expect(wrapper.length).toBe(1);
  });

  it("Should render playlist image in right way", () => {
    const wrapper = findByTestAttr(component, "playlist-image");
    expect(wrapper.length).toBe(1);
  });

  it("Should render playlist title in right way", () => {
    const wrapper = findByTestAttr(component, "playlist-title");
    expect(wrapper.length).toBe(1);
  });

  it("Should render playlist link in right way", () => {
    const wrapper = findByTestAttr(component, "playlist-link");
    expect(wrapper.length).toBe(1);
  });

  it("Should render card overlay in right way", () => {
    const wrapper = findByTestAttr(component, "overlay");
    expect(wrapper.length).toBe(1);
  });
});
