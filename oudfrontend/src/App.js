import React from "react";
import Playlist from "./components/Playlist/playlist";
import LikedSongs from "./components/likedSongs/likedSongs";
import Album from "./components/album/album";
import Search from "./pages/Search/Search";
import Account from "./pages/Account/Account";
import RedirectPage from "./components/Account/General/RedirectPage";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SeeAll from "./components/SeeAll/SeeAll";
import WelcomeUser from "./pages/WelcomePage/welcomeUser";
import WelcomeGuest from "./pages/WelcomePage/welcomeGuest";
import Download from "./pages/RoutingPages/download";
import Help from "./pages/RoutingPages/help";
import Premium from "./pages/RoutingPages/premium";
import Overview from "./pages/RoutingPages/OverView";
import SignUp from "./pages/SignUpPage/index";
import SignIn from "./pages/LoginPage/loginPage";
import ForgotPassword from "./components/Login&Signup/ForgetPassword/ForgotPassword";
import ResetPassword from "./components/Login&Signup/ForgetPassword/resetPassword";
import Entered from "./components/Login&Signup/logined/entered";
import Islinked from "./components/Login&Signup/linkisSent";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";
import "./App.css";
import Welcome from './pages/WelcomePage/welcome';
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

          <Route path="/profile/:userId" component={Profile} />
          <Route path="/account" component={Account} />

          <Route path="/RedirectPage">
            <RedirectPage />
          </Route>

          <Route path={`/playlist/:id`} Component={<Playlist />}>
            <PlaylistRender />
          </Route>
          <Route path="/likedSongs/">
            <LikedSongs />
          </Route>
          <Route path="/albums/:id" Component={<Album />}>
            <AlbumRender />
          </Route>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/welcome-guest">
            <WelcomeGuest />
          </Route>
          <Route exact path="/welcome-user">
            <WelcomeUser />
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
  return <Album id={id} />;
}
