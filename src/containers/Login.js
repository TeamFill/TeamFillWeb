import React, { useCallback, useContext } from "react";
import firebase from "firebase";
import fb from "../firebase.js";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../auth/Auth";

import { Typography, Button, Row, Col, Image } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";

const { Title } = Typography;

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
      <Row style={{ marginTop: 100, width: "100%" }}>
        <Col flex="30px" />
        <Col flex="auto">
          <Image
            width={175}
            style={{
              marginTop: 130,
              marginLeft: "38%",
            }}
            src={logo}
          />
          <Title style={{ textAlign: "center", marginBottom: 120 }}>
            TeamFill
          </Title>
          <Button
            style={{
              width: "100%",
              height: 50,
              borderRadius: 15,
              borderColor: "#ff5252",
              color: "#ff5252",
              fontWeight: "bold",
            }}
            onClick={handleLogin}
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>
          {/* <Text>By logging in, you agree to our Terms and Privacy Policy</Text> */}
        </Col>
        <Col flex="30px" />
      </Row>
    </div>
  );
};

export default withRouter(Login);
