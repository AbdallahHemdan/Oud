import React from 'react'
import Album from './album';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'

Enzyme.configure({ adapter: new EnzymeAdapter() });


const setup = (props = {}) => {
    return shallow(<Album.WrappedComponent {...props} />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}
const props = { id: '1' }
describe('album Component', () => {

    describe('renders correctly with initial state', () => {
        let component;
        beforeEach(() => {
            component = setup(props);
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "addTo");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamge component', () => {
            const wrapper = findByTestAttr(component, "navBar");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "album");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeader component', () => {
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamge component', () => {
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeaderBody component', () => {
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(1);
        });
        it('renders HeaderBodyBottom component', () => {
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });
        it('renders songList component', () => {
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(1);
        });

    })
    describe('renders correctly with displayAdd = false', () => {
        let component;
        beforeEach(() => {
            component = setup(props);
            component.setState({ displayAdd: false })
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "addTo");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamge component', () => {
            const wrapper = findByTestAttr(component, "navBar");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "album");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeader component', () => {
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamge component', () => {
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeaderBody component', () => {
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(1);
        });
        it('renders HeaderBodyBottom component', () => {
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });
        it('renders songList component', () => {
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(1);
        });

    })
    describe('renders correctly with displayAdd = false', () => {
        let component;
        beforeEach(() => {
            component = setup(props);
            component.setState({ displayAdd: true })
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "addTo");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeader component', () => {
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            const wrapper = findByTestAttr(component, "navBar");
            expect(wrapper.length).toBe(0);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "album");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeaderBody component', () => {
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(0);
        });
        it('renders HeaderBodyBottom component', () => {
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(0);
        });
        it('renders songList component', () => {
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(0);
        });

    })
    describe('checking propTypes', () => {

        it('should not throw a warning', () => {
            const result = checkPropTypes(Album.WrappedComponent.propTypes, { ...props }, 'prop', Album.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Album.WrappedComponent.propTypes, { id: true }, 'prop', Album.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Album.WrappedComponent.propTypes, { id: 1 }, 'prop', Album.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Album.WrappedComponent.propTypes, { id: {} }, 'prop', Album.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Album.WrappedComponent.propTypes, { id: [] }, 'prop', Album.name);
            expect(result).toBeDefined();
        });

    });
    describe('calling functions', () => {
        let component;
        beforeEach(() => {
            component = setup(props);
        })
        it('calling closeAddToPlaylist', () => {
            component.setState({ displayAdd: true })
            component.instance().closeAddToPlaylist();
            expect(component.state().displayAdd).toBe(false);
        });
        it('calling markAllUnclicked', () => {
            component.setState({ clickID: '1' })
            component.instance().markAllUnclicked();
            component.instance().markAllUnclicked();
            expect(component.state().clickID).toBe('0');
        });
        it('calling addToPlaylist', () => {
            component.setState({ displayAdd: false })
            component.instance().addToPlaylist();
            expect(component.state().displayAdd).toBe(true);
        });
        it('calling likeButtonClicked', () => {
            component.setState({ liked: false })
            component.instance().likeButtonClicked();
            expect(component.state().liked).toBe(true);
        });
        it('calling likeButtonClicked', () => {
            component.setState({ liked: true })
            component.instance().likeButtonClicked();
            expect(component.state().liked).toBe(false);
        });
        it('calling playButtonClicked', () => {
            component.setState({ queued: false, playing: false })
            component.instance().playButtonClicked();
            expect(component.state().playing).toBe(true);
        });
        it('calling playButtonClicked', () => {
            component.setState({ queued: true, playing: true })
            component.instance().playButtonClicked();
            expect(component.state().playing).toBe(false);
        });
        it('calling changeEditAlbumState', () => {
            component.setState({ updateAlbum: false })
            component.instance().changeEditAlbumState();
            expect(component.state().updateAlbum).toBe(true);
        });
        it('calling changeEditAlbumState', () => {
            component.setState({ updateAlbum: true })
            component.instance().changeEditAlbumState();
            expect(component.state().updateAlbum).toBe(false);
        });
        it('calling addSong', () => {
            component.setState({ addSong: false })
            component.instance().addSong();
            expect(component.state().addSong).toBe(true);
        });
        it('calling closeAddSong', () => {
            component.setState({ addSong: true })
            component.instance().closeAddSong();
            expect(component.state().addSong).toBe(false);
        });
    });

})