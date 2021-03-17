import React, { useState } from "react";
import styled from "styled-components";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { Typography, Button } from "antd";
import * as eventData from "../data/test-event-data.json";

const MapboxURL = `https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERNAME}/${process.env.REACT_APP_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

const { Text, Paragraph } = Typography;

const StyledPopup = styled(Popup)`
  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
`;

const icon = new Icon({
  iconUrl: "/map-marker.svg",
  iconSize: [40, 40],
});

export default function HomepageMap() {
  const handleClick = () => alert("nice click");
  return (
    <MapContainer center={[43.2609, -79.9192]} zoom={15}>
      <TileLayer url={MapboxURL} />
      {eventData.features.map((event) => (
        <Marker
          key={event.properties.id}
          position={[
            event.geometry.coordinates[0],
            event.geometry.coordinates[1],
          ]}
          icon={icon}
        >
          <StyledPopup>
            <Paragraph>
              <Text strong>{event.properties.name}</Text>
            </Paragraph>
            <Paragraph>
              {event.properties.date} at {event.properties.time}
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
          </StyledPopup>
        </Marker>
      ))}
    </MapContainer>
  );
}
