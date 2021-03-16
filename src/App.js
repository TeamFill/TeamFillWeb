import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    // <AuthProvider>
    <Router>
      <div>
        <Route exact path="/" component={Profile} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
    // </AuthProvider>
  );
}

export default App;
