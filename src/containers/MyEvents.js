import React, { Component } from 'react';
import { AuthContext } from "../auth/Auth";
import fb from "../firebase.js";
import {
  Typography,
  Row,
  Col
} from "antd";
import EventItem from '../components/MyEvents/EventItem'
import * as eventData from '../data/test-myevents-data.json'
import Navbar from "../components/Navbar"

const { Title } = Typography;

const styles = {
  unClicked: {
    color: "Black",
    fontWeight: 100,
  },
  Clicked: {
    color: "Black",
  }
};

export default class MyEvent extends Component {
  state ={
    admin: 0,
    attendingStyle : styles.Clicked,
    createdStyle : styles.unClicked,
    events: eventData.events
  };

  returnAsAdmin = () => {
    if (this.props.location.hasOwnProperty("aboutProps")) {
      return 1
    } else {
      return 0
    }
  }

  handleadmin = (e, admin) => {
    if (admin === 'admin'){ //attending
      this.setState({admin: 0});
      this.setState({attendingStyle : styles.Clicked});
      this.setState({createdStyle : styles.unClicked});
      console.log("Attending")
    } else { //created
      this.setState({admin: 1});
      this.setState({attendingStyle : styles.unClicked});
      this.setState({createdStyle : styles.Clicked});
      console.log("Created")
    }
  }

  getEventsCreated = async (uid) => {  
    const eventsRef = fb.firestore().collection('events');
    const snapshot = await eventsRef.where('eventadmin', '==', uid).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
  
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  }


  render() {
    const currentUser = fb.auth().currentUser;
    this.getEventsCreated(currentUser.uid);
  
    const toShow = this.state.events.filter(event => event.admin === this.state.admin);
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2}>
              <a style={this.state.attendingStyle} onClick={e => this.handleadmin(e, 'admin')}> Attending</a> | 
              <a style={this.state.createdStyle} onClick={e => this.handleadmin(e,'')}> Created</a>
            </Title>
            { toShow.map(event =>
              <Row>
                <EventItem
                  key={event.id}
                  event={event.eventname}
                  time={event.time}
                  sport={event.sport}
                  admin={event.admin}
                />
              </Row>
            )}
          </Col>
          <Col flex="30px" />
        </Row>
        <Navbar />
      </div>
    );
  }
}