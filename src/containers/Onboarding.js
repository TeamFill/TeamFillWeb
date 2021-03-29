import React, { Component } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Divider,
  DatePicker,
  Select,
  InputNumber,
  Row,
  Col,
} from "antd";
import firebase from "firebase";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const dateFormat = "MM/DD/YYYY";

export default class Onboarding extends Component {
  SportOpt = () => {
    const children = ["Basketball", "Soccer", "Hockey", "Volleyball"];
    const options = [];
    for (let i = 0; i < children.length; i++) {
      options.push(
        <Option value={children[i]} key={i}>
          {children[i]}
        </Option>
      );
    }
    return options;
  };

  onFinish = (values) => {
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
          .collection("users")
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

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div>
        <Row style={{ marginTop: 40, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2}> My Profile </Title>
            <Form
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Full Name"
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name!",
                  },
                ]}
              >
                <Input style={styles.form} placeholder="Full Name" />
              </Form.Item>

              <Form.Item
                label="Birthdate"
                name="birthdate"
                rules={[
                  {
                    required: true,
                    message: "Please input your birthdate!",
                  },
                ]}
              >
                <DatePicker style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input your gender!",
                  },
                ]}
              >
                <Select size="large" placeholder="Gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>

              <Divider />

              <Form.Item
                label="Search Radius (km)"
                name="radius"
                rules={[
                  {
                    required: true,
                    message: "Please input your search radius!",
                  },
                ]}
              >
                <InputNumber style={styles.form} min={1} max={50} />
              </Form.Item>

              <Form.Item
                label="Preferences"
                name="preferences"
                style={{ width: "315px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your preferences!",
                  },
                ]}
              >
                <Select
                  style={styles.form}
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                >
                  {this.SportOpt()}
                </Select>
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
