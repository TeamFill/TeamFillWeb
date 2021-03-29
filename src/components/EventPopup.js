import React, { useContext } from "react";
import { Typography, Button } from "antd";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import { AuthContext } from "../auth/Auth";

const { Text, Paragraph } = Typography;

export default function EventPopup(props) {

  const { currentUser } = useContext(AuthContext);
  const handleClick = () => {
    firebase
      .firestore()
      .collection("events")
      .doc(props.id)
      .update({
        attendees: firebase.firestore.FieldValue.arrayUnion({id: currentUser.uid, status: "pending"})
      })
  };

  return (
    <NavLink
      to={{
        pathname: "/eventinfo",
        aboutProps: {
          title: props.event.name,
          time: props.event.time,
          ball: props.event.type,
          description: props.event.description,
          attendees: props.event.attendees,
          date: props.event.date,
          returnTo: "/home",
        },
      }}
      exact
    >
      <Paragraph>
        <Text strong>{props.event.name}</Text>
      </Paragraph>
      <Paragraph>
        {props.event.date} at {props.event.time}
      </Paragraph>
      <Button
        style={{
          width: "100%",
          height: 30,
          borderRadius: 15,
          borderColor: "#ff5252",
          backgroundColor: "#ff5252",
        }}
        type="primary"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        Request to Join
      </Button>
    </NavLink>
  );
}
