import React, { useCallback, useContext } from "react";
import firebase from "firebase";
import fb from "../firebase.js";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../auth/Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      var provider = new firebase.auth.GoogleAuthProvider();
      fb.auth()
        .signInWithRedirect(provider)
        .then((result) => {
          console.log("Login Successful");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default withRouter(Login);
