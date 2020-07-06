import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAUSjjsuYOZ_j3oo3v8TbU8iJtuZl5WnV4",
  authDomain: "react-czajo.firebaseapp.com",
  databaseURL: "https://react-czajo.firebaseio.com",
  projectId: "react-czajo",
  storageBucket: "react-czajo.appspot.com",
  messagingSenderId: "956897917050",
  appId: "1:956897917050:web:f6a916ed72cbceb6b4a3c3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
