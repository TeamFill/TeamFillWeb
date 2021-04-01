import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import firebase from "firebase";

import basketball from "../assets/SportIcons/basketball.png";
import soccer from "../assets/SportIcons/soccer.png";
import football from "../assets/SportIcons/football.png";
import hockey from "../assets/SportIcons/hockey.png";
import volleyball from "../assets/SportIcons/volleyball.png";
import returnIcon from "../assets/return.png";
import infoIcon from "../assets/info.png";
import clockIcon from "../assets/clock.png";
import pinIcon from "../assets/pin.png";
import membersIcon from "../assets/members.png";

import { Typography, Row, Col, Button, Divider } from "antd";

const { Title } = Typography;

export default class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      adminInfo: {},
    };
  }

  componentDidMount = () => {
    this.getAdminInfo();
    this.getAttendeesInfo();
  };

  getAdminInfo = () => {
    let admin = this.props.location.aboutProps.admin;
    let currentComponent = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(admin)
          .get()
          .then((doc) => {
            console.log("Document grabbed data!");
            // console.log(doc.data());
            currentComponent.setState({
              adminInfo: {
                name: doc.data().fullname,
                rep: doc.data().rep,
              },
            });
          })
          .catch((error) => {
            console.error("Error reading document: ", error);
          });
      }
    });
  };

  getAttendeesInfo = () => {
    const attendees = [];
    console.log("event info");
    console.log(this.props.location.aboutProps);
    const currenentAttdendees = this.props.location.aboutProps.attendees;
    let currentComponent = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        currenentAttdendees.map((attendee) =>
          firebase
            .firestore()
            .collection("users")
            .doc(attendee.id)
            .get()
            .then((doc) => {
              console.log("Document grabbed data!");
              // console.log(doc.data());
              attendees.push({
                id: attendee.id,
                status: attendee.status,
                data: doc.data(),
              });
              currentComponent.setState({ attendees: attendees });
            })
            .catch((error) => {
              console.error("Error reading document: ", error);
            })
        );
      }
    });
  };

  getImage = (type) => {
    switch (type) {
      case "basketball":
        return basketball;
      case "soccer":
        return soccer;
      case "football":
        return football;
      case "hockey":
        return hockey;
      case "volleyball":
        return volleyball;
      default:
        return;
    }
  };

  leaveEvent = () => {
    const currentUser = firebase.auth().currentUser;
    const attendees = this.props.location.aboutProps.attendees.filter(
      (attendee) => attendee.id !== currentUser.uid
    );
    const eventid = this.props.location.aboutProps.eventid;
    firebase
      .firestore()
      .collection("events")
      .doc(eventid)
      .update({
        attendees: attendees,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    this.props.history.push("/myevents");
  };

  render() {
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2} style={styles.title}>
              <NavLink to={this.props.location.aboutProps.returnTo} exact>
                <img
                  style={{ marginRight: "10px" }}
                  src={returnIcon}
                  alt="return"
                />
              </NavLink>
              {this.props.location.aboutProps.name}
            </Title>

            <div style={styles.rectange}>
              <div style={styles.sportIcon}>
                <img
                  style={{ width: "70px", height: "70px" }}
                  src={this.getImage(this.props.location.aboutProps.type)}
                  alt="sportIcon"
                />
              </div>
              <Row>
                <Col style={{ width: "20%" }}>
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                    src={infoIcon}
                    alt="info"
                  />
                </Col>
                <Col style={{ width: "80%" }}>
                  <h4 style={{ marginLeft: "10px" }}>Description</h4>
                  <p style={styles.text}>
                    {this.props.location.aboutProps.description}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col style={{ width: "20%" }}>
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      marginLeft: "20px",
                      marginTop: "5px",
                    }}
                    src={clockIcon}
                    alt="clock"
                  />
                </Col>
                <Col style={{ width: "80%" }}>
                  <h4 style={{ marginLeft: "10px" }}>
                    {this.props.location.aboutProps.date.split(" ")[0] +
                      " at " +
                      this.props.location.aboutProps.time.split(" ")[4]}
                  </h4>
                  <p style={{ marginLeft: "10px", marginTop: "-10px" }}>
                    {this.props.location.aboutProps.date
                      .split(" ")
                      .slice(1, 4)
                      .join(" ")}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col style={{ width: "20%" }}>
                  <img
                    style={{
                      width: "25px",
                      height: "33.33px",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                    src={pinIcon}
                    alt="pin"
                  />
                </Col>
                <Col style={{ width: "80%" }}>
                  <h4 style={{ marginLeft: "10px" }}>1280 Main St W</h4>
                  <p style={{ marginLeft: "10px", marginTop: "-10px" }}>
                    Jan 27th, 2021
                  </p>
                  <p
                    style={{
                      marginLeft: "10px",
                      marginTop: "-20px",
                      fontStyle: "italic",
                    }}
                  >
                    10 km away
                  </p>
                </Col>
              </Row>

              <Row>
                <Col style={{ width: "20%" }}>
                  <img
                    style={{
                      width: "35.71px",
                      height: "25px",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                    src={membersIcon}
                    alt="members"
                  />
                </Col>
                <Col style={{ width: "80%" }}>
                  <h4 style={{ marginLeft: "10px", fontWeight: "bold" }}>
                    Member List
                  </h4>
                  <ul style={styles.ul}>
                    <li style={(styles.li, { fontWeight: "bold" })}>
                      {this.state.adminInfo.name +
                        " (" +
                        this.state.adminInfo.rep +
                        ")"}
                    </li>
                    {this.state.attendees.map((attendee) => (
                      <li style={styles.li} key={attendee.id}>
                        {attendee.data.fullname +
                          " (" +
                          attendee.data.rep +
                          ")"}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </div>

            {this.props.location.aboutProps.adminStatus === 0 ? (
              <div>
                <Divider />
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
                  onClick={() => this.leaveEvent()}
                >
                  LEAVE EVENT
                </Button>
              </div>
            ) : (
              <Divider />
            )}
          </Col>
          <Col flex="30px" />
        </Row>
        <Navbar />
      </div>
    );
  }
}

const styles = {
  rectange: {
    width: "100%",
    height: "100%",
    background: "#FFFFFF",
    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "15px",
    marginTop: 10,
  },
  title: {
    display: "flex",
    alignItems: "center" /* align vertical */,
    width: "315px",
    wordWrap: "break-word",
  },
  sportIcon: {
    display: "flex",
    justifyContent: "center" /* align horizontal */,
    alignItems: "center" /* align vertical */,
    margin: "50px",
  },
  ul: {
    listStyleType: "none" /* Remove bullets */,
    padding: 0 /* Remove padding */,
    margin: 0 /* Remove margins */,
    marginLeft: "10px",
    marginTop: "-10px",
  },
  li: {
    marginTop: "-5px",
  },
  text: {
    width: "200px",
    wordWrap: "break-word",
    marginLeft: "10px",
    marginTop: "-10px",
  },
};
