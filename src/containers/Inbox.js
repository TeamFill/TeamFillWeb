import React, { Component } from 'react';
import {
  Typography,
  Row,
  Col,
} from "antd";
import Message from '../components/Inbox/Message.js'
import Request from '../components/Inbox/Request.js'
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

export default class Inbox extends Component {
  state ={
    inbox: 0,
    attendingStyle : styles.Clicked,
    createdStyle : styles.unClicked
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
        <Title level={2} style={{textAlign: 'center', marginTop: '2rem'}}>
          <a style={this.state.attendingStyle} onClick={e => this.handleadmin(e, 'msg')}> Messages</a> | 
          <a style={this.state.createdStyle} onClick={e => this.handleadmin(e,'')}> Notifications</a>
        </Title>
        <Message/>
        <Navbar/>
      </div>
    );
  }
}