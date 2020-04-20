import React, { Component } from "react";
import UpperContainer from "./UpperContainer/UpperContainer";
import LowerContainer from "./LowerContainer/LowerContainer";
import { base } from "../../config/environment";
import { getRequest, deleteRequest, putRequest } from "../../utils/requester";
import PropTypes from "prop-types";
import axios from "axios";
/**
 * A class component to control rendering the upper and lower parts of the artist page.
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <ArtistUserView artistId={"1"}/>
 * )
 */
class ArtistUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      id: "",
      img: "",
      photo: "",
      signInId: "",
      followStatus: false,
      bio: "",
    };
  }
  /**
   * After the component mount, fetch the needed artist data
   * @func
   * @returns {void}
   */
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
  /**
   * If the component updated, update the artist id and username
   * @func
   * @returns {void}
   */
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
  /**
   * A function to handle the follow actions. It toggle the button and make a request to the server
   * @func
   * @returns {void}
   */
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
      <div className="profile-user" data-testid="artist-user-view">
        <UpperContainer
          data-testid="artist-upper-container"
          artistId={this.props.artistId}
          handleFollowClick={this.handleFollowClick}
          followStatus={this.state.followStatus}
          username={this.state.username}
          cover={this.state.img}
        />
        <LowerContainer
          data-testid="artist-lower-container"
          artistId={this.props.artistId}
          bio={this.state.bio}
        />
      </div>
    );
  }
}
ArtistUserView.propTypes = {
  /**
   * The unique idetifier of the author
   */
  artistId: PropTypes.string.isRequired,
};
export default ArtistUserView;
