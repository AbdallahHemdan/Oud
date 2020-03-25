import React from "react";
import WebPlayer from "../Player";
import { cleanup, create } from "@testing-library/react";
import { shallow } from "enzyme";
import Shuffle from "../../../assets/images/icons/shuffle.png";
import Volume from "../../../assets/images/icons/volume.png";
import Repeat from "../../../assets/images/icons/repeat.png";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import waitUntil from "async-wait-until";
import _ from "lodash";
afterEach(cleanup);

describe("Web Player component", () => {
  test("renders", () => {
    const wrapper = shallow(<WebPlayer />);
    expect(wrapper.exists()).toBe(true);
  });

  test("snap shot", () => {
    const wrapper = shallow(<WebPlayer />);
    expect(wrapper).toMatchSnapshot();
  });

  test("tests fetch track info to the state", async done => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/me/player/currently-playing").reply(200, {
      device: {
        id: "74ASZWbe4lXaubB36ztrGX",
        isActive: true,
        isPrivateSession: false,
        name: "Oud test device",
        type: "Laptop",
        volumePercent: 65
      },
      progressMs: 0,
      isPlaying: false,
      shuffleState: false,
      repeatState: "off",
      currentlyPlayingType: "unknown",
      item: {
        _id: "3256",
        name: "Dorak gai",
        artists: [
          {
            _id: "21",
            name: "Wegz",
            type: "string",
            image: "string"
          }
        ],
        albumId: "50",
        type: "track",
        audioUrl: "/dorak-gai",
        duartion: 4.27,
        views: 100000
      },
      actions: {
        interrupting_playback: true,
        pausing: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false,
        toggling_repeat_context: false,
        toggling_shuffle: false,
        toggling_repeat_track: false,
        transferring_playback: false
      },
      context: {
        type: "playlist",
        id: "53"
      }
    });

    const wrapper = shallow(<WebPlayer />);
    expect(wrapper.state()).toMatchObject({
      deviceId: "",
      fetched: false,
      progress: 0,
      playing: false,
      current: "0.00",
      trackName: "",
      artistName: "",
      duration: "0.00",
      mouseDown: false,
      shuffleButton: Shuffle,
      shuffleState: false,
      repeatButton: Repeat,
      repeatState: false,
      volume: 1.0,
      volumeButton: Volume,
      muteState: false
    });
    wrapper.instance().fetchTrackInfo();
    await waitUntil(() => {
      return !_.isEqual(wrapper.state.fetched, false);
    });
    expect(wrapper.state()).toMatchObject({
      deviceId: "74ASZWbe4lXaubB36ztrGX",
      fetched: true,
      progress: 0,
      playing: false,
      current: "0.00",
      trackName: "Dorak gai",
      artistName: "Wegz",
      duration: 4.27,
      mouseDown: false,
      shuffleButton: Shuffle,
      shuffleState: false,
      repeatButton: Repeat,
      repeatState: false,
      volume: 65,
      volumeButton: Volume,
      muteState: false
    });
    done();
  });

  test("test play button", async done => {
    //PUT request
    const mock = new MockAdapter(axios);
    mock.onPost().reply(204);
    const wrapper = create(<WebPlayer />);
    let inst = wrapper.getInstance();
    expect(inst.state("playing")).toBe(false);
    inst.play();
    await waitUntil(() => {
      return _.isEqual(inst.state("playing"), true);
    });
    expect(inst.state("playing")).toBe(true);
    done();
  });
});
