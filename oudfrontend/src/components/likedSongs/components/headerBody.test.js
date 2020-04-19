import React from 'React'
import HeaderBody from './headerBody'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import checkPropTypes from 'check-prop-types'
Enzyme.configure({adapter: new EnzymeAdapter()});

const fullProps = {
    length : 1,
    playing:true,
    playClicked : jest.fn()
}

const setup = (props={}) =>{
    return shallow(<HeaderBody {...props}/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('HeaderBody component', ()=>{

    describe('rendering correctly without props', ()=>{
        let component;
        beforeEach (()=>{
            component = setup();
        });
        it('renders headerBody', ()=>{
            const wrapper = findByTestAttr(component, "HeaderBody");
            expect(wrapper.length).toBe(1);
        })
        it('renders title', ()=>{
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("Liked Songs")
        })
        it('renders play Button', ()=>{
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("PLAY")
        })
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
    })

    describe('renders correctly with props', ()=>{
        let component;
        beforeEach (()=>{
            component = setup(fullProps);
        });
        it('renders headerBody', ()=>{
            const wrapper = findByTestAttr(component, "HeaderBody");
            expect(wrapper.length).toBe(1);
        })
        it('renders title', ()=>{
            const wrapper = findByTestAttr(component, "title");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("Liked Songs")
        })
        it('renders play Button', ()=>{
            const wrapper = findByTestAttr(component, "playButton");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("PAUSE")
        })
        it('renders play button with playing = false', ()=>{
            let comp = setup({playing:false})
            const wrapper = findByTestAttr(comp, "playButton");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe("PLAY")
        })
        it("renders songs number correctly with props", ()=>{
            const wrapper = findByTestAttr(component, "songsNumber");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('1 ')
        });
    
        it("renders literal correctly with length = 1", ()=>{
            const wrapper = findByTestAttr(component, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('song')
        });
        it("renders literal correctly with length = 2", ()=>{
            const comp = setup({length:2})
            const wrapper = findByTestAttr(comp, "songsLiteral");
            expect(wrapper.length).toBe(1);
            expect(wrapper.text()).toBe('songs')
        });
    })
    
    describe('testing Prop types', ()=>{
        it('passing true props', ()=>{
            const result = checkPropTypes(HeaderBody.propTypes, {...fullProps}, 'prop', HeaderBody.name);
            expect(result).toBeUndefined();
        })

        //testing length prop by passing false data
        it('should throw error', ()=>{
            const result = checkPropTypes(HeaderBody.propTypes, {length:'3'}, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', ()=>{
            const result = checkPropTypes(HeaderBody.propTypes, {length:{}}, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })

        //testing length prop by passing false data
        it('should throw error', ()=>{
            const result = checkPropTypes(HeaderBody.propTypes, {playing:'3'}, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', ()=>{
            const result = checkPropTypes(HeaderBody.propTypes, {playing:{}}, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })

        //testing playClicked prop by passing false data
        it('should throw error', ()=>{
            const result = checkPropTypes(HeaderBody.propTypes, {playClicked:'3'}, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
        it('should throw error', ()=>{
            const result = checkPropTypes(HeaderBody.propTypes, {playClicked:{}}, 'prop', HeaderBody.name);
            expect(result).toBeDefined();
        })
    })
    describe('snapshot test', ()=>{
        it('renders correctly', () => {
            const tree = renderer
              .create(<HeaderBody {...fullProps}/>)
              .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});