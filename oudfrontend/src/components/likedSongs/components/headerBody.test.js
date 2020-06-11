import React from 'react'
import HeaderBody from './headerBody'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import checkPropTypes from 'check-prop-types'
Enzyme.configure({ adapter: new EnzymeAdapter() });

const trueProps = {
    length: 10,
    playing: true,
    playClicked: jest.fn(),
    tracks: [{ id: 1 }],
    webPlayer: { current: { playContext: jest.fn() } }
}
const falseProps = {
    length: 5,
    playing: false,
    playClicked: jest.fn()
}
const setup = (props = {}) => {
    return shallow(<HeaderBody {...props} />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}

describe('album headerBody Component', () => {
    describe('test props', () => {
        let component;
        beforeEach(() => {
            component = setup();
        });

        //sending true props
        it('should not throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { ...trueProps }, 'prop', HeaderBody.name);
            expect(result).toBeUndefined();
        })
        it('should not throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { ...falseProps }, 'prop', HeaderBody.name);
            expect(result).toBeUndefined();
        })

        //sending false props to length
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { length: "jj" }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { length: {} }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { length: [] }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { length: jest.fn() }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        //sending false props to playing
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playing: "jj" }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playing: {} }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playing: [] }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playing: jest.fn() }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        //sending false props to playing
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playClicked: "jj" }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playClicked: {} }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playClicked: [] }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBody.propTypes, { playClicked: 55 }, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
    })

    describe('testing HeaderBody Component without props', () => {
        let component;
        beforeEach(() => {
            component = setup();
        })
        it("renders correctly without props", () => {
            const wrapper = findByTestAttr(component, "HeaderBody");
            expect(wrapper.length).toBe(1);
        });

        it("renders title correctly without props", () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("Liked Songs");
        });

        it("renders credits correctly without props", () => {
            const wrapper = findByTestAttr(component, "owner");
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
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
        });

    });
    describe('testing link to owner', () => {
        let component;
        beforeEach(() => {
            component = setup();
            const wrapp = findByTestAttr(component, "owner");
            wrapp.simulate('click')
        })
        it("renders correctly without props", () => {
            const wrapper = findByTestAttr(component, "HeaderBody");
            expect(wrapper.length).toBe(0);
        });

        it("renders title correctly without props", () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(0);
        });

        it("renders credits correctly without props", () => {
            const wrapper = findByTestAttr(component, "owner");
            expect(wrapper.length).toBe(0);
        });
        it("renders songs number correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(0);
        });

        it("renders literal correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(0);
        });
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(0);
        });
    });
    describe('testing HeaderBodyTop Component with trueProps', () => {
        let component;
        beforeEach(() => {
            component = setup(trueProps);
        })
        it("renders play button correctly with playing = true", () => {
            component = setup(trueProps);
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('PAUSE')
        });
        it("renders play button correctly with playing = false", () => {
            component = setup(falseProps);
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('PLAY')
        });
        it("renders songs number correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('10 ')
        });

        it("renders literal correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('songs')
        });
        it("calling playButton", () => {
            component.setState({ start: true })
            const wrapper = findByTestAttr(component, "playButton");
            wrapper.simulate('click');
            expect(component.state().start).toBeTruthy();
        });
        it('calling handlePlayClick ', () => {
            component.setState({ start: false })
            component.instance().handlePlayClick({ stopPropagation: jest.fn() });
            expect(component.state().start).toBe(true);
        });
    });
    describe('testing HeaderBodyTop Component with falseProps', () => {
        let component;
        beforeEach(() => {
            component = setup(falseProps);
        })
        it("renders songs number correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('5 ')
        });

        it("renders literal correctly without props", () => {
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('songs')
        });
    });
    describe('snapshot test', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<HeaderBody {...trueProps} />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
})