import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Typography, Form, Button, Divider, Row, Col } from "antd";
import Navbar from "../components/Navbar";
import firebase from "firebase";

const { Title } = Typography;
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    let currentComponent = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            console.log("Document grabbed data!");
            console.log(doc.data());
            currentComponent.setState({
              name: doc.data().fullname,
              birthdate: doc.data().birthdate,
              gender: doc.data().gender,
              rep: doc.data().rep,
              radius: doc.data().radius,
              preferences: doc.data().preferences,
              loading: false,
            });
          })
          .catch((error) => {
            console.error("Error reading document: ", error);
          });
      }
    });
  }

  render() {
    return (
      !this.state.loading && (
        <div>
          <Row style={{ marginTop: 40, width: "100%", height: "100%" }}>
            <Col flex="30px" />
            <Col flex="auto">
              <Title level={2}>My Profile</Title>
              <Form name="basic">
                <Form.Item label="Full Name" name="fullname">
                  <Title level={4}>{this.state.name}</Title>
                </Form.Item>

                <Form.Item label="Birthdate" name="birthdate">
                  <Title level={4}>{this.state.birthdate.split(" ").slice(1, 4).join(" ")}</Title>
                </Form.Item>

                <Form.Item label="Gender" name="gender">
                  <Title level={4}>{this.state.gender}</Title>
                </Form.Item>

                <Form.Item label="Reputation" name="reputation">
                  <Title level={4}>{this.state.rep}</Title>
                </Form.Item>

                <Divider />

                <Form.Item label="Search Radius" name="radius">
                  <Title level={4}>{this.state.radius + " km"}</Title>
                </Form.Item>

                <Form.Item label="Preferences" name="preferences">
                  <Title level={4}>{this.state.preferences.join(", ")}</Title>
                </Form.Item>

                <Form.Item>
                  <NavLink
                    to={{
                      pathname: "/editprofile",
                      aboutProps: {
                        name: this.state.name,
                        birthdate: this.state.birthdate,
                        gender: this.state.gender,
                        radius: this.state.radius,
                        preferences: this.state.preferences,
                        returnTo: "/profile",
                      },
                    }}
                    exact
                  >
                    <Button
                      style={{
                        width: "100%",
                        height: 50,
                        borderRadius: 15,
                        borderColor: "#ff5252",
                        backgroundColor: "#ff5252",
                      }}
                      type="primary"
                      htmlType="submit"
                    >
                      Edit Profile
                    </Button>
                  </NavLink>
                </Form.Item>

                <Divider />

                <Form.Item>
                  <Button
                    onClick={() => {
                      firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          console.log("logged out");
                        })
                        .catch((error) => {
                          // An error happened.
                        });
                    }}
                    shape="round"
                    style={{
                      width: "100%",
                      height: 50,
                      borderRadius: 15,
                      borderColor: "#ff5252",
                      backgroundColor: "#ff5252",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Sign Out
                  </Button>
                </Form.Item>

                <Divider />
                <Divider />
              </Form>
            </Col>
            <Col flex="30px" />
          </Row>
          <Navbar />
        </div>
      )
    );
  }
}
