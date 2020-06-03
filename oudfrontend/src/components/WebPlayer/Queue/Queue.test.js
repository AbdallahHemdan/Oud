import React from "react";
import { shallow, mount } from "enzyme";
import Queue from "./Queue";
import Track from "./Track";
import { findByTestAttr } from "./../../../utils/index";

const setup = () => {
  const component = shallow(
    <Queue
      tracks={[]}
      trackId="dsfs1v5fd1"
      trackIdx={0}
      onChangeQueueOrder={() => {}}
      player={{}}
      removeTrack={() => {}}
    />
  );
  return component;
};

describe("Queue Component", () => {
  it("rendering the queue", () => {
    const wrapper = setup();
    expect(wrapper.find(".queue-add-to-playlist").exists()).toBe(true);
  });

  it("rendering add to playlist component", () => {
    const wrapper = findByTestAttr(setup(), "queue-add-to-playlist");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue container", () => {
    const wrapper = findByTestAttr(setup(), "queue-container");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue overlay", () => {
    const wrapper = findByTestAttr(setup(), "overlay");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue close button", () => {
    const wrapper = findByTestAttr(setup(), "close-btn");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue track list container", () => {
    const wrapper = findByTestAttr(setup(), "tracks-container");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue menu options", () => {
    const wrapper = findByTestAttr(setup(), "menu");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue dropdown menu options", () => {
    const wrapper = findByTestAttr(setup(), "dropdown-menu");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue dropdown menu delete option", () => {
    const wrapper = findByTestAttr(setup(), "delete-option");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue dropdown menu add to playlist option", () => {
    const wrapper = findByTestAttr(setup(), "add-to-playlist-option");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue dropdown menu copy option", () => {
    const wrapper = findByTestAttr(setup(), "copy-option");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue dropdown menu like option", () => {
    const wrapper = findByTestAttr(setup(), "like-option");
    expect(wrapper.length).toBe(1);
  });

  it("rendering queue: check openQueue utility", () => {
    const wrapper = setup();
    let height = wrapper.state().height;
    expect(height).toBe("0%");
    const instance = wrapper.instance();
    instance.openQueue();
    height = wrapper.state().height;
    expect(height).toBe("60%");
  });

  it("rendering queue: check closeQueue utility", () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.openQueue();
    let height = wrapper.state().height;
    expect(height).toBe("60%");
    instance.closeQueue();
    height = wrapper.state().height;
    expect(height).toBe("0%");
  });

  it("rendering queue: check onSortEnd utility", () => {
    let oldIdx = 0,
      newIdx = 0;
    function onChangeQueueOrder(oldIndex, newIndex) {
      oldIdx = oldIndex;
      newIdx = newIndex;
    }
    const wrapper = shallow(
      <Queue
        tracks={[]}
        trackId="dsfs1v5fd1"
        trackIdx={0}
        onChangeQueueOrder={onChangeQueueOrder}
        player={{}}
        removeTrack={() => {}}
      />
    );
    const instance = wrapper.instance();
    instance.onSortEnd({ oldIndex: 4, newIndex: 6 });
    expect(oldIdx).toBe(4);
    expect(newIdx).toBe(6);
  });

  it("rendering queue: check toggleDropdown utility: block", () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.toggleDropdown(2, "dsf551dc");
    expect(wrapper.state().dropdown).toBe("block");
    expect(wrapper.state().trackIdx).toBe(2);
    expect(wrapper.state().trackId).toBe("dsf551dc");
    expect(wrapper.state().topIdx).toBe(15);
  });

  it("rendering queue: check toggleDropdown utility: none", () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.toggleDropdown(2, "dsf551dc");
    instance.toggleDropdown(2, "dsf551dc");
    expect(wrapper.state().dropdown).toBe("none");
  });

  it("rendering queue: check removeTrack utility", () => {
    let idx = 0,
      id = "45584";
    function removeTrack(trackIdx, trackId) {
      idx = trackIdx;
      id = trackId;
    }
    const wrapper = shallow(
      <Queue
        tracks={[]}
        trackId="dsfs1v5fd1"
        trackIdx={0}
        onChangeQueueOrder={() => {}}
        player={{}}
        removeTrack={removeTrack}
      />
    );
    const instance = wrapper.instance();
    instance.setState({
      trackIdx: 21,
      trackId: "dcsdckmkva5444",
    });
    instance.removeTrack();
    expect(idx).toBe(21);
    expect(id).toBe("dcsdckmkva5444");
    expect(wrapper.state().dropdown).toBe("none");
  });

  it("rendering queue: check likeSong utility", () => {
    let id = "45584";
    function likeSong(trackId) {
      id = trackId;
    }
    const wrapper = shallow(
      <Queue
        tracks={[]}
        trackId="dsfs1v5fd1"
        trackIdx={0}
        onChangeQueueOrder={() => {}}
        player={{}}
        removeTrack={() => {}}
        likeSong={likeSong}
      />
    );
    const instance = wrapper.instance();
    instance.setState({
      trackId: "dcsdckmkva5444",
    });
    instance.likeSong();
    expect(id).toBe("dcsdckmkva5444");
    expect(wrapper.state().likeOption).toBe("Remove from your Liked Songs");
    expect(wrapper.state().dropdown).toBe("none");
  });

  it("rendering queue: check unlikeSong utility", () => {
    let id = "45584";
    function unlikeSong(trackId) {
      id = trackId;
    }
    const wrapper = shallow(
      <Queue
        tracks={[]}
        trackId="dsfs1v5fd1"
        trackIdx={0}
        onChangeQueueOrder={() => {}}
        player={{}}
        removeTrack={() => {}}
        unlikeSong={unlikeSong}
      />
    );
    const instance = wrapper.instance();
    instance.setState({
      trackId: "dcsdckmkva5444",
    });
    instance.unlikeSong();
    expect(id).toBe("dcsdckmkva5444");
    expect(wrapper.state().likeOption).toBe("Save to your Liked Songs");
    expect(wrapper.state().dropdown).toBe("none");
  });

  it("rendering queue: check handleLikeOption utility: call likeSong", () => {
    let id = "45584";
    function likeSong(trackId) {
      id = trackId;
    }
    const wrapper = shallow(
      <Queue
        tracks={[]}
        trackId="dsfs1v5fd1"
        trackIdx={0}
        onChangeQueueOrder={() => {}}
        player={{}}
        removeTrack={() => {}}
        likeSong={likeSong}
      />
    );
    const instance = wrapper.instance();
    instance.setState({
      likeOption: "Save to your Liked Songs",
      trackId: "dcsdckmkva5444",
    });
    instance.handleLikeOption();
    expect(id).toBe("dcsdckmkva5444");
    expect(wrapper.state().likeOption).toBe("Remove from your Liked Songs");
    expect(wrapper.state().dropdown).toBe("none");
  });

  it("rendering queue: check handleLikeOption utility: call unlikeSong", () => {
    let id = "45584";
    function unlikeSong(trackId) {
      id = trackId;
    }
    const wrapper = shallow(
      <Queue
        tracks={[]}
        trackId="dsfs1v5fd1"
        trackIdx={0}
        onChangeQueueOrder={() => {}}
        player={{}}
        removeTrack={() => {}}
        unlikeSong={unlikeSong}
      />
    );
    const instance = wrapper.instance();
    instance.setState({
      likeOption: "Remove from your Liked Songs",
      trackId: "dcsdckmkva5444",
    });
    instance.handleLikeOption();
    expect(id).toBe("dcsdckmkva5444");
    expect(wrapper.state().likeOption).toBe("Save to your Liked Songs");
    expect(wrapper.state().dropdown).toBe("none");
  });

  it("rendering queue: check closeAddToPlaylist utility", () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.closeAddToPlaylist();
    expect(wrapper.state().displayAdd).toBe(false);
  });

  it("rendering queue: check addToPlaylist utility", () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.addToPlaylist();
    expect(wrapper.state().dropdown).toBe("none");
    expect(wrapper.state().displayAdd).toBe(true);
  });

  it("rendering track: the handler", () => {
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={() => {}}
      />
    );
    const wrap = findByTestAttr(wrapper, "handler-control");
    expect(wrap.length).toBe(1);
  });

  it("rendering track: artist image", () => {
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={() => {}}
      />
    );
    expect(wrapper.find(".track-art-work").exists()).toBe(true);
  });

  it("rendering track: play pause button", () => {
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={() => {}}
      />
    );
    const wrap = findByTestAttr(wrapper, "queue-play-btn");
    expect(wrap.length).toBe(1);
  });

  it("rendering track: track name", () => {
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={() => {}}
      />
    );
    const wrap = findByTestAttr(wrapper, "queue-track-name");
    expect(wrap.length).toBe(1);
  });

  it("rendering track: artist name", () => {
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={() => {}}
      />
    );
    const wrap = findByTestAttr(wrapper, "queue-artist-name");
    expect(wrap.length).toBe(1);
  });

  it("rendering track: options ellipsis", () => {
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={() => {}}
      />
    );
    const wrap = findByTestAttr(wrapper, "open-option-menu");
    expect(wrap.length).toBe(1);
  });

  it("rendering track: handlePlayButton utility", () => {
    let trackId, trackIdx;
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
            handlePlayPause: (id, idx) => {
              trackId = id;
              trackIdx = idx;
            },
          },
        }}
        toggleDropdown={() => {}}
        changePlayingState={(state) => {}}
      />
    );
    const playing = wrapper.state().playing;
    wrapper.instance().handlePlayButton();
    expect(wrapper.state().playing).toBe(!playing);
    expect(trackId).toBe("cdscd1");
    expect(trackIdx).toBe(0);
  });

  it("rendering track: togglePlay utility", () => {
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={() => {}}
        changePlayingState={(state) => {}}
      />
    );
    const playing = wrapper.state().playing;
    wrapper.instance().togglePlay();
    expect(wrapper.state().playing).toBe(!playing);
  });

  it("rendering track: handleDropdown utility", () => {
    let trackId, trackIdx;
    const wrapper = shallow(
      <Track
        idx={0}
        id="cdscd1"
        playTrack={{
          current: {
            state: {
              trackId: "cdscd1",
            },
          },
        }}
        toggleDropdown={(idx, id) => {
          trackId = id;
          trackIdx = idx;
        }}
        changePlayingState={(state) => {}}
      />
    );
    wrapper.instance().handleDropdown();
    expect(trackId).toBe("cdscd1");
    expect(trackIdx).toBe(0);
  });
});
