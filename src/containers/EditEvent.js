import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import {
  Typography,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  TimePicker,
} from "antd";
import moment from "moment";
import Navbar from "../components/Navbar";
import returnIcon from "../assets/return.png";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "MM/DD/YYYY";

export default class EditEvent extends Component {

  onFinish = (values) => {
    console.log("Success:", values);

    const reformattedDate = moment(values.date, dateFormat).toString();

    const reformattedTime = moment(values.time, "HH:mm:ss").toString();

    console.log(this.props.location.aboutProps.eventid)
    const eventid = this.props.location.aboutProps.eventid;

    firebase.auth().onAuthStateChanged(function (user) {
      console.log(values);
      if (user) {
        firebase
          .firestore()
          .collection("events")
          .doc(eventid)
          .update({
            name: values.name,
            description: values.description,
            type: values.type,
            date: reformattedDate,
            time: reformattedTime,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    });
    this.props.history.push("/myevents");
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2} style={styles.title}>
                <NavLink to={this.props.location.aboutProps.returnTo} exact>
                  <img
                    style={{ marginRight: "10px" }}
                    src={returnIcon}
                    alt="return"
                  />
                </NavLink>
                Edit Event
              </Title>
            <Form
              initialValues={{
                name: this.props.location.aboutProps.name,
                description: this.props.location.aboutProps.description,
                type: this.props.location.aboutProps.type,
                date: moment(this.props.location.aboutProps.date),
                time: moment(this.props.location.aboutProps.time),
              }}
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >

              <Form.Item
                label="Event Name"
                name="name"
              >
                <Input style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Description"
                name="description"
              >
                <TextArea style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Type"
                name="type"
              >
                <Select size="large" placeholder="Event Type">
                  <Option value="basketball">Basketball</Option>
                  <Option value="soccer">Soccer</Option>
                  <Option value="hockey">Hockey</Option>
                  <Option value="volleyball">Volleyball</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Event Date"
                name="date"
              >
                <DatePicker style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Time"
                name="time"
              >
                <TimePicker style={styles.form} />
              </Form.Item>


              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                    height: 50,
                    borderRadius: 15,
                    borderColor: "#ff5252",
                    backgroundColor: "#ff5252",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Save Event
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col flex="30px" />
        </Row>
        <Navbar />
      </div>
    );
  }
}

const styles = {
  form: {
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
  title: {
    display: "flex",
    alignItems: "center" /* align vertical */,
  }
};
