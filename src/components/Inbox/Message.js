import React, { Component, useState, useEffect } from "react";

import person from "../../assets/person.svg";
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import Chat from "../../containers/Chat";
import fb from "../../firebase";
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  text: {
    whiteSpace: 'nowrap', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    userSelect: 'none'
  }
}));

const Request = () => {

  const history = useHistory();

  const db = fb.firestore();

  const classes = useStyles();

  const groupID = "esngIrriE8hiJJAlTcOE";
  const userID = "test"

  const [groups, setGroups] = useState([]);

  // Get the groups that the user is a part of where userID is in memberIDs array
  const getGroups = () => {
    let local = [];
    db.collection('groups').where('memberIDs', 'array-contains', userID).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            local.push(docData);
        });
        setGroups(local);
    })
  }

  useEffect(() => {
    getGroups();
  }, []);

  const GroupItem = groups.map(function(group, i) {
    return (
      <ListItem key={i} alignItems="flex-start" onClick={() => history.push('/chat/' + groupID)}>
        <ListItemAvatar>
        <Avatar>
          <GroupAddIcon/>
        </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <div className={classes.text}>
              {group.groupName}
            </div>
          }
          secondary={
            <div className={classes.text}>
              {group.newestMessage}
            </div>
          }
        />
      </ListItem>
    )
  });

  return (

    <List className={classes.root}>
      {GroupItem}
    </List>
  )

}

export default Request;