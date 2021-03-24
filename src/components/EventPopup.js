import React from "react";
import { Typography, Button } from "antd";
import { NavLink } from "react-router-dom";

const { Text, Paragraph } = Typography;

export default function EventPopup(props) {
  const handleClick = () => alert("nice click");
  return (
    <NavLink
      to={{
        pathname: "/eventinfo",
        aboutProps: {
          title: props.event.properties.name,
          time: props.event.properties.time,
          ball: "soccer",
          returnTo: "/home",
        },
      }}
      exact
    >
      <Paragraph>
        <Text strong>{props.event.properties.name}</Text>
      </Paragraph>
      <Paragraph>
        {props.event.properties.date} at {props.event.properties.time}
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
