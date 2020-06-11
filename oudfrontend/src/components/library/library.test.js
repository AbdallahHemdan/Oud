import React from 'react'
import Library from './library.jsx';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new EnzymeAdapter() });


const setup = () => {
    return shallow(<Library.WrappedComponent />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}
/*
Rendering tests
*/
describe('Library Component', () => {
    describe('testing Library does not render when user is not logged in', () => {
        let component;
        beforeEach(() => {
            component = setup();
            component.setState({ signedIn: false })
        })
        it('does not render library component', () => {
            const wrapper = findByTestAttr(component, "myLibrary");
            expect(wrapper.length).toBe(0);
        });
        it('does not render linkContainer component', () => {
            const wrapper = findByTestAttr(component, "linkContainer");
            expect(wrapper.length).toBe(0);
        });
        it('does not render 2 Link components', () => {
            const wrapper = findByTestAttr(component, "libLink");
            expect(wrapper.length).toBe(0);
        });
        it('does not render 2 Link components', () => {
            const wrapper = findByTestAttr(component, "albumLink");
            expect(wrapper.length).toBe(0);
        });
        it('does not render 2 Link components', () => {
            const wrapper = findByTestAttr(component, "playlistLink");
            expect(wrapper.length).toBe(0);
        });
        it('does not render albums link component', () => {
            const wrapper = findByTestAttr(component, "Albums");
            expect(wrapper.length).toBe(0);
        });
        it('does not render playlist Link components', () => {
            const wrapper = findByTestAttr(component, "playlists");
            expect(wrapper.length).toBe(0);
        });
        it('does not render links components', () => {
            const wrapper = findByTestAttr(component, "links");
            expect(wrapper.length).toBe(0);
        });
    });
    describe('testing Library renders when user is logged in', () => {
        let component;
        beforeEach(() => {
            component = setup();
            component.setState({ signedIn: true })

        })
        it('renders library component', () => {
            const wrapper = findByTestAttr(component, "myLibrary");
            expect(wrapper.length).toBe(1);
        });
        it('renders linkContainer component', () => {
            const wrapper = findByTestAttr(component, "linkContainer");
            expect(wrapper.length).toBe(1);
        });
        it('does not render 2 Link components', () => {
            const wrapper = findByTestAttr(component, "albumLink");
            expect(wrapper.length).toBe(1);
        });
        it('does not render 2 Link components', () => {
            const wrapper = findByTestAttr(component, "playlistLink");
            expect(wrapper.length).toBe(1);
        });
        it('does not render albums link component', () => {
            const wrapper = findByTestAttr(component, "Albums");
            expect(wrapper.length).toBe(1);
        });
        it('does not render playlist Link components', () => {
            const wrapper = findByTestAttr(component, "playlists");
            expect(wrapper.length).toBe(1);
        });
        it('does not render links components', () => {
            const wrapper = findByTestAttr(component, "links");
            expect(wrapper.length).toBe(1);
        });
        it('does not render links components', () => {
            const wrapper = findByTestAttr(component, "empty");
            expect(wrapper.length).toBe(0);
        });
    });
    describe('testing the links', () => {
        let component;
        beforeEach(() => {
            component = setup();
            component.setState({ signedIn: true })
        })
        it('includes link to albums', () => {
            const wrapper = findByTestAttr(component, "albumLink")
            expect(wrapper.prop('to')).toBe('/collection/albums')
        });
        it('includes link to playlists', () => {
            const wrapper = findByTestAttr(component, "playlistLink")
            expect(wrapper.props().to).toBe('/collection/playlists');
        });
    });

});