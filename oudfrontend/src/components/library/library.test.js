import React from 'React'
import Library from './library.jsx';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
Enzyme.configure({adapter: new EnzymeAdapter()});


const setup = () =>{
    return shallow(<Library.WrappedComponent/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
/*
Rendering tests
*/
describe('Library Component', ()=>{
    describe('testing Library does not render when user is not logged in', ()=>{
        let component;
        beforeEach (()=>{
            component = setup();
            component.setState({signedIn:false})
        })
        it('does not render library component', ()=>{
            const wrapper = findByTestAttr(component, "myLibrary");
            expect(wrapper.length).toBe(0);
        });
        it('does not render linkContainer component', ()=>{
            const wrapper = findByTestAttr(component, "linkContainer");
            expect(wrapper.length).toBe(0);
        });
        it('does not render 2 Link components', ()=>{
            const wrapper = findByTestAttr(component, "libLink");
            expect(wrapper.length).toBe(0);
        });
    });
    describe('testing Library renders when user is logged in', ()=>{
        let component;
        beforeEach (()=>{
            component = setup();
            component.setState({signedIn:true})

        })
        it('renders library component', ()=>{
            const wrapper = findByTestAttr(component, "myLibrary");
            expect(wrapper.length).toBe(1);
        });
        it('renders linkContainer component', ()=>{
            const wrapper = findByTestAttr(component, "linkContainer");
            expect(wrapper.length).toBe(1);
        });
        it('renders 2 Link components', ()=>{
            const wrapper = findByTestAttr(component, "libLink");
            expect(wrapper.length).toBe(2);
        });
    });
    describe('snapshot test', ()=>{
        it('renders correctly', () => {
            const tree = renderer
              .create(<Library.WrappedComponent/>)
              .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    
});