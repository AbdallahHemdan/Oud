import React from 'react'
import renderer from 'react-test-renderer';
import Playlist from './playlist.jsx';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'

Enzyme.configure({ adapter: new EnzymeAdapter() });


const setup = (props = {}) => {
    return shallow(<Playlist.WrappedComponent id={props} />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}

const trueProps = { id: "1" }



/*
Rendering tests
*/

describe('Playlist Component', () => {
    describe('renders correctly with initial state', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "loading");
            expect(wrapper.length).toBe(0);
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
            const wrapper = findByTestAttr(component, "playlist");
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
    describe('renders correctly with recieved = false and displayAdd=default', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
            component.setState({ recieved: false })
        })
        it('renders album component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "loading");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "addTo");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "navBar");
            expect(wrapper.length).toBe(0);
        });
        it('renders album component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "playlist");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeaderBody component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(0);
        });
        it('renders HeaderBodyBottom component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(0);
        });
        it('renders songList component', () => {
            component.setState({ recieved: false })
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(0);
        });

    })
    describe('renders correctly with recieved = false and displayAdd=true', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
            component.setState({ recieved: false, displayAdd: true })
        })
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "loading");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "addTo");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "navBar");
            expect(wrapper.length).toBe(0);
        });
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "playlist");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeaderBody component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(0);
        });
        it('renders HeaderBodyBottom component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(0);
        });
        it('renders songList component', () => {
            component.setState({ recieved: false, displayAdd: true })
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(0);
        });

    })
    describe('renders correctly with recieved = false and displayAdd=false', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
            component.setState({ recieved: false, displayAdd: false })
        })
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "loading");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "addTo");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "navBar");
            expect(wrapper.length).toBe(0);
        });
        it('renders album component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "playlist");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeader component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistIamge component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(0);
        });
        it('renders playlistHeaderBody component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(0);
        });
        it('renders HeaderBodyBottom component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(0);
        });
        it('renders songList component', () => {
            component.setState({ recieved: false, displayAdd: false })
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(0);
        });

    })
    describe('renders correctly with recieved = true and displayAdd=true', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
            component.setState({ recieved: true, displayAdd: true })
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "loading");
            expect(wrapper.length).toBe(0);
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
            const wrapper = findByTestAttr(component, "playlist");
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
    describe('renders correctly with recieved=true and displayAdd=default', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
            component.setState({ recieved: true })
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "loading");
            expect(wrapper.length).toBe(0);
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
            const wrapper = findByTestAttr(component, "playlist");
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
    describe('renders correctly with recieved=true and displayAdd=false', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
            component.setState({ recieved: true, displayAdd: false })
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "BigWrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "loading");
            expect(wrapper.length).toBe(0);
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
            const wrapper = findByTestAttr(component, "playlist");
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
    describe('componentWillReceiveProps()', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
            component.setState({ recieved: false, displayAdd: false })
        })
        it('change the recieved state', () => {
            expect(component.state().ownerName).toBe("");
            component.setState({ recieved: true });
            expect(component.state().ownerName).toBe("");
        })
    });
    describe('checking propTypes', () => {
        const propsT = { id: { id: '1' } }
        const propsF = { id: { id: true } }
        it('should not throw a warning', () => {
            const result = checkPropTypes(Playlist.WrappedComponent.propTypes, propsT, 'prop', Playlist.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Playlist.WrappedComponent.propTypes, propsF, 'prop', Playlist.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Playlist.WrappedComponent.propTypes, { id: 1 }, 'prop', Playlist.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Playlist.WrappedComponent.propTypes, { id: [] }, 'prop', Playlist.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(Playlist.WrappedComponent.propTypes, { id: "kk" }, 'prop', Playlist.name);
            expect(result).toBeDefined();
        });
    });
    describe('calling functions', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
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

    });
    describe('snapshot test', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<Playlist.WrappedComponent {...trueProps} />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});



