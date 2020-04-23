import React, {Component} from 'react';
import SuggestedNavBar from './../../components/SuggestedArtist/SuggestedNavBar';
import SuggestedFooterT from './../../components/SuggestedArtist/SuggestedFooterT';
import SuggestedFooterB from './../../components/SuggestedArtist/SuggestedFooterB';
import MainArtistC from './../../components/SuggestedArtist/MainArtistC';
export default class SuggestedArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {isSelected: false};
  }
  isSelected = () => {
    return this.state.isSelected ? true : false;
  };
  onClick = (event) => {
    this.setState({isSelected: event.target.value});
    if (event.target.value) {
      event.target.value = !event.target.value;
    }
  };
  render() {
    return (
      <div>
        <SuggestedNavBar />
        <MainArtistC />
        {this.isSelected() ? <SuggestedFooterB /> : <SuggestedFooterT />}
      </div>
    );
  }
}
