import React from 'react'
import HeaderBodyTop from './headerBodyTop'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import checkPropTypes from 'check-prop-types'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const fullProps = {
    title: 'album name',
    artists: [
        {
            id: "3",
            name: "ًWegz el wench",
            type: "Trap",
            image: "string"
        },
        {
            id: "4",
            name: "Amr Diab",
            type: "farafeery",
            image: "string"
        }]
}
const halfProps = {
    title: 'album name',
    artists: [
        {
            id: "3",
            name: "ًWegz el wench",
            type: "Trap",
            image: "string"
        }]
}
const setup = (props = {}) => {
    return shallow(<HeaderBodyTop {...props} />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}

describe('album headerBodyTop Component', () => {
    describe('test props', () => {
        let component;
        beforeEach(() => {
            component = setup();
        });

        //tetsing title prop
        it('should not throw error', () => {
            const result = checkPropTypes(HeaderBodyTop.propTypes, { title: 'title', artists: [] }, 'prop', HeaderBodyTop.name);
            expect(result).toBeUndefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBodyTop.propTypes, { title: {}, artists: [] }, 'prop', HeaderBodyTop.name);
            expect(result).toBeDefined();
        })
        //testing artists
        it('should not throw error', () => {
            const result = checkPropTypes(HeaderBodyTop.propTypes, { title: 'title', artists: [] }, 'prop', HeaderBodyTop.name);
            expect(result).toBeUndefined();
        })
        it('should throw error', () => {
            const result = checkPropTypes(HeaderBodyTop.propTypes, { title: 'title', artists: {} }, 'prop', HeaderBodyTop.name);
            expect(result).toBeDefined();
        })
    })
    describe('snapshot test', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<HeaderBodyTop {...fullProps} />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    })
    describe('testing HeaderBodyTop Component without props', () => {
        let component;
        beforeEach(() => {
            component = setup();
        })
        it("renders correctly without props", () => {
            const wrapper = findByTestAttr(component, "HeaderBodyTop");
            expect(wrapper.length).toBe(1);
        });

        it("renders title correctly without props", () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("");
        });

        it("renders credits correctly without props", () => {
            const wrapper = findByTestAttr(component, "credits");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("By ")
        });
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "artist1");
            expect(wrapper.length).toBe(0);
        });
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "artist2");
            expect(wrapper.length).toBe(0);
        });
    });
    describe('testing HeaderBodyTop Component with props', () => {
        let component;
        beforeEach(() => {
            component = setup(fullProps);
            component.setState({ artists: fullProps.artists })
        })
        it("renders correctly with props", () => {
            const wrapper = findByTestAttr(component, "HeaderBodyTop");
            expect(wrapper.length).toBe(1);
        });
        it("renders title correctly with props", () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("album name");
        });

        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "credits");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("By ")
        });
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "artist1");
            expect(wrapper.length).toBe(0);
        });
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "artist2");
            expect(wrapper.length).toBe(2);
        });
    });
    describe('componentWillReceiveProps()', () => {
        it('change the display state', () => {
            let artists = [
                {
                    id: "3",
                    name: "ًWegz el wench",
                    type: "Trap",
                    image: "string"
                }]
            const component = shallow(<HeaderBodyTop artists={artists} title='album name' />);
            expect(component.state().artists).toStrictEqual([]);
            artists = [{
                id: "4",
                name: "Amr Diab",
                type: "farafeery",
                image: "string"
            }]
            component.setProps({ artists: artists, title: 'album name' });
        })
        it('does not change the display state', () => {
            let artists = [
                {
                    id: "3",
                    name: "ًWegz el wench",
                    type: "Trap",
                    image: "string"
                }]
            const component = shallow(<HeaderBodyTop artists={artists} title='album name' />);
            expect(component.state().artists).toStrictEqual([]);
            component.setProps({ title: 'album', artists: artists });
            expect(component.state().artists).toStrictEqual(artists);
        })
    });
    describe('testing that the link to artist works', () => {
        let component;
        beforeEach(() => {
            component = setup(fullProps);
            component.setState({ artists: fullProps.artists })
            const wrapp = findByTestAttr(component, "artist2");
            wrapp.first().simulate('click')
        })
        it("renders correctly without props", () => {
            const wrapper = findByTestAttr(component, "HeaderBodyTop");
            expect(wrapper.length).toBe(0);
        });

        it("renders title correctly without props", () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(0);
        });

        it("renders credits correctly without props", () => {
            const wrapper = findByTestAttr(component, "credits");
            expect(wrapper.length).toBe(0);
        });
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "artist1");
            expect(wrapper.length).toBe(0);
        });
        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "artist2");
            expect(wrapper.length).toBe(0);
        });
    });
})