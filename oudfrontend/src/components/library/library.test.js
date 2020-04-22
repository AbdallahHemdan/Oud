import React from 'React'
import renderer from 'react-test-renderer';
import Library from './library.jsx';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'
import {Auth} from "../../utils/auth"
Enzyme.configure({adapter: new EnzymeAdapter()});


const setup = () =>{
    return shallow(<Library/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
/*
Rendering tests
*/
jest.mock("../../utils/auth")
describe('Library Component', ()=>{
    describe('testing Library renders Correctly', ()=>{
        let component;
        beforeEach (()=>{
            component = setup();
        })
        it('renders library component', ()=>{
            const wrapper = findByTestAttr(component, "myLibrary");
            expect(wrapper.length).toBe(0);
        });
        it('renders linkContainer component', ()=>{
            const wrapper = findByTestAttr(component, "linkContainer");
            expect(wrapper.length).toBe(0);
        });
        it('renders 2 Link components', ()=>{
            const wrapper = findByTestAttr(component, "libLink");
            expect(wrapper.length).toBe(0);
        });
    });
    
});