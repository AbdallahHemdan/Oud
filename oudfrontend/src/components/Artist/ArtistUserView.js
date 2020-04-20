import React, { Component } from "react";
import UpperContainer from "./UpperContainer";
import LowerContainer from "./LowerContainer";
import { base } from "../../config/environment";
import {
  getRequest,
  deleteRequest,
  putRequest,
  patchRequest,
} from "../../utils/requester";
class ArtistUserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      id: "",
      img: "",
      photo: "",
      signInId: "",
      followStatus: "",
      bio: "",
    };
  }
  componentDidMount() {
    getRequest(`${base}/artists/${this.props.artistId}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          username: response.data.displayName,
          bio: response.data.bio,
          img: response.data.images[1],
        });
        getRequest(
          `${base}/me/following/containes?type=artist&ids=[${this.props.artistId}]`
        )
          .then((response) => {
            this.setState({ followStatus: response.data.ids[0] });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });

    getRequest(`${base}/me`)
      .then((response) => {
        this.setState({ signInId: response.data.id });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.artistId !== this.props.artistId) {
      getRequest(`${base}/artists/${this.props.artistId}`)
        .then((response) => {
          this.setState({
            id: response.data.id,
            username: response.data.displayName,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  handleFollowClick = (event) => {
    /*
     1) make put request if it was false 
     2) make delet request if true
     3) then change the state
    */

    if (this.state.followStatus) {
      /*this shouild be in route me/following/ids=*,*,*,*&type=user/artist*/
      deleteRequest(`${base}/me/following?type=artist&ids[${this.state.id}]`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    } else {
      putRequest(`${base}/me/following?type=artist`, {
        ids: [this.state.id],
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.setState({ followStatus: !this.state.followStatus });
  };
  render() {
    return (
      <div className="profile-user" data-test="Artist">
        <UpperContainer
          data-test="artist-upper-container"
          artistId={this.props.artistId}
          handleFollowClick={this.handleFollowClick}
          followStatus={this.state.followStatus}
          username={this.state.username}
          cover={this.state.img}
        />
        <LowerContainer
          data-test="artist-lower-container"
          artistId={this.props.artistId}
          bio={this.state.bio}
        />
      </div>
    );
  }
}
export default ArtistUserView;
