import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
class Google extends Component {
  state = {
    islogin: false,
    tokenid: '',
    name: '',
  };

  responseGoogle = (response) => {
    console.log(response);
    this.setState({
      islogin: true,
      tokenid: response.accessToken,
      name: response.name,
    });
  };

  onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    this.setState.tokenid = googleUser.accessToken;

    console.log('Name: ' + profile.getName());
  };
  componentClicked = () => console.log('clicked');

  render() {
    let Googles;
    if (this.state.isSignedIn) {
      Googles = <div>google is login in </div>;
    } else {
      Googles = (
        <GoogleLogin
          clientId="316826723061-6q2d0nckr5u6p94hd98j4d7ra2jmh2ik.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className="g-signin2" data-onsuccess="onSignIn">
              <button className="g-signin2"></button>
            </div>
          )}
          isSignedIn={false}
          onSuccess={this.componentClicked}
          onFailure={this.responseGoogle}
          callback={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      );
    }

    return <div> {Googles}</div>;
  }
}
export default Google;
