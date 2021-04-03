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
            // console.log(doc.data());
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

                <Title level={4}>Full Name</Title>
                  <p style={{marginBottom: "20px"}}>{this.state.name}</p>

                <Title level={4}>Birthdate</Title>
                  <p style={{marginBottom: "20px"}}>{this.state.birthdate.split(" ").slice(1, 4).join(" ")}</p>
                
                <Title level={4}>Gender</Title>
                  <p style={{ textTransform: "capitalize", marginBottom: "20px" }}>{this.state.gender}</p>
                
                <Title level={4}>Reputation</Title>
                  <p style={{marginBottom: "20px"}}>{this.state.rep}</p>
                
                <Divider />

                <Title level={4}>Search Radius</Title>
                  <p style={{marginBottom: "20px"}}>{this.state.radius + " km"}</p>
                
                <Title level={4}>Preferences</Title>
                  <p style={{marginBottom: "20px", width: "315px"}}>{this.state.preferences.join(", ")}</p>

                <Divider />
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

                <br />
                <br />

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
                      backgroundColor: "white",
                      color: "#ff5252",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Sign Out
                  </Button>

                <Divider />
                <Divider />
            </Col>
            <Col flex="30px" />
          </Row>
          <Navbar />
        </div>
      )
    );
  }
}
