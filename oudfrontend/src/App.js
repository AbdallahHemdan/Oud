import Search from "./pages/Search/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "../src/Account/Components/Account/Account";
import RedirectPage from "../src/Account/General/RedirectPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route path="/account" component={Account} />
        <Route path="/RedirectPage" component={RedirectPage} />
      </Switch>
    </Router>
  );
}

export default App;
