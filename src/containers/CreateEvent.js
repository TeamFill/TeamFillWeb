import React, { useEffect, useState, useContext } from "react";
import { LocationSearchInput } from "../components/Location.js";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { FormComponentProps } from "antd/lib/form/Form";
import { AuthContext } from "../auth/Auth";
import fb from "../firebase.js";
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
import firebase from "firebase";
import Navbar from "../components/Navbar";
import moment from "moment";
const dateFormat = "MM/DD/YYYY";



const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;



export default function CreateEvent(props) {
///Some Component

const [address, setAddress] = useState("")

const clearAddress = () => {
  // Clear with this.props.form.setFieldsValue();
};

const handleAddressChange = (address) => {
  setAddress(address);
};

const handleAddressSelect = (address, placeID) => {
  geocodeByAddress(address)
    .then(async (results) => {
      // Do something with results[0]
      return getLatLng(results[0]);
    })
    .then((latLng) => {
      // Do something with latLng
    })
    .catch((error) => {
      console.error("Error", error);
    });
};

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
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
  }

  const { currentUser } = useContext(AuthContext);

  const onFinish = (values) => {
    console.log(address)
    console.log("Success:", values);
    const reformattedDate = moment(
      values.eventdate,
      dateFormat
    ).toString();

    const reformattedTime = moment(
      values.eventtime, 
      'HH:mm:ss'
    ).toString()
    // firebase.auth().onAuthStateChanged(function (user) {
      
    // });

    console.log(values);

    const eventid = guidGenerator();
    async function idExists () {
      try {
        return await fb
          .firestore()
          .collection("events")
          .doc(eventid)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              console.log("Event Exists!!")
              eventid = guidGenerator();
              return true;
            } else {
              console.log("No Event!!");
              return false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    } 
    
    // while(idExists()){
    //   console.log("generating new event id!!");
    // }

    firebase
    .firestore()
    .collection("events")
    .doc(eventid)
    .set({
      eventname: values.eventname,
      eventdescription: values.eventdescription,
      eventtype: values.eventtype,
      eventdate: reformattedDate,
      eventtime: reformattedTime,
      eventadmin: currentUser.uid,
      // eventattendees: ""
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    this.props.history.push("/home");    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  // const { getFieldDecorator } = props.form;

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


            {/* <Form.Item
              label="Address"
              name="address"
              style={{ width: "315px" }}
              rules={[
                {
                  required: true,
                  message: "Please input the event address!",
                },
              ]}>
                {getFieldDecorator("addressInput", {
                initialValue: "",
                rules: [{ required: false }]
              })(
                <LocationSearchInput
                  address={this.state.address}
                  clearAddress={this.clearAddress}
                  onChange={this.handleAddressChange}
                  onAddressSelect={this.handleAddressSelect}
                />
              )}
            </Form.Item> */}

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
