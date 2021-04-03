import React, { Component } from "react";
import { Typography, Row, Col } from "antd";
import firebase from "firebase";
import Request from "../components/Inbox/Request.js";
import Message from "../components/Inbox/Message.js";
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

export default class Inbox extends Component {
  state = {
    inbox: 0,
    events: [],
    penduserdata: [],
    messages:  [],
    attendingStyle: styles.Clicked,
    createdStyle: styles.unClicked,
  };

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    this.getPendingReq(currentUser.uid);
    this.getMyMessages(currentUser.uid);
  }

  handleadmin = (e, inbox) => {
    if (inbox === "msg") {
      //messages
      this.setState({ inbox: 0 });
      this.setState({ attendingStyle: styles.Clicked });
      this.setState({ createdStyle: styles.unClicked });
      console.log("Messages");
    } else {
      //notifications
      this.setState({ inbox: 1 });
      this.setState({ attendingStyle: styles.unClicked });
      this.setState({ createdStyle: styles.Clicked });
      console.log("Notifications");
    }
  };

  getPendingReq = async (uid) => {
    let events = [];
    const eventsRef = firebase.firestore().collection("events");
    const snapshot = await eventsRef.where("admin", "==", uid).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      events.push({ id: doc.id, data: doc.data() });
      // console.log(doc.id, "=>", doc.data());
    });
    // console.log(events);
    let penduserdata = [];
    for (let i = 0; i < events.length; i++) {
      for (
        let attendee = 0;
        attendee < events[i].data.attendees.length;
        attendee++
      ) {
        if (events[i].data.attendees[attendee].status === "pending") {
          firebase
            .firestore()
            .collection("users")
            .doc(events[i].data.attendees[attendee].id)
            .get()
            .then((doc) => {
              penduserdata.push({
                eventid: events[i].id,
                eventdata: events[i].data,
                attendee: events[i].data.attendees[attendee].id,
                userdata: doc.data(),
              });
            });
        }
      }
    }
    this.setState({ penduserdata: penduserdata });
  };

  getMyMessages = async (uid)=>{
    let messages = [];
    const groupsRef = firebase.firestore().collection("groups");
    const snapshot = await groupsRef.where("memberIDs", "array-contains", uid).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, data: doc.data() });
      console.log(doc.id, "=>", doc.data());
    });
    this.setState({messages: messages})
  };

  render() {
    console.log(this.state.penduserdata);
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2}>
              <a
                style={this.state.attendingStyle}
                onClick={(e) => this.handleadmin(e, "msg")}
              >
                {" "}
                Messages
              </a>{" "}
              <span style={{ fontWeight: 100 }}>|</span>
              <a
                style={this.state.createdStyle}
                onClick={(e) => this.handleadmin(e, "")}
              >
                {" "}
                Notifications
              </a>
            </Title>

            {this.state.inbox === 1? 
              this.state.penduserdata && this.state.penduserdata.map((data) => <Request data={data} />)
            :
              this.state.messages.map((message) => <Message 
                key={message.id}
                msgID={message.id}/>)
            }
            
          </Col>
          <Col flex="30px" />
        </Row>
        <Navbar />
      </div>
    );
  }
}
