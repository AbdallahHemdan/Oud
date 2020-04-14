import React from "React";
import renderer from "react-test-renderer";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import checkPropTypes from "check-prop-types";
import Player from "./../Player/Player";
import PlayerBarLeft from "./../Player/PlayingBarLeft";
import PlayerBarCenter from "./../Player/PlayerBarCenter";
import PlayerBarRight from "./../Player/PlayerBarRight";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("player component", () => {
  describe("player bar left", () => {});
  describe("player bar center", () => {});
  describe("player bar right", () => {});
});
