import React from "react";
import { shallow, mount } from "enzyme";
import LowerContainer from "./LowerContainer";
import About from "./About";
import Albums from "./Albums";
import Popular from "./Popular";
import RelatedArtists from "./RelatedArtists";
const setup = (artistId) => {
  const component = shallow(
    <LowerContainer artistId={artistId} bio={"test artist biography"} />
  );
  return component;
};

describe("artist from user view component: testing lower part", () => {
  let component;
  beforeEach(() => {
    component = setup("1");
  });

  it("redndering about component", () => {
    const wrapper = mount(<About bio={"test artist biography"} />);
    expect(wrapper.find(".artist-bio").text()).toBe("test artist biography");
  });

  describe("redndering different types of albums depending on the type from the same component", () => {
    it("artist albums: type = 0", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={0} />);
      expect(wrapper.find("h5").text()).toBe("Albums");
    });
    it("artist singles: type = 1", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={1} />);
      expect(wrapper.find("h5").text()).toBe("Singles and EPs");
    });
    it("artist compilations: type = 2", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={2} />);
      expect(wrapper.find("h5").text()).toBe("Compilations");
    });
    it("artist appears on: type = 3", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={3} />);
      expect(wrapper.find("h5").text()).toBe("Appears On");
    });
  });
  it("redndering popular component", () => {
    const wrapper = mount(<Popular artistId={"1"} />);
    expect(wrapper.find("h5").text()).toBe("Popular");
  });
  it("redndering related artists component", () => {
    const wrapper = mount(<RelatedArtists artistId={"1"} />);
    expect(wrapper.find(".cards").exists()).toBe(true);
  });
  it("redndering the whole lower components", () => {
    const wrapper = mount(
      <LowerContainer artistId={"1"} bio={"test artist biography"} />
    );
    expect(wrapper.find(".LowerContainer").exists()).toBe(true);
  });
});
