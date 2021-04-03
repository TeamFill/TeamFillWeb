import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import firebase from "firebase";
import EventItem from "../components/MyEvents/EventItem";

import returnIcon from "../assets/return.svg";


import { Typography, Row, Col } from "antd";

const { Title } = Typography;

export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allevents: []
    };
  }

  componentDidMount = () => {
      this.getAllEvents()
  }

  getAllEvents = async () => {
    const allevents = []
    const eventsRef = await firebase.firestore().collection("events").get()
    if (eventsRef.empty) {
        console.log("No matching documents.");
        return; 
    }

    eventsRef.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        allevents.push({admin: 2, eventid: doc.id, data: doc.data()});
    });
    this.setState({allevents: [...this.state.allevents, ...allevents]});

  }

  render() {
      const toShow = this.state.allevents;
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2} style={styles.title}>
              <NavLink to="/home" exact>
                <img
                  style={{ marginRight: "10px" }}
                  src={returnIcon}
                  alt="return"
                />
              </NavLink>
              List View
            </Title>
            {toShow.map((event) => (
              <Row key={event.eventid}>
                <EventItem
                  key={event.eventid}
                  eventid={event.eventid}
                  adminStatus={event.admin}
                  name={event.data.name}
                  admin={event.data.admin}
                  attendees={event.data.attendees}
                  date={event.data.date}
                  description={event.data.description}
                  time={event.data.time}
                  type={event.data.type}
                  address={event.data.address}
                  coordinates={event.data.coordinates}
                  privacy={event.data.privacy}

                  returnTo="/listview"
                />
              </Row>
            ))}
          </Col>
          <Col flex="30px" />
          
        </Row>
        <br />
        <br />
        <br />
        <br />
        <Navbar />
      </div>
    );
  }
}

const styles = {
    title: {
      display: "flex",
      alignItems: "center" /* align vertical */,
      width: "315px",
      wordWrap: "break-word",
    },
  };