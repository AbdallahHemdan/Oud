import React from "react";
import WebPlayer from "../Player";
import { cleanup, render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import Shuffle from "../../../assets/images/icons/shuffle.png";
import Volume from "../../../assets/images/icons/volume.png";
import Repeat from "../../../assets/images/icons/repeat.png";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import waitUntil from "async-wait-until";
import _ from "lodash";
import { Howl } from "howler";

const sound = new Howl({
  src: ["https://cdn1.esm3.com//music/10028/m289005.mp3"],
  autoplay: false,
  loop: false,
  volume: 0.65,
  mute: false,
  html5: true,
  format: ["mp3"]
});

afterEach(cleanup);

describe("Web Player component", () => {
  test("renders", () => {
    const wrapper = shallow(<WebPlayer />);
    expect(wrapper.exists()).toBe(true);
  });

  it("Snapshot testing for the Web PLayer component", () => {
    const { asFragment } = render(<WebPlayer />);

    expect(asFragment(<WebPlayer />)).toMatchSnapshot();
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
    //it is not logical to test howler as it a third-part library and it is difficult to mock it
    const mock = new MockAdapter(axios);
    mock.onPost().reply(204);
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
        audioUrl: "https://cdn1.esm3.com//music/10028/m289005.mp3",
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
    const wrapper = mount(<WebPlayer />);
    const inst = wrapper.instance();
    inst.fetchTrackInfo();
    await waitUntil(() => {
      return !_.isEqual(wrapper.state("fetched"), false);
    });
    expect(wrapper.state("playing")).toBe(false);
    wrapper.find(".play").simulate("click");
    // await waitUntil(() => {
    //   return _.isEqual(wrapper.state("playing"), true);
    // });
    expect(wrapper.state("playing")).toBe(false);
    done();
  });

  // test("test click on progress bar", async done => {
  //   const mock = new MockAdapter(axios);
  //   mock.onPost().reply(204);
  //   mock.onGet("http://localhost:3000/me/player/currently-playing").reply(200, {
  //     device: {
  //       id: "74ASZWbe4lXaubB36ztrGX",
  //       isActive: true,
  //       isPrivateSession: false,
  //       name: "Oud test device",
  //       type: "Laptop",
  //       volumePercent: 65
  //     },
  //     progressMs: 0,
  //     isPlaying: false,
  //     shuffleState: false,
  //     repeatState: "off",
  //     currentlyPlayingType: "unknown",
  //     item: {
  //       _id: "3256",
  //       name: "Dorak gai",
  //       artists: [
  //         {
  //           _id: "21",
  //           name: "Wegz",
  //           type: "string",
  //           image: "string"
  //         }
  //       ],
  //       albumId: "50",
  //       type: "track",
  //       audioUrl: "https://cdn1.esm3.com//music/10028/m289005.mp3",
  //       duartion: 4.27,
  //       views: 100000
  //     },
  //     actions: {
  //       interrupting_playback: true,
  //       pausing: false,
  //       resuming: false,
  //       seeking: false,
  //       skipping_next: false,
  //       skipping_prev: false,
  //       toggling_repeat_context: false,
  //       toggling_shuffle: false,
  //       toggling_repeat_track: false,
  //       transferring_playback: false
  //     },
  //     context: {
  //       type: "playlist",
  //       id: "53"
  //     }
  //   });
  //   const wrapper = mount(<WebPlayer />);
  //   const inst = wrapper.instance();
  //   inst.fetchTrackInfo();
  //   await waitUntil(() => {
  //     return !_.isEqual(wrapper.state("fetched"), false);
  //   });
  //   inst.setState({
  //     mouseDown: true,
  //     sound: sound,
  //     playing: true,
  //     duartion: 4.18
  //   })
  // })

  test("handleShuffleState", async done => {
    const mock = new MockAdapter(axios);
    mock.onPost().reply(204);
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
        audioUrl: "https://cdn1.esm3.com//music/10028/m289005.mp3",
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
    const wrapper = mount(<WebPlayer />);
    const inst = wrapper.instance();
    inst.fetchTrackInfo();
    await waitUntil(() => {
      return !_.isEqual(wrapper.state("fetched"), false);
    });
    inst.handleShuffleState();
    const shuffle = wrapper.state("shuffleState");
    await waitUntil(() => {
      return _.isEqual(
        wrapper.state("shuffleState"),
        !wrapper.state("shuffleState")
      );
    });
    expect(wrapper.state("shuffleState")).toBe(!shuffle);
    done();
  });
});
