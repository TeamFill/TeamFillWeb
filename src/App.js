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
import Chat from './containers/Chat';

require("dotenv").config();

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/home" component={HomepageMap} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/onboarding" component={Onboarding} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/editprofile" component={EditProfile} />
          <Route exact path="/myevents" component={MyEvents} />
          <Route exact path="/eventinfo" component={EventInfo} />
          <Route exact path="/create" component={CreateEvent} />
          <Route exact path="/editevent" component={EditEvent} />
          <Route exact path="/inbox" component={Inbox} />
          {/* Ninos Yomo */}
          <Route exact path="/chat" component={Chat} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
