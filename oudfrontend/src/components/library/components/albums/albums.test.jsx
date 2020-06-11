import React from "react";
import Albums from "./albums.jsx";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => {
  return shallow(<Albums />);
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-testid="${val}"]`);
};
/*
Rendering tests
*/

describe("albums Component", () => {
  describe("testing library albums renders Correctly", () => {
    let component;
    beforeEach(() => {
      component = setup();
    });
    it("renders albums component", () => {
      const wrapper = findByTestAttr(component, "albums");
      expect(wrapper.length).toBe(1);
    });
    it("does not render first-wrapper component", () => {
      component.setState({ recieved: false });
      const wrapper = findByTestAttr(component, "first-wrapper");
      expect(wrapper.length).toBe(0);
    });
    it("does not render second-wrapper component", () => {
      component.setState({ recieved: false });
      const wrapper = findByTestAttr(component, "second-wrapper");
      expect(wrapper.length).toBe(0);
    });
    it("does not render cards-wrapper component", () => {
      component.setState({ recieved: false });
      const wrapper = findByTestAttr(component, "cards-wrapper");
      expect(wrapper.length).toBe(0);
    });
    it("renders first-wrapper component when recieved = true", () => {
      component.setState({ recieved: true });
      const wrapper = findByTestAttr(component, "first-wrapper");
      expect(wrapper.length).toBe(1);
    });
    it("renders second-wrapper component", () => {
      component.setState({ recieved: true });
      const wrapper = findByTestAttr(component, "second-wrapper");
      expect(wrapper.length).toBe(1);
    });
    it("renders cards-wrapper component", () => {
      component.setState({ recieved: true });
      const wrapper = findByTestAttr(component, "cards-wrapper");
      expect(wrapper.length).toBe(1);
    });
    it("renders title component", () => {
      const wrapper = findByTestAttr(component, "title");
      expect(wrapper.length).toBe(1);
      expect(wrapper.text()).toBe("Saved ALBUMS");
    });
    it("renders 1 card component", () => {
      component.setState({ recieved: true, albums: [1] });
      const wrapper = findByTestAttr(component, "cards");
      expect(wrapper.length).toBe(1);
    });
    it("renders 2 cards component", () => {
      component.setState({ recieved: true, albums: [1, 1] });
      const wrapper = findByTestAttr(component, "cards");
      expect(wrapper.length).toBe(2);
    });
    it("renders no cards component when recieved is false", () => {
      component.setState({ albums: [1, 1], recieved: false });
      const wrapper = findByTestAttr(component, "cards");
      expect(wrapper.length).toBe(0);
    });
    it("does not render loading component when recieved is true", () => {
      component.setState({ recieved: true });
      const wrapper = findByTestAttr(component, "loading");
      expect(wrapper.length).toBe(0);
    });
    it("renders loading component when recieved is false", () => {
      component.setState({ recieved: false });
      const wrapper = findByTestAttr(component, "loading");
      expect(wrapper.length).toBe(1);
    });
  });
  describe("testing library albums renders Correctly", () => {
    let component;
    beforeEach(() => {
      component = setup();
    });
    it("checking that recieved is equal to true", () => {
      expect(component.state().recieved).toBe(true);
    });
  });
  describe("snapshot test", () => {
    it("renders correctly", () => {
      const tree = renderer.create(<Albums />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
