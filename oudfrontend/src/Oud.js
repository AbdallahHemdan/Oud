import React, { Component } from "react";
import Playlist from "./components/Playlist/playlist";
import LikedSongs from "./components/likedSongs/likedSongs";
import Album from "./components/album/album";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

import Search from "./pages/Search/Search";
import Account from "./pages/Account/Account";
import RedirectPage from "./components/Account/General/RedirectPage";
import Profile from "./pages/Profile/Profile";
import WebPlayer from "./components/WebPlayer/WebPlayer";
import Home from "./pages/Home/Home";

class Oud extends Component {
  constructor() {
    super();
    this.webPlayer = React.createRef();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home webPlayer={this.webPlayer} />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route path="/profile/:userId" component={Profile} />
            <Route path="/account" component={Account} />
            <Route path="/RedirectPage" component={RedirectPage} />
            <Route path={`/playlist/:id`} Component={<Playlist />}>
              <PlaylistRender />
            </Route>

            <Route path="/likedSongs/">
              <LikedSongs />
            </Route>

            <Route path="/albums/:id" Component={<Album />}>
              <AlbumRender />
            </Route>
          </Switch>
          <WebPlayer ref={this.webPlayer} />
        </div>
      </Router>
    );
  }
}

export default Oud;

function PlaylistRender() {
  let id = useParams();
  return <Playlist id={id} />;
}
function AlbumRender() {
  let id = useParams().id;
  return <Album id={id} />;
}
