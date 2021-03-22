import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import ListAltIcon from "@material-ui/icons/ListAlt";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MapIcon from "@material-ui/icons/Map";
import InboxIcon from "@material-ui/icons/Inbox";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    overflow: "hidden",
  },
  icon: {
    color: "#ff5252",
  },
});

export default function Navbar() {
  const location = useLocation();

  const classes = useStyles();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(location.pathname);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        value="/events"
        icon={<ListAltIcon className={classes.icon} />}
        component={Link}
        to="/events"
        label="."
      />
      <BottomNavigationAction
        value="/create"
        icon={<AddBoxIcon className={classes.icon} />}
        component={Link}
        to="/create"
        label="."
      />
      <BottomNavigationAction
        value="/home"
        icon={<MapIcon className={classes.icon} />}
        component={Link}
        to="/home"
        label="."
      />
      <BottomNavigationAction
        value="/inbox"
        icon={<InboxIcon className={classes.icon} />}
        component={Link}
        to="/inbox"
        label="."
      />
      <BottomNavigationAction
        value="/profile"
        icon={<AccountBoxIcon className={classes.icon} />}
        component={Link}
        to="/profile"
        label="."
      />
    </BottomNavigation>
  );
}
