import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as eventData from "../data/test-event-data.json";

const MapboxURL = `https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERNAME}/${process.env.REACT_APP_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

export default function HomepageMap() {
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
        >
          <Popup>{event.properties.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
