import React, { Component } from "react";
import Playlist from "./components/Playlist/playlist";
import LikedSongs from "./components/likedSongs/likedSongs";
import CreateAlbum from "./components/CreateAlbum/CreateAlbum";
import Album from "./components/album/album";
import Search from "./pages/Search/Search";
import Account from "./pages/Account/Account";
import RedirectPage from "./components/Account/General/RedirectPage";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SeeAll from "./components/SeeAll/SeeAll";
import Overview from "./pages/RoutingPages/OverView";
import SignUp from "./pages/Signup/index";
import SignIn from "./pages/Login/loginPage";
import ForgotPassword from "./components/Login&Signup/ForgetPassword/ForgotPassword";
import ResetPassword from "./components/Login&Signup/ForgetPassword/resetPassword";
import Entered from "./components/Login&Signup/logined/entered";
import Islinked from "./components/Login&Signup/linkisSent";
import WhyGoPremium from "./components/Premium/Component/WhyGoPremium/WhyGoPremium";
import GetPremium from "./components/Premium/Component/GetPremium/GetPremium";
import Welcome from "./pages/Welcome/welcome";
import SuggestedArtist from "./pages/SuggestedArtistPage/SuggestedArtist";
import SeeAllRecentSearches from "./components/SeeAllRecentSearches/SeeAllRecentSearches";
import WebPlayer from "./components/WebPlayer/WebPlayer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";
import Artist from "./pages/Artist/Artist";
import { base } from "./config/environment";
import SongInfo from "./components/SongInfo/SongInfo";
import { createBrowserHistory } from "history";
import firebase from "./firebase";
import axios from "axios";
import { config } from "./utils/auth";
import "./App.css";
import Help from './components/Welcome/Footer/Help';
import ForArtist from './components/Welcome/Footer/ForArtist';
import ContactUs from './components/Welcome/Footer/contactUs';
import Features from './components/Welcome/Footer/Features';
import About from './components/Welcome/Footer/About';
let history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationToken: ""
    };
  }

  askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token1 = await messaging.getToken();
      console.log("Hmmmmmmmm Ok :", token1);
      this.setState({ notificationToken: token1 });
      axios
        .put(
          "https://oud-zerobase.me/api/v1/me/notifications",
          {
            token: token1
          },
          config
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.message);
        });

      return token1;
    } catch (error) {
      console.error("No", error);
    }
  };
  render() {
    return (
      <Router>
        <div
          className="App"
          onClick={this.askForPermissioToReceiveNotifications}
        >
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/genre/:genreName">
              <SeeAll />
            </Route>
            <Route exact path="/recent-search">
              <SeeAllRecentSearches />
            </Route>
            <Route path="/artist/:artistId" component={Artist} />
            <Route path="/profile/:userId" component={Profile} />
            <Route path="/account" component={Account} />
            <Route path="/goPremium" component={WhyGoPremium} />
            <Route path="/getPremium" component={GetPremium} />

            <Route path="/RedirectPage">
              <RedirectPage />
            </Route>
            <Route path={`/playlist/:id`} Component={<Playlist />}>
              <PlaylistRender />
            </Route>
            <Route path="/create-album/">
              <CreateAlbum
                endpoint={`${base}/me/artists/albums`}
                title="Create new Album"
                update={false}
              />
            </Route>
            <Route
              path="/song-info/"
              render={props => (
                <SongInfo
                  {...props}
                  history={history}
                  songId={props.location.state.id}
                />
              )}
            />
            <Route path="/likedSongs/">
              <LikedSongs />
            </Route>
            <Route path="/albums/:id" Component={<Album />}>
              <AlbumRender />
            </Route>
            <Route exact path="/welcome">
              <Welcome />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
            <Route exact path="/forartists">
              <ForArtist />
            </Route>
            <Route exact path="/overview">
              <Overview />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route exact path="/contactus">
              <ContactUs />
            </Route>
            <Route exact path="/features">
              <Features />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route path="/resetpassword/:token">
              <ResetPassword />
            </Route>
            <Route
              path="/verify/:token"
              render={props => <Entered {...props} />}
            />
            <Route exact path="/islanded">
              <Islinked />
            </Route>
            <Route exact path="/SuggestedArtist">
              <SuggestedArtist />
            </Route>
          </Switch>
          <WebPlayer />
        </div>
      </Router>
    );
  }
}

export default App;
function PlaylistRender() {
  let id = useParams();
  return <Playlist id={id} />;
}
function AlbumRender() {
  let id = useParams().id;
  return <Album id={id} />;
}