import React, { Component } from 'react';
import {
  Typography,
  Row,
  Col
} from "antd";
import Message from '../components/Inbox/Message.js'
import * as eventData from '../data/test-myevents-data.json'
import Navbar from "../components/Navbar"

const { Title } = Typography;

export default class Inbox extends Component {
  state ={
    inbox: 0,
    attendingStyle : styles.Clicked,
    createdStyle : styles.unClicked,
    events: eventData.events
  };


  handleadmin = (e, inbox) => {
    if (inbox === 'msg'){ //messages
      this.setState({inbox: 0});
      this.setState({attendingStyle : styles.Clicked});
      this.setState({createdStyle : styles.unClicked});
      console.log("Attending")
    } else { //notifications
      this.setState({inbox: 1});
      this.setState({attendingStyle : styles.unClicked});
      this.setState({createdStyle : styles.Clicked});
      console.log("Created")
    }
  }

  render() {
    // const toShow = this.state.events.filter(event => event.admin === this.state.admin);
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2}>
              <a style={this.state.attendingStyle} onClick={e => this.handleadmin(e, 'msg')}> Messages</a> | 
              <a style={this.state.createdStyle} onClick={e => this.handleadmin(e,'')}> Notifications</a>
            </Title>
          </Col>
          <Row>
            <Message />
          </Row>
          
          <Col flex="30px" />
        </Row>
        <Navbar />
      </div>
    );
  }
}

const styles = {
  unClicked: {
    color: "Black",
    fontWeight: 100,
  },
  Clicked: {
    color: "Black",
  }
};