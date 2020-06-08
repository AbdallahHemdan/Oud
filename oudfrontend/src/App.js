import React from "react";
import "./App.css";
import Playlist from "./components/Playlist/playlist";
import LikedSongs from "./components/likedSongs/likedSongs";
import Album from "./components/album/album";
import Account from "./pages/Account/Account";
import RedirectPage from "./components/Account/General/RedirectPage";

import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SeeAll from './components/SeeAll/SeeAll';
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
import Welcome from './pages/Welcome/welcome';
import SeeAllRecentSearches from "./components/SeeAllRecentSearches/SeeAllRecentSearches"
import WhyGoPremium from "./components/Premium/WhyGoPremium/WhyGoPremium";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
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
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/account" component={Account} />
          <Route path="/goPremium" component={WhyGoPremium} />
          <Route path="/RedirectPage">
            <RedirectPage />
          </Route>
          <Route exact path={`/playlist/:id`} Component={<Playlist />}>
            <PlaylistRender />
          </Route>
          <Route exact path="/likedSongs/">
            <LikedSongs />
          </Route>
          <Route exact path="/albums/:id/:songId" Component={<Album />}>
            <AlbumRender2 />
          </Route>
          <Route exact path="/albums/:id" Component={<Album />}>
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
          <Route exact path="/reset-password">
            <ResetPassword />
          </Route>
          <Route exact path="/entered">
            <Entered />
          </Route>
          <Route exact path="/islanded">
            <Islinked />
          </Route>
        </Switch>
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
  return <Album id={id} songId = {null}/>;
}
function AlbumRender2() {
  let id = useParams().id;
  let songId = useParams().songId;
  return <Album id={id} songId={songId}/>;
}
