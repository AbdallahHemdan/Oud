import React from "react";
import WebPlayer from "../Player";
import renderer from "react-test-renderer";
// import { cleanup } from "@testing-library/react";
import Enzyme, { shallow, mount } from "enzyme";

//testing whether the WebPlayer component renders.
describe("Web Player component", () => {
  test("renders", () => {
    const wrapper = shallow(<WebPlayer />);
    expect(wrapper.exists()).toBe(true);
  });
  test("snap shot", () => {
    const wrapper = shallow(<WebPlayer />);
    expect(wrapper).toMatchSnapshot();
  });
});
