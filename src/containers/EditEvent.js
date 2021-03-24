import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
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
import returnIcon from "../assets/return.png";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default class EditEvent extends Component {

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
              name="basic"
            >

              <Form.Item
                label="Event Name"
                name="eventname"
              >
                <Input style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Description"
                name="eventdescription"
              >
                <TextArea style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Type"
                name="eventtype"
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
              >
                <DatePicker style={styles.form} />
              </Form.Item>

              <Form.Item
                label="Event Time"
                name="eventtime"
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
