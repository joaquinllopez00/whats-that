import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Nav } from "./components/Nav";
function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
