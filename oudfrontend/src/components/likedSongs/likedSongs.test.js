import React from 'react'
import renderer from 'react-test-renderer';
import LikedSongs from './likedSongs';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new EnzymeAdapter() });


const setup = () => {
    return shallow(<LikedSongs.WrappedComponent />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('album Component', () => {

    describe('renders correctly', () => {
        let component;
        beforeEach(() => {
            component = setup();
        })
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "wrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeader component', () => {
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', () => {
            const wrapper = findByTestAttr(component, "likedSongs");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamge component', () => {
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamgeContainer component', () => {
            const wrapper = findByTestAttr(component, "playlistIamgeContainer");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeaderBody component', () => {
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(1);
        });

        it('renders songList component', () => {
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(1);
        });

    })

    describe('calling functions', () => {
        let component;
        beforeEach(() => {
            component = setup();
        })
        it('calling markAllUnclicked', () => {
            component.setState({ clickID: '1' })
            component.instance().markAllUnclicked();
            component.instance().markAllUnclicked();
            expect(component.state().clickID).toBe('0');
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
        it('calling destructuring', () => {
            const items = [{ track: "Ahmed" }]
            component.setState({ queued: true, playing: true })
            component.instance().destructuring(items);
            expect(component.state().tracks).toStrictEqual(["Ahmed"])
        });
    });

})