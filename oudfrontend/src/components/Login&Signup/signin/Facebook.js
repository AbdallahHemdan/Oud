import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import '../signup/signup.css';
import { Redirect } from 'react-router-dom';
/**Facebook class creation */
class Facebook extends Component {
  /**
   * this state
   *@type {{islogin:boolean,tokenid:string,name:string}}
   */
  state = {
    islogin: false,
    tokenid: '',
    name: '',
  };
  /**
   * if it response it is change the state values to login by facebook
   * @function
   * @param {object} response
   * @returns {void}
   */
  responseFacebook = (response) => {
    this.setState({
      islogin: true,
      tokenid: response.accessToken,
      name: response.name,
    });
  };

  /**
   * to check if the button is clicked
   * @function
   * @returns {void}
   */
  componentClicked = () => console.log('clicked');
  /**
   * the render of the button and the data that returns
   * @function
   * @returns {void}
   */
  render() {
    let FBcontant;

    if (this.state.islogin) {
      FBcontant = <Redirect to="/Home"></Redirect>;
    } else {
      FBcontant = (
        <FacebookLogin
          render={(renderProps) => (
            <button disabled={renderProps.enable}>
              <img
                alt="facebookicon"
                src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19754.png"
                className="facebookicon"
              ></img>
              login with facebook
            </button>
          )}
          appId=""
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          size="medium"
        />
      );
    }

    return <div>{FBcontant}</div>;
  }
}

export default Facebook;
