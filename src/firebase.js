import firebase from "firebase/app";
import "firebase/auth";

const fb = firebase.initializeApp({
  apiKey: "AIzaSyBt3nOdu4Q1A_S3nu8yGHlo_a-Ye56hktA",
  authDomain: "teamfill-f2b20.firebaseapp.com",
  projectId: "teamfill-f2b20",
  storageBucket: "teamfill-f2b20.appspot.com",
  messagingSenderId: "process.env.MESSAGING_SENDER_ID",
  appId: "1:12323763387:web:b297215a1e40d80a2f659e",
  measurementId: "G-measurement-id",
});

export default fb;
