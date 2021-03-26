// Ninos Yomo
import React, { Component, useState, setValue } from 'react';
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';

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
    color: 'white'
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
    marginTop: '1rem',
    marginRight: 'auto',
    maxWidth: 'calc(100% - 4rem)',
    backgroundColor: red[300],
    border: '1px solid transparent',
    borderRadius: '2rem',
    width: 'fit-content'
  },
  myMessage: {
    marginTop: '1rem',
    marginLeft: 'auto',
    maxWidth: 'calc(100% - 4rem)',
    backgroundColor: red[100],
    border: '1px solid transparent',
    borderRadius: '2rem',
    width: 'fit-content'
  }

}));



const Chat = (props) => {

  const classes = useStyles();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messsagesSent = messages.map(function(messsage, i){
    return (
      messages ?
      <ListItem className={classes.myMessage} key={i}>
        <ListItemText primary={messsage} style={{color: 'white'}}/>
      </ListItem>
      : null
    )
  });

  const sendMessage = () => {
    setMessages([...messages, message]);
    setMessage('');
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

    return (
      <React.Fragment>

            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <ArrowBackIcon />
                    </IconButton>
                    <Avatar className={classes.avatar}>L</Avatar>
                    <Typography variant="h6" className={classes.title}>
                    Lebron James
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container style={{marginTop: '4rem', maxHeight: '100%'}}>
                <List className={classes.root}>
                    <ListItem className={classes.otherMessage}>
                        <ListItemText primary="Need a goalie?" style={{color: 'white'}}/>
                    </ListItem>
                    <ListItem className={classes.myMessage}>
                        <ListItemText primary="Yeah do you have your own gloves?" style={{color: 'white'}}/>
                    </ListItem>
                    <ListItem className={classes.otherMessage}>
                        <ListItemText primary="Yea" style={{color: 'white'}}/>
                    </ListItem>
                    <ListItem className={classes.myMessage}>
                        <ListItemText primary="Ok, ill add u" style={{color: 'white'}}/>
                    </ListItem>
                    <ListItem className={classes.otherMessage}>
                        <ListItemText primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard" style={{color: 'white'}}/>
                    </ListItem>
                    <ListItem className={classes.myMessage}>
                        <ListItemText primary="since the 1500s, when an unknown printer took a galley of type and scrambled it to make" style={{color: 'white'}}/>
                    </ListItem>
                    <ListItem className={classes.otherMessage}>
                        <ListItemText primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard" style={{color: 'white'}}/>
                    </ListItem>
                    <ListItem className={classes.myMessage}>
                        <ListItemText primary="since the 1500s, when an unknown printer took a galley of type and scrambled it to make" style={{color: 'white'}}/>
                    </ListItem>
                    {messsagesSent}
                </List>
            </Container>
            <div style={{position: 'sticky', bottom: '0'}}>
              <TextField multiline rowsMax={3} placeholder="Message..." variant="filled" style={{width: '100%', overflow: 'hidden', marginBottom: '56px', marginTop: '1rem'}}
                InputProps={{
                endAdornment: (
                  <SendIcon onClick={() => sendMessage()}/>
                ),
                }}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <Navbar style={{position: 'relative !important'}}/>
            </div>
      </React.Fragment>
    );
}

export default Chat;