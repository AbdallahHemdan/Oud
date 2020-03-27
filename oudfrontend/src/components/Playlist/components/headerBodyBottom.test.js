import React from 'React'
import HeaderBodyBottom from './headerBodyBottom';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'
import { mockComponent } from 'react-dom/test-utils';
Enzyme.configure({adapter: new EnzymeAdapter()});


const setup = (props={}) =>{
    return shallow(<HeaderBodyBottom {...props}/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('HeaderBodyBottom component', ()=>{
    describe('testing HeaderBodyBottom Component without props',()=>{
        let component;
        beforeEach (()=>{
            component = setup();
        });
    
        it("renders correctly without props", ()=>{
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });
    
        it("renders play button correctly without props", ()=>{
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
        });
    
       
    
        it("renders like icon correctly without props", ()=>{
            const wrapper = findByTestAttr(component, "likeIcon");
            expect(wrapper.length).toBe(1);
        });
    
        it("renders songs number correctly without props", ()=>{
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe(' ')
        });
    
        it("renders literal correctly without props", ()=>{
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('song')
        });
    });
    
    describe('testing HeaderBodyBottom Component with props',()=>{
        let component;
        let propsSingular = {length:1}
        let propsPlural = {length:4}
        let propsNan = {length: NaN};
        
    
        it("renders correctly with props", ()=>{
            component = setup(propsPlural);
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });
    
        it("renders play button correctly with props", ()=>{
            component = setup(propsPlural);
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
        });
    
        it("renders like icon correctly with props", ()=>{
            component = setup(propsPlural);
            const wrapper = findByTestAttr(component, "likeIcon");
            expect(wrapper.length).toBe(1);
        });
    
        it("renders songs number correctly with length = 1", ()=>{
            component = setup(propsSingular);
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.text()).toBe('1 ')
            
        });
        it("renders songs number correctly with length > 1", ()=>{
            component = setup(propsPlural);
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('4 ')
        });
        it("renders songs number correctly with length not a number", ()=>{
            component = setup(propsNan);
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.text()).toBe('NaN ')
        });
    
        it("renders literal correctly with length > 1", ()=>{
            component = setup(propsPlural);
            let wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('songs')
            
    
        });
        it("renders literal correctly with length = 1", ()=>{
            
            component = setup(propsSingular);
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.text()).toBe('song')
            
    
        });
        it("renders literal correctly with length not a number", ()=>{
           
            component = setup(propsNan);
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.text()).toBe('song')
    
        });
    
    });

    describe('checking propTypes', ()=>{
        it('should not throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {length:1}, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {length:{}}, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should not throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {liked:false}, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {liked:{}}, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should not throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {likeClicked:jest.fn()}, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {likeClicked:{}}, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should not throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {playClicked:jest.fn()}, 'prop', HeaderBodyBottom.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(HeaderBodyBottom.propTypes, {playClicked:{}}, 'prop', HeaderBodyBottom.name);
            console.log(result);
            expect(result).toBeDefined();
        });
    });
});
