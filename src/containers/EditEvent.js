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
  Switch,
} from "antd";
import moment from "moment";
import Navbar from "../components/Navbar";
import returnIcon from "../assets/return.svg";
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
      privacy: this.props.location.aboutProps.privacy,
    };
  }

  onSwitchChange = (checked) => {
    this.setState({ privacy: checked });
    console.log(checked);
  };

  componentDidMount = () => {
    this.getAttendeesInfo();
    if (moment() > moment(this.props.location.aboutProps.date)) {
      this.setState({ closeable: true });
    }
    console.log("Closable: ", this.state.closeable);
  };

  onFinish = async (values) => {
    console.log("Success:", values);

    const reformattedDate = moment(values.date, dateFormat).toString();
    const reformattedTime = moment(values.time, "HH:mm:ss").toString();
    this.state.attendees.map((attendee) => delete attendee.data);
    const reformattedAttendees = this.state.attendees;


    const msgAttendees = reformattedAttendees.filter((attendee) => attendee.status === "accepted").map((attendee) => attendee.id);
    console.log(msgAttendees);
    

    const getGeocodeData = async () => {
      const formattedAddress = values.address.split(" ").join("+");
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

      let response = await fetch(geocodeURL);
      let data = await response.json();
      return data;
    };

    let geocodeData;
    await getGeocodeData().then((data) => (geocodeData = data));

    const eventid = this.props.location.aboutProps.eventid;
    const tmpPrivacy = this.state.privacy;
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(values);
      if (user) {
        msgAttendees.push(user.uid);
        console.log(msgAttendees)
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
            coordinates: {
              x: geocodeData.results[0].geometry.location.lat,
              y: geocodeData.results[0].geometry.location.lng,
            },
            address: values.address,
            privacy: tmpPrivacy,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

          firebase
          .firestore()
          .collection("groups")
          .doc(eventid)
          .update({
            memberIDs : msgAttendees
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

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .firestore()
          .collection("groups")
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

  responseAttendee = (uid, choice) => {
    const attendees = this.state.attendees;
    if (choice === "accepted") {
      for (let i = 0; i < attendees.length; i++) {
        if (attendees[i].id === uid) {
          console.log(attendees[i]);
          attendees[i].status = "accepted";
          console.log(attendees[i]);
        }
      }
    } else if (choice === "rejected") {
      for (let i = 0; i < attendees.length; i++) {
        if (attendees[i].id === uid) {
          attendees[i].status = "rejected";
        }
      }
    }
    // console.log(attendees)
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
    console.log("privacy: ", this.state.privacy);
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
                address: this.props.location.aboutProps.address,
              }}
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Title level={5} type="danger">
                You must save to register changes
              </Title>

              <Form.Item
                label="Event Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the event name!",
                  },
                ]}
              >
                <Input style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input the description!",
                  },
                ]}
              >
                <TextArea style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please input the event type!",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please input the event date!",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(d) => !d || d.isBefore(moment())}
                  style={styles.form}
                />
              </Form.Item>

              <Form.Item
                label="Event Time"
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Please input the event time!",
                  },
                ]}
              >
                <TimePicker style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input the event address!",
                  },
                ]}
              >
                <Input style={styles.form} />
              </Form.Item>

              <Form.Item label="Private Event" name="privacy">
                Off{" "}
                <Switch
                  onChange={this.onSwitchChange}
                  defaultChecked={this.props.location.aboutProps.privacy}
                  style={
                    this.state.privacy
                      ? { background: "#ff5252" }
                      : { background: "#aaaaaa" }
                  }
                />{" "}
                On
              </Form.Item>

              <Title level={5}>Accepted Attendees</Title>
              <div>
                {this.state.attendees
                  .filter((attendee) => attendee.status === "accepted")
                  .map((attendee) => (
                    <Attendee
                      key={attendee.id}
                      id={attendee.id}
                      status={attendee.status}
                      name={attendee.data.fullname}
                      rep={attendee.data.rep}
                      delBtn={this.deleteAttendee}
                    />
                  ))}
              </div>

              <Divider />

              <Title level={5}>Pending Attendees</Title>
              <div>
                {this.state.attendees
                  .filter((attendee) => attendee.status === "pending")
                  .map((attendee) => (
                    <Attendee
                      key={attendee.id}
                      id={attendee.id}
                      status={attendee.status}
                      name={attendee.data.fullname}
                      rep={attendee.data.rep}
                      delBtn={this.deleteAttendee}
                      acceptBtn={this.responseAttendee}
                      rejectBtn={this.responseAttendee}
                    />
                  ))}
              </div>

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
                        height: 50,
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
                    height: 50,
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
