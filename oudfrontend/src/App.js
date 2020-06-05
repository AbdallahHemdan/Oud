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
import Download from "./pages/RoutingPages/download";
import Help from "./pages/RoutingPages/help";
import Premium from "./pages/RoutingPages/premium";
import Overview from "./pages/RoutingPages/OverView";
import SignUp from "./pages/Signup/index";
import SignIn from "./pages/Login/loginPage";
import ForgotPassword from "./components/Login&Signup/ForgetPassword/ForgotPassword";
import ResetPassword from "./components/Login&Signup/ForgetPassword/resetPassword";
import Entered from "./components/Login&Signup/logined/entered";
import Islinked from "./components/Login&Signup/linkisSent";
import WhyGoPremium from "./components/Premium/Component/WhyGoPremium/WhyGoPremium";
import GetPremium from "./components/Premium/Component/GetPremium/GetPremium";
import Ads from "./components/Premium/Component/Ads/Ads";
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
import "./App.css";

let history = createBrowserHistory();

function App() {
  return (
    <Router>
      <div className="App">
        <Ads />
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
          {/* <Route path="/create-playlist/">
            <CreatePlaylist display={true} />
          </Route> */}
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
          <Route exact path="/download">
            <Download />
          </Route>
          <Route exact path="/help">
            <Help />
          </Route>
          <Route exact path="/premium">
            <Premium />
          </Route>
          <Route exact path="/overview">
            <Overview />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
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

export default App;
function PlaylistRender() {
  let id = useParams();
  return <Playlist id={id} />;
}
function AlbumRender() {
  let id = useParams().id;
  return <Album id={id} />;
}
