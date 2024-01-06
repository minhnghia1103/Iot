"use client";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyADbfN42BeX4wETbiosuMJ5WFrEbR5O7Q4",
  authDomain: "fir-iot-4ab26.firebaseapp.com",
  projectId: "fir-iot-4ab26",
  storageBucket: "fir-iot-4ab26.appspot.com",
  messagingSenderId: "45700071871",
  appId: "1:45700071871:web:ef9b9746f9a666c674610a",
  measurementId: "G-7T9NKED8C0",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

type DocumentData = firebase.firestore.DocumentData;

function testFireBase() {
  const [data, setData] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    const unsubscribe = firestore.collection("DataEsp32").onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setData(newData);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>testFireBase</h1>
      {data ? data.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>) : <p>Loading...</p>}
    </div>
  );
}
export default testFireBase;
