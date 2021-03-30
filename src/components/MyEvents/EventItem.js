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

  editOption = (admin) => {
    if (admin) {
      return <img src={editPen} alt="edit" />
    }
  }

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

  render() {
    return (
      <NavLink style={styles.rectange}
        to={{
          pathname: "/eventinfo",
          aboutProps: {
            eventid: this.props.eventid,
            adminStatus: this.props.adminStatus,
            name: this.props.name,
            attendees: this.props.attendees,
            date: this.props.date,
            description: this.props.description,
            time: this.props.time,
            type: this.props.type,
            // address: this.props.address,
            // coordinates: this.props.coordinates,
            returnTo: "/myevents",
          },
        }}
        exact
      >
        <Row style={{marginTop:20}}>
          <Col style={styles.columnIcon}>
            <img
              style={{ width: "30px", height: "30px" }}
              src={this.getImage(this.props.type)}
              alt="sportIcon"
            />
          </Col>

          <Col style={styles.columnMiddle}>
            {this.props.name} <br />
            {this.props.date.split(" ").slice(1, 4).join(" ") + ' ' + this.props.time.split(" ")[4]}
          </Col>

          <Col style={styles.columnPen}>
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
                  // address: this.props.address,
                  // coordinates: this.props.coordinates,
                  returnTo: "/myevents",
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
