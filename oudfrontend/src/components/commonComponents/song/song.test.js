import React from 'react'
import Song from './song'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import checkPropTypes from 'check-prop-types'
import axios from 'axios'
import { isCompositeComponent } from 'react-dom/test-utils';
Enzyme.configure({ adapter: new EnzymeAdapter() });
const fullProps = {
  clickedId: '0',
  handleClick: jest.fn(),
  handlePlay: jest.fn(),
  track: {
    "id": "19",
    "name": "إنسان",
    "artists": [
      {
        "id": "5",
        "name": "حمزة نمرة",
        "type": "shaaby",
        "image": "string"
      },
      {
        "id": "2",
        "name": "Sardeena",
        "type": "Shaaby",
        "image": "string"
      }
    ],
    "albumId": "1",
    "type": "Jazz",
    "audioUrl": "www.Facebook.com"
  },
  album: true,
  addToPlaylist: jest.fn()
}
const falseProps = {
  clickedId: '0',
  handleClick: jest.fn(),
  handlePlay: jest.fn(),
  track: {
    "id": "19",
    "name": "إنسان",
    "artists": [
      {
        "id": "5",
        "name": "حمزة نمرة",
        "type": "shaaby",
        "image": "string"
      },
      {
        "id": "2",
        "name": "Sardeena",
        "type": "Shaaby",
        "image": "string"
      }
    ],
    "album": {
      "name": "dddd"
    },
    "albumId": "1",
    "type": "Jazz",
    "audioUrl": "www.Facebook.com"
  },
  album: false,
  addToPlaylist: jest.fn()

}

