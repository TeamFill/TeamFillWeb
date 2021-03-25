import React, { Component } from 'react';
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

const { Title } = Typography;
const { Option } = Select;

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
                <DatePicker 
                    style={styles.form}/>
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
