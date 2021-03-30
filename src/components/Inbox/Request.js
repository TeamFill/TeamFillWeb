import React, { Component } from "react";
import { Redirect } from "react-router";

import person from "../../assets/person.svg";

import { Row, Col, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import firebase from "firebase";

export default class Request extends Component {
  state = {
    title: this.props.data.eventdata.name,
    name: this.props.data.userdata.fullname,
    rep: this.props.data.userdata.rep,
  };

  handleClick = (evt) => {
    let myArray = this.props.data.eventdata.attendees;
    let attendeeId = this.props.data.attendee;
    let eventId = this.props.data.eventid;
    myArray = myArray.filter(function (obj) {
      return obj.id !== attendeeId;
    });

    if (evt == "accept") {
      myArray.push({ id: attendeeId, status: "accepted" });
    } else {
      myArray.push({ id: attendeeId, status: "rejected" });
    }

    firebase.firestore().collection("events").doc(eventId).update({
      attendees: myArray,
    });

    window.location.reload(false);
  };

  render() {
    return (
      <Row style={styles.rectange}>
        <Col style={styles.columnIcon}>
          <img src={person} alt="person" />
        </Col>

        <Col style={styles.columnMiddle}>
          {this.state.title} <br />
          {this.state.name + " (" + this.state.rep + ")"}
        </Col>

        <Col style={styles.columnPen}>
          <Button
            onClick={() => this.handleClick("accept")}
            type="danger"
            shape="circle"
            icon={<CheckOutlined />}
            style={{ marginRight: 20 }}
          />
          <Button
            onClick={() => this.handleClick()}
            type="secondary"
            shape="circle"
            icon={<CloseOutlined />}
            style={{ background: "rgb(190, 200, 200)" }}
          />
        </Col>
      </Row>
    );
  }
}

const styles = {
  rectange: {
    width: "315px",
    height: "91px",
    background: "#FFFFFF",
    borderTop: "1px solid #C4C4C4",
    boxSizing: "border-box",
    marginTop: 5,
    marginBottom: -10,
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
    width: "40%",
    padding: "auto",
    display: "flex",
    // justifyContent: "center", /* align horizontal */
    alignItems: "center" /* align vertical */,
    color: "black",
  },
  columnPen: {
    float: "right",
    width: "35%",
    padding: "auto",
    display: "flex",
    justifyContent: "center" /* align horizontal */,
    alignItems: "center" /* align vertical */,
  },
};
