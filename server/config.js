const firebase = require("firebase");
firebaseConfig = {
  apiKey: "AIzaSyADbfN42BeX4wETbiosuMJ5WFrEbR5O7Q4",
  authDomain: "fir-iot-4ab26.firebaseapp.com",
  projectId: "fir-iot-4ab26",
  storageBucket: "fir-iot-4ab26.appspot.com",
  messagingSenderId: "45700071871",
  appId: "1:45700071871:web:ef9b9746f9a666c674610a",
  measurementId: "G-7T9NKED8C0",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
const DataEsp32 = db.collection("DataEsp32");
module.exports = { User, DataEsp32 };
