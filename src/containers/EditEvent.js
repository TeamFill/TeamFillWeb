import React, { Component } from "react";
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
  Divider,
} from "antd";
import moment from "moment";
import Navbar from "../components/Navbar";
import returnIcon from "../assets/return.png";
import Attendee from "../components/MyEvents/Attendee";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "MM/DD/YYYY";

export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      closeable: false,
    };
  }

  componentDidMount = () => {
    this.getAttendeesInfo();
    if (moment() > moment(this.props.location.aboutProps.date)) {
      this.setState({ closeable: true });
    }
    console.log(this.state.closeable);
  };

  onFinish = (values) => {
    console.log("Success:", values);

    const reformattedDate = moment(values.date, dateFormat).toString();
    const reformattedTime = moment(values.time, "HH:mm:ss").toString();
    this.state.attendees.map((attendee) => delete attendee.data);
    const reformattedAttendees = this.state.attendees;
    console.log(reformattedAttendees);

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
            attendees: reformattedAttendees,
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

  closeEvent = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .update({
            rep: firebase.firestore.FieldValue.increment(50),
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    });

    const attendees = this.state.attendees.filter(
      (attendee) => attendee.status === "accepted"
    );
    attendees.map((attendee) =>
      firebase
        .firestore()
        .collection("users")
        .doc(attendee.id)
        .update({
          rep: 10 + attendee.data.rep,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        })
    );
    this.deleteEvent();
    this.props.history.push("/myevents");
  };

  deleteEvent = () => {
    const eventid = this.props.location.aboutProps.eventid;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .firestore()
          .collection("events")
          .doc(eventid)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    });
    this.props.history.push("/myevents");
  };

  deleteAttendee = (uid) => {
    const attendees = this.state.attendees.filter(
      (attendee) => attendee.id !== uid
    );
    this.setState({ attendees: attendees });
  };

  getAttendeesInfo = () => {
    const attendees = [];
    const currenentAttdendees = this.props.location.aboutProps.attendees;
    let currentComponent = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        currenentAttdendees.map((attendee) =>
          firebase
            .firestore()
            .collection("users")
            .doc(attendee.id)
            .get()
            .then((doc) => {
              console.log("Document grabbed data!");
              // console.log(doc.data());
              attendees.push({
                id: attendee.id,
                status: attendee.status,
                data: doc.data(),
              });
              currentComponent.setState({ attendees: attendees });
            })
            .catch((error) => {
              console.error("Error reading document: ", error);
            })
        );
      }
    });
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
              <Form.Item label="Event Name" name="name">
                <Input style={styles.form} />
              </Form.Item>

              <Form.Item label="Event Description" name="description">
                <TextArea style={styles.form} />
              </Form.Item>

              <Form.Item label="Event Type" name="type">
                <Select size="large" placeholder="Event Type">
                  <Option value="basketball">Basketball</Option>
                  <Option value="soccer">Soccer</Option>
                  <Option value="hockey">Hockey</Option>
                  <Option value="volleyball">Volleyball</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Event Date" name="date">
                <DatePicker style={styles.form} />
              </Form.Item>

              <Form.Item label="Event Time" name="time">
                <TimePicker style={styles.form} />
              </Form.Item>

              <Form.Item label="Event Attendees">
                {this.state.attendees.map((attendee) => (
                  <Attendee
                    key={attendee.id}
                    id={attendee.id}
                    status={attendee.status}
                    name={attendee.data.fullname}
                    rep={attendee.data.rep}
                    delBtn={this.deleteAttendee}
                  />
                ))}
              </Form.Item>

              <Divider />

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

              {this.state.closeable && (
                <>
                  <Divider />
                  <Form.Item>
                    <Button
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 15,
                        borderColor: "#ff5252",
                        backgroundColor: "white",
                        color: "#ff5252",
                      }}
                      type="primary"
                      onClick={() => this.closeEvent()}
                    >
                      Close Event
                    </Button>
                  </Form.Item>
                </>
              )}

              <Divider />

              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 15,
                    borderColor: "#ff5252",
                    backgroundColor: "white",
                    color: "#ff5252",
                  }}
                  type="primary"
                  onClick={() => this.deleteEvent()}
                >
                  Delete Event
                </Button>
              </Form.Item>

              <br />
              <br />
              <br />
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
  },
};
