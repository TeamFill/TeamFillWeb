import React, { useContext, useEffect, useState } from "react";
import { Typography, Button } from "antd";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import { AuthContext } from "../auth/Auth";
const _ = require('lodash');
const { Text, Paragraph } = Typography;

export default function EventPopup(props) {
  const [ inEvents, setInEvents ] = useState()
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    checkIfInEvent()
  }, [])

  const handleClick = () => {
    firebase
      .firestore()
      .collection("events")
      .doc(props.id)
      .update({
        attendees: firebase.firestore.FieldValue.arrayUnion({id: currentUser.uid, status: "pending"})
      })
  };

  const checkIfInEvent = () => {
    const currentUser = firebase.auth().currentUser;
    console.log(props.event.attendees)
    const checkAccepted = props.event.attendees.some(e => _.isEqual(e, {id: currentUser.uid, status: "accepted"}))
    const checkPending = props.event.attendees.some(e => _.isEqual(e, {id: currentUser.uid, status: "pending"}))
    if( (currentUser.uid === props.event.admin) || checkAccepted || checkPending) {
      setInEvents(true);
    }else {
      setInEvents(false);
    }
  }


  return (
    <NavLink
      to={{
        pathname: "/eventinfo",
        aboutProps: {
          eventid: props.event.eventid,
          admin: props.event.admin,
          name: props.event.name,
          time: props.event.time,
          type: props.event.type,
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
        {props.event.date.split(" ").slice(1, 4).join(" ")} at {props.event.time.split(" ")[4].slice(0, -3)} <br />
        {props.event.address}
      </Paragraph>
      {!inEvents ? <Button
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
      </Button>: null}
    </NavLink>
  );
}
