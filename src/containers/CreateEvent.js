import React from "react";
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

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function CreateEvent() {
  const children = ["Basketball", "Soccer", "Hockey", "Volleyball"];
  const options = [];
  for (let i = 0; i < children.length; i++) {
    options.push(
      <Option value={children[i]} key={i}>
        {children[i]}
      </Option>
    );
  }

  const onFinish = (values) => {
    console.log("Success:", values);
    const reformattedBirthdate = moment(
      values.birthdate,
      dateFormat
    ).toString();
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(values);
      if (user) {
        firebase
          .firestore()
          .collection("events")
          .doc(user.uid)
          .set({
            fullname: values.fullname,
            birthdate: reformattedBirthdate,
            gender: values.gender,
            preferences: values.preferences,
            radius: values.radius,
            rep: 0,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    });
    this.props.history.push("/home");
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
              name="eventname"
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
              name="eventdescription"
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
              name="eventtype"
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
              name="eventdate"
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
              name="eventtime"
              rules={[
                {
                  required: true,
                  message: "Please input the event time!",
                },
              ]}
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
                Submit
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

const styles = {
  form: {
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
};
