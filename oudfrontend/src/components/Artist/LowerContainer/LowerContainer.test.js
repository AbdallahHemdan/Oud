import React from "react";
import { shallow, mount } from "enzyme";
import LowerContainer from "./LowerContainer";
import About from "./About";
import Albums from "./Albums";
import Popular from "./Popular";
import RelatedArtists from "./RelatedArtists";
import { findByTestAttr } from "./../../../utils/index";
const setup = (artistId) => {
  const component = shallow(
    <LowerContainer artistId={artistId} bio={"test artist biography"} />
  );
  return component;
};

describe("artist from user view component: testing lower part", () => {
  let component;
  beforeEach(() => {
    component = setup("1");
  });

  it("redndering about component", () => {
    const wrapper = shallow(<About bio={"test artist biography"} />);
    expect(wrapper.find(".artist-bio").text()).toBe("test artist biography");
  });

  describe("redndering different types of albums depending on the type from the same component", () => {
    const albums = [
      {
        _id: "1",
        album_type: "string",
        album_group: "string",
        artists: [
          {
            _id: "1",
            displayName: "Michael",
            type: "string",
            images: ["string"],
          },
        ],
        image:
          "https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg",
        name: "Album",
        type: "string",
      },
      {
        _id: "2",
        album_type: "string",
        album_group: "string",
        artists: [
          {
            _id: "1",
            displayName: "Michael",
            type: "string",
            images: ["string"],
          },
        ],
        image:
          "https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg",
        name: "Album",
        type: "string",
      },
      {
        _id: "3",
        album_type: "string",
        album_group: "string",
        artists: [
          {
            _id: "1",
            displayName: "Michael",
            type: "string",
            images: ["string"],
          },
        ],
        image:
          "https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg",
        name: "Album",
        type: "string",
      },
    ];
    it("artist albums: type = 0", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={0} />);
      expect(wrapper.find("h5").text()).toBe("Albums");
    });
    it("artist singles: type = 1", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={1} />);
      expect(wrapper.find("h5").text()).toBe("Singles and EPs");
    });
    it("artist compilations: type = 2", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={2} />);
      expect(wrapper.find("h5").text()).toBe("Compilations");
    });
    it("artist appears on: type = 3", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={3} />);
      expect(wrapper.find("h5").text()).toBe("Appears On");
    });
    it("check constructAlbumItems utility which builds the items for the MusicCard", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={3} />);
      const instance = wrapper.instance();
      instance.constructAlbumItems(albums);
      expect(wrapper.state().items.length).toBe(3);
      expect(wrapper.state().items[0].id).toBe("1");
      expect(wrapper.state().items[0].name).toBe("Album");
      expect(wrapper.state().items[0].owner).toBe("Michael");
    });
    it("check handleSeeMore utility", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={3} />);
      const seeMore = wrapper.state().seeMore;
      const instance = wrapper.instance();
      instance.handleSeeMore();
      expect(wrapper.state().seeMore).toBe(!seeMore);
    });
    it("check handleSeeLess utility", () => {
      const wrapper = shallow(<Albums artistId={"1"} type={3} />);
      const seeMore = wrapper.state().seeMore;
      const instance = wrapper.instance();
      instance.handleSeeLess();
      expect(wrapper.state().seeMore).toBe(!seeMore);
    });
  });
  it("redndering popular component", () => {
    const wrapper = mount(<Popular artistId={"1"} />);
    expect(wrapper.find("h5").text()).toBe("Popular");
  });
  const artists = [
    {
      _id: "1",
      genres: [
        {
          _id: "string",
          name: "string",
        },
      ],
      images: [
        "https://lh3.googleusercontent.com/xF5L9BH577HdSWzt0tQnY1w9Gl5VTh2cKPKV0cUYFexjLyOrYF54xB2NKHYItHv_8mfns-dVEbuJeNn5j793YYA",
      ],
      displayName: "Wegz",
      bio: "string",
      popularSongs: [
        {
          _id: "string",
          name: "string",
          artists: [
            {
              _id: "string",
              displayName: "string",
              type: "string",
              images: ["string"],
            },
          ],
          albumId: "string",
          album: {
            _id: "string",
            album_type: "string",
            album_group: "string",
            artists: [
              {
                _id: "string",
                displayName: "string",
                type: "string",
                images: ["string"],
              },
            ],
            image: "string",
            name: "string",
            type: "string",
          },
          type: "string",
          duartion: 0,
          views: 0,
        },
      ],
      type: "artist",
    },
    {
      _id: "2",
      genres: [
        {
          _id: "string",
          name: "string",
        },
      ],
      images: [
        "https://lh3.googleusercontent.com/xF5L9BH577HdSWzt0tQnY1w9Gl5VTh2cKPKV0cUYFexjLyOrYF54xB2NKHYItHv_8mfns-dVEbuJeNn5j793YYA",
      ],
      displayName: "Wegz",
      bio: "string",
      popularSongs: [
        {
          _id: "string",
          name: "string",
          artists: [
            {
              _id: "string",
              displayName: "string",
              type: "string",
              images: ["string"],
            },
          ],
          albumId: "string",
          album: {
            _id: "string",
            album_type: "string",
            album_group: "string",
            artists: [
              {
                _id: "string",
                displayName: "string",
                type: "string",
                images: ["string"],
              },
            ],
            image: "string",
            name: "string",
            type: "string",
          },
          type: "string",
          duartion: 0,
          views: 0,
        },
      ],
      type: "artist",
    },
  ];
  it("redndering related artists component", () => {
    const wrapper = mount(<RelatedArtists artistId={"1"} />);
    expect(wrapper.find(".cards").exists()).toBe(true);
  });

  it("redndering related artists component: test constructArtistItems utility", () => {
    const wrapper = shallow(<RelatedArtists artistId={"1"} />);
    const instance = wrapper.instance();
    instance.constructArtistItems(artists);
    expect(wrapper.state().items.length).toBe(2);
    expect(wrapper.state().items[0].id).toBe("1");
    expect(wrapper.state().items[0].name).toBe("Wegz");
    expect(wrapper.state().items[0].owner).toBe("Wegz");
  });

  it("redndering related artists component: test constructTracksItems utility", () => {
    const wrapper = shallow(<RelatedArtists artistId={"1"} />);
    const instance = wrapper.instance();
    instance.constructArtistItems(artists);
    instance.constructTracksItems(artists);
    expect(wrapper.state().items.length).toBe(2);
    expect(wrapper.state().popularSongs.length).toBe(2);
    expect(wrapper.state().popularSongs[0].length).toBe(1);
    expect(wrapper.state().popularSongs[1].length).toBe(1);
  });

  // it("redndering related artists component", () => {
  //   const wrapper = mount(<RelatedArtists artistId={"1"} />);
  //   expect(wrapper.find(".cards").exists()).toBe(true);
  // });

  it("redndering the whole lower components", () => {
    const wrapper = shallow(
      <LowerContainer artistId={"1"} bio={"test artist biography"} />
    );
    expect(wrapper.find(".LowerContainer").exists()).toBe(true);
  });

  it("check about route", () => {
    const wrapper = findByTestAttr(component, "about-artist-lower");
    expect(wrapper.length).toBe(1);
  });
  it("check test artist lower route", () => {
    const wrapper = findByTestAttr(component, "test-artist-lower");
    expect(wrapper.length).toBe(2);
  });
  it("check albums route", () => {
    const wrapper = findByTestAttr(component, "test-artist-albums");
    expect(wrapper.length).toBe(0);
  });
  it("check singles route", () => {
    const wrapper = findByTestAttr(component, "test-artist-singles");
    expect(wrapper.length).toBe(0);
  });
  it("check compilations route", () => {
    const wrapper = findByTestAttr(component, "test-artist-compilations");
    expect(wrapper.length).toBe(0);
  });
  it("check appears on route", () => {
    const wrapper = findByTestAttr(component, "test-artist-appears-on");
    expect(wrapper.length).toBe(0);
  });
});
