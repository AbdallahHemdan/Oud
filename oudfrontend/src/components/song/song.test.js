import React from 'React'
import Song from './song'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import checkPropTypes from 'check-prop-types'
Enzyme.configure({adapter: new EnzymeAdapter()});
const fullProps = {
    clickedId: '0',
    handleClick:jest.fn(),
    handlePlay: jest.fn(),
    track:{
        "id": "19",
        "name": "إنسان",
        "artists": [
            {
                "id": "5",
                "name": "حمزة نمرة",
                "type": "shaaby",
                "image": "string"
            },
            {
                "id": "2",
                "name": "Sardeena",
                "type": "Shaaby",
                "image": "string"
            }
            ],
            "albumId": "1",
            "type": "Jazz",
            "audioUrl": "www.Facebook.com"
        }
}
const resp = {
    "id": "1",
    "album_type": "Rap",
    "artists": [
      {
        "id": "5",
        "name": "حمزة نمرة",
        "type": "Shaaby",
        "image": "string"
      },
      {
        "id": "1",
        "name": "wegz",
        "type": "Shaaby",
        "image": "string"
      }
    ],
    "genres": [
      "shaaby"
    ],
    "image": "https://i.scdn.co/image/ab67616d0000b273ef029742aa2f7342b3b5daaf",
    "name": "Insan",
    "release_date": "2020-03-07",
    "tracks": {
      "items": [
        {
          "id": "19",
          "name": "إنسان",
          "artists": [
            {
              "id": "5",
              "name": "حمزة نمرة",
              "type": "shaaby",
              "image": "string"
            },
            {
              "id": "2",
              "name": "Sardeena",
              "type": "Shaaby",
              "image": "string"
            }
          ],
          "albumId": "1",
          "type": "Jazz",
          "audioUrl": "www.Facebook.com"
        },
        {
          "id": "20",
          "name": "سلاح التلميذ",
          "artists": [
            {
              "id": "3",
              "name": "ًWegz el wench",
              "type": "Trap",
              "image": "string"
            },
            {
              "id": "4",
              "name": "Amr Diab",
              "type": "farafeery",
              "image": "string"
            }
          ],
          "albumId": "1",
          "type": "Trap",
          "audioUrl": "www.facebook.com"
        },
        {
          "id": "22",
          "name": "سلاح التلميذ",
          "artists": [
            {
              "id": "3",
              "name": "ًWegz el wench",
              "type": "Trap",
              "image": "string"
            },
            {
              "id": "4",
              "name": "Amr Diab",
              "type": "farafeery",
              "image": "string"
            }
          ],
          "albumId": "1",
          "type": "Trap",
          "audioUrl": "www.facebook.com"
        }],
      },
      "type": "string",
      "released": true
    }

const setup = (props={}) =>{
    return shallow(<Song {...props}/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('song component', ()=>{
    describe('renders correctly with true props', ()=>{
        let component;
        beforeEach (()=>{
            component = setup(fullProps);
        });
        it('renders Song', ()=>{
            const wrapper = findByTestAttr(component, "song")
            expect(wrapper.length).toBe(1)
        })
    })
    describe('testing prop types', ()=>{
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {...fullProps}, 'prop', Song.name);
            expect(result).toBeUndefined();
        })
        //wrong data for clickedId
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {clickedId:0}, 'prop', Song.name);
            expect(result).toBeDefined();
        })
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {clickedId:false}, 'prop', Song.name);
            expect(result).toBeDefined();
        })
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {clickedId:{}}, 'prop', Song.name);
            expect(result).toBeDefined();
        })

        //wrong data for handleClick
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {handleClick:0}, 'prop', Song.name);
            expect(result).toBeDefined();
        })
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {handleClick:false}, 'prop', Song.name);
            expect(result).toBeDefined();
        })
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {handleClick:{}}, 'prop', Song.name);
            expect(result).toBeDefined();
        })

        //wrong data for handlePlay
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {handlePlay:0}, 'prop', Song.name);
            expect(result).toBeDefined();
        })
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {handlePlay:false}, 'prop', Song.name);
            expect(result).toBeDefined();
        })
        it('passing true props', ()=>{
            const result = checkPropTypes(Song.propTypes, {handlePlay:{}}, 'prop', Song.name);
            expect(result).toBeDefined();
        })
    })
    describe('snapshot test', ()=>{
        it('renders correctly', () => {
            const tree = renderer
              .create(<Song {...fullProps}/>)
              .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
})