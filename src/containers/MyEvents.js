import React, { Component } from "react";
import firebase from "firebase";
import { Typography, Row, Col } from "antd";
import EventItem from "../components/MyEvents/EventItem";
import Navbar from "../components/Navbar";

const { Title } = Typography;

const styles = {
  unClicked: {
    color: "Black",
    fontWeight: 100,
  },
  Clicked: {
    color: "Black",
  },
};

export default class MyEvent extends Component {
  state = {
    admin: 0,
    attendingStyle: styles.Clicked,
    createdStyle: styles.unClicked,
    events: [],
  };

  componentDidMount = () => {
    const currentUser = firebase.auth().currentUser;
    this.getEventsCreated(currentUser.uid);
    this.getEventsAttending(currentUser.uid);
  }

  returnAsAdmin = () => {
    if (this.props.location.hasOwnProperty("aboutProps")) {
      return 1;
    } else {
      return 0;
    }
  };

  handleadmin = (e, admin) => {
    if (admin === 0) {
      //attending
      this.setState({ admin: 0 });
      this.setState({ attendingStyle: styles.Clicked });
      this.setState({ createdStyle: styles.unClicked });
      console.log("Attending");
    } else {
      //created
      this.setState({ admin: 1 });
      this.setState({ attendingStyle: styles.unClicked });
      this.setState({ createdStyle: styles.Clicked });
      console.log("Created");
    }
  };

  getEventsCreated = async (uid) => {
    const events = [];
    const eventsRef = firebase.firestore().collection("events");
    const snapshot = await eventsRef.where("admin", "==", uid).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
      events.push({admin: 1, eventid: doc.id, data: doc.data()});
    });
    this.setState({events: [...this.state.events, ...events]});
  };

  getEventsAttending = async (uid) => {
    const events = [];
    const eventsRef = firebase.firestore().collection("events");
    const snapshot = await eventsRef
      .where("attendees", "array-contains", {
        id: uid,
        status: "accepted"
      })
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
      events.push({admin: 0, eventid: doc.id, data: doc.data()});
    });
    this.setState({events: [...this.state.events, ...events]});
  };

  render() {
    const toShow = this.state.events.filter(
      (event) => event.admin === this.state.admin
    );
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2}>
              <a
                style={this.state.attendingStyle}
                onClick={(e) => this.handleadmin(e, 0)}
              >
                {" "}
                Attending
              </a>{" "}
              <span style={{ fontWeight: 100 }}>|</span>
              <a
                style={this.state.createdStyle}
                onClick={(e) => this.handleadmin(e, "")}
              >
                {" "}
                Created
              </a>
            </Title>
            {toShow.map((event) => (
              <Row>
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

                  returnTo="/myevents"
                  // address={event.data.address}
                  // coordinates={event.data.coordinates}
                />
              </Row>
            ))}
          </Col>
          <Col flex="30px" />
        </Row>
        <Navbar />
      </div>
    );
  }
}
