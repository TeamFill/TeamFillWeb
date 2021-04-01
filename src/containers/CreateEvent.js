import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../auth/Auth";
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

import Navbar from "../components/Navbar";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function CreateEvent(props) {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const children = ["Basketball", "Soccer", "Hockey", "Volleyball"];
  const options = [];
  for (let i = 0; i < children.length; i++) {
    options.push(
      <Option value={children[i]} key={i}>
        {children[i]}
      </Option>
    );
  }

  const guidGenerator = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
  };

  const onFinish = async (values) => {
    console.log("Success:", values);

    const reformattedDate = moment(values.date, "MM/DD/YYYY").toString();
    const reformattedTime = moment(values.time, "HH:mm:ss").toString();

    const eventid = guidGenerator();

    async function getGeocodeData() {
      const formattedAddress = values.address.split(" ").join("+");
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

      let response = await fetch(geocodeURL);
      let data = await response.json();
      return data;
    }

    let geocodeData;
    await getGeocodeData().then((data) => (geocodeData = data));

    firebase
      .firestore()
      .collection("events")
      .doc(eventid)
      .set({
        name: values.name,
        description: values.description,
        type: values.type,
        date: reformattedDate,
        time: reformattedTime,
        admin: currentUser.uid,
        coordinates: {
          x: geocodeData.results[0].geometry.location.lat,
          y: geocodeData.results[0].geometry.location.lng,
        },
        address: values.address,
        attendees: [],
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    history.push("/home");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row style={{ marginTop: 40, width: "100%" }}>
        <Col flex="30px" />
        <Col flex="auto">
          <Title level={2}>Create New Event</Title>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
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
              <DatePicker style={styles.form} />
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col flex="30px" />
      </Row>
      <br />
      <br />
      <br />
      <Navbar />
    </div>
  );
}

const styles = {
  form: {
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
};
