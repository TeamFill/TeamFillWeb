import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import EventPopup from "../components/EventPopup";
import * as eventData from "../data/test-event-data.json";
import Navbar from "../components/Navbar";

import firebase from "firebase";

const MapboxURL = `https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERNAME}/${process.env.REACT_APP_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

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
  const [eventInfo, setEventInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase
      .firestore()
      .collection("events")
      .get()
      .then((snapshot) => {
        setEventInfo(snapshot.docs.map((doc) => ({id: doc.id, data:doc.data()})  ));
      });
    setLoading(false);
  }, []);
  return (
    !loading && (
      <div>
        <MapContainer center={[43.2609, -79.9192]} zoom={15}>
          <TileLayer url={MapboxURL} />
          {eventInfo.map((event) => (
            <Marker
              key={event.id}
              position={[event.data.coordinates["x"], event.data.coordinates["y"]]}
              icon={icon}
            >
              <StyledPopup>
                <EventPopup event={event.data} id={event.id} />
              </StyledPopup>
            </Marker>
          ))}
        </MapContainer>
        <Navbar />
      </div>
    )
  );
}
