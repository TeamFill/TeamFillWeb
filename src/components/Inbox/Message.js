import React, { Component } from "react";

import person from "../../assets/person.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col } from "antd";

export default class Request extends Component {
    state= {
        title: "Event 1",
        msg: "Hey Hey Hey",
        time: "9:41 AM"
    }

  render() {
    return (
      <Link to="/chat">
        <Row style={styles.rectange}>
          <Col style={styles.columnIcon}>
            <img
              src={person}
              alt="person"
            />
          </Col>

          <Col style={styles.columnMiddle}>
            <Row style={{position: "absolute", top: 0, height: "100%"}}>
              Test
              <Col style={styles.topLeft}>
                {this.state.title}
              </Col>
              <Col style={styles.topRight}>
                {this.state.time}
              </Col>
            </Row>

            <Row style={{position: "absolute", bottom: 0, height: "100%"}}>
              {this.state.msg}
            </Row>
          </Col>
        </Row>
      </Link>
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
    marginBottom: -10
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
    position: "relative",
    width: "75%",
    height: "100%",
    // minHeight: "90px",
    // padding: "auto",
    // display: "flex",
    // justifyContent: "center", /* align horizontal */
    // alignItems: "center" /* align vertical */,
    // color: "black",
    // background: "yellow"
  }
};
