import React, { Component } from 'react';
import {
  Typography,
  Row,
  Col
} from "antd";
import EventItem from '../components/MyEvents/EventItem'
import * as eventData from '../data/test-myevents-data.json'

const { Title } = Typography;

export default class MyEvent extends Component {
  state ={
    admin: 0,
    attendingStyle : styles.Clicked,
    createdStyle : styles.unClicked,
    events: eventData.events
  };

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

  render() {
    const toShow = this.state.events.filter(event => event.admin === this.state.admin);
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2}>
              <a style={this.state.attendingStyle} onClick={e => this.handleadmin(e, 'admin')}> Attending</a> | 
              <a style={this.state.createdStyle} onClick={e => this.handleadmin(e,"")}> Created</a>
            </Title>
            { toShow.map(event =>
              <Row>
                <EventItem
                  key={event.id}
                  event={event.eventname}
                  time={event.time}
                  sport={event.sport}
                />
              </Row>
            )}
          </Col>
          <Col flex="30px" />
        </Row>
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