jest.mock('axios')
const setup = (props) => {
  return shallow(<Song {...props} />);
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-testid="${val}"]`);
}
describe('song component', () => {
  describe('testing with props', () => {
    let component;
    beforeEach(() => {
      component = setup(fullProps);
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "song")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButton")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songName")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "aristsNames")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "artistName")
      expect(wrapper.length).toBe(2)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "albumName")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdown")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownButton")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownList")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "saveSong")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToQueue")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToPlaylist")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "copy")
      expect(wrapper.length).toBe(1)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songTime")
      expect(wrapper.length).toBe(1)
    })
  })
  describe('testing methods', () => {
    let component;

    beforeEach(() => {
      component = setup(fullProps);
    })
    it('playSongClicked', () => {
      component.setState({ playing: true })
      component.instance().playSongClicked()
      expect(component.state().playing).toBe(false);
    })
    it('handleSaving', () => {
      component.setState({ saved: true })
      component.instance().handleSaving()
      expect(component.state().saved).toBe(false);
    })
    it('handleSaving', () => {
      component.setState({ saved: false })
      component.instance().handleSaving()
      expect(component.state().saved).toBe(true);
    })
    it('handleQueue', () => {
      component.setState({ queued: false })
      component.instance().handleQueue()
      expect(component.state().queued).toBe(true);
    })
    it('handleQueue', () => {
      component.setState({ queued: true })
      component.instance().handleQueue()
      expect(component.state().queued).toBe(false);
    })
    it('redirect', () => {
      component.setState({ redirect: "" })
      component.instance().redirect('root')
      expect(component.state().redirect).toBe("root");
    })
    it('hh', () => {
      component.setState({ displayDropdown: true, clicked: true })
      component.instance().hh()
      expect(component.state().displayDropdown).toBe(false);
    })
    it('toggleDropdown', () => {
      component.setState({ displayDropdown: true })
      component.instance().toggleDropdown()
      expect(component.state().displayDropdown).toBe(false);
    })
    it('editSong ', () => {
      component.setState({ songInfo: false })
      component.instance().editSong()
      expect(component.state().songInfo).toBe(true);
    })
    it('playSongClicked', () => {
      component.setState({ playing: false })
      component.instance().playSongClicked()
      expect(component.state().playing).toBe(true);
    })
    /*it('copy link', ()=>{
      const wrapper = findByTestAttr(component, "copy")
      expect(component.state().link).toBe("")
      wrapper.simulate('click');
      expect(component.state().displayDropdown).toContain("/")
    })*/
    it('toggle dropdown', () => {
      const wrapper = findByTestAttr(component, "dropdownButton")
      expect(component.state().displayDropdown).toBeFalsy()
      wrapper.simulate('click');
      expect(component.state().displayDropdown).toBeTruthy()
    })
    it('like the song', () => {
      const wrapper = findByTestAttr(component, "saveSong")
      //initial states
      expect(component.state().displayDropdown).toBeFalsy()
      expect(component.state().saved).toBeFalsy()
      wrapper.simulate('click')
      expect(component.state().displayDropdown).toBeTruthy()
    })

    it('adds the song to queue', () => {
      const wrapper = findByTestAttr(component, "addToQueue")
      //initial states
      expect(component.state().displayDropdown).toBeFalsy()
      expect(component.state().queued).toBeFalsy()
      wrapper.simulate('click')
      expect(component.state().displayDropdown).toBeTruthy()
      expect(component.state().queued).toBeTruthy()
    })

    it('hover method', () => {
      const wrapper = findByTestAttr(component, "song")
      //initial state
      expect(component.state().hover).toBeFalsy()
      wrapper.simulate('mouseenter')
      expect(component.state().hover).toBeTruthy()
    })
    it('notHover method', () => {
      const wrapper = findByTestAttr(component, "song")
      //initial state
      expect(component.state().hover).toBeFalsy()
      wrapper.simulate('mouseenter')
      expect(component.state().hover).toBeTruthy()
      wrapper.simulate('mouseleave')
      expect(component.state().hover).toBeFalsy()
    })

  })
  describe('testing conditions', () => {
    let component
    beforeEach(() => {
      component = setup(fullProps)
    })
    it('testing cconditional rendering of playButtton image at initial state', () => {
      const wrapper = findByTestAttr(component, "playButtonImage")

      expect(wrapper.prop("src")).not.toBe('play.png')
      expect(wrapper.prop("src")).toBe('musicIcon.png')

    })

    it('testing cconditional rendering of playButtton image when clicked = true', () => {
      component.setState({ clicked: true })
      expect(component.state().clicked).toBeTruthy()
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.prop("src")).toBe('play.png')
      expect(wrapper.prop("src")).not.toBe('musicIcon.png')
    })

    it('testing cconditional rendering of playButtton image when hover = true', () => {
      component.setState({ hover: true })
      expect(component.state().hover).toBeTruthy()
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.prop("src")).toBe('play.png')
      expect(wrapper.prop("src")).not.toBe('musicIcon.png')

    })
    it('testing cconditional rendering of playButtton image when hover = true & clicked = true', () => {
      component.setState({ hover: true, clicked: true })
      expect(component.state().hover).toBeTruthy()
      expect(component.state().clicked).toBeTruthy()
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.prop("src")).toBe('play.png')
      expect(wrapper.prop("src")).not.toBe('musicIcon.png')

    })
    it('testing cconditional rendering of playButtton image when hover = false & clicked = false', () => {
      component.setState({ hover: false, clicked: false })
      expect(component.state().hover).toBeFalsy()
      expect(component.state().clicked).toBeFalsy()
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.prop("src")).not.toBe('play.png')
      expect(wrapper.prop("src")).toBe('musicIcon.png')

    })

    it('testing cconditional rendering of save to liked Songs item of drop down menu at initial state', () => {
      const wrapper = findByTestAttr(component, "saveSong")
      expect(wrapper.text()).toBe('Save to your Liked Songs')
    })
    it('testing cconditional rendering of save to liked Songs item of drop down menu at saved = false', () => {
      component.setState({ saved: false })
      expect(component.state().saved).toBeFalsy()
      const wrapper = findByTestAttr(component, "saveSong")
      expect(wrapper.text()).toBe('Save to your Liked Songs')
    })
    it('testing cconditional rendering of save to liked Songs item of drop down menu at saved = true', () => {
      component.setState({ saved: true })
      expect(component.state().saved).toBeTruthy()
      const wrapper = findByTestAttr(component, "saveSong")
      expect(wrapper.text()).toBe('Remove From Your Liked Songs')
    })
    it('testing cconditional rendering of add to queue item of drop down menu at initial state', () => {
      const wrapper = findByTestAttr(component, "addToQueue")
      expect(wrapper.text()).toBe('Add to Queue')
    })
    it('testing cconditional rendering of add to queue item of drop down menu at queued = true', () => {
      component.setState({ queued: true })
      expect(component.state().queued).toBeTruthy()
      const wrapper = findByTestAttr(component, "addToQueue")
      expect(wrapper.text()).toBe('Remove From Queue')
    })
    it('testing cconditional rendering of add to queue item of drop down menu at queued = false', () => {
      component.setState({ queued: false })
      expect(component.state().queued).toBeFalsy()
      const wrapper = findByTestAttr(component, "addToQueue")
      expect(wrapper.text()).toBe('Add to Queue')
    })
    it('testing cconditional rendering of • when album=true', () => {
      const wrapper = findByTestAttr(component, "comma")
      expect(wrapper.length).toBe(0)
    })
    it('testing cconditional rendering of • when album=false', () => {
      let component = shallow(<Song {...falseProps} />)
      const wrapper = findByTestAttr(component, "comma")
      expect(wrapper.length).toBe(2)
    })
    it('testing cconditional does not render album name album=true', () => {
      const wrapper = findByTestAttr(component, "albumName")
      expect(wrapper.length).toBe(0)
    })
    it('testing cconditional does not render album name album=false', () => {
      let component = shallow(<Song {...falseProps} />)
      const wrapper = findByTestAttr(component, "albumName")
      expect(wrapper.length).toBe(1)
      expect(wrapper.text()).toBe('dddd')
    })
  })
  describe('testing redirecting to song Info', () => {
    let component;
    beforeEach(() => {
      component = setup(fullProps);
      component.setState({ songInfo: true })
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "song")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButton")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songName")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "aristsNames")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "artistName")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdown")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownButton")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownList")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "saveSong")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToQueue")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToPlaylist")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "copy")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songTime")
      expect(wrapper.length).toBe(0)
    })
  })
  describe('testing redirecting to artist', () => {
    let component;
    beforeEach(() => {
      component = setup(fullProps);
      const wrap = findByTestAttr(component, "artistName")
      wrap.first().simulate('click')
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "song")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButton")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songName")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "aristsNames")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "artistName")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdown")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownButton")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownList")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "saveSong")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToQueue")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToPlaylist")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "copy")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songTime")
      expect(wrapper.length).toBe(0)
    })
  })
  describe('testing redirecting to album', () => {
    let component;
    beforeEach(() => {
      component = setup(falseProps);
      const wrap = findByTestAttr(component, "albumName")
      wrap.simulate('click')
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "song")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButton")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "playButtonImage")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songName")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "aristsNames")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "artistName")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdown")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownButton")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "dropdownList")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "saveSong")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToQueue")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "addToPlaylist")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "copy")
      expect(wrapper.length).toBe(0)
    })
    it('renders without errors', () => {
      const wrapper = findByTestAttr(component, "songTime")
      expect(wrapper.length).toBe(0)
    })
  })
  describe('testing prop types', () => {
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { ...fullProps }, 'prop', Song.name);
      expect(result).toBeUndefined();
    })
    //wrong data for clickedId
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { clickedId: 0 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { clickedId: false }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { clickedId: {} }, 'prop', Song.name);
      expect(result).toBeDefined();
    })

    //wrong data for handleClick
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handleClick: 0 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handleClick: false }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handleClick: {} }, 'prop', Song.name);
      expect(result).toBeDefined();
    })

    //wrong data for handlePlay
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handlePlay: 0 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handlePlay: false }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handlePlay: {} }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handlePlay: [] }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { handlePlay: 55 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    //wrong data for addToPlaylist
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { addToPlaylist: 0 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { addToPlaylist: false }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { addToPlaylist: {} }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { addToPlaylist: [] }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { addToPlaylist: 55 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    //wrong data for album
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { album: 0 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { album: jest.fn() }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { album: {} }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { album: [] }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
    it('passing false props', () => {
      const result = checkPropTypes(Song.propTypes, { album: 55 }, 'prop', Song.name);
      expect(result).toBeDefined();
    })
  })
  describe('componentWillReceiveProps()', () => {
    let component;
    beforeEach(() => {
      component = setup(fullProps);
      component.setState({ recieved: false, displayAdd: false })
    })
    it('change the clickedId ', () => {
      component.setProps({ clickedId: '1' })
      expect(component.state().clicked).toBe(false);
    })
    it('change the clickedId ', () => {
      component.setProps({ clickedId: '19' })
      expect(component.state().clicked).toBe(true);
    })
    it('change the playingItemId ', () => {
      component.setProps({ playingItemId: '1' })
      expect(component.state().playing).toBe(false);
    })
    it('change the playingItemId ', () => {
      component.setProps({ playingItemId: '19' })
      expect(component.state().playing).toBe(true);
    })
  });
  describe('snapshot test', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<Song {...fullProps} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
})