import React from "react";
import { Typography, Button } from "antd";

const { Text, Paragraph } = Typography;

export default function EventPopup(props) {
  const handleClick = () => alert("nice click");
  return (
    <>
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
        onClick={() => handleClick()}
      >
        More info
      </Button>
    </>
  );
}
