import React, { Component } from "react";

import person from "../../assets/person.svg";

import { Row, Col, Button } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default class Request extends Component {
    state= {
        title: "Approval Request",
        name: "Pranav P.",
        rep: 50
    }

  render() {
    return (

        <Row style={styles.rectange}>
          <Col style={styles.columnIcon}>
            <img
              src={person}
              alt="person"
            />
          </Col>

          <Col style={styles.columnMiddle}>
            {this.state.title} <br />
            {this.state.name + " (" + this.state.rep + ")"}
          </Col>

          <Col style={styles.columnPen}>
            <Button type="danger" shape="circle" icon={<CheckOutlined />} style={{marginRight: 20}}/>
            <Button type="secondary" shape="circle" icon={<CloseOutlined />} style={{background: "rgb(190, 200, 200)"}}/>
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
    width: "40%",
    padding: "auto",
    display: "flex",
    // justifyContent: "center", /* align horizontal */
    alignItems: "center" /* align vertical */,
    color: "black"
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
