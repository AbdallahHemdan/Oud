import React from "react";
import AddToPlaylist from "./addToPlaylist";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const props = {
  close: jest.fn(),
};

const setup = (props) => {
  return shallow(<AddToPlaylist {...props} />);
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-testid="${val}"]`);
};
/*
Rendering tests
*/

describe("CreatePlaylist Component", () => {
  describe("testing that CreatePlaylist renders Correctly", () => {
    let component;
    beforeEach(() => {
      component = setup();
    });
    it("renders createPlaylist component", () => {
      component.setState({ createPlaylist: true });
      const wrapper = findByTestAttr(component, "createPlaylist");
      expect(wrapper.length).toBe(1);
    });
    it("renders createPlaylist component", () => {
      component.setState({ createPlaylist: false });
      const wrapper = findByTestAttr(component, "createPlaylist");
      expect(wrapper.length).toBe(0);
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "closeButton");
      expect(wrapper.length).toBe(1);
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "addToPlaylist");
      expect(wrapper.length).toBe(1);
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "first-wrapper");
      expect(wrapper.length).toBe(1);
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "createNew");
      expect(wrapper.text()).toBe("NEW PLAYLIST");
      expect(wrapper.length).toBe(1);
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "title");
      expect(wrapper.length).toBe(1);
      expect(wrapper.text()).toBe("Add To playlist");
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "second-wrapper");
      expect(wrapper.length).toBe(1);
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "cards-wrapper");
      expect(wrapper.length).toBe(1);
    });
    it("renders createPlaylist component", () => {
      const wrapper = findByTestAttr(component, "cards");
      expect(wrapper.length).toBe(0);
    });
  });
  describe("testing that CreatePlaylist renders Correctly", () => {
    let component;
    beforeEach(() => {
      component = setup(props);
      component.setState({ display: true });
    });
    it("close Button", () => {
      component.setState({ display: true });
      const wrapper = findByTestAttr(component, "closeButton");
      expect(component.state().display).toBeTruthy();
      wrapper.simulate("click");
      expect(component.state().display).toBeFalsy();
    });
    it("new playlist Button", () => {
      component.setState({ createPlaylist: false });
      const wrapper = findByTestAttr(component, "createNew");
      expect(component.state().createPlaylist).toBeFalsy();
      wrapper.simulate("click");
      expect(component.state().createPlaylist).toBeTruthy();
    });
  });
  describe("componentWillReceiveProps()", () => {
    it("change the display state", () => {
      const component = shallow(<AddToPlaylist display={true} />);
      expect(component.state().display).toBe(true);
      component.setProps({ display: false });
      expect(component.state().display).toBe(false);
    });
    it("does not change the display state", () => {
      const component = shallow(<AddToPlaylist display={true} />);
      expect(component.state().display).toBe(true);
      component.setProps({ display: true });
      expect(component.state().display).toBe(true);
    });
  });
  describe("snapshot test", () => {
    it("renders correctly", () => {
      const tree = renderer.create(<AddToPlaylist />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
