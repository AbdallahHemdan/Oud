import React from 'react'
import HeaderBodyBottom from './headerBodyBottom'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import checkPropTypes from 'check-prop-types'
Enzyme.configure({ adapter: new EnzymeAdapter() });

const fullProps = {
    length: 1,
    liked: true,
    playing: true,
    likeClicked: jest.fn(),
    playClicked: jest.fn(),
    releaseDate: '05-06-2011',
    recieved: true,
    album: true,
    tracks: [{ id: 1 }],
    webPlayer: { current: { playContext: jest.fn() } }
}
const setup = (props = {}) => {
    return shallow(<HeaderBodyBottom {...props} />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('HeaderBodyBottom component', () => {
    describe('testing HeaderBodyBottom Component without props', () => {
        let component;
        beforeEach(() => {
            component = setup();
        });

        it("renders correctly without props", () => {
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });

        it("renders play button correctly without props", () => {
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
        });



        it("renders like icon correctly without props", () => {
            const wrapper = findByTestAttr(component, "likeIcon");
            expect(wrapper.length).toBe(1);
        });

        it("renders songs number correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe(' ')
        });

        it("renders literal correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('song')
        });
    });

    describe('testing HeaderBodyBottom Component with props', () => {
        let component;
        let propsSingular = { length: 1 }
        let propsPlural = { length: 4 }
        let propsNan = { length: NaN };
        let propsPlaying = { playing: true }
        let propsNotPlaying = { playing: false }
        let album = { album: true }
        let notAlbum = { album: false }
        let notRecieved = { releaseDate: '1234-11-01', recieved: false }


        it("renders correctly with props", () => {
            component = setup(propsPlural);
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });

        it("renders correctly with album = true", () => {
            component = setup(album);
            const wrapper = findByTestAttr(component, "separatingDot");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('.')
        });
        it("renders correctly with album = false", () => {
            component = setup(notAlbum);
            const wrapper = findByTestAttr(component, "separatingDot");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('')
        });

        it("renders correctly with recieved = false", () => {
            component = setup(notRecieved);
            const wrapper = findByTestAttr(component, "releaseDate");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('')
        });

        it("renders play button correctly with playing = true", () => {
            component = setup(propsPlaying);
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('PAUSE')
        });
        it("renders play button correctly with playing = false", () => {
            component = setup(propsNotPlaying);
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('PLAY')
        });

        it("renders like icon correctly with props", () => {
            component = setup(propsPlural);
            const wrapper = findByTestAttr(component, "likeIcon");
            expect(wrapper.length).toBe(1);
        });

        it("renders songs number correctly with length = 1", () => {
            component = setup(propsSingular);
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.text()).toBe('1 ')

        });
        it("renders songs number correctly with length > 1", () => {
            component = setup(propsPlural);
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('4 ')
        });
        it("renders songs number correctly with length not a number", () => {
            component = setup(propsNan);
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.text()).toBe('NaN ')
        });

        it("renders literal correctly with length > 1", () => {
            component = setup(propsPlural);
            let wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('songs')


        });
        it("renders literal correctly with length = 1", () => {

            component = setup(propsSingular);
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.text()).toBe('song')


        });
        it("renders literal correctly with length not a number", () => {

            component = setup(propsNan);
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.text()).toBe('song')

        });

    });

    describe('checking propTypes', () => {
        //testing the length prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { length: 1 }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { length: {} }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });

        //testing the liked prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { liked: false }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { liked: {} }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });

        //testing the playing prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { playing: false }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });

        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { playing: {} }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });

        //tetsing releaseDate prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { releaseDate: 'lskdvn' }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });

        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { playing: 4 }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });

        //testing recieved prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { recieved: false }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });

        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { recieved: {} }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });

        //testing album prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { album: false }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });

        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { album: {} }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { album: [] }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        //testing the likeClicked prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { likeClicked: jest.fn() }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { likeClicked: {} }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { likeClicked: 1 }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { likeClicked: true }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });

        //testing the playClicked prop
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { playClicked: jest.fn() }, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { playClicked: {} }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { playClicked: 1 }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyBottom.propTypes, { playClicked: true }, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });

    });
    describe('calling functions', () => {
        let component;
        beforeEach(() => {
            component = setup(fullProps)
        });
        it('calling handlePlayClick ', () => {
            component.setState({ start: false })
            component.instance().handlePlayClick({ stopPropagation: jest.fn() });
            expect(component.state().start).toBe(true);
        });
    });
    describe('snapshot test', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<HeaderBodyBottom {...fullProps} />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
