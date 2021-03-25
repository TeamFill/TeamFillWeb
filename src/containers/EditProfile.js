import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
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
import Navbar from "../components/Navbar";
import returnIcon from "../assets/return.png";
import moment from 'moment';
const dateFormat = 'DD/MM/YYYY';

const { Title } = Typography;
const { Option } = Select;

export default class Profile extends Component {
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
        return options
    }

  onFinish = (values) => {
    console.log("Success:", values);
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
                    Edit My Profile
                </Title>
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
                <Input style={styles.form} defaultValue={this.props.location.aboutProps.name} />
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
                <DatePicker 
                    style={styles.form} 
                    defaultValue={moment(this.props.location.aboutProps.birthdate, dateFormat)}
                    format={dateFormat} />
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
                <Select size="large" placeholder="Gender" defaultValue={this.props.location.aboutProps.gender}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
                </Form.Item>

                <Divider />

                <Form.Item
                label="Search Radius"
                name="radius"
                rules={[
                    {
                    required: true,
                    message: "Please input your search radius!",
                    },
                ]}
                >
                <InputNumber 
                    style={styles.form} 
                    defaultValue={this.props.location.aboutProps.radius} 
                    min={1} 
                    max={50} 
                    formatter={value => `${value} km`}
                    parser={value => value.replace(' km', '')}  
                />
                </Form.Item>

                <Form.Item
                label="Preferences"
                name="preferences"
                style={{ width: '315px' }}
                rules={[
                    {
                    required: true,
                    message: "Please input your preferences!",
                    },
                ]}
                >
                <Select
                    defaultValue={this.props.location.aboutProps.preferences}
                    style={styles.form}
                    style={{ width: '100%' }}
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
