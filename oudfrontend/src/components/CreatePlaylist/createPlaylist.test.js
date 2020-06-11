import React from 'react'
import CreatePlaylist from './createPlaylist';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import checkPropTypes from 'check-prop-types'

Enzyme.configure({ adapter: new EnzymeAdapter() });


const setup = () => {
    return shallow(<CreatePlaylist />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}
/*
Rendering tests
*/

describe('CreatePlaylist Component', () => {
    describe('testing that CreatePlaylist renders Correctly when display = true', () => {
        let component;
        beforeEach(() => {
            component = setup();
            component.setState({ display: true })
        })
        it('renders createPlaylist component', () => {

            const wrapper = findByTestAttr(component, "createPlaylist");
            expect(wrapper.length).toBe(1);
        });
        it('not render empty component', () => {

            const wrapper = findByTestAttr(component, "empty");
            expect(wrapper.length).toBe(0);
        });
        it('renders closeButton component', () => {
            const wrapper = findByTestAttr(component, "closeButton");
            expect(wrapper.length).toBe(1);
        });
        it('renders title component', () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(1);
        });
        it('renders inputContainer component', () => {
            const wrapper = findByTestAttr(component, "inputContainer");
            expect(wrapper.length).toBe(1);
        });
        it('renders inputHeader component', () => {
            const wrapper = findByTestAttr(component, "inputHeader");
            expect(wrapper.length).toBe(1);
        });
        it('renders input component', () => {
            const wrapper = findByTestAttr(component, "input");
            expect(wrapper.length).toBe(1);
        });
        it('renders CancelButton component', () => {
            const wrapper = findByTestAttr(component, "cancelButton");
            expect(wrapper.length).toBe(1);
        });
        it('renders CreateButton component', () => {
            const wrapper = findByTestAttr(component, "CreateButton");
            expect(wrapper.length).toBe(1);
        });

    });
    describe('testing that CreatePlaylist renders Correctly when display = false', () => {
        let component;
        beforeEach(() => {
            component = setup();
            component.setState({ display: false })
        })
        it('renders createPlaylist component', () => {

            const wrapper = findByTestAttr(component, "createPlaylist");
            expect(wrapper.length).toBe(0);
        });
        it('renders empty component', () => {

            const wrapper = findByTestAttr(component, "empty");
            expect(wrapper.length).toBe(1);
        });
        it('renders closeButton component', () => {
            const wrapper = findByTestAttr(component, "closeButton");
            expect(wrapper.length).toBe(0);
        });
        it('renders title component', () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(0);
        });
        it('renders inputContainer component', () => {
            const wrapper = findByTestAttr(component, "inputContainer");
            expect(wrapper.length).toBe(0);
        });
        it('renders inputHeader component', () => {
            const wrapper = findByTestAttr(component, "inputHeader");
            expect(wrapper.length).toBe(0);
        });
        it('renders input component', () => {
            const wrapper = findByTestAttr(component, "input");
            expect(wrapper.length).toBe(0);
        });
        it('renders CancelButton component', () => {
            const wrapper = findByTestAttr(component, "cancelButton");
            expect(wrapper.length).toBe(0);
        });
        it('renders CreateButton component', () => {
            const wrapper = findByTestAttr(component, "CreateButton");
            expect(wrapper.length).toBe(0);
        });

    });
    describe('testing that CreatePlaylist texts', () => {
        let component;
        beforeEach(() => {
            component = setup();
        })
        it('testing the title text', () => {
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.text()).toBe('Create new playlist');
        });
        it('testing input header text', () => {
            const wrapper = findByTestAttr(component, "inputHeader");
            expect(wrapper.text()).toBe('Playlist Name');
        });
        it('testing the cancelButton text', () => {
            const wrapper = findByTestAttr(component, "cancelButton");
            expect(wrapper.text()).toBe('CANCEL');
        });
        it('testing input createButton text', () => {
            const wrapper = findByTestAttr(component, "CreateButton");
            expect(wrapper.text()).toBe('CREATE');
        });
    });
    describe('testing actions', () => {
        let component;
        beforeEach(() => {
            component = setup();
            component.setState({ display: true })

        })
        it('close Button', () => {
            const wrapper = findByTestAttr(component, "closeButton");
            expect(component.state().display).toBeTruthy();
            wrapper.simulate('click')
            expect(component.state().display).toBeFalsy();
        });
        it('cancel Button', () => {
            const wrapper = findByTestAttr(component, "cancelButton");
            expect(component.state().display).toBeTruthy();
            wrapper.simulate('click')
            expect(component.state().display).toBeFalsy();
        });
        it('create Button', () => {
            const wrapper = findByTestAttr(component, "CreateButton");
            expect(component.state().display).toBeTruthy();
            wrapper.simulate('click')
            expect(component.state().display).toBeFalsy();
        });
        it('create Button', () => {
            const wrapper = findByTestAttr(component, "CreateButton");
            expect(component.state().display).toBeTruthy();
            wrapper.simulate('click')
            expect(component.state().display).toBeFalsy();
        });
        it('text change', () => {
            const wrapper = findByTestAttr(component, "input");
            expect(component.state().name).toBe("");
            wrapper.simulate('change', { target: { value: 'Hello' } })
            expect(component.state().name).toBe("Hello");
        });
    })
    describe('testing proptypes', () => {
        let component;
        beforeEach(() => {
            component = setup();
        })
        it('testing with true props', () => {
            const result = checkPropTypes(CreatePlaylist.propTypes, { display: true }, 'prop', CreatePlaylist.name);
            expect(result).toBeUndefined();
        });
        it('testing with false props', () => {
            const result = checkPropTypes(CreatePlaylist.propTypes, { display: 55 }, 'prop', CreatePlaylist.name);
            expect(result).toBeDefined();
        });
        it('testing with false props', () => {
            const result = checkPropTypes(CreatePlaylist.propTypes, { display: {} }, 'prop', CreatePlaylist.name);
            expect(result).toBeDefined();
        });
        it('testing with false props', () => {
            const result = checkPropTypes(CreatePlaylist.propTypes, { display: "gg" }, 'prop', CreatePlaylist.name);
            expect(result).toBeDefined();
        });
    });
    describe('componentWillReceiveProps()', () => {
        it('change the display state', () => {
            const component = shallow(<CreatePlaylist display={true} />);
            expect(component.state().display).toBe(true);
            component.setProps({ display: false });
            expect(component.state().display).toBe(false);
        })
        it('does not change the display state', () => {
            const component = shallow(<CreatePlaylist display={true} />);
            expect(component.state().display).toBe(true);
            component.setProps({ display: true });
            expect(component.state().display).toBe(true);
        })
    });
    describe('snapshot test', () => {
        it(' correctly', () => {
            const tree = renderer
                .create(<CreatePlaylist />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

});