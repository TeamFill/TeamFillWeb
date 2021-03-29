import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login";
import CreateEvent from "./containers/CreateEvent";
import EditEvent from "./containers/EditEvent";
import Profile from "./containers/Profile";
import EditProfile from "./containers/EditProfile";
import HomepageMap from "./containers/HomepageMap";
import MyEvents from "./containers/MyEvents";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";
import EventInfo from "./containers/EventInfo";
import Inbox from "./containers/Inbox";
import Onboarding from "./containers/Onboarding";

require("dotenv").config();

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/home" component={HomepageMap} />
          <PrivateRoute exact path="/onboarding" component={Onboarding} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/editprofile" component={EditProfile} />
          <PrivateRoute exact path="/myevents" component={MyEvents} />
          <PrivateRoute exact path="/eventinfo" component={EventInfo} />
          <PrivateRoute exact path="/create" component={CreateEvent} />
          <PrivateRoute exact path="/editevent" component={EditEvent} />
          <PrivateRoute exact path="/inbox" component={Inbox} />
          <PrivateRoute exact path="/" component={HomepageMap} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
