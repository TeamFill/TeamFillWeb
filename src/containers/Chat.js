// Ninos Yomo
import React, { Component, useState, setValue, useEffect, classNames } from 'react';
import Navbar from "../components/Navbar";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import fb from "../firebase";
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import InfoIcon from '@material-ui/icons/Info';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const { Title } = Typography;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '1rem'
  },
  drawerTitle: {
    textAlign: 'center',
    paddingTop: '16px'
  },
  avatar: {
    backgroundColor: red[500],
    marginRight: theme.spacing(2)
  },
  message: {
    backgroundColor: red[300],
    border: '1px solid transparent',
    borderRadius: '2rem'
  },
  otherMessage: {
    marginTop: '8px',
    marginRight: 'auto',
    maxWidth: 'calc(100% - 4rem)',
    backgroundColor: "#aaaaaa",
    border: '1px solid transparent',
    borderRadius: '2rem',
    width: 'fit-content'
  },
  myMessage: {
    marginTop: '1rem',
    marginLeft: 'auto',
    maxWidth: 'calc(100% - 4rem)',
    backgroundColor: "#ff5252",
    border: '1px solid transparent',
    borderRadius: '2rem',
    width: 'fit-content'
  },
  senderName: {
    color: 'gray', 
    fontSize: '12px',
    marginTop: '1rem'
  }

}));

const Chat = (props) => {

  const db = fb.firestore();

  let {groupID} = useParams();
  const userID = fb.auth().currentUser.uid;

  const classes = useStyles();
  const [groupData, setGroupData] = useState({});
  const [groupMembers, setGroupMembers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      sendMessage()
    }
  }

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(!drawer)
  };

  const loadGroupData = async () => {
    const doc = (await db.collection('groups').doc(groupID).get()).data();
    setGroupData(doc);
  }

  const loadMessages = async () => {
    let localMessages = [];
    const docRef = db.collection('groups').doc(groupID).collection('messages');
    await docRef.get().then((snap) => {
      snap.forEach(async (doc) => {
        const msgData = await doc.data();
        localMessages.push(msgData);
      })
    });
    localMessages.sort(custom_sort)
    setMessages(localMessages);
  };

  const getGroupMembers = () => {
    let local = [];
    groupData.memberIDs.forEach(memberID => {
      db.collection('users').where('__name__', '==', memberID).get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              const docData = doc.data();
              local.push(docData);
          });
      })
    });
    setGroupMembers(local);
  }

  // When the groupID (hard coded in the url rn) is loaded, get its data (messages) 
  useEffect(async () => {
    loadGroupData();
  }, [groupID]);

  useEffect(async () => {
    loadMessages();
  }, [groupID, timer]);

  // When group data loaded, get member details
  useEffect(() => {
    if (Object.keys(groupData).length !== 0) {
      getGroupMembers();
    }
  }, [groupData, timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1)
    }, 5000);
    return () => clearInterval(interval);
  }, [timer]);

  const groupMembersList = groupMembers.map(function(member, i) {
    return (
      <React.Fragment key={i}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={member.fullname}/>
          </ListItemAvatar>
          <ListItemText
            primary={member.fullname}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                </Typography>
                {"Reputation Score: " + member.rep}
              </React.Fragment>
            }
          />
        </ListItem>
        {i != (groupMembers.length - 1) ? <Divider/> : null}
      </React.Fragment>
    )
  });

  const messsagesSent = messages.map(function(message, i) {
    if (messages.length > 0) {
      return (
        messages ?
        <React.Fragment key={i}>
          {i > 0 ?
          userID !== message.senderID && messages[i-1].senderID != message.senderID ? <Typography className={classes.senderName}>{message.senderName}</Typography> : null
          :
          userID !== message.senderID ? <Typography className={classes.senderName}>{message.senderName}</Typography> : null }
          <ListItem className={userID === message.senderID ? classes.myMessage : classes.otherMessage} >
            <ListItemText primary={message.message} style={{color: 'white'}}/>
          </ListItem>
        </React.Fragment>
        : null
      )
    }
  });

  const sendMessage = async () => {

    const user = (await db.collection('users').doc(userID).get()).data()

    const messageObj = {
      date: new Date(),
      senderID: userID,
      message: message,
      senderName: user.fullname
    }
    db.collection('groups').doc(groupID).collection('messages').add(messageObj)
    .then(() => {
      db.collection('groups').doc(groupID).update({
        newestMessage: message
      })
      setMessages([...messages, messageObj]);
      setMessage('');
      window.scroll({
        top: document.body.offsetHeight,
        left: 0, 
        behavior: 'smooth',
      });
    })
    .catch((error) => {});
  }

  const BackButton = withRouter(({ history }) => (
    <IconButton edge="start" className={classes.menuButton} color="#ff5252"  onClick={() => { history.push('/inbox') }}>
        <ArrowBackIcon />
    </IconButton>
  ));

    return (
      <React.Fragment>
            <AppBar position="fixed">
                <Toolbar style={{background:"white"}}>
                  <BackButton></BackButton>
                    <Avatar className={classes.avatar}>
                      <GroupAddIcon/>
                    </Avatar>
                    <Typography variant="h6" className={classes.title} style={{
                      color: "black"}}>
                      {groupData.groupName}
                    </Typography>
                    <IconButton color="inherit" onClick={() => setDrawer(true)}>
                      <InfoIcon style={{color: "#ff5252"}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container style={{marginTop: '4rem', maxHeight: '100%'}}>
                <List className={classes.root}>
                    {messsagesSent}
                </List>
            </Container>
            <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            <div style={{position: 'fixed', bottom: '0', width: '100%'}}>
              <TextField multiline rowsMax={3} 
              placeholder="Message..." variant="filled" 
              onKeyPress={handleKeyPress}
              style={{width: '100%', overflow: 'hidden', marginBottom: '56px', marginTop: '80px'}}
                InputProps={{
                endAdornment: (
                  <SendIcon onClick={() => sendMessage()}/>
                ),
                }}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <Navbar style={{position: 'relative !important'}}/>

              <SwipeableDrawer
                anchor={'bottom'}
                open={drawer}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}
              >
                <Typography variant="h5" className={classes.drawerTitle}>
                  Group Members
                </Typography>
                <List>
                  {groupMembersList}
                </List>
              </SwipeableDrawer>
            </div>
      </React.Fragment>
    );
}

export default Chat;

function custom_sort(a, b) {
  return a.date - b.date
}