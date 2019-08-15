import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var fbConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""


};
firebase.initializeApp(fbConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
