import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import basketball from "../../assets/SportIcons/basketball.png";
import soccer from "../../assets/SportIcons/soccer.png";
import football from "../../assets/SportIcons/football.png";
import hockey from "../../assets/SportIcons/hockey.png";
import volleyball from "../../assets/SportIcons/volleyball.png";
import editPen from "../../assets/editPen.png";

import { Row, Col } from "antd";

export default class EventItem extends Component {
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
      <Row style={styles.rectange}>
        <Col style={styles.columnIcon}>
          <img
            style={{ width: "30px", height: "30px" }}
            src={this.getImage(this.props.sport)}
            alt="sportIcon"
          />
        </Col>

        <Col style={styles.columnMiddle}>
          {this.props.event} <br />
          {this.props.time}
        </Col>
        <Col style={styles.columnPen}>
          <NavLink
            to={{
              pathname: "/eventinfo",
              aboutProps: {
                title: this.props.event,
                time: this.props.time,
                ball: this.props.sport,
                returnTo: "/myevents",
              },
            }}
            exact
          >
            <img src={editPen} alt="edit" />
          </NavLink>
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
