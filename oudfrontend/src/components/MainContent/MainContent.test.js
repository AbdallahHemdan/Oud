import React from "react";
import { shallow } from "enzyme";
import MainContent from "./MainContent";
import { findByTestAttr } from "./../../utils/index";

const setup = (props = {}) => {
  const component = shallow(<MainContent {...props} />);
  return component;
};

describe("Main content component", () => {
  let component;
  beforeEach(() => {
    const props = {
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
    component = setup(props);
  });

  it("Should Render main content wrapper", () => {
    const wrapper = findByTestAttr(component, "main-content");
    expect(wrapper.length).toBe(1);
  });

  it("Should Render music content wrapper", () => {
    const wrapper = findByTestAttr(component, "music-content");
    expect(wrapper.length).toBe(1);
  });

  it("Should Render music item wrapper", () => {
    const wrapper = findByTestAttr(component, "music-item");
    expect(wrapper.length).toBe(1);
  });
});
