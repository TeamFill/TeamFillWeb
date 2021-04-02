import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import person from "../../assets/person.svg";

import { Row, Col, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";

import firebase from "firebase";

export default class Request extends Component {
  state = {
    title: this.props.data.eventdata.name,
    name: this.props.data.userdata.fullname,
    rep: this.props.data.userdata.rep,
  };

  render() {
    console.log(this.props.data.eventdata)
    return (
      <Row style={styles.rectange}>
        <Col style={styles.columnIcon}>
          <img src={person} alt="person" />
        </Col>

        <Col style={styles.columnMiddle}>
          {this.state.name + " (" + this.state.rep + ") has requested to join " + this.state.title}
        </Col>

        <Col style={styles.columnPen}>
          <NavLink
            to={{
              pathname: "/editevent",
              aboutProps: {
                eventid: this.props.data.eventid,
                name: this.props.data.eventdata.name,
                attendees: this.props.data.eventdata.attendees,
                date: this.props.data.eventdata.date,
                description: this.props.data.eventdata.description,
                time: this.props.data.eventdata.time,
                type: this.props.data.eventdata.type,
                privacy: this.props.data.eventdata.privacy,
                address: this.props.data.eventdata.address,
                coordinates: this.props.data.eventdata.coordinates,
                returnTo: "/inbox",
              },
            }}
            exact
          >
          <Button
            type="danger"
            shape="circle"
            icon={<ExportOutlined />}
            // style={{ background: "rgb(190, 200, 200)" }}
          />
          </NavLink>
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
    width: "55%",
    padding: "auto",
    display: "flex",
    // justifyContent: "center", /* align horizontal */
    alignItems: "center" /* align vertical */,
    color: "black",
  },
  columnPen: {
    float: "right",
    width: "20%",
    padding: "auto",
    display: "flex",
    justifyContent: "center" /* align horizontal */,
    alignItems: "center" /* align vertical */,
  },
};
