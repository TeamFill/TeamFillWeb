import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import { Button } from "antd";

import basketball from "../../assets/SportIcons/basketball.png";
import soccer from "../../assets/SportIcons/soccer.png";
import football from "../../assets/SportIcons/football.png";
import hockey from "../../assets/SportIcons/hockey.png";
import volleyball from "../../assets/SportIcons/volleyball.png";
import editPen from "../../assets/editPen.png";

import { Row, Col } from "antd";
const _ = require("lodash");

export default class EventItem extends Component {
  state = {
    inEvent: false,
  };

  componentDidMount = () => {
    this.checkIfInEvent();
  };

  editOption = (admin) => {
    if (admin === 1) {
      return <img src={editPen} alt="edit" />;
    }
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

  checkIfInEvent = () => {
    const currentUser = firebase.auth().currentUser;
    const checkAccepted = this.props.attendees.some((e) =>
      _.isEqual(e, { id: currentUser.uid, status: "accepted" })
    );
    const checkPending = this.props.attendees.some((e) =>
      _.isEqual(e, { id: currentUser.uid, status: "pending" })
    );
    if (currentUser.uid === this.props.admin || checkAccepted || checkPending) {
      this.setState({ inEvent: true });
    } else {
      this.setState({ inEvent: false });
    }
  };

  handleClick = () => {
    const currentUser = firebase.auth().currentUser;
    if (this.props.privacy === true) {
      firebase
        .firestore()
        .collection("events")
        .doc(this.props.eventid)
        .update({
          attendees: firebase.firestore.FieldValue.arrayUnion({
            id: currentUser.uid,
            status: "pending",
          }),
        });
    } else if (this.props.privacy === false) {
      firebase
        .firestore()
        .collection("events")
        .doc(this.props.eventid)
        .update({
          attendees: firebase.firestore.FieldValue.arrayUnion({
            id: currentUser.uid,
            status: "accepted",
          }),
        });
    }
  };

  render() {
    return (
      <NavLink
        style={styles.rectange}
        to={{
          pathname: "/eventinfo",
          aboutProps: {
            eventid: this.props.eventid,
            admin: this.props.admin,
            adminStatus: this.props.adminStatus,
            name: this.props.name,
            attendees: this.props.attendees,
            date: this.props.date,
            description: this.props.description,
            time: this.props.time,
            type: this.props.type,
            privacy: this.props.privacy,
            address: this.props.address,
            coordinates: this.props.coordinates,
            returnTo: this.props.returnTo,
          },
        }}
        exact
      >
        <Row style={{ marginTop: 20 }}>
          <Col style={styles.columnIcon}>
            <img
              style={{ width: "30px", height: "30px" }}
              src={this.getImage(this.props.type)}
              alt="sportIcon"
            />
          </Col>

          <Col style={styles.columnMiddle}>
            {this.props.name} <br />
            {this.props.date.split(" ").slice(1, 4).join(" ") +
              " " +
              this.props.time.split(" ")[4].slice(0, -3)}
          </Col>

          <Col style={styles.columnPen}>
            {this.props.adminStatus === 2 && !this.state.inEvent ? (
              <Button
                style={{
                  width: "100%",
                  height: 50,
                  borderRadius: 15,
                  borderColor: "#ff5252",
                  backgroundColor: "#ff5252",
                  fontSize: "small",
                  marginRight: "10px",
                }}
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleClick();
                }}
              >
                Request <br /> to Join
              </Button>
            ) : null}

            <NavLink
              to={{
                pathname: "/editevent",
                aboutProps: {
                  eventid: this.props.eventid,
                  adminStatus: this.props.adminStatus,
                  name: this.props.name,
                  attendees: this.props.attendees,
                  date: this.props.date,
                  description: this.props.description,
                  time: this.props.time,
                  type: this.props.type,
                  privacy: this.props.privacy,
                  address: this.props.address,
                  coordinates: this.props.coordinates,
                  returnTo: this.props.returnTo,
                },
              }}
              exact
            >
              {this.editOption(this.props.adminStatus)}
            </NavLink>
          </Col>
        </Row>
      </NavLink>
    );
  }
}

const styles = {
  rectange: {
    // width: "100%",
    width: "315px",
    height: "91px",
    background: "#FFFFFF",
    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "15px",
    marginTop: 20,
  },
  columnIcon: {
    float: "left",
    width: "25%",
    padding: "auto",
    display: "flex",
    justifyContent: "center" /* align horizontal */,
    alignItems: "center" /* align vertical */,
  },
  columnMiddle: {
    width: "50%",
    padding: "auto",
    display: "flex",
    // justifyContent: "center", /* align horizontal */
    alignItems: "center" /* align vertical */,
    color: "black",
    wordWrap: "break-word",
  },
  columnPen: {
    float: "right",
    width: "25%",
    padding: "auto",
    display: "flex",
    justifyContent: "center" /* align horizontal */,
    alignItems: "center" /* align vertical */,
  },
};
