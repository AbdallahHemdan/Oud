import React from "react";
import { shallow, mount } from "enzyme";
import WebPlayer from "./WebPlayer";
import { findByTestAttr } from "./../../utils/index";

const setup = () => {
  const component = shallow(<WebPlayer />);
  return component;
};

describe("Web Player Component", () => {
  it("snapshot testing", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("check redering queue correctly", () => {
    const wrapper = findByTestAttr(setup(), "queue-container");
    expect(wrapper.length).toBe(1);
  });

  it("check redering player correctly", () => {
    const wrapper = findByTestAttr(setup(), "queue-container");
    expect(wrapper.length).toBe(1);
  });

  it("check change love state", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().changeLovedState(true);
    expect(wrapper.state().loved).toBe(true);
  });

  it("check toggle playing state", () => {
    const wrapper = mount(<WebPlayer />);
    const playing = wrapper.state().playing;
    const newPlaying = wrapper.instance().togglePlayingState();
    expect(newPlaying).toBe(!playing);
  });

  it("check change playing, idx, and id state", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().changePlayingState(true, 5, "sjdfhye54dcsc1");
    expect(wrapper.state().playing).toBe(true);
    expect(wrapper.state().trackIdx).toBe(5);
    expect(wrapper.state().trackId).toBe("sjdfhye54dcsc1");
  });

  it("check getPrvious changes index correctly with zero index", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().setState({
      trackIdx: 0,
    });
    const idx = wrapper.instance().getPrevious();
    expect(idx).toBe(0);
  });

  it("check getPrvious changes index correctly with non-zero index", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().setState({
      trackIdx: 5,
    });
    const idx = wrapper.instance().getPrevious();
    expect(idx).toBe(4);
  });

  it("check getNext changes index correctly with end of queue, and repeat context", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().setState({
      queue: [1, 2, 3],
      trackIdx: 2,
    });
    wrapper.instance().playerElement.current.setState({
      repeatState: 1,
    });
    const idx = wrapper.instance().getNext();
    expect(idx).toBe(0);
  });

  it("check getNext changes index correctly with end of queue, and repeat is off", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().setState({
      queue: [1, 2, 3],
      trackIdx: 2,
    });
    wrapper.instance().playerElement.current.setState({
      repeatState: 0,
    });
    const idx = wrapper.instance().getNext();
    expect(idx).toBe(2);
  });

  it("check getNext changes index correctly with end of queue, and repeat track", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().setState({
      queue: [1, 2, 3],
      trackIdx: 2,
    });
    wrapper.instance().playerElement.current.setState({
      repeatState: 2,
    });
    const idx = wrapper.instance().getNext();
    expect(idx).toBe(2);
  });

  it("check getNext changes index correctly with end of queue, normal increase", () => {
    const wrapper = mount(<WebPlayer />);
    wrapper.instance().setState({
      queue: [1, 2, 3],
      trackIdx: 1,
    });
    wrapper.instance().playerElement.current.setState({
      repeatState: 1,
    });
    const idx = wrapper.instance().getNext();
    expect(idx).toBe(2);
  });
});
