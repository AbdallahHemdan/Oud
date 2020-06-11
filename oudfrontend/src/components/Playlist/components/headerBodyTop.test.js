import React from 'react'
import HeaderBodyTop from './headerBodyTop';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new EnzymeAdapter() });


const setup = (props = {}) => {
    return shallow(<HeaderBodyTop {...props} />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('HeaderBodyTop Component', () => {
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

        it("renders owner correctly without props", () => {
            const wrapper = findByTestAttr(component, "owner");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("");
        });
        it("renders credits correctly without props", () => {
            const wrapper = findByTestAttr(component, "credits");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("By ")
        });
    });

    describe('testing HeaderBodyTop Component with props', () => {
        let component;
        let props = { title: "nice name", owner: "1" }
        beforeEach(() => {
            component = setup(props);
        })
        it("renders correctly with props", () => {
            const wrapper = findByTestAttr(component, "HeaderBodyTop");
            expect(wrapper.length).toBe(1);
        });
        it("renders title correctly with props", () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("nice name");
        });

        it("renders credits correctly with props", () => {
            const wrapper = findByTestAttr(component, "credits");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("By ")
        });
    });
    describe('testing buttons', () => {
        let component;
        let props = { title: "nice name", owner: "1" }
        beforeEach(() => {
            component = setup(props);
            let wrapp = findByTestAttr(component, "owner");
            wrapp.simulate("click");
        })
        it("HeaderBodyTop shouldn't render", () => {
            const wrapper = findByTestAttr(component, "HeaderBodyTop");
            expect(wrapper.length).toBe(0);
        });
        it("title shouldn't render", () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(0);
        });

        it("owner shouldn't render", () => {
            const wrapper = findByTestAttr(component, "owner");
            expect(wrapper.length).toBe(0);
        });
        it("credits shouldn't render", () => {
            const wrapper = findByTestAttr(component, "credits");
            expect(wrapper.length).toBe(0);
        });
    });
    describe('checking propTypes', () => {
        const propsT = { title: 'string', owner: '1' }
        const propsF = { title: {}, owner: 1 }
        it('should not throw a warning', () => {
            const result = checkPropTypes(HeaderBodyTop.propTypes, propsT, 'prop', HeaderBodyTop.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(HeaderBodyTop.propTypes, propsF, 'prop', HeaderBodyTop.name);
            console.log(result);
            expect(result).toBeDefined();
        });
    });
    describe('snapshot test', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<HeaderBodyTop />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
