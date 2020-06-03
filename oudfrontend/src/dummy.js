import React from "react";
import renderer from "react-test-renderer";
import WebPlayer from "./../Player";
import PlayingBarLeft from "../PlayingBarLeft";
import PlayingBarCenter from "../PlayingBarCenter";
import PlayingBarRight from "../PlayingBarRight";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Howl } from "howler";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import waitUntil from "async-wait-until";
import _ from "lodash";

jest.mock("axios");

Enzyme.configure({ adapter: new EnzymeAdapter() });

let sound = new Howl({
  src: ["https://cdn1.esm3.com//music/10028/m289005.mp3"],
  autoplay: false,
  loop: false,
  volume: 0.65,
  mute: false,
  html5: true,
  onplay: () => {},
  format: ["mp3"],
  onend: () => {},
});

describe("Testing the Web Player Component", () => {
  afterEach(cleanup);
  it("snapshot test for the whole web player component", () => {
    const WebPlayerComponent = renderer.create(<WebPlayer />).toJSON();
    expect(WebPlayerComponent).toMatchSnapshot();
  });

  it("render the web player correctly", () => {
    const WebPlayerComponent = mount(<WebPlayer />);
    expect(WebPlayerComponent.exists()).toBe(true);
  });

  it("test getSoundProgress function", () => {
    sound.seek(178);
    const WebPlayerComponent = shallow(<WebPlayer />);
    const instance = WebPlayerComponent.instance();
    expect(WebPlayerComponent.state().sound).toBeNull();
    WebPlayerComponent.setState({
      sound: sound,
    });
    expect(WebPlayerComponent.state().sound).toEqual(sound);
    WebPlayerComponent.state().sound.play();
    expect(instance.getSoundProgress()).toEqual(
      (sound.seek() / sound.duration()) * 100
    );
  });

  it("test fetchTrack function", async (done) => {
    const data = {
      device: {
        id: "74ASZWbe4lXaubB36ztrGX",
        isActive: true,
        isPrivateSession: false,
        name: "Oud test device",
        type: "Laptop",
        volumePercent: 65,
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
            image: "string",
          },
        ],
        albumId: "50",
        type: "track",
        audioUrl: "https://cdn1.esm3.com//music/10028/m289005.mp3",
        duartion: 4.27,
        views: 100000,
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
        transferring_playback: false,
      },
      context: {
        type: "playlist",
        id: "53",
      },
    };
    const mock = new MockAdapter(axios);
    mock
      .onGet("http://localhost:3000/me/player/currently-playing")
      .reply(200, data);

    const WebPlayerComponent = shallow(<WebPlayer />);
    expect(WebPlayerComponent.state()).toMatchObject({
      sound: null,
      audioUrl: "",
      deviceId: "",
      fetched: false,
      progress: 0,
      playing: false,
      current: "0.00",
      trackName: "",
      artistName: "",
      duration: "0.00",
      mouseDown: false,
      shuffleState: false,
      repeatState: false,
      volume: 1.0,
      muteState: false,
    });
    WebPlayerComponent.instance().fetchTrackInfo();
    await waitUntil(() => {
      return _.isEqual(WebPlayerComponent.state.fetched, true);
    });
    expect(WebPlayerComponent.state()).toMatchObject({
      deviceId: "74ASZWbe4lXaubB36ztrGX",
      progress: 0,
      playing: false,
      shuffleState: false,
      repeatState: false,
      audioUrl: "https://cdn1.esm3.com//music/10028/m289005.mp3",
      trackName: "Dorak gai",
      artistName: "Wegz",
      duration: 4.27,
      volume: 65,
      fetched: true,
    });
    done();
  });

  const defaultProps = {
      playing: false,
      handlePrev: () => {},
      handlePlayPause: () => {},
      handleNext: () => {},
    },
    LeftPlayer = (props) => (
      <PlayingBarLeft
        playing={props.playing}
        handlePrev={props.handlePrev}
        handlePlayPause={props.handlePlayPause}
        handleNext={props.handleNext}
      />
    );

  describe("Testing the playing bar left part", () => {
    it("rendering the play button", () => {
      const PlayerLeftComponent = mount(LeftPlayer(defaultProps)).find(".play");
      expect(PlayerLeftComponent.exists()).toEqual(true);
    });

    it("rendering the pause button", () => {
      const PlayerLeftComponent = mount(
        LeftPlayer({
          playing: true,
          handlePrev: () => {},
          handlePlayPause: () => {},
          handleNext: () => {},
        })
      ).find(".pause");
      expect(PlayerLeftComponent.exists()).toEqual(true);
    });

    it("test prop types of the left part", () => {
      const PlayerLeftComponent = mount(LeftPlayer(defaultProps));
      expect(PlayerLeftComponent.prop("playing")).toEqual(false);
      expect(PlayerLeftComponent.prop("handlePlayPause")).toBeInstanceOf(
        Function
      );
      expect(PlayerLeftComponent.prop("handlePrev")).toBeInstanceOf(Function);
      expect(PlayerLeftComponent.prop("handleNext")).toBeInstanceOf(Function);
    });
  });

  const RightPlayer = (props) => <PlayingBarRight {...props} />;
  describe("Testing the playing bar right part", () => {
    it("rendering shuffle, mute, and repeat buttons disabled", () => {
      const PlayerRightComponent = mount(
        RightPlayer({
          shuffleState: false,
          repeatState: false,
          volumeState: false,
          volume: 0.65,
          handleShuffleState: () => {},
          handleRepeatState: () => {},
          handleMuteState: () => {},
          setMouseDown: () => {},
          onVolumeClick: () => {},
          mouseUp: () => {},
        })
      );
      expect(PlayerRightComponent.find(".shuffle").exists()).toEqual(true);
      expect(PlayerRightComponent.find(".repeat").exists()).toEqual(true);
      expect(PlayerRightComponent.find(".volume").exists()).toEqual(true);

      expect(PlayerRightComponent.prop("shuffleState")).toEqual(false);
      expect(PlayerRightComponent.prop("repeatState")).toEqual(false);
      expect(PlayerRightComponent.prop("volumeState")).toEqual(false);
    });

    it("rendering shuffle, mute, and repeat buttons enabled", () => {
      const PlayerRightComponent = mount(
        RightPlayer({
          shuffleState: true,
          repeatState: true,
          volumeState: true,
          volume: 0.65,
          handleShuffleState: () => {},
          handleRepeatState: () => {},
          handleMuteState: () => {},
          setMouseDown: () => {},
          onVolumeClick: () => {},
          mouseUp: () => {},
        })
      );
      expect(PlayerRightComponent.find(".shuffle").exists()).toEqual(true);
      expect(PlayerRightComponent.find(".repeat").exists()).toEqual(true);
      expect(PlayerRightComponent.find(".volume").exists()).toEqual(true);

      expect(PlayerRightComponent.prop("shuffleState")).toEqual(true);
      expect(PlayerRightComponent.prop("repeatState")).toEqual(true);
      expect(PlayerRightComponent.prop("volumeState")).toEqual(true);
    });

    it("rendering right bar props", () => {
      const PlayerRightComponent = mount(
        RightPlayer({
          shuffleState: true,
          repeatState: true,
          volumeState: true,
          volume: 0.65,
          handleShuffleState: () => {},
          handleRepeatState: () => {},
          handleMuteState: () => {},
          setMouseDown: () => {},
          onVolumeClick: () => {},
          mouseUp: () => {},
        })
      );
      expect(PlayerRightComponent.prop("shuffleState")).toEqual(true);
      expect(PlayerRightComponent.prop("repeatState")).toEqual(true);
      expect(PlayerRightComponent.prop("volumeState")).toEqual(true);
      expect(PlayerRightComponent.prop("handleShuffleState")).toBeInstanceOf(
        Function
      );
      expect(PlayerRightComponent.prop("handleRepeatState")).toBeInstanceOf(
        Function
      );
      expect(PlayerRightComponent.prop("handleMuteState")).toBeInstanceOf(
        Function
      );
      expect(PlayerRightComponent.prop("setMouseDown")).toBeInstanceOf(
        Function
      );
      expect(PlayerRightComponent.prop("onVolumeClick")).toBeInstanceOf(
        Function
      );
      expect(PlayerRightComponent.prop("mouseUp")).toBeInstanceOf(Function);
    });
  });

  const MiddlePlayer = (props) => <PlayingBarCenter {...props} />;
  describe("Testing the playing bar middle part", () => {
    it("rendering the middle part of the player with default values", () => {
      const PlayerCenterComponent = mount(
        MiddlePlayer({
          trackName: "",
          artistName: "",
          current: "",
          progress: "",
          duration: "",
          setMouseDown: () => {},
          onProgressClick: () => {},
          mouseUp: () => {},
        })
      );
      expect(PlayerCenterComponent.find(".artist-name").text()).toEqual("");
      expect(PlayerCenterComponent.find(".track-name").text()).toEqual("");
      expect(PlayerCenterComponent.find(".remaining").text()).toEqual("");
      expect(PlayerCenterComponent.find(".current").text()).toEqual("");
    });

    it("testing middle part props", () => {
      const PlayerCenterComponent = mount(
        MiddlePlayer({
          trackName: "Dorak gai",
          artistName: "Wegz",
          current: "2:45",
          progress: "0.65",
          duration: "4:18",
          setMouseDown: () => {},
          onProgressClick: () => {},
          mouseUp: () => {},
        })
      );
      expect(PlayerCenterComponent.prop("trackName")).toEqual("Dorak gai");
      expect(PlayerCenterComponent.prop("artistName")).toEqual("Wegz");
      expect(PlayerCenterComponent.prop("current")).toEqual("2:45");
      expect(PlayerCenterComponent.prop("progress")).toEqual("0.65");
      expect(PlayerCenterComponent.prop("duration")).toEqual("4:18");
      expect(PlayerCenterComponent.prop("setMouseDown")).toBeInstanceOf(
        Function
      );
      expect(PlayerCenterComponent.prop("onProgressClick")).toBeInstanceOf(
        Function
      );
      expect(PlayerCenterComponent.prop("mouseUp")).toBeInstanceOf(Function);
    });
  });
});
