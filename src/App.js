import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login";
import Event from "./containers/Event";
import Profile from "./containers/Profile";
import HomepageMap from "./containers/HomepageMap";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";

require("dotenv").config();

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={HomepageMap} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/event" component={Event} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
