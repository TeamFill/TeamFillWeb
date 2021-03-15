import React from "react";
import { Typography, Form, Input, Button, Divider, DatePicker, Select, InputNumber } from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function Profile() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Title>My Profile</Title>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          <Input />
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
          <DatePicker/>
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
          <Select placeholder="Gender">
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
          <InputNumber min={1} max={50}/>
        </Form.Item>

        <Form.Item
          label="Preferences"
          name="preferences"
          rules={[
            {
              required: true,
              message: "Please input your preferences!",
            },
          ]}
        >
          <InputNumber min={1} max={5}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
