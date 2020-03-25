import React, { Component } from "react";
import "./MusicItem.css";
import MusicCard from "../MusicCard/MusicCard"
import { Link } from "react-router-dom";


class MusicItem extends Component {
  constructor(props) {
    super(props)

    // destructuring item props
    const { id, name, icon } = this.props.item;

    this.state = {
      id: id, // id of the category 
      name: name, // name of the category 
      icon: icon // icon of the category 
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="module">
        <div className="row">
          <h1 className="gray-white item-name">{this.props.item.name}</h1>
          <Link to="playlist">
            <div className="see-more">See All</div>
          </Link>
        </div>
        <div className="wrapper">
          <div className="wrapper_section_2">
            <div className="cards">
              <MusicCard img="https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg" alt="music card image" />
              <MusicCard img="https://i.pinimg.com/736x/cf/74/03/cf74032199d378808402329b3765ac72--music-albums-in-color.jpg" alt="music card image" />
              <MusicCard img="https://media1.popsugar-assets.com/files/thumbor/L-VT9k0GKckWWnpo3n2YBq4f9tE/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/08/03/846/n/37139775/2d0d134e5983773fe90560.65157921_edit_img_image_17921777_1501786115/i/Camila-Cabello-Havana-Song.jpg" alt="music card image" />
              <MusicCard img="https://is4-ssl.mzstatic.com/image/thumb/Music7/v4/4b/06/29/4b062955-ecce-e362-78f1-025f18eed20a/source/1200x1200bb.jpg" alt="music card image" />
              <MusicCard img="https://i.pinimg.com/736x/ed/b1/10/edb1100257bb6d0ceee624696d9c9f1f--cover-art-album-covers.jpg" alt="music card image" />
              <MusicCard img="https://i.pinimg.com/736x/02/b8/94/02b894f7ea6ad9f724648ee511ad018f--edm-music-house-music.jpg" alt="music card image" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicItem;
