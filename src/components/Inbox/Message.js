import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import basketball from "../../assets/SportIcons/basketball.png";
import soccer from "../../assets/SportIcons/soccer.png";
import football from "../../assets/SportIcons/football.png";
import hockey from "../../assets/SportIcons/hockey.png";
import volleyball from "../../assets/SportIcons/volleyball.png";
import editPen from "../../assets/editPen.png";

import { Row, Col } from "antd";

export default class Message extends Component {

  editOption = (admin) => {
    if (admin) {
      return <img src={editPen} alt="edit" />
    }
  }

  getImage = (sport) => {
    switch (sport) {
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

  render() {
    return (
    //   <NavLink style={styles.rectange}
    //     to={{
    //       pathname: "/eventinfo",
    //       aboutProps: {
    //         title: this.props.event,
    //         time: this.props.time,
    //         ball: this.props.sport,
    //         returnTo: "/myevents",
    //       },
    //     }}
    //     exact
    //   >
        <Row style={{marginTop:20}}>
          <Col style={styles.columnIcon}>
              test
          </Col>

          <Col style={styles.columnMiddle}>
            
          </Col>

          <Col style={styles.columnPen}>

          </Col>
        </Row>
    //   </NavLink>
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