import firebase from "firebase/app";
import "firebase/auth";

const fb = firebase.initializeApp({
  apiKey: "AIzaSyBt3nOdu4Q1A_S3nu8yGHlo_a-Ye56hktA",
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
});

export default fb;
