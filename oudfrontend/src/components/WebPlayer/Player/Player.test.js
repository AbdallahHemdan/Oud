import React from "react";
import { shallow, mount } from "enzyme";
import Player from "./Player";
import axios from "axios";
import PlayingBarCenter from "./PlayingBarCenter";
import PlayingBarLeft from "./PlayingBarLeft";
import PlayingBarRight from "./PlayingBarRight";
import { findByTestAttr } from "./../../../utils/index";

const mockState = {
  audioUrl: "https://cdn1.esm3.com//music/10028/m289005.mp3",
  progress: 0,
  playing: false,
  current: 0,
  trackName: "Dorak Gai",
  artistName: "Wegz",
  duration: 4.28,
  shuffleState: false,
  repeatState: 0,
  volume: 100,
  muteState: false,
  fetched: true,
  trackId: "ahfslndnc4f4ds4c",
};
const setup = () => {
  const component = shallow(
    <Player
      trackIdx={0}
      playing={false}
      queueElement={{}}
      getRequest={(endpoint) => {
        return axios.get(endpoint);
      }}
      putRequest={(endpoint, body = {}) => {
        return axios.put(endpoint, body);
      }}
      postRequest={(endpoint, body = {}) => {
        return axios.post(endpoint, body);
      }}
      fetchQueue={() => {}}
      getNext={() => {
        return 1;
      }}
      getPrevious={() => {
        return 1;
      }}
      changePlayingState={() => {}}
      fetchTrack={() => {}}
    />
  );
  return component;
};
const mountSetup = () => {
  const component = mount(
    <Player
      trackIdx={0}
      playing={false}
      queueElement={{}}
      getRequest={(endpoint) => {
        return axios.get(endpoint);
      }}
      putRequest={(endpoint, body = {}) => {
        return axios.put(endpoint, body);
      }}
      postRequest={(endpoint, body = {}) => {
        return axios.post(endpoint, body);
      }}
      fetchQueue={() => {}}
      getNext={() => {
        return 1;
      }}
      getPrevious={() => {
        return 1;
      }}
      changePlayingState={() => {}}
      fetchTrack={() => {}}
    />
  );
  return component;
};
describe("Testing Player Component and its childern; PlayingBarLeft, PlayingBarCenter, and PlayingBarRight components", () => {
  it("check redering extended artist art", () => {
    const wrapper = findByTestAttr(setup(), "extended-artist-art");
    expect(wrapper.length).toBe(1);
  });
  it("check redering close extended artist art", () => {
    const wrapper = setup().find(".close-thumb");
    expect(wrapper.exists()).toBe(true);
  });
  it("check redering combined parts", () => {
    const wrapper = findByTestAttr(setup(), "web-palyer");
    expect(wrapper.length).toBe(1);
  });
  it("check redering player left part", () => {
    const wrapper = findByTestAttr(setup(), "web-player-left");
    expect(wrapper.length).toBe(1);
  });
  it("check redering player center part", () => {
    const wrapper = findByTestAttr(setup(), "web-player-center");
    expect(wrapper.length).toBe(1);
  });
  it("check redering player right part", () => {
    const wrapper = findByTestAttr(setup(), "web-player-right");
    expect(wrapper.length).toBe(1);
  });
  it("check playTrack action", () => {
    const wrapper = mountSetup();
    wrapper.instance().setState(mockState);
    wrapper
      .instance()
      .playTrack("https://cdn1.esm3.com//music/10028/m289005.mp3");
    expect(wrapper.state().playing).toBe(false);
  });
  it("check onPlay action", () => {
    const wrapper = mountSetup();
    wrapper.instance().setState(mockState);
    wrapper
      .instance()
      .playTrack("https://cdn1.esm3.com//music/10028/m289005.mp3");
    wrapper.instance().onPlay();
    expect(wrapper.state().playing).toBe(true);
    expect(wrapper.state().progress).toBe(0);
    expect(wrapper.state().current).toBe("0.00");
  });
  it("check onEnd action", () => {
    const wrapper = mountSetup();
    wrapper.instance().setState(mockState);
    wrapper
      .instance()
      .playTrack("https://cdn1.esm3.com//music/10028/m289005.mp3");
    wrapper.instance().onEnd();
    expect(wrapper.state().playing).toBe(false);
    expect(wrapper.state().progress).toBe(0);
    expect(wrapper.state().current).toBe("0.00");
  });
  it("check onSeek action", () => {
    const wrapper = mountSetup();
    wrapper.instance().setState(mockState);
    wrapper
      .instance()
      .playTrack("https://cdn1.esm3.com//music/10028/m289005.mp3");
    wrapper.instance().onSeek();
    expect(wrapper.state().progress).toBe(NaN);
  });
  it("check getLoopState utility", () => {
    const wrapper = mountSetup();
    let loop = wrapper.instance().getLoopState("off");
    expect(loop).toBe(false);
    loop = wrapper.instance().getLoopState("track");
    expect(loop).toBe(true);
    loop = wrapper.instance().getLoopState("context");
    expect(loop).toBe(false);
  });
  it("check setMouseDown utility", () => {
    const wrapper = mountSetup();
    const mouseDown = wrapper.state().mouseDown;
    wrapper.instance().setMouseDown(!mouseDown);
    expect(wrapper.state().mouseDown).toBe(!mouseDown);
  });
  it("check handleMuteState action", () => {
    const wrapper = mountSetup();
    const mute = wrapper.state().muteState;
    wrapper.instance().handleMuteState();
    expect(wrapper.state().muteState).toBe(!mute);
    expect(wrapper.state().muteProgress).toBe(1);
    expect(wrapper.state().volume).toBe(0);
  });
  it("check closeThumb action wich close extended artist art", () => {
    const wrapper = mountSetup();
    wrapper.instance().closeThumb();
    expect(wrapper.state().thumbHeight).toBe(0);
    expect(wrapper.state().thumbDisplay).toBe("initial");
  });
  it("check openThumb action wich open extended artist art", () => {
    const wrapper = mountSetup();
    wrapper.instance().openThumb();
    expect(wrapper.state().thumbHeight).toBe("25%");
    expect(wrapper.state().thumbDisplay).toBe("none");
  });

  describe("rendering center player part", () => {
    it("check that the component renders correctly", () => {
      const wrapper = shallow(
        <PlayingBarLeft
          playing={true}
          handlePrev={() => {}}
          handlePlayPause={() => {}}
          handleNext={() => {}}
        />
      );
      expect(wrapper.find(".now-playing-bar-left").exists()).toBe(true);
    });
    it("check the album art, and link renders correctly", () => {
      const wrapper = shallow(
        <PlayingBarLeft
          playing={true}
          handlePrev={() => {}}
          handlePlayPause={() => {}}
          handleNext={() => {}}
        />
      );
      expect(wrapper.find(".ablum-link").exists()).toBe(true);
    });
    it("check the player controls renders correctly", () => {
      const wrapper = shallow(
        <PlayingBarLeft
          playing={true}
          handlePrev={() => {}}
          handlePlayPause={() => {}}
          handleNext={() => {}}
        />
      );
      expect(wrapper.find(".player-controls").exists()).toBe(true);
    });
    it("rendering play button", () => {
      const wrapper = shallow(
        <PlayingBarLeft
          playing={false}
          handlePrev={() => {}}
          handlePlayPause={() => {}}
          handleNext={() => {}}
        />
      );
      expect(wrapper.find(".play").exists()).toBe(true);
    });
    it("rendering pause button", () => {
      const wrapper = shallow(
        <PlayingBarLeft
          playing={true}
          handlePrev={() => {}}
          handlePlayPause={() => {}}
          handleNext={() => {}}
        />
      );
      expect(wrapper.find(".pause").exists()).toBe(true);
    });
    it("rendering next button", () => {
      const wrapper = shallow(
        <PlayingBarLeft
          playing={true}
          handlePrev={() => {}}
          handlePlayPause={() => {}}
          handleNext={() => {}}
        />
      );
      expect(wrapper.find(".next").exists()).toBe(true);
    });
    it("rendering previous button", () => {
      const wrapper = shallow(
        <PlayingBarLeft
          playing={true}
          handlePrev={() => {}}
          handlePlayPause={() => {}}
          handleNext={() => {}}
        />
      );
      expect(wrapper.find(".previous").exists()).toBe(true);
    });
  });

  describe("rendering center player part", () => {
    it("check that the component renders correctly", () => {
      const wrapper = shallow(
        <PlayingBarCenter
          trackName="Dorak Gai"
          artistName="Wegz"
          current="2.10"
          progress="50"
          duration="4.18"
          setMouseDown={() => {}}
          onProgressClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".now-playing-bar-center").exists()).toBe(true);
    });
    it("check that the component renders correctly", () => {
      const wrapper = shallow(
        <PlayingBarCenter
          trackName="Dorak Gai"
          artistName="Wegz"
          current="2.10"
          progress="50"
          duration="4.18"
          setMouseDown={() => {}}
          onProgressClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".now-playing-bar-center").exists()).toBe(true);
    });
    it("check track controls", () => {
      const wrapper = shallow(
        <PlayingBarCenter
          trackName="Dorak Gai"
          artistName="Wegz"
          current="2.10"
          progress="50"
          duration="4.18"
          setMouseDown={() => {}}
          onProgressClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".track-controls").exists()).toBe(true);
    });
  });

  describe("rendering left player part", () => {
    it("check that the component renders correctly", () => {
      const wrapper = shallow(
        <PlayingBarCenter
          trackName="Dorak Gai"
          artistName="Wegz"
          current="2.10"
          progress="50"
          duration="4.18"
          setMouseDown={() => {}}
          onProgressClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".now-playing-bar-center").exists()).toBe(true);
    });
    it("check that the component renders correctly", () => {
      const wrapper = shallow(
        <PlayingBarRight
          trackId="sfdsfds211"
          tshuffleState={false}
          repeatState={0}
          volumeState={false}
          volume={1}
          handleShuffleState={() => {}}
          handleRepeatState={() => {}}
          handleMuteState={() => {}}
          setMouseDown={() => {}}
          onVolumeClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".now-playing-bar-right").exists()).toBe(true);
    });
    it("check conditional rendering love button: love", () => {
      const wrapper = mount(
        <PlayingBarRight
          trackId="sfdsfds211"
          tshuffleState={false}
          repeatState={0}
          volumeState={false}
          volume={1}
          handleShuffleState={() => {}}
          handleRepeatState={() => {}}
          handleMuteState={() => {}}
          setMouseDown={() => {}}
          onVolumeClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      wrapper.instance().setState({
        loved: false,
      });
      expect(wrapper.find(".love").exists()).toBe(true);
    });
    it("check queue button", () => {
      const wrapper = shallow(
        <PlayingBarRight
          trackId="sfdsfds211"
          tshuffleState={false}
          repeatState={0}
          volumeState={false}
          volume={1}
          handleShuffleState={() => {}}
          handleRepeatState={() => {}}
          handleMuteState={() => {}}
          setMouseDown={() => {}}
          onVolumeClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".queue").exists()).toBe(true);
    });
    it("check shuffle button", () => {
      const wrapper = shallow(
        <PlayingBarRight
          trackId="sfdsfds211"
          tshuffleState={false}
          repeatState={0}
          volumeState={false}
          volume={1}
          handleShuffleState={() => {}}
          handleRepeatState={() => {}}
          handleMuteState={() => {}}
          setMouseDown={() => {}}
          onVolumeClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".shuffle").exists()).toBe(true);
    });
    it("check repeat button", () => {
      const wrapper = shallow(
        <PlayingBarRight
          trackId="sfdsfds211"
          tshuffleState={false}
          repeatState={0}
          volumeState={false}
          volume={1}
          handleShuffleState={() => {}}
          handleRepeatState={() => {}}
          handleMuteState={() => {}}
          setMouseDown={() => {}}
          onVolumeClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".repeat").exists()).toBe(true);
    });
    it("check volume button", () => {
      const wrapper = shallow(
        <PlayingBarRight
          trackId="sfdsfds211"
          tshuffleState={false}
          repeatState={0}
          volumeState={false}
          volume={1}
          handleShuffleState={() => {}}
          handleRepeatState={() => {}}
          handleMuteState={() => {}}
          setMouseDown={() => {}}
          onVolumeClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".volume").exists()).toBe(true);
    });
    it("check volume progress bar", () => {
      const wrapper = shallow(
        <PlayingBarRight
          trackId="sfdsfds211"
          tshuffleState={false}
          repeatState={0}
          volumeState={false}
          volume={1}
          handleShuffleState={() => {}}
          handleRepeatState={() => {}}
          handleMuteState={() => {}}
          setMouseDown={() => {}}
          onVolumeClick={() => {}}
          mouseUp={() => {}}
          constructLink={(state) => {}}
        />
      );
      expect(wrapper.find(".progress-bar").exists()).toBe(true);
    });
  });
});
