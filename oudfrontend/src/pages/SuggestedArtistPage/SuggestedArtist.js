import React, {Component} from 'react';
import SuggestedNavBar from './../../components/SuggestedArtist/SuggestedNavBar';
import SuggestedFooter from './../../components/SuggestedArtist/SuggestedFooter';
import MainArtistC from './../../components/SuggestedArtist/MainArtistC';
export default class SuggestedArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {isSelected: false, selectedIds: []};
  }
  check = (sId, id) => {
    return sId !== id;
  };
  componentDidUpdate() {}
  handleSelect = (id, remove) => {
    let ids = this.state.selectedIds;
    if (!remove) {
      ids.push(id);
      this.setState({selectedIds: ids});
    } else {
      const selectedIds = this.state.selectedIds.filter((sId) =>
        this.check(sId, id)
      );
      this.setState({selectedIds});
    }
  };
  isSelected = () => {
    return this.state.selectedIds.length;
  };
  onClick = (event) => {
    this.setState({isSelected: event.target.value});
    if (event.target.value) {
      event.target.value = !event.target.value;
    }
  };
  handelRenderComp = () => {
    if (this.SuggestedFooterB.state.choo === true) {
    }
  };
  render() {
    return (
      <div>
        <SuggestedNavBar />
        <MainArtistC handleSelect={this.handleSelect} />
        <SuggestedFooter
          selected={this.isSelected}
          selectedIds={this.state.selectedIds}
        />
        )}
      </div>
    );
  }
}
