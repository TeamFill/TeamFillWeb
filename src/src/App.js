import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Profile from "./containers/Profile";

function App() {
  return (
    <Router>
      <Route path="/profile">
        <Profile />
      </Route>
    </Router>
  );
}

export default App;
