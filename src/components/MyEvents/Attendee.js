import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import person from "../../assets/person.svg";

import { Row, Col, Button } from "antd";

export default class Attendee extends Component {

  render() {
    return (
        <Row style={{marginTop:20}}>
          <Col style={styles.columnIcon}>
            <img
              src={person}
              alt="person"
            />
          </Col>

          <Col style={styles.columnMiddle}>
            {this.props.name + " ("+ this.props.rep + ")"} <br />
            {this.props.status}
          </Col>

          <Col style={styles.columnPen}>
            {(this.props.status === "accepted" ) ?<Button 
              type="secondary" 
              shape="circle" 
              icon={<DeleteOutlined />} 
              style={{background: "rgb(190, 200, 200)"}}
              onClick={() => this.props.delBtn(this.props.id)}
            />: <>
            <Button
              onClick={() => this.props.acceptBtn(this.props.id, "accepted")}
              type="danger"
              shape="circle"
              icon={<CheckOutlined />}
              style={{ marginRight: 20 }}
            />
            <Button
              onClick={() => this.props.rejectBtn(this.props.id, "rejected")}
              type="secondary"
              shape="circle"
              icon={<CloseOutlined />}
              style={{ background: "rgb(190, 200, 200)" }}
            />
          </>}
          </Col>
        </Row>
    );
  }
}

const styles = {
  rectange: {
    width: "100%",
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
    color: "black"
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
