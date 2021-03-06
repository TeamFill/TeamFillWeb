import React, { useLayoutEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import EventPopup from "../components/EventPopup";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Reorder from "@material-ui/icons/Reorder";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";

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

const useStyles = makeStyles({
  icon: {
    color: "#ff5252",
    width: 40,
    height: 40,
  },
});

export default function HomepageMap() {
  const [eventInfo, setEventInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setcurrentLocation] = useState([43.2609, -79.9192]);
  // const [preferences, setPreferences] = useState();
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { aboutProps } = location;

  useLayoutEffect(() => {
    firebase
      .firestore()
      .collection("events")
      .get()
      .then((snapshot) => {
        setEventInfo(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

    if (typeof aboutProps !== "undefined") {
      setcurrentLocation([aboutProps.coordinates.x, aboutProps.coordinates.y]);
    } else {
      let x;
      let y;
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords);
        x = position.coords.latitude;
        y = position.coords.longitude;
        setcurrentLocation([x, y]);
      });
      console.log("updated loc ", currentLocation);
    }

    setLoading(false);
  }, []);

  const handleGPSClick = () => {
    setcurrentLocation([43.2609, -79.9192]);
    console.log("back to curretn location");
  };

  return (
    !loading && (
      <div>
        <MapContainer center={currentLocation} zoom={15}>
          <TileLayer url={MapboxURL} />
          <button
            onClick={() => {
              history.push("/listview");
            }}
            shape="round"
            style={{
              display: "block",
              position: "absolute",
              top: "1vh",
              right: "2vw",
              zIndex: 500,
              width: 50,
              height: 50,
              borderRadius: 15,
              borderColor: "Transparent",
              outline: "none",
              backgroundColor: "Transparent",
            }}
            type="primary"
          >
            <Reorder className={classes.icon} />
          </button>

          <button
            onClick={() => {
              handleGPSClick();
              console.log(currentLocation);
            }}
            shape="round"
            style={{
              display: "block",
              position: "absolute",
              top: "10vh",
              left: "0vw",
              zIndex: 500,
              width: 30,
              height: 30,
              borderRadius: 15,
              borderColor: "Transparent",
              outline: "none",
              backgroundColor: "Transparent",
            }}
            type="primary"
          >
            <GpsFixedIcon className={classes.icon} />
          </button>
          {eventInfo.map((event) => (
            <Marker
              key={event.id}
              position={[
                event.data.coordinates["x"],
                event.data.coordinates["y"],
              ]}
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